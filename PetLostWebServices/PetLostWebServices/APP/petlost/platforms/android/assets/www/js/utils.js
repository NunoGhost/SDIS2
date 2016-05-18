var configs={
	server:"http://localhost:1570",
	loginService:"/Service1.svc/Login",
	newregisterService:"/Service1.svc/Registo",
	animalFindService:"/Service1.svc/BuscaLocal",
	registerService:"/Service1.svc/RegistoAnimal",
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