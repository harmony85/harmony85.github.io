$(document).ready(function(){
	$(function(){

		//スムーススクロール
		$('a[href^=#]').click(function() {
			var speed = 500; // ミリ秒
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});

		//右ナビゲーション：マウスオーバーで文字フェードイン
		$('#digest_nav .digest_nav_set a').mouseover(function(){
			$(this).parent().find('p').stop().fadeIn(200);
		});
		$('#digest_nav .digest_nav_set a').mouseout(function(){
			$(this).parent().find('p').stop().fadeOut(200);
		});

		//右ナビゲーション：スクロール位置によるポイント切替
		$(window).on('load scroll resize', function () {
			var array = $('#digest_nav').find('.digest_nav_set');
			var dst = new Array();
			var ds = $('#digest').find('.digest_section');
			for(var dsr = 0; ds.length > dsr; dsr++){
				dst.push(($(ds[dsr]).offset().top)-50);
			}
			var scrollpx = $(this).scrollTop();
			if (scrollpx > dst[4]) {
				array.removeClass('on');
				$(array[4]).addClass('on');
			} else if (scrollpx > dst[3]) {
				array.removeClass('on');
				$(array[3]).addClass('on');
			} else if (scrollpx > dst[2]) {
				array.removeClass('on');
				$(array[2]).addClass('on');
			} else if (scrollpx > dst[1]) {
				array.removeClass('on');
				$(array[1]).addClass('on');
			} else if (scrollpx > dst[0]) {
				array.removeClass('on');
				$(array[0]).addClass('on');
			}
		});

		//スクロールによるアニメーション
		var WH =$(window).height();
		var setSpeed = 500; // ミリ秒
		$('.f_left .digest_set_box').css('left', -50);
		$('.f_right .digest_set_box').css('right', -50);

		$(window).on('load scroll resize', function () {
			var scroll = $(window).scrollTop();

			//年代とset
			$('.era, .f_center, .f_left, .f_right').each(function(){
				var setPos = $(this).offset().top;
				var eh = $(this).height();

				if ($(this).hasClass('era')) {
					if (scroll + 450 > setPos && scroll + 250 < setPos + eh) {
						$(this).find('img').stop().animate({
							'top': 0,
							'left': 0,
							'width': '367px',
							'opacity': 1
						}, setSpeed);
					}
				} else if ($(this).hasClass('f_center')) {
					if (scroll + 600 > setPos && scroll + 350 < setPos + eh) {
						$(this).find('.digest_set_box').stop().animate({
							'opacity': 1
						}, setSpeed);
					}
				} else if ($(this).hasClass('f_left')) {
					if (scroll + 450 > setPos && scroll + 250 < setPos + eh) {
						$(this).find('.digest_set_box').stop().animate({
							'left': 0,
							'opacity': 1
						}, setSpeed);
					}
				} else if ($(this).hasClass('f_right')) {
					if (scroll + 450 > setPos && scroll + 250 < setPos + eh) {
						$(this).find('.digest_set_box').stop().animate({
							'right': 0,
							'opacity': 1
						}, setSpeed);
					}
				}
			});
		});
	
		//背景
		var win = $(window);
		var elm = $('.digest_section');
		var sp = 3;
		for (var i=0 ; i<=4 ; i++) {
			var secH = $(elm[i]).height();
			$('#digest_section_'+(i+1)).css('height', secH);
		}

		pos = [];
		os = [];
		osNextCheck = [];
		osNext = [];
		h = [];
		posArray = [];
		posY = [];

		elm.each(function(b){
			var self = $(this);
			pos[b] = self.css('background-position');
			os[b] = self.offset().top;
			osNextCheck[b] = self.next().size();
			if(osNextCheck[b] != 0){
				osNext[b] = self.next().offset().top;
			} else {
				h[b] = self.height();
				osNext[b] = os[b] + h[b];
			}
			if(pos[b]){
				var posArraySet = pos[b].split(" ");
				posArray[b] = new Array(posArraySet[0], posArraySet[1]);
				posY[b] = posArray[b][1].replace("px", "");
			} else {
				posY[b] = elm.css("background-position-y").replace("px", "");
			}
		});

		win.on('load scroll resize', function () {
			var y = $(this).scrollTop();
			var winH = win.height();
			elm.each(function(b){
				var self = $(this);
				if(pos[b]){
					if (y > os[b] - winH && y < osNext[b]) {
						self.css("background-position", posArray[b][0] + parseInt(-y / sp + os[b] / sp - 100) + "px");
					}
				} else {
					self.css("background-position-y", parseInt(-y / sp + os[b] / sp - 100) + "px");
				}
			});
		});
	
	});
});