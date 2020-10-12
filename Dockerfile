FROM node:12-alpine

WORKDIR /usr/app

COPY . .

ENV NODE_ENV development

RUN yarn install

CMD ["yarn", "nodemon"]
