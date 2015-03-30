
FROM node:0.12
EXPOSE 3000

COPY . /app

WORKDIR /app
CMD ["npm", "start"]

