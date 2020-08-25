FROM node:12.13-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "/usr/src/app/"]

RUN npm install 

COPY [".", "/usr/src/app/"]

ARG NODE_ENV
ARG PORT
ENV NODE_ENV=${NODE_ENV}

EXPOSE ${PORT}

CMD ["npm", "start"]
