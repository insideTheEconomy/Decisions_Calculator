
/* - */

//-- Variable Declarations  -- //

var scenario;

// --------------------------- //



$("#attractLoop").click(function(e) {
	//$("#attractLoop").slideUp();
	$( "#attractLoop" ).tween({
	   opacity:{
	      start: 100,
	      stop: 0,
	      time: 0,
	      duration: 0.4,
	      effect:'easeInOut',
		  onStop: function(){
			$(".scenarioSelectBtn").each( function( i, v ) {
			  	$( this ).tween({
				   opacity:{
				      start: 0,
				      stop: 100,
				      time: i/2,
				      duration: 0.25,
				      effect:'easeInOut'
				   },
				   transform:{
				      start: 'rotate(0deg) scale( 0.1 )',
				      stop: 'rotate(720deg) scale( 1 )',
				      time: i/2,
				      duration: 1,
				      effect:'easeInOut'
				   }
				}).play();
			});
		   }
	   }
	}).play();
	
	$("#attractLoop").slideUp(500);
	
	console.log("clicked");
})

$(".scenarioSelectBtn").click(function(e) {
	scenario = $(this).attr("category");
	$("#screenContainer").slideUp( 500, function() {
		loadScenario();
	  });
})

var loadScenario = function() {
	$("#scenarioSelect").remove();
	
	switch (scenario) {
		case "game":
			console.log("loadScenario game");
			$(".title").empty().append("Save for a Game System");
			
			break;
			
		case "car":
			console.log("loadScenario car");
			$(".title").empty().append("Invest in a Car");
			break;
			
		case "vacation":
			console.log("loadScenario vacation");
			$(".title").empty().append("Save for a Vacation");
			break;
			
		case "house":
			console.log("loadScenario house");
			$(".title").empty().append("Invest in a House");
			break;
	}
	
	var comic = "<div id='scenarioSelect'><div class='comicPanel' category='game'>Panel 1</div><div class='comicPanel' category='car'>Panel 2</div><div class='comicPanel clear' category='vacation'>Panel 3</div><div class='comicPanel' category='house'>Panel 4</div></div>";
		
	$("#screenContainer").append(comic);
	
	$("#screenContainer").delay(500).slideDown();
}