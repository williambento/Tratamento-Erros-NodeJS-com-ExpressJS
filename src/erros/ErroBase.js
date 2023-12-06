class ErroBase extends Error {
	constructor(mensagem = "erro interno", status = 500){
		super();
		this.message = mensagem;
		this.status = status;
	}

	enviaMensagem(res){
		res.status(this.status).send({
			message: this.message,
			status: this.status
		});
	}
}

export default ErroBase;