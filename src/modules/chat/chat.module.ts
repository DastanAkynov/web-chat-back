import {  Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from '../auth/auth.module';
import { UserModel } from '../user/model/user.model';
import { ChatController } from './chat.controller';
import { SocketGateway } from './socket.getaway';
import { ChatService } from './chat.service';

@Module({
  imports: [
    TypegooseModule.forFeature([UserModel]),
    AuthModule
  ],
  controllers: [ChatController],
  providers: [ChatService, SocketGateway],
  exports: []
})
export class ChatModule {}