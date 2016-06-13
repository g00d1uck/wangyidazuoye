(function(){
function H$(id){return document.getElementById(id)} 
	var Don={
		   bar:H$('bar'),
		   bar_colse:H$('bar_colse'),
		   focusb:H$('focus'),
		   form:H$('focus'),
		   log_close:H$('login_close'),
		   btn:H$('login'),
		   mask:H$('mask'),
		   courseDetail:H$('courseDetail'),
		   login_block:H$('login_block'),
		   videoId:H$('video'),
		   videoGate : H$('video_gate')
		  }
	var  tabDesign=H$('tab_design'),
		tabProgram=H$('tab_program'),
		pagesId=H$('pageList');

   var  video=Don.videoId.getElementsByTagName('video')[0];
 var videoClose = Don.videoId.querySelectorAll('.video_close')[0];
function control(){
	//关注事件
	Don.focusb.addEventListener('click',function(){
		Don.login_block.style.display='block';
		Don.mask.style.display='block';
	})
	
	Don.log_close.addEventListener('click',function(){
		Don.login_block.style.display='none';
		Don.mask.style.display='none';},false)
	//bar事件
	Don.bar_colse.addEventListener('click',function(){
	Don.bar.style.display='none';
	},false);
	
	//视频弹窗
	Don.videoGate.addEventListener('click', function(){
	Don.videoId.style.display='block';
	Don.mask.style.display='block';
	},false);
	 videoClose.addEventListener('click',function(){
	Don.videoId.style.display = 'none';
	Don.mask.style.display = 'none';
	Don.video.pause();
	},false);
}
control();


/* * ajax函数说明
 * @param  {obj} option :{
 *          method: 'GET', 通过ajax的方法
			data: {
				'pageNo': 1,  当前页码
				'psize':20,	  每页返回个数
				'type':10     返回当前页面的类型 产品设计type=10 编程语言type=20
			},
			url: 'http://study.163.com/webDev/couresByCategory.htm', 请求数据的地址
			callback: bulidCourseContent   回调函数
 * }
 * 
 */

/**
 * 构建课程列表卡片 及添加onmouseover事件
 * ---------------------------------------------------
 * 默认样式如下：
 * 		<li class="courseList">	
			<img src="#" class="course-img "alt="课程图片"/>
			<div class="li_say">
				<a href="#">混音全揭秘 舞曲实战篇 揭秘音乐揭秘音乐揭秘音乐</a>
				<p>音频帮</p>
				<p class="tab_pic"></p>
				<div class="de_price">&yen;800.00
				</div>
			</div>
			<div class="cover">
				<img src="#" class="course-img "alt="课程图片"/>
				<p class="cover-name"></p>
				<p class="cover-student"></p>
				<p class="cover-provide"></p>
				<p class="cover-category"></p>
				<div class="cover-describe">
					<p class="cover-describe-content"></p>
				</div>
			</div>
		</li>
 */

var ajax = function(option){
	var xhr = new XMLHttpRequest();
	var urlContent,
		method = option.method;
		if(option.data !== null){
			askData = option.data;
			var arr = []
			for(var i in askData){
				arr.push(encodeURIComponent(i) + '=' +encodeURIComponent(askData[i]));
			}
				urlContent = option.url + arr.join('&');
		}else{
				urlContent = option.url;
		}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
				
              		option.callback(xhr.responseText);
              	
			}
		}
	xhr.open(method, urlContent, true);
	xhr.send();
}
//创建课程卡片结构
var bulidCourseContent = function(backText){
	var courseList = JSON.parse(backText);
	var numItem = courseList.pagination.pageSize;
	var html = '';
	for(var i=0 ;i < numItem ; i++){

		html += '<li class="courseList">';
		html += '<img class="course-img" alt="课程图片" src="'+ courseList.list[i].bigPhotoUrl  + '"/>';
		html += '<div class="li_say">';
		html += '<a href="#">' + courseList.list[i].name + '</a>';
		html += '<p>' + courseList.list[i].provider + '</p>';
		html += '<p class="tab_pic">' + courseList.list[i].learnerCount + '</p>';
		if(courseList.list[i].price !== 0){
			html += '<div class="de_price">&yen;' + courseList.list[i].price + '</div>';				
		}else{
			html += '<div class="de_price">免费</div>';
		}
		html += '</div>';
		html += '<div class="cover">';
		html += '<img class="course-img" alt="课程图片" src="'+ courseList.list[i].bigPhotoUrl+'"/>';
		html += '<p class="cover-name">' + courseList.list[i].name + '</p>';
		html += '<p class="cover-student">' + courseList.list[i].learnerCount + '人在学</p>';
		html += '<p class="cover-provide">发布者：' + courseList.list[i].provider + '</p>';
		if(courseList.list[i].categoryName === null){
			html += '<p class="cover-category">分类：无</p>';
		}else{		
			html += '<p class="cover-category">分类：' + courseList.list[i].categoryName + '</p>';
		}
		html += '<div class="cover-describe"><p class="cover-describe-content">'+ courseList.list[i].description  +'</p></div>';
		html += '</div>';
		html += '</li>';
	
	}
	Don.courseDetail.innerHTML = html;
	var courseLi = Don.courseDetail.querySelectorAll('.courseList');
	for(var i =0 ;i < courseLi.length; i++){
		courseLi[i].index = i;
		//添加事件 hover出现浮出卡片
		
		courseLi[i].onmouseover = function(){
			this.querySelector('.cover').style.display = 'block';
		}
		
		courseLi[i].onmouseout = function(){
			this.querySelector('.cover').style.display = 'none';
		}
	}

}
	
