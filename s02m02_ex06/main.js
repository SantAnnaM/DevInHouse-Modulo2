const { response } = require("express");
const express = require("express");
const { request } = require("http");

// é atribuído para a variável app as funções/métodos que o express disponibiliza e uma delas é subir o servidor
const app = express();

// quando coloco 2 pontos estou renomeando a importação
const { v4: uuidv4 } = require("uuid");

// se agora digitar node main, vai subir o arquivo.
// Só que é inviável fazer isto sempre para subir o servidor, quando faço uma alteração no código tenho que parar o servidor e subir de novo. Para resolver isto, é instalado o pacote nodemon que verifica qualquer alteração e já sobe o servidor de novo. Comando "npm install nodemon --save-dev" - com dependência de desenvolvimento. Para fazer funcionar depois de instalado, ir no package.json e criar um script chamado 'api' por exemplo e vai rodar 'npx nodemon main.js'. Depois digitar no terminal 'npm run api. Exercício 1 até aqui.

// Exercício2: Crie um conjunto de rotas que permita gerenciar as pizzas da aplicação.
// Listar todas as pizzas
// Ação: GET
// Endpoint: /pizzas
// Query params: name
// Resposta: Status Code 200; Um array de objetos contendo (id, name, description, price, /ingredients).‌

// Cadastrar uma nova pizza
// Ação: POST
// Endpoint: /pizzas
// BODY: cada pizza contém um nome, descrição, price e um array de ingredientes.
// Resposta: Status Code 201; O objeto da pizza criada.

// Listar todas as pistas através da rota get filtrando pelo nome porque foi indicado o Query params: name. A variável 'app' é que foi atribuída pelo express. Com o método get e o endpoint /pizzas, e toda requisição tem seu request e seu response. è criado a variável pizzas que vai armazenar o array de pizzas.

let pizzas = [];
let solicitations = [];

// informar que a api recebe json
app.use(express.json());

// ---- //
// Exercício 6: Adicione 2 rotas novas na aplicação. Divirta-se!

// Route to update a pizza price by id
app.patch("/:id", update);

// Route to delete a pizza by id
app.delete("/solicitations/:id", (request, response) => {
  const { id } = request.params;

  // Depois foi dado um find no array de solicitations buscando todo pedido, onde o id do pedido seja igual ao id que recebi via route params.
  const solicitation = solicitations.find(
    (solicitation) => solicitation.id === id
  );
  if (solicitation === -1) {
    return response.status(404).json({ message: "Pedido não encontrado" });
  }

  solicitations.splice(solicitation, 1);

  return response.status(204).send();
});

export function destroy(req, res) {
  const solicitationIndex = solicitations.findIndex(
    (solicitation) => solicitation.id === id
  );

  if (solicitationIndex === -1) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  solicitations.splice(solicitationIndex, 1);

  return res.status(204).send();
}
// ----   //

app.get("/pizzas", (request, response) => {
  const nameQuery = request.query.name || "";

  // vou percorrer cada pizza fazendo filter nelas. A condição de aprovação para retornar esta pizza é ..(pizza.name) esteja incluída (includes procura uma palavrinha dentro de uma string) dentro do meu parâmetro que eu recebi acima = nameQuery
  const pizzasFiltered = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(nameQuery.toLowerCase())
  );
  // Retorno a variável
  response.json(pizzasFiltered);
});

// Exercício 4:
// Crie uma rota que permita visualizar os detalhes de um determinado pedido utilizando o id do pedido como Route Params.
// Para listar uma pizza em específico, pelo ID, cria-se uma rota:
// abaixo '/solicitations/:id' é um route params do express, onde ele entende que qualquer coisa que vier /solicitation/alguma coisa após este /, entende que seja um parâmetro que tenha que ser atribuído ao id.
// então, para capturar este valor é através de request.params.id

app.get("/solicitations/:id", (request, response) => {
  // {id} significa que foi desestruturado. Outra forma seria colocar request.params.id

  const { id } = request.params;

  // Depois foi dado um find no array de solicitations buscando todo pedido, onde o id do pedido seja igual ao id que recebi via route params.
  const solicitation = solicitations.find(
    (solicitation) => solicitation.id === id
  );
  return response.json(solicitation);
});

