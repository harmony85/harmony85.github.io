(function(){
	// 変数セット
	var slider = $('#js-slider-main');
	var container = $('#js-slider-img');
	var contents = container.children('li');
	var img = {
		first: contents.filter(':first-child'),
		last: contents.filter(':last-child'),
		length: contents.length,
		w: contents.outerWidth(),
		h: contents.height()
	};
	var containerW = img.w * (img.length + 2);
	var allImgW = (img.w * img.length);
	var ctrl = $('#js-slider-controll');
	var prev = $('#js-slider-prev');
	var next = $('#js-slider-next');
	var speed = 500;
	var interval = 3000;
	var cFlag = true;
	var currentNum;
	var nextNum;
	var start;

	// ロード時の挙動
	slider.css({
		width: img.w + 'px',
		height: img.h + 'px'
	});
	container.css({
		width: containerW + 'px',
		marginLeft: -(img.w) + 'px',
		paddingLeft: img.w + 'px'
	});
	contents.each(function(i){
		$(this).attr('data-img', i);
		if(i===0){
			$(this).addClass('js-on');
			ctrl.append('<li class="js-on" data-controll="' + i + '"></li>');
		} else {
			ctrl.append('<li data-controll="' + i + '"></li>');
		}
	});
	autoPlay();

	// 前処理
	function slideBefore(){
		var d = new $.Deferred;
		if(nextNum >= img.length){
			img.first.css('left', allImgW + 'px');
		} else if(nextNum < 0){
			img.last.css('left', -(allImgW) + 'px');
		}
		d.resolve();
		return d.promise();
	}

	// 本処理
	function slideMove(){
		var d = new $.Deferred;
		slideBefore();
		if(nextNum < 0){
			container.animate({
				left: (img.w) + 'px'
			}, speed, function(){
				d.resolve();
			});
		} else {
			container.animate({
				left: -(img.w * nextNum) + 'px'
			}, speed, function(){
				d.resolve();
			});
		}
		return d.promise();
	}

	// 後処理
	function slideAfter(){
		var d = new $.Deferred;
		if(nextNum >= img.length){
			img.first.css('left', 0);
			container.css('left', 0);
			nextNum = 0;
		} else if(nextNum < 0){
			img.last.css('left', '');
			container.css('left', -(img.w * (img.length - 1)));
			nextNum = (img.length - 1);
		}
		d.resolve();
		return d.promise();
	}

	// onクラス切り替え
	function onMove(){
		var d = new $.Deferred;
		contents.removeClass('js-on');
		ctrl.children('li').removeClass('js-on');
		container.children('li[data-img="' + nextNum + '"]').addClass('js-on');
		ctrl.children('li[data-controll="' + nextNum + '"]').addClass('js-on');
		d.resolve();
		return d.promise();
	}

	// 全スライド処理
	function sliderFnc(){
		slideBefore()
		.then(slideMove)
		.then(slideAfter)
		.then(onMove)
		.then(function(){
			if(!cFlag){
				cFlag = true;
			}
		});
	}

	// 自動再生
	function autoPlay(){
		start = setInterval(function(){
			currentNum = Number(container.find('.js-on').attr('data-img'));
			nextNum = currentNum + 1;
			sliderFnc();
		}, interval);
	}

	// prevクリック
	prev.on('click', function(){
		clearInterval(start);
		if(cFlag) {
			cFlag = false;
			currentNum = Number(container.find('.js-on').attr('data-img'));
			nextNum = currentNum - 1;
			sliderFnc();
		}
		autoPlay();
	});

	// nextクリック
	next.on('click', function(){
		clearInterval(start);
		if(cFlag) {
			cFlag = false;
			currentNum = Number(container.find('.js-on').attr('data-img'));
			nextNum = currentNum + 1;
			sliderFnc();
		}
		autoPlay();
	});

	// controllクリック
	ctrl.children('li').on('click', function(e){
		clearInterval(start);
		if(cFlag) {
			cFlag = false;
			nextNum = Number($(e.currentTarget).attr('data-controll'));
			sliderFnc();
		}
		autoPlay();
	});

	// マウスオーバーとマウスアウトで自動再生ON/OFF
	container.on('mouseover', function(){
		clearInterval(start);
	});
	container.on('mouseout', function(){
		autoPlay();
	});

})();