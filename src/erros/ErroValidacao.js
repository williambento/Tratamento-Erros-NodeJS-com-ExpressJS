import ErroRequisicao from "./ErroRequisicao.js";

class ErroValidacao extends ErroRequisicao {
	constructor(erro){
		const erroValidacao = Object.values(erro.errors)
			.map(erro => erro.message)
			.join("; ");

		super(`os seguintes erros foram encontrados ${erroValidacao}`);
	}
}

export default ErroValidacao;