const Users = require('./Users');
const Orders = require('./Orders');
const Books = require('./Books');
const BookAuthors = require('./BookAuthors');

module.exports = {
    users: new Users(),
    orders: new Orders(),
    books: new Books(),
    author: new BookAuthors()
}