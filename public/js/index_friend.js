$(function () {
//自适应移动端比例
    function rem(size) {
        var clientW = document.documentElement.clientWidth;
        var bili = clientW / size;
        var fontSize = bili * 100;
        document.getElementsByTagName("html")[0].style.fontSize = fontSize + "px"
    }
    rem(750);
    /*********************************/
//页面上部按钮样式动画及接口
    function btn() {
        this.btnLeft = $("#footerLeftBtn")[0];
        this.flag1 = true;
        this.btnRight = $("#footerRightBtn")[0];
        this.flag2 = true;
        this.footerLeft = $(".footerLeft")[0];
        this.footerRight = $(".footerRight")[0];
        this.left1 = $(".leftBtn1")[0];
        this.left2 = $(".leftBtn2")[0];
        this.left3 = $(".leftBtn3")[0];
        this.left4 = $(".leftBtn4")[0];
        this.right1 = $(".rightBtn1")[0];
        this.right2 = $(".rightBtn2")[0];
        this.right3 = $(".rightBtn3")[0];
        this.right4 = $(".rightBtn4")[0];
        this.leftTop1 = $(".grBtn1")[0];
        this.leftTop2 = $(".grBtn2")[0];
        this.leftTop3 = $(".grBtn3")[0];
        this.leftTop4 = $(".grBtn4")[0];
        this.qiandaoBtn = $(".qiandao")[0];
        this.gohomeBtn = $(".gohome")[0];
        this.pandaBtn = $(".panda")[0];
        this.diaoxiang1 = $(".diaoxiang1")[0];
        this.diaoxiang2 = $(".diaoxiang2")[0];
        this.diaoxiang3 = $(".diaoxiang3")[0];
        this.diaoxiang4 = $(".diaoxiang4")[0];
        this.remove = $(".remove");
        this.chongzhiBtn = $(".chongzhiBox a");
        this.quxiao = $(".quxiao");
        this.queding = $(".queding");
        this.go_chongzhi = $(".go_chongzhi")[0];
        this.filter = $(".submit")[0];
        this.go_friend = $(".find_friend a")[0];
        this.qiehuan = $(".qiehuan")[0];
        this.audioBtn = $(".audio")[0];
        this.audioImg = $(".audioImg")[0];
        this.audio1 = $("#audio1")[0];
        this.leftBtn = $(".leftBtn");
        this.rightBtn = $(".rightBtn");
        this.emptyBtn = $(".empty");
        this.paihangTop = $(".paihangTop li");
        this.find_go = $(".find_go")[0];
        this.gerenImg = $(".gerenBox img")[0];
        this.pandaTop = $(".pandaTop li");
        this.getjineng = $(".pandaBot li:nth-of-type(2) a");
        this.xunlianBtn = $(".xunlian")[0];
        this.weishiBtn = $(".weishi")[0];
        this.pandaJia = $(".pandaJia")[0];
        this.pandaJian = $(".pandaJian")[0];
        this.changeName = $(".changeName")[0];
        this.changeFlag = true;
        this.cangkuList = $(".cangkuTop li");
        this.duihuanList = $(".duihuanTop li");
        this.duihuan = $(".shuiguoduihuan");
        this.shangdianList = $(".shangdianTop li");
        this.shangdian = $(".shuiguogoumai");
        this.shuiguoJia = $(".shuiguoJia");
        this.shuiguoJian = $(".shuiguoJian");
        this.jiansheList = $(".jiansheTop li");
        this.tudishengji = $(".tudishengji");
        this.yinxiao = $("#audio2")[0];
        this.BigHouse = $(".BigHouse")[0];
        this.SmallHouse = $(".SmallHouse")[0];
        this.maxBtn = $(".maxBtn");
        this.myStockForConvert = $('.myStockForConvert');
        this.myStockForBuild = $('.myStockForBuild');
        this.shuiguo1 = $(".duihuanBot li .shuiguo1 input:nth-of-type(6)");
        this.shuiguo2 = $(".jiansheBot li .shuiguo1 input:nth-of-type(6)");
        this.arrMyStockForConvert = [];
        this.arrMyStockForBuild = [];
        this.goWar = $(".sico_chongwu_List li");
        this.dogFood = $(".dogFood");
        this.htmlArr = ["主人我饿了，请给我喂食吧!",
            "主人听说下雨天要打伞哦!",
            "主人听说潜龙科技很厉害哦!",
            "主人听说潜龙科技很强大哦!",
            "主人听说潜龙科技都是帅哥美女哦!"];
		this.sunjianze=$(".dhImgLeft");	
		this.ck=$(".cangluList");	
    }
    ;
    btn.prototype = {
        init: function () {
            var that = this;
            that.leftAnimate();
            that.rightAnimate();
            that.left_btn();
            that.right_btn();
            that.leftTop_btn();
            that.qiandao_btn();
            that.gohome_btn();
            that.panda_btn();
            that.diaoxiang_btn1();
            that.diaoxiang_btn2();
            that.diaoxiang_btn3();
            that.diaoxiang_btn4();
			that.leftimg();
            that.remove_btn();
            that.chongzhi_btn();
            that.quxiao_btn();
            that.queding_btn();
            that.go_chongzhi_btn();
            that.filter_btn();
            that.go_friend_btn();
            that.qiehuan_btn();
            that.audioBtn_btn();
            that.left_go();
            that.right_go();
            that.empty_btn();
            that.paihang_btn();
            that.find_go_btn();
            that.gerenImg_btn();
            that.pandaTop_btn();
            that.getjineng_btn();
            that.xunlianBtn_btn();
            that.weishiBtn_btn();
            that.pandaJia_btn();
            that.pandaJian_btn();
            that.changeName_btn();
            that.cangkuList_btn();
			that.ck_btn();
            that.duihuanList_btn();
            that.duihuan_btn();
            that.shangdianList_btn();
            that.shangdian_btn();
            that.shuiguoJia_btn();
            that.shuiguoJian_btn();
            that.jiansheList_btn();
            that.tudishengji_btn();
            that.BigHouse_btn();
            that.SmallHouse_btn();
            that.html_arr_btn();
            that.goAjax5K();
            //that.getWarehouseData();
            that.max_Btn();
            //that.ajaxReturnMyStockForConvert();
            //that.ajaxReturnMyStockForBuild();
            that.goToWar();
            that.choseDogFood();

        },
        ajaxReturnGold: function () {

            /*$.ajax({
             
             type: "POST",
             url:APP+"/Farm/getMemberGold",
             dataType:"json",
             success: function(data){
             
             datas = eval(data)
             
             $('#memberGold').empty();
             $('#memberGoldTop').empty();
             $('#chongzhiBoxYue').empty();
             
             $('#memberGold').html(datas.memberGold);
             $('#memberGoldTop').html(datas.memberGold);
             $('#chongzhiBoxYue').html(datas.memberGold);
             
             
             
             },
             })*/

        },
        ajaxReturnLand: function () {

            var isOwnMember = $('.isOwnMember').val()
            var memberId = $('.memberID').val()

            $.ajax({
                type: "POST",
                url: APP + "?m=user&a=get_user2",
                data: {isOwnMember: isOwnMember, memberId: memberId},
                dataType: "json",
                success: function (data) {   
                  //根据状态确定显示图片，1为已播种，2				
					var zt1=data.zt1;var zt2=data.zt2;var zt3=data.zt3;var zt4=data.zt4;var zt5=data.zt5;
					var zt6=data.zt6;var zt7=data.zt7;var zt8=data.zt8;var zt9=data.zt9;var zt10=data.zt10;var zt11=data.zt11;var zt12=data.zt12;
					if(zt1=1){var reImg='/gold/img/index/zz.png';}
			//alert(data.sf1);		
  if(data.zt1=='0' || data.zt1=='3'){$(".easte li").eq(0).removeClass();$(".easte li").eq(0).addClass("bozhong");}else{	
  if(data.zt1=='-1'){		 
	 $(".easte li").eq(0).removeClass();$(".easte li").eq(0).addClass("kaiken");				
	}  
  if(data.zt1=='1'){    
	 $('.easte li').eq(0).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(0).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime1>=data.sz1*3600){$('.easte li').eq(0).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs1+'.png');
$(".easte li").eq(0).addClass("shouge_chanchu");
if(data.sf1=='0'){//施肥     1
   $('.easte li').eq(0).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(0).find('.shifeiBtn').css('opacity', '1')}
   }else{
	 //除虫 ，浇水， 除草  1
	if(data.ch1==1){$(".easte li").eq(0).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(0).addClass("xinxi_chanchu");}	   
    if(data.gh1==1){$(".easte li").eq(0).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(0).addClass("xinxi_chanchu");}
    if(data.zc1==1){$(".easte li").eq(0).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(0).addClass("xinxi_chanchu");}     
	
  if(data.lqtime1>=data.zz1*3600 && data.lqtime1<data.fy1*3600){$('.easte li').eq(0).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs1+'.png');}					
  if(data.lqtime1>=data.fy1*3600 && data.lqtime1<data.sz1*3600){$('.easte li').eq(0).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs1+'.png');}					
	}
	}
	if(data.zt1=='2'){
$('.easte li').eq(0).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(0).find('.zuowu').css('opacity', '1');
$(".easte li").eq(0).removeClass();
$(".easte li").eq(0).addClass("qingli");								
	}	
  }
  
  if(data.zt2=='0' || data.zt2=='3'){$(".easte li").eq(1).addClass("bozhong");}else{
if(data.zt2=='-1'){		 
	 $(".easte li").eq(1).removeClass();$(".easte li").eq(1).addClass("kaiken");				
	}  	  
  if(data.zt2=='1'){		 
  $('.easte li').eq(1).find('.zuowu').css('opacity', '1');$('.easte li').eq(1).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zz.png');
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime2>=data.sz2*3600){$('.easte li').eq(1).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs2+'.png');
  $(".easte li").eq(1).addClass("shouge_chanchu");
if(data.sf2=='0'){//施肥   2
  $('.easte li').eq(1).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(1).find('.shifeiBtn').css('opacity', '1')} 
  }else{
  //除虫 ，浇水， 除草  2
	if(data.ch2==1){$(".easte li").eq(1).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(1).addClass("xinxi_chanchu");}	   
    if(data.gh2==1){$(".easte li").eq(1).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(1).addClass("xinxi_chanchu");}
    if(data.zc2==1){$(".easte li").eq(1).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(1).addClass("xinxi_chanchu");}     
  if(data.lqtime2<data.zz2*3600){$('.easte li').eq(1).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zz.png');}					
  if(data.lqtime2>=data.fy2*3600 && data.lqtime2<data.sz2*3600){$('.easte li').eq(1).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs2+'.png');}					
  if(data.lqtime2>=data.sz2*3600 ){$('.easte li').eq(1).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs2+'.png');}					
  }}
  if(data.zt2=='2'){
$('.easte li').eq(1).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(1).find('.zuowu').css('opacity', '1');
$(".easte li").eq(1).addClass("qingli");								
	}	
  }
  
  if(data.zt3=='0' || data.zt3=='3'){$(".easte li").eq(2).addClass("bozhong");}else{
if(data.zt3=='-1'){		 
	 $(".easte li").eq(2).removeClass();$(".easte li").eq(2).addClass("kaiken");				
	}  	  
  if(data.zt3=='1'){		 
	 $('.easte li').eq(2).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(2).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime3>=data.sz3*3600){$('.easte li').eq(2).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs3+'.png');
$(".easte li").eq(2).addClass("shouge_chanchu");
if(data.sf3=='0'){//施肥    3
  $('.easte li').eq(2).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(2).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  3
	if(data.ch3==1){$(".easte li").eq(2).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(2).addClass("xinxi_chanchu");}	   
    if(data.gh3==1){$(".easte li").eq(2).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(2).addClass("xinxi_chanchu");}
    if(data.zc3==1){$(".easte li").eq(2).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(2).addClass("xinxi_chanchu");}     
  if(data.lqtime3>=data.zz3*3600 && data.lqtime3<data.fy3*3600){$('.easte li').eq(2).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs3+'.png');}					
  if(data.lqtime3>=data.fy3*3600 && data.lqtime3<data.sz3*3600){$('.easte li').eq(2).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs3+'.png');}					
	}}
	if(data.zt3=='2'){
$('.easte li').eq(2).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(2).find('.zuowu').css('opacity', '1');
$(".easte li").eq(2).addClass("qingli");								
	}	
  }
  
  if(data.zt4=='0' || data.zt4=='3'){$(".easte li").eq(3).addClass("bozhong");}else{
if(data.zt4=='-1'){		 
	 $(".easte li").eq(3).removeClass();$(".easte li").eq(3).addClass("kaiken");				
	}  	  
  if(data.zt4=='1'){		 
	 $('.easte li').eq(3).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(3).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime4>=data.sz4*3600){$('.easte li').eq(3).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs4+'.png');
$(".easte li").eq(3).addClass("shouge_chanchu");
if(data.sf4=='0'){//施肥    4
  $('.easte li').eq(3).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(3).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  4
	if(data.ch4==1){$(".easte li").eq(3).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(3).addClass("xinxi_chanchu");}	   
    if(data.gh4==1){$(".easte li").eq(3).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(3).addClass("xinxi_chanchu");}
    if(data.zc4==1){$(".easte li").eq(3).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(3).addClass("xinxi_chanchu");}      
  if(data.lqtime4>=data.zz4*3600 && data.lqtime4<data.fy4*3600){$('.easte li').eq(3).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs4+'.png');}					
  if(data.lqtime4>=data.fy4*3600 && data.lqtime4<data.sz4*3600){$('.easte li').eq(3).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs4+'.png');}					
	}}
	if(data.zt4=='2'){
$('.easte li').eq(3).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(3).find('.zuowu').css('opacity', '1');
$(".easte li").eq(3).addClass("qingli");								
	}	
  }
  
  if(data.zt5=='0' || data.zt5=='3'){$(".easte li").eq(4).addClass("bozhong");}else{
if(data.zt5=='-1'){		 
	 $(".easte li").eq(4).removeClass();$(".easte li").eq(4).addClass("kaiken");				
	}  	  
  if(data.zt5=='1'){		 
	 $('.easte li').eq(4).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(4).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime5>=data.sz5*3600){$('.easte li').eq(4).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs5+'.png');
$(".easte li").eq(4).addClass("shouge_chanchu");
if(data.sf5=='0'){//施肥    5
  $('.easte li').eq(4).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(4).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  5
	if(data.ch5==1){$(".easte li").eq(4).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(4).addClass("xinxi_chanchu");}	   
    if(data.gh5==1){$(".easte li").eq(4).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(4).addClass("xinxi_chanchu");}
    if(data.zc5==1){$(".easte li").eq(4).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(4).addClass("xinxi_chanchu");}     
  if(data.lqtime5>=data.zz5*3600 && data.lqtime5<data.fy5*3600){$('.easte li').eq(4).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs5+'.png');}					
  if(data.lqtime5>=data.fy5*3600 && data.lqtime5<data.sz5*3600){$('.easte li').eq(4).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs5+'.png');}					
	}}
	if(data.zt5=='2'){
$('.easte li').eq(4).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(4).find('.zuowu').css('opacity', '1');
$(".easte li").eq(4).addClass("qingli");								
	}	
  }
  
  if(data.zt6=='0' || data.zt6=='3'){$(".easte li").eq(5).addClass("bozhong");}else{
if(data.zt6=='-1'){		 
	 $(".easte li").eq(5).removeClass();$(".easte li").eq(5).addClass("kaiken");				
	}  	  
  if(data.zt6=='1'){		 
	 $('.easte li').eq(5).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(5).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime6>=data.sz6*3600){$('.easte li').eq(5).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs6+'.png');
$(".easte li").eq(5).addClass("shouge_chanchu");
if(data.sf6=='0'){//施肥    6
  $('.easte li').eq(5).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(5).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  6
	if(data.ch6==1){$(".easte li").eq(5).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(5).addClass("xinxi_chanchu");}	   
    if(data.gh6==1){$(".easte li").eq(5).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(5).addClass("xinxi_chanchu");}
    if(data.zc6==1){$(".easte li").eq(5).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(5).addClass("xinxi_chanchu");}     
  if(data.lqtime6>=data.zz6*3600 && data.lqtime6<data.fy6*3600){$('.easte li').eq(5).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs6+'.png');}					
  if(data.lqtime6>=data.fy6*3600 && data.lqtime6<data.sz6*3600){$('.easte li').eq(5).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs6+'.png');}					
	}}
	if(data.zt6=='2'){
$('.easte li').eq(5).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(5).find('.zuowu').css('opacity', '1');
$(".easte li").eq(5).addClass("qingli");								
	}	
  }
  
  if(data.zt7=='0' || data.zt7=='3'){$(".easte li").eq(6).addClass("bozhong");}else{
if(data.zt7=='-1'){		 
	 $(".easte li").eq(6).removeClass();$(".easte li").eq(6).addClass("kaiken");				
	}  	  
  if(data.zt7=='1'){		 
	 $('.easte li').eq(6).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(6).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime7>=data.sz7*3600){$('.easte li').eq(6).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs7+'.png');
$(".easte li").eq(6).addClass("shouge_chanchu");
if(data.sf7=='0'){//施肥    7
  $('.easte li').eq(6).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(6).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  7
	if(data.ch7==1){$(".easte li").eq(6).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(6).addClass("xinxi_chanchu");}	   
    if(data.gh7==1){$(".easte li").eq(6).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(6).addClass("xinxi_chanchu");}
    if(data.zc7==1){$(".easte li").eq(6).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(6).addClass("xinxi_chanchu");}     
  if(data.lqtime7>=data.zz7*3600 && data.lqtime7<data.fy7*3600){$('.easte li').eq(6).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs7+'.png');}					
  if(data.lqtime7>=data.fy7*3600 && data.lqtime7<data.sz7*3600){$('.easte li').eq(6).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs7+'.png');}					
	}}
	if(data.zt7=='2'){
$('.easte li').eq(6).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(6).find('.zuowu').css('opacity', '1');
$(".easte li").eq(6).addClass("qingli");								
	}	
  }
  
  if(data.zt8=='0' || data.zt8=='3'){$(".easte li").eq(7).addClass("bozhong");}else{
if(data.zt8=='-1'){		 
	 $(".easte li").eq(7).removeClass();$(".easte li").eq(7).addClass("kaiken");				
	}  	  
  if(data.zt8=='1'){		 
	 $('.easte li').eq(7).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(7).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime8>=data.sz8*3600){$('.easte li').eq(7).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs8+'.png');
$(".easte li").eq(7).addClass("shouge_chanchu");
if(data.sf8=='0'){//施肥    8
  $('.easte li').eq(7).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(7).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  8
	if(data.ch8==1){$(".easte li").eq(7).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(7).addClass("xinxi_chanchu");}	   
    if(data.gh8==1){$(".easte li").eq(7).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(7).addClass("xinxi_chanchu");}
    if(data.zc8==1){$(".easte li").eq(7).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(7).addClass("xinxi_chanchu");}     
  if(data.lqtime8>=data.zz8*3600 && data.lqtime8<data.fy8*3600){$('.easte li').eq(7).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs8+'.png');}					
  if(data.lqtime8>=data.fy8*3600 && data.lqtime8<data.sz8*3600){$('.easte li').eq(7).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs8+'.png');}					
	}}
	if(data.zt8=='2'){
$('.easte li').eq(7).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(7).find('.zuowu').css('opacity', '1');
$(".easte li").eq(7).addClass("qingli");								
	}	
  }
  
  if(data.zt9=='0' || data.zt9=='3'){$(".easte li").eq(8).addClass("bozhong");}else{
if(data.zt9=='-1'){		 
	 $(".easte li").eq(8).removeClass();$(".easte li").eq(8).addClass("kaiken");				
	}  	  
  if(data.zt9=='1'){		 
	 $('.easte li').eq(8).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(8).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime9>=data.sz9*3600){$('.easte li').eq(8).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs9+'.png');
$(".easte li").eq(8).addClass("shouge_chanchu");
if(data.sf9=='0'){//施肥   9
  $('.easte li').eq(8).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(8).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  9
	if(data.ch9==1){$(".easte li").eq(8).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(8).addClass("xinxi_chanchu");}	   
    if(data.gh9==1){$(".easte li").eq(8).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(8).addClass("xinxi_chanchu");}
    if(data.zc9==1){$(".easte li").eq(8).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(8).addClass("xinxi_chanchu");}     
  if(data.lqtime9>=data.zz9*3600 && data.lqtime9<data.fy9*3600){$('.easte li').eq(8).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs9+'.png');}					
  if(data.lqtime9>=data.fy9*3600 && data.lqtime9<data.sz9*3600){$('.easte li').eq(8).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs9+'.png');}					
	}}
	if(data.zt9=='2'){
$('.easte li').eq(8).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(8).find('.zuowu').css('opacity', '1');
$(".easte li").eq(8).addClass("qingli");								
	}	
  }
  
  if(data.zt10=='0' || data.zt10=='3'){$(".easte li").eq(9).addClass("bozhong");}else{
if(data.zt10=='-1'){		 
	 $(".easte li").eq(9).removeClass();$(".easte li").eq(9).addClass("kaiken");				
	}  	  
  if(data.zt10=='1'){		 
	 $('.easte li').eq(9).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(9).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime10>=data.sz10*3600){$('.easte li').eq(9).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs10+'.png');
$(".easte li").eq(9).addClass("shouge_chanchu");
if(data.sf10=='0'){//施肥   10
  $('.easte li').eq(9).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(9).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  10
	if(data.ch10==1){$(".easte li").eq(9).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(9).addClass("xinxi_chanchu");}	   
    if(data.gh10==1){$(".easte li").eq(9).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(9).addClass("xinxi_chanchu");}
    if(data.zc10==1){$(".easte li").eq(9).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(9).addClass("xinxi_chanchu");}     
  if(data.lqtime10>=data.zz10*3600 && data.lqtime10<data.fy10*3600){$('.easte li').eq(9).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs10+'.png');}					
  if(data.lqtime10>=data.fy10*3600 && data.lqtime10<data.sz10*3600){$('.easte li').eq(9).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs10+'.png');}					
	}}
	if(data.zt10=='2'){
$('.easte li').eq(9).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(9).find('.zuowu').css('opacity', '1');
$(".easte li").eq(9).addClass("qingli");								
	}	
  }
  
  if(data.zt11=='0' || data.zt11=='3'){$(".easte li").eq(10).addClass("bozhong");}else{	
  if(data.zt11=='-1'){		 
	 $(".easte li").eq(10).removeClass();$(".easte li").eq(10).addClass("kaiken");				
	}    
  if(data.zt11=='1'){		 
	 $('.easte li').eq(10).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(10).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime11>=data.sz11*3600){$('.easte li').eq(10).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs11+'.png');
$(".easte li").eq(10).addClass("shouge_chanchu");
if(data.sf11=='0'){//施肥   11
  $('.easte li').eq(10).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(10).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  11
	if(data.ch11==1){$(".easte li").eq(10).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(10).addClass("xinxi_chanchu");}	   
    if(data.gh11==1){$(".easte li").eq(10).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(10).addClass("xinxi_chanchu");}
    if(data.zc11==1){$(".easte li").eq(10).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(10).addClass("xinxi_chanchu");}     
  if(data.lqtime11>=data.zz11*3600 && data.lqtime11<data.fy11*3600){$('.easte li').eq(10).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs11+'.png');}					
  if(data.lqtime11>=data.fy11*3600 && data.lqtime11<data.sz11*3600){$('.easte li').eq(10).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs11+'.png');}					
	}}
	if(data.zt11=='2'){
	
$('.easte li').eq(10).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(10).find('.zuowu').css('opacity', '1');
$(".easte li").eq(10).addClass("qingli");								
	}
  }
  
  if(data.zt12=='0' || data.zt12=='3'){$(".easte li").eq(11).addClass("bozhong");}else{
  if(data.zt12=='-1'){		 
	 $(".easte li").eq(11).removeClass();$(".easte li").eq(11).addClass("kaiken");				
	}  	  
  if(data.zt12=='1'){		 
	 $('.easte li').eq(11).find('.zuowu').css('opacity', '1');
	 $('.easte li').eq(11).find('.zuowu').attr('src', PUBLIC +'/gold/img/index/zz.png' );
//根据播种时间变换状态,树苗,种子果实等.
  if(data.lqtime12>=data.sz12*3600){$('.easte li').eq(11).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/cs_'+data.land_gs12+'.png');
$(".easte li").eq(11).addClass("shouge_chanchu");
if(data.sf12=='0'){//施肥   12
  $('.easte li').eq(11).find('.shifeiBtn').css('z-index', '999');
$('.easte li').eq(11).find('.shifeiBtn').css('opacity', '1')} 
  }else{
	//除虫 ，浇水， 除草  12
	if(data.ch12==1){$(".easte li").eq(11).addClass("xinxi_chanchu_chuchong");}
    else{$(".easte li").eq(11).addClass("xinxi_chanchu");}	   
    if(data.gh12==1){$(".easte li").eq(11).addClass("xinxi_chanchu_jiaoshui");}
	else{$(".easte li").eq(11).addClass("xinxi_chanchu");}
    if(data.zc12==1){$(".easte li").eq(11).addClass("xinxi_chanchu_chucao");}	
	else{$(".easte li").eq(11).addClass("xinxi_chanchu");}      
  if(data.lqtime12>=data.zz12*3600 && data.lqtime12<data.fy12*3600){$('.easte li').eq(11).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/fy_'+data.land_gs12+'.png');}					
  if(data.lqtime12>=data.fy12*3600 && data.lqtime12<data.sz12*3600){$('.easte li').eq(11).find('.zuowu').attr('src', PUBLIC + '/gold/img/gs/sz_'+data.land_gs12+'.png');}					
	}}
	if(data.zt12=='2'){
$('.easte li').eq(11).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$('.easte li').eq(11).find('.zuowu').css('opacity', '1');
$(".easte li").eq(11).addClass("qingli");								
	}	
  }
		
                    
                    
$('#hetao').html(data.hetao);
$('#hongzao').html(data.hongzao);
$('#putao').html(data.putao);
$('#hamigua').html(data.hamigua);
$('#shamoguo').html(data.shamoguo);
$('#renshenguo').html(data.renshenguo);
$('#xunyichao').html(data.xunyichao);
$('#shamorenshen').html(data.shamorenshen);
$('#badanmu').html(data.badanmu);
$('#hetianyu').html(data.hetianyu);
$('#shiliu').html(data.shiliu);
$('#xiangli').html(data.xiangli);
$('#muban').html(data.muban);
$('#shitou').html(data.shitou);
$('#gangchai').html(data.gangchai);
$('#lvbaoshi').html(data.lvbaoshi);
$('#zhibaoshi').html(data.zhibaoshi);
$('#lanbaoshi').html(data.lanbaoshi);
$('#huangbaoshi').html(data.huangbaoshi);
$('#zhongzi').html(data.zhongzi);
$('#shashuihu').html(data.shashuihu);
$('#tongbaox').html(data.tongbaox);
$('#yinbaox').html(data.yinbaox);
$('#jinbaox').html(data.jinbaox);
$('#chutou').html(data.chutou);
$('#chuchaoji').html(data.chuchaoji);
$('.muban').html(data.muban);
$('.shitou').html(data.shitou);
$('.zs').html(data.zs);
$('.shiliu').html(data.shiliu);
$('.hetao').html(data.hetao);
$('.hongzao').html(data.hongzao);
$('.putao').html(data.putao);
$('.hamigua').html(data.hamigua);
$('.xiangli').html(data.xiangli);

                    $('#memberGoldTop').html(data.gold);
                    $('#memberDiamondTop').html(data.zs);
					$('#lvl').html(data.lvl);
		//$('.BigHouse').css('background', 'url(' + PUBLIC + '/house_list/'+ data.fangwu + '.png)').css('background-size', 'cover');

if(data.fengshousx==1){$('.diaoxiang1').css('background', 'url(' + PUBLIC + '/gold/img/index/yk_diaoxiang1.png)').css('background-size', 'cover');$('#sx1').html('已激活');}
if(data.yulusx==1){$('.diaoxiang2').css('background', 'url(' + PUBLIC + '/gold/img/index/yk_diaoxiang2.png)').css('background-size', 'cover');$('#sx2').html('已激活');}
if(data.shichaosx==1){$('.diaoxiang3').css('background', 'url(' + PUBLIC + '/gold/img/index/yk_diaoxiang3.png)').css('background-size', 'cover');$('#sx3').html('已激活');}
if(data.tuchongsx==1){$('.diaoxiang4').css('background', 'url(' + PUBLIC + '/gold/img/index/yk_diaoxiang4.png)').css('background-size', 'cover');$('#sx4').html('已激活');}
                    //$('.diaoxiang3').css('background', 'url(' + PUBLIC + '/gold/img/index/' + weedGodStatus + 'diaoxiang3.png)').css('background-size', 'cover');
                    //$('.diaoxiang4').css('background', 'url(' + PUBLIC + '/gold/img/index/' + pestGodStatus + 'diaoxiang4.png)').css('background-size', 'cover');

                },
            })

        },
        // ajaxReturnGod: function () {

        //     $.ajax({
        //         type: "POST",
        //         url: APP + "/Farm/getMemberGodInfo",
        //         dataType: "json",
        //         success: function (data) {

        //             datas = eval(data)

        //             var pestGodStatus = '';
        //             var droughtGodStatus = '';
        //             var weedGodStatus = '';
        //             var bumperGodStatus = '';

        //             if (datas.pestGodStatus != '0') {
        //                 pestGodStatus = 'yk_';
        //             }

        //             if (datas.droughtGodStatus != '0') {
        //                 droughtGodStatus = 'yk_';
        //             }

        //             if (datas.weedGodStatus != '0') {
        //                 weedGodStatus = 'yk_';
        //             }

        //             if (datas.bumperGodStatus != '0') {
        //                 bumperGodStatus = 'yk_';
        //             }


        //             $('.diaoxiang1').css('background', 'url(' + PUBLIC + '/gold/img/index/' + bumperGodStatus + 'diaoxiang1.png)').css('background-size', 'cover');
        //             $('.diaoxiang2').css('background', 'url(' + PUBLIC + '/gold/img/index/' + droughtGodStatus + 'diaoxiang2.png)').css('background-size', 'cover');
        //             $('.diaoxiang3').css('background', 'url(' + PUBLIC + '/gold/img/index/' + weedGodStatus + 'diaoxiang3.png)').css('background-size', 'cover');
        //             $('.diaoxiang4').css('background', 'url(' + PUBLIC + '/gold/img/index/' + pestGodStatus + 'diaoxiang4.png)').css('background-size', 'cover');



        //         },
        //     })

        // },
        ajaxReturnDiamond: function () {

            /*$.ajax({
             
             type: "POST",
             url:APP+"/Farm/getMemberDiamond",
             dataType:"json",
             success: function(data){
             
             datas = eval(data)
             
             $('#memberDiamondTop').empty();
             
             $('#memberDiamondTop').html(datas.memberDiamond);
             
             
             
             },
             })*/

        },
        ajaxReturnMyStockForConvert: function () {

            var that = this;

            that.arrMyStockForConvert.splice(0, that.arrMyStockForConvert.length);

            for (var i = 0; i < that.shuiguo1.length; i++) {
                that.shuiguo1[i].index = i;
                that.arrMyStockForConvert.push(that.shuiguo1[i].value)
            }

            $.ajax({
                type: "POST",
                url: APP + "/Farm/getWarehouseForMyStockData",
                data: {jsonT: that.arrMyStockForConvert.join(';')},
                dataType: "json",
                success: function (data) {

                    datas = eval(data)

                    if (datas != null) {

                        for (var i = 0; i < that.shuiguo1.length; i++) {
                            that.shuiguo1[i].index = i;
                            that.myStockForConvert[i].innerHTML = datas[i].newCount;
                        }
                    }


                },
            })

        },
        ajaxReturnMyStockForBuild: function () {

            var that = this;

            that.arrMyStockForBuild.splice(0, that.arrMyStockForBuild.length);

            for (var i = 0; i < that.shuiguo2.length; i++) {
                that.shuiguo2[i].index = i;
                that.arrMyStockForBuild.push(that.shuiguo2[i].value)
            }

            $.ajax({
                type: "POST",
                url: APP + "/index.php?m=user&a=getWarehouseForMyStockDatas",
                data: {jsonT: that.arrMyStockForBuild.join(';')},
                dataType: "json",
				
                success: function (data) {

                    datas = eval(data)

                    if (datas != null) {

                        for (var i = 0; i < that.shuiguo2.length; i++) {
                            that.shuiguo2[i].index = i;
                            that.myStockForBuild[i].innerHTML = datas[i].newCount;
                        }
                    }


                },
            })

        },
        ajaxReturnPetInfo: function () {

            var petId = $('.petsId').val()

            if (petId != '') {

                $.ajax({
                    type: "post",
                    url: APP + "?m=user&a=getMemberNowPetInfo",
                    data: {memberId: petId, type: 2},
                    async: true,
                    dataType: 'json',
                    success: function (data) {

                        datas = eval(data)
                        $('.nowPetImg').attr('src', PUBLIC + datas.pet_img)
                        $('.nowPetNickname').val(datas.pet_nickname)
                        $('.nowPetLevel').html(datas.pet_level)
                        $('.nowPetAttack').html(datas.pet_attack)
                        $('.nowPetDefense').html(datas.pet_defense)
                        $('.nowPetSpeed').html(datas.pet_speed)
                        $('.nowPetLuck').html(datas.pet_luck)
                        $('.nowPetLife').html(datas.pet_life)
                        $('.pandaJindu1').find('div').css('width', datas.pet_experience / datas.pet_netx_exp * 100 + '%')
                        $('.pandaJindu2').find('div').css('width', datas.pet_tili / 100 * 100 + '%')
                        $('.progressBar3').find('div').css('width', datas.pet_rose_heart / 1000 * 100 + '%')

                        $('.petsId').val(datas.id)


                    }
                });

            }


        },
        ajaxHarvestTime: function () {

            var petId = $('.petsId').val()

            if (petId != '') {

                $.ajax({
                    type: "post",
                    url: APP + "?m=user&a=getMemberNowPetInfo",
                    data: {memberId: petId, type: 2},
                    async: true,
                    dataType: 'json',
                    success: function (data) {

                        datas = eval(data)
                        if (datas.pet_auto_harvest == 1) {
                            //定时1小时
                            var time1 = datas.jindutime1;
                            var time2 = 3600;
							var sy1=time2-time1;
                            setInterval(function () {
                                time++;
								sy1--;
                                $('.progressBar1').find('div').css('width', (time2-time1) / time2 * 100 + '%')
								$('#lsj_harvest').html('剩余'+sy1+'秒结束');
                            }, 1000);
                        }

                        $('.petsId').val(datas.id)

                    }
                });

            }

        },
        ajaxSeedTime: function () {

            var petId = $('.petsId').val()

            if (petId != '') {

                $.ajax({
                    type: "post",
                    url: APP + "?m=user&a=getMemberNowPetInfo",
                    data: {memberId: petId, type: 2},
                    async: true,
                    dataType: 'json',
                    success: function (data) {

                        datas = eval(data)
                        if (datas.autobozong == 1) {
                            //定时1小时
                            var time3 = datas.jindutime2;
                            var time4 = 3600 ;
							var sy2=time4-time3;
                            setInterval(function () {
                                time--;
								sy2--;
                                $('.progressBar2').find('div').css('width', (time4-time3) / time4 * 100 + '%')
								$('#lsj_seed').html('剩余'+sy2+'秒结束');
                            }, 1000);
                        }

                        $('.petsId').val(datas.id)
                    }
                });

            }

        },
        goAjax5K: function () {
            var that = this;
            setInterval(function () {
                //that.ajaxReturnGold();
                that.ajaxReturnLand();
                //that.ajaxReturnDiamond();
                //that.ajaxReturnGod();
            }, 5000)

        },
        /*getWarehouseData:function(serchType,viewType){
         
         $.ajax({
         type: "POST",
         url:APP+"/Farm/getWarehouseData.html",
         data:{serchType:serchType},
         dataType:"json",
         beforeSend:function(){
         $(".cangkuBot li").eq(viewType).empty()
         },
         success: function(data){
         
         datas=eval(data)
         
         
         if(datas != null) {
         
         var count = datas.length;
         
         for (var i = 0; i < count; i++) {
         
         var industry = datas[i];
         
         
         $(".cangkuBot li").eq(viewType).append(
         "<div class='cangluList'>"
         +"<img src='"+PUBLIC+"/UploadFiles_s/"+industry.crops_fruit_img+"' alt='' />"
         +"<span>x "+industry.ware_goods_count+"</span>"
         +"</div>"
         );
         
         }
         
         }
         
         
         },
         })
         
         },*/
        getLevelInfo: function () {

            var that = this;

            $.ajax({
                type: "POST",
                url: APP + "?m=user&a=getHouseUpLevelData",
                dataType: "json",
                success: function (data) {

                    //console.log(JSON.parse(data));

                    datas = eval(data)

                    if (datas != null) {

                        // $('.jiansheBot .houseInfo .gongyongList').find('.sTUpLevelJiafu').css('visibility', 'hidden')
                        // $('.jiansheBot .houseInfo .gongyongList').find('.sT').css('visibility', 'hidden')

                        // $('.jiansheBot .houseInfo .gongyongList').find('.tTUpLevelJiafu').css('visibility', 'hidden')
                        // $('.jiansheBot .houseInfo .gongyongList').find('.tT').css('visibility', 'hidden')
                        if (datas.convertTypeCount == '1') {
                            $('.jiansheBot .houseInfo .gongyongList').find('.sT').css('visibility', 'hidden')
                            $('.jiansheBot .houseInfo .gongyongList').find('.tT').css('visibility', 'hidden')
                            $('.jiansheBot .houseInfo .gongyongList').find('.sTUpLevelJiafu').css('visibility', 'hidden')
                            $('.jiansheBot .houseInfo .gongyongList').find('.tTUpLevelJiafu').css('visibility', 'hidden')

                        } else if (datas.convertTypeCount == '2') {

                            $('.jiansheBot .houseInfo .gongyongList').find('.tTUpLevelJiafu').css('visibility', 'hidden')
                            $('.jiansheBot .houseInfo .gongyongList').find('.tT').css('visibility', 'hidden')

                        } else if (datas.convertTypeCount == '3') {

                            $('.jiansheBot .houseInfo .gongyongList').find('.tTUpLevelJiafu').css('visibility', 'visible')
                            $('.jiansheBot .houseInfo .gongyongList').find('.tT').css('visibility', 'visible')

                        }
                        $('.jiansheBot .houseInfo .diaoxiangBox').find('p:nth-of-type(1)').html(datas.house_name)
						$('.jiansheBot .houseInfo .gongyongList').find('.tudiName p').attr('style', 'text-align: center;width:1.57rem').html(datas.house_name)
                        $('.jiansheBot .houseInfo .gongyongList').find('.convertTypeCount').val(datas.convertTypeCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.convertId').val(datas.id)
                        $('.jiansheBot .houseInfo .gongyongList').find('.dhImgLeft').css('background', 'URL(' + PUBLIC + '/UploadFiles_s/' + datas.house_img + ')')
                        $('.jiansheBot .houseInfo .gongyongList').find('.dhImgLeft').css('background-size', 'cover')
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT img').attr('src', PUBLIC + '/' + datas.firstConvertImg)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .myStockForBuild').html((datas.firstMyCount == '') ? 0 : datas.firstMyCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .shuoguoNum').html(datas.firstConvertCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .fConId').val(datas.firstConvertId)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .fId').val(datas.firstIdentifier)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .fTable').val(datas.firstSearchTable)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .fMyCount').val((datas.firstMyCount == '') ? 0 : datas.firstMyCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .fConCount').val(datas.firstConvertCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.fT .fGo').val(datas.firstConvertId + ',' + datas.firstSearchTable)

                        $('.jiansheBot .houseInfo .gongyongList').find('.sT img').attr('src', PUBLIC + '/' + datas.secondConvertImg)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .myStockForBuild').html((datas.secondMyCount == '') ? 0 : datas.secondMyCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .shuoguoNum').html(datas.secondConvertCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .sConId').val(datas.secondConvertId)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .sId').val(datas.secondIdentifier)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .sTable').val(datas.secondSearchTable)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .sMyCount').val((datas.secondMyCount == '') ? 0 : datas.secondMyCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .sConCount').val(datas.secondConvertCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.sT .sGo').val(datas.secondConvertId + ',' + datas.secondSearchTable)

                        $('.jiansheBot .houseInfo .gongyongList').find('.tT img').attr('src', PUBLIC + '/' + datas.thirdConvertImg)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .myStockForBuild').html((datas.thirdMyCount == '') ? 0 : datas.thirdMyCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .shuoguoNum').html(datas.thirdConvertCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .tConId').val(datas.thirdConvertId)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .tId').val(datas.thirdIdentifier)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .tTable').val(datas.thirdSearchTable)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .tMyCount').val((datas.thirdMyCount == '') ? 0 : datas.thirdMyCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .tConCount').val(datas.thirdConvertCount)
                        $('.jiansheBot .houseInfo .gongyongList').find('.tT .tGo').val(datas.thirdConvertId + ',' + datas.thirdSearchTable)

                    }


                },
                complete: function () {
                    setTimeout(function () {
                        that.ajaxReturnMyStockForBuild();
                    }, 10000)
                }
            })

        },
        /*getCommodityData:function(serchType,viewType){
         
         var that=this;
         
         $.ajax({
         type: "POST",
         url:APP+"/Farm/getCommodityData.html",
         data:{serchType:serchType},
         dataType:"json",
         beforeSend:function(){
         $(".shangdianBot li").eq(viewType).empty()
         },
         success: function(data){
         
         datas=eval(data)
         
         
         if(datas != null) {
         
         var count = datas.length;
         
         for (var i = 0; i < count; i++) {
         
         var industry = datas[i];
         
         
         $(".shangdianBot li").eq(viewType).append(
         "<div class='gongyongList'>"
         +"<div class='dhImgLeft'><img src="+PUBLIC+"'/UploadFiles_s/"+industry.com_img+"' alt='' /></div>"
         +"<div class='shuiguogoumai animated'></div>"
         +"<p>"+industry.com_name+"</p>"
         +"<p>"+industry.com_describe+"</p>"
         +"<p>钻石："+industry.com_price+"</p>"
         +"<p>剩余"+industry.com_sum+"万</p>"
         +"<input hidden='hidden' value='{$vo.id}'>"
         +"</div>"
         );
         
         }
         
         
         
         }
         
         
         },
         })
         
         },*/

        goToWar: function () {
            var that = this;
            for (var i = 0; i < that.goWar.length; i++) {
                that.goWar[i].index = i;
                that.goWar[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();

                    that.yinxiao_btn();
                }, false);
                that.goWar[i].addEventListener("touchend", function (e) {
                    e.preventDefault();

                    var petId = $('.sico_chongwu_List li').eq(this.index).find('.petId').val()
                    var yesStatus = 'false';

                    $.ajax({
                        type: "post",
                        url: APP + "?m=user&a=memberPetGoWar",
                        data: {petId: petId},
                        dataType: 'json',
						beforeSend:function(){
							$("#mengban").show();
						},
                        async: true,
                        success: function (data) {

                            datas = eval(data)

                            if (datas.reTips == 'Success') {

                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");

                                $(".duihuan_chenggong").html(datas.reMsg)

                                //$('.panda').css('display', 'block')
                                //$('.panda').css('background', 'url(' + datas.petGif + ')')
                                //$('.panda').css('background-size', 'cover')

                                $('.petsId').val(datas.petNowId)

                            } else {
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");

                                $(".duihuan_chenggong").html(datas.reMsg)

                                //$('.panda').css('display', 'none')

                                $('.sico_chongwu_List li').find('.yesG').css('display', 'none')
                            }
							$("#mengban").hide();
                            setTimeout(function () {
                                $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".remove").parent().css("display", "none");
                                    $(".shade").css("display", "none")
                                }, 800)
                            }, 1500)





                        },
                    });



                    $('.sico_chongwu_List li').find('.yesG').css('visibility', 'hidden')
                    $('.sico_chongwu_List li').eq(this.index).find('.yesG').css('visibility', 'visible')


                    /*if(yesStatus == 'true'){
                     $('.sico_chongwu_List li').find('.yesG').css('visibility','hidden')
                     $('.sico_chongwu_List li').eq(this.index).find('.yesG').css('visibility','visible')
                     }else{
                     $('.sico_chongwu_List li').find('.yesG').css('visibility','hidden')
                     }*/



                    /*setTimeout(function(){
                     $(".remove").parent().css("display","none");
                     $(".shade").css("display","none")
                     },800)*/
                }, false);
            }
        },
        choseDogFood: function () {
            var that = this;
            for (var i = 0; i < that.dogFood.length; i++) {
                that.dogFood[i].index = i;
                that.dogFood[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();

                    that.yinxiao_btn();
                }, false);
                that.dogFood[i].addEventListener("touchend", function (e) {
                    e.preventDefault();

                    if (this.index == '0') {
                        $('.yesGl0').css('visibility', 'visible')
                        //$('.yesGl0').addClass('isCheck')
                        $('.yesGl1').css('visibility', 'hidden')
                        //$('.yesGl1').removeClass('isCheck')
                        $('.choseFoods').val()
                        $('.choseFoods').val('comDogFood')
                    } else if (this.index == '1') {
                        $('.yesGl1').css('visibility', 'visible')
                        //$('.yesGl1').addClass('isCheck')
                        $('.yesGl0').css('visibility', 'hidden')
                        //$('.yesGl0').removeClass('isCheck')
                        $('.choseFoods').val()
                        $('.choseFoods').val('comHighDogFood')
                    }

                }, false);
            }
        },
        leftAnimate: function () {
            var that = this;
            that.btnLeft.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.btnLeft.style.background = "url(" + PUBLIC + "/gold/img/index/5.png)";
                that.btnLeft.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.btnLeft.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.btnLeft.style.background = "url(" + PUBLIC + "/gold/img/index/left_bot.png)";
                that.btnLeft.style.backgroundSize = "cover";
                if (that.flag1 == true) {
                    //that.footerLeft.style.transform = "rotate(0deg)";
                    //that.flag1 = false;
                } else {
                    that.footerLeft.style.transform = "rotate(90deg)";
                    that.flag1 = true;
                }
            }, false);
        },
        rightAnimate: function () {
            var that = this;
            that.btnRight.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.btnRight.style.background = "url(" + PUBLIC + "/gold/img/index/10.png)";
                that.btnRight.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.btnRight.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.btnRight.style.background = "url(" + PUBLIC + "/gold/img/index/right_bot.png)";
                that.btnRight.style.backgroundSize = "cover";
                if (that.flag2 == true) {
                    //that.footerRight.style.transform = "rotate(0deg)";
                    //that.flag2 = false;
                } else {
                    //that.footerRight.style.transform = "rotate(-90deg)";
                    //that.flag2 = true;
                }
            }, false);
        },
        left_btn: function () {
            var that = this;
            //游戏公告
            that.left1.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.left1.style.background = "url(" + PUBLIC + "/gold/img/index/1.png)";
                that.left1.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.left1.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.left1.style.background = "url(" + PUBLIC + "/gold/img/index/left_1.png)";
                that.left1.style.backgroundSize = "cover";
                window.location.href = "index.php?m=user&a=notice"
            }, false);
            //攻略资料
            that.left2.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.left2.style.background = "url(" + PUBLIC + "/gold/img/index/2.png)";
                that.left2.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.left2.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.left2.style.background = "url(" + PUBLIC + "/gold/img/index/left_2.png)";
                that.left2.style.backgroundSize = "cover";
                // window.location.href="rem_zy/html/exhibition.html"			
                window.location.href = APP + "?m=user&a=gonglue"
            }, false);
            //用户中心
            that.left3.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.left3.style.background = "url(" + PUBLIC + "/gold/img/index/3.png)";
                that.left3.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.left3.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.left3.style.background = "url(" + PUBLIC + "/gold/img/index/left_3.png)";
                that.left3.style.backgroundSize = "cover";
                // window.location.href="rem_zy/html/userCenter.html"
                window.location.href = APP + "?m=user"
            }, false);
            //农贸市场
            that.left4.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.left4.style.background = "url(" + PUBLIC + "/gold/img/index/4.png)";
                that.left4.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.left4.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.left4.style.background = "url(" + PUBLIC + "/gold/img/index/left_4.png)";
                that.left4.style.backgroundSize = "cover";
                // window.location.href="rem_zy/html/market.html"
                window.location.href = APP + "?m=jiaoyi&a=market"
            }, false);
        },
        right_btn: function () {
            var that = this;
            //商店
            that.right1.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.right1.style.background = "url(" + PUBLIC + "/gold/img/index/6.png)";
                that.right1.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.right1.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.right1.style.background = "url(" + PUBLIC + "/gold/img/index/right_1.png)";
                that.right1.style.backgroundSize = "cover";
                //that.getCommodityData('openDefault',0);
                $(".shade").css("display", "block");
                $(".shangdianBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
            //仓库
            that.right2.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.right2.style.background = "url(" + PUBLIC + "/gold/img/index/7.png)";
                that.right2.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.right2.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.right2.style.background = "url(" + PUBLIC + "/gold/img/index/right_2.png)";
                that.right2.style.backgroundSize = "cover";
                /*that.getWarehouseData('openDefault',0);*/
                $(".shade").css("display", "block");
                $(".cangkuBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
            //兑换中心
            that.right3.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.ajaxReturnMyStockForConvert();
                that.right3.style.background = "url(" + PUBLIC + "/gold/img/index/8.png)";
                that.right3.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.right3.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.right3.style.background = "url(" + PUBLIC + "/gold/img/index/right_3.png)";
                that.right3.style.backgroundSize = "cover";
                $(".shade").css("display", "block");
                $(".duihuanBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
            //装扮
            that.right4.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.right4.style.background = "url(" + PUBLIC + "/gold/img/index/9.png)";
                that.right4.style.backgroundSize = "cover";
                that.yinxiao_btn();
            }, false);
            that.right4.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.right4.style.background = "url(" + PUBLIC + "/gold/img/index/right_4.png)";
                that.right4.style.backgroundSize = "cover";
                $(".shade").css("display", "block");
                $(".zhuangbanBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
        },
        leftTop_btn: function () {
            var that = this;
            //日志
            /*that.leftTop1.addEventListener("touchstart", function (e) {
                e.preventDefault();
                $.ajax({
                    type: "POST",
                    url: APP + "/FarmOther/getLandLog.html",
                    dataType: "json",
                    success: function (msg) {
                        if (msg.code == 1) {
                            $("#PageNumbers").html(msg.page);
                            $(".rizhiBox .rizhiMes").html(msg.html)
                            $("#landLogUpRow").val(msg.upRow)
                            $("#landLogDownRow").val(msg.downRow)
                        }
                    },
                })
                that.leftTop1.classList.add("bounce");
                setTimeout(function () {
                    that.leftTop1.classList.remove("bounce");
                }, 1000)
                that.yinxiao_btn();
            }, false);
            that.leftTop1.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".shade").css("display", "block");
                $(".rizhiBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false); */
            //排行榜
            that.leftTop2.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.leftTop2.classList.add("bounce");
                setTimeout(function () {
                    that.leftTop2.classList.remove("bounce");
                }, 1000)
                that.yinxiao_btn();
            }, false);
            that.leftTop2.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".shade").css("display", "block");
                $(".paihangbang").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
            //充值
            /*that.leftTop3.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.leftTop3.classList.add("bounce");
                setTimeout(function () {
                    that.leftTop3.classList.remove("bounce");
                }, 1000)
                that.yinxiao_btn();
            }, false);
            that.leftTop3.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".shade").css("display", "block");
                $(".chongzhiBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);*/
            //设置
            that.leftTop4.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.leftTop4.classList.add("bounce");
                setTimeout(function () {
                    that.leftTop4.classList.remove("bounce");
                }, 1000)
                that.yinxiao_btn();
            }, false);
            that.leftTop4.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".shade").css("display", "block");
                $(".shezhiBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
                if (that.audio1.paused) {
                    $(".audio img").css("display", "block");
                    that.audioImg.style.background = "url(" + PUBLIC + "/gold/img/index/shezhi/yinxiaoyiguanbi.png)";
                    that.audioImg.style.backgroundSize = "cover";
                } else {
                    $(".audio img").css("display", "none");
                    that.audioImg.style.background = "url(" + PUBLIC + "/gold/img/index/shezhi/yinxiaoyikaiqi.png)";
                    that.audioImg.style.backgroundSize = "cover";
                }
                ;
            }, false);
        },
        qiandao_btn: function () {
            var that = this;
            that.qiandaoBtn.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.yinxiao_btn();
            }, false);
            that.qiandaoBtn.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.qiandaoBtn.classList.remove("pulse", "infinite");
                $.ajax({
                    type: "POST",
                    url: APP + "?m=user&a=memberToSignIn",
                    dataType: "json",
                    success: function (data) {

                        datas = eval(data)

                        if (datas.code == '1') {
                            $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            if (datas.msg == '') {
                                $(".duihuan_chenggong").html('签到成功')
                            } else {
                                $(".duihuan_chenggong").html(datas.msg)
                            }
                            setTimeout(function () {
                                $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_chenggong").css("display", "none")
                                }, 800)
                            }, 1500)
                        } else {
                            $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".duihuan_shibai").html(datas.msg)
                            setTimeout(function () {
                                $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_shibai").css("display", "none")
                                }, 800)
                            }, 1500)
                        }

                    },
                })
                setTimeout(function () {
                    that.qiandaoBtn.classList.add("bounceOut");
                }, 500);
            }, false);
        },
        gohome_btn: function () {
            var that = this;
            that.gohomeBtn.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.yinxiao_btn();
            }, false);
            that.gohomeBtn.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.gohomeBtn.classList.remove("pulse", "infinite");
                location.href = APP + '/';
                setTimeout(function () {
                    that.gohomeBtn.classList.add("bounceOut");
                }, 500);
            }, false);
        },
        panda_btn: function () {
            var that = this;
            that.pandaBtn.addEventListener("touchstart", function (e) {
                e.preventDefault();
                //that.pandaBtn.classList.add("tada");
                setTimeout(function () {
                    //that.pandaBtn.classList.remove("tada");
                }, 500);
                that.yinxiao_btn();
            }, false);
            that.pandaBtn.addEventListener("touchend", function (e) {
                e.preventDefault();
                //console.log('chongwugengxin')
                //that.ajaxReturnPetInfo()
                //$(".shade").css("display", "block");
                //$(".pandaBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
        },

        diaoxiang_btn1: function () {
            var that = this;
            that.diaoxiang1.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.diaoxiang1.style.cssText = "width:0.55rem;height:1.3rem;";
                $(".diaoxiang1 .diaoxiangBox").css("transform", "scale(1,1)")
                $(".diaoxiang1 .diaoxiangBox").css("top", "-1.5rem")
                that.yinxiao_btn();
            }, false);
            that.diaoxiang1.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.diaoxiang1.style.cssText = "width:0.69rem;height:1.47rem;";
                $(".diaoxiang1 .diaoxiangBox").css("top", "0rem")
                $(".diaoxiang1 .diaoxiangBox").css("transform", "scale(0,0)")
            }, false);
        },
        leftimg: function () {
            var that = this;
            for (var i = 0; i < that.sunjianze.length; i++) {
                that.sunjianze[i].index = i;
                that.sunjianze[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.yinxiao_btn();
					$(".dhImgLeft").eq(this.index).find(".diaoxiangBox").css("transform","scale(1,1)")
                }, false);
                that.sunjianze[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
					$(".dhImgLeft").eq(this.index).find(".diaoxiangBox").css("transform","scale(0,0)")

                }, false);
            }

        },	
        ck_btn: function () {
            var that = this;
            for (var i = 0; i < that.ck.length; i++) {
                that.ck[i].index = i;				
                that.ck[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.yinxiao_btn();
					var nowIndex = this.index + 1;	
					var code = $(".cangluList").eq(this.index).attr('code');
      if (code != 'comCopperChest' && code != 'comGoldChest' && code != 'comSilverChest')
        {
						if(nowIndex > 3 && ((nowIndex % 5 > 3) || (nowIndex % 5 < 1)))
						{
							$(".cangluList").eq(this.index).find(".diaoxiangBox").css({"transform":"scale(1,1)","left":"-2.4rem"})
						
						}else{
							$(".cangluList").eq(this.index).find(".diaoxiangBox").css("transform","scale(1,1)")
						}
            return false;
        } else {
            $("#boxCode").val(code);
            switch (code)
            {
                case 'comGoldChest':
                    $(".alertBox").css({"background": "url(" + PUBLIC + "/gold/img/index/caozuoAlert/goldBox.png)", "background-size": "cover"});
                    break;
                case 'comSilverChest':
                    $(".alertBox").css({"background": "url(" + PUBLIC + "/gold/img/index/caozuoAlert/silverBox.png)", "background-size": "cover"});
                    break;
                case 'comCopperChest':
                    $(".alertBox").css({"background": "url(" + PUBLIC + "/gold/img/index/caozuoAlert/copperBox.png)", "background-size": "cover"});
                    break;
            }
            $.ajax({
                type: "POST",
                url: APP + "?m=user&a=boxCost",
                data: {code: code},				
                dataType: "JSON",
				beforeSend:function(){
					//alert(code);
				},
                success: function (data) {					
                    $(".getnum").html(data.msg);
					if(data.stas==1){
					$(".alertBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")	
					}
					
                    return false;
                },
                //error: function () {
                    //alert("网络错误");
					
                    //return false;
                //}
            })
            $(".alertBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            return false;
        }				

					}, false);
                that.ck[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
					$(".cangluList").eq(this.index).find(".diaoxiangBox").css("transform","scale(0,0)")

                }, false);
            }

        },		
        diaoxiang_btn2: function () {
            var that = this;
            that.diaoxiang2.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.diaoxiang2.style.cssText = "width:0.55rem;height:1.3rem;";
                $(".diaoxiang2 .diaoxiangBox").css("transform", "scale(1,1)")
                $(".diaoxiang2 .diaoxiangBox").css("top", "-1.5rem")
                that.yinxiao_btn();
            }, false);
            that.diaoxiang2.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.diaoxiang2.style.cssText = "width:0.69rem;height:1.47rem;";
                $(".diaoxiang2 .diaoxiangBox").css("top", "0rem")
                $(".diaoxiang2 .diaoxiangBox").css("transform", "scale(0,0)")
            }, false);
        },
        diaoxiang_btn3: function () {
            var that = this;
            that.diaoxiang3.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.diaoxiang3.style.cssText = "width:0.55rem;height:1.3rem;";
                $(".diaoxiang3 .diaoxiangBox").css("transform", "scale(1,1)")
                $(".diaoxiang3 .diaoxiangBox").css("top", "-1.5rem")
                that.yinxiao_btn();
            }, false);
            that.diaoxiang3.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.diaoxiang3.style.cssText = "width:0.69rem;height:1.47rem;";
                $(".diaoxiang3 .diaoxiangBox").css("top", "0rem")
                $(".diaoxiang3 .diaoxiangBox").css("transform", "scale(0,0)")
            }, false);
        },
        diaoxiang_btn4: function () {
            var that = this;
            that.diaoxiang4.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.diaoxiang4.style.cssText = "width:0.7rem;height:1.2rem;";
                $(".diaoxiang4 .diaoxiangBox").css("transform", "scale(1,1)")
                $(".diaoxiang4 .diaoxiangBox").css("top", "-1.5rem")
                that.yinxiao_btn();
            }, false);
            that.diaoxiang4.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.diaoxiang4.style.cssText = "width:0.9rem;height:1.47rem;";
                $(".diaoxiang4 .diaoxiangBox").css("top", "0rem")
                $(".diaoxiang4 .diaoxiangBox").css("transform", "scale(0,0)")
            }, false);
        },
        remove_btn: function () {
            var that = this;
            for (var i = 0; i < that.remove.length; i++) {
                that.remove[i].index = i;
                that.remove[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.remove[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".remove").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                    if(typeof(xin)!='undefined'){clearInterval(xin)}
                }, false);
                that.remove[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    $(".remove").eq(this.index).parent().removeClass("bounceIn").addClass("bounceOut");
                    setTimeout(function () {
                        $(".remove").parent().css("display", "none");
                        $(".shade").css("display", "none")
                    }, 800)
                    if(typeof(xin)!='undefined'){clearInterval(xin)}
                }, false);
            }
            
        },
        quxiao_btn: function () {
            var that = this;
            for (var i = 0; i < that.quxiao.length; i++) {
                that.quxiao[i].index = i;
                that.quxiao[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.quxiao[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".quxiao").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.quxiao[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    $(".quxiao").eq(this.index).parent().removeClass("bounceIn").addClass("bounceOut");
                    setTimeout(function () {
                        $(".quxiao").parent().css("display", "none");
                        $(".shade").css("display", "none")
                    }, 800)
                }, false);
            }
        },
        queding_btn: function () {
            var that = this;
            for (var i = 0; i < that.queding.length; i++) {
                that.queding[i].index = i;
                that.queding[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.queding[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".queding").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.queding[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    var rechargeType = $('.rechargeType').val()
                    //alert(rechargeType);
                    $.ajax({
                        type: "POST",
                        data: {rechargeType: rechargeType},
                        url: APP + "?m=user&a=memberToRecharge",
                        dataType: "json",
                        success: function (data) {

                            datas = eval(data)


                            if (datas.code == '1') {
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html('充值成功')
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)
                                }, 1500)
                            } else {
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.msg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none")
                                    }, 800)
                                }, 1500)
                            }


                        },
                    })

                    $(".queding").eq(this.index).parent().removeClass("bounceIn").addClass("bounceOut");
                    $(".shade").css("display", "none");
                    /*$(".queding").eq(this.index).parent().removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".queding").parent().css("display","none");
                     $(".buy_cg").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     },800)*/
                }, false);
            }
        },
        go_chongzhi_btn: function () {
            var that = this;
            that.go_chongzhi.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.go_chongzhi.classList.add("rubberBand");
                setTimeout(function () {
                    $(".go_chongzhi").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.go_chongzhi.addEventListener("touchend", function (e) {
                e.preventDefault();

                $(".go_chongzhi").parent().removeClass("bounceIn").addClass("bounceOut");
                setTimeout(function () {
                    $(".go_chongzhi").parent().css("display", "none");
                    $(".chongzhiBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                }, 800)

            }, false);
        },
        chongzhi_btn: function () {
            var that = this;
            for (var i = 0; i < that.chongzhiBtn.length; i++) {
                that.chongzhiBtn[i].index = i;
                that.chongzhiBtn[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.chongzhiBtn[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".chongzhiBox a").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.chongzhiBtn[i].addEventListener("touchend", function (e) {
                    e.preventDefault();

                    $('.rechargeType').val()

                    if (this.index == 0) {
                        window.location.href=this.href
                    } else if (this.index == 1) {
                        $(".chongzhiBox").removeClass("bounceIn").addClass("bounceOut");
                        setTimeout(function () {
                            $(".chongzhiBox").css("display", "none")
                            $(".chongzhi_mes").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".chongzhi_mes img").attr("src", PUBLIC + "/gold/img/index/chongzhi_mes/2000.png")
                            $('.rechargeType').val('first')
                        }, 800);
                    } else if (this.index == 2) {
                        $(".chongzhiBox").removeClass("bounceIn").addClass("bounceOut");
                        setTimeout(function () {
                            $(".chongzhiBox").css("display", "none")
                            $(".chongzhi_mes").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".chongzhi_mes img").attr("src", PUBLIC + "/gold/img/index/chongzhi_mes/20000.png")
                            $('.rechargeType').val('second')
                        }, 800);
                    } else {
                        $(".chongzhiBox").removeClass("bounceIn").addClass("bounceOut");
                        setTimeout(function () {
                            $(".chongzhiBox").css("display", "none")
                            $(".chongzhi_mes").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".chongzhi_mes img").attr("src", PUBLIC + "/gold/img/index/chongzhi_mes/200000.png")
                            $('.rechargeType').val('third')
                        }, 800);
                    }
                    ;
                }, false);
            }
        },
        filter_btn: function () {
            var that = this;
            that.filter.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.filter.classList.add("rubberBand");
                setTimeout(function () {
                    $(".submit").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.filter.addEventListener("touchend", function (e) {
                e.preventDefault();
                var player_id = $.trim($("#player_id").val());
                if ('' == player_id)
                {
                    $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                    $(".duihuan_chenggong").html("ID不能为空")
                    setTimeout(function () {
                        $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                        $(".bozhongAlert").removeClass("bounceIn").addClass("bounceOut");
                        setTimeout(function () {
                            $(".duihuan_chenggong").css("display", "none");
                            $(".bozhongAlert").css("display", "none");
                            $(".shade").css("display", "none");
                        }, 800)
                    }, 1500)
                    that.clear_btn();

                    return false;
                } else {

                    $.ajax({
                        url: APP + '/Farm/findPlayer',
                        type: 'POST',
                        data: {playerId: player_id},
                        dataType: 'json',
                        success: function (data) {
                            if (data.member_id == 0)
                            {
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(data.msg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    $(".bozhongAlert").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none");
                                        $(".bozhongAlert").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)

                                return false;
                            } else {
                                var html_con = "<li>" + data.member_nickname + "</li><li>" + data.member_level + "</li><li>" + data.member_gold + "</li>";
                                $(".find_friend ul").empty();
                                $(".find_friend ul").append(html_con);
                                $(".find_friend a").attr("href", APP + "/Farm/memberGoFriendHouse/memberId/" + data.member_id);
                            }
                        },
                        error: function () {
                            $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".duihuan_chenggong").html("网络错误")
                            setTimeout(function () {
                                $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                $(".bozhongAlert").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_chenggong").css("display", "none");
                                    $(".bozhongAlert").css("display", "none");
                                    $(".shade").css("display", "none");
                                }, 800)
                            }, 1500)
                            return false;
                        }
                    })
                }
            }, false);
        },
        go_friend_btn: function () {
            var that = this;
            that.go_friend.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.go_friend.classList.add("rubberBand");
                setTimeout(function () {
                    $(".find_friend a").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.go_friend.addEventListener("touchend", function (e) {
                e.preventDefault();
                location.href = $(this).attr("href");
                //去好友农场的跳转
            }, false);
        },
        qiehuan_btn: function () {
            var that = this;
            that.qiehuan.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.qiehuan.classList.add("rubberBand");
                setTimeout(function () {
                    that.qiehuan.classList.remove("rubberBand");
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.qiehuan.addEventListener("touchend", function (e) {
                e.preventDefault();
                //window.location.href="login.html";
                $.ajax({
                    type: "POST",
                    url: APP + "?m=user&a=memberLogout",
                    dataType: "json",
                    success: function (msg) {

                        datas = eval(msg)

                        if (datas.reTips == 'Success') {

                            window.location.href = APP + ""

                        }

                    },
                })

            }, false);
        },
        audioBtn_btn: function () {
            var that = this;
            that.audioBtn.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.audioBtn.classList.add("rubberBand");
                setTimeout(function () {
                    that.audioBtn.classList.remove("rubberBand");
                }, 100)
            }, false);
            that.audioBtn.addEventListener("touchend", function (e) {
                e.preventDefault();
                var isPlay;
                if (that.audio1.paused) {
                    $(".audio img").css("display", "none");
                    that.audioImg.style.background = "url(" + PUBLIC + "/gold/img/index/shezhi/yinxiaoyikaiqi.png)";
                    that.audioImg.style.backgroundSize = "cover";
                    that.audio1.play();

                    isPlay = 'on';
                } else {
                    $(".audio img").css("display", "block");
                    that.audioImg.style.background = "url(" + PUBLIC + "/gold/img/index/shezhi/yinxiaoyiguanbi.png)";
                    that.audioImg.style.backgroundSize = "cover";
                    that.audio1.pause()
                    that.audio1.currentTime = 0.0;

                    isPlay = 'off';
                }
                ;

                $.ajax({
                    type: "POST",
                    url: APP + "/Farm/farmBgMusic.html",
                    data: {isPlay: isPlay},
                    dataType: "json",
                })


            }, false);
        },
        left_go: function () {
            var that = this;
            for (var i = 0; i < that.leftBtn.length; i++) {
                that.leftBtn[i].index = i;
                that.leftBtn[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.leftBtn[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".leftBtn").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.leftBtn[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    if (this.index == 0) {
                        landLogUpRow = $("#landLogUpRow").val()
                        $.ajax({
                            type: "POST",
                            url: APP + "/FarmOther/getLandLog/p/" + landLogUpRow + ".html",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.code == 1) {
                                    $("#PageNumbers").html(msg.page);
                                    $(".rizhiBox .rizhiMes").html(msg.html)
                                    $("#landLogUpRow").val(msg.upRow)
                                    $("#landLogDownRow").val(msg.downRow)
                                }
                            },
                        })
                    }
                }, false);
            }
        },
        right_go: function () {
            var that = this;
            for (var i = 0; i < that.rightBtn.length; i++) {
                that.rightBtn[i].index = i;
                that.rightBtn[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.rightBtn[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".rightBtn").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.rightBtn[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    if (this.index == 0) {
                        landLogDownRow = $("#landLogDownRow").val()
                        $.ajax({
                            type: "POST",
                            url: APP + "/FarmOther/getLandLog/p/" + landLogDownRow + ".html",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.code == 1) {
                                    $("#PageNumbers").html(msg.page);
                                    $(".rizhiBox .rizhiMes").html(msg.html)
                                    $("#landLogUpRow").val(msg.upRow)
                                    $("#landLogDownRow").val(msg.downRow)
                                }
                            },
                        })
                    }
                }, false);
            }
        },
        empty_btn: function () {
            var that = this;
            for (var i = 0; i < that.emptyBtn.length; i++) {
                that.emptyBtn[i].index = i;
                that.emptyBtn[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.emptyBtn[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".empty").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.emptyBtn[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    if (this.index == 0) {
                        $.ajax({
                            type: "POST",
                            url: APP + "?m=user&a=delLandLog",
                            dataType: "json",
                            success: function (msg) {
                                if (msg.code == 1) {
                                    $(".rizhiMes").empty();
                                }
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(msg.msg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)
                                }, 1500)

                            },
                        })

                    }
                }, false);
            }
        },
        paihang_btn: function () {
            var that = this;
            for (var i = 0; i < that.paihangTop.length; i++) {
                that.paihangTop[i].index = i;
                that.paihangTop[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.paihangTop[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".paihangTop li").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.paihangTop[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    if (this.index == 0) {
                        that.paihangTop[0].style.background = "url(" + PUBLIC + "/gold/img/index/paihang/nongchangpaiming2.png)";
                        that.paihangTop[0].style.backgroundSize = "cover";
                        that.paihangTop[1].style.background = "url(" + PUBLIC + "/gold/img/index/paihang/chongwupaiming2.png)";
                        that.paihangTop[1].style.backgroundSize = "cover";
                    } else {
                        that.paihangTop[0].style.background = "url(" + PUBLIC + "/gold/img/index/paihang/nongchangpaiming.png)";
                        that.paihangTop[0].style.backgroundSize = "cover";
                        that.paihangTop[1].style.background = "url(" + PUBLIC + "/gold/img/index/paihang/chongwupaiming.png)";
                        that.paihangTop[1].style.backgroundSize = "cover";
                    }
                    $(".paihangBot li").css("display", "none").eq(this.index).css("display", "block")
                }, false);
            }
        },
        find_go_btn: function () {
            var that = this;
            that.find_go.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.find_go.classList.add("rubberBand");
                setTimeout(function () {
                    $(".find_go").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.find_go.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".paihangbang").removeClass("bounceIn").addClass("bounceOut");
                setTimeout(function () {
                    $(".paihangbang").css("display", "none")
                    $(".find_friend").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                }, 800);
            }, false);
        },
        gerenImg_btn: function () {
            var that = this;
            that.gerenImg.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.gerenImg.classList.add("rubberBand");
                setTimeout(function () {
                    $(".gerenBox img").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.gerenImg.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".shade").css("display", "block");
                $(".gerenMesBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
        },
        pandaTop_btn: function () {
            var that = this;
            for (var i = 0; i < that.pandaTop.length; i++) {
                that.pandaTop[i].index = i;
                that.pandaTop[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.pandaTop[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".pandaTop li").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.pandaTop[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    if (this.index == 0) {
                        that.pandaTop[0].style.background = "url(" + PUBLIC + "/gold/img/index/chongwu/xinxi2.png)";
                        that.pandaTop[0].style.backgroundSize = "cover";
                        that.pandaTop[1].style.background = "url(" + PUBLIC + "/gold/img/index/chongwu/jineng.png)";
                        that.pandaTop[1].style.backgroundSize = "cover";
                    } else {
                        that.pandaTop[0].style.background = "url(" + PUBLIC + "/gold/img/index/chongwu/xinxi.png)";
                        that.pandaTop[0].style.backgroundSize = "cover";
                        that.pandaTop[1].style.background = "url(" + PUBLIC + "/gold/img/index/chongwu/jineng2.png)";
                        that.pandaTop[1].style.backgroundSize = "cover";
                    }
                    $(".pandaBot li").css("display", "none").eq(this.index).css("display", "block")
                }, false);
            }
        },
        getjineng_btn: function () {
            var that = this;
            for (var i = 0; i < that.getjineng.length; i++) {
                that.getjineng[i].index = i;
                that.getjineng[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.getjineng[this.index].classList.add("getjineng");
                    setTimeout(function () {
                        $(".paihangBot li:nth-of-type(2) a").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.getjineng[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    if (this.index == 0) {

                        petId = $('.petsId').val()

                        $.ajax({
                            type: "post",
                            url: APP + "?m=user&a=nowPetAutoHarvest",
                            data: {petId: petId},
                            async: true,
                            dataType: 'json',
                            success: function (data) {

                                datas = eval(data)


                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.msg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)
                                }, 1500)
                                if (datas.code != 0) {
                                    that.ajaxHarvestTime()
                                }
                            }
                        });
                        //alert("自动收获")
                    } else if (this.index == 1) {

                        petId = $('.petsId').val()

                        $.ajax({
                            type: "post",
                            url: APP + "?m=user&a=nowPetAutoSeed",
                            data: {petId: petId},
                            async: true,
                            dataType: 'json',
                            success: function (data) {

                                datas = eval(data)


                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.msg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)
                                }, 1500)
                                if (datas.code != 0) {
                                    that.ajaxSeedTime()
                                }
                            }
                        });

                        //alert("自动播种")
                    } else if (this.index == 2) {

                        petId = $('.petsId').val()

                        $.ajax({
                            type: "post",
                            url: APP + "?m=user&a=nowPetRoseHeart",
                            data: {petId: petId},
                            async: true,
                            dataType: 'json',
                            success: function (data) {

                                datas = eval(data)


                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.msg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)
                                }, 1500)

                                that.ajaxReturnPetInfo()

                            }
                        });

                        //alert("玫瑰之心")
                    }
                }, false);
            }
        },
        xunlianBtn_btn: function () {
            var that = this;
            that.xunlianBtn.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.xunlianBtn.classList.add("rubberBand");
                setTimeout(function () {
                    $(".xunlian").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.xunlianBtn.addEventListener("touchend", function (e) {
                e.preventDefault();
                //训练

                petId = $('.petsId').val()

                $.ajax({
                    type: "post",
                    url: APP + "?m=user&a=trainingMemberPet",
                    data: {petId: petId},
                    async: true,
                    dataType: 'json',
                    success: function (data) {

                        datas = eval(data)

                        $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                        $(".duihuan_chenggong").html(datas.msg)
                        setTimeout(function () {
                            $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                            setTimeout(function () {
                                $(".duihuan_chenggong").css("display", "none")
                            }, 800)
                        }, 1500)

                        that.ajaxReturnPetInfo()

                    }
                });



            }, false);
        },
        weishiBtn_btn: function () {
            var that = this;
            that.weishiBtn.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.weishiBtn.classList.add("rubberBand");
                setTimeout(function () {
                    $(".weishi").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.weishiBtn.addEventListener("touchend", function (e) {
                e.preventDefault();
                //喂食

                petId = $('.petsId').val()
                choseFoods = $('.choseFoods').val()
                foodsCount = $('.pandaCount').html()
                //alert(choseFoods);
                $.ajax({
                    type: "post",
                    url: APP + "?m=user&a=feedingMemberPet",
                    data: {petId: petId, choseFoods: choseFoods, foodsCount: foodsCount},
                    async: true,
                    dataType: 'json',
                    beforeSend:function(){
                        $("#mengban").show();
                    },
                    success: function (data) {

                        datas = eval(data) 

                        $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                        $(".duihuan_chenggong").html(datas.msg)
                        var datasurl=datas.url;
                        setTimeout(function () {
                            $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                            setTimeout(function () {
                                $(".duihuan_chenggong").css("display", "none")
                                if(datasurl=='duihuan'){
                                    $(".pandaBox").css("display", "none").removeClass("bounceIn").addClass("bounceOut")
                                    $(".shade").css("display", "block");
                                    $(".duihuanBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
                                    $(".duihuanTop li img:nth-of-type(2)").css("display", "none").eq(3).css("display", "block")
                                    $(".duihuanBot li").css("display", "none").eq(3).css("display", "block")
                                }
                            }, 800)
                        }, 1500)
                         $("#mengban").hide();
                        that.ajaxReturnPetInfo()

                    }
                });

            }, false);
        },
        pandaJia_btn: function () {
            var that = this;
            that.pandaJia.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.pandaJia.classList.add("rubberBand");
                setTimeout(function () {
                    $(".pandaJia").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.pandaJia.addEventListener("touchend", function (e) {
                e.preventDefault();
                var val = $(".pandaCount").html();
                val++;
                $(".pandaCount").html(val);
            }, false);
        },
        pandaJian_btn: function () {
            var that = this;
            that.pandaJian.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.pandaJian.classList.add("rubberBand");
                setTimeout(function () {
                    $(".pandaJian").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.pandaJian.addEventListener("touchend", function (e) {
                e.preventDefault();
                var val = $(".pandaCount").html();
                val--;
                if (val < 0) {
                    val = 0
                }
                $(".pandaCount").html(val);
            }, false);
        },
        changeName_btn: function () {
            var that = this;
            that.changeName.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.changeName.classList.add("rubberBand");
                setTimeout(function () {
                    $(".changeName").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
            }, false);
            that.changeName.addEventListener("touchend", function (e) {
                e.preventDefault();
                if (that.changeFlag == true) {
                    that.changeName.classList.add("changeQueren");
                    $(".pandaBot li:nth-of-type(1) input").removeAttr("readonly");
                    that.changeFlag = false;
                } else {
                    //console.log($('.nowPetNickname').val())

                    petId = $('.petsId').val()
                    petName = $('.nowPetNickname').val()

                    $.ajax({
                        type: "post",
                        url: APP + "?m=user&a=changeMemberPetName",
                        data: {petId: petId, petName: petName},
                        async: true,
                        dataType: 'json',
                        success: function (data) {

                            datas = eval(data)

                            $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".duihuan_chenggong").html(datas.msg)
                            setTimeout(function () {
                                $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_chenggong").css("display", "none")
                                }, 800)
                            }, 1500)

                            that.changeName.classList.remove("changeQueren");
                            $(".pandaBot li:nth-of-type(1) input").attr("readonly", "readonly");
                            that.changeFlag = true;





                        }
                    });

                    /*that.changeName.classList.remove("changeQueren");
                     $(".pandaBot li:nth-of-type(1) input").attr("readonly","readonly");
                     that.changeFlag=true;*/
                }

            }, false);
        },
        cangkuList_btn: function () {
            var that = this;
            for (var i = 0; i < that.cangkuList.length; i++) {
                that.cangkuList[i].index = i;
                that.cangkuList[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.cangkuList[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".cangkuTop li").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.cangkuList[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    var val = $(".cangkuTop li").eq(this.index).find('input').val()
                    /*that.getWarehouseData(val,this.index);*/
                    $(".cangkuTop li img:nth-of-type(2)").css("display", "none").eq(this.index).css("display", "block")
                    $(".cangkuBot li").css("display", "none").eq(this.index).css("display", "block")
                }, false);
            }
        },
        duihuanList_btn: function () {
            var that = this;
            for (var i = 0; i < that.cangkuList.length; i++) {
                that.duihuanList[i].index = i;
                that.duihuanList[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.duihuanList[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".duihuanTop li").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.duihuanList[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    $(".duihuanTop li img:nth-of-type(2)").css("display", "none").eq(this.index).css("display", "block")
                    $(".duihuanBot li").css("display", "none").eq(this.index).css("display", "block")
                }, false);
            }
        },
        duihuan_btn: function () {
            var that = this;
            for (var i = 0; i < that.duihuan.length; i++) {
                that.duihuan[i].index = i;
                that.duihuan[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.duihuan[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".shuiguoduihuan").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.duihuan[i].addEventListener("touchend", function (e) {
                    e.preventDefault();


                    var commodityId = $(".shuiguoduihuan").eq(this.index).siblings("input:nth-of-type(2)").val();
                    var commodityCount = $(".shuiguoduihuan").eq(this.index).siblings(".shuiguoCount").html();
                    //alert(commodityId);
                    $.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=buyCommodity",
                        data: {commodityId: commodityId, commodityType: 'exchange', commodityCount: commodityCount},
                        dataType: "json",
                        beforeSend: function () {
							$("#mengban").show();
                        },
                        success: function (data) {
                            datas = eval(data)
                            if (datas.reTips == 'Success') {
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.reMsg)
								$("#mengban").hide();
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");

                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)

                                }, 1500)
                                //window.location.reload();
                                updateCangku();
                            } else {
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.reMsg)
                                $("#mengban").hide();
								setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none")
                                    }, 800)
                                }, 1500)
                            }



                        },
                    })

                    /*if(this.index == 0){
                     $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_chenggong").html("兑换成功")
                     setTimeout(function(){
                     $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_chenggong").css("display","none")
                     },800)
                     },1500)
                     }else{
                     $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_shibai").html("兑换失败，萝卜不足")
                     setTimeout(function(){
                     $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_shibai").css("display","none")
                     },800)
                     },1500)
                     }*/
                }, false);
            }
        },
        shangdianList_btn: function () {
            var that = this;
            for (var i = 0; i < that.shangdianList.length; i++) {
                that.shangdianList[i].index = i;
                that.shangdianList[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.shangdianList[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".shangdianTop li").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.shangdianList[i].addEventListener("touchend", function (e) {
                    e.preventDefault();

                    /*var val = $(".shangdianTop li").eq(this.index).find('input').val()
                     that.getCommodityData(val,this.index);*/
                    $(".shangdianTop li img:nth-of-type(2)").css("display", "none").eq(this.index).css("display", "block")
                    $(".shangdianBot li").css("display", "none").eq(this.index).css("display", "block")
                }, false);
            }
        },
        shangdian_btn: function () {
            var that = this;
            for (var i = 0; i < that.shangdian.length; i++) {
                that.shangdian[i].index = i;
                that.shangdian[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.shangdian[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".shuiguogoumai").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.shangdian[i].addEventListener("touchend", function (e) {
                    e.preventDefault();

                    //购买商店商品
                    var commodityId = $(".shuiguogoumai").eq(this.index).siblings("input").val();
                    
					$.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=shop",
                        data: {commodityId: commodityId, commodityType: 'shop'},
                        dataType: "json",
                        beforeSend: function () {
							//alert(commodityId);
							$("#mengban").show();
                        },
                        success: function (data) {
                            datas = eval(data)
                            if (datas.reTips == 'Success') {
								
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.reMsg)
                                // $('.cangkuBot li').eq(2).html(datas.ware1);
								$("#mengban").hide();
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)
                                }, 1500)
								
                                //window.location.reload();
                                 updateCangku();
                            } else {
								$("#mengban").hide();
								$(".duihuan_shibai").find(".span").html(datas.reMsg);
                                $(".duihuan_shibai").css("display", "block");
                                $(".duihuan_shibai").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none")
                                    }, 800)
                                }, 1500)
								
                            }

                        },
                    })					

                    /*if(this.index == 0){
                     $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_chenggong").html("购买成功")
                     setTimeout(function(){
                     $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_chenggong").css("display","none")
                     },800)
                     },1500)
                     }else{
                     $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_shibai").html("购买失败，钻石不足")
                     setTimeout(function(){
                     $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_shibai").css("display","none")
                     },800)
                     },1500)
                     }*/
                }, false);
            }
        },
        shuiguoJia_btn: function () {
            var that = this;
            for (var i = 0; i < that.shuiguoJia.length; i++) {
                that.shuiguoJia[i].index = i;
                that.shuiguoJia[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.shuiguoJia[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".shuiguoJia").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.shuiguoJia[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    var val = $(".shuiguoJia").eq(this.index).parent().find(".shuiguoCount").html();
                    val++;
                    $(".shuiguoJia").eq(this.index).parent().find(".shuiguoCount").html(val);
                }, false);
            }
        },
        shuiguoJian_btn: function () {
            var that = this;
            for (var i = 0; i < that.shuiguoJian.length; i++) {
                that.shuiguoJian[i].index = i;
                that.shuiguoJian[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.shuiguoJian[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".shuiguoJian").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.shuiguoJian[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    var val = $(".shuiguoJian").eq(this.index).parent().find(".shuiguoCount").html();
                    val--;
                    if (val < 1) {
                        val = 1
                    }
                    $(".shuiguoJian").eq(this.index).parent().find(".shuiguoCount").html(val);
                }, false);
            }
        },
        jiansheList_btn: function () {
            var that = this;
            for (var i = 0; i < that.jiansheList.length; i++) {
                that.jiansheList[i].index = i;
                that.jiansheList[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.jiansheList[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".jiansheTop li").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.jiansheList[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    $(".jiansheTop li img:nth-of-type(2)").css("display", "none").eq(this.index).css("display", "block")
                    $(".jiansheBot li").css("display", "none").eq(this.index).css("display", "block")
                }, false);
            }
        },
        tudishengji_btn: function () {
            var that = this;
            for (var i = 0; i < that.tudishengji.length; i++) {
                that.tudishengji[i].index = i;
                that.tudishengji[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.tudishengji[this.index].classList.add("rubberBand");
                    setTimeout(function () {
                        $(".tudishengji").removeClass("rubberBand")
                    }, 100)
                    that.yinxiao_btn();
                }, false);
                that.tudishengji[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    var getLevel = $(".tudishengji").eq(this.index).parent().find('.convertLevel').val();
                    if (getLevel == null) {
                        getLevel = 'none';
                    }
					//alert(getLevel);
                    $.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=memberBuildLevelUp",
                        data: {getLevel: getLevel},
						
						beforeSend:function(){
							$("#mengban").show();
						},
                        dataType: "json",
                        success: function (data) {
                            datas = eval(data)
                            if (datas.code == '1') {
								$("#mengban").hide();
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html('升级成功')
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    $(".jiansheBox").removeClass("bounceIn").addClass("bounceOut");
                                    $(".shade").css("display", "none");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none")
                                    }, 800)
                                }, 1500)

                                if (getLevel == 'none') {
                                    $.ajax({
                                        type: "post",
                                        url: APP + "/Farm/getNowHouseImg",
                                        dataType: "json",
                                        success: function (imgData) {
                                            imgDatas = eval(imgData)

                                            $('.BigHouse').css('background', 'url(' + PUBLIC + '/UploadFiles_s/' + imgDatas.img + ')')
                                            $('.BigHouse').css('background-size', 'cover')
                                        }
                                    });
                                }

                            } else {
								$("#mengban").hide();
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.msg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none")
                                        $(".jiansheBox").removeClass("bounceIn").addClass("bounceOut");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                            }

                        },
                    })


                    /*if(this.index == 0){
                     $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_chenggong").html("升级成功")
                     setTimeout(function(){
                     $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_chenggong").css("display","none")
                     },800)
                     },1500)
                     }else{
                     $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_shibai").html("升级失败，材料不足")
                     setTimeout(function(){
                     $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_shibai").css("display","none")
                     },800)
                     },1500)
                     }*/
                }, false);
            }
        },
        yinxiao_btn: function () {
            var that = this;
            if (that.audio1.paused) {

            } else {
                that.yinxiao.play();
                setTimeout(function () {
                    that.yinxiao.pause()
                    that.yinxiao.currentTime = 0.0;
                }, 800)
            }
        },
        BigHouse_btn: function () {
            var that = this;
            that.BigHouse.addEventListener("touchstart", function (e) {
                e.preventDefault();
                //that.getLevelInfo();
                //that.BigHouse.classList.add("rubberBand");
                setTimeout(function () {
                    //$(".BigHouse").removeClass("rubberBand")
                }, 100)
                //that.yinxiao_btn();
            }, false);
            that.BigHouse.addEventListener("touchend", function (e) {
                e.preventDefault();
                //$(".shade").css("display", "block");
                //$(".jiansheBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
        },
        SmallHouse_btn: function () {
            var that = this;
            that.SmallHouse.addEventListener("touchstart", function (e) {
                e.preventDefault();
                //that.SmallHouse.classList.add("rubberBand");
                setTimeout(function () {
                    $(".SmallHouse").removeClass("rubberBand")
                }, 100)
                that.yinxiao_btn();
                /*var memberId = $('.memberID').val()
                 $.ajax({
                 type:"post",
                 url:APP+"/Farm/getMemberPetInfo.html",
                 async:true,
                 dataType:'json',
                 data:{memberId:memberId},
                 success:function(data){
                 $('.sico_chongwu_List').
                 }
                 });*/
            }, false);
            that.SmallHouse.addEventListener("touchend", function (e) {
                //e.preventDefault();
                //$(".shade").css("display", "block");
                //$(".sico_chongwu_Box").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            }, false);
        },
        html_arr: function () {
            $(".panda p").css("display", "block").html(this.htmlArr[Math.floor(Math.random() * this.htmlArr.length)]);
            setTimeout(function () {
                $(".panda p").css("display", "none");
            }, 3000)
        },
        html_arr_btn: function () {
            var that = this;
            that.html_arr();
            setInterval(function () {
                that.html_arr();
            }, 10000)
        },
        max_Btn: function () {

            var that = this;
            for (var i = 0; i < that.maxBtn.length; i++) {
                that.maxBtn[i].index = i;
                that.maxBtn[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();

                }, false);
                that.maxBtn[i].addEventListener("touchend", function (e) {
                    e.preventDefault();

                    var maxCount = 0;

                    var convertTypeCount = $(this).parent().find('.convertTypeCount').val()

                    var fConId = $(this).parent().find('.fConId').val()
                    var fId = $(this).parent().find('.fId').val()
                    var fTable = $(this).parent().find('.fTable').val()
                    var fMyCount = $(this).parent().find('.fMyCount').val()
                    var fConCount = $(this).parent().find('.fConCount').val()
                    var fAmount = Math.floor(fMyCount / fConCount);
                    maxCount = fAmount;

                    if (convertTypeCount > 1) {

                        var sConId = $(this).parent().find('.sConId').val()
                        var sId = $(this).parent().find('.sId').val()
                        var sTable = $(this).parent().find('.sTable').val()
                        var sMyCount = $(this).parent().find('.sMyCount').val()
                        var sConCount = $(this).parent().find('.sConCount').val()
                        var sAmount = Math.floor(sMyCount / sConCount);


                        if (parseInt(fAmount) > parseInt(sAmount)) {
                            if (parseInt(fAmount) - parseInt(sAmount) > 0) {
                                maxCount = parseInt(sAmount);
                            } else {
                                maxCount = 0;
                            }
                        } else if (parseInt(fAmount) < parseInt(sAmount)) {
                            if (parseInt(sAmount) - parseInt(fAmount) > 0) {
                                maxCount = parseInt(fAmount);
                            } else {
                                maxCount = 0;
                            }
                        } else {
                            if (parseInt(fAmount) > 0) {
                                maxCount = parseInt(sAmount);
                            } else {
                                maxCount = 0;
                            }
                        }


                    }

                    $(this).parent().find('.shuiguoCount').html(maxCount)

                }, false);
            }
        }
    };


//游戏
    function game() {
        this.btn_animate = new btn();
        this.tudi = $(".easte li");
        this.bozhong = $(".bozhongBtn");
        this.chanchu = $(".chanchuBtn");
        this.qingli = $(".qingliBtn");
        this.jiaoshui = $(".jiaoshuiBtn");
        this.shifei = $(".shifeiBtn");
        this.shouge = $(".shougeBtn");
        this.xinxi = $(".xinxiBtn");
        this.chucao = $(".chucaoBtn");
        this.chuchong = $(".chuchongBtn");
        this.bozhongYes = $(".bozhongYes")[0];
        this.shougeYes = $(".shougeYes")[0];
        this.chanchuYes = $(".chanchuYes")[0];
        this.shifeiYes = $(".shifeiYes")[0];
        this.xinxiYes = $(".xinxiYes")[0];
        this.sicoZhezhao = $(".sicoZhezhao")[0];
    }
    ;
    game.prototype = {
        play: function () {
            var that = this;
            that.btn_animate.init();
            that.tudi_btn();
            that.bozhong_btn();
            that.chanchu_btn();
            that.jiaoshui_btn();
            that.shifei_btn();
            that.shouge_btn();
            that.xinxi_btn();
            that.qingli_btn();
            that.chucao_btn();
            that.chuchong_btn();
            that.sicoZhezhao_btn();
            that.getLandCropsImg();
            that.bozhongYes_btn();
            that.shougeYes_btn();
            that.chanchuYes_btn();
        },
        tudi_btn: function () {
            var that = this;
            for (var i = 0; i < that.tudi.length; i++) {
                that.tudi[i].index = i;
                that.tudi[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    $(".easte li").eq(this.index).find(".opacity").css("opacity", 1)
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.tudi[i].addEventListener("touchend", function (e) {
                    e.preventDefault();

                    $(".easte li").eq(this.index).find(".opacity").css("opacity", 0);
                    if ($(".easte li").eq(this.index).hasClass("kaiken")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".shade").css("display", "block");
                        that.btn_animate.getLevelInfo();
                        $(".jiansheBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
                    } else if ($(".easte li").eq(this.index).hasClass("bozhong")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(0).css({
                            "opacity": 1,
                            "right": "0.9rem",
                            "bottom": "0.6rem",
                            "z-index": 2
                        })
                    } else if ($(".easte li").eq(this.index).hasClass("chanchu_jiaoshui")) {
                        $(".caoz").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(2).css({
                            "opacity": 1,
                            "right": "0.6rem",
                            "bottom": "0.7rem",
                            "z-index": 2
                        })
                    } else if ($(".easte li").eq(this.index).hasClass("jiaoshui_shifei")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(2).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(3).css({
                            "opacity": 1,
                            "right": "0.6rem",
                            "bottom": "0.7rem",
                            "z-index": 2
                        })
                    } else if ($(".easte li").eq(this.index).hasClass("shifei_shouge")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(4).css({
                            "opacity": 1,
                            "right": "0.9rem",
                            "bottom": "0.6rem",
                            "z-index": 2
                        })
                         $(".easte li").eq(this.index).find(".caozuoBtn").eq(5).css({
                             "opacity": 1,
                             "right": "0.6rem",
                             "bottom": "0.7rem",
                             "z-index": 2
                         })
                    } else if ($(".easte li").eq(this.index).hasClass("xinxi_chanchu")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                         $(".easte li").eq(this.index).find(".caozuoBtn").eq(5).css({
                             "opacity": 1,
                             "right": "0.6rem",
                             "bottom": "0.7rem",
                             "z-index": 2
                         })

                    } else if ($(".easte li").eq(this.index).hasClass("shouge_chanchu")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(4).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "0.6rem",
                            "bottom": "0.7rem",
                            "z-index": 2
                        })
                    } else if ($(".easte li").eq(this.index).hasClass("qingli")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(6).css({
                            "opacity": 1,
                            "right": "0.9rem",
                            "bottom": "0.6rem",
                            "z-index": 2
                        })
                    } else if ($(".easte li").eq(this.index).hasClass("shouge_chanchu_chucao")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(4).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(7).css({
                            "opacity": 1,
                            "right": "1.7rem",
                            "bottom": "1.2rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "0.6rem",
                            "bottom": "0.7rem",
                            "z-index": 2
                        })

                    } else if ($(".easte li").eq(this.index).hasClass("shouge_chanchu_chuchong")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(4).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(8).css({
                            "opacity": 1,
                            "right": "1.7rem",
                            "bottom": "1.2rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "0.6rem",
                            "bottom": "0.7rem",
                            "z-index": 2
                        })

                    } else if ($(".easte li").eq(this.index).hasClass("shouge_chanchu_jiaoshui")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(4).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(2).css({
                            "opacity": 1,
                            "right": "1.7rem",
                            "bottom": "1.2rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "0.6rem",
                            "bottom": "0.7rem",
                            "z-index": 2
                        })

                    } else if ($(".easte li").eq(this.index).hasClass("xinxi_chanchu_jiaoshui")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(2).css({
                            "opacity": 1,
                            "right": "1.7rem",
                            "bottom": "1.2rem",
                            "z-index": 2
                        })
                         $(".easte li").eq(this.index).find(".caozuoBtn").eq(5).css({
                             "opacity": 1,
                             "right": "0.6rem",
                             "bottom": "0.7rem",
                             "z-index": 2
                         })

                    } else if ($(".easte li").eq(this.index).hasClass("xinxi_chanchu_chuchong")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(8).css({
                            "opacity": 1,
                            "right": "1.7rem",
                            "bottom": "1.2rem",
                            "z-index": 2
                        })
                         $(".easte li").eq(this.index).find(".caozuoBtn").eq(5).css({
                             "opacity": 1,
                             "right": "0.6rem",
                             "bottom": "0.7rem",
                             "z-index": 2
                         })

                    } else if ($(".easte li").eq(this.index).hasClass("xinxi_chanchu_chucao")) {
                        $(".caozuoBtn").css({
                            "opacity": 0,
                            "right": "0.4rem",
                            "bottom": 0,
                            "z-index": 0
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(1).css({
                            "opacity": 1,
                            "right": "1.1rem",
                            "bottom": "0.3rem",
                            "z-index": 2
                        })
                        $(".easte li").eq(this.index).find(".caozuoBtn").eq(7).css({
                            "opacity": 1,
                            "right": "1.7rem",
                            "bottom": "1.2rem",
                            "z-index": 2
                        })
                         $(".easte li").eq(this.index).find(".caozuoBtn").eq(5).css({
                             "opacity": 1,
                             "right": "0.6rem",
                             "bottom": "0.7rem",
                             "z-index": 2
                         })

                    }

                }, false);
            }
        },
        bozhong_btn: function () {
            var that = this;
            for (var i = 0; i < that.bozhong.length; i++) {
                that.bozhong[i].index = i;
                that.bozhong[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.bozhong[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    var landNum = this.index + 1;
                    $(".bozhongAlert").find('.landNum').val(landNum)
                    //console.log($('.bozhong').eq(this.index).find('#landID').val())
                    $(".shade").css("display", "block");
                    $(".bozhongAlert").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                    // console.log(i);
                    //that.bozhongYes_btn(true, landNum);

                    /*if(this.index == 0){
                     that.bozhongYes_btn(true,landId);
                     }else{
                     that.bozhongYes_btn(false);
                     }*/
                }, false);
            }
        },
        chanchu_btn: function () {

            var that = this;
            for (var i = 0; i < that.chanchu.length; i++) {
                that.chanchu[i].index = i;
                that.chanchu[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.chanchu[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                     var landNum = this.index + 1;
                     $(".chanchuAlert").find('.clandNum').val(landNum)
                     $(".shade").css("display", "block");
                     $(".chanchuAlert").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                }, false);
            }
        },
        qingli_btn: function () {
            var that = this;
            for (var i = 0; i < that.qingli.length; i++) {
                that.qingli[i].index = i;
                that.qingli[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.qingli[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    //alert("清理第"+this.index+"地")
                    var landNum = this.index + 1;                    
                    $.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=uprootSeed",
                        data: {landNum: landNum},
                        dataType: "json",
                        beforeSend: function () {
                            $("#mengban").show();
                        },
                        success: function (data) {

                            datas = eval(data)

                            if (datas.reTips == 'Success') {
																
                                $(".shade").css("display", "block");
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
								
                                that.clear_btn();
                                that.getLandCropsImg(landNum);								
                                //location.reload()													
                            } else {
                                $(".shade").css("display", "block");
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                            }
                            $("#mengban").hide();

                        },
                    })

                    /*if(this.index == 4){
                     $(".shade").css("display","block");
                     $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_chenggong").html("收割成功")
                     setTimeout(function(){
                     $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_chenggong").css("display","none");
                     $(".shade").css("display","none");
                     },800)
                     },1500)
                     }else{
                     $(".shade").css("display","block");
                     $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_shibai").html("收割失败，作物未熟")
                     setTimeout(function(){
                     $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_shibai").css("display","none");
                     $(".shade").css("display","none");
                     },800)
                     },1500)
                     }*/
                }, false);
            }
        },
        jiaoshui_btn: function () {
            var that = this;
            for (var i = 0; i < that.jiaoshui.length; i++) {
                that.jiaoshui[i].index = i;
                that.jiaoshui[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.jiaoshui[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    //alert("浇水第"+this.index+"地")
                    var landNum = this.index + 1;
                    var disasterType = 'goWater';

                    $.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=operationDisaster",
                        data: {landNum: landNum, disasterType: disasterType},
                        dataType: "json",
                        beforeSend: function () {
                            $("#mengban").show();
                        },
                        success: function (data) {

                            datas = eval(data)

                            if (datas.reTips == 'Success') {
                                $(".shade").css("display", "block");
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                                //that.getLandCropsImg(landNum);
                                //location.reload()
                                that.clear_btn();
                                that.btn_animate.ajaxReturnLand();
                            } else {
                                $(".shade").css("display", "block");
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                            }

                            $("#mengban").hide();

                        },
                    })
                    /*if(this.index == 2){
                     $(".shade").css("display","block");
                     $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_chenggong").html("浇水成功")
                     setTimeout(function(){
                     $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_chenggong").css("display","none");
                     $(".shade").css("display","none");
                     },800)
                     },1500)
                     }else{
                     $(".shade").css("display","block");
                     $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_shibai").html("浇水失败，材料不足")
                     setTimeout(function(){
                     $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_shibai").css("display","none");
                     $(".shade").css("display","none");
                     },800)
                     },1500)
                     }*/
                }, false);
            }
        },
        shifei_btn: function () {
            var that = this;
            for (var i = 0; i < that.shifei.length; i++) {
                that.shifei[i].index = i;
                that.shifei[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.shifei[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    $(".shade").css("display", "block");
                    $(".shifeiAlert").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                    if (this.index == 3) {
                        that.shifeiYes_btn(true);
                    } else {
                        that.shifeiYes_btn(false);
                    }
                }, false);
            }
        },
        shouge_btn: function () {
            var that = this;
            for (var i = 0; i < that.shouge.length; i++) {
                that.shouge[i].index = i;
                that.shouge[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.shouge[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    /*alert("收割第"+this.index+"地")*/
                    var landNum = this.index + 1;
					$(".shougeAlert .slandNum").val(landNum)
                    $(".shade").css("display", "block");
                    $(".shougeAlert").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                    $(".getPlant").html(landNum);				
                    // $.ajax({
                        // type: "POST",
                        // url: APP + "/Farm/gainCrops.html",
                        // data: {landNum: landNum},
                        // dataType: "json",
                        // beforeSend: function () {
                            // $("#mengban").show();
                        // },
                        // success: function (datas) {

                            // if (datas.code == 1) {
                                // $(".shade").css("display", "block");
                                // $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                // $(".duihuan_chenggong").html(datas.msg)
                                // setTimeout(function () {
                                    // $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    // setTimeout(function () {
                                        // $(".duihuan_chenggong").css("display", "none");
                                        // $(".shade").css("display", "none");
                                    // }, 800)
                                // }, 1500)
                                // that.clear_btn();
                                // that.getLandCropsImg(landNum);
                                // location.reload()
                            // } else {
                                // $(".shade").css("display", "block");
                                // $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                // $(".duihuan_shibai").html(datas.msg)
                                // setTimeout(function () {
                                    // $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    // setTimeout(function () {
                                        // $(".duihuan_shibai").css("display", "none");
                                        // $(".shade").css("display", "none");
                                    // }, 800)
                                // }, 1500)
                            // }

                            // $("#mengban").hide();

                        // },
                    // })

                    /*if(this.index == 4){
                     $(".shade").css("display","block");
                     $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_chenggong").html("收割成功")
                     setTimeout(function(){
                     $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_chenggong").css("display","none");
                     $(".shade").css("display","none");
                     },800)
                     },1500)
                     }else{
                     $(".shade").css("display","block");
                     $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                     $(".duihuan_shibai").html("收割失败，作物未熟")
                     setTimeout(function(){
                     $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                     setTimeout(function(){
                     $(".duihuan_shibai").css("display","none");
                     $(".shade").css("display","none");
                     },800)
                     },1500)
                     }*/
                }, false);
            }
        },
        xinxi_btn: function () {
            var that = this;
            for (var i = 0; i < that.xinxi.length; i++) {
                that.xinxi[i].index = i;
                that.xinxi[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.xinxi[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    //alert("信息第"+this.index+"地")
                    //var landId=$(".xinxi_chanchu_chuchong").eq(this.index).find("input").val();
                    var landId=$(this).parent().find('input').val();
					//alert("信息第"+landId+"地")
                    $.ajax({
                    type: "POST",
                    url: APP + "?m=user&a=hintInfo",
                    data: {landid: landId},
                    dataType: "json",               
                    success: function (datas) {

                        if (datas.code == 1) {
                        	var jindu=datas.jindu;
                        	var basetime=datas.basetime;
                            var hour=parseInt((basetime-jindu)/3600);
                            var min=parseInt((basetime-jindu)%3600/60);
                            var sec=(basetime-jindu)%3600%60;
                            $('.jindu_info').html(hour+'小时'+min+'分钟'+sec+'秒'+datas.info);
                            $('.whb').css('width', jindu / basetime * 100 + '%');
                            xin=setInterval(function () {
                                jindu++;
                                var hour=parseInt((basetime-jindu)/3600);
                                var min=parseInt((basetime-jindu)%3600/60);
                                var sec=(basetime-jindu)%3600%60;
                                if(jindu<=basetime){
                                    $('.whb').css('width', jindu / basetime * 100 + '%');
                                    $('.jindu_info').html(hour+'小时'+min+'分钟'+sec+'秒'+datas.info);
                                }else{
                                    $('.whb').css('width', '100%');
                                    $('.jindu_info').html('0小时0分钟0秒'+datas.info);
                                }
                            }, 1000);
                        	//$('.whb').css('width', jindu / basetime * 100 + '%');                 	
                        	$(".shade").css("display", "block");
                    		$(".xinxiAlert").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                    		$('.jindu_jd').html('阶段：'+datas.shiqi);
                    		$('.jindu_crops').html(datas.crops);
                    		that.clear_btn();
                         
                        } else {
                        	alert(datas.msg);
                            that.clear_btn();
                        }

                    },
                    error:function(data){
                        console.log(data);
                    }
                })
                    
                    
                }, false);
            }
        },
        bozhongYes_btn: function () {
            var that = this;
            that.bozhongYes.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.bozhongYes.classList.add("rubberBand");
                setTimeout(function () {
                    $(".bozhongYes").removeClass("rubberBand")
                }, 100)
                that.btn_animate.yinxiao_btn();
            }, false);
            that.bozhongYes.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".bozhongAlert").css("display", "none");
                var landNum = $(".bozhongAlert").find('.landNum').val()

                $.ajax({
                    type: "POST",
                    url: APP + "?m=user&a=plantSeeds",
                    data: {landNum: landNum},
                    dataType: "json",
                    beforeSend: function () {
                        $("#mengban").show();
                    },
                    success: function (datas) {

                        if (datas.code == 1) {
							
                            $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".duihuan_chenggong").html(datas.msg)
                            setTimeout(function () {
                                $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                $(".bozhongAlert").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_chenggong").css("display", "none");
                                    $(".bozhongAlert").css("display", "none");
                                    $(".shade").css("display", "none");
                                }, 800)
                            }, 1500)
							$("#memberGoldTop").html(datas.gold);
                            that.clear_btn();
                            that.getLandCropsImg(landNum);
                            //location.reload()
                        } else {
                            $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".duihuan_shibai").html(datas.msg)
                            setTimeout(function () {
                                $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                $(".bozhongAlert").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_shibai").css("display", "none");
                                    $(".bozhongAlert").css("display", "none");
                                    
                                    $(".shangdianBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
                                }, 800)
                            }, 1500)
                        }

                        $("#mengban").hide();

                    },
                })

                /*if(that.flag == true){
                 $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                 $(".duihuan_chenggong").html("播种成功")
                 setTimeout(function(){
                 $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                 $(".bozhongAlert").removeClass("bounceIn").addClass("bounceOut");
                 setTimeout(function(){
                 $(".duihuan_chenggong").css("display","none");
                 $(".bozhongAlert").css("display","none");
                 $(".shade").css("display","none");
                 },800)
                 },1500)
                 }else{
                 $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                 $(".duihuan_shibai").html("播种失败,材料不足")
                 setTimeout(function(){
                 $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                 $(".bozhongAlert").removeClass("bounceIn").addClass("bounceOut");
                 setTimeout(function(){
                 $(".duihuan_shibai").css("display","none");
                 $(".bozhongAlert").css("display","none");
                 $(".shade").css("display","none");
                 },800)
                 },1500)
                 }*/

            }, false);
        },
        chanchuYes_btn: function () {

            var that = this;
            that.chanchuYes.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.chanchuYes.classList.add("rubberBand");
                setTimeout(function () {
                    $(".chanchuYes").removeClass("rubberBand")
                }, 100)
                that.btn_animate.yinxiao_btn();
            }, false);
            that.chanchuYes.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".chanchuAlert").css("display", "none");
                var landNum=$(".chanchuAlert").find('.clandNum').val()
                $.ajax({
                    type: "POST",
                    url: APP + "?m=user&a=uprootSeed",
                    data: {landNum: landNum},
                    async: true,
                    dataType: "json",
                    beforeSend: function () {
                        $("#mengban").show();
                    },
                    success: function (data) {

                        datas = eval(data)

                        if (datas.reTips == 'Success') {

                            $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".duihuan_chenggong").html(datas.reMsg)
                            setTimeout(function () {
                                $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                $(".chanchuAlert").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_chenggong").css("display", "none");
                                    $(".chanchuAlert").css("display", "none");
                                    $(".shade").css("display", "none");
                                }, 800)
                            }, 1500)

                            that.clear_btn();
                            that.getLandCropsImg(landNum);
                            //location.reload()
                        } else {

                            $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                            $(".duihuan_shibai").html(datas.reMsg)
                            setTimeout(function () {
                                $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                $(".chanchuAlert").removeClass("bounceIn").addClass("bounceOut");
                                setTimeout(function () {
                                    $(".duihuan_shibai").css("display", "none");
                                    $(".chanchuAlert").css("display", "none");
                                    $(".shade").css("display", "none");
                                }, 800)
                            }, 1500)

                        }

                        $("#mengban").hide();

                    },
                })

                /*if(that.flag == true){
                 $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                 $(".duihuan_chenggong").html("铲除成功")
                 setTimeout(function(){
                 $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                 $(".chanchuAlert").removeClass("bounceIn").addClass("bounceOut");
                 setTimeout(function(){
                 $(".duihuan_chenggong").css("display","none");
                 $(".chanchuAlert").css("display","none");
                 $(".shade").css("display","none");
                 },800)
                 },1500)
                 }else{
                 $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                 $(".duihuan_shibai").html("铲除失败,金币不足")
                 setTimeout(function(){
                 $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                 $(".chanchuAlert").removeClass("bounceIn").addClass("bounceOut");
                 setTimeout(function(){
                 $(".duihuan_shibai").css("display","none");
                 $(".chanchuAlert").css("display","none");
                 $(".shade").css("display","none");
                 },800)
                 },1500)
                 }*/

            }, false);
        },
        shougeYes_btn: function () {

            var that = this;
            that.shougeYes.addEventListener("touchstart", function (e) {
                e.preventDefault();
                that.shougeYes.classList.add("rubberBand");
                setTimeout(function () {
                    $(".shougeYes").removeClass("rubberBand")
                }, 100)
                that.btn_animate.yinxiao_btn();
            }, false);
            that.shougeYes.addEventListener("touchend", function (e) {
                e.preventDefault();
                $(".shougeAlert").css("display", "none");
                var landNum=$(".shougeAlert").find('.slandNum').val()
				var landNum2=landNum - 1;
				   //alert(landNum);
					$.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=gainCrops",
                        data: {landNum: landNum},
                        dataType: "json",
                        beforeSend: function () {
                            $("#mengban").show();
                        },
                        success: function (datas) {

                            if (datas.code == 1) {
                                $(".shade").css("display", "block");
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.msg)
$('.easte li').eq(landNum2).find('.zuowu').css('opacity', '1');								
$('.easte li').eq(landNum2).find('.zuowu').attr('src', PUBLIC + '/gold/img/index/zw.png');
$(".easte li").eq(landNum2).removeClass();
$(".easte li").eq(landNum2).addClass("qingli");
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                                that.clear_btn();
                                that.getLandCropsImg(landNum);
                               
                            } else {
                                $(".shade").css("display", "block");
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.msg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                            }

                            $("#mengban").hide();

                        },
                    })

                /*if(that.flag == true){
                 $(".duihuan_chenggong").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                 $(".duihuan_chenggong").html("铲除成功")
                 setTimeout(function(){
                 $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                 $(".chanchuAlert").removeClass("bounceIn").addClass("bounceOut");
                 setTimeout(function(){
                 $(".duihuan_chenggong").css("display","none");
                 $(".chanchuAlert").css("display","none");
                 $(".shade").css("display","none");
                 },800)
                 },1500)
                 }else{
                 $(".duihuan_shibai").css("display","block").removeClass("bounceOut").addClass("bounceIn");
                 $(".duihuan_shibai").html("铲除失败,金币不足")
                 setTimeout(function(){
                 $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                 $(".chanchuAlert").removeClass("bounceIn").addClass("bounceOut");
                 setTimeout(function(){
                 $(".duihuan_shibai").css("display","none");
                 $(".chanchuAlert").css("display","none");
                 $(".shade").css("display","none");
                 },800)
                 },1500)
                 }*/

            }, false);
        },		
            shifei_btn: function () {
            var that = this;
            for (var i = 0; i < that.shifei.length; i++) {
                that.shifei[i].index = i;
                that.shifei[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.shifei[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    //alert("施肥第"+this.index+"地")
                    var landNum = this.index + 1;
                    var disasterType = 'shifei';

                    $.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=operationDisaster",
                        data: {landNum: landNum, disasterType: disasterType},
                        dataType: "json",
                        beforeSend: function () {
                            $("#mengban").show();
                        },
                        success: function (data) {

                            datas = eval(data)

                            if (datas.reTips == 'Success') {
                                $(".shade").css("display", "block");
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                                //that.getLandCropsImg(landNum);
                                //location.reload()
                                that.clear_btn();
                                that.btn_animate.ajaxReturnLand();
                            } else {
                                $(".shade").css("display", "block");
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                            }

                            $("#mengban").hide();

                        },
                    })


                }, false);
            }
        },
        chucao_btn: function () {
            var that = this;
            for (var i = 0; i < that.chucao.length; i++) {
                that.chucao[i].index = i;
                that.chucao[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.chucao[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    /*alert("除草第"+this.index+"地")*/
                    var landNum = this.index + 1;
                    var disasterType = 'goWeed';

                    $.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=operationDisaster",
                        data: {landNum: landNum, disasterType: disasterType},
                        dataType: "json",
                        beforeSend: function () {
                            $("#mengban").show();
                        },
                        success: function (data) {

                            datas = eval(data)

                            if (datas.reTips == 'Success') {
                                $(".shade").css("display", "block");
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                                //that.getLandCropsImg(landNum);
                                //location.reload()
                                that.clear_btn();
                                that.btn_animate.ajaxReturnLand();
                            } else {
                                $(".shade").css("display", "block");
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                            }

                            $("#mengban").hide();

                        },
                    })


                }, false);
            }
        },
        chuchong_btn: function () {
            var that = this;
            for (var i = 0; i < that.chuchong.length; i++) {
                that.chuchong[i].index = i;
                that.chuchong[i].addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    that.btn_animate.yinxiao_btn();
                }, false);
                that.chuchong[i].addEventListener("touchend", function (e) {
                    e.preventDefault();
                    /*alert("除虫第"+this.index+"地")*/
                    var landNum = this.index + 1;
                    var disasterType = 'goBug';

                    $.ajax({
                        type: "POST",
                        url: APP + "?m=user&a=operationDisaster",
                        data: {landNum: landNum, disasterType: disasterType},
                        dataType: "json",
                        beforeSend: function () {
                            $("#mengban").show();
                        },
                        success: function (data) {

                            datas = eval(data)

                            if (datas.reTips == 'Success') {
                                $(".shade").css("display", "block");
                                $(".duihuan_chenggong").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_chenggong").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_chenggong").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_chenggong").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                                //that.getLandCropsImg(landNum);
                                //location.reload()
                                that.clear_btn();
                                that.btn_animate.ajaxReturnLand();
                            } else {
                                $(".shade").css("display", "block");
                                $(".duihuan_shibai").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                                $(".duihuan_shibai").html(datas.reMsg)
                                setTimeout(function () {
                                    $(".duihuan_shibai").removeClass("bounceIn").addClass("bounceOut");
                                    setTimeout(function () {
                                        $(".duihuan_shibai").css("display", "none");
                                        $(".shade").css("display", "none");
                                    }, 800)
                                }, 1500)
                            }

                            $("#mengban").hide();

                        },
                    })


                }, false);
            }
        },
        sicoZhezhao_btn: function () {
            var that = this;

            that.sicoZhezhao.addEventListener("touchstart", function (e) {
                e.preventDefault();
            }, false);
            that.sicoZhezhao.addEventListener("touchend", function (e) {
                e.preventDefault();
                that.clear_btn();
            }, false);

        },
        getLandCropsImg: function (landNum) {

            var that = this;

            landNumView = landNum - 1;

            $.ajax({
                type: "POST",
                url: APP + "?m=user&a=getLandCropsImg",
                data: {landNum: landNum},
                dataType: "json",
                success: function (data) {

                    datas = eval(data)

                    $('.easte li').eq(landNumView).find('.zuowu').attr('src', PUBLIC + datas.reImg);
                    $('.easte li').eq(landNumView).parent().find('li').eq(landNumView).attr('class', datas.reCtrl);

                    if (datas.reStatus == '0') {
                        $('.easte li').eq(landNumView).find('.zuowu').css('opacity', '0');
                    } else {
                        $('.easte li').eq(landNumView).find('.zuowu').css('opacity', '0');
                    }

                    console.log(PUBLIC+datas.reImg);
                     console.log(datas.reCtrl);
                     console.log(landNum);

                    that.clear_btn();

                },
            })

        },
        clear_btn: function () {
            $(".caozuoBtn").css({
                "opacity": 0,
                "right": "0.4rem",
                "bottom": 0,
                "z-index": 0
            })
        }
    };
    var playGame = new game();
    playGame.play();

