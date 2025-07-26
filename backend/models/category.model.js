import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const CategorySchema = mongoose.Schema({
  _id: Number,
 catName: {
    type: String,
    required: [true,"Category name is required"],
    lowercase: true,
    trim: true,
  },
  caticonnm: {
    type: String,
    required: [true,"Category icon name is required"],
    lowercase: true,
    trim: true
  }
});

// Apply the uniqueValidator plugin to CategorySchema.
CategorySchema.plugin(uniqueValidator);

// compile schema to model
const CategorySchemaModel = mongoose.model('category_collections',CategorySchema);

export default CategorySchemaModel;



