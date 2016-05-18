petlost.pages.animalView=function(){
	function animalViewModel(location) {
		this.animals=ko.observableArray([]);
	    this.valueKm=ko.observable(5);
	    this.minKM=ko.observable(1);
	    this.maxKm=ko.observable(10); 
	    this.location=location;
	    this.GetAnimalsResponse=function(response,context){
	    	console.log(response);
			if(response==undefined || response.status==0){
	    		alert("Error connecting to server");
	    	}else{
	    		context.animals([]);
	    		if(response.BuscaLocalResult.length>0){
	    			for (var i = 0; i < response.BuscaLocalResult.length; i++) {
	    				if(response.BuscaLocalResult[i].EncontradoValue){
	    					response.BuscaLocalResult.splice(i, 1);
	    					i--;
	    				}else{
	    					response.BuscaLocalResult[i].fotoBASE64="NO_IMAGE";
							var date=response.BuscaLocalResult[i].DataValue.split(" ");
							if(date.length>0){
								response.BuscaLocalResult[i].DataValue=date[0];
							}
	    				}
					}
            		context.animals(response.BuscaLocalResult);
					for (var i = 0; i < context.animals().length; i++) {
						var result = "";
						for (var j = 0; j < context.animals()[i].FotoValue.length; j++) {
							result += String.fromCharCode(response.BuscaLocalResult[i].FotoValue[j]);
						}
						if(result==""){
							response.BuscaLocalResult[i].fotoBASE64="NO_IMAGE";
						}else response.BuscaLocalResult[i].fotoBASE64="url(data:image/jpeg;base64,"+result+")";
					}
					context.animals([]);
            		context.animals(response.BuscaLocalResult);
	            }else{
	            	alert("Invalid credencials");
	            }
	    	}

	    	
		}

	    this.valueKmLabel=ko.computed(function() {
	    	
	    	var request={form:{LocalizacaoLatValue:location.coords.latitude,LocalizacaoLongValue:location.coords.longitude,RaioValue:parseInt(this.valueKm())}};
			service(configs.animalFindService,"POST",request,this.GetAnimalsResponse,this);

	    	/*if(this.valueKm()==this.maxKm()){
	    		return "+ km";
	    	}else*/ return this.valueKm()+" km";
    	}, this);



    	this.animalPageClick=function(data){
			changePage(petlost.nav.pages.animalId,data);
    	}


		
	    
	}
	navigator.geolocation.getCurrentPosition(function(location) {
		ko.applyBindings(new animalViewModel(location),document.getElementById("animalViewPage"));	
	});
	
}