import mongoose from "mongoose";

const categoriaDespesaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  despesa: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'despesas',
    }
]
});

export = mongoose.model("categoriaDespesas", categoriaDespesaSchema);
