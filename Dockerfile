FROM node:20-alpine

WORKDIR /app

# copy package files i instaliraj dependencije
COPY package*.json tsconfig.json ./
RUN npm install

# kopiraj kod
COPY src ./src

# build ako koristiš TS
RUN npm run build

# expose porta iz backenda (menjaj ako nije 5000)
EXPOSE 5000

CMD ["npm", "run", "start"]