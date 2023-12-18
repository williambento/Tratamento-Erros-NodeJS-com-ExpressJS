import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import ErroRequisicao from "../erros/ErroRequisicao.js";
import ErroValidacao from "../erros/ErroValidacao.js";


// eslint-disable-next-line no-unused-vars
function padraoErro(erro, req, res, next) {
	if ( erro instanceof mongoose.Error.CastError ){
		new ErroRequisicao().enviaMensagem(res);
	} else if ( erro instanceof mongoose.Error.ValidationError ) {
		new ErroValidacao(erro).enviaMensagem(res);
	} else if ( erro instanceof ErroBase ) {
		erro.enviaMensagem(res);
	} else {
		new ErroBase().enviaMensagem(res);
	}
}

export default padraoErro;