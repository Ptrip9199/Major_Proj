FROM node:10

WORKDIR /front

ENV PATH /front/node_modules/.bin:$PATH 

COPY package*.json ./

RUN npm install 

COPY . ./


RUN npm start
