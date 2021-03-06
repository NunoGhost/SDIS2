petlost.pages.animalRegister=function(){
	function animalRegisterModel() {
	    this.name=ko.observable();
	    this.breed=ko.observable();
		var d = new Date();
		var datestring =  (d.getMonth()+1) + "-" + d.getDate() + "-" + d.getFullYear();
	    this.date=ko.observable(datestring);
	    this.location=ko.observable();
	    this.photo=ko.observable([]);
	    this.RegisterAnimalsResponse=function(response,context){
	    	console.log(response);

			if(response==undefined || response.status!=200){
				if(response.RegistoAnimalResult!=undefined){
					backPage();
					return;
				}
	    		alert("Error connecting to server");
	    	}else{
	    		
	    	}
		}

		this.loadFile=function(){
			var file    = document.querySelector('#photo').files[0]; //sames as here
			var sizeInMB = (file.size / (1024*1024)).toFixed(2);
			if(sizeInMB<=5 && file.type=="image/jpeg"){
				var reader  = new FileReader();
		        var self=this;
				reader.onload = function(context){
					var binaryString = this.result;
					var str=btoa(binaryString);
					var charCode;
					var bytesPhoto = [];
					for (var i = 0; i < str.length; ++i)
					{
					    charCode = str.charCodeAt(i);
					    bytesPhoto.push(charCode);
					}
					self.photo(bytesPhoto);
				}
				reader.readAsBinaryString(file);
			}else{
				if(sizeInMB>1) alert("A imagem é demasiado grande");
				else alert("A imagem não é suportada (apenas JPEG)");
				$("#photo")[0].value="";
			}
	        


		}


	    this.register=function(){
	    	var request={form:{NomeValue:this.name(),RacaValue:this.breed(),EmailValue:user.email,LocalizacaoLatValue:latv,LocalizacaoLongValue:lngv,DataValue:this.date()+" 00:00:00",FotoValue:this.photo(),EncontradoValue:false}};
	    	service(configs.registerService,"POST",request,this.RegisterAnimalsResponse,this);

	    	
	    }

		navigator.geolocation.getCurrentPosition(function(location) {
			setCenter(location.coords.latitude,location.coords.longitude);
		  	initMap();
		},function(){
			alert("ative a sua localização pf"); 
			var location={coords:{latitude:41.1244055,longitude:-8.6541063}};
			setCenter(location.coords.latitude,location.coords.longitude);
		  	initMap();
		});
	}
	ko.applyBindings(new animalRegisterModel(),document.getElementById("animalRegisterPage"));

	$("#datePicker").datepicker({ dateFormat:'dd-mm-yy'});
}
