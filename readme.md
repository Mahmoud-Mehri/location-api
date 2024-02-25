# Location API - Test Project

## How to run:

1. Option 1:

   1. Run `npm install` to install Node packages
   2. Set Port number and PostgreSQL settings on `src/config.ts` file
   3. Run `npm run dev` to run server

2. Option 2:

   1. Run `docker compose up -d`
      - It will take a bit time as it's using Normal versions of Node images (not alpine images), bcrypt package which is used in this project, has issue with alpine versions of Node

- Postman collection included in `doc` folder
