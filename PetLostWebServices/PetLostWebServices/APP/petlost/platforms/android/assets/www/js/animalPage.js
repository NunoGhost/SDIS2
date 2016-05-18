petlost.pages.animalId=function(info){
	function animalIdModel(info) {
		console.log(info);
		this.name=ko.observable(info.NomeValue);
	    this.breed=ko.observable(info.RacaValue);
	    this.date=ko.observable(info.DataValue);
	    this.location=ko.observable(info.LocalizacaoLatValue); 	 
	    //initMap(info.LocalizacaoLatValue,info.LocalizacaoLongValue); 

	    //setCenter(info.LocalizacaoLatValue,info.LocalizacaoLongValue);
	    setCenter(41.1579438,-8.6291053);
	}
	var model=new animalIdModel(info);
	ko.applyBindings(model,document.getElementById("animalIdPage"));
}
