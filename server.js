import app from './src/app.js'
const port = 3000

//listening escutar a portar
app.listen(port,()=>{
    console.log(`Servidor rodando  e rindo em http://localhost:${port}`)
})