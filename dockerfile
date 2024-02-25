# Note: bcrypt package has issue with alpine versions of node.js
FROM node:18.17.0 as build

WORKDIR /usr/location-app

COPY package*.json .

RUN npm install

COPY . .

COPY .env /usr/location-app/

RUN npm run build

FROM node:18.17.0 as production

ARG ENV_ARG=production
ENV NODE_ENV=${ENV_ARG}

WORKDIR /usr/location-app

COPY package*.json .

RUN npm install --omit=dev

COPY --from=build /usr/location-app/.env ./

COPY --from=build /usr/location-app/dist ./dist

CMD ["node", "./dist/app.js"]