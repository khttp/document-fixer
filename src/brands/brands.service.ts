import { Injectable } from '@nestjs/common';

@Injectable()
export class FixingService {
  validateJsonData(jsonData: any): string[] {
    // Implement validation logic and return an array of validation errors
    return ['hell'];
  }

  fixJsonData(jsonData: any, validationErrors: string[]): any {
    // Implement logic to fix fields with errors and return the fixed JSON data
  }
}
