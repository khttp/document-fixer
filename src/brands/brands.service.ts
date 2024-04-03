import { Brand } from './brands.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as faker from 'faker';
import * as exceljs from 'exceljs';
import * as fs from 'fs';

const Workbook = new exceljs.Workbook();
const worksheet = Workbook.addWorksheet('Seed Data');
worksheet.columns = [
    { header: 'Brand Name', key: 'brandName' },
    { header: 'Year Founded', key: 'yearFounded' },
    { header: 'Headquarters', key: 'headquarters' },
    { header: 'Number of Locations', key: 'numberOfLocations' },
];
@Injectable()
export class BrandsService {
    constructor(
            @InjectModel(Brand.name) private readonly model: Model<Brand>,
        ) {}
        async processAndSaveBrandsData() {
            const jsonData = await this.model.find({}).lean(true).exec()as any;
            
            for(const document of jsonData){
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
          // Validate and save each document using Mongoose
            console.log(document);
            await this.model.validate(document);
            await this.model.updateOne({ _id: document._id }, document);

          }
          return jsonData;
        }
        async seedDatabase(): Promise<void> {
          try {
            const seedData = [];
      
            // Generate seed data for 10 new brand documents
            for (let i = 0; i < 10; i++) {
              const newBrandData = {
                brandName: faker.company.companyName(),
                yearFounded: faker.date.past().getFullYear(),
                headquarters: faker.address.city(),
                numberOfLocations: faker.datatype.number({ min: 1, max: 100 }),
              };
              
              seedData.push(newBrandData);
              worksheet.addRow(newBrandData);
            }
      
            // Save seed data to the database
            await this.model.create(seedData);
            await Workbook.xlsx.writeFile('seedData.xlsx');


      
            console.log('Seed data successfully added to the database');
          } catch (error) {
            console.error('Error seeding database:', error);
          }
        }
        async exportBrandsToJson(): Promise<void> {
          try {
            // Query all documents from the brands collection
            const brands = await this.model.find().lean().exec();
      
            // Write the JSON data to a file
            fs.writeFileSync('fixedBrands.json', JSON.stringify(brands, null, 2));
      
            console.log('Brands collection exported to brands.json');
          } catch (error) {
            console.error('Error exporting brands collection:', error);
          }
        }
  }
      
    
      //ToDo - 
    //read data from json
    //validate each document against schema
    //fix the document accordengly
    //write the fixed document to a new file
