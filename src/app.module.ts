import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { SocketGateway } from 'src/modules/chat/socket.getaway';
import { AuthMiddleware } from 'src/utils/middleware/AuthMiddleware';
import { getMongoConfig } from './config/mongo.config';
import { AuthModule, ChatModule, UserModule } from './modules';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: getMongoConfig
    }),
    AuthModule,
    UserModule,
    ChatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/auth/login', '/auth/register')
      .forRoutes('*')
  }
}
