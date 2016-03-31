$j = jQuery.noConflict();
var _ua = (function(u){
	return {
		Tablet:(u.indexOf('windows') != -1 && u.indexOf('touch') != -1 && u.indexOf('tablet pc') == -1) 
			|| u.indexOf('ipad') != -1
			|| (u.indexOf('android') != -1 && u.indexOf('mobile') == -1)
			|| (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1)
			|| u.indexOf('kindle') != -1
			|| u.indexOf('silk') != -1
			|| u.indexOf('playbook') != -1,
		Mobile:(u.indexOf('windows') != -1 && u.indexOf('phone') != -1)
			|| u.indexOf('iphone') != -1
			|| u.indexOf('ipod') != -1
			|| (u.indexOf('android') != -1 && u.indexOf('mobile') != -1)
			|| (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1)
			|| u.indexOf('blackberry') != -1
	}
})(window.navigator.userAgent.toLowerCase());

//OnLoadFunctions
$j(function(){
	spView = 'width=320px,user-scalable=yes,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0';
	$headerSp = $j('#sp_header');
	$footerSp = $j('#sp_footer');
	$headerPc = $j('#header');
	$footerPc = $j('#footer_menu');
	$pagetopSp = $j('#jdc_sp_pagetop');
	if(_ua.Mobile) {
		$('head').prepend('<meta name="viewport" content="' + spView + '" id="viewport">');
		$headerSp.css("display","block");
		$footerSp.css("display","block");
		$pagetopSp.css("display","block");
	} else if(_ua.Tablet) {
		$headerPc.css("display","block");
		$footerPc.css("display","block");
	} else {
		$headerPc.css("display","block");
		$footerPc.css("display","block");
	}
	rolloververImages();
	movieSize();
	flexGrid();
	copyguard();
});

/**
 * ImageRollOver
 * img.roverにロールオーバー動作設定
 * 画像はソース画像と同階層に***_on.jpgなどを用意
 */
function rolloververImages() {
	var image_cache = new Object();
	$j('img.rover').each(function(i) {
		var imgsrc = this.src;
		var dot = this.src.lastIndexOf('.');
		var imgsrc_ro = this.src.substr(0, dot) + '_on' + this.src.substr(dot, 4);
		image_cache[this.src] = new Image();
		image_cache[this.src].src = imgsrc_ro;
		$j(this).hover(
		function() { this.src = imgsrc_ro; },
		function() { this.src = imgsrc; });
	});
}

//デバイス別動画サイズ付与
function movieSize() {
	$content = $j('.movieMain');
	if(_ua.Mobile) {
		var movieWidth = 310;
		var movieHeight = (movieWidth * 9) / 16;
		this.$content.css({
			width: movieWidth,
			height: movieHeight
		});
		this.$content.find('object').css({
			width: movieWidth,
			height: movieHeight
		});
	} else if(_ua.Tablet) {
		var movieWidth = 600;
		var movieHeight = (movieWidth * 9) / 16;
		this.$content.css({
			width: movieWidth,
			height: movieHeight
		});
		this.$content.find('object').css({
			width: movieWidth,
			height: movieHeight
		});
	} else {
		var movieWidth = 800;
		var movieHeight = (movieWidth * 9) / 16;
		this.$content.css({
			width: movieWidth,
			height: movieHeight
		});
		this.$content.find('object').css({
			width: movieWidth,
			height: movieHeight
		});
	}
}

//Masonry + ローディング
function flexGrid(){
	var param = {
		mContainer: $j('#photoContents'),
		itemSelector: '.photoBox',
		loader: '#loaderBox'
	};

	var $container = param.mContainer;

	$container.masonry({
		columnWidth: '.grid_sizer',
		itemSelector: param.itemSelector
	});

	var LoaderImg = {
		init: function(){
			$j('#loaderBox').css('display','block');
		},
		destroy: function(){
			$j(param.loader).delay(100).fadeOut(500,
				function(){
					$(this).remove();
					revealPhoto();
				});
		}
	};

	LoaderImg.init();
	$container.imagesLoaded().done(function(){
		LoaderImg.destroy();
	});

	function revealPhoto(){
		var _elmes, _items;
		_elems = $container.masonry('getItemElements'),
		_items = $container.masonry( 'getItems', _elems );

		$container.children().css({
			visibility: 'visible'
		});
		$container.fadeIn().masonry('reveal', _items).masonry();
	}
}

function copyguard(){
	$j('.photoBox a').append('<img src="spacer.png" class="copyguard" />');
	$j('.movieLink').append('<img src="spacer.png" class="copyguard" />');
}

//モーダル
$j(function() {
	$j('.photoLink').colorbox({
		rel:'photo',
		slideshow: false,
		maxWidth: "95%",
		maxHeight: "95%",
		opacity: 0.7
	});
});
$j(window).load(function() {
	$j('.movieLink').colorbox({
		inline: true,
		scrolling: false,
		maxWidth: "95%",
		maxHeight: "95%",
		opacity: 0.7
	});
});

//スムーススクロール
$j(function() {
	$j('a[href=#sp_header]').click(function() {
		var speed = 500; // ミリ秒
		var href= $(this).attr('href');
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
});
