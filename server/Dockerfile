FROM node:lts-alpine

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

COPY . .
RUN npm install
RUN npm run compile

CMD [ "node", "dist/server.js" ]
