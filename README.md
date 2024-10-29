# Desafio 01

## Objetivo

Criar um servidor HTTP que retorne um JSON com uma lista de tasks. As tasks devem ser armazenadas em um array. Deve ser
possível criar, atualizar, deletar e marcar como concluída uma task.

## Requisitos

A API deve conter as seguintes funcionalidades:

- Criação de uma task
- Listagem de todas as tasks
- Atualização de uma task pelo `id`
- Remover uma task pelo `id`
- Marcar pelo `id` uma task como completa
- E o verdadeiro desafio: Importação de tasks em massa por um arquivo CSV

### Rotas e regras de negócio

- `id` - Identificador único de cada task
- `title` - Título da task
- `description` - Descrição detalhada da task
- `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
- `created_at` - Data de quando a task foi criada.
- `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.

## Rodando o projeto

Para instalar as dependências, execute o comando `npm install`.
Para rodar o projeto, execute o comando `npm start`. O servidor será iniciado na porta `3000`.

Para simular o upload de csv, use o comando `npm run import-tasks`. O arquivo `tasks.csv` será importado para o banco de dados.

    