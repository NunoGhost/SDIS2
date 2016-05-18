petlost.pages.animalId=function(info){
	function animalIdModel(info) {
		console.log(info);
		this.name=ko.observable(info.NomeValue);
	    this.breed=ko.observable(info.RacaValue);
	    this.date=ko.observable(info.DataValue);
	    this.location=ko.observable(info.LocalizacaoLatValue); 	 
	    this.fotoBASE64=ko.observable(info.fotoBASE64); 	 
	    this.owner=ko.observable(info.owner); 	
	    this.email=ko.observable(info.EmailValue);
	    this.phone=ko.observable();
	    setCenter(info.LocalizacaoLatValue,info.LocalizacaoLongValue);
	    initMap();
	    //setCenter(41.1579438,-8.6291053);
		this.AnimalFoundResponse=function(response,context){
	    	console.log(response);
			if(response==undefined || response.status==0){
	    		alert("Error connecting to server");
	    	}else{
	    		if(response.EncontradoResult){
	    			alert("Animal encontrado");
	    			backPage();
	    		}else{
					alert("De momento não foi possível concluir o processo");
	    		}
	    	}
		}

	    this.foundAnimal=function(){
	    	var request={email:user.email,nomeAnimal:this.name()};
	    	service(configs.listEncontradoService,"POST",request,this.AnimalFoundResponse,this);
	    }

	    this.userDataResponse=function(response,context){
	    	console.log(response);
			context.phone(response.PersonalInfoResult.ContatoValue);
	    }

	    	var request={email:this.email()};
			service(configs.userDataService,"POST",request,this.userDataResponse,this);
	    
	}
	var model=new animalIdModel(info);
	ko.applyBindings(model,document.getElementById("animalIdPage"));
}
