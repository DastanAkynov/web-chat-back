import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoConfig = async(): Promise<TypegooseModuleOptions> => {
  return {
    uri: 'mongodb://localhost/web-chat',
    // useNewUrlParser: true,
    // userCreateIndex: true,
    // useUnifiedTopology: true
  }
}