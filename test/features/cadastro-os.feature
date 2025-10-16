Feature: Cadastro de Ordem de Serviço

  Scenario: Criar ordem de serviço completa com peça e serviço válidos
    Given que o banco de dados de teste está limpo
    And existe um cliente previamente cadastrado
    And existe um veículo previamente cadastrado
    And existe um mecânico previamente cadastrado
    When eu envio uma requisição POST para "/service-order" com:
      | customer_id | vehicle_id | item               | service              | mechanic_id | payment_method | price |
      | 1           | 1          | Pastilha de freio  | Troca de pastilha    | 1           | PIX            | 1800.4|
    Then o sistema deve retornar status 201
    And o corpo deve conter a mensagem "Ordem de serviço criada com sucesso"