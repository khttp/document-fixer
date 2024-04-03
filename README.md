# Document Fixer

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

Document Fixer is a NestJS application that fixes inconsistent data in a JSON file based on a provided schema. It takes the path of the JSON file and applies the necessary fixes to ensure data consistency.

## ToDoList

- [x] Create custom schema for data validation using nest structure and genrators
- [x] import inconsistent data in a JSON file to a mongodb
- [x] fix the data in place and store it
- [x] genrate seed data using faker.js and generate excel file with this seed data
- [x] export the fixed data to a json file


## Installation
**Hint**
make sure that the brands.json file is in the correct location in the assets folder
   ```bash

   git clone https://github.com/your-username/document-fixer.git
   mongoimport --db your_database --collection your_collection --file your_file.json --jsonArray
   npm install 
   npm start
   
   ```
## How To Use
after running the project :
   - open the link on the browser http://localhost:3000/brand/fix-document to fix the document  
   - open the link on the browser http://localhost:3000/brand/seed to genrate seed data and export an excel file
   - open the link on the browser http://localhost:3000/brand/export to export the database collection to a json file 
   

