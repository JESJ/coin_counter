$(document).ready(function(){
	var validate = function(totalP){		
		var totalPence = totalP;
		
		if($.trim(totalPence) == ""){
			alert("Please enter a value");
		}
		else if(!$.isNumeric(totalPence)){
			alert("Please enter a valid number");
		}
		else{
			penceCalculator(totalPence);
		}		
	};
	
	var penceCalculator = function(totalPence){
		var denom = {
		  	twoPounds: {display: "£2", value: 200},
		  	onePound: {display: "£1", value: 100},
		  	fiftyP: {display: "50p", value: 50},
		  	twentyP: {display: "20p", value: 20},
		  	tenP: {display: "10p", value: 10},
		  	fiveP: {display: "5p", value: 5},
		  	twoP: {display: "2p", value: 2},
		  	oneP: {display: "1p", value: 1}
		};
		
		totalPence = parseFloat(totalPence);
		totalPence = totalPence.toFixed(2);
		totalPence = totalPence.replace(/[.]/g, "");
		  
		for(var key in denom){
			denom.obj = denom[key];
		  	
		  	if(totalPence >= denom.obj.value){
		  		calcVal = totalPence / denom.obj.value;
		  		console.log(denom.obj.display + " " + Math.floor(calcVal));
		  		totalPence = totalPence % denom.obj.value;
		  	}
		}
	};
	
	$('#btnCalcPenc').click(function(){
		var totalP = $('#txtPence').val().replace(/[£]/g, "");
		validate(totalP);
	});
	
});
