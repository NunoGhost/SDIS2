petlost.pages.animalView=function(){
	function animalViewModel() {
		this.animals=ko.observableArray([]);
	    this.valueKm=ko.observable(30);
	    this.minKM=ko.observable(0);
	    this.maxKm=ko.observable(100); 

	    this.GetAnimalsResponse=function(response,context){
	    	console.log(response);
			if(response==undefined || response.status==0){
	    		alert("Error connecting to server");
	    	}else{
	    		context.animals([]);
	    		if(response.BuscaLocalResult.length>0){
            		for(i=0;i<response.BuscaLocalResult.length;i++){
            			context.animals.push(response.BuscaLocalResult[i]);
            		}
	            }else{
	            	alert("Invalid credencials");
	            }
	    	}

	    	
		}

	    this.valueKmLabel=ko.computed(function() {
	    	var request={form:{LocalizacaoLatValue:0,LocalizacaoLongValue:0,RaioValue:this.valueKm()}};
	    	service(configs.animalFindService,"POST",request,this.GetAnimalsResponse,this);

	    	if(this.valueKm()==this.maxKm()){
	    		return "+ km";
	    	}else return this.valueKm()+" km";
    	}, this);



    	this.animalPageClick=function(data){
			changePage(petlost.nav.pages.animalId,data);
    	}


		
	    
	}
	ko.applyBindings(new animalViewModel(),document.getElementById("animalViewPage"));
}