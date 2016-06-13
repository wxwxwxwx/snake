$(function(){
	
	var toid = function(x,y){
		return(x+'-'+y)
	}
	var sence=$('.showsence')
	var snake = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var snakebody = {'0-0':true,'0-1':true,'0-2':true};


	var food = {};
	var dir = 40;
	var timerId;
	var hang = 20;
	var num ;

	// var bian1 = $('.block[id===0-0]')
	// console.log(bian1)

	function showsence(){
		var 
		i = 0,
		j,
		wh = Math.floor(600/hang);
		hang = hang||20,
		sence.empty()
		for(;i<28;i++){
			for( j = 0;j < 19;j++ ){
				var qiang = Math.random() > 0.96
				var qiangs = Math.random() > 0.96
				$('<div>')
				.addClass(function(){
						return 'black '+(qiang?'qiang ':'')+(qiangs?'qiangs':'')
					} )
				.attr('id',toid(i,j))
				.appendTo(sence)
				.width(wh-1)
				.height(wh-1)
			}
		}	
		sence.width(wh*28).height(wh*19)	
	}
	showsence(20)

	///////////////show snake
	function showsnake(){
		snake.forEach(function(v){
			$('#'+v.x+'-'+v.y).addClass('snake')
		})
	}

	///////////////showfood
	function showfood(hang){
		hang = hang||20;
		do{
			var x = Math.floor( Math.random()*hang )
			var y = Math.floor( Math.random()*hang )
		}while(snakebody['x+'-'+y'])
		$('#'+x+'-'+y).addClass('food')
		food={x:x,y:y}
	}
	showsnake()
	// showfood(20)


		

	function move(){
		var jiutou = snake[snake.length-1],
		weiba,
		xintou;
		if(dir===40){
			xintou = {x:jiutou.x+1,y:jiutou.y}
		}else if(dir===39){
			xintou = {x:jiutou.x,y:jiutou.y+1}
		}else if(dir===38){
			xintou = {x:jiutou.x-1,y:jiutou.y}
		}else if(dir===37){
			xintou = {x:jiutou.x,y:jiutou.y-1}
		}
		if(xintou.x>19||xintou.y>19||xintou.x<0||xintou.y<0){
			alert('you are die')
 				clearInterval(timerId)
 				return;
 			}else{
 				snake.push(xintou)
 				weiba = snake.shift()
 				$('div').removeClass('snake')
 				showsnake()
 				if(xintou.x===food.x&&xintou.y===food.y){
 				eatfood()
 			}
 			}		
	}

	// function eatfood(){
	// 	$('.food').addClass('snake').removeClass('food')
 // 				snake.push(food)
 // 				showsnake()
 // 				showfood()
	// }

	$(document).on('keydown',function(e){
		if(e.keyCode>40||e.keyCode<37||Math.abs(e.keyCode-dir)===2){
 				return
 		}else if(e.keyCode===40||e.keyCode===39||e.keyCode===38||e.keyCode===37){
 			var num = e.keyCode;
 			dir = num;
 		}
	})



	var loadingGame = function(){
		$(this).closest('div').addClass('check')
		$('.scroll').animate({width:$(window).outerWidth()*0.9},2000).delay(1000).queue(function(){
			$('.loadgame').hide().css('display','none');
			$('.game').css('display','block').dequeue()					
		})
	}

	var startGame = function(){
		$('.game').animate({opacity:0},300).animate({'display':'none'},200).delay(300)
		.queue(function(){
			
			$('.show').css({'display':'block'},20)
			$('.delay').css({'display':'block'},20)
				if($('.delay').css('display')==="block"){
					startDelay()
				}
				$(this).dequeue()
			})	
		

	}
	// var timerId;
	// var startDelay = function(){
	// 	var i = 3;
	// 	var timer = setInterval(function(){
	// 		i = i-1
	// 		if(i===0){
	// 			$('.delay').text('GO').delay(500).queue(function(){
	// 				if($('.delay').text()==='GO'){
	// 					console.log(1)
	// 					clearInterval(timer)
	// 					 timerId = setInterval(function(){
 // 							move()
 // 						},200)
	// 				}					
	// 				$(this).css({opacity:0},1000).dequeue()
	// 			})
				
	// 		}else{
	// 		$('.delay').text(i)
	// 		}
	// 	},1000)
		
	// }

	var nextone = function(){
		$('.green').css('display','none')
		$('.green1').css('display','block')
		if($('.green1').css('display')==='block'){
				$('.green1 .shangmian').animate({opacity:0},2000).queue(function(){
					$('.green1 .xiamian').animate({opacity:0},1000).queue(function(){
						$('.next2').animate({opacity:0},100).dequeue()
					})
					$(this).dequeue();
				})				
			}

	}
	var nexttwo = function(){
		$('.green1').css('display','none')
		$('.green2').css('display','block')
	}

	

	var selectGamemodel = function(){
		var a = $(this)
			// var a = $('.button:select')
			console.log(a)
		
	}

	var greenone = function(){
		$('.green').css('display','block')
		if($('.green').css('display')==='block'){
				$('.green .shangmian').animate({opacity:0},2000).queue(function(){
					$('.green .xiamian').animate({opacity:0},1000).queue(function(){
						$('.next1').animate({opacity:0},100).dequeue()
					})
					$(this).dequeue();
				})				
			}
	}

	$('.startgame').on('click',loadingGame)
	$('.go').on('click',startGame)
	$('.button').on('click','span',selectGamemodel)
	$('.next1').on('click',nextone)
	$('.next2').on('click',nexttwo)
	$('.huanbao').on('click',greenone)

})