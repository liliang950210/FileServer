$(function(){
	//alert('successful');
	function resultShow(){
		//alert(location.href);
		var result = getQueryStringArgs(location.href),
			$hospital = $('#hospital-focused'),
			$name = $hospital.children('.name'),
			$img = $hospital.parent('.content').children('img'),
			$adress = $hospital.parent('.content').children('.hospital-focused-address'),
			$phone = $hospital.parent('.content').children('.hospital-focused-phone');
		if(result['hospitalId']){
			$name.html(decodeURIComponent(result['name']));
			$img.html(result['image']);
			$adress.html(decodeURIComponent(result['adress']));
			$phone.html(result['phone']);
		}
		/*根据医院的ID获取医院的所有科室下面的疾病*/
		submitData('get', 'order/getDiseaseOfHospital',result['hospitalId'], resultCallBack, 'hospitalId');
	}
	resultShow();

	function resultCallBack(result){
		var departmentLen = result.data.length,
			roomWrap = '';
		for(var i = 0; i < departmentLen; i++){
			var diseaseListLen = result.data[i].diseaseList.length,
			    liStr = '';
			for(var j = 0; j < diseaseListLen; j++){
				liStr += '<li> '
				       
				     
					  + result.data[i].diseaseList[j].name
			          + '</a></li>';
			}
			roomWrap +='<div class="room-wrap"><span class="room-id">'
				     + result.data[i].departmentName
				     + '</span><ul>'
				     + liStr
				     + '</a></ul></div>';
		}
		$('.wrap').append(roomWrap);
	}
});