var petlost={
	pages:{},
	nav:{
		pagesStack:[],
		actualPage:{},
		pages:{
			login:{
				html:"html/login.html",
				init:function(){
					petlost.pages.login();
				}
			},
			menu:{
				html:"html/menu.html",
				init:function(){
					petlost.pages.menu();
				}
			},
			animalId:{
				html:"html/animalPage.html",
				init:function(info){
					menuLoad();
					petlost.pages.animalId(info);
				}
			},
			animalView:{
				html:"html/animalView.html",
				init:function(){
					menuLoad();
					petlost.pages.animalView();
				}
			},
			animalRegister:{
				html:"html/animalRegister.html",
				init:function(){
					menuLoad();
					petlost.pages.animalRegister();
				}
			},
			register:{
				html:"html/register.html",
				init:function(info){
					petlost.pages.register(info);
				}
			}
		}
	},
	
}

function initApp(){
	changePage(petlost.nav.pages.login);
}

function menuLoad(){
	$.ajax({
	  url: petlost.nav.pages.menu.html,
	  type: "GET",
	  dataType: "html",
	  async:false
	}).done(function(data){
		$("#header").html(data);
		petlost.nav.pages.menu.init();
	});
}

function changePage(pageURL,info){
	petlost.nav.pagesStack.push(pageURL);
	petlost.nav.actualPage=pageURL;
	$.ajax({
	  url: pageURL.html,
	  type: "GET",
	  dataType: "html",
	  async:false
	}).done(function(data){
		$("#container").html(data);
		pageURL.init(info);
	});
}

function backPage(){
	if(petlost.nav.pagesStack.length>1){
		petlost.nav.pagesStack.pop();
		changePage(petlost.nav.pagesStack[petlost.nav.pagesStack.length-1]);
		return true;
	}else{
		return false;
	}
}

function logout(){
	petlost.nav.pagesStack=[];
	$("#header").html("");
	changePage(petlost.nav.pages.login);
}