FROM nampdn/node-alpine-git:11

WORKDIR /app

RUN mkdir /app/node_modules

COPY package.json package-lock.json ./

COPY . .

RUN npm install && npm run compile

VOLUME /app/node_modules

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["build/index.js"]
