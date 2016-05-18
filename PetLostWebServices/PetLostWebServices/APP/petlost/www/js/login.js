petlost.pages.login=function(){
	function LoginModel() {
	    this.email = ko.observable("pedro@petlost.pt");
	    this.password = ko.observable("pedro123");
	    this.login=function(){
	    	console.log("email: "+this.email());
	    	console.log("password: "+this.password());
	    	var request={form:{EmailValue:this.email(),PasswordValue:this.password()}};
	    	service(configs.loginService,"POST",request,this.loginResponse,this);
	    }

	    this.register=function(){
	    	changePage(petlost.nav.pages.register);
	    }


	    this.loginResponse=function(response,context){
	    	console.log(response);
	    	if(response==undefined || response.status==0){
	    		alert("Error connecting to server");
	    	}else{
	    		if(response.LoginResult){
	    			user.email=context.email();
            		changePage(petlost.nav.pages.animalView);
	            }else{
	            	alert("Invalid credencials");
	            }
	    	}
		}

		this.facebookLogin=function(){
			FB.login(function (response) {
		    if (response.authResponse) {
		      console.log(response);
		     	FB.api('/me?fields=id,name,email,permissions', function (response) {

		     		var request={form:{EmailValue:response.email,PasswordValue:response.id}};
	    			$.ajax({
						type: "POST",
						contentType: 'application/json; charset=utf-8',
						dataType: "json",
						url: configs.server+configs.loginService,
						data: JSON.stringify(request),
						crossDomain: true,
				    }).done(function (resp) {
				    	if(resp==undefined || resp.status==0){
				    		changePage(petlost.nav.pages.register,response);
				    	}else{
				    		if(resp.LoginResult){
				    			user.email=response.email;
			            		changePage(petlost.nav.pages.animalView);
				            }else{
				            	changePage(petlost.nav.pages.register,response);
				            }
				    	}
				    }).fail(function (err) {
				    	changePage(petlost.nav.pages.register,response);
				    });
			        
		      	});
		    } else {
		      alert("Login attempt failed!");
		    }
		  }, { scope: 'email,user_photos,publish_actions' });






		}
	}
	ko.applyBindings(new LoginModel(),document.getElementById("loginPage"));

}


