
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [url, setUrl] = useState("")
  const [ingredientsSelected, setIngredientsSelected] = useState([])

  const ingredients = [
    {
      "nome": "gorgonzola",
      "url": "https://www.cozinhatecnica.com/wp-content/uploads/2018/07/queijo-gorgonzola-1.jpg"
    },
    {
      "nome": "calabresa",
      "url": "https://t4.ftcdn.net/jpg/04/81/02/77/360_F_481027764_Ree9Dsmep27mcnKuUAlqN01ovnYNwstU.jpg"
    },
    {
      "nome": "tomate",
      "url": "https://scfoods.fbitsstatic.net/img/p/tomate-debora-maduro-para-molho-500g-70892/257510.jpg?w=800&h=800&v=no-change&qs=ignore"
    },

  ]


  const [pizzas, setPizzas] = useState([])

  function handleGet() {
    fetch('http://localhost:3333/pizzas')
      .then(async response => {
        const data = await response.json()
        setPizzas(data)
      })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('http://localhost:3333/pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        url: url,
        ingredients: ingredientsSelected
      })
    })
  }

  useEffect(() => {
    handleGet()
  }, [])

  const selectedIngredient = (name) => {
    setIngredientsSelected([...ingredientsSelected, name])
  }

  console.log(ingredientsSelected)

  return (
    <div className='container'>
      <header className='header-container'>
        <h1>Pizzaria divina pizza</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="nome" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="url" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="descricao" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="preco" />
        {ingredients.map(item =>  <img 
        src={item.url} 
        width="30px" 
        height="30px" alt={item.nome} 
        onClick={() => selectedIngredient(item.nome)}
        />)}
        <button type="submit">Cadastrar</button>
      </form>
      <section>
        {
          pizzas.map(pizza => (
            <div key={pizza.id}>
              <img src={pizza.url} width="30px" height="30px" alt={pizza.name} />
              {pizza.name}
            </div>
          ))
        }
      </section>
    </div>
  );
}

export default App;
