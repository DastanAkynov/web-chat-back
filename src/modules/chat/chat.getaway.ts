import {
 SubscribeMessage,
 WebSocketGateway,
 OnGatewayInit,
 WebSocketServer,
 OnGatewayConnection,
 OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { switchMap } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../user/model/user.model';
import { ChatService } from './chat.service';

@WebSocketGateway({
 cors: {
   origin: 'http://localhost:3000',
 },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
 constructor(
  @InjectModel(UserModel) private userModel: ModelType<UserModel>,
  private chatService: ChatService,
  private authService: AuthService
  ) {}
 
 @WebSocketServer() server: Server;


 async handleConnection(socket: Socket, ...args: any[]) {
  console.log('CONNECT')
  const token = socket.handshake.headers.authorization
  const user = await this.authService.getUserByJwt(token)
  console.log('token', token, 'user', user)
  if(!user) return
  const onlineUser = await this.chatService.setOnline(user?._id)
  // socket.data.user = onlineUser
  console.log(onlineUser)
  this.server.emit('updateUser', onlineUser)
 }
 

 async handleDisconnect(socket: Socket) {
  console.log('DISCONNECT')
  const offlineUser = await this.chatService.setOffnline(socket.data.user?._id)
 }
 
 @SubscribeMessage('message')
 async handleSendMessage(client: Socket, payload): Promise<void> {
  // const user = await this.userModel.findOne(payload._id)
  // user.online = payload.online
  // await user.save()
  
 }
 
 afterInit(server: Server) {
  //  console.log(server);
   //Do stuffs
 }

}