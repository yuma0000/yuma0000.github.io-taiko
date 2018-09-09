
function Scoresheet(controller, score){
    
    var _this = this;
    var _score = score;
    var _mark;
	
	this.setResults = function(){
		
		if (_score.fail == 0) {
        	_mark = 'gold';
    	} else if (_score.hp >= 50) {
    		_mark = 'silver';
    	};

		var imgW = (_score.hp*$("#score-hp-bar-colour").width())/100;
		$("#score-hp-bar-colour img").css("clip", "rect(0, "+imgW+"px, "+$("#score-hp-bar-colour").height()+"px, 0)");
		
		if (_mark == 'gold') {
			$("#score-mark").attr("src", '/assets/img/ranking-X.png');
		} else if (_mark == 'silver') {
			$("#score-mark").attr("src", '/assets/img/ranking-S.png');
		} else {
			$("#score-mark").remove();
		};

		$("#score-points").html(_score.points+"点");
		$("#nb-great").html(_score.great);
		$("#nb-good").html(_score.good);
		$("#nb-fail").html(_score.fail);
		$("#max-combo").html(_score.maxCombo);

		$('.result-song').attr('alt', _score.song).html(_score.song);
		
	}
	
	this.positionning = function(){
		
		$("#score-cont").css("top", $("#result-bar").height()/2 - ($("#score-cont").height()/2));
		
		var markSize = 0.1*$("#score-cont").width();
		var markX = $("#score-cont").offset().left - markSize - (0.5*markSize);
		var markY = $("#score-cont").offset().top;
		
		$("#score-mark").width(markSize);
		$("#score-mark").height(markSize);
		$("#score-mark").css("left", markX);
		$("#score-mark").css("top", markY);
		
		var scoreBarW = 0.9*$("#score-cont").width();

		$("#score-hp-bar-bg").width(scoreBarW);
		$("#score-hp-bar-bg").height((51/703)*scoreBarW);
		
		var bgW = $("#score-hp-bar-bg").width();
		var bgH = $("#score-hp-bar-bg").height();
		var bgX = $("#score-hp-bar-bg").position().left;
		var bgY = $("#score-hp-bar-bg").position().top;
		
		$("#score-hp-bar-colour").css("left", bgX+(0.008*bgW));
		$("#score-hp-bar-colour").css("top", bgY+(0.15*bgH));
		$("#score-hp-bar-colour").width(bgW-(0.08*bgW));
		$("#score-hp-bar-colour").height(bgH-(0.25*bgH));
		
		$("#score-details").css("top", bgY+bgH+(bgH));

		var barY = $("#result-bar").position().top;
		var barH = $("#result-bar").height();
		
		var bottomY = barY+barH+15;
		var bottomH = $(window).height()-bottomY;
		
		$("#bottom-part").css("top", bottomY);
		$("#bottom-part").height(bottomH);
		
		
	}
	
    this.run = function(){
		_this.positionning();
		_this.setResults();
		
        $("#song-select").click(function(){
        	assets.sounds["don"].playAsset();
        	bgm.pause();
            controller.songSelection();
        });
        
        $("#replay").click(function(){
        	assets.sounds["don"].playAsset();
        	bgm.pause();
            controller.restartSong();
        });
		
		$(window).resize(_this.positionning);
		
    }

	    assets.sounds["results"].playAsset();
	
		bgm = new BufferedLoop(
			{url: '/assets/audio/bgm_result.ogg', duration: 0.847},
			{url: '/assets/audio/bgm_result_loop.ogg', duration: 16.842}
		);
		bgm.play();



	$("#screen").load("/src/views/scoresheet.html", _this.run);
    
}