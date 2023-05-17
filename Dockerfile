# base image
FROM node:19.6.1

WORKDIR /usr/app


COPY . .

RUN yarn ci --only=production

RUN yarn build

CMD ["yarn","dev"]