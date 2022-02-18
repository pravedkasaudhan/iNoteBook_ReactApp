const connectToMongo=require('./db');

const express=require('express');
connectToMongo();
const app=express();
const port=5000;

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HELLO Mr. PRAVED");
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`)
})