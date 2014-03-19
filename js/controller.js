/*
* controller.js
* This is the controller that checks the localStorage for the login details.
* If there are login details, we then display the list of tickets.
* If there are no login details, we display a message to the user telling them to go to the options page 
* to configure the extension.
*/
try{
	var userEmail = localStorage["userEmail"];
	var userName = localStorage["userName"];
	var userPassword = localStorage["userPassword"];

	var shocklogicHDApp = angular.module('shocklogicHDApp', []);

	shocklogicHDApp.controller('shocklogicHDCtrl', function($scope, $http){
		$http.get('https://helpdesk.shocklogic.com/code/getHDtickets.php?email=' + userEmail).success(function(data) {
			$scope.tickets = data;

		}).error(function(data){
			document.getElementById('nooptions').style.display = 'block';
			
			document.getElementById('helpdesktickets').style.display = 'none';			
		});
	});

	document.getElementById('nooptions').style.display = 'none';
	
	document.getElementById('helpdesktickets').style.display = 'block';

	$('.ticketUrl').attr('href', $('.ticketUrl').attr('href') + '&email=' + userEmail);

}catch(err){
	console.log(err.message);
}