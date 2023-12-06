import ErroBase from "./ErroBase.js";

class ErroRequisicao extends ErroBase {
	constructor(mensagem = "algum dado foi inserido incorretamente"){
		super(mensagem, 400);
	}
    
}

export default ErroRequisicao;