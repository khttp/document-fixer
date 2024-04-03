import { Controller, Get} from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brand')
export class BrandController {
 
  constructor(private readonly BrandService: BrandsService) {}
  @Get('/fix-document') 
  async fixDocument() {
    try {
      const jsonContents =await this.BrandService.processAndSaveBrandsData();
      return { success: true, data: jsonContents };
   
    } catch (error) {
      return { success: false, error: error.message };
      }
  }
  @Get('seed')
  async addFakeData(){
    try {
      await this.BrandService.seedDatabase();
      return { success: true, message: 'Data seeded successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  @Get('export')
  async exportData(){
    try {
      const data = await this.BrandService.exportBrandsToJson();
      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
}

