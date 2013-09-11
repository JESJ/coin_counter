$(document).ready(function(){
/************************** REQUIRED TEST BLOCK START******************************/
	var cleanPenceOut = function(totalPence){
		var cleanPence = totalPence.replace(/[£]/g, "").replace(/[p]/g, "");
		
		if(cleanPence.indexOf('.') != -1){
			cleanPence = parseFloat(cleanPence);
			cleanPence = cleanPence.toFixed(2);
			cleanPence = cleanPence.replace(/[.]/g, "");
		}
		if(totalPence.indexOf('£') != -1 && totalPence.indexOf('.') === -1){
			cleanPence = cleanPence*100;
		};
		return parseInt(cleanPence);
	}
	
	test( "input = 4", function() {
	  ok( cleanPenceOut("4") === 4, "returns 4" );
	});
	
	test( "input = 85", function() {
	  ok( cleanPenceOut("85") === 85, "returns 85" );
	});
	
	test( "input = 197p", function() {
	  ok( cleanPenceOut("197p") === 197, "returns 197" );
	});
	
	test( "input = 2p", function() {
	  ok( cleanPenceOut("2p") === 2, "returns 2" );
	});
	
	test( "input = 1.87", function() {
	  ok( cleanPenceOut("1.87") === 187, "returns 187" );
	});
	
	test( "input = £1.23", function() {
	  ok( cleanPenceOut("£1.23") === 123, "returns 123" );
	});
	
	test( "input = £2", function() {
	  ok( cleanPenceOut("£2") === 200, "returns 200" );
	});
	
	test( "input = £10", function() {
	  ok( cleanPenceOut("£10") === 1000, "returns 1000" );
	});
	
	test( "input = £1.87p", function() {
	  ok( cleanPenceOut("£1.87p") === 187, "returns 187" );
	});
	
	test( "input = £1p", function() {
	  ok( cleanPenceOut("£1p") === 100, "returns 100" );
	});
	
	test( "input = £1.p", function() {
	  ok( cleanPenceOut("£1.p") === 100, "returns 100" );
	});
	
	test( "input = 001.41p", function() {
	  ok( cleanPenceOut("001.41p") === 141, "returns 141" );
	});
	
	test( "input = 4.235p", function() {
	  ok( cleanPenceOut("4.235p") === 424, "returns 424" );
	});
	
	test( "input = £1.257422457p", function() {
	  ok( cleanPenceOut("£1.257422457p") === 126, "returns 126" );
	});
/************************** REQUIRED TEST BLOCK START******************************/

/************************** MY TESTS START******************************/
/************************** STRIP POUND SIGN TEST BLOCK START******************************/
	test( "Testing stripping pound sign and 'p'", function() {
	  ok( "£200.00p".replace(/[£]/g, "").replace(/[p]/g, "") == "200.00", "Passed!" );
	});
/************************** STRIP POUND SIGN TEST BLOCK START******************************/

/************************** VALIDATION TEST BLOCK START******************************/
	var validate = function(totalP){
		totalP;
		
		if($.trim(totalP) == ""){
			return 1;
		}
		else if(!$.isNumeric(totalP)){
			return 2;
		}
		else{
			return 0;
		}		
	};
	
	test( "Testing blank value validation", function() {
	  ok( validate("") == 1, "Passed!" );
	});
	
	test( "Testing blank value trim", function() {
	  ok( validate("     ") == 1, "Passed!" );
	});
	
	test( "Testing None numeric value validation", function() {
	  ok( validate("asf") == 2, "Passed!" );
	});
	
	test( "Testing value of 294 pence", function() {
	  ok( validate(294) == 0, "Passed!" );
	});
/************************** VALIDATION TEST BLOCK END******************************/

/************************** CALCULATION TEST BLOCK START******************************/
	var penceCalculator = function(totalPence){
		var concatCollector = "";
		var denom = {
		  	twoPounds: {display: "2", value: 200},
		  	onePound: {display: "1", value: 100},
		  	fiftyP: {display: "50p", value: 50},
		  	twentyP: {display: "20p", value: 20},
		  	tenP: {display: "10p", value: 10},
		  	fiveP: {display: "5p", value: 5},
		  	twoP: {display: "2p", value: 2},
		  	oneP: {display: "1p", value: 1}
		};
		
		if(totalPence.indexOf('.') != -1){
			totalPence = parseFloat(totalPence);
			totalPence = totalPence.toFixed(2);
			totalPence = totalPence.replace(/[.]/g, "");
		}
	
		for(var key in denom){
			denom.obj = denom[key];
		  	
		  	if(totalPence >= denom.obj.value){
		  		calcVal = totalPence / denom.obj.value;
				concatCollector = concatCollector + denom.obj.display  + " " + Math.floor(calcVal) + ',';
		  		totalPence = totalPence % denom.obj.value;
		  	}
		}
		return concatCollector;
	};
	
	test( "Testing calculation of 2 pence", function() {
	  ok( penceCalculator("2") == "2p 1,", "Passed! Expecting 2p X 1" );
	});
	
	test( "Testing calculation of 200 pence", function() {
	  ok( penceCalculator("200") == "2 1,", "Passed! Expecting 2pounds X 1" );
	});
	
	test( "Testing calculation of 495 pence", function() {
	  ok( penceCalculator("495") == "2 2,50p 1,20p 2,5p 1,", "Passed! Expecting 2pounds X 2, 50p X 1, 20p X 2, 5p X 1" );
	});
	
	test( "Testing calculation of 4.95 pence", function() {
	  ok( penceCalculator("4.95") == "2 2,50p 1,20p 2,5p 1,", "Passed! Expecting 2pounds X 2, 50p X 1, 20p X 2, 5p X 1" );
	});
	
	test( "Testing calculation of 49.5 pence", function() {
	  ok( penceCalculator("49.5") == "2 24,1 1,50p 1,", "Passed! Expecting 2pounds X 24, 1pound X 1, 50p X 1" );
	});
/************************** CALCULATION TEST BLOCK END******************************/
	
});