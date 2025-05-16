FROM node:20.19.2

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]