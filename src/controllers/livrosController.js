import Erro404 from "../erros/Erro404.js";
import {livros} from "../models/index.js";

class LivroController {

	static listarLivros = async (req, res, next) => {
		try {
			const livrosResultado = await livros.find()
				.populate("autor")
				.exec();
			res.status(200).json(livrosResultado);
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
			if( livroID !== null ){
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
			if(atualizaLivro !== null){
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
			if( livroDeletado !== null){
				res.status(200).json({message: "livro deletado"});
			} else {
				next(new Erro404("id não encontrado"));
			}
		} catch (error) {
			next(error);
		}
	};

	static listarLivroPorFiltro = async (req, res, next) => {
		try {
			const {editora, titulo} = req.query;
			const busca = {};

			if (editora) busca.editora = editora;
			if (titulo) busca.titulo = titulo;

			const livroPorEditora = livros.find(busca);
			res.status(200).send(livroPorEditora);
		} catch (error) {
			next(error);
		}
	};



}

export default LivroController;