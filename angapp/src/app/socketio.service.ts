import { Injectable } from '@angular/core';
import{Observable} from 'rxjs'
import * as io from 'socket.io-client'
@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket= io("http://localhost:3000");
  constructor() { }
   
   


   
   sendMessage(data)
   {
     this.socket.emit('message',data);
   }
   leaveRoom(data)
   {
     this.socket.emit('leave',data);

   }
   joinRoom(data)
   {
     this.socket.emit('join',data);
   }
   userHasLeft()
   {
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('left room', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
   }
   userHasJoined()
   {
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('a new user joined', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
   }
   newMessage()
   {
    let observable = new Observable<{user:String, message:String}>(observer=>{
      this.socket.on('new message', (data)=>{
          observer.next(data);
      });
      return () => {this.socket.disconnect();}
  });

  return observable;
   }
}
