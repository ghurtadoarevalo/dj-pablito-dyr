FROM node:20.10

ENV TZ=America/Santiago

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN corepack enable pnpm

WORKDIR /app