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
 }
 

 async handleDisconnect(socket: Socket) {
  console.log('DISCONNECT')
 }
 
 @SubscribeMessage('message')
 async handleSendMessage(client: Socket, payload): Promise<void> {
 }
 
 afterInit(server: Server) {}

}