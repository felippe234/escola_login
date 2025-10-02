import mysql from "mysql2/promise";

const conexao = await mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "gestao_escolar",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("Conectado ao banco de dados MySQL!");

export default conexao;
