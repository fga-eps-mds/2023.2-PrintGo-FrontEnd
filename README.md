# 2023.2-PrintGo-FrontEnd

<div align="center">
     <img src="assets/logoPrintGo.svg" height="350px" width="350px">
</div>

# 1. Clone o projeto
git clone git@github.com:fga-eps-mds/2023.2-PrintGo-FrontEnd.git

# 2. Entre na pasta do projeto
cd 2023.2-PrintGo-FrontEnd

# Construa a imagem do docker 
```bash 
sudo docker build -t frontprintgo .
```
# Execute o container
```bash 
sudo docker run -p 3000:3000 frontprintgo 
```
# Caso os comando acima falhem, utilize:
```bash 
sudo docker-compose up --build
```
```bash 
sudo docker-compose up
```
=======
# Caso prefira usar yarn eh n tenha
npm i -g yarn

# Instalar dependencias
yarn
    #ou
npm i

cp .env.dev .env

# Rode o docker compose do projeto
docker-compose up --build
    # --build somente eh necessario na primeira vez que estiver rodando
    # depois `docker-compose up` ja resolve
    # em linux talvez seja necessario a execucao em modo root `sudo docker-compose up`
    # voce pode também caso queria adicionar um -d ao final para liberar o o terminal `docker-compose up -d`
    # Para finalizar o servico execute no root do projeto `docker-compose down`

# finalizado execução do docker faca o migrate da base de dados
yarn db:migrate
    #ou
npm run db:migrate
```

## Contribuir

Para contribuir com esse projeto é importante seguir nosso [Guia de Contribuição](https://fga-eps-mds.github.io/2023.2-PrintGo-Doc/guia_de_contribuicao/) do repositório e seguir nosso [Código de Conduta](https://fga-eps-mds.github.io/2023.2-PrintGo-Doc/codigo_conduta/).

## Ambientes

- [Documentação](https://github.com/fga-eps-mds/2023.2-PrintGo-Doc)

- [Front-End](https://github.com/fga-eps-mds/2023.2-PrintGo-FrontEnd)

- [Back-End: UserService](https://github.com/fga-eps-mds/2023.2-PrintGo-UserService)

- [Back-End: OcurrenceService](https://github.com/fga-eps-mds/2023.2-PrintGo-OcurrenceService)

- [Back-End: PrinterService](https://github.com/fga-eps-mds/2023.2-PrintGo-PrinterService)
