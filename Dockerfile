FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

# CMD ["npm", "run", "db:migrate"]

RUN ["chmod", "+x", "/app/entrypoint.sh"]

ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]

CMD ["npm", "run", "dev"]