# pull official base image
FROM node:lts-alpine

# set working directory
WORKDIR /front

# add `/app/node_modules/.bin` to $PATH
ENV PATH /front/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
#RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY .. ./

# start app
CMD ["npm", "start"]