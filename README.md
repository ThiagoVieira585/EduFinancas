# EduFinancas

O EduFinancas é uma aplicação de gerenciamento financeiro pessoal, onde os usuários podem acompanhar suas receitas e despesas de maneira organizada.

## Instalação

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Clone este repositório:
   ```
   git clone https://github.com/SeuNomeDeUsuário/EduFinancas.git
   ```
3. Navegue até o diretório do projeto:
   ```
   cd EduFinancas
   ```
4. Instale as dependências:
   ```
   npm install
   ```
5. Caso tenha dificuldades com algumas dependências, tente instalar separado dessa forma:
   ```
   npm install --save-dev @types/express @types/node @types/cors
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto para as variáveis de ambiente:
   ```
   PORT=3000
   MONGODB_URI=Sua_URL_Do_Banco_De_Dados_MongoDB
   ```
2. Inicie o servidor:
   ```
   npm run dev
   ```
3. O servidor estará em execução em http://localhost:3000.

## Uso

- Acesse a API por meio das rotas definidas nos roteadores.
- Para interagir com a interface do usuário (front-end), configure a origem permitida (allowed origin) para o CORS no servidor.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um Pull Request para melhorias ou correções.
