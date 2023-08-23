import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    receita: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'receita',
        },
    ],
    despesa: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'despesa',
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(this.password, salt);
      this.password = passwordHash;
      return next();
    } catch (error) {
      return next();
    }
  });

export = mongoose.model('user', userSchema);