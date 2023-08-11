import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    }
});

export = mongoose.model('categoria', categoriaSchema);