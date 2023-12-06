import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
	{
		id: {type: String},
		titulo: {
			type: String,
			required: [true, "o campo titulo é obrigatorio para livro"]
		},
		autor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "autores",
			required: [true, "o campo autor é obrigatorio para livro"]
		},
		editora: {
			type: String,
			required: [true, "o campo editora é obrigatorio para livro"],
			enum: {
				values:["Brasil", "Cristal"],
				message: "editora {VALUE} não é aceita no banco de dados"
			}
		},
		numeroPaginas: {
			type: Number,
			min: [10, "numero de paginas {VALUE} menor que 10"],
			max: [500, "numero de paginas {VALUE} é maior que 500"]
		}
	});

const livros= mongoose.model("livros", livroSchema);

export default livros;