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
    categoria: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categoria',
        }
    ]
});

export = mongoose.model('despesa', despesaSchema);