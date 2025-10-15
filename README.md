# 🛠️ Aplicação Oficina - Teste de Software

## 📋 Sobre o Projeto

Sistema de gerenciamento para oficina mecânica desenvolvido como parte da disciplina de Teste de Software. A aplicação permite o cadastro e controle de clientes, veículos e ordens de serviço.

## 🚀 Tecnologias Utilizadas

- **Backend:** NestJS + TypeScript
- **Banco de Dados:** PostgreSQL
- **Validação:** class-validator + class-transformer
- **Testes:** Jest + Supertest
- **ORM:** TypeORM

### 📥 Instalação e Configuração

1. **Clone o repositório**

```bash
git clone https://github.com/thiagoeu/oficina.git
```

2. **Instale as dependências**

```bash
npm install
```

3. **Suba o banco de dados com Docker**

```bash
# Execute o docker-compose para subir o PostgreSQL
docker-compose up -d
```

## Executar a Aplicação

### Rodando o Servidor em Modo de Desenvolvimento

Use este comando para iniciar a aplicação com _hot-reload_.

```bash
npm run start:dev
```

## Executar os testes

### Execução dos testes BDD

Use este comando para rodar os testes BDD.

```bash
npm run test:e2e
```
