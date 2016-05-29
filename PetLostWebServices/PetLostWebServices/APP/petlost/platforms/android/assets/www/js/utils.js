var user={}

var configs={
	//server:"http://localhost",
	server:"http://192.168.1.72/Services",
	loginService:"/Service1.svc/Login",
	newregisterService:"/Service1.svc/Registo",
	animalFindService:"/Service1.svc/BuscaLocal",
	registerService:"/Service1.svc/RegistoAnimal",
	listMyAnimalsService:"/Service1.svc/ListaAnimais",
	listEncontradoService:"/Service1.svc/Encontrado",
	userDataService:"/Service1.svc/PersonalInfo",
	facebookAppId:"124732914611526",
	facebookApiVer:"v2.6",
}

function service(path,method,request,returnFunction,context){
	$.ajax({
		type: method,
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		url: configs.server+path,
		data: JSON.stringify(request),
		crossDomain: true,
    }).done(function (response) {
    	returnFunction(response,context);
    }).fail(function (err) {
    	returnFunction(err);
    });
}