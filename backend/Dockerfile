FROM node:8.11.4-alpine
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "index.js"]