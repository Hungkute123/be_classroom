FROM node:lts-alpine

# Working in root app
WORKDIR /usr/src/app
COPY package.json package-lock.json tsconfig.json jest.config.js server.http ./
COPY src src
RUN npm config set unsafe-perm true
RUN npm install

# build app
RUN ls -l src
RUN npm run build
# remove devDependencies libraries
RUN npm prune --production
RUN rm -r src

EXPOSE 9000

CMD ["npm", "start"]