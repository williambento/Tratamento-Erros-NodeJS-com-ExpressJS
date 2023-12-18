import Erro404 from "../erros/Erro404.js";
import {autores} from "../models/index.js";

class AutorController {

	static listarAutores = async (req, res, next) => {
		try {
			const autoresRetorno = autores.find({});
			req.resultado = autoresRetorno;
			next();
		} catch (error) {
			next(error);
		}
	};

	static listarAutorPorId = async (req, res, next) => {
		try {
			const id = req.params.id;
			const autorID = await autores.findById(id);
			if(autorID !== null){
				res.status(200).json(autorID);
			} else {
				next( new Erro404("não existe autor com esse ID") );
			}
		} catch (error) {
			next(error);
		}
	};

	static cadastrarAutor = async (req, res, next) => {
		try {
			const autor = await autores.create(req.body);
			res.status(201).json(autor);
		} catch (error) {
			next(error);
		}
	};

	static atualizarAutor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const atualizarAutor = await autores.findByIdAndUpdate(id, req.body);
			if( atualizarAutor !== null){
				res.status(200).json({message: "livro atualizado"});
			} else {
				next(new Erro404("id não encontrado"));
			}
		} catch (error) {
			next(error);
		}
	};

	static excluirAutor = async (req, res, next) => {
		try {
			const autorDelete = await autores.findByIdAndDelete(req.params.id);
			if( autorDelete !== null){
				res.status(200).json({message: "autor deletado"});
			} else {
				next(new Erro404("id não encontrado"));
			}
		} catch (error) {
			next(error);
		}
	};

}

export default AutorController;