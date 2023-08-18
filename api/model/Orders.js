const { hashSync } = require('bcrypt');
const db = require('../config');

class Orders{
    fetchOrders(req, res){
        const query = 
        `INSERT INTO Orders ()`

        db.query(query, (err, results) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results

            })
        })
    }

    fetchOrder(req, res){
        const { id } = req.params
        const query = `SELECT orderID, userID, bookID, orderDate FROM Orders WHERE orderID = ?`

        db.query(query, [id], (err, result) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }

    updateOrder(req, res){
        const query = `UPDATE Orders SET ? WHERE orderID = ?`
        const { id } = req.params
        const data = req.body

        db.query(query, [data, id], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Order has been updated"
            })
        })
    }

    deleteOrder(req, res){
        const query = "DELETE FROM Orders WHERE orderID = ?"
        const { id } = req.params

        db.query(query, [id], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Order has been deleted"
            })
        })
    }

    registerOrder(req, res){
        const query = `INSERT INTO Orders (orderID, userID, bookID, orderDate) VALUES
        (${req.params.orderID},${req.params.userID},${req.params.bookID}, ?);`
        const orderDate = req.body

        db.query(query, [orderDate], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Order has been created"
            })
        })
    }
}

module.exports = Orders

// User Table - userID - PK
// Orders Table - prodID - FK
// Products Table - ProdID - PK linked to Orders table (FK - prodID)

// Use the keyword USING not ON