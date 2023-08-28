import mongoose, { Schema, Document } from 'mongoose';

interface Despesa extends Document {
  valor: number;
  data: Date;
  descricao: string;
  categoria: mongoose.Types.ObjectId; // Referência para a categoria associada
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
    ref: 'Categoria', // Nome do modelo de categoria
    required: true,
  },
});

const DespesaModel = mongoose.model<Despesa>('Despesa', despesaSchema);

export default DespesaModel;
