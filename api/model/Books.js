const db = require('../config');

class Books{
    fetchBooks(req, res){
        const query = "SELECT bookID, bookTitle, category, bookUrl FROM Books;"

        db.query(query, (err, results) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }

    fetchBook(req, res){
        const { id } = req.params
        const query = `SELECT bookID bookTitle category bookUrl FROM Books WHERE bookID = ?;`

        db.query(query, [id], (err, result) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }

    register(req, res){
        const query = `INSERT INTO Books SET ?`
        const data = req.body

        db.query(query, [data], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Book has been added"
            })
        })
    }

    // addBookToCart(req, res){
    //     const query = `INSERT INTO Orders SET ?`
    //     const { orderID, userID, bookID, orderDate } = req.body
    //     const order = {
    //         orderID: orderID,
    //         userID: userID,
    //         bookID: bookID,
    //         orderDate: orderDate
    //     }        

    //     db.query(query, [order], (err) =>{
    //         if(err) throw err
    //         res.json({
    //             status: res.statusCode,
    //             msg: "Book has been added to cart"
    //         })
    //     })
    // }

    deleteBook(req, res){
        const query = `DELETE FROM Books WHERE bookID = ?`
        const { id } = req.params

        db.query(query, [id], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Book has been deleted"
            })

        })
    }
}

module.exports = Books