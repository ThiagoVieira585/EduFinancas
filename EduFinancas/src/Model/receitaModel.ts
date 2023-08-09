import mongoose from 'mongoose';

const receitaSchema = new mongoose.Schema({
    valor: {
        type: Number,
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    descrição: {
        type: String,
        required: true,
    },
    categoria: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categoria',
        }
    ]
});

export = mongoose.model('receita', receitaSchema);