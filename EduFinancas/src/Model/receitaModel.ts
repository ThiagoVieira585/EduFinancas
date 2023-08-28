import mongoose, { Schema, Document } from 'mongoose';

interface Receita extends Document {
  valor: number;
  data: Date;
  descricao: string;
  categoria: mongoose.Types.ObjectId; // Referência para a categoria associada
}

const receitaSchema = new Schema<Receita>({
  valor: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria', // Nome do modelo de categoria
    required: true,
  },
});

const ReceitaModel = mongoose.model<Receita>('Receita', receitaSchema);

export default ReceitaModel;
