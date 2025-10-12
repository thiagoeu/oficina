Feature: Cadastro de Cliente

  Scenario: Cliente cadastrado com sucesso
    Given que o banco de dados de teste está limpo
    When eu envio uma requisição POST para "/customer" com:
      | name   | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
      | Kevin  | Júnior   | 12345678901 | 11987654321| 01001000 | kevinJr@email.com | minhasenha123 |
    Then o sistema deve retornar status 201
    And o corpo deve conter a mensagem "Cliente cadastrado com sucesso"

  Scenario: Erro ao cadastrar cliente com Nome vazio
    Given que o banco de dados de teste está limpo
    When eu envio uma requisição POST para "/customer" com:
      | name | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
      |    | Júnior   | 12345678901 | 11987654321| 01001000 | kevinJr@email.com | minhasenha123 |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "Nome é obrigatório"

    
  Scenario: Erro ao cadastrar cliente com CPF invalido
    Given que o banco de dados de teste está limpo
    When eu envio uma requisição POST para "/customer" com:
      | name | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
      |  kevin  | Júnior   | 12901 | 11987654321| 01001000 | kevinJr@email.com | minhasenha123 |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "O CPF deve conter apenas números e ter 11 caracteres"

  Scenario: Erro ao verificar formato inválido de Email
    Given que o banco de dados de teste está limpo
    When eu envio uma requisição POST para "/customer" com:
      | name | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
      |  kevin  | Júnior   | 12901 | 11987654321| 01001000 | kevinJr#email.com | minhasenha123 |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "O CPF deve conter apenas números e ter 11 caracteres"

    
