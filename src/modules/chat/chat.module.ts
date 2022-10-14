import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from '../auth/auth.module';
import { UserModel } from '../user/model/user.model';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.getaway';
import { ChatService } from './chat.service';

@Module({
  imports: [
    TypegooseModule.forFeature([UserModel]),
    AuthModule
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: []
})
export class ChatModule {}