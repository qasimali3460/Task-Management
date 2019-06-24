const express=require('express');
const app=express();
const path=require('path');
const http=require('http');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
const socketIo=require('socket.io');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) ;

mongoose.connect("mongodb+srv://qasim:qasim@cluster0-e6kw2.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true},err =>{
	if(err) throw err;
	else 
		console.log("Connection Successfull");
})

const schema=mongoose.Schema({
    description:{
        type:String
    }
});
var Todo=mongoose.model("todo",schema);
app.get('/todo',(req,res) => {
    Todo.find({}).then((data) => {
        res.send(data);
    }).catch(err => {
        console.log("error is ");
    });
});


const server=http.createServer(app);
var io=socketIo(server);
app.set('io',io);

app.post('/todo', async (req,res) => {
    const io=req.app.get('io');

    let task=new Todo();
    task.description=req.body.description;
    await task.save().then(() => {
        console.log("Data inserted successfully");
        io.emit('newTaskAdded');
        res.send("Values Inserted");
    });
});
app.use(express.static(path.join(__dirname,'dist')));
server.listen(3000);