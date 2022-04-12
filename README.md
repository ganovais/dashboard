# Aula Dashboard

## Plugins
    - FontAwesome - https://fontawesome.com/icons?d=gallery
    - BootStrap - https://getbootstrap.com/

## Link do Git  
    - https://git-scm.com/downloads

## 1 criar branch

## 2 Clone from git
    - Button code
    - Escolher https

## 3 abrir git bash
    - digitar git clone e colar link do https

## 4 Fazer o push (mandar para a branch online)
    - git add -A
    - git commit -m "sua mensagem"
    - git push (envia por completo)

## 5 GitHub Pages
    - Para colocar seu site no ar(online para todos)


## Criando API com JS
    - yarn init -y
    - yarn add express
    - yarn add typescript -D
    - yarn tsc --init (cria o tsconfig.json)
        - outDir: ./dist
        - rootDir: ./src
    - yarn tcs (builda o código ts para a pasta dist)
        - node dist/server.js
    - yarn add @types/express -D
    Inside file package.json
        - "scripts": {
            "build": "tsc"
        }

    - yarn add ts-node-dev -D
    Inside file package.json
        - "scripts": {
            "build": "tsc",
            "dev:server": "ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts"
        }
    - yarn dev:server
    - yarn add uuidv4;

## File: server.ts
import express from express;   

const api = express();  

api.get('/', (request, response) => {  
    return response.json({ message: "Hello World!" })  
})  
api.listen(3333, () => {  
    console.log('🚀 Server started on port 3333!')  
});  
