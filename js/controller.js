/*
* controller.js
* This is the controller that checks the localStorage for the login details.
* If there are login details, we then display the list of tickets.
* If there are no login details, we display a message to the user telling them to go to the options page 
* to configure the extension.
*/
 var keyStr = "ABCDEFGHIJKLMNOP" +
               "QRSTUVWXYZabcdef" +
               "ghijklmnopqrstuv" +
               "wxyz0123456789+/" +
               "=";

  function encode64(input) {
     input = escape(input);
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
           enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
           enc4 = 64;
        }

        output = output +
           keyStr.charAt(enc1) +
           keyStr.charAt(enc2) +
           keyStr.charAt(enc3) +
           keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);

     return output;
  }

try{
	var userEmail = localStorage["userEmail"];
	var userName = localStorage["userName"];
	var userPassword = localStorage["userPassword"];
	var dataLength = 0;
	if((userName != '' || userName != undefined) && (userEmail != '' || userEmail != undefined) && (userPassword != '' || userPassword != undefined)){

		var shocklogicHDApp = angular.module('shocklogicHDApp', []);

		shocklogicHDApp.controller('shocklogicHDCtrl', function($scope, $http){
			$http.get('https://helpdesk.shocklogic.com/code/getHDtickets.php?email=' + userEmail + '&pwd=' + encode64(userPassword)).success(function(data) {
				$scope.tickets = data;
				dataLength = data.length;
		
				if(dataLength === 0){
					document.getElementById('notickets').style.display = 'block';
					document.getElementById('helpdesktickets').style.display = 'none';	
				}else{
					document.getElementById('nooptions').style.display = 'none';
					document.getElementById('helpdesktickets').style.display = 'block';		
				}	
			}).error(function(data){
				document.getElementById('nooptions').style.display = 'block';
				
				document.getElementById('helpdesktickets').style.display = 'none';			
			});
		});

	}

	$('.ticketUrl').attr('href', $('.ticketUrl').attr('href') + '&email=' + userEmail + '&pwd=' + encode64(userPassword));
	
}catch(err){
	console.log(err.message);
}