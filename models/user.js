const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema =mongoose.Schema({


   firstName:{
    type: String,
    required: [true, 'first name is mandatory'],
    trim: true,
    validate: [validator.isAlpha, 'only letters allowed']
   },
  lastName:{
    type: String,
    trim: true,
    validate: [validator.isAlpha, 'only letters allowed']
  },
  email:{
    type: String,
    trim: true,
    validate: [validator.isEmail, 'email validation failed'],
    unique: true,
    sparse: true
  },
  mobile:{
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  phoneNumber:{
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  photo:{
   type: String
  },
  password:{
    type: String,
    minlength: 8,
    trim: true,
    required:[true, 'password is mandatory']
  },
  confirmPassword:{
    type: String,
    trim: true,
    required: [true, 're-enter your password'],
    validate: {
        validator: function(value){
            return value === this.password
        },
        message: 'password and confirm password mismatched'
    }
  },
},{
    timestamps: true
})

userSchema.pre('save', async function() {
    this.confirmPassword = undefined

    if (!this.isModified('password')) return

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})
userSchema.methods.comparePassword = async function (userPassword){
  bcrypt.comparePassword(userPassword, this.password)
}

userSchema.post('save',function(docs){
    console.log(docs)
})

module.exports= mongoose.model('Users',userSchema)