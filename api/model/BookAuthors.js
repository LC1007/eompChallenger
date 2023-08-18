const db = require('../config');

class BookAuthors{
    fetchBooks(req, res){
        const query = "SELECT id, authorName, authorSurname, bookID FROM BookAuthor;"

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
        const query = `SELECT id, authorName, authorSurname, bookID FROM BookAuthor WHERE id = ?`

        db.query(query, [id], (err, result) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }

    register(req, res){
        const query = `INSERT INTO BookAuthor SET ?`
        const data = req.body

        db.query(query, [data], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Book author has been added"
            })
        })
    }

    deleteBook(req, res){
        const query = `DELETE FROM BookAuthor WHERE id = ?`
        const { id } = req.params

        db.query(query, [id], (err) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                msg: "Book author has been deleted"
            })

        })
    }
}

module.exports = BookAuthors