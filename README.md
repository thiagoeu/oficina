# 🛠️ Aplicação Oficina - Teste de Software

## Equipe

Thiago Barbosa 

Kevin Ryan

Gabriel Domingos

Luiz Oliveira

Ryan Soares


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

## 🧪 Testes

Na pasta **`test`** estão localizados os arquivos escritos em **Gherkin (`.feature`)**, que descrevem os cenários de teste comportamentais (BDD).
Os **steps** correspondentes implementam os **testes end-to-end (E2E)** utilizando **Jest**, **Supertest** e **jest-cucumber**, garantindo a integração completa entre as camadas da aplicação (rotas, serviços e banco de dados).

Cada cenário `.feature` descreve um fluxo de uso real, e os steps executam as requisições HTTP contra a aplicação **NestJS**, validando o comportamento esperado do sistema.

### Execução dos testes BDD

Use este comando para rodar os testes BDD.

```bash
npm run test:e2e
```
