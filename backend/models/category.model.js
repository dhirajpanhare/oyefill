import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const CategorySchema = mongoose.Schema({
  _id: Number,

  catName: {
    type: String,
    required: [true, "Category name is required"],
    lowercase: true, 
    trim: true,
    unique: true, // optional: prevent duplicates
  },

  caticonnm: {
    type: String,
    required: [true, "Category icon URL is required"],
    trim: true,

  }
});

// Apply the uniqueValidator plugin to enforce `unique: true`
CategorySchema.plugin(uniqueValidator);

// Compile schema to model
const CategorySchemaModel = mongoose.model('category_collections', CategorySchema);

export default CategorySchemaModel;
