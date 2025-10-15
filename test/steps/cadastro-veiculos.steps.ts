import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

const feature = loadFeature('./test/features/cadastro-veiculos.feature');

// Função utilitária para mapear tabela Gherkin para objeto JSON
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

  // Limpa o banco antes de cada teste
  async function prepareDatabase() {
    if (!dataSource || !dataSource.isInitialized) return;
    const tables = ['vehicles', 'customers', 'users'];
    for (const table of tables) {
      await dataSource.query(`DELETE FROM "${table}";`);
    }
  }

  // Cenário 1: Cadastro de veículo com todos os campos corretos
  test('Cadastro de veículo com todos os campos corretos', ({
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
        name: 'Kevin',
        lastName: 'Jr',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'kevinjr@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "\/vehicle" com:$/,
      async (table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);
        payload.customerId = createdCustomerId; // usa o cliente criado
        response = await request(server).post('/vehicle').send(payload);
      },
    );

    then('o sistema deve retornar status 201', () => {
      expect(response.status).toBe(201);
    });

    and(
      'o corpo deve conter a mensagem "Veículo cadastrado com sucesso"',
      () => {
        expect(response.body.message).toMatch(/sucesso/i);
      },
    );
  });

  // Cenário 2: Verificar campo obrigatório Ano vazio
  test('Erro verificar campo obrigatório Ano vazio', ({
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
        name: 'Kevin',
        lastName: 'Jr',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'kevinjr@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "\/vehicle" com:$/,
      async (table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);
        payload.customerId = createdCustomerId;
        response = await request(server).post('/vehicle').send(payload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and('o corpo deve conter a mensagem "Ano é obrigatório"', () => {
      const msgBody = Array.isArray(response.body.message)
        ? response.body.message[0]
        : response.body.message;
      expect(msgBody).toMatch(/Ano é obrigatório/i);
    });
  });

  // Cenário 3: Verificar campo obrigatório Modelo vazio
  test('Erro verificar campo obrigatório Modelo vazio', ({
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
        name: 'Kevin',
        lastName: 'Jr',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'kevinjr@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "\/vehicle" com:$/,
      async (table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);
        payload.customerId = createdCustomerId;
        response = await request(server).post('/vehicle').send(payload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and('o corpo deve conter a mensagem "Modelo é obrigatório"', () => {
      const msgBody = Array.isArray(response.body.message)
        ? response.body.message[0]
        : response.body.message;
      expect(msgBody).toMatch(/Modelo é obrigatório/i);
    });
  });

  // Cenário 4: Verificar campo obrigatório Cor vazio
  test('Erro verificar campo obrigatório Cor vazio', ({
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
        name: 'Kevin',
        lastName: 'Jr',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'kevinjr@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "\/vehicle" com:$/,
      async (table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);
        payload.customerId = createdCustomerId;
        response = await request(server).post('/vehicle').send(payload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and('o corpo deve conter a mensagem "Cor é obrigatória"', () => {
      const msgBody = Array.isArray(response.body.message)
        ? response.body.message[0]
        : response.body.message;
      expect(msgBody).toMatch(/Cor é obrigatória/i);
    });
  });

  // Cenário 5: Verificar campo obrigatório Marca vazio
  test('Erro verificar campo obrigatório Marca vazio', ({
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
        name: 'Kevin',
        lastName: 'Jr',
        cpf: '12345678901',
        phone: '11999999999',
        zipCode: '12345678',
        user: {
          email: 'kevinjr@teste.com',
          password: 'senha123',
        },
      };

      const res = await request(server).post('/customer').send(customerPayload);
      createdCustomerId = res.body?.customer?.id;
      expect(createdCustomerId).toBeDefined();
    });

    when(
      /^eu envio uma requisição POST para "\/vehicle" com:$/,
      async (table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);
        payload.customerId = createdCustomerId;
        response = await request(server).post('/vehicle').send(payload);
        console.log(payload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and('o corpo deve conter a mensagem "Marca é obrigatória"', () => {
      and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
        expect(response.body.message[0]).toMatch(new RegExp(msg, 'i'));
      });
    });
  });
});
