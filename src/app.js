import e from 'express';
import express from 'express'
const app = express()

//indicar para  o express ler o body como json

app.use(express.json())

const curso =[
    {id:1, diciplina: 'ADS'},
    {id:2, diciplina:'AdS'},
     {id:3, diciplina: 'ADS'},
    {id:4, diciplina:'AdS'},
]
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
app.get('/',(req,res)=>{
    res.send('hello  felipe')
})

app.get('/cursos',(req,res)=>{
    res.status(200).send(curso)
})

app.post('/cursos',(req,res)=>{
    curso.push(req.body)
    res.status(200).send('seleção cadastrada com sucesso!')
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

