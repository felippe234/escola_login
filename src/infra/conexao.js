import mysql from 'mysql'

const conexao=mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'',
    database:'cursosdb'
})




/*aplicamos o export para utizar o objeto em outro lugar*/
export default conexao