import express from 'express';
import ProductManager from './main.js'

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }))

//home
app.get('/', (req, res) => {
  res.send('Pagina Principal');
})

//busqueda producto mediante req.query con límite de resultados.

app.get('/products', (req, res) => {
  let limit = parseInt(req.query.limit)
  try {
    if (!limit || limit === null) {
      res.send(ProductManager.getProducts())
    } else {
      const arr = ProductManager.getProducts()
      const arr2 = arr.slice(null, limit)
      res.json(arr2)
    }
  } catch (error) {
    res.send('Lista de productos no encontrada')
  }

})

 //Busqueda producto por req.params e id. Ejemplo:'http://localhost:4000/products/3'
  app.get('/products/:pid', async (req, res) => {
    
    let  pid  = parseInt(req.params.pid)
    const product = await ProductManager.getProductById(pid)
    
   if(product) {
    return res.send (product) 
    }else{
      return res.send('Producto no encontrado. Intente con otro ID.')
    } 
   
    
  })

app.get('*', (req, res) => {
  res.send('404|Page not found')
})


app.listen(port, () => {
  console.log(`Listening port http://localhost:${port}`)
});



