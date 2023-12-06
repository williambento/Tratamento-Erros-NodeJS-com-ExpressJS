import ErroBase from "./ErroBase.js";

class Erro404 extends ErroBase {
	constructor(mensagem = "página não encontrado"){
		super(mensagem, 404);
	}
}

export default Erro404;