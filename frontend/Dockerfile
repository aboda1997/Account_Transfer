FROM node:alpine

WORKDIR /app
COPY . .
COPY /build /app/build



RUN npm install

CMD ["npm", "run", "build"] 