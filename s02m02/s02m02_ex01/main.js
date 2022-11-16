const express = require('express');

// é atribuído para a variável app as funções/metodos que o express disponibiliza e uma delas é subir o servidor
const app = express()

// o app.listen vai subir o servidor em uma porta e como segundo parâmetro passo uma "aerofunction" que pode fazer qualquer coisa para subir o servidor. Ex. toda vez que o servidor subir enviar um sms, um console.log('servidor no ar'). Estou informando uma porta mas isto é feito pela própria máquina, lidar com estas portas 

app.listen(3333, () => {
  console.log('servidor no ar')
})

// se agora digitar node main, vai subir o arquivo.
// Só que é inviável fazer isto sempre para subir o servidor, quando faço uma alteração no código tenho que parar o servidor e subir de novo. Para resolver isto, é instalado o pacote nodemon que verifica qualquer alteração e já sobe o servidor de novo. Comando "npm install nodemon --save-dev" - com dependência de desenvolvimento. Para fazer funcionar depois de instalado, ir no package.json e criar um script chamado 'api' por exemplo e vai rodar 'npx nodemon main.js'. Depois digitar no terminal 'npm run api.