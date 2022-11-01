import { Controller, Get} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('user')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChat() {
    return 'getChat'
  }
}
