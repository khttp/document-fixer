import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FixingService } from './brands.service';
import * as fs from 'fs';

@Controller('json')
export class BrandController {
  constructor(private readonly fixingService: FixingService) {}

  @UseInterceptors(FileInterceptor('file'))
  async uploadJsonFile(@UploadedFile() file:any) {
    // Get the path of the uploaded file
    const filePath = file.path;

    try {
      // Read the JSON file from the filesystem
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Process the JSON data as needed (e.g., validate, fix fields)

      // Return any response as needed
      return { success: true, message: 'JSON file uploaded and processed successfully' };
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return { success: false, message: 'Error processing JSON file' };
    }
  }
}

