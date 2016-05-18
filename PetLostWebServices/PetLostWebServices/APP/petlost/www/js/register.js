petlost.pages.register=function(info){
	function RegisterModel() {
		this.name = ko.observable();
		this.phone = ko.observable();
		this.password = ko.observable();
		this.email = ko.observable();
		if(info!=undefined){
			if(info.name) this.name(info.name);
		    if(info.email) this.email(info.email);
		    if(info.id){
		    	this.password(info.id);
		    	$("#password").attr('disabled','disabled');
		    }
		}
	    
	    this.register=function(){
	    	console.log("name: "+this.name());
	    	console.log("phone: "+this.phone());
	    	console.log("email: "+this.email());
	    	console.log("password: "+this.password());
	    	var request={form:{NomeValue:this.name(),ContatoValue:this.phone(),EmailValue:this.email(),PasswordValue:this.password()}};
	    	service(configs.newregisterService,"POST",request,this.registerResponse);
	    }

	    this.back=function(){
	    	backPage();
	    }


	    this.registerResponse=function(response){
	    	console.log(response);
	    	if(response==undefined || response.status==0){
	    		alert("Error connecting to server");
	    	}else{
	    		if(response.RegistoResult){
	    			alert("Utilizador Registado");
            		changePage(petlost.nav.pages.login);
	            }else{
	            	alert("Erro ao registar utilizador");
	            }
	    	}
		}
	}
	ko.applyBindings(new RegisterModel(info),document.getElementById("registerPage"));
}


