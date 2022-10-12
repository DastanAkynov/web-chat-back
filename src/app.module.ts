import { Module } from '@nestjs/common';
import { TypegooseModule } from "nestjs-typegoose";
import { getMongoConfig } from './config/mongo.config';
import { AuthModule, UserModule } from './modules';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory: getMongoConfig
    }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
