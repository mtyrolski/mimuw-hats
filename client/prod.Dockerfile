FROM node:lts-alpine
WORKDIR /front
ENV PATH /front/node-modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /front/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
