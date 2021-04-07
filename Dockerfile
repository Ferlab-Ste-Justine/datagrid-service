FROM node:14.4.0-alpine

ADD . /code
WORKDIR /code
RUN npm install
RUN npm run build

RUN rm -rf node_modules
RUN npm install --only=prod

EXPOSE 5151

CMD ["node", "./dist/server.js"]