petlost.pages.animalRegister=function(){
	function animalRegisterModel() {
	    this.name=ko.observable();
	    this.breed=ko.observable();
	    this.date=ko.observable();
	    this.location=ko.observable();

	    this.RegisterAnimalsResponse=function(response,context){
	    	console.log(response);
			if(response==undefined || response.status==0){
	    		alert("Error connecting to server");
	    	}else{
	    		context.animals([]);
	    		/*if(response.BuscaLocalResult.length>0){
            		
	            }else{
	            	alert("Invalid credencials");
	            }*/
	    	}

	    	
		}

	    this.register=function(){
	    	var request={form:{nomeValue:"",RacaValue:"",EmailValue:"",LocalizacaoLatValue:0,LocalizacaoLongValue:0,DataValue:'2011-04-02 17:15:45',FotoValue:"",EncontradoValue:"false"}};
	    	service(configs.registerService,"POST",request,this.RegisterAnimalsResponse,this);

	    	backPage();
	    }
	}
	ko.applyBindings(new animalRegisterModel(),document.getElementById("animalRegisterPage"));
}
