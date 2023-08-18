const express = require('express');
const bodyParser = require('body-parser')
const routes = express.Router()
// import all model objects
const { verifyAToken } = require('../middleware/AuthenticateUser')
const { users, orders, books } = require('../model')

// routes.get('^/$|/challenger', (req, res)=>{
//     res.sendFile(path.resolve(__dirname, "../static/html/index.html"))
// })

// User routes ⬇️ 
routes.get('/users', (req, res) =>{
    users.fetchUsers(req, res)
})


routes.get('/users/:userID', (req, res) =>{
    users.fetchUser(req, res)
})

routes.post('/register', bodyParser.json(), (req, res) =>{
        users.register(req, res)
})

// routes.put('/user/:id', bodyParser.json(), (req, res) =>{
//     users.updateUser(req, res)
// })

routes.patch('/user/:id', bodyParser.json(), (req, res) =>{
    users.updateUser(req, res)
})

routes.delete('/user/:id', (req, res) =>{
    users.deleteUser(req, res)
})

routes.post('/login', bodyParser.json(), (req, res)=>{
    users.login(req, res)
})

// Order routes
routes.get('/orders', (req, res) =>{
    orders.fetchOrders(res, req)
})

routes.get('/orders/:id', (req, res) =>[
    orders.fetchOrder(req, res)
])

routes.post('/order/:userID/:bookID', bodyParser.json(), (req, res) =>{
    orders.registerOrder(req, res)
})

// Books routes

routes.get('/books', verifyAToken, (req, res) =>[
    books.fetchBooks(req, res)
])

routes.post('/addbook', bodyParser.json(), (req, res) =>{
    books.register(req, res)
})

routes.post('/addcart', bodyParser.json(), (req, res) =>{
    books.addBookToCart(req, res)
})

module.exports = {
    express,
    routes
}