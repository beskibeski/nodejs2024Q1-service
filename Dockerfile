FROM node:20-alpine

WORKDIR /app

COPY package.json /app/

RUN npm install --only=production

COPY . .

EXPOSE 4000

CMD ["npm", "run", "build"]
