FROM node:17-alpine AS development
ENV NODE_ENV development

# Diretorio
WORKDIR /app
# Instalacao das dependencias
COPY package.json .
COPY yarn.lock .
RUN yarn install
# Copia arquivos do src
COPY . .
# Expoe a porta
EXPOSE 3000
# Inicia o programa
CMD [ "yarn", "start" ]
