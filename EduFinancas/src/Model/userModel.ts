import mongoose from 'mongoose';

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

export = mongoose.model('user', userSchema);