$(function(){
//自适应移动端比例
function rem(size){
    var clientW=document.documentElement.clientWidth;
    var bili=clientW/size;
    var fontSize=bili*100;
    document.getElementsByTagName("html")[0].style.fontSize=fontSize+"px"
}
rem(750);
/********************************/
$("body").append("<img src='"+PUBLIC+"/gold/img/forget_password/bz.png' class='logo animated bounceInDown'/>")
$("body").append("<div class='loginBox'><div>")
$("body").append("<div class='shade'><div>")
$(".shade").append("<div class='alertBox animated'><div>")
$(".alertBox").append("<div class='alertsubmit'><div>")
$(".alertBox").append("<p></p>")
$(".alertBox").append("<img src='"+PUBLIC+"/gold/img/forget_password/xm.png' alt='' class='animated infinite'/>")
$(".loginBox").append("<form action=''></form>")
$(".loginBox").append("<a href='javascript:;' id='yanCode'>发送验证码</a>")
$(".loginBox").append("<a href='javascript:;'></a>")
$(".loginBox form").append("<input type='tel' placeholder='请输入手机号'/>")
$(".loginBox form").append("<input type='number' placeholder='验证码'/>")
$(".loginBox form").append("<input type='password' placeholder='请输入新密码'/>")
$(".loginBox form").append("<div class='submit'></div>")
$(".loginBox form").append("<div class='fanhui'></div>")
function login(){
	this.btn=$(".submit")[0];
	this.btn1=$(".fanhui")[0];
	this.shade=$(".shade")[0]
	this.btnClose=$(".alertsubmit")[0]
	this.yanzhengma=$(".loginBox a:nth-of-type(1)")[0]
}
login.prototype={
	btns:function(){
		var that=this;
		that.btn.addEventListener("touchstart",function(e){
            e.preventDefault();
            that.btn.style.background="url("+PUBLIC+"/gold/img/forget_password/qr2.png)";
            that.btn.style.backgroundSize="cover";
       	},false);
       	that.btn.addEventListener("touchend",function(e){
            e.preventDefault();
            that.btn.style.background="url("+PUBLIC+"/gold/img/forget_password/qr.png)";
            that.btn.style.backgroundSize="cover";
            that.shade.style.display="block"
            $(".alertBox").addClass("bounceInLeft")
            $(".alertBox img").addClass("rubberBand")
            setTimeout(function(){
        		$(".alertBox").removeClass("bounceInLeft");
    		}, 1000);
            var tel=$.trim($(".loginBox input:nth-of-type(1)").val());
            var smsCode=$.trim($(".loginBox input:nth-of-type(2)").val());
            var newPass=$.trim($(".loginBox input:nth-of-type(3)").val());
			if(tel == ""){
            	$(".alertBox p").html("请输入手机号！");
				return false;
            }
			if(smsCode == ""){
            	$(".alertBox p").html("请输入验证码！");
				return false;
            }	
			if(newPass == ""){
            	$(".alertBox p").html("请输入新密码！");
				return false;
            }			
			if(!(/^1[3|4|5|7|8]\d{9}$/.test(tel)))
			{
				$(".alertBox p").html("请输入正确手机号码");
				return false;
			}  
            $.ajax({
                type: "POST",
                url:APP+"/Members/memberForgetPwd.html",
                data:{tel:tel,smsCode:smsCode,newPass:newPass},
                dataType:"json",
                beforeSend:function(){
                    // $(".alertBox p").html()
                },
                success: function(data){
				
					if(data.status == 1){
						
						$(".alertBox p").html("修改成功！")
						setTimeout(function(){
							window.location.href=APP+"/Index/index.html"
						},1000);						
						
					}else{
						$(".alertBox p").html(data.info)
						return false;
					}

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                   $(".alertBox p").html("网络错误");
				   return false;
                },

            })			
			// $(".alertBox p").html("修改成功！")
			// setTimeout(function(){
				// window.location.href=APP+"/Index/index.html"
			// },1000);
            
            //else if继续验证
       	},false);
	},
	btns1:function(){
		var that=this;
		that.btn1.addEventListener("touchstart",function(e){
            e.preventDefault();
            that.btn1.style.background="url("+PUBLIC+"/gold/img/forget_password/9.png)";
            that.btn1.style.backgroundSize="cover";
       	},false);
       	that.btn1.addEventListener("touchend",function(e){
            e.preventDefault();
            that.btn1.style.background="url("+PUBLIC+"/gold/img/forget_password/8.png)";
            that.btn1.style.backgroundSize="cover";
            window.history.go(-1);
       	},false);
	},
	init:function(){
		var that=this;
		that.btns();
		that.btns1();
		that.close();
		that.clock();
	},
	close:function(){
		var that=this;
		that.btnClose.addEventListener("touchstart",function(e){
            e.preventDefault();
            that.btnClose.style.background="url("+PUBLIC+"/gold/img/forget_password/qd2.png)";
            that.btnClose.style.backgroundSize="cover";
       	},false);
       	that.btnClose.addEventListener("touchend",function(e){
            e.preventDefault();
            that.btnClose.style.background="url("+PUBLIC+"/gold/img/forget_password/qd.png)";
            that.btnClose.style.backgroundSize="cover";
            $(".alertBox").addClass("bounceOutRight");
            setTimeout(function(){
        		$(".alertBox").removeClass("bounceOutRight");
        		that.shade.style.display="none";
    		}, 500);
       	},false);
	},
	clock:function(){
		var that=this;
		that.yanzhengma.addEventListener("touchstart",function(e){
            e.preventDefault();
       	},false);
       	that.yanzhengma.addEventListener("touchend",function(e){
            e.preventDefault();
            // alert("发送验证码")
			 var tel=$.trim($(".loginBox input:nth-of-type(1)").val());	
		if($("#run").val() == 0)
		{
			return false;
		}
		if(!(/^1[3|4|5|7|8]\d{9}$/.test(tel)))
		{
			alert("请输入正确手机号码!");
			return false;
		}else{	
			time_run();		
			$.ajax({
				url:APP+"/Members/smsSend",
				type:'post',
				dateType:'json',
				data:{'mobile':tel,'type':2},
				success:function(data){	
					var data = eval("("+data+")");					
					if(data.code == 1){
						alert("短信发送成功！");
						return false;
					}else{
						alert(data.msg);
						return false;
					}
				},
				error:function(){
					alert('网络错误');
				}
				
			})
		
		}			
			
       	},false);
	}
}
var loginHtml=new login();
loginHtml.init();
/*
 * 
 */
})

function time_run()
{
var numClock=60
	 var t=setInterval(function(){
			numClock--;
			if(numClock<=0){
				clearInterval(t)
				$("#yanCode").text("获取");
				$("#yanCode").removeAttr('disabled');
				$("#run").val('1');
				return false
			}
		$("#yanCode").text(numClock+" s");
		$("#yanCode").attr("disabled",'true');
		$("#run").val('0');
		},1000)
		
	
}