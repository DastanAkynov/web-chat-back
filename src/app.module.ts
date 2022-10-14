import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
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
export class AppModule {}
