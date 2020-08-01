FROM node:lts-alpine

ENV NODE_ENV production

ENV CLIENT_HOME_PAGE_URL https://mimuw-hats.herokuapp.com/
ENV JWT_EXPIRATION_SECS 60
ENV SWAGGER_DOC_PATH ./swagger.json
ENV ML_BINARY_CLASSIFIER_URL http://students.mimuw.edu.pl:5000/predict_binary
ENV ML_BOUNDING_COMPARE_URL http://students.mimuw.edu.pl:5000/similarity
ENV HATS_STORAGE_DIR ./upload
ENV HATS_STORAGE_ENDPOINT /cdn

WORKDIR /app

COPY . .
RUN npm install
RUN npm run compile

CMD [ "node", "dist/server.js" ]
