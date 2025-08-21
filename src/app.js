import conexao from '../infra/conexao.js'
import express from 'express'
const app = express()

//indicar para  o express ler o body como json

app.use(express.json())

// const curso =[
//     {id:1, diciplina: 'ADS'},
//     {id:2, diciplina:'AdS'},
//      {id:3, diciplina: 'ADS'},
//     {id:4, diciplina:'AdS'},
// ]
//retorna objeto
function buscarCursosPorId(id){
    return  curso.filter(curso => curso.id == id)
}
//retorna um index
function buscarIndexCurso(id){
    return  curso.findIndex(curso => curso.id == id)
}



//const port = 3000
//criando uma rotar dafault(endpoint)
// app.get('/',(req,res)=>{
//     res.send('hello  felipe')
// })
// ROTA: LISTAR TODOS OS CURSOS (READ ALL)
// ============================================================================
app.get('/cursos', (req, res) => {
  // SQL que busca todos os cursos
  const sql = "SELECT * FROM curso;"
  conexao.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao consultar os cursos:', error)  // Loga erro no servidor
      res.status(500).json({ erro: "Erro ao buscar cursos" }) // Retorna erro 500
    } else {
      res.status(200).json(results) // Retorna a lista de cursos
    }
  })
})

// ============================================================================
// ROTA: CRIAR UM NOVO CURSO (CREATE)
// ============================================================================
app.post('/cursos', (req, res) => {
  const { disciplina } = req.body // Extrai o campo "disciplina" do corpo da requisição

  if (!disciplina) { // Validação: campo obrigatório
    return res.status(400).json({ erro: "Campo 'disciplina' é obrigatório" })
  }

  // SQL com placeholder (?) para evitar SQL Injection
  const sql = "INSERT INTO curso (disciplina) VALUES (?)"
  conexao.query(sql, [disciplina], (error, result) => {
    if (error) {
      console.error("Erro ao inserir curso:", error)
      res.status(500).json({ erro: "Erro ao cadastrar curso" })
    } else {
      // Retorna 201 (Created) com o novo curso
      res.status(201).json({ id: result.insertId, disciplina })
    }
  })
})

// ============================================================================
// ROTA: LISTAR UM CURSO PELO ID (READ BY ID)
// ============================================================================
app.get('/cursos/:id', (req, res) => {
  const { id } = req.params // Pega o ID da URL

  const sql = "SELECT * FROM curso WHERE id = ?"
  conexao.query(sql, [id], (error, results) => {
    if (error) {
      console.error("Erro ao buscar curso:", error)
      res.status(500).json({ erro: "Erro ao consultar curso" })
    } else if (results.length === 0) {
      // Caso o ID não exista
      res.status(404).json({ msg: "Curso não encontrado" })
    } else {
      res.status(200).json(results[0]) // Retorna o curso encontrado
    }
  })
})

// ============================================================================
// ROTA: ATUALIZAR UM CURSO (UPDATE)
// ============================================================================
app.put('/cursos/:id', (req, res) => {
  const { id } = req.params            // ID que vem da URL
  const { disciplina } = req.body      // Novo valor da disciplina

  if (!disciplina) {
    return res.status(400).json({ erro: "Campo 'disciplina' é obrigatório" })
  }

  const sql = "UPDATE curso SET disciplina = ? WHERE id = ?"
  conexao.query(sql, [disciplina, id], (error, result) => {
    if (error) {
      console.error("Erro ao atualizar curso:", error)
      res.status(500).json({ erro: "Erro ao atualizar curso" })
    } else if (result.affectedRows === 0) {
      // Nenhuma linha foi alterada → ID não existe
      res.status(404).json({ msg: "Curso não encontrado" })
    } else {
      res.status(200).json({ id, disciplina }) // Retorna o curso atualizado
    }
  })
})

// ============================================================================
// ROTA: DELETAR UM CURSO (DELETE)
// ============================================================================
app.delete('/cursos/:id', (req, res) => {
  const { id } = req.params // ID que vem da URL

  const sql = "DELETE FROM curso WHERE id = ?"
  conexao.query(sql, [id], (error, result) => {
    if (error) {
      console.error("Erro ao excluir curso:", error)
      res.status(500).json({ erro: "Erro ao excluir curso" })
    } else if (result.affectedRows === 0) {
      res.status(404).json({ msg: "Curso não encontrado" })
    } else {
      res.status(200).json({ msg: `Curso ${id} excluído com sucesso!` })
    }
  })
})






//rotas
app.get('/cursos',(req,res)=>{
   // res.status(200).send(curso)
    const sql = "SELECT * FROM curso;"
    conexao.query(sql,(error,results)=>{
        if(error){
            console.log('Erro ao consultar os cursos', error)
        }else{
            res.status(200).json(results)
        }
    })
})
app.post('/cursos', (req, res)=> {
    cursos.push(req.body)
    res.status(200).send('Seleção cadastrada com sucesso!')
})

app.get('/cursos/:id',(req,res)=>{
    // let index =req.params.id
    // console.log(index)
    res.json(buscarCursosPorId(req.params.id))
})

app.delete('/cursos/:id',(req,res)=>{
    
    let index =buscarIndexCurso(req.params.id)
    curso.splice(index,1)
    console.log(index)
    res.send(` o curso com id ${req.params.id} excluído com sucesso!`)
   

})

app.put('/cursos/:id',(req,res)=>{
    let index =buscarIndexCurso(req.params.id)
    curso[index].diciplina=req.body.diciplina
    res.json(curso)
    })





export default app

//listening escutar a portar
//app.listen(port,()=>{
//    console.log(`Servidor rodando  e rindo em http://localhost:${port}`)
//})

