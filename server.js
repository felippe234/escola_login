import app from './src/app.js'
import conexao from './src/infra/conexao.js'
const port = 3000
// estabelecer a conexao
conexao.connect((error)=>{
    if(error){
        console.log('Erro ao conectar com o banco de dados', error)
        return
    }      else{
        console.log('conexão com o banco de dados estabelecida com sucesso!')
    }

//listening escutar a portar
app.listen(port,()=>{
    console.log(`Servidor rodando  e rindo em http://localhost:${port}`)
})
})