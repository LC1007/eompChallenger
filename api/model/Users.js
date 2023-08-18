const db = require('../config');
const { hash, compare, hashSync } = require('bcrypt')
const { createToken } = require('../middleware/AuthenticateUser')
class Users{

    // Select all users
    fetchUsers(req,res){
        const query = "SELECT userID, firstName, lastName, gender, userDOB, emailAdd, profileUrl FROM Users;"

        db.query(query, (err, results) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }

    // Select single user
    fetchUser(req, res){
        const query = `SELECT userID, firstName, lastName, gender, userDOB, 
        emailAdd, profileUrl FROM Users WHERE userID = ?`
        const { userID } = req.params

        db.query(query, [userID], (err, result) =>{
            if(err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }

    // Login 
    login(req, res) {
        const {emailAdd, userPass} = req.body
        // query
        const query = `
        SELECT firstName, lastName,
        gender, userDOB, emailAdd, userPass,
        profileUrl
        FROM Users
        WHERE emailAdd = ?;
        `
        db.query(query, [emailAdd], (err, result)=>{
            if(err) throw err
            if(!result?.length){
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email."
                })
            }else {
                compare(userPass, result[0].userPass, (cErr, cResult) => {
                        if (cErr) throw cErr;
                        // Create a token
                        const token = createToken({
                            emailAdd,
                            userPass
                        });
                        if (cResult) {
                            res.json({
                                msg: "Logged in",
                                token,
                                result: result[0]
                            });
                        } else {
                            res.json({
                                status: res.statusCode,
                                msg: "Invalid password or you have not registered"
                            });
                        }
                    })
            }
        })
    }

    // Register
    async register(req, res){
        const data = req.body
        // Ecrypt password
        data.userPass = await hash(data.userPass,15)
        // Payload
        const user = {
            emailAdd: data.emailAdd,
            userPass: data.userPass
        }
        const query = `INSERT INTO Users SET ?;`
        db.query(query, [data], (err) =>{
            if(err) throw err
            // create token
            let token = createToken(user)
            res.json({
                status: res.statusCode,
                token,
                msg: "You are now registered"
            })
        })
    }

    // Update user
    // updateUser(req, res){
    //     const query = `UPDATE User SET ? WHERE userID = ?`
    //     const { id } = req.params
    //     const data = req.body

    //     db.query(query, [data, id], (err) =>{
    //         if(err) throw err
    //         res.json({
    //             status: res.statusCode,
    //             msg: 'User has been updated'
    //         })
    //     })
    // }

    updateUser(req, res){
        const data = req.body
        if(data.userPass){
            data.userPass = hashSync(data.userPass, 15)
        }

        const query = `UPDATE Users
        SET ?
        WHERE userID = ?`

        db.query(query, [data, req.params.id], (err) =>{
            if(err) throw err
        })
    }

    // Delete user
    deleteUser(req, res){
        const query = `DELETE FROM Users WHERE userID = ?`
        const { id } = req.params

        db.query(query, [id],  (err) =>{
            if(err) throw err
            res.json({
                stauts: res.statusCode,
                msg: 'User has been deleted'
            })
        })
    }
}

module.exports = Users