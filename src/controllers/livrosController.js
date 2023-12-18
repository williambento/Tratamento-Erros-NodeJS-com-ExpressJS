import Erro404 from "../erros/Erro404.js";
import { autores, livros } from "../models/index.js";

class LivroController {

	static listarLivros = async (req, res, next) => {
		try {
			const buscaLivros = livros.find();

			req.resultado = buscaLivros;
	
			next();
		} catch (error) {
			next(error);
		}
	};

	static listarLivroPorId = async (req, res, next) => {
		try {
			const id = req.params.id;
			const livroID = await livros.findById(id)
				.populate("autor", "nome")
				.exec();
			if (livroID !== null) {
				res.status(200).send(livroID);
			} else {
				next(new Erro404("não existe livro com esse ID"));
			}
		} catch (error) {
			next(error);
		}

	};

	static cadastrarLivro = async (req, res, next) => {
		try {
			let livroCadastrado = await livros.create(req.body);
			res.status(201).json(livroCadastrado);
		} catch (error) {
			next(error);
		}
	};

	static atualizarLivro = async (req, res, next) => {
		try {
			const atualizaLivro = await livros.findByIdAndUpdate(req.params.id, req.body);
			if (atualizaLivro !== null) {
				res.status(200).send("livro atualizado");
			} else {
				next(new Erro404("id do livro não consta no banco de dados"));
			}
		} catch (error) {
			next(error);
		}
	};

	static excluirLivro = async (req, res, next) => {
		try {
			const livroDeletado = await livros.findByIdAndDelete(req.params.id);
			if (livroDeletado !== null) {
				res.status(200).json({ message: "livro deletado" });
			} else {
				next(new Erro404("id não encontrado"));
			}
		} catch (error) {
			next(error);
		}
	};

	static listarLivroPorFiltro = async (req, res, next) => {
		try {
			const busca = await this.processingBusca(req.query);
			const livrosResultado = livros
				.find(busca)
				.populate("autor");

			req.resultado = livrosResultado;
			next();
		} catch (error) {
			next(error);
		}
	};

	static async processingBusca(parametros) {

		let busca = {};
		const { editora, titulo, maxNumPag, minNumPag, nomeAutor } = parametros;

		if (editora) busca.editora = editora;
		if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

		if (maxNumPag || minNumPag) busca.numeroPaginas = {};

		if (minNumPag) busca.numeroPaginas.$gte = minNumPag;
		if (maxNumPag) busca.numeroPaginas.$lte = maxNumPag;

		if (nomeAutor) {
			const autor = await autores.findOne({ nome: nomeAutor });

			const autorID = autor._id;

			busca.autor = autorID;
		}

		return busca;
	}

}

export default LivroController;