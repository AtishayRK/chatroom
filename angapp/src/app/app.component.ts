import { Component } from '@angular/core';
import {SocketioService} from './socketio.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angapp';
  user : String
  room : String
  messageText : String
  messageArray: Array<{user: String,message: String}>=[]
  constructor(private socketservice : SocketioService)
  {
  this.socketservice.userHasJoined().subscribe(res=>{
    this.messageArray.push(res);  
  })
  this.socketservice.userHasLeft().subscribe(res=>{
    this.messageArray.push(res);  
  })
  this.socketservice.newMessage().subscribe(res=>{
    this.messageArray.push(res);  
    console.log("ahudwhwq");
  })
  }
  ngOnInit()
  {
    
  }
  sendMessage()
{
  const data={
    user : this.user,
    room : this.room,
    message : this.messageText
  }
  if(this.room===null)
  console.log("empty")
  else
{
  this.socketservice.sendMessage(data);
  this.messageText="";
}
}
join()
{
  const data={
    user : this.user,
    room : this.room
  }
  this.socketservice.joinRoom(data);
}
leave()
{
  const data={
    user : this.user,
    room : this.room
  }
  this.socketservice.leaveRoom(data);
  this.room=null;
  this.messageArray=[]
}
}
