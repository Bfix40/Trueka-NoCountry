import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DotEnvConfig } from './config/env.config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ProductsModule } from './products/products.module';
import { LoginController } from './login/login.controller';
import { AuthModule } from './auth/auth.module';
import { LocalUploadMiddleware } from './middlewares/local-upload.middleware';
import { FirebaseUploadMiddleware } from './middlewares/firebase-upload.middleware';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [DotEnvConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    SubcategoriesModule,
    ProductsModule,
    OffersModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, LocalUploadMiddleware, FirebaseUploadMiddleware],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocalUploadMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST })
      .apply(FirebaseUploadMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.POST });
  }
}
