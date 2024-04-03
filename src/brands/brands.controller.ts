import { Controller, Get} from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller()
export class BrandController {
 
  constructor(private readonly BrandService: BrandsService) {}
  @Get('brand') 
  async readFile() {
    try {
      const jsonContents =await this.BrandService.processAndSaveBrandsData();
      return { success: true, data: jsonContents };
   
    } catch (error) {
      return { success: false, error: error.message };
      }
  }
  
}