//金币掉落

    var arr = []
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;
    var iconImgBox = document.getElementById("iconImgBox");
    function iconAnimate() {
        for (var i = 0; i < 20; i++) {
            var div = document.createElement("img");
            div.src = PUBLIC + "/gold/img/icon.png";
            div.className = "ceshiImg";
            div.style.cssText = "width:30px;height:30px;position: absolute;left:" + ((Math.random() * (cw - 10)) + 5) + "px;top:-50px;background:none;"
            arr.push(div)
            iconImgBox.appendChild(div)
        }
        for (var i = 0; i < arr.length; i++) {
            arr[i].className = "iconAnimate";
            $(".iconAnimate").each(function () {
                $(this).css({
                    "-webkit-animation-duration": (4 + 5 * Math.random()) + "s",
                    "animation-duration": (4 + 5 * Math.random()) + "s"
                })
            })
        }
        setTimeout(function () {
            $("#iconImgBox").empty();
        }, 8000)
    }
//开启宝箱

    // $(".cangkuBot li:last .cangluList").click(function () {
        // var code = $(this).attr('code');

        // if (code != 'comCopperChest' && code != 'comGoldChest' && code != 'comSilverChest')
        // {
            // 不等于金银铜宝箱
            // return false;
        // } else {
            // $("#boxCode").val(code);
            // switch (code)
            // {
                // case 'comGoldChest':
                    // $(".alertBox").css({"background": "url(" + PUBLIC + "/gold/img/index/caozuoAlert/goldBox.png)", "background-size": "cover"});
                    // break;
                // case 'comSilverChest':
                    // $(".alertBox").css({"background": "url(" + PUBLIC + "/gold/img/index/caozuoAlert/silverBox.png)", "background-size": "cover"});
                    // break;
                // case 'comCopperChest':
                    // $(".alertBox").css({"background": "url(" + PUBLIC + "/gold/img/index/caozuoAlert/copperBox.png)", "background-size": "cover"});
                    // break;
            // }
            // $.ajax({
                // type: "POST",
                // url: APP + "/Farm/boxCost.html",
                // data: {code: code},				
                // dataType: "html",
				// beforeSend:function(){
					
				// },
                // success: function (data) {					
                    // $(".getnum").text(data);
					
                    // return false;
                // },
                // error: function () {
                    // alert("网络错误");
					
                    // return false;
                // }
            // })
            // $(".alertBox").css("display", "block").removeClass("bounceOut").addClass("bounceIn")
            // return false;
        // }
    // })