//调用ajax获取列表 并显示在页面 当前页面为默认页面

//默认选项
var defaultCourseOption={
				method: 'GET',
				data: {
					'pageNo': 1,
					'psize':20,
					'type':10
				},
				url: 'http://study.163.com/webDev/couresByCategory.htm?',
				callback: bulidCourseContent
			};
var curPagePlay = function(){
		ajax(defaultCourseOption);

	};
curPagePlay();

//获得两个按钮并未两个按钮添加事件


tabDesign.onmousedown = function(){
	tabDesign.className = 'choose';
	tabProgram.className = '';
	defaultCourseOption.data.type = 10;
	defaultCourseOption.data.pageNo = 1;
	curPagePlay();
	defaultCourseList.data.pageNo = 1;
	pageListplay();
}
tabProgram.onmousedown = function(){
	tabDesign.className = '';
	tabProgram.className = 'choose';
	defaultCourseOption.data.type = 20;
	defaultCourseOption.data.pageNo = 1;
	curPagePlay();
	defaultCourseList.data.pageNo = 1;
	pageListplay();
}

/*
--分页器模块-
-----------------
分页器结构
	<div class="pageList" id="pageList"> //已经存在部分
		<span class="edge left">&lt;</span>
			<ul class="tab_foot">	
				<li class="choose">1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
			</ul>
		<span class="edge right">&gt;</span>
	</div> //已经存在部分
	--------------------------------------------------
		var curPage = courseList.pagination.pageIndex; 当前页面，默认为1
		var totalPages = courseList.totalPage; 页面的总数
		var playLength = 8;分页器每次要显示的页面数量
 
*/
var bulidPageList = function(backText){
		var html = "";
		var courseList = JSON.parse(backText);
		//由于从第五页开始courseList.pagination.pageIndex的数值都为4 导致页码块无法更新
		//找这个问题找了一天 结果发现问题在这儿 真是揪心
		var curPage = courseList.pagination.pageIndex;
		var totalPages = courseList.totalPage;
		var playLength = 8;
       html += '<span class="edge left">&lt;</span>';
		
		html += '<ul class="tab_foot">';
		//调整页码表 实现页码的更新
		var midPoint = Math.ceil(playLength / 2);
		var isMidPage = curPage - midPoint > 0 && curPage <= (totalPages - midPoint); 
		var isEndPage = curPage > (totalPages - midPoint);
		
		var startPage,
		 	pos=0;
		if(isMidPage){
			startPage = curPage - midPoint +1 ;
			pos = midPoint - 1;
		}else if(isEndPage){
			startPage = totalPages - playLength + 1;
			pos = playLength - (totalPages - curPage) -1 ;
		}else{
			startPage = 1;
			pos = curPage - 1;
		}
		
		for(var i = 0; i < playLength ; i++, startPage++){
			if(i === pos){
				html += '<li class="choose">' + startPage + '</li>';
			}else{
			html += '<li>' + startPage + '</li>';
			}
		}
		html += '<span class="edge right">&gt;</span>';
		html += '</div>';

		pagesId.innerHTML = html;

		//给页码表板块添加事件
		var li = pagesId.getElementsByTagName('li');
		var left = pagesId.querySelectorAll('.left')[0];
		var right = pagesId.querySelectorAll('.right')[0];

		left.onmouseover =function(){
			this.style.cursor = 'pointer';
			this.style.background = '#39a030';
		}
		left.onmouseout = function(){
			this.style.background = '#9dd8b1';
		}
		right.onmouseover =function(){
			this.style.cursor = 'pointer';
			this.style.background = '#39a030';
		}
		right.onmouseout = function(){
			this.style.background = '#9dd8b1';
		}
		listEvent(li,left,right,curPage,totalPages);
		
}
//初始化页码表
var defaultCourseList = {
				method: 'GET',
				data: {
					'pageNo': 1,
					'psize':20,
					'type':10
				},
				url: 'http://study.163.com/webDev/couresByCategory.htm?',
				callback: bulidPageList
			};