// para listar as pizzas, no insomnia em get, incluo no query o name com o valor 'nome da pizza'. Para receber este Query Param dentro do meu backend é através do parâmetro request.query

// Recebo como parâmetro do meu cliente um nome, descrição, price e um array de ingredientes. Foi determinado que o cliente deve enviar estas informações para surgir uma pizza. Então crio uma variável pizza e vou montar o objeto que vou cadastrar
app.post("/pizzas", (request, response) => {
  const pizza = {
    id: uuidv4(),
    name: request.body.name,
    description: request.body.description,
    url: request.body.url,
    price: request.body.price,
    ingredients: request.body.ingredients,
  };

  // Para não permitir cadastrar pizza com mesmo nome, poderia utilizar yup, mas pode ser feito assim:
  // dar um find nas pizzas para ver se encontro dentro do array de pizzas uma pizza (pizza.name) onde a pizza.name for igual o name que recebi do meu body

  const pizzaExists = pizzas.find((pizza) => pizza.name === request.body.name);

  //Se a pizza existir, status 401 = não permitido (poderia ser 400.), vou mandar um erro para o frontend (.json {error} )
  if (pizzaExists) {
    return response.status(401).json({ error: "pizza já cadastrada" });
  }

  // outra forma de fazer é criar uma variável const {name, description, price} = request.body
  // const pizza = { name, description, price}

  pizzas.push(pizza);
  // retornar o resposta para o cliente que deu tudo ok.

  response.status(201).json(pizza); // É bom sempre que cadastrar um elemento é mandar o objeto criado
});

// Exercício 3 :
// Crie um conjunto de rotas que permita gerenciar os pedidos da aplicação.
// Listar todos os pedidos
// Ação: GET
// Endpoint: /solicitations
// Resposta: Status code 200; um array de objetos contendo o detalhes de cada pedido.
// Cadastrar um novo pedido
// Ação: POST
// Endpoint: /solicitations
// BODY: nome do cliente, cpf do cliente, endereço do cliente, telefone do cliente, forma de pagamento, observação, pedido do cliente(array).
// Resposta: O objeto do pedido criado.

// Rota abaixo para retornar todos os pedidos que foram 'push' na variável solicitationS
app.get("/solicitations", (request, response) => {
  response.json(solicitations);
});

app.post("/solicitation", (request, response) => {
  // (1.04 min) vou receber de parâmetros deste body :
  const {
    name_client,
    document_client,
    contact_client,
    address_client,
    payment_method,
    observations,
    pizzas,
  } = request.body;
  // criando um novo objeto "solicitation", copia todas as variáveis acima, cria o ID.
  // Todo pedido tem um "status", que é o que vai diferenciar o pedido da cozinha do pedido do entregador  porque assim consigo utilizar esta mesma rota tanto para a cozinha quanto para o entregador. Então todo status inicia com "Em Produção" porque se eu estou na cozinha a solicitação que faço para o back-end é "lista todos as onde o status for em produção", e a cozinha vai ver só os pedidos em produção. No entregador posso utilizar esta mesma rota porque vou listar o status igual a caminho.
  const solicitation = {
    id: uuidv4(),
    name_client,
    document_client,
    contact_client,
    address_client,
    payment_method,
    observations,
    status: "EM PRODUÇÃO",
  };

  // a variável solicitationS criada para dar push nela passando o solicitatioN
  solicitations.push(solicitation);
  // vou retornar o objeto criado por solicitation
  response.status(201).json(solicitation);
});

//  Então,
//  Recebi o parâmetro (app.post(/solicitation),  montei o objeto (const solicitation) que quero criar, dou push nele e retorno uma solicitação com sucesso.

// Para listar todos os pedidos, tem que criar uma nova rota do tipo get (código está antes do app.post)

// o app.listen vai subir o servidor em uma porta e como segundo parâmetro passo uma "aerofunction" que pode fazer qualquer coisa para subir o servidor. Ex. toda vez que o servidor subir enviar um sms, um console.log('servidor no ar'). Estou informando uma porta mas isto é feito pela própria máquina, lidar com estas portas

app.listen(3333, () => {
  console.log("servidor no ar");
});

// abrir insomnia e criar projeto pizza