//    setInterval(function () {
//        iconAnimate()
//    }, 20000)
//    iconAnimate()
    /* 
     * 
     */
    $(".alertBox a").click(function () {
        var code = $("#boxCode").val();
        $.ajax({
            type: "POST",
            url: APP + "?m=user&a=comCopperChest",
            data: {code: code},
            dataType: "json",
            beforeSend: function () {
				$("#mengban").show();
            },
            success: function (data) {
				if(data.code == 1)
				{
				iconAnimate();					
				}
				$("#mengban").hide();
                $(".alertBox div:last").text(data.msg);
                $(".alertBox div:nth-of-type(2)").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                setTimeout(function () {
                    $(".alertBox div:nth-of-type(2)").removeClass("bounceIn").addClass("bounceOut");
                    setTimeout(function () {
                        $(".alertBox div:nth-of-type(2)").css("display", "none")
                    }, 800)
                    setTimeout(function () {
                        $(".alertBox").css("display", "none")
                    }, 1000)
                }, 1200)
                return false;
            },
            error: function () {
				$("#mengban").hide();
                $(".alertBox div:last").text("网络错误");
                $(".alertBox div:nth-of-type(2)").css("display", "block").removeClass("bounceOut").addClass("bounceIn");
                setTimeout(function () {
                    $(".alertBox div:nth-of-type(2)").removeClass("bounceIn").addClass("bounceOut");
                    setTimeout(function () {
                        $(".alertBox div:nth-of-type(2)").css("display", "none")
                    }, 800)
                    setTimeout(function () {
                        $(".alertBox").css("display", "none")
                    }, 1000)
                }, 1200)
				
                return false;
            }

        })


        //$(".alertBox").css("display","none").removeClass("bounceIn").addClass("bounceOut") 
    })

    $(".alertBox div:nth-of-type(1)").click(function () {
        $(this).parent().hide();
    })
    $(".gerenMes img").click(function () {
        $(".choosePicture").css("display", "block").addClass("bounceIn").removeClass("bounceOut")
        $(".shade").css("display", "none")
        $(".gerenMesBox").css("display", "none").addClass("bounceOut").removeClass("bounceIn")
    })
    $(".choose div").click(function () {
        $(".choosePicture").css("display", "none").addClass("bounceOut").removeClass("bounceIn")
    })
    $(".choosePicture a").click(function () {
        $(".choosePicture").css("display", "none").addClass("bounceOut").removeClass("bounceIn")
    })
    setTimeout(function () {
        $("#mengban").css("display", "none")
    }, 3000)

    //头像点击事件
    $('.headimg img').click(function () {
        var hid = $(this).attr('id');
        $.ajax({
            type: "POST",
            url: APP + "/Farm/setHead.html",
            data: {hid: hid},
            dataType: "json",
            success: function (data) {
                if (data.code) {
                    var himg = data.himg
                    $('.gerenBox img').attr('src', himg)
                    $('.gerenMes img').attr('src', himg)
                }
            }
        })
    })

})

