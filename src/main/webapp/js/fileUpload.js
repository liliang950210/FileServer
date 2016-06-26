function FileUpload(buttonId,fileNameId,returnImageUrlId){
	alert("in");
		   	document.getElementById(buttonId).disabled=true;
		    var files = document.getElementById(fileNameId).files;
		    var filesName = document.getElementById(fileNameId).value;
		    fileExt = filesName.substring(filesName.lastIndexOf(".") + 1);
		    console.log("result=="+fileExt);
		    var formData = new FormData();
			formData.append('filename', files[0]); 
			formData.append('fileExt', fileExt);
		    $.ajax({
		    	url: '/fileUploadAll',
			    type: 'POST',
			    cache: false,
			    data: formData,
			    processData: false,
			    contentType: false,
			    success:function(result){
			   // console.log("result=="+result);
			    var json =$.parseJSON(result);
				console.log("result.data=="+result.code+"date=="+json.code);
				if(json.code == 0){
			    		var imagespath = json.imageUrl;
			    		document.getElementById(returnImageUrlId).value=imagespath;
			    		alert("上传成功");
			    		document.getElementById(buttonId).disabled=false;
			    	}else{
			    	   alert("上传失败");
			    	   document.getElementById(buttonId).disabled=false;
			    	}
			    },
			    error:function(){
			    document.getElementById(buttonId).disabled=false;
			    console.log("上传失败");
			    }
		    });
		   }