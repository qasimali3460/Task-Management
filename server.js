var express=require('express')
var app=express();
var path = require('path');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');
app.use(express.static(path.join(__dirname,"public")));
app.use("/",express.static(path.join(__dirname,"public")));

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
var server=require('http').Server(app);
var io=require('socket.io')(server);
io.on("connection" , socket => {
    console.log("A User Connected");
});
app.delete('/todo/:id' , (req,res) => {
    console.log("hei"+req.params._id);
    Todo.findByIdAndRemove(req.params.id).then(() => {
        io.emit("newTaskAdded");
        // res.status(200).send("Record Deleted Successfully");
    });

});
app.get('/todo',(req,res) => {
    
    Todo.find({}).then((data) => {
        res.send(data);
    }).catch(err => {
        console.log("error is ");
    });
});

app.post('/todo',  (req,res) => {

    let task=new Todo();
    task.description=req.body.description;
     task.save().then(() => {
        console.log("Data inserted successfully");
        io.emit('newTaskAdded');
        // res.send("Values Inserted");
    });
});
server.listen(3000, () => {
    console.log("Server.io port is listening on 3000");
});