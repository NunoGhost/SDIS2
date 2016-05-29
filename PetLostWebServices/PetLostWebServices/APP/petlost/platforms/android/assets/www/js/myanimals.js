petlost.pages.myanimals=function(){
	function myanimalsModel() {
		this.animals=ko.observableArray([]);
	    this.valueKm=ko.observable(5);
	    this.minKM=ko.observable(1);
	    this.maxKm=ko.observable(10); 
	    this.noAnimals=ko.observable("Sem animais encontrados")

	    this.GetAnimalsResponse=function(response,context){
	    	console.log(response);
			if(response==undefined || response.status==0){
	    		alert("Error connecting to server");
	    	}else{
	    		context.animals([]);
	    		if(response.ListaAnimaisResult.length>0){
	    			$("#noAnimals").remove();
	    			for (var i = 0; i < response.ListaAnimaisResult.length; i++) {
	    				if(response.ListaAnimaisResult[i].EncontradoValue){
	    					response.ListaAnimaisResult.splice(i, 1);
	    					i--;
	    				}else{
	    					response.ListaAnimaisResult[i].fotoBASE64="NO_IMAGE";
							var date=response.ListaAnimaisResult[i].DataValue.split(" ");
							if(date.length>0){
								response.ListaAnimaisResult[i].DataValue=date[0];
							}
	    				}
					}
					console.log(response);
            		context.animals(response.ListaAnimaisResult);
					for (var i = 0; i < context.animals().length; i++) {
						var result = "";
						for (var j = 0; j < context.animals()[i].FotoValue.length; j++) {
							result += String.fromCharCode(response.ListaAnimaisResult[i].FotoValue[j]);
						}
						if(result==""){
							response.ListaAnimaisResult[i].fotoBASE64="NO_IMAGE";
						}else response.ListaAnimaisResult[i].fotoBASE64="url(data:image/jpeg;base64,"+result+")";
					}
					context.animals([]);
            		context.animals(response.ListaAnimaisResult);
	            }else{
	            	if(response.ListaAnimaisResult.length==0){

	            	}else alert("Invalid credencials");
	            }
	    	}

	    	
		}

	    this.valueKmLabel=ko.computed(function() {
	    	var request={email:user.email};
	    	service(configs.listMyAnimalsService,"POST",request,this.GetAnimalsResponse,this);

	    	/*if(this.valueKm()==this.maxKm()){
	    		return "+ km";
	    	}else*/ return this.valueKm()+" km";
    	}, this);



    	this.animalPageClick=function(data){
    		data.owner=true;
			changePage(petlost.nav.pages.animalId,data);
    	}


		
	    
	}
	ko.applyBindings(new myanimalsModel(),document.getElementById("myanimalsPage"));
}