$(document).ready(function(){
	
	var colorstyle = $('#colorStyle');

	//白画像設定
	var wImg = [ "" ];
	var wImg_length = wImg.length;

	//黒画像設定
	var bImg = [ "" ];
	var bImg_length = bImg.length;

	//白画像→黒画像
	function imgBk() {
		for(var i = 0; i < wImg_length; ++i){
			var simg = wImg[i];
			$('img').each(function(){
				var imgsrc = $(this).attr('src');
				if (imgsrc == simg){
					$(this).attr('src', bImg[i]);
				}
			});
		}
	}

	//黒画像→白画像
	function imgWh(){
		for(var i = 0; i < bImg_length; ++i){
			var simg = bImg[i];
			$('img').each(function(){
				var imgsrc = $(this).attr('src');
				if (imgsrc == simg){
					$(this).attr('src', wImg[i]);
				}
			});
		}
	}

	//読み込み時チェック
	$(window).on('load resize', function(){
		//styleのcookieが設定されている場合、それに対応したcssへ変更
		switch($.cookie('style')){
			case '1':
				colorstyle.attr('href', '/css/col1.css');
				break;
			case '2':
				colorstyle.attr('href', '/css/col2.css');
				break;
			case '3':
				colorstyle.attr('href', '/css/col3.css');
				break;
			case '4':
				colorstyle.attr('href', '/css/col4.css');
				break;
			case '5':
				colorstyle.attr('href', '/css/col5.css');
				break;
			case '6':
				colorstyle.attr('href', '/css/col6.css');
				break;
			case '7':
				colorstyle.attr('href', '/css/col7.css');
				break;
		}
		//読み込まれているcssに合わせてカラーセレクタ部のactiveを切り替え
		switch(colorstyle.attr('href')){
			case '/css/col1.css':
				$('.colorSelectList .blue').addClass('active');
				imgWh();
				break;
			case '/css/col2.css':
				$('.colorSelectList .red').addClass('active');
				imgWh();
				break;
			case '/css/col3.css':
				$('.colorSelectList .green').addClass('active');
				imgWh();
				break;
			case '/css/col4.css':
				$('.colorSelectList .gray').addClass('active');
				imgBk();
				break;
			case '/css/col5.css':
				$('.colorSelectList .lightblue').addClass('active');
				imgBk();
				break;
			case '/css/col6.css':
				$('.colorSelectList .black').addClass('active');
				imgWh();
				break;
			case '/css/col7.css':
				$('.colorSelectList .purple').addClass('active');
				imgWh();
				break;
			default:
				$('.colorSelectList .blue').addClass('active');
				imgWh();
				break;
		}
	});

	//css変更後のスライドメニューオープン時にactiveが消える対策
	$('.myMenuOpen').on('click', function(){
		switch(colorstyle.attr('href')){
			case '/css/col1.css':
				$('.colorSelectList .blue').addClass('active');
				break;
			case '/css/col2.css':
				$('.colorSelectList .red').addClass('active');
				break;
			case '/css/col3.css':
				$('.colorSelectList .green').addClass('active');
				break;
			case '/css/col4.css':
				$('.colorSelectList .gray').addClass('active');
				break;
			case '/css/col5.css':
				$('.colorSelectList .lightblue').addClass('active');
				break;
			case '/css/col6.css':
				$('.colorSelectList .black').addClass('active');
				break;
			case '/css/col7.css':
				$('.colorSelectList .purple').addClass('active');
				break;
			default:
				$('.colorSelectList .blue').addClass('active');
				break;
		}
	});

	$('body').find('.colorSet').on('click', function(){
		//外部スタイルシートの切り替え
		var url = $(this).attr('elm');
		colorstyle.attr({href: url});

		//activeの切り替え
		$('.colorSelectList li').removeClass('active');
		$(this).parent().addClass('active');

		//変更されたcssに対応するcookieを設定＋画像の白黒を設定
		switch(colorstyle.attr('href')){
			case '/css/col1.css':
				imgWh();
				$.cookie('style', '1', {expires: 30});
				break;
			case '/css/col2.css':
				imgWh();
				$.cookie('style', '2', {expires: 30});
				break;
			case '/css/col3.css':
				imgWh();
				$.cookie('style', '3', {expires: 30});
				break;
			case '/css/col4.css':
				imgBk();
				$.cookie('style', '4', {expires: 30});
				break;
			case '/css/col5.css':
				imgBk();
				$.cookie('style', '5', {expires: 30});
				break;
			case '/css/col6.css':
				imgWh();
				$.cookie('style', '6', {expires: 30});
				break;
			case '/css/col7.css':
				imgWh();
				$.cookie('style', '7', {expires: 30});
				break;
		}
	});
});