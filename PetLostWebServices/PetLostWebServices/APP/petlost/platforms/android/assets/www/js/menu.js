petlost.pages.menu=function(){
	function menuModel() {
	    this.animalRegister=function(){
	    	changePage(petlost.nav.pages.animalRegister);
	    }
	    this.animalView=function(){
	    	changePage(petlost.nav.pages.animalView);
	    }
	    this.logout=function(){
	    	logout();
	    }
	    this.myanimals=function(){
	    	changePage(petlost.nav.pages.myanimals);
	    }
	 
	}
	ko.applyBindings(new menuModel(),document.getElementById("menuPage"));
}
