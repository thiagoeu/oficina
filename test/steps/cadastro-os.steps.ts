import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

const feature = loadFeature('./test/features/cadastro-os.feature');

function mapTableToPayload(row: Record<string, any>): any {
  const payload: any = {};
  for (const key in row) {
    if (!row.hasOwnProperty(key)) continue;
    let value = row[key];

    if (value === 'null' || value === '') {
      value = null;
    } else if (!isNaN(Number(value))) {
      value = Number(value);
    }

    payload[key] = value;
  }
  return payload;
}

defineFeature(feature, (test) => {
  let app: INestApplication;
  let server: any;
  let response: request.Response;
  let dataSource: DataSource;
  let createdCustomerId: number;
  let createdVehicleId: number;
  let createdMechanicId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    server = app.getHttpServer();
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  async function prepareDatabase() {
    if (!dataSource || !dataSource.isInitialized) return;
    const tables = [
      'service_orders',
      'vehicles',
      'customers',
      'mechanics',
      'users',
    ];
    for (const table of tables) {
      await dataSource.query(`DELETE FROM "${table}";`);
    }
  }

  test('Criar ordem de serviço completa com peça e serviço válidos', ({
    given,
    and,
    when,
    then,
  }) => {
    given('que o banco de dados de teste está limpo', async () => {
      await prepareDatabase();
    });

    and('existe um cliente previamente cadastrado', async () => {
      const customerPayload = {
        name: 'Maria',
        lastName: 'Silva',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'maria@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    and('existe um veículo previamente cadastrado', async () => {
      const vehiclePayload = {
        model: 'Gol',
        brand: 'Volkswagen',
        color: 'Prata',
        year: 2015,
        plate: 'ABC1234',
        customerId: createdCustomerId,
      };

      const res = await request(server).post('/vehicle').send(vehiclePayload);
      createdVehicleId = res.body?.vehicle?.id ?? res.body?.id;
      expect(createdVehicleId).toBeDefined();
    });

    and('existe um mecânico previamente cadastrado', async () => {
      const mechanicPayload = {
        name: 'João Mecânico',
      };

      const res = await request(server).post('/mechanic').send(mechanicPayload);
      console.log(res.body);
      createdMechanicId = res.body?.mechanic?.id ?? res.body?.id;
      expect(createdMechanicId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "(.*)" com:$/,
      async (path, table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);

        // Substituir os valores dos IDs para garantir os vinculados acima
        payload.customer_id = createdCustomerId;
        payload.vehicle_id = createdVehicleId;
        payload.mechanic_id = createdMechanicId;

        response = await request(server).post(path).send(payload);
      },
    );

    then('o sistema deve retornar status 201', () => {
      expect(response.status).toBe(201);
    });

    and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
      const msgBody = Array.isArray(response.body.message)
        ? response.body.message[0]
        : response.body.message;
      expect(msgBody).toMatch(new RegExp(msg, 'i'));
    });
  });

  test('Criar OS com peça fora de estoque', ({ given, and, when, then }) => {
    given('que o banco de dados de teste está limpo', async () => {
      await prepareDatabase();
    });

    and('existe um cliente previamente cadastrado', async () => {
      const customerPayload = {
        name: 'Maria',
        lastName: 'Silva',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'maria@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    and('existe um veículo previamente cadastrado', async () => {
      const vehiclePayload = {
        model: 'Gol',
        brand: 'Volkswagen',
        color: 'Prata',
        year: 2015,
        plate: 'ABC1234',
        customerId: createdCustomerId,
      };

      const res = await request(server).post('/vehicle').send(vehiclePayload);
      createdVehicleId = res.body?.vehicle?.id ?? res.body?.id;
      expect(createdVehicleId).toBeDefined();
    });

    and('existe um mecânico previamente cadastrado', async () => {
      const mechanicPayload = {
        name: 'João Mecânico',
      };

      const res = await request(server).post('/mechanic').send(mechanicPayload);
      console.log(res.body);
      createdMechanicId = res.body?.mechanic?.id ?? res.body?.id;
      expect(createdMechanicId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "(.*)" com:$/,
      async (path, table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);

        // Substituir os valores dos IDs para garantir os vinculados acima
        payload.customer_id = createdCustomerId;
        payload.vehicle_id = createdVehicleId;
        payload.mechanic_id = createdMechanicId;

        response = await request(server).post(path).send(payload);
      },
    );

    then('o sistema deve retornar status 404', () => {
      expect(response.status).toBe(404);
    });

    and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
      const msgBody = Array.isArray(response.body.message)
        ? response.body.message[0]
        : response.body.message;
      expect(msgBody).toMatch(new RegExp(msg, 'i'));
    });
  });

  test('Criar OS apenas com Peça (sem serviço)', ({
    given,
    and,
    when,
    then,
  }) => {
    given('que o banco de dados de teste está limpo', async () => {
      await prepareDatabase();
    });

    and('existe um cliente previamente cadastrado', async () => {
      const customerPayload = {
        name: 'Maria',
        lastName: 'Silva',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'maria@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    and('existe um veículo previamente cadastrado', async () => {
      const vehiclePayload = {
        model: 'Gol',
        brand: 'Volkswagen',
        color: 'Prata',
        year: 2015,
        plate: 'ABC1234',
        customerId: createdCustomerId,
      };

      const res = await request(server).post('/vehicle').send(vehiclePayload);
      createdVehicleId = res.body?.vehicle?.id ?? res.body?.id;
      expect(createdVehicleId).toBeDefined();
    });

    and('existe um mecânico previamente cadastrado', async () => {
      const mechanicPayload = {
        name: 'João Mecânico',
      };

      const res = await request(server).post('/mechanic').send(mechanicPayload);
      console.log(res.body);
      createdMechanicId = res.body?.mechanic?.id ?? res.body?.id;
      expect(createdMechanicId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "(.*)" com:$/,
      async (path, table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);

        // Substituir os valores dos IDs para garantir os vinculados acima
        payload.customer_id = createdCustomerId;
        payload.vehicle_id = createdVehicleId;
        payload.mechanic_id = createdMechanicId;

        response = await request(server).post(path).send(payload);
        console.log('Status:', response.status);
        console.log('Body:', response.body);
      },
    );

    then('o sistema deve retornar status 201', () => {
      expect(response.status).toBe(201);
    });

    and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
      const msgBody = Array.isArray(response.body.message)
        ? response.body.message[0]
        : response.body.message;
      expect(msgBody).toMatch(new RegExp(msg, 'i'));
    });
  });
});
