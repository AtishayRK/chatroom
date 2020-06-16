const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
 app.get('/',(req,res)=>{
 res.send("hello minasan");
 });

io.on('connection',(socket)=>{
    console.log("a user connected");
    socket.on('disconnect',()=>{
        console.log('a user dsiconnected');
    })
    socket.on('join',(data)=>{
        socket.join(data.room);
        console.log(data.user +"has joined the room :"+data.room);
        socket.broadcast.to(data.room).emit('a new user joined',{user : data.user,message : "has joined the room ."})
    })
    socket.on('leave',(data)=>{
        socket.broadcast.to(data.room).emit('left room',{user : data.user,message: "has left the room"})
        socket.leave(data.room);
    })
    socket.on('message',(data)=>{
       io.in(data.room).emit('new message',{user : data.user,message : data.message})
    })
})

 http.listen(3000,()=>{
     console.log("listening at 3000");
 })
