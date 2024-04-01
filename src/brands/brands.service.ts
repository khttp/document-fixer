import { Brand } from './brands.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService {
    constructor(
            @InjectModel(Brand.name) private readonly model: Model<Brand>,
        ) {}
        async processAndSaveBrandsData(filePath:string) {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(jsonData);
          try {
            const transformedData = data.map((document: any) => {
            if (document.hasOwnProperty('yearCreated') || document.hasOwnProperty('yearsFounded')) {
              // Rename the field from 'yearCreated' to 'foundedYear'
              document.yearFounded = document.yearCreated || document.yearsFounded;
              delete document.yearsFounded;
              delete document.yearCreated; // Remove the old field
            }
            if (!document.hasOwnProperty('brandName')) {
                document.brandName = document.brand.name;
            }
            delete document.brand;
            if (!document.hasOwnProperty('headquarters')) {
                document.headquarters = document.hqAddress;
                delete document.hqAddress; // Remove the old field
            }
            if (!document.hasOwnProperty('numberOfLocations')) {
    
                document.numberOfLocations = document.locations;
                delete document.locations; // Remove the old field
            }
          
          document.yearFounded=isNaN(parseInt(document.yearFounded, 10))?2000:parseInt(document.yearFounded); // Convert year to number type
          document.numberOfLocations=isNaN(parseInt(document.numberOfLocations, 10))?1:parseInt(document.numberOfLocations); // Convert year to number type
          return document;
    
      
            // Validate and save each document using Mongoose

          });
          for (const documentData of transformedData) {
            const brand = new this.model(documentData);
            try {
              await brand.validate();
              await brand.save();
            } catch (error) {
              console.error('Validation error for document:', error.message);
              // Handle validation error or fix the document as needed
            }
          }
          return transformedData;
          }catch (error) {
            console.error('Error reading or processing file:', error);
        }
      }
    }
      //ToDo - 
    //read data from json
    //validate each document against schema
    //fix the document accordengly
    //write the fixed document to a new file
