$(document).ready(function(){
	/*Basic validation function to:
	1) Ensure submitted value is not empty
	2) Ensure a valid numeric value is entered
	Once all is well, pass on to penceCalculator function*/
	var validate = function(totalP){		
		var totalPence = totalP;
		
		if($.trim(totalPence) == ""){
			$('#txtPence').addClass("error");
			$('#errorCanvas').fadeIn(500).text("Please enter the amount of pennies above. E.G £2.49 or 249");
		}
		else if(!$.isNumeric(totalPence)){
			$('#txtPence').addClass("error");
			$('#errorCanvas').fadeIn(500).text("Sorry, I only accept numeric values. E.G £2.49 or 249");
		}
		else{
			$('#txtPence').removeClass("error");
			$('#errorCanvas').fadeOut(500);
			penceCalculator(totalPence);
		}		
	};
	
	/*This function calculates the total sterling coins needed to make the pence amount entered */
	var penceCalculator = function(totalPence){
		// Sterling denomination object, holds the accepted sterling denomination valuse and displays for this project
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
		
		//Series of assignments to clean the value entered for simpler calculation
		if(totalPence.indexOf('.') != -1){
			totalPence = parseFloat(totalPence);
			totalPence = totalPence.toFixed(2);
			totalPence = totalPence.replace(/[.]/g, "");
		}
		
		//Itterate through the denominations and compare values against the entered amount
		//Take the remainder and re-assign to pence value. 
		//Repeat until end of denominations
		for(var key in denom){
			denom.obj = denom[key];
		  	
		  	if(totalPence >= denom.obj.value){
		  		calcVal = totalPence / denom.obj.value;
				$('#resultCanvas ul').append("<li><strong>"+denom.obj.display +"</strong> " + Math.floor(calcVal)+"</li>");
		  		totalPence = totalPence % denom.obj.value;
		  	}
		}
	};
	
	//Detect form entry and kick off validation
	$('#btnCalcPenc').click(function(){
		$('#resultCanvas ul').empty();
		var totalP = $('#txtPence').val().replace(/[£]/g, "");
		validate(totalP);
	});
	
	//Trigger button click if enter is pressed
	$("input").keypress(function(event){
		if (event.which == 13){
			event.preventDefault();
			$('#btnCalcPenc').trigger('click');
		}
	});
	
});
