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
