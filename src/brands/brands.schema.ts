import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



export type CatDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({required:[true,'Brand name is required'],trim:true})
  brandName:string;

  @Prop({
    required: [true, 'Year founded is required'],
    validate: {
      validator: function(value: number) {
        // Perform dynamic validation logic
        const currentYear = new Date().getFullYear();
        return value >= 1600 && value <= currentYear;
      },
    }
  })
  yearFounded: number;


  @Prop({required: [true, 'Headquarters location is required'],
    trim:true
})
	headquarters: string;
 

  @Prop({
    required: [true, 'Number of locations is required'],
		min: [1, 'There should be at least one location'],
	}
)
	numberOfLocations: number;
}

export const CatSchema = SchemaFactory.createForClass(Brand);

