# Pocketpoint BE

## Requirements

- Node.js version 14.x or later
- Npm version 7.x or later
- Yarn version 1.22.x or later

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mujkanovic01/pocketpoint.git
   ```

2. Install dependecies :

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Open the .env file and replace the placeholders with your own credentials.

4. Create an empty mysql database and put the details in the env file:

   ```bash
   DB_HOST = '127.0.0.1'
   DB_USER = 'db_user'
   DB_PASSWORD = 'db_pass'
   DB_DATABASE = 'db_name'
   DB_PORT = '3306'
   ```

5. Run the migrations:

   ```bash
   npx knex migrate:latest
   ```

6. Run the seeding for the database:

   ```bash
   npx knex seed:run
   ```

7. Build and start the server:

   ```bash
   yarn build && yarn start
   ```

