import  mongoose  from 'mongoose';
import  slugify  from 'slugify';


const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: String,
  address: {
    type: String,
    required: true
  },
  selectedFile: String,
  descriptionFull: {
    type: String,
    required: true
  },
  descriptionSmall: {
    type: String,
    required: true
  },
  bothPrice: Number,
  currentPrice: {
    type: Number,
    default: 0
  },
  creator: String,
  myValuePrice: Number,
  numberOfStocks: Number,
  dateOfPurchase: String,
  industry: String,
  selectedFile: String,
  images: [String],
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
 
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
companySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Company = mongoose.model('company', companySchema);

export default Company;
