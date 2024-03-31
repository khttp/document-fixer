
import { Module } from '@nestjs/common';
import { BrandController } from './brands.controller';
import { FixingService } from './brands.service';

@Module({
  controllers: [BrandController],
  providers: [FixingService],
})
export class BrandsModule {}
