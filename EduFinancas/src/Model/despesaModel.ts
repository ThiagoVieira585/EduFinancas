import mongoose, { Schema, Document } from 'mongoose';

interface Despesa extends Document {
  valor: number;
  data: Date;
  descricao: string;
  categoria: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const despesaSchema = new Schema<Despesa>({
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
    ref: 'categoria', // Nome do modelo de categoria
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user', // Nome do modelo de usuário
    required: true,
  }
});

const DespesaModel = mongoose.model<Despesa>('Despesa', despesaSchema);

export default DespesaModel;
