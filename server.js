import express from "express";

const app = express();

app.use(express.json());

let products = [
  { name: 'p1', price: 10 },
  { name: 'p2', price: 20 }
]

// ✅ GET all products
app.get('/products', (req, res) => {
  res.send(products)
})

// ✅ GET product by name
app.get('/products/:name', (req, res) => {
  let nameToFetch = req.params.name
  let productToFetch = products.filter(e => e.name === nameToFetch)
  productToFetch.length === 0
      ? res.status(404).send({ message: 'Product not found' })
      : res.send(productToFetch)
})

// ✅ POST new product
app.post('/add_product', (req, res) => {
  let newProduct = req.body
  let exists = products.filter(e => e.name === newProduct.name)

  exists.length > 0
      ? res.status(409).send({ message: 'Product already exists' })
      : (products.push(newProduct), res.send({ message: 'Product added', products }))
})

// ✅ PUT modify a product
app.put('/modify_product', (req, res) => {
  let modified = req.body
  let found = false

  products = products.map(e =>
      e.name === modified.name
          ? ((found = true), modified)
          : e
  )

  found
      ? res.send({ message: 'Product updated', products })
      : res.status(404).send({ message: 'Product not found' })
})

// ✅ DELETE a product by name
app.delete('/delete_product/:name', (req, res) => {
  let nameToDelete = req.params.name
  let beforeCount = products.length
  products = products.filter(e => e.name !== nameToDelete)

  products.length === beforeCount
      ? res.status(404).send({ message: 'Product not found' })
      : res.send({ message: 'Product deleted', products })
})

app.listen(3000, (err) => {
  if (err) {
      console.log('Error while running server')
  } else {
      console.log('Server is running on port 3000')
  }
})