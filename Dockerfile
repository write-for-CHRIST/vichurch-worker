FROM nampdn/node-alpine-git:11

WORKDIR /app

COPY package.json .

RUN yarn install --frozen-lockfile --production

RUN yarn compile

COPY . .

EXPOSE 3000

ENTRYPOINT ["node"]
CMD ["build/index.js"]
