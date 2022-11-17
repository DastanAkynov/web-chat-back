import {
 SubscribeMessage,
 WebSocketGateway,
 OnGatewayInit,
 WebSocketServer,
 OnGatewayConnection,
 OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { ChatService } from './chat.service';

@WebSocketGateway({
 cors: {
   origin: 'http://localhost:3000',
 },
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

 constructor(
  private authService: AuthService,
  private chatService: ChatService
  ) {}
 
 @WebSocketServer() server: Server;

 async handleConnection(socket: Socket, ...args: any[]) {
  const token = socket.handshake.auth.token
  const user = await this.authService.getUserByJwt(token)
  socket.data.user = user
  socket.join(user?.alias)
  this.server.emit('notify:online', user?.alias)  
 }
 

 async handleDisconnect(socket: Socket) {
  console.log('DISCONNECT')
 }

@SubscribeMessage('get:onlineUsers')
 async getOnlineUsers(socket: Socket, payload): Promise<any> {
  const onlineUsers = []
  this.server.sockets.sockets.forEach(sk => sk.data?.user?.alias && onlineUsers.push(sk.data?.user?.alias))
  return onlineUsers                 
 }
 
 @SubscribeMessage('send:message')
 async handleSendMessage(socket: Socket, payload): Promise<void> {
  this.server.emit('get:message', payload)                    
 }
 
 afterInit(server: Server) {}

}