//购买或者兑换时更新仓库
function updateCangku(){
  $.ajax({
                type:'post',
                dataType:'json',
                url: APP + "?m=user&a=updateCangku",
                success:function(data){
                    
                    var list1 = data.data1;
                    var list2 = data.data2;
                    var list3 = data.data3;
                    var list4 = data.data4;
                        var html1 = '';
                        var html2 = '';
                        var html3 = '';
                        var html4 = '';
                        for (i in list1) {
                            var industry1 = list1[i];
                            html1 += '<div class="cangluList">\
                            <img src="'+PUBLIC+'/UploadFiles_s/'+industry1.crops_fruit_img+'" alt="" />\
                            <span>x'+ industry1.ware_goods_count+'</span></div>';
                        }
                        for (i in list2) {
                            var industry2 = list2[i];
                            html2 += '<div class="cangluList">\
                            <img src="'+PUBLIC+'/UploadFiles_s/'+industry2.crops_fruit_img+'" alt="" />\
                            <span>x'+ industry2.ware_goods_count+'</span></div>';
                        }
                        for (i in list3) {
                            var industry3 = list3[i];
                            html3 += '<div class="cangluList">\
                            <img src="'+PUBLIC+'/UploadFiles_s/'+industry3.crops_fruit_img+'" alt="" />\
                            <span>x'+ industry3.ware_goods_count+'</span></div>';
                        }
                        for (i in list4) {
                            var industry4 = list4[i];
                            html4 += '<div class="cangluList">\
                            <img src="'+PUBLIC+'/UploadFiles_s/'+industry4.crops_fruit_img+'" alt="" />\
                            <span>x'+ industry4.ware_goods_count+'</span></div>';
                        }
                   
                    var cha1=25-list1.length;
                    var cha2=25-list2.length;
                    var cha3=25-list3.length;
                    var cha4=25-list4.length;
                    
                    $('.cangkuBot li').eq(0).html(html1);
                    $('.cangkuBot li').eq(1).html(html2);
                    $('.cangkuBot li').eq(2).html(html3);
                    $('.cangkuBot li').eq(3).html(html4);

                    for(i=0;i<cha1;i++){
                     $('.cangkuBot li').eq(0).append('<div class="cangluList">\
                           </div>');
                    }
                    for(i=0;i<cha2;i++){
                     $('.cangkuBot li').eq(1).append('<div class="cangluList">\
                           </div>');
                    }
                    for(i=0;i<cha3;i++){
                     $('.cangkuBot li').eq(2).append('<div class="cangluList">\
                           </div>');
                    }
                    for(i=0;i<cha4;i++){
                     $('.cangkuBot li').eq(3).append('<div class="cangluList">\
                           </div>');
                    }
                }
            });
}
