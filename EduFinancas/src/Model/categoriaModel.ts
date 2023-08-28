import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  user: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
]
});

export = mongoose.model("categoria", categoriaSchema);