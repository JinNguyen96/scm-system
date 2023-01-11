import express from 'express';
import db from './models'
import {users} from './seeders/users'


const app = express();

const port = process.env.PORT || 3000;
const creatUsers = () =>{
    users.map((user) =>{
         db.User.create(user)
    })
}
creatUsers()

db.sequelize.sync().then(() => { 
    app.listen(port, () => { 
        console.log(`app listening on port ${port}`)
     })
 })
