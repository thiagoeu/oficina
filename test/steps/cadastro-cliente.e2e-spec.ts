import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

const feature = loadFeature('./test/features/cadastro-cliente.feature');

defineFeature(feature, (test) => {
  let app: INestApplication;
  let server: any;
  let response: request.Response;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();

    // Pega o DataSource do TypeORM para limpar o banco
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  test('Cliente cadastrado com sucesso', ({ given, when, then, and }) => {
    given('que o banco de dados de teste está limpo', async () => {
      // Reseta o banco para teste
      if (dataSource) {
        await dataSource.synchronize(true);
      }
    });

    when(
      /^eu envio uma requisição POST para "\/customer" com:$/,
      async (table) => {
        const data = table.rowsHash();

        const payload = {
          name: data['name'],
          lastName: data['lastName'],
          cpf: data['cpf'],
          phone: data['phone'],
          zipCode: data['zipCode'],
          user: {
            email: data['user.email'],
            password: data['user.password'],
          },
        };

        response = await request(server).post('/customer').send(payload);
      },
    );

    then('o sistema deve retornar status 201', () => {
      expect(response.status).toBe(201);
    });

    and(
      'o corpo deve conter a mensagem "Cliente cadastrado com sucesso"',
      () => {
        expect(response.body.message).toMatch(/sucesso/i);
      },
    );
  });
});
