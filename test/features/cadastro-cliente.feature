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
      |  kevin  | Júnior   | 12345678901 | 11987654321| 01001000 | kevinJr#email.com | minhasenha123 |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "E-mail inválido"

  Scenario: Erro ao verificar Senha não preenchida
    Given que o banco de dados de teste está limpo
    When eu envio uma requisição POST para "/customer" com:
      | name | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
      |  kevin  | Júnior   | 12345678901 | 11987654321| 01001000 | kevinJr@email.com |  |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "Senha não preenchida"

  Scenario: Erro ao verificar CEP inválido
    Given que o banco de dados de teste está limpo
    When eu envio uma requisição POST para "/customer" com:
      | name | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
      |  kevin  | Júnior   | 12345678901 | 11987654321| 01000 | kevinJr@email.com | minhasenha123 |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "CEP inválido, deve conter apenas números e ter exatamente 8 digito"

  Scenario: Erro ao verificar senha com menos de 8 caracteres
      Given que o banco de dados de teste está limpo
      When eu envio uma requisição POST para "/customer" com:
        | name | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
        |  kevin  | Júnior   | 12345678901 | 11987654321| 01001000 | kevinJr@email.com | 123 |
      Then o sistema deve retornar status 409
      And o corpo deve conter a mensagem "Senha deve conter pelo menos 8 caracteres"

  Scenario: Erro ao verificar número de telefone com menos dígitos
      Given que o banco de dados de teste está limpo
      When eu envio uma requisição POST para "/customer" com:
        | name | lastName | cpf         | phone      | zipCode   | user.email        | user.password  |
        |  kevin  | Júnior   | 12345678901 | 11654321| 01001000 | kevinJr@email.com | minhasenha123 |
      Then o sistema deve retornar status 400
      And o corpo deve conter a mensagem "O telefone deve ter 10 ou 11 dígitos"

  Scenario: Erro ao cadastrar cliente com CPF duplicado
    Given que o banco de dados de teste está limpo
    And que já existe um cliente cadastrado com CPF "12345678901"
    When eu envio uma requisição POST para "/customer" com:
      | name   | lastName | cpf         | phone      | zipCode   | user.email          | user.password  |
      | Carlos | Silva    | 12345678901 | 11987654321| 01001000  | carlos2@email.com   | minhasenha123  |
    Then o sistema deve retornar status 409
    And o corpo deve conter a mensagem "Cliente já possui cadastro"    
      
