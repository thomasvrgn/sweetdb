FROM node:12-alpine AS BUILD_IMAGE

WORKDIR /app

COPY ["./package.json", "./yarn.lock", "/app/"]

RUN yarn install

COPY "./" "/app/"

RUN yarn bundle
RUN npm prune --production

FROM node:12-alpine
WORKDIR /app

COPY --from=BUILD_IMAGE "/app/dist/" "/app/dist/"

CMD [ "node", "./dist/bundle.js" ]