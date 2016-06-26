<%@ page language="java" contentType="text/html;v"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery-1.8.2.js"></script>
<script type="text/javascript" src="js/json.js"></script>
<script type="text/javascript" src="js/fileUpload.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>
</head>

<body onload="loadData()">
<h1 align="center">医院管理</h1>

<form  id="addHospital" action="" method="post">
	医院名称<input type="text" id="name" name="name"><br/>
	地          区<select id="positionSelect" name="positionId"></select><br>
	图	    片 <img alt="" width="200" height="200" id="img" name="image" src=""> <br>
	上传图片<input type="file"  id="fileName" name="file" value="选择要上传的图片"><input type="button" value="提交" onclick="upload()" ><br>
	描	    述<input type="text"  id="desc" name="desc"><br>
	医院等级<select id="classSelect" name="hospitalClass">
				<option value="一级甲等">一级甲等</option>
				<option value="一级乙等">一级乙等</option>
				<option value="一级丙等">一级丙等</option>
				<option value="二级甲等">二级甲等</option>
				<option value="二级乙等">二级乙等</option>
				<option value="二级丙等">二级丙等</option>
				<option value="三级甲等">三级甲等</option>
				<option value="三级乙等">三级乙等</option>
				<option value="三级丙等"	>三级丙等</option>
				<option value="三级特级">三级特级</option>
			</select><br>
	电	    话<input type="text" id="phone" name="phone"><br>
	地	    址<input type="text" id="address" name="address"><br>
	<input type="button" value="提交" onclick="addHospital()">
	<input type="button" onclick="testCookie()" value="test">
<script language="javascript" type="text/javascript">
	function addHospital(){
		var positionId = $("#positionSelect").val();
		var name = $("#name").val();
		var hospitalClass = $("#classSelect").val();
		var image = $("#img").attr("src");
		var desc = $("#desc").val();
		var phone = $("#phone").val();
		var address = $("#address").val();
		if(null==name||name==""){
			alert("医院名字为空！");
			return ;
		}
		alert(positionId + name + hospitalClass)
		$.ajax({
            cache: true,
            type: "POST",
            url:"manage/addHospital",
            data:{"name":name,"positionId":positionId,"hospitalClass":hospitalClass,"image":image,
            	"desc":desc,"phone":phone,"address":address},
            async: false,
            error: function(request) {
                alert("Connection error");
            },
            success: function(result) {
            	if(result.code==1){
            		alert("添加成功");
            		location.assign('showHospital.jsp');
            	}
            	else{
            		alert(result.error);
            	}
            	 
            } 
        });
	
} 
	 function upload(){
		 
		var files = document.getElementById('fileName').files;
		var fileName = document.getElementById('fileName').value;
		var fileExt = fileName.substring(fileName.lastIndexOf(".")+1);
		var formData = new FormData();
		formData.append('file',files[0]);
		formData.append('fileExt',fileExt);
		$.ajax({
			url:"file/upload2",
			type: 'POST',  
	          data: formData,  
	          async: false,  
	          cache: false,  
	          contentType: false,  
	          processData: false,  
		 
			success:function(data){
				//var json = $.parseJSON(data);
				if(data.code==1){
					alert("上传成功");
					  alert(data.data);
		              $("#img").attr("src",data.data);
		            
				}else{
					alert(data.error);
				}
			},
			error:function(){
				alert("上传失败！");
			}
			
		});
	} 
	 function  loadData(){
		 $.ajax({
			 type:'post',
			 url:'manage/getPosition',
			 success:function(result){
				 if(result.code==1){
					 var list = result.data;
					 for(var i=0;i<list.length;i++){
						 var option = new Option(list[i].name,list[i].id);
						 var select = document.getElementById("positionSelect");
						 select.appendChild(option);
					 }
				 }
			 },
			 error:function(){}
		 });
	 }
	function testCookie(){
		$.cookie("test","testhaha",{expires:365});
		location.replace('testCook.jsp');
	}
	</script>
				

</form>
</body>
</html>