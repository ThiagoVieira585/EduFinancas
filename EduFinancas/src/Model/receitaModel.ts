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
    categoriaReceita: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categoriaReceitas',
        }
    ]
});

export = mongoose.model('receitas', receitaSchema);