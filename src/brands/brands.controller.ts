import { Controller, Get} from '@nestjs/common';
import { BrandsService } from './brands.service';
import * as path from 'path';
const dirname = path.dirname(path.join(__filename,"../../../"));

@Controller()
export class BrandController {
 
  constructor(private readonly BrandService: BrandsService) {}
  @Get('brand') 
  async readFile() {
    try {
      const jsonContents = await this.BrandService.processAndSaveBrandsData(path.join(dirname, 'brands.json'));
      return { success: true, data: jsonContents };
   
    } catch (error) {
      console.error('Error reading file:', error);
      return { success: false, message: 'Error reading file',dir:dirname };
    }
  }
}

