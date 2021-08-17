import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './core/config/config.module';
import { ConfigService } from './core/config/config.service';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { CommentsModule } from './comments/comments.module';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('MONGO_URI')}`,
        useNewUrlParser: true
      }),
      inject: [ConfigService]
    }),
    AuthModule, FilmsModule, CommentsModule,
    WinstonModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  static port: number | string;
  constructor(private _configService: ConfigService) {
    AppModule.port = this._configService.get('PORT');
    console.log('AppModule.port', AppModule.port);
  }
}
