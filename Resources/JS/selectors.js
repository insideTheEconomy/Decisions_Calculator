
/* - */

//-- Variable Declarations  -- //

var initHTML;
var initiated;

var scenario;
var curScreen;

// --------------------------- //

$(function () {
	//Happens only FIRST time program is run
	if (!initiated) {
		console.log("Init");
		initHTML = $(document.body).html();
		initiated = true;
	} else {
		
	}
	
	//Happens on EVERY restart
	loadIdle();
	curScreen = 0;
});

// --------------------------- //


//-- Click Event Handlers  -- //

//Removes the attract loop and animates in the scenarioSelectBtns
$("#attractLoop").click(function(e) {
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
				      time: (i/2)-(0.35*i),
				      duration: 0.25,
				      effect:'easeInOut'
				   },
				   transform:{
				      start: 'rotate(0deg) scale( 0.1 )',
				      stop: 'rotate(720deg) scale( 1 )',
				      time: (i/2)-(0.35*i),
				      duration: 1,
				      effect:'elasticOut'
				   }
				}).play();
			});
		   }
	   }
	}).play();
	
	$("#attractLoop").slideUp(500);
});

//Select scenario from main menu buttons
$(".scenarioSelectBtn").click(function(e) {
	scenario = $(this).attr("category");
	$("#screenContainer").slideUp( 500, function() {
		curScreen = 1;
		loadScenario();
	  });
});

//Next Button During Scenarios
var bindNextBtn = function() {
	$(".nextBtn").click(function(e) {
		console.log("NEXT Clicked");
		$('#screenContainer').tween({
		   opacity:{
		      start: 100,
		      stop: 0,
		      time: 0,
		      duration: 0.5,
		      effect:'sineOut'
		   },
		   onStop: function (elem) {
			  $("#screenContainer").slideUp(25);
			  curScreen++;
			  loadScenario();
		   }
		}).play();
	});
}

// --------------------------- //

//-- Function Vars  -- //

var hardReset = function() {
	$(document.body).empty().append(initHTML);
}

//Makes the text bounce at the attract loop
var loadIdle = function() {
	$("#loadIdle").tween({
	  fontSize: {
			start: 100,
			stop: 110,
			time: 0,
			duration: 0.5,
			units: 'px',
			effect:'cubicIn'
		   },
	   onStop: function( elem ) {
			$("#loadIdle").tween({
				fontSize: {
					start: 110,
					stop: 100,
					time: 0,
					duration: 0.5,
					units: 'px',
					effect:'cubicOut'
				},
			   onStop: function( elem ) {
					loadIdle();
			   }
			}).play();
	   }
	}).play();
};

//Called when the user selects their scenario from scenarioSelectBtn.click
var loadScenario = function() {
	//Hide this stuff
	$("#scenarioSelect").css("height", "0px");
	$(".title").css("height", "0px");
	
	//load scenario from html into #screnContainer
	switch (scenario) {
		case "couch":
			$("#screenContainer").load("couch.html #couch_screen" + curScreen, function() {
				console.log("LOAD COUCH.HTML");
				animateScenario();
			});
			break;
			
		case "car":
			$("#screenContainer").load("car.html #car_screen" + curScreen, function() {
				console.log("LOAD CAR.HTML");
				animateScenario();
			});
			break;
			
		case "savings":
			break;
			
		case "lottery":
			break;
	}	
};

//Tweens the dialog, circles, and images for the scneario expository scenes
var animateScenario = function() {
	$('#screenContainer').tween({
	   opacity:{
	      start: 0,
	      stop: 100,
	      time: 0,
	      duration: 0,
	      effect:'sineOut'
	   }
	}).play();
	
	$("#screenContainer").delay(1000).slideDown(500, function() {
		
		//Animate image on screen
		$('.comicImg').tween({
		   opacity:{
		      start: 0,
		      stop: 100,
		      time: 0,
		      duration: 0.5,
		      effect:'sineOut'
		   },
		   height:{
		      start: 0,
		      stop: 1000,
		      time: 0,
		      units: 'px',
		      duration: 0.5,
		      effect:'sineOut'
		   },
		   top:{
		      start: 1200,
		      stop: parseInt($('.comicImg').attr("targetH")),
		      time: 0,
		      units: 'px',
		      duration: 0.5,
		      effect:'sineOut'
		   }
		});
		
		//Animate circles onto screen
			$(".circleText").each( function( i, v ) {
			  	$( this ).tween({
				   opacity:{
				      start: 0,
				      stop: 100,
				      time: parseInt($(this).attr("time")),
				      duration: 0.25,
				      effect:'easeInOut'
				   },
				   transform:{
				      start: 'rotate(0deg) scale( 0.1 )',
				      stop: 'rotate(720deg) scale( 1 )',
				      time: parseInt($(this).attr("time")),
				      duration: 1,
				      effect:'elasticOut'
				   },
				}).play();
			});
					
		//Animate Text on Screen
		$(".dialog").each(function(i, v){
			var thisObj = $(this);
			var anim = getTargetAnim(thisObj);
			console.log("anim.timing");
			console.log(anim.timing);
			
			//Set Vertical Location of Dialog
			$(this).css("top", anim.top + "px");
			
			//Animate dialog horizontally
			$(this).tween({
			   left:{
			      start: 1280,
			      stop: anim.left,
			      time: parseInt(anim.timing),
			      units: 'px',
			      duration: 0.5,
			      effect:'sineOut'
			   },
			   onStop: function( elem ) {
				
			   }
			}).play();
		});
		
		$(".nextBtn").each(function(i, v) {
			$(this).tween({
			   opacity:{
			      	start: 0,
			      	stop: 100,
			      	time: parseInt($(this).attr("time")),
			      	duration: 0.5,
			      	effect:'sineOut'
			   },
			   onStop: function(elem) {
					bindNextBtn();
			   }
			}).play();
		});
	});
}

//Pull anim vars off targeted dialog line
var getTargetAnim = function(target) {
	var anim = target.attr("anim");
	return JSON.parse(anim);
}