var pageListplay = function(){
	ajax(defaultCourseList);
};
pageListplay();

//页码表板块事件
var listEvent = function(li,left,right,curPage,totalPages){
		
		for(var i=0; i < li.length; i++){
			li[i].onmouseover = function(){
				this.style.cursor = 'pointer';
				this.style.color = '#39a030';
			}
			li[i].onmouseout = function(){
				this.style.color = '#666';
			}
			li[i].index = i;
			li[i].onmouseup = function(){
				if(parseInt(this.innerHTML) !== curPage){
					
					curPage = parseInt(this.innerHTML);
					defaultCourseList.data.pageNo = curPage;
					defaultCourseOption.data.pageNo = curPage;
					curPagePlay();
					pageListplay();
					
				}
			
			}
		}
		left.onmouseup = function(){
			if(curPage !== 1){
				curPage -=1;
				defaultCourseList.data.pageNo = curPage;
				defaultCourseOption.data.pageNo = curPage;
				curPagePlay();
				pageListplay();
			}
		}
		right.onmouseup = function(){
			if(curPage !== totalPages){
				curPage +=1;
				defaultCourseList.data.pageNo = curPage;
				defaultCourseOption.data.pageNo = curPage;
				curPagePlay();
				pageListplay();
			}
		}
	}

/**
 * 右侧最热排行模块
 * -------------------------
 * 结构
	 	<li class="hotlist-item">
			<img src="#" alt="" class="li_left">
			<a href="#">舞曲揭秘音乐揭秘音乐揭秘</a>
			<div class="li_right"></div>
		</li>
 */
var nextPage = 0;
var listId = document.getElementById('hotlist');

var buildHotList = function(hotList){
	
	var hotList = JSON.parse(hotList);	
	var html = '';
	
	for(var i = nextPage + 10; i > nextPage ; i--){
			html += '<li class="hotlist-item">';
			html += '<img src="'+ hotList[i].smallPhotoUrl +'" alt="" class="li_left"/>';
			html += '<a href="#">' + hotList[i].name + '</a>';
			html +=  '<span class="li_right">'+ hotList[i].learnerCount  +'</span>'
		}
	listId.innerHTML = html;

	//给最热排行添加时间	
	var timmer = setInterval(function(){
		clearInterval(timmer);
		nextPage++;
		if(nextPage === hotList.length - 10){
		nextPage = 0;
		}
		hotListPlay();
		},5000);
}
//初始化最热排行
var defaultHotList = {
		method: 'GET',
		url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
		callback: buildHotList
	}
var hotListPlay = function(){
	ajax(defaultHotList);
}
hotListPlay();

//顶部通知条事件 通过查看设置的本地cookie实现

//轮播图

var fader = new Hongru.fader.init('fader',{ 
id:'fader' 
});

})(); 
	