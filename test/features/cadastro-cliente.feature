Feature: Cadastro de Cliente

  Scenario: Cliente cadastrado com sucesso
    Given que o banco de dados de teste está limpo
    When eu envio uma requisição POST para "/customer" com:
      | name        | Kevin           |
      | lastName    | Júnior          |
      | cpf         | 12345678901     |
      | phone       | 11987654321     |
      | zipCode     | 01001000        |
      | user.email  | kevinJr@email.com |
      | user.password | ADM#vd123     |
    Then o sistema deve retornar status 201
    And o corpo deve conter a mensagem "Cliente cadastrado com sucesso"
