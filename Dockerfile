FROM node:20-alpine

RUN corepack enable pnpm

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 8080

CMD [ "pnpm", "preview" ]