import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate",{
	validator: (valor) =>  valor.trim() !== "",
	message: ({ path }) => `campo ${path} não foi preenchido`
});