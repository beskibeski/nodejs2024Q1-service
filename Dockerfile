FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]
