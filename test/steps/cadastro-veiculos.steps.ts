import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

const feature = loadFeature('./test/features/cadastro-veiculos.feature');

function mapTableToPayload(row: Record<string, any>): any {
  const payload: any = {};
  for (const key in row) {
    if (!row.hasOwnProperty(key)) continue;
    if (key.includes('.')) {
      const parts = key.split('.');
      let current = payload;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          current[part] = row[key];
        } else {
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      }
    } else {
      payload[key] = row[key];
    }
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

  async function prepareDatabase() {
    if (!dataSource || !dataSource.isInitialized) return;
    const tablesToClean = ['vehicles', 'customers', 'users'];
    for (const table of tablesToClean) {
      await dataSource.query(`DELETE FROM "${table}";`);
    }
  }

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
      // Cria cliente com user aninhado
      const customerRes = await request(server)
        .post('/customer')
        .send({
          name: 'João',
          lastName: 'Júnior',
          cpf: '12312678902',
          phone: '11987654321',
          zipCode: '01001000',
          user: {
            email: 'joao2@email.com',
            password: 'minhasenha123',
          },
        });

      expect(customerRes.status).toBe(201);

      // pega o ID real retornado pelo backend
      createdCustomerId = customerRes.body.customer?.id || customerRes.body.id;
      console.log('✅ Cliente criado com ID real:', createdCustomerId);
    });

    when(
      /^eu envio uma requisição POST para "\/vehicle" com:$/,
      async (table) => {
        const row = table[0];
        const payload = mapTableToPayload(row);

        // garante que o veículo use o customerId correto
        payload.customer_id = createdCustomerId;
        delete payload.customerId; // remove campo antigo se existir

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
});
