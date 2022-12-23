# Examenopdracht Front-end Web Development / Web Services

> Schrap hierboven wat niet past

- Student: Alexander Schatteman
- Studentennummer: 2021182201
- E-mailadres: Alexander.schatteman@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [NPM](https://www.npmjs.com/package/npm)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...

## Opstarten

Om alle dependencies te installeren run je eerst npm install, hierna kan je npm start uitvoeren om de development environment op te starten.
.ENV file moet volgende informatie bevatten:

```bash
NODE_ENV = "development"
DATABASE_HOST = "host"
DATABASE_PORT = "poort"
DATABASE_USERNAME = "username"
DATABASE_PASSWORD = "password"
DATABASE_NAME = "name"

AUTH_JWKS_URI=domain/.well-known/jwks.json
AUTH_AUDIENCE=audience
AUTH_ISSUER=domain
AUTH_USER_INFO=domain/userinfo

PORT="9000"
```

## Testen

env file:

```bash
NODE_ENV = "test"
DATABASE_HOST = "host"
DATABASE_PORT = "poort"
DATABASE_USERNAME = "username"
DATABASE_PASSWORD = "password"
DATABASE_NAME = "name"

AUTH_TEST_USER_USER_ID=userid
AUTH_TEST_USER_USERNAME=username
AUTH_TEST_USER_PASSWORD=password
AUTH_TOKEN_URL=domain/oauth/token
AUTH_CLIENT_ID=clientid
AUTH_CLIENT_SECRET=clientsecret

AUTH_JWKS_URI=domain/.well-known/jwks.json
AUTH_AUDIENCE=audience
AUTH_ISSUER=domain
AUTH_USER_INFO=domain/userinfo

PORT="9000"
```

testen uitvoeren:

npm test
npm run test:coverage

output coverage:

[![Image from Gyazo](https://i.gyazo.com/b775f96d3832658a8ff8231913b9b186.png)](https://gyazo.com/b775f96d3832658a8ff8231913b9b186)

[![Image from Gyazo](https://i.gyazo.com/ffc8d0efc18e603350022cceddd45746.png)](https://gyazo.com/ffc8d0efc18e603350022cceddd45746)
