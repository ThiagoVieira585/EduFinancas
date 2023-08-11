import mongoose from "mongoose";

const categoriaReceitaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  receita: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'receitas',
    }
]
});

export = mongoose.model("categoriaReceitas", categoriaReceitaSchema);
