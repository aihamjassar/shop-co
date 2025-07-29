# server/Dockerfile

FROM node:20-apline

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY  . .

EXPOSE 5000

CMD [ "npm", "run", "dev" ]