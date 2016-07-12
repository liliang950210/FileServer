<html>

<head>
<meta charset="utf-8">
<script type="text/javascript" src="js/jquery-1.8.2.js"></script>
<script type="text/javascript" src="js/json.js"></script>
<script type="text/javascript" src="js/fileUpload.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>
</head>
<body onload="getSession()">
<h2>Hello World!</h2>
<input type="text" id="test"><br>
验证码<input type="text" id="code" onclick="">
<input type="button" onclick="testSession()" value="测试">
<script type="text/javascript">
	var GET_URL = "";
	 function getSession(){
		var url = GET_URL + "file/addSession";
		$.ajax({
			url:url,
			success:function(result){
				if(result.code==1){
					alert(result.data);
				}
			},
			error:function(){
				
			}
		});
	}
	function testSession(){
		var code = $('#code').val();
		var url = GET_URL + "file/getSession"
		$.ajax({
			url:url,
			data:{"rand":code},
			success:function(result){
				if(result.code==1){
					alert("success");
				}
			}
		});
	}
</script>

</body>
</html>
