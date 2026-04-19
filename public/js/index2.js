$(function(){
//自适应移动端比例
	function rem(size){
	    var clientW=document.documentElement.clientWidth;
	    var bili=clientW/size;
	    var fontSize=bili*100;
	    document.getElementsByTagName("html")[0].style.fontSize=fontSize+"px"
	}
	rem(750);

	$(".fanhui").click(function(){
		window.location.href="../../index.html";
	})
	/*********************************/	

	$(".keng").click(function(){
		var index = $(".keng").index(this);
		$(".zhouyun").eq(index).toggleClass("height")
	})

//果园钱包兑换开关
	function changeOpen () {
		var flag = true;
		$(".oc").click(function () {
			// console.log($(".oc").html())
			if(flag) {
				$(".oc").css("left","0.52rem").html("打开");
				$(".open").html("打开");
				flag = false;
			}else{
				$(".oc").css("left","0.02rem").html("关闭");
				$(".open").html("关闭");
				flag = true;
			}
		})
	}
	changeOpen ();
//农贸市场弹出	
	// $('.alert_zy').css("display","none");
	// $(".fruitList img").click(function(){
		// var index=$(".fruitList img").index(this);
		//console.log(index)
		// $('.alert_zy').css("display","block");
		// $(".heheda").css("display","none");
	// })

//农贸市场选项卡
	$(".changeLi li").click(function () {
		var index = $(".changeLi li").index(this);
		// console.log(index);
		$(".changeLi li").css("background","#a8d7f4").eq(index).css("background","#289ce5")
		$('.cardItem').css("display","none").eq(index).css("display","block");
	})


	

})

