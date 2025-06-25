const { default: mongoose } = require("mongoose")
const bcrypt=require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add the username'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must have atleast 3 characters'],
    maxlength: [30, 'Username must have max 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add the username'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add Password'],
  },
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
  if(!this.isModified('password')) return next();

  try {
    this.password=await bcrypt.hash(this.password,10);
    next()
  } catch (error) {
    next(error)
  }
})


userSchema.methods.comparePassword=async function(clientPassword) {
       return await bcrypt.compare(clientPassword,this.password)
}

userSchema.methods.toJSON=function(){
    const userObject=this.toObject();
     
    delete userObject.password;
    return userObject;

}
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel