import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

const feature = loadFeature('./test/features/cadastro-cliente.feature');

// Função para criar payload aninhado automaticamente
function mapTableToPayload(row: Record<string, any>): any {
  const payload: any = {};
  for (const key in row) {
    if (!row.hasOwnProperty(key)) continue;
    const value = row[key];
    if (key.includes('.')) {
      const parts = key.split('.');
      let current = payload;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          current[part] = value;
        } else {
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      }
    } else {
      payload[key] = value;
    }
  }
  return payload;
}

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

    // ---- Correção: Ativa validação global ----
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    // -----------------------------------------

    await app.init();
    server = app.getHttpServer();

    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  // Cenário 1: Cliente cadastrado com sucesso
  test('Cliente cadastrado com sucesso', ({ given, when, then, and }) => {
    given('que o banco de dados de teste está limpo', async () => {
      if (dataSource) await dataSource.synchronize(true);
    });

    when(
      /^eu envio uma requisição POST para "\/customer" com:$/,
      async (table) => {
        const row = table[0];
        const finalPayload = mapTableToPayload(row);
        console.log('Payload enviado:', finalPayload);
        response = await request(server).post('/customer').send(finalPayload);
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
  // Cenário 2: Nome obrigatório
  test('Erro ao cadastrar cliente com Nome vazio', ({
    given,
    when,
    then,
    and,
  }) => {
    given('que o banco de dados de teste está limpo', async () => {
      if (dataSource) await dataSource.synchronize(true);
    });

    when(
      /^eu envio uma requisição POST para "\/customer" com:$/,
      async (table) => {
        const row = table[0];
        const finalPayload = mapTableToPayload(row);
        console.log('Payload enviado:', finalPayload);
        response = await request(server).post('/customer').send(finalPayload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
      expect(response.body.message[0]).toMatch(new RegExp(msg, 'i'));
    });
  });
  // Cenário 3: CPF invalido
  test('Erro ao cadastrar cliente com CPF invalido', ({
    given,
    when,
    then,
    and,
  }) => {
    given('que o banco de dados de teste está limpo', async () => {
      if (dataSource) await dataSource.synchronize(true);
    });

    when(
      /^eu envio uma requisição POST para "\/customer" com:$/,
      async (table) => {
        const row = table[0];
        const finalPayload = mapTableToPayload(row);
        console.log('Payload enviado:', finalPayload);
        response = await request(server).post('/customer').send(finalPayload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
      expect(response.body.message[0]).toMatch(new RegExp(msg, 'i'));
    });
  });

  // Cenário 4: Email invalido
  test('Erro ao verificar formato inválido de Email', ({
    given,
    when,
    then,
    and,
  }) => {
    given('que o banco de dados de teste está limpo', async () => {
      if (dataSource) await dataSource.synchronize(true);
    });

    when(
      /^eu envio uma requisição POST para "\/customer" com:$/,
      async (table) => {
        const row = table[0];
        const finalPayload = mapTableToPayload(row);
        console.log('Payload enviado:', finalPayload);
        response = await request(server).post('/customer').send(finalPayload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
      expect(response.body.message[0]).toMatch(new RegExp(msg, 'i'));
    });
  });

  // Cenário 5: Senha não preenchida
  test('Erro ao verificar Senha não preenchida', ({
    given,
    when,
    then,
    and,
  }) => {
    given('que o banco de dados de teste está limpo', async () => {
      if (dataSource) await dataSource.synchronize(true);
    });

    when(
      /^eu envio uma requisição POST para "\/customer" com:$/,
      async (table) => {
        const row = table[0];
        const finalPayload = mapTableToPayload(row);
        console.log('Payload enviado:', finalPayload);
        response = await request(server).post('/customer').send(finalPayload);
      },
    );

    then('o sistema deve retornar status 400', () => {
      expect(response.status).toBe(400);
    });

    and(/^o corpo deve conter a mensagem "(.*)"$/, (msg) => {
      expect(response.body.message[0]).toMatch(new RegExp(msg, 'i'));
    });
  });
});
