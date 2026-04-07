const express= require('express')
const app=express()
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://ahmed:ahmed12345@cluster0.sqkku6w.mongodb.net/?appName=Cluster0").then(()=>{
    console.log("success connected")
}).catch((error)=>{
    console.log("error with connected",error)
});
app.use(express.json())

app.get('/hello',(req,res)=>{
res.send('hello')
})

app.get('/sum/:num1/:num2',(req,res)=>{
let num1 = req.params.num1;
let num2 = req.params.num2;
let total = Number(num1) + Number(num2)
res.send(`how are you + ${total}`)
})


app.get('/hi',(req,res)=>{
res.send('how are you')

})
app.get('/body',(req,res)=>{
    let  all  = 1000;

// res.send(`how are you + ${req.body.name} this is age = ${req.query.age}`)
// res.json({
//     name: req.body.name,
//     age: req.query.age
// }
// )

// res.send("<h1>hello world</h1>")
// res.sendFile(__dirname + "/views/numbers.html")




res.render("num.ejs",{
    name: "ahmed",
    number: all
})
})

app.listen('8000',()=>{
console.log('i am lissten in 8000');
})

