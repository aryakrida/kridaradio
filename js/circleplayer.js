(function (window, $){
"use strict"	
var HAPCirclePlayer = function (data){
		
	var self = this,
	isMobile = HAPUtils.isMobile(),
	parent = data.parent,
	
	hapCirclePlayer = parent.find('.hap-circle-player'),
	hapLoadCanvas = parent.find('.hap-load-canvas'),
	hapProgressCanvas = parent.find('.hap-progress-canvas'),
	strokeSize = parseInt(hapCirclePlayer.attr('data-stroke-size'),10);

	if(hapLoadCanvas.length){
		var loadColor = hapLoadCanvas.attr('data-color'), 
		loadCtx = hapLoadCanvas[0].getContext('2d'),
		circleWidth = hapLoadCanvas.width(),//canvas width and height needs to be the same!
		circleHeight = hapLoadCanvas.height();
	}
	if(hapProgressCanvas.length){
		var progressColor = hapProgressCanvas.attr('data-color'),
		progressCtx = hapProgressCanvas[0].getContext('2d'),
		circleWidth = hapProgressCanvas.width(),
		circleHeight = hapProgressCanvas.height();
	}

	var circ = Math.PI * 2,
	quart = Math.PI / 2,
	circleRadius = circleWidth/2,//same as circleHeight/2
	lastProgressPercent = 0,
	lastLoadPercent = 0;

	this.setData = function(){

	}

	this.drawSeekbar = function(loadPercent,t,d){
		if(hapLoadCanvas.length)drawLoadbar(loadPercent);
		if(hapProgressCanvas.length)drawProgressbar(t/d);
	}

	this.clear = function(){
		if(hapProgressCanvas.length)progressCtx.clearRect(0, 0, circleWidth, circleHeight);
		if(hapLoadCanvas.length)loadCtx.clearRect(0, 0, circleWidth, circleHeight);
		lastProgressPercent = 0;
		lastLoadPercent = 0;
	}

	this.setColor = function(type, value){
		if(type == 'load'){
			loadColor = value;
		}else{
			progressColor = value;
		}
	}

	this.setSize = function(d){

		circleWidth = d;
		circleHeight = d;
		circleRadius = circleWidth/2;

		if(hapProgressCanvas.length){
			progressCtx.canvas.width = d;
			progressCtx.canvas.height = d;
		}
		if(hapLoadCanvas.length){
			loadCtx.canvas.width = d;
			loadCtx.canvas.height = d;
		}
	}

	this.setStrokeSize = function(v){
		strokeSize = v;
	}

	this.setProgress = function(point){

		var x = point.pageX - hapCirclePlayer.offset().left - circleWidth/2,
			y = point.pageY - hapCirclePlayer.offset().top - circleHeight/2,
			mAngle = Math.atan2(y, x);
				
		if (mAngle > -1 * Math.PI && mAngle < -0.5 * Math.PI) {
			mAngle = 2 * Math.PI + mAngle;
		}
		
		var v = Math.max(0, Math.min((mAngle + Math.PI / 2) / 2 * Math.PI * 10))/100;
		
		if(hapProgressCanvas.length){
			progressCtx.clearRect(0, 0, circleWidth, circleHeight);
			drawProgressbar(v);
		}

		return v;

	}

	this.trackTooltip = function(e){

		var x1 = e.pageX - hapCirclePlayer.offset().left,
			y1 = e.pageY - hapCirclePlayer.offset().top,
			x = x1 - circleWidth/2,
			y = y1 - circleHeight/2,
			mAngle = Math.atan2(y,x);
		
		if (mAngle > -1 * Math.PI && mAngle < -0.5 * Math.PI){
			mAngle = 2 * Math.PI + mAngle;
		}
		var v = Math.max(0, Math.min((mAngle + Math.PI / 2) / 2 * Math.PI * 10))/100;
		
		return v;
	
	}

	function drawProgressbar(percent){
		if(hapProgressCanvas.length){
			progressCtx.clearRect(0, 0, circleWidth, circleHeight);
			progressCtx.beginPath();      
			progressCtx.arc(circleWidth/2, circleHeight/2,circleRadius-strokeSize/2,-(quart),((circ) * percent) - quart,false);
			progressCtx.strokeStyle = progressColor;
			progressCtx.lineCap = 'butt';
			progressCtx.lineWidth = strokeSize;
			progressCtx.stroke();
			lastProgressPercent = percent;
		}
	}
	
	function drawLoadbar(percent){
		if(hapLoadCanvas.length){
			loadCtx.clearRect(0, 0, circleWidth, circleHeight);
			loadCtx.beginPath();    
			loadCtx.arc(circleWidth/2, circleHeight/2,circleRadius-strokeSize/2,-(quart),((circ) * percent) - quart,false);
			loadCtx.strokeStyle = loadColor;
			loadCtx.lineCap = 'butt';
			loadCtx.lineWidth = strokeSize;
			loadCtx.stroke();
			lastLoadPercent = percent;
		}
	}
	
	this.setData();

};	

window.HAPCirclePlayer = HAPCirclePlayer;

}(window,jQuery));