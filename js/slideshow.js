(function (window, $){
	"use strict"
	var HAPSlideshow = function (data){

		var self = this,
			imgArr, 
			slideshowLen,
            counter, 
            nextImage,
            prevImage, 
            currentImage, 
            transitionSpeed = 2000, 
            transitionEase = "linear",
            slideshowTimeoutID, 
            slideshowDelay, 
            slideStartTime, 
            slidePassedTime, 
            slideDelay, 
            transitionOn, 
            playing = false,
            slideHolder,
            continous = false;

        this.setData = function(){
        	slideHolder = data.slideHolder;
        	slideDelay = slideshowDelay = data.slideshowDelay;
        	continous = data.continous || false;
		}
		this.init = function(arr){
            imgArr = arr;
			slideshowLen = imgArr.length;
			counter = -1;
			playing=true;
			if(!transitionOn)self.next();
		}
		this.next = function(){
            continous ? self.pause() : self.stop();
            counter++;
            if(counter>slideshowLen-1)counter=0;
            loadImage();
        }
        this.previous = function(){
            continous ? self.pause() : self.stop();
            counter--;
            if(counter<0)counter=slideshowLen-1;
            loadImage();
        }
        this.pause = function(stop){
            if(slideshowTimeoutID) clearTimeout(slideshowTimeoutID);	
            slidePassedTime = (new Date().getTime() - slideStartTime);
            slideDelay -= slidePassedTime;
            if(slideDelay<0)slideDelay=0;
            if(stop)playing=false;
           	$(self).trigger('HAPSlideshow.PAUSE');
        }
        this.resume = function(){
            if(transitionOn)return;
            if(slideshowTimeoutID) clearTimeout(slideshowTimeoutID);
            slideStartTime = new Date().getTime();
            slideshowTimeoutID = setTimeout(self.next, slideDelay); 
            playing=true;
            $(self).trigger('HAPSlideshow.RESUME',{delay:slideDelay});
        }
        this.stop = function(stop){
            if(slideshowTimeoutID) clearTimeout(slideshowTimeoutID);
            if(stop)playing=false;
            $(self).trigger('HAPSlideshow.STOP');
        }
        this.play = function(){
        	if(transitionOn)return;
            if(slideshowTimeoutID) clearTimeout(slideshowTimeoutID);	
            slideshowTimeoutID = setTimeout(self.next, slideshowDelay);  
            playing=true;
           	$(self).trigger('HAPSlideshow.PLAY');
        }
        
        this.isTransitionOn = function(){
            return transitionOn;
        }
        this.isPlaying = function(){
            return playing;
        }

        function loadImage(){
            transitionOn = true; 

            $(self).trigger('HAPSlideshow.IMAGE_LOAD_START');

            var url = imgArr[counter],
            img = $(new Image()).on('load',function() {
            	$(self).trigger('HAPSlideshow.IMAGE_LOAD_END');

                nextImage = $(this).prependTo(slideHolder);
                getTransition();
				
            }).on('error',function(e){ 
           		console.log("error " + e);
           		self.next();
            }).attr("src", url);
        }
        function imageOn(){
            if(prevImage){
               prevImage.remove();
               prevImage=null;
            }
            transitionOn = false;    
            slideDelay = slideshowDelay;

            if(playing) continous ? self.resume() : self.play();
           
            $(self).trigger('HAPSlideshow.IMAGE_ON');
        }
        function getTransition(){
        	if(currentImage) prevImage = currentImage;   
        	if(prevImage){
				prevImage.css('marginTop',-prevImage.height());
				nextImage.css('opacity',1);
        	}
            currentImage = nextImage;

			if(prevImage)prevImage.stop().animate({opacity: 0}, transitionSpeed, transitionEase, imageOn);
			else currentImage.stop().animate({opacity: 1}, transitionSpeed, transitionEase, imageOn);//only first image
            
        }

		this.setData();
	
	};
	
	window.HAPSlideshow = HAPSlideshow;	

}(window,jQuery));