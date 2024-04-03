import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/brandDB'),
    BrandsModule
  ]
})
export class AppModule {}