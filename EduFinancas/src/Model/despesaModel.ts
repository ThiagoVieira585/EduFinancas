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
    categoriaDespesa: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categoriaDespesas',
        }
    ]
});

export = mongoose.model('despesas', despesaSchema);