import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandController } from './brands.controller';
import { BrandsService } from './brands.service';
import { Brand, BrandSchema } from './brands.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])],
  controllers: [BrandController],
  providers: [BrandsService],
})
export class BrandsModule {}

