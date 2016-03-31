//coHeaderNav Pulldown Menu
$(function() {
	$("#coHeaderNav li").hover(function() {
		$(this).children('ul').show();
	}, function() {
		$(this).children('ul').hide();
	});
});

//Tooltip
$(document).ready(function() {
	$('.tooltip-1').tooltipster({
		animation: 'fade',
		contentAsHTML: true,
		maxWidth: 300,
		offsetY: 10,
		position: 'top',
		theme: '.tooltip-tmos',
		touchDevices: false,
		trigger: 'hover'
	});

//Pagetop Btn
	$(".backToTOP").hide();
	 // ↑ページトップボタンを非表示に
 
	$(window).on("scroll", function() {
 
		if ($(this).scrollTop() > 100) {
			// ↑ スクロール位置が100よりも小さい場合に以下の処理
			$('.backToTOP').fadeIn("fast");
			// ↑ (100より小さい時は)ページトップボタンをフェードイン
		} else {
			$('.backToTOP').fadeOut("fast");
			// ↑ それ以外の場合の場合はフェードアウト
		}
		 
	// フッター固定
		scrollHeight = $(document).height(); 
		// ドキュメントの高さ
		scrollPosition = $(window).height() + $(window).scrollTop(); 
		//　ウィンドウの高さ+スクロールした高さ　→　現在のトップからの位置
		footHeight = $("footer").innerHeight();
		// フッターの高さ
				 
		if ( scrollHeight - scrollPosition  <= footHeight ) {
		// 現在の下からの位置が、フッターの高さの位置にはいったら".backToTOP"のpositionをabsoluteに変更し、フッターの高さの位置に		
			$(".backToTOP").css({
				"position":　"absolute",
				"right": "45.5%",
				"bottom": footHeight - 150
			});
		} else {
		// それ以外の場合は元のcssスタイルを指定
			$(".backToTOP").css({
				"position":　"fixed",
				"right": "3%",
				"bottom": "4%"
			});
		}
	});
 
// スムーススクロール
	$(function(){
		$('a[href^=#]').click(function() {
			var speed = 500; // ミリ秒
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset().top;
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});
	}); 
});