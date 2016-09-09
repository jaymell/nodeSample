FROM node:4.5

RUN mkdir /app

ADD package.json /app/

WORKDIR /app

RUN npm install

ADD app.js /app/
COPY routes/ /app/routes/
COPY views/ /app//views/


CMD ["nodejs", "app.js"]
