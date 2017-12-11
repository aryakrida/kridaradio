(function (window, $){
	"use strict"
	var HAPImagePlayer = function (data){
		
		var self = this,
		holder = data.holder,
		aspectRatio = data.aspectRatio || 2,
		counter,
		inited,
		imgArr,
		slideshowLen,
		time = 1000,
		ease = 'easeOutSine',
		resizeIntervalID,
		resizeInterval = 250,
		slideshowTimeoutID,
		slideshowTimeout = data.slideshowTimeout,
		nextImage,
		prevImage,
		currentImage,
		transitionOn;

		this.setData = function(){

		}
		this.init = function(arr){
			imgArr = arr;
			slideshowLen = imgArr.length;
			counter = 0;
			inited = true;
			if(!transitionOn)loadImage();
		}

		function loadImage(){
		    transitionOn = true;

		    var url = imgArr[counter];

		    $(new Image()).css({
			   position: 'absolute',
			   display: 'block',
			   opacity: 0,
			}).addClass('hap-media').prependTo(holder)
			.on('load',function() {
				nextImage = $(this);
				setImage();
			}).on('error',function(e){
				console.log("HAPImagePlayer loadImage error: " + e);
				next();
			}).attr('src', url);
		}

		function setImage(){
		    if(currentImage) prevImage = currentImage;	
		    if(prevImage)nextImage.css('opacity',1);
		    currentImage = nextImage;

		    HAPAspectRatio.resizeMedia('image', aspectRatio, holder, currentImage);	
		  
			if(prevImage)prevImage.stop().animate({opacity: 0}, time, ease, imageOn);
			else currentImage.stop().animate({opacity: 1}, time, ease, imageOn);//only first image
		}

		function imageOn(){
		    if(prevImage){
			    prevImage.remove();
			    prevImage=null;
		    }
		    transitionOn = false;
		    if(slideshowTimeoutID) clearTimeout(slideshowTimeoutID);
		    slideshowTimeoutID = setTimeout(next, slideshowTimeout); 
		}

		function next(){
		   counter++;
		   if(counter>slideshowLen-1)counter=0;
		   loadImage();
		}

		function previous(){
		   counter--;
		   if(counter<0)counter=slideshowLen-1;
		   loadImage();
		}

		function resize(){
			if(currentImage)HAPAspectRatio.resizeMedia('image', aspectRatio, holder, currentImage);
		}

		window.onresize = function() {
			if(!inited) return false;
			if(resizeIntervalID) clearTimeout(resizeIntervalID);
			resizeIntervalID = setTimeout(resize, resizeInterval);
		};
		
		this.setData();
	
	};	

	window.HAPImagePlayer = HAPImagePlayer;

}(window,jQuery));