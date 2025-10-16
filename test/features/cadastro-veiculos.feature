Feature: Cadastro de Veiculos

  Scenario: Cadastro de veículo com todos os campos corretos
    Given que o banco de dados de teste está limpo
    And existe um cliente previamente cadastrado
    When eu envio uma requisição POST para "/vehicle" com:
      | plate   | brand  | model   | color  | year | customerId |
      | ABC1D23 | Toyota | Corolla | Preto  | 2020 | 8          |
    Then o sistema deve retornar status 201
    And o corpo deve conter a mensagem "Veículo cadastrado com sucesso"

  Scenario: Erro verificar campo obrigatório Ano vazio
    Given que o banco de dados de teste está limpo
    And existe um cliente previamente cadastrado
    When eu envio uma requisição POST para "/vehicle" com:
      | plate   | brand  | model   | color  | year | customerId |
      | ABC1D23 | Toyota | Corolla | Preto  | null | 8          |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "Ano é obrigatório"

  Scenario: Erro verificar campo obrigatório Modelo vazio
    Given que o banco de dados de teste está limpo
    And existe um cliente previamente cadastrado
    When eu envio uma requisição POST para "/vehicle" com:
      | plate   | brand  | model | color  | year | customerId |
      | ABC1D23 | Toyota |       | Preto  | 2020 | 8          |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "Modelo é obrigatório"

  Scenario: Erro verificar campo obrigatório Cor vazio
    Given que o banco de dados de teste está limpo
    And existe um cliente previamente cadastrado
    When eu envio uma requisição POST para "/vehicle" com:
      | plate   | brand  | model   | color | year | customerId |
      | ABC1D23 | Toyota | Corolla |       | 2020 | 8          |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "Cor é obrigatória"

  Scenario: Erro verificar campo obrigatório Marca vazio
    Given que o banco de dados de teste está limpo
    And existe um cliente previamente cadastrado
    When eu envio uma requisição POST para "/vehicle" com:
      | plate   | brand | model   | color  | year | customerId |
      | ABC1D23 |       | Corolla | Preto  | 2020 | 8          |
    Then o sistema deve retornar status 400
    And o corpo deve conter a mensagem "Marca é obrigatória"

  Scenario: Erro verificar campo obrigatório Cliente vazio
      Given que o banco de dados de teste está limpo
      And existe um cliente previamente cadastrado
      When eu envio uma requisição POST para "/vehicle" com:
        | plate   | brand | model   | color  | year | customerId |
        | ABC1D23 | Toyota| Corolla | Preto  | 2020 | 8          |
      Then o sistema deve retornar status 400
      And o corpo deve conter a mensagem "Cliente deve ser selecionado"
      
  Scenario: Erro verificar campo Ano inválido
      Given que o banco de dados de teste está limpo
      And existe um cliente previamente cadastrado
      When eu envio uma requisição POST para "/vehicle" com:
        | plate   | brand | model   | color  | year | customerId |
        | ABC1D23 | Toyota| Corolla | Preto  | 1700 | 8          |
      Then o sistema deve retornar status 409
      And o corpo deve conter a mensagem "Ano inválido"
