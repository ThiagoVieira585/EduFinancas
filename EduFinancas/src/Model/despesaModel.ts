import mongoose from 'mongoose';

const despesaSchema = new mongoose.Schema({
    valor: {
        type: Number,
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    descricao: {
        type: String
    },
    categoriaReceita: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categoriaReceita',
        }
    ]
});

export = mongoose.model('despesa', despesaSchema);