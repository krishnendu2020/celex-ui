var generatedIdIncreament= 1 ;
function divLoad(leftId, rightId, loadurl) {
	//alert(loadurl+"----"+$(this).val());
	$('#'+leftId).load(loadurl+' #'+rightId);
}

function changeStatus(id,status,leftId, rightId, loadurl){
	alert(status.value);
	$('#'+leftId).load(loadurl+"?id="+id+"&status="+status.value+' #'+rightId);
}

function ajaxPost(frm, url, leftId, rightId, loadurl) {
	var postAjax = 0;
	var pinCodeValidation = /^\d{5}$/;
	var mobileNumberValidation = /^\d{10}$/;
	var emailIdValidation = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var panNumberValidation =  /[A-Z]{5}[0-9]{4}[A-Z]{1}$/; 
    var gstinNumberValidation =  /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/; 
	if(frm == 'stateMaster'){				
		var stateName = $("#enter-state").val().trim();
		$("#enter-state").val(stateName);
		if($("#enter-state").val().trim() == ""){
				$("#enter-state-note").html("**Please Fill The Required Field!");
				return false;
			}else if($("#enter-state").val().trim() != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {						
						for(var i=0;i<=data.result.length;i++){							
							var result = data.result[i]['stateName'].trim().toLowerCase().replace(/\s/g, '');
							var string = $("#enter-state").val().trim().toLowerCase().replace(/\s/g, '');							
							if(result === string){
								$("#enter-state-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else{
								$("#enter-state-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-state-note").html(" ");
					ajaxInsert();
				}
		   }
	}else if(frm == 'zoneMaster'){
		//alert("hi");
		var zoneName = $("#enter-zone").val().trim();
		var zoneCode = $("#enter-zone-code").val().trim();
		$("#enter-zone").val(zoneName);
		$("#enter-zone-code").val(zoneCode);
		var status=false;  
		if($("#select-zone-state").val().trim() == "0" || $("#enter-zone").val().trim() == "" || $("#enter-zone-code").val().trim() == ""){
			if($("#select-zone-state").val().trim() < "1") 
			{
				$("#select-zone-state-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#select-zone-state-note").html("");
					status=true;  
				}
			if($("#enter-zone").val().trim() == "") 
			{
				$("#enter-zone-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#enter-zone-note").html("");
					status=true;  
				}
			if($("#enter-zone-code").val().trim() == "") 
			{
				$("#enter-zone-code-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#enter-zone-code-note").html("");
					status=true;  
					
				}
		}else if($("#select-zone-state").val().trim() != "0" && $("#enter-zone").val().trim() != "" && $("#enter-zone-code").val().trim() != ""){
			var getAjax = $.ajax({
				async: false,
				type : "GET",
				url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
				success : function( data, status) {					
					for(var i=0;i<=data.result.length;i++){	
						$("#select-zone-state-note").html("");
						var zoneNameResult = data.result[i]['zoneName'].trim().toLowerCase().replace(/\s/g, '');
						var zoneCodeResult = data.result[i]['zoneCode'].trim().toLowerCase().replace(/\s/g, '');
						var zoneIdResult = data.result[i]['id'];
						var zoneNameString = $("#enter-zone").val().trim().toLowerCase().replace(/\s/g, '');							
						var zoneCodeString = $("#enter-zone-code").val().trim().toLowerCase().replace(/\s/g, '');							
						var zoneIdString = $("#zone-id").val();							
						if(zoneNameResult === zoneNameString && zoneCodeResult === zoneCodeString && zoneIdResult != zoneIdString){
							$("#enter-zone-note").html("**Found Duplicate Data!");
							$("#enter-zone-code-note").html("**Found Duplicate Data!");
							postAjax = 121;
							ajaxInsert.abort();
						}else if(zoneNameResult != zoneNameString && zoneCodeResult === zoneCodeString && zoneIdResult != zoneIdString){
							$("#enter-zone-note").html("");
							$("#enter-zone-code-note").html("**Found Duplicate Data!");
							postAjax = 121;
							ajaxInsert.abort();
						}else if(zoneNameResult === zoneNameString && zoneCodeResult != zoneCodeString && zoneIdResult != zoneIdString){
							$("#enter-zone-note").html("**Found Duplicate Data!");
							$("#enter-zone-code-note").html("");
							postAjax = 121;
							ajaxInsert.abort();
						}else if(zoneNameResult != zoneNameString && zoneCodeResult != zoneCodeString){
							$("#enter-zone-note").html("");
							$("#enter-zone-code-note").html("");
							postAjax = 0;
						}
						}},
				error: function(xhr, resp, err) {
		            alert(err);
		        }});
			if(postAjax == 0){
				$("#enter-zone-note").html("");
				$("#enter-zone-code-note").html("");
				ajaxInsert();
			}
	   }
	}else if(frm == 'cityMaster'){
		var status=false; 
		var cityName = $("#enter-city-name").val().trim();
		$("#enter-city-name").val(cityName);
		if($("#enter-city-name").val().trim() == "" || $("#select-city-state").val().trim() == "0"){
			if($("#enter-city-name").val().trim() == "") 
			{
				$("#enter-city-name-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#enter-city-name-note").html("");
					status=true;  
				}
			if($("#select-city-state").val().trim() < "1") 
			{
				$("#select-city-state-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#select-city-state-note").html("");
					status=true;  
				}
		}else if($("#enter-city-name").val().trim() != "" && $("#select-city-state").val().trim() != "0"){
			var getAjax = $.ajax({
				async: false,
				type : "GET",
				url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
				success : function( data, status) {
					$("#select-city-state-note").html("");
					for(var i=0;i<=data.result.length;i++){							
						var cityNameResult = data.result[i]['cityName'].trim().toLowerCase().replace(/\s/g, '');						
						var cityNameString = $("#enter-city-name").val().trim().toLowerCase().replace(/\s/g, '');							
						if(cityNameResult === cityNameString){
							$("#enter-city-name-note").html("**Found Duplicate Data!");
							postAjax = 121;
							ajaxInsert.abort();
						}else {
							$("#enter-city-name-note").html("");
							postAjax = 0;
						}
						}},
				error: function(xhr, resp, err) {
		            alert(err);
		        }});
			if(postAjax == 0){
				$("#enter-zone-note").html("");
				$("#enter-zone-code-note").html("");
				ajaxInsert();
			}
		}
	}else if(frm == 'itemType'){
		var status=false;
		var itemType = $("#enter-item-type").val().trim();
		$("#enter-item-type").val(itemType);
		if(itemType == ""){
			$("#enter-item-type-note").html("**Please Fill The Required Field!");
			return false;
		}else if(itemType != ""){
			var getAjax = $.ajax({
				async: false,
				type : "GET",
				url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
				success : function( data, status) {						
					for(var i=0;i<=data.result.length;i++){							
						var itemTypeResult = data.result[i]['itemTypeName'].trim().toLowerCase().replace(/\s/g, '');
						var itemTypeIdResult = data.result[i]['id'];
						var itemTypeString = $("#enter-item-type").val().trim().toLowerCase().replace(/\s/g, '');							
						var itemTypeIdString = $("#enter-item-type-id").val();							
						if(itemTypeResult === itemTypeString && itemTypeIdResult != itemTypeIdString){
							$("#enter-item-type-note").html("**Found Duplicate Data!");
							postAjax = 121;
							ajaxInsert.abort();
						}else{
							$("#enter-item-type-note").html("");
							postAjax = 0;
						}
						}},
				error: function(xhr, resp, err) {
		            alert(err);
		        }});
			if(postAjax == 0){
				$("#enter-item-type-note").html(" ");
				ajaxInsert();
			}
	   }
	}else if(frm == 'itemMaster'){
		var status=false;
		var itemMaster = $("#enter-item-master-name").val().trim();
		$("#enter-item-master-name").val(itemMaster);
		if(itemMaster == "" || $("#select-item-master-type").val().trim() == "0"){
			if(itemMaster == "") 
			{
				$("#enter-item-master-name-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#enter-item-master-name-note").html("");
					status=true;  
				}
			if($("#select-item-master-type").val().trim() < "1") 
			{
				$("#select-item-master-type-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#select-item-master-type-note").html("");
					status=true;  
				}			
		}else if(itemMaster != "" && $("#select-item-master-type").val().trim() != "0"){
			//alert("hi not null");
			var getAjax = $.ajax({
				async: false,
				type : "GET",
				url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
				success : function( data, status) {						
					for(var i=0;i<=data.result.length;i++){							
						var itemMasterResult = data.result[i]['itemName'].trim().toLowerCase().replace(/\s/g, '');
						var itemMasterIdResult = data.result[i]['id'];
						var itemMasterString = $("#enter-item-master-name").val().trim().toLowerCase().replace(/\s/g, '');							
						var itemMasterIdString = $("#enter-item-master-id").val();							
						if(itemMasterResult === itemMasterString && itemMasterIdResult != itemMasterIdString){
							$("#enter-item-master-name-note").html("**Found Duplicate Data!");
							postAjax = 121;
							ajaxInsert.abort();
						}else{
							$("#enter-item-master-name-note").html("");
							postAjax = 0;
						}
						}},
				error: function(xhr, resp, err) {
		            alert(err);
		        }});
			if(postAjax == 0){
				$("#enter-item-master-name-note").html(" ");
				ajaxInsert();
			}
	   }
	}else if(frm == 'plateTypeMaster'){
		var status=false;
		var plateType = $("#enter-plate-type").val().trim();
		var plateCode = $("#enter-plate-id").val().trim();
		$("#enter-plate-type").val(plateType);
		$("#enter-plate-id").val(plateCode);
		if(plateType == "" || plateCode == ""){
			if(plateType == "") 
			{
				$("#enter-plate-type-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#enter-plate-type-note").html("");
					status=true;  
				}
			if(plateCode == "") 
			{
				$("#enter-plate-id-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#enter-plate-id-note").html("");
					status=true;  
				}
		}else if(plateType != "" && plateCode != ""){
			var getAjax = $.ajax({
				async: false,
				type : "GET",
				url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
				success : function( data, status) {						
					for(var i=0;i<=data.result.length;i++){							
						var plateTypeResult = data.result[i]['plateType'].trim().toLowerCase().replace(/\s/g, '');
						var plateCodeResult = data.result[i]['plateTypeCode'].trim().toLowerCase().replace(/\s/g, '');
						var plateTypeIdResult = data.result[i]['id'];
						var plateTypeString = $("#enter-plate-type").val().trim().toLowerCase().replace(/\s/g, '');							
						var plateCodeString = $("#enter-plate-id").val().trim().toLowerCase().replace(/\s/g, '');							
						var plateTypeIdString = $("#enter-plate-type-master-id").val();							
						if(plateTypeResult === plateTypeString && plateCodeResult === plateCodeString && plateTypeIdResult != plateTypeIdString){
							$("#enter-plate-type-note").html("**Found Duplicate Data!");
							$("#enter-plate-id-note").html("**Found Duplicate Data!");
							postAjax = 121;
							ajaxInsert.abort();
						}else if(plateTypeResult != plateTypeString && plateCodeResult === plateCodeString && plateTypeIdResult != plateTypeIdString){
							$("#enter-plate-type-note").html("");
							$("#enter-plate-id-note").html("**Found Duplicate Data!");
							postAjax = 121;
							ajaxInsert.abort();
						}else if(plateTypeResult === plateTypeString && plateCodeResult != plateCodeString && plateTypeIdResult != plateTypeIdString){
							$("#enter-plate-type-note").html("**Found Duplicate Data!");
							$("#enter-plate-id-note").html("");
							postAjax = 121;
							ajaxInsert.abort();
						}else if(plateTypeResult != plateTypeString && plateCodeResult != plateCodeString){
							$("#enter-plate-type-note").html("");
							$("#enter-plate-id-note").html("");
							postAjax = 0;
						}
						}},
				error: function(xhr, resp, err) {
		            alert(err);
		        }});
			if(postAjax == 0){
				$("#enter-plate-type-note").html(" ");
				$("#enter-plate-id-note").html(" ");
				ajaxInsert();
			}}
		}else if(frm == 'plateDimensionMaster'){
			var status=false;
			var plateDimension = $("#enter-plate-dim").val().trim();
			$("#enter-plate-dim").val(plateDimension);	
			if(plateDimension == ""){
				if(plateDimension == "") 
				{
					$("#enter-plate-dim-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-plate-dim-note").html("");
						status=true;  
					}
			}else if(plateDimension != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {						
						for(var i=0;i<=data.result.length;i++){							
							var plateDimensionResult = data.result[i]['plateDimension'].trim().toLowerCase().replace(/\s/g, '');
							var plateDimensionIdResult = data.result[i]['id'];
							var plateDimensionString = $("#enter-plate-dim").val().trim().toLowerCase().replace(/\s/g, '');							
							var plateDimensionIdString = $("#enter-plate-diamension-master-id").val();							
							if(plateDimensionResult === plateDimensionString && plateDimensionIdResult != plateDimensionIdString){
								$("#enter-plate-dim-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else if(plateDimensionResult != plateDimensionString){
								$("#enter-plate-dim-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-plate-dim-note").html(" ");
					ajaxInsert();
				}
				
			}
		}else if(frm == 'plateColourMaster'){
			var status=false;
			var plateColour = $("#enter-plate-color").val().trim();
			$("#enter-plate-color").val(plateColour);
			if(plateColour == ""){
				if(plateColour == "") 
				{
					$("#enter-plate-color-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-plate-color-note").html("");
						status=true;  
					}
			}else if(plateColour != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {						
						for(var i=0;i<=data.result.length;i++){							
							var plateColourResult = data.result[i]['plateColor'].trim().toLowerCase().replace(/\s/g, '');
							var plateColourIdResult = data.result[i]['id'];
							var plateColourString = $("#enter-plate-color").val().trim().toLowerCase().replace(/\s/g, '');							
							var plateColourIdString = $("#enter-plate-colour-id").val();							
							if(plateColourResult === plateColourString && plateColourIdResult != plateColourIdString){
								$("#enter-plate-color-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-plate-color-note").html(" ");
					ajaxInsert();
				}
			}
		}else if(frm == 'plateDimensionColorMapping'){
			var status=false;
			var plateCode = $("#enter-plate-dimcol-code").val().trim();
			$("#enter-plate-dimcol-code").val(plateCode);
			if($("#select-plate-dimcol-dim").val().trim() == "0" || $("#select-plate-dimcol-unit").val().trim() == "0" ||
					$("#select-plate-dimcol-color").val().trim() == "0" || plateCode == "" || plateCode == "0"){
				if($("#select-plate-dimcol-dim").val().trim() == "0") 
				{
					$("#select-plate-dimcol-dim-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-plate-dimcol-dim-note").html("");
						status=true;  
					}
				if($("#select-plate-dimcol-unit").val().trim() == "0") 
				{
					$("#select-plate-dimcol-unit-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-plate-dimcol-unit-note").html("");
						status=true;  
					}
				if($("#select-plate-dimcol-color").val().trim() == "0") 
				{
					$("#select-plate-dimcol-color-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-plate-dimcol-color-note").html("");
						status=true;  
					}
				if(plateCode == "" || plateCode == "0") 
				{
					$("#enter-plate-dimcol-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-plate-dimcol-code-note").html("");
						status=true;  
					}
			}else if($("#select-plate-dimcol-dim").val().trim() != "0" && $("#select-plate-dimcol-unit").val().trim() != "0" &&
					$("#select-plate-dimcol-color").val().trim() != "0" && (plateCode != "" || plateCode != "0")){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {	
						$("#select-plate-dimcol-dim-note").html("");
						$("#select-plate-dimcol-unit-note").html("");
						$("#select-plate-dimcol-color-note").html("");
						$("#enter-plate-dimcol-code-note").html(" ");
						alert(data.result.length);
						for(var i=0;i<=data.result.length;i++){	
							var plateCodeResult = data.result[i]['plateCode'].trim().toLowerCase().replace(/\s/g, '');
							var plateDiamensionColourMapIdResult = data.result[i]['id'];
							var plateCodeString = $("#enter-plate-dimcol-code").val().trim().toLowerCase().replace(/\s/g, '');							
							var plateDiamensionColourMapIdString = $("#enter-plate-dim-col-id").val();							
							if(plateCodeResult === plateCodeString && plateDiamensionColourMapIdResult != plateDiamensionColourMapIdString){
								$("#enter-plate-dimcol-code-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#select-plate-dimcol-dim-note").html("");
					$("#select-plate-dimcol-unit-note").html("");
					$("#select-plate-dimcol-color-note").html("");
					$("#enter-plate-dimcol-code-note").html(" ");
					ajaxInsert();
				}
			}
		}else if(frm == 'plateMaster'){
			var status=false;
			var plateStartSeq = $("#enter-start-seq").val().trim();
			var plateEndSeq = $("#enter-end-seq").val().trim();
			$("#enter-start-seq").val(plateStartSeq);
			$("#enter-end-seq").val(plateEndSeq);
			if($("#select-plate-msater-type").val().trim() == "0" || plateStartSeq == "" || plateEndSeq == ""){
				if($("#select-plate-msater-type").val().trim() == "0") 
				{
					$("#select-plate-msater-type-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-plate-msater-type-note").html("");
						status=true;  
					}
				if(plateStartSeq == "") 
				{
					$("#enter-start-seq-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-start-seq-note").html("");
						status=true;  
					}
				if(plateEndSeq == "") 
				{
					$("#enter-end-seq-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-end-seq-note").html("");
						status=true;  
					}
			}else if($("#select-plate-msater-type").val().trim() != "0" || plateStartSeq != "" || plateEndSeq != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {	
						$("#select-plate-msater-type-note").html("");
						$("#enter-start-seq-note").html("");
						$("#enter-end-seq-note").html("");
						alert(data.result.length);
						for(var i=0;i<=data.result.length;i++){	
							var plateStartSeqResult = data.result[i]['lidStartNumber'].trim().toLowerCase().replace(/\s/g, '');
							var plateEndSeqResult = data.result[i]['lidEndNumber'].trim().toLowerCase().replace(/\s/g, '');
							var plateMasterIdResult = data.result[i]['id'];
							var plateStartSeqString = $("#enter-start-seq").val().trim().toLowerCase().replace(/\s/g, '');							
							var plateEndSeqString = $("#enter-end-seq").val().trim().toLowerCase().replace(/\s/g, '');							
							var plateMasterIdString = $("#enter-plate-master-id").val();							
							if(plateStartSeqResult.concat(plateEndSeqResult) === plateStartSeqString.concat(plateEndSeqString) && plateMasterIdResult != plateMasterIdString){
								$("#enter-start-seq-note").html("**Found Duplicate Data!");
								$("#enter-end-seq-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#select-plate-msater-type-note").html("");
					$("#enter-start-seq-note").html("");
					$("#enter-end-seq-note").html("");
					ajaxInsert();
				}
			}
		}else if(frm == 'fittingAccessMasterBean0' || frm == 'fittingAccessMasterBean1' || frm == 'fittingAccessMasterBean2'){
			var indexNumber = frm.substring(23, 24);
			var frmName = frm.substring(0, 23);
			var status=false;
			var fittingType = $("#enter-fitting-type"+indexNumber).val().trim();
			var fittingWidth = $("#enter-fitting-width"+indexNumber).val().trim();
			var fittingLength = $("#enter-fitting-length"+indexNumber).val().trim();
			var fittingHeight = $("#enter-fitting-height"+indexNumber).val().trim();
			var fittingHsnCode = $("#enter-fitting-hsn-code"+indexNumber).val().trim();
			$("#enter-fitting-type"+indexNumber).val(fittingType);			
			$("#enter-fitting-width"+indexNumber).val(fittingWidth);			
			$("#enter-fitting-length"+indexNumber).val(fittingLength);			
			$("#enter-fitting-height"+indexNumber).val(fittingHeight);			
			$("#enter-fitting-hsn-code"+indexNumber).val(fittingHsnCode);	
			if(fittingType == "" || fittingWidth == "" || fittingLength == "" || fittingHeight == "" || $("#select-fitting-unit"+indexNumber).val().trim() == "0" || fittingHsnCode == ""){
				if(fittingType == "") 
				{
					$("#enter-fitting-type-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-fitting-type-note"+indexNumber).html("");
						status=true;  
					}
				if(fittingWidth == "") 
				{
					$("#enter-fitting-width-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-fitting-width-note"+indexNumber).html("");
						status=true;  
					}
				if(fittingLength == "") 
				{
					$("#enter-fitting-length-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-fitting-length-note"+indexNumber).html("");
						status=true;  
					}
				if(fittingHeight == "") 
				{
					$("#enter-fitting-height-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-fitting-height-note"+indexNumber).html("");
						status=true;  
					}
				if($("#select-fitting-unit"+indexNumber).val().trim() == "0") 
				{
					$("#select-fitting-unit-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-fitting-unit-note"+indexNumber).html("");
						status=true;  
					}
				if(fittingHsnCode == "") 
				{
					$("#enter-fitting-hsn-code-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-fitting-hsn-code-note"+indexNumber).html("");
						status=true;  
					}
			}else if(fittingType != "" && fittingWidth != "" && fittingLength != "" && fittingHeight != "" && $("#select-fitting-unit"+indexNumber).val().trim() != "0" && fittingHsnCode != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frmName,
					success : function( data, status) {	
						$("#enter-fitting-type-note"+indexNumber).html("");
						$("#enter-fitting-width-note"+indexNumber).html("");
						$("#enter-fitting-length-note"+indexNumber).html("");
						$("#enter-fitting-height-note"+indexNumber).html("");
						$("#select-fitting-unit-note"+indexNumber).html("");
						$("#enter-fitting-hsn-code-note"+indexNumber).html("");
						for(var i=0;i<=data.result.length;i++){	
							var fittingHsnCodeResult = data.result[i]['hsnCode'].trim().toLowerCase().replace(/\s/g, '');						
							var fittingAccessMasterIdResult = data.result[i]['id'];						
							var fittingHsnCodeString = fittingHsnCode.toLowerCase().replace(/\s/g, '');							
							var fittingAccessMasterIdString = $("#enter-fitting-access-master-id-"+indexNumber).val();							
							if(fittingHsnCodeResult === fittingHsnCodeString && fittingAccessMasterIdResult != fittingAccessMasterIdString){
								$("#enter-fitting-hsn-code-note"+indexNumber).html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-fitting-type-note"+indexNumber).html("");
					$("#enter-fitting-width-note"+indexNumber).html("");
					$("#enter-fitting-length-note"+indexNumber).html("");
					$("#enter-fitting-height-note"+indexNumber).html("");
					$("#select-fitting-unit-note"+indexNumber).html("");
					$("#enter-fitting-hsn-code-note"+indexNumber).html("");
					ajaxInsert();
				}
			}
			
		}else if(frm == 'platePackageMaster'){
			var status=false;
			var packageName = $("#enter-package-name").val().trim();
			$("#enter-package-name").val(packageName);
			if(packageName == "" || $("#select-front-plate-dim").val().trim() == "0" || $("#select-rear-plate-dim").val().trim() == "0"){
			if(packageName == "") 
			{
				$("#enter-package-name-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#enter-package-name-note").html("");
					status=true;  
				}
			if($("#select-front-plate-dim").val().trim() == "0") 
			{
				$("#select-front-plate-dim-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#select-front-plate-dim-note").html("");
					status=true;  
				}
			if($("#select-rear-plate-dim").val().trim() == "0") 
			{
				$("#select-rear-plate-dim-note").html("**Please Fill The Required Field");
				status=false; 
			}
			else
				{
					$("#select-rear-plate-dim-note").html("");
					status=true;  
				}
			}else if(packageName != "" && $("#select-front-plate-dim").val().trim() != "0" && $("#select-rear-plate-dim").val().trim() != "0"){
				$("#enter-package-name-note").html("");
				$("#select-front-plate-dim-note").html("");
				$("#select-rear-plate-dim-note").html("");
				ajaxInsert();
			}
		}else if(frm == 'taxMaster'){
			
			var status=false;
			var taxType = $("#enter-tax-type").val().trim();
			var taxRate = $("#enter-tax-rate").val().trim();
			$("#enter-tax-type").val(taxType);
			$("#enter-tax-rate").val(taxRate);
			
			if(taxType == "" || taxRate == ""){
				if(taxType == "") 
				{
					$("#enter-tax-type-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-tax-type-note").html("");
						status=true;  
					}
				if(taxRate == "") 
				{
					$("#enter-tax-rate-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-tax-rate-note").html("");
						status=true;  
					}
			}else if(taxType != "" && taxRate != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {	
						$("#enter-tax-type-note").html("");
						$("#enter-tax-rate-note").html("");
						for(var i=0;i<=data.result.length;i++){	
							var taxTypeResult = data.result[i]['taxType'].trim().toLowerCase().replace(/\s/g, '');
							var taxMasterIdResult = data.result[i]['id'];
							var taxTypeString = $("#enter-tax-type").val().trim().toLowerCase().replace(/\s/g, '');							
							var taxMasterIdString = $("#enter-tax-master-id").val();							
							if(taxTypeResult === taxTypeString && taxMasterIdResult != taxMasterIdString){
								$("#enter-tax-type-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-tax-type-note").html("");
					$("#enter-tax-rate-note").html("");
					ajaxInsert();
				}
			}
		}else if(frm == 'oemMasterBean'){
			//alert("id"+$("#enter-manufacturer-id").val().trim());
			//alert($("#manufacturer-file").val());
			var manufacturerName = $("#enter-manufacturer-name").val().trim();
			$("#enter-manufacturer-name").val(manufacturerName);
			var manufacturerCode = $("#enter-manufacturer-code").val().trim();
			$("#enter-manufacturer-code").val(manufacturerCode);
			var manufacturerContactPerson = $("#enter-manufacturer-contact-person").val().trim();
			$("#enter-manufacturer-contact-person").val(manufacturerContactPerson);
			var manufacturerphoneNumber = $("#enter-manufacturer-phone-number").val().trim();
			$("#enter-manufacturer-phone-number").val(manufacturerphoneNumber);
			var manufacturerAddressFirst = $("#enter-manufacturer-address-line-first").val().trim();
			$("#enter-manufacturer-address-line-first").val(manufacturerAddressFirst);
			var manufacturerAddressSecond = $("#enter-manufacturer-address-line-second").val().trim();
			$("#enter-manufacturer-address-line-second").val(manufacturerAddressSecond);
			var manufacturerPinCode = $("#enter-manufacturer-pin-code").val().trim();
			$("#enter-manufacturer-pin-code").val(manufacturerPinCode);
			var manufacturerPanNumber = $("#enter-manufacturer-pan-num").val().trim();
			$("#enter-manufacturer-pan-num").val(manufacturerPanNumber);
			var manufacturerGstin = $("#enter-manufacturer-gstin").val().trim();
			$("#enter-manufacturer-gstin").val(manufacturerGstin);
			var manufacturerEmailId = $("#enter-manufacturer-email-id").val().trim();
			$("#enter-manufacturer-email-id").val(manufacturerEmailId);
			var manufacturerCity = $("#select-manufacturer-city").val().trim();
			//$("#select-manufacturer-city").val(manufacturerCity);
			var manufacturerState = $("#select-manufacturer-state").val().trim();
			//$("#select-manufacturer-state").val(manufacturerState);
			var manufacturerServiceState = $("#select-manufacturer-service-state").val().trim();
			//$("#select-manufacturer-service-state").val(manufacturerServiceState);
			var manufacturerPlatePackage = $("#select-manufacturer-plate-package").val().trim();
			//$("#select-manufacturer-plate-package").val(manufacturerPlatePackage);
			if(manufacturerName == "" || manufacturerCode == "" || manufacturerContactPerson == "" || manufacturerphoneNumber == "" || manufacturerAddressFirst == "" ||
					manufacturerAddressSecond == "" || manufacturerPinCode == "" || manufacturerPanNumber == "" || manufacturerGstin == "" || manufacturerEmailId == "" ||
					manufacturerCity == "0" || manufacturerState == "0" || manufacturerServiceState == "0" || manufacturerPlatePackage == "0"){
				if(manufacturerName == "") 
				{
					$("#enter-manufacturer-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-manufacturer-name-note").html("");
						status=true;  
					}
				if(manufacturerCode == "") 
				{
					$("#enter-manufacturer-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-manufacturer-code-note").html("");
						status=true;  
					}
				if(manufacturerContactPerson == "") 
				{
					$("#enter-manufacturer-contact-person-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-manufacturer-contact-person-note").html("");
						status=true;  
					}
				if(manufacturerphoneNumber == "") 
				{
					$("#enter-manufacturer-phone-number-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!mobileNumberValidation.test(manufacturerphoneNumber))
					{
						$("#enter-manufacturer-phone-number-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-manufacturer-phone-number-note").html("");
							status=true;  
						}
						//$("#enter-manufacturer-phone-number-note").html("");
						//status=true;  
					}
				if(manufacturerAddressFirst == "") 
				{
					$("#enter-manufacturer-address-line-first-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-manufacturer-address-line-first-note").html("");
						status=true;  
					}
				if(manufacturerAddressSecond == "") 
				{
					$("#enter-manufacturer-address-line-second-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-manufacturer-address-line-second-note").html("");
						status=true;  
					}
				if(manufacturerPinCode == "") 
				{
					$("#enter-manufacturer-pin-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!pinCodeValidation.test(manufacturerPinCode))
					{
						$("#enter-manufacturer-pin-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						$("#enter-manufacturer-pin-code-note").html("");
						status=true;  
					}}
				if(manufacturerPanNumber == "") 
				{
					$("#enter-manufacturer-pan-num-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!panNumberValidation.test(manufacturerPanNumber))
					{
						$("#enter-manufacturer-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-manufacturer-pan-num-note").html("");
						status=true;  
					}
						//$("#enter-manufacturer-pan-num-note").html("");
						//status=true;  
					}
				if(manufacturerGstin == "") 
				{
					$("#enter-manufacturer-gstin-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!gstinNumberValidation.test(manufacturerGstin))
					{
						$("#enter-manufacturer-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-manufacturer-gstin-note").html("");
						status=true;  
					}
						//$("#enter-manufacturer-gstin-note").html("");
						//status=true;  
					}
				if(manufacturerEmailId == "") 
				{
					$("#enter-manufacturer-email-id-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!emailIdValidation.test(manufacturerEmailId))
					{
						$("#enter-manufacturer-email-id-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-manufacturer-email-id-note").html("");
							status=true;  
						}
						//$("#enter-manufacturer-email-id-note").html("");
						//status=true;  
					}
				if(manufacturerCity == "0") 
				{
					$("#select-manufacturer-city-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-manufacturer-city-note").html("");
						status=true;  
					}
				if(manufacturerState == "0") 
				{
					$("#select-manufacturer-state-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-manufacturer-state-note").html("");
						status=true;  
					}
				if(manufacturerServiceState == "0") 
				{
					$("#select-manufacturer-service-state-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-manufacturer-service-state-note").html("");
						status=true;  
					}
				if(manufacturerPlatePackage == "0") 
				{
					$("#select-manufacturer-plate-package-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-manufacturer-plate-package-note").html("");
						status=true;  
					}
				if($("#enter-manufacturer-id").val().trim() == "0"){
					if($("#manufacturer-file").val().trim() == "") 
					{
						$("#manufacturer-file-note").html("**Please Fill The Required Field");
						status=false; 
					}
					else
						{
							$("#manufacturer-file-note").html("");
							status=true;  
						}
				}
			}else{
				$("#enter-manufacturer-name-note").html("");
				$("#enter-manufacturer-code-note").html("");
				$("#enter-manufacturer-contact-person-note").html("");
				$("#enter-manufacturer-phone-number-note").html("");
				$("#enter-manufacturer-address-line-first-note").html("");
				$("#enter-manufacturer-address-line-second-note").html("");
				$("#enter-manufacturer-pin-code-note").html("");
				$("#enter-manufacturer-pan-num-note").html("");
				$("#enter-manufacturer-gstin-note").html("");
				$("#enter-manufacturer-email-id-note").html("");
				$("#select-manufacturer-city-note").html("");
				$("#select-manufacturer-state-note").html("");
				$("#select-manufacturer-service-state-note").html("");
				$("#select-manufacturer-plate-package-note").html("");
				$("#manufacturer-file-note").html("");
				if(!pinCodeValidation.test(manufacturerPinCode))
				{
					$("#enter-manufacturer-pin-code-note").html("**zipcode should only be 5 digits");
					status=false; 
				}
				else
					{
						$("#enter-manufacturer-pin-code-note").html("");
						status=true;  
					}
					if(!mobileNumberValidation.test(manufacturerphoneNumber))
					{
						$("#enter-manufacturer-phone-number-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-manufacturer-phone-number-note").html("");
							status=true;  
						}
					if(!emailIdValidation.test(manufacturerEmailId))
					{
						$("#enter-manufacturer-email-id-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-manufacturer-email-id-note").html("");
							status=true;  
						}
				    if(!panNumberValidation.test(manufacturerPanNumber))
					{
						$("#enter-manufacturer-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-manufacturer-pan-num-note").html("");
						status=true;  
					}
				    if(!gstinNumberValidation.test(manufacturerGstin))
					{
						$("#enter-manufacturer-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-manufacturer-gstin-note").html("");
						status=true;  
					}
					if($("#enter-manufacturer-id").val().trim() == "0"){
						if($("#manufacturer-file").val().trim() == "") 
						{
							$("#manufacturer-file-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#manufacturer-file-note").html("");
								status=true; 
								//$("#enter-manufacturer-code").html("");
								//ajaxInsert();
							}
					}
				if(pinCodeValidation.test(manufacturerPinCode) && mobileNumberValidation.test(manufacturerphoneNumber) && emailIdValidation.test(manufacturerEmailId) && panNumberValidation.test(manufacturerPanNumber) && gstinNumberValidation.test(manufacturerGstin)){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {	
						$("#enter-manufacturer-name-note").html("");
						$("#enter-manufacturer-code-note").html("");
						$("#enter-manufacturer-contact-person-note").html("");
						$("#enter-manufacturer-phone-number-note").html("");
						$("#enter-manufacturer-address-line-first-note").html("");
						$("#enter-manufacturer-address-line-second-note").html("");
						$("#enter-manufacturer-pin-code-note").html("");
						$("#enter-manufacturer-pan-num-note").html("");
						$("#enter-manufacturer-gstin-note").html("");
						$("#enter-manufacturer-email-id-note").html("");
						$("#select-manufacturer-city-note").html("");
						$("#select-manufacturer-state-note").html("");
						$("#select-manufacturer-service-state-note").html("");
						$("#select-manufacturer-plate-package-note").html("");
						$("#manufacturer-file-note").html("");
						
						for(var i=0;i<=data.result.length;i++){	
							var oemCodeResult = data.result[i]['oemCode'].trim().toLowerCase().replace(/\s/g, '');
							var oemMasterIdResult = data.result[i]['id'];
							var oemCodeString = $("#enter-manufacturer-code").val().trim().toLowerCase().replace(/\s/g, '');							
							var oemMasterIdString = $("#enter-manufacturer-id").val();							
							if(oemCodeResult === oemCodeString && oemMasterIdResult != oemMasterIdString){
								//if()
								$("#enter-manufacturer-code-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					if($("#enter-manufacturer-id").val().trim() == "0"){
						if($("#manufacturer-file").val().trim() == "") 
						{
							$("#manufacturer-file-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#manufacturer-file-note").html("");
								status=true; 
								$("#enter-manufacturer-code").html("");
								ajaxInsert();
							}
					}else{
					$("#enter-manufacturer-code").html("");
					ajaxInsert();}
				}
				}
			}
		}else if(frm == 'vehicleModelMasterBean'){
			var modelName = $("#enter-model-name").val().trim();
			$("#enter-model-name").val(modelName);
			if($("#select-model-oem-Manufacturer").val().trim() == "0" || modelName == "" || $("#select-model-vehicle-type").val().trim() == "0" || $("#select-model-fitting-accessort-type").val().trim() == "0" || $("#select-model-unit-code").val().trim() == "0" || $("#enter-model-fittting-item-qty").val().trim() == "0"){
				if($("#select-model-oem-Manufacturer").val().trim() == "0") 
				{
					$("#select-model-oem-Manufacturer-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-model-oem-Manufacturer-note").html("");
						status=true;  
					}
				if(modelName == "") 
				{
					$("#enter-model-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-model-name-note").html("");
						status=true;  
					}
				if($("#select-model-vehicle-type").val().trim() == "0") 
				{
					$("#select-model-vehicle-type-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-model-vehicle-type-note").html("");
						status=true;  
					}
				if($("#select-model-fitting-accessort-type").val().trim() == "0") 
				{
					$("#select-model-fitting-accessort-type-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-model-fitting-accessort-type-note").html("");
						status=true;  
					}
				if($("#select-model-unit-code").val().trim() == "0") 
				{
					$("#select-model-unit-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-model-unit-code-note").html("");
						status=true;  
					}
				if($("#enter-model-fittting-item-qty").val().trim() == "0") 
				{
					$("#enter-model-fittting-item-qty-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-model-fittting-item-qty-note").html("");
						status=true;  
					}
			}else if($("#select-model-oem-Manufacturer").val().trim() != "0" && modelName != "" && $("#select-model-vehicle-type").val().trim() != "0" && $("#select-model-fitting-accessort-type").val().trim() != "0" && $("#select-model-unit-code").val().trim() != "0" && $("#enter-model-fittting-item-qty").val().trim() != "0"){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {
						$("#select-model-oem-Manufacturer-note").html("");
						$("#enter-model-name-note").html("");
						$("#select-model-vehicle-type-note").html("");
						$("#select-model-fitting-accessort-type-note").html("");
						$("#select-model-unit-code-note").html("");
						$("#enter-model-fittting-item-qty-note").html("");
						for(var i=0;i<=data.result.length;i++){							
							var modelNameResult = data.result[i]['modelType'].trim().toLowerCase().replace(/\s/g, '');						
							var modelMasterIdResult = data.result[i]['id'];						
							var modelNameString = $("#enter-model-name").val().trim().toLowerCase().replace(/\s/g, '');							
							var modelMasterIdString = $("#enter-model-master-id").val();							
							if(modelNameResult === modelNameString && modelMasterIdResult != modelMasterIdString){
								$("#enter-model-name-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#enter-city-name-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-model-name-note").html("");
					ajaxInsert();
				}
			}
		}else if(frm == 'EmbossingStationMaster'){
			var embossStationName = $("#enter-emboss-station-name").val().trim();
			$("#enter-emboss-station-name").val(embossStationName);
			var embossContactPersonName = $("#enter-emboss-contact-person").val().trim();
			$("#enter-emboss-contact-person").val(embossContactPersonName);
			var embossPhoneNumber = $("#enter-emboss-phone").val().trim();
			$("#enter-emboss-phone").val(embossPhoneNumber);
			var embossEmailId = $("#enter-emboss-email").val().trim();
			$("#enter-emboss-email").val(embossEmailId);
			var embossAddressFirst = $("#enter-emboss-address-first").val().trim();
			$("#enter-emboss-address-first").val(embossAddressFirst);
			var embossAddressSecond = $("#enter-emboss-address-second").val().trim();
			$("#enter-emboss-address-second").val(embossAddressSecond);
			var embossGoogleLoc = $("#enter-emboss-google-loc").val().trim();
			$("#enter-emboss-google-loc").val(embossGoogleLoc);
			var embossStationCode = $("#enter-emboss-station-code").val().trim();
			$("#enter-emboss-station-code").val(embossStationCode);
			var embossStationCapacity = $("#enter-emboss-station-cap").val().trim();
			$("#enter-emboss-station-cap").val(embossStationCapacity);
			var embossMaxOrder = $("#enter-emboss-max-order").val().trim();
			$("#enter-emboss-max-order").val(embossMaxOrder);
			var embossReorder = $("#enter-emboss-reorder").val().trim();
			$("#enter-emboss-reorder").val(embossReorder);
			var embossMinOrder = $("#enter-emboss-min-order").val().trim();
			$("#enter-emboss-min-order").val(embossMinOrder);
			if($("#select-emboss-state-name").val().trim() == "0" || $("#select-emboss-zone-name").val().trim() == "0" || embossStationName == "" || embossContactPersonName == "" ||
					embossPhoneNumber == "" || embossEmailId == "" || embossAddressFirst == "" || embossAddressSecond == "" || embossGoogleLoc == "" || 
					$("#select-emboss-city-name").val().trim() == "0" || embossStationCode == "" || (embossStationCapacity == "" || embossStationCapacity == "0") || (embossMaxOrder == "" || embossMaxOrder == "0") || (embossReorder == "" || embossReorder == "0") || (embossMinOrder == "" || embossMinOrder == "0")){
				if($("#select-emboss-state-name").val().trim() == "0") 
				{
					$("#select-emboss-state-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-emboss-state-name-note").html("");
						status=true;  
					}
				if($("#select-emboss-zone-name").val().trim() == "0") 
				{
					$("#select-emboss-zone-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-emboss-zone-name-note").html("");
						status=true;  
					}
				if(embossStationName == "") 
				{
					$("#enter-emboss-station-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-station-name-note").html("");
						status=true;  
					}
				if(embossContactPersonName == "") 
				{
					$("#enter-emboss-contact-person-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-contact-person-note").html("");
						status=true;  
					}
				if(embossPhoneNumber == "") 
				{
					$("#enter-emboss-phone-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!mobileNumberValidation.test(embossPhoneNumber))
					{
						$("#enter-emboss-phone-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-emboss-phone-note").html("");
							status=true;  
						}
						//$("#enter-emboss-phone-note").html("");
						//status=true;  
					}
				if(embossEmailId == "") 
				{
					$("#enter-emboss-email-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!emailIdValidation.test(embossEmailId))
					{
						$("#enter-emboss-email-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-emboss-email-note").html("");
							status=true;  
						}
						//$("#enter-emboss-email-note").html("");
						//status=true;  
					}
				if(embossAddressFirst == "") 
				{
					$("#enter-emboss-address-first-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-address-first-note").html("");
						status=true;  
					}
				if(embossAddressSecond == "") 
				{
					$("#enter-emboss-address-second-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-address-second-note").html("");
						status=true;  
					}
				if(embossGoogleLoc == "") 
				{
					$("#enter-emboss-google-loc-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-google-loc-note").html("");
						status=true;  
					}
				if($("#select-emboss-city-name").val().trim() == "0") 
				{
					$("#select-emboss-city-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-emboss-city-name-note").html("");
						status=true;  
					}
				if(embossStationCode == "") 
				{
					$("#enter-emboss-station-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-station-code-note").html("");
						status=true;  
					}
				if(embossStationCapacity == "" || embossStationCapacity == "0") 
				{
					$("#enter-emboss-station-cap-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-station-cap-note").html("");
						status=true;  
					}
				if(embossMaxOrder == "" || embossMaxOrder == "0") 
				{
					$("#enter-emboss-max-order-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-max-order-note").html("");
						status=true;  
					}
				if(embossReorder == "" || embossReorder == "0") 
				{
					$("#enter-emboss-reorder-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-reorder-note").html("");
						status=true;  
					}
				if(embossMinOrder == "" || embossMinOrder == "0") 
				{
					$("#enter-emboss-min-order-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-emboss-min-order-note").html("");
						status=true;  
					}
			}else if($("#select-emboss-state-name").val().trim() != "0" && $("#select-emboss-zone-name").val().trim() != "0" && embossStationName != "" && embossContactPersonName != "" &&
					embossPhoneNumber != "" && embossEmailId != "" && embossAddressFirst != "" && embossAddressSecond != "" && embossGoogleLoc != "" && 
					$("#select-emboss-city-name").val().trim() != "0" && embossStationCode != "" && (embossStationCapacity != "" && embossStationCapacity != "0") && (embossMaxOrder != "" && embossMaxOrder != "0") && (embossReorder != "" && embossReorder != "0") && (embossMinOrder != "" && embossMinOrder != "0")){
				$("#select-emboss-state-name-note").html("");
				$("#select-emboss-zone-name-note").html("");
				$("#enter-emboss-station-name-note").html("");
				$("#enter-emboss-contact-person-note").html("");
				$("#enter-emboss-phone-note").html("");
				$("#enter-emboss-email-note").html("");
				$("#enter-emboss-address-first-note").html("");
				$("#enter-emboss-address-second-note").html("");
				$("#enter-emboss-google-loc-note").html("");
				$("#select-emboss-city-name-note").html("");
				$("#enter-emboss-station-code-note").html("");
				$("#enter-emboss-station-cap-note").html("");
				$("#enter-emboss-max-order-note").html("");
				$("#enter-emboss-reorder-note").html("");
				$("#enter-emboss-min-order-note").html("");
				if(!mobileNumberValidation.test(embossPhoneNumber))
				{
					$("#enter-emboss-phone-note").html("**Mobile number should only be 10 digits");
					status=false; 
				}
				else
					{
						$("#enter-emboss-phone-note").html("");
						status=true;  
					}
				if(!emailIdValidation.test(embossEmailId))
				{
					$("#enter-emboss-email-note").html("**Please enter valid email id");
					status=false; 
				}
				else
					{
						$("#enter-emboss-email-note").html("");
						status=true;  
					}
				if(mobileNumberValidation.test(embossPhoneNumber) && emailIdValidation.test(embossEmailId)){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {						
						for(var i=0;i<=data.result.length;i++){							
							var embossStationCodeResult = data.result[i]['stationCode'].trim().toLowerCase().replace(/\s/g, '');						
							var embossStationIdResult = data.result[i]['id'];						
							var embossStationCodeString = $("#enter-emboss-station-code").val().trim().toLowerCase().replace(/\s/g, '');							
							var embossStationIdString = $("#enter-emboss-station-master-id").val();							
							if(embossStationCodeResult === embossStationCodeString && embossStationIdResult != embossStationIdString){
								$("#enter-emboss-station-code-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#enter-emboss-station-code-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-emboss-station-name-note").html("");
					ajaxInsert();
				}
			  }
			}
			
		}else if(frm == 'deliveryBoyMasterBean'){
			//alert("hi"+$("#deli-pan-card").val().trim());
			var deliveryBoyName = $("#enter-deli-boy-name").val().trim();
			$("#enter-deli-boy-name").val(deliveryBoyName);
			var deliveryBoyCode = $("#enter-deli-boy-code").val().trim();
			$("#enter-deli-boy-code").val(deliveryBoyCode);
			var deliveryBoyPhone = $("#enter-deli-boy-phone").val().trim();
			$("#enter-deli-boy-phone").val(deliveryBoyPhone);
			var deliveryBoyEmail = $("#enter-deli-boy-email").val().trim();
			$("#enter-deli-boy-email").val(deliveryBoyEmail);
			var deliveryBoyAddressFirst = $("#enter-deli-boy-address-line-first").val().trim();
			$("#enter-deli-boy-address-line-first").val(deliveryBoyAddressFirst);
			var deliveryBoyAddressSecond = $("#enter-deli-boy-address-line-second").val().trim();
			$("#enter-deli-boy-address-line-second").val(deliveryBoyAddressSecond);
			var deliveryBoyPinCode = $("#enter-deli-boy-pi-code").val().trim();
			$("#enter-deli-boy-pi-code").val(deliveryBoyPinCode);
			if(deliveryBoyName == "" || deliveryBoyCode == "" || deliveryBoyPhone == "" || deliveryBoyEmail == "" || deliveryBoyAddressFirst == "" || deliveryBoyAddressSecond == "" || 
			$("#select-deli-boy-city").val().trim() == "0" || $("#select-deli-boy-state").val().trim() == "0" || (deliveryBoyPinCode == "" || deliveryBoyPinCode == "0") ||
			$("#select-deli-emboss-station").val().trim() == "0"){
				if(deliveryBoyName == "") 
				{
					$("#enter-deli-boy-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-deli-boy-name-note").html("");
						status=true;  
					}
				if(deliveryBoyCode == "") 
				{
					$("#enter-deli-boy-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-deli-boy-code-note").html("");
						status=true;  
					}
				if(deliveryBoyPhone == "") 
				{
					$("#enter-deli-boy-phone-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!mobileNumberValidation.test(deliveryBoyPhone))
					{
						$("#enter-deli-boy-phone-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-deli-boy-phone-note").html("");
							status=true;  
						}
						//$("#enter-deli-boy-phone-note").html("");
						//status=true;  
					}
				if(deliveryBoyEmail == "") 
				{
					$("#enter-deli-boy-email-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!emailIdValidation.test(deliveryBoyEmail))
					{
						$("#enter-deli-boy-email-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-deli-boy-email-note").html("");
							status=true;  
						}
						//$("#enter-deli-boy-email-note").html("");
						//status=true;  
					}
				if(deliveryBoyAddressFirst == "") 
				{
					$("#enter-deli-boy-address-line-first-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-deli-boy-address-line-first-note").html("");
						status=true;  
					}
				if(deliveryBoyAddressSecond == "") 
				{
					$("#enter-deli-boy-address-line-second-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-deli-boy-address-line-second-note").html("");
						status=true;  
					}
				if($("#select-deli-boy-city").val().trim() == "0") 
				{
					$("#select-deli-boy-city-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-deli-boy-city-note").html("");
						status=true;  
					}
				if($("#select-deli-boy-state").val().trim() == "0") 
				{
					$("#select-deli-boy-state-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-deli-boy-state-note").html("");
						status=true;  
					}
				if(deliveryBoyPinCode == "" || deliveryBoyPinCode == "0") 
				{
					$("#enter-deli-boy-pi-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!pinCodeValidation.test(deliveryBoyPinCode))
					{
						$("#enter-deli-boy-pi-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						
						$("#enter-deli-boy-pi-code-note").html("");
						status=true;  
					}
						//$("#enter-deli-boy-pi-code-note").html("");
						//status=true;  
					}
				if($("#select-deli-emboss-station").val().trim() == "0") 
				{
					$("#select-deli-emboss-station-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-deli-emboss-station-note").html("");
						status=true;  
					}
				if($("#enter-deli-boy-id").val().trim() == "0"){
					if($("#deli-boy-file").val().trim() == "") 
					{
						$("#deli-boy-file-note").html("**Please Fill The Required Field");
						status=false; 
					}
					else
						{
							$("#deli-boy-file-note").html("");
							status=true;  
						}
				}
				/*if($("#deli-pan-card").val().trim() == "0" && $("#deli-adhaar-card").val().trim() == "0" &&
						$("#deli-other-card").val().trim() == "0") 
				{
					$("#deli-card-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#deli-card-note").html("");
						status=true;  
					}*/
			}else if(deliveryBoyName != "" && deliveryBoyCode != "" && deliveryBoyPhone != "" && deliveryBoyEmail != "" && deliveryBoyAddressFirst != "" && deliveryBoyAddressSecond != "" && 
					$("#select-deli-boy-city").val().trim() != "0" && $("#select-deli-boy-state").val().trim() != "0" && (deliveryBoyPinCode != "" && deliveryBoyPinCode != "0") &&
					$("#select-deli-emboss-station").val().trim() != "0"){
				$("#enter-deli-boy-name-note").html("");
				$("#enter-deli-boy-code-note").html("");
				$("#enter-deli-boy-phone-note").html("");
				$("#enter-deli-boy-email-note").html("");
				$("#enter-deli-boy-address-line-first-note").html("");
				$("#enter-deli-boy-address-line-second-note").html("");
				$("#select-deli-boy-city-note").html("");
				$("#select-deli-boy-state-note").html("");
				$("#enter-deli-boy-pi-code-note").html("");
				$("#select-deli-emboss-station-note").html("");
				$("#deli-boy-file-note").html("");
				if(!mobileNumberValidation.test(deliveryBoyPhone))
				{
					$("#enter-deli-boy-phone-note").html("**Mobile number should only be 10 digits");
					status=false; 
				}
				else
					{
						$("#enter-deli-boy-phone-note").html("");
						status=true;  
					}
				if(!emailIdValidation.test(deliveryBoyEmail))
				{
					$("#enter-deli-boy-email-note").html("**Please enter valid email id");
					status=false; 
				}
				else
					{
						$("#enter-deli-boy-email-note").html("");
						status=true;  
					}
				if(!pinCodeValidation.test(deliveryBoyPinCode))
				{
					$("#enter-deli-boy-pi-code-note").html("**zipcode should only be 5 digits");
					status=false; 
				}else{
					$("#enter-deli-boy-pi-code-note").html("");
					status=true;  
				}
				if($("#enter-deli-boy-id").val().trim() == "0"){
					if($("#deli-boy-file").val().trim() == "") 
					{
						$("#deli-boy-file-note").html("**Please Fill The Required Field");
						status=false; 
					}
					else
						{
							$("#deli-boy-file-note").html("");
							status=true;  
						}
				}
				if(pinCodeValidation.test(deliveryBoyPinCode) && mobileNumberValidation.test(deliveryBoyPhone) && emailIdValidation.test(deliveryBoyEmail)){
					var getAjax = $.ajax({
						async: false,
						type : "GET",
						url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
						success : function( data, status) {						
							for(var i=0;i<=data.result.length;i++){							
								var deliveryBoyCodeResult = data.result[i]['userId'].trim().toLowerCase().replace(/\s/g, '');						
								var deliveryBoyIdResult = data.result[i]['id'];						
								var deliveryBoyCodeString = $("#enter-deli-boy-code").val().trim().toLowerCase().replace(/\s/g, '');							
								var deliveryBoyIdString = $("#enter-deli-boy-id").val();							
								if(deliveryBoyCodeResult === deliveryBoyCodeString && deliveryBoyIdResult != deliveryBoyIdString){
									$("#enter-deli-boy-code-note").html("**Found Duplicate Data!");
									postAjax = 121;
									ajaxInsert.abort();
								}else {
									$("#enter-deli-boy-code-note").html("");
									postAjax = 0;
								}
								}},
						error: function(xhr, resp, err) {
				            alert(err);
				        }});
					if(postAjax == 0){
						if($("#enter-deli-boy-id").val().trim() == "0"){
							if($("#deli-boy-file").val().trim() == "") 
							{
								$("#deli-boy-file-note").html("**Please Fill The Required Field");
								status=false; 
							}
							else
								{
									$("#deli-boy-file-note").html("");
									status=true;
									$("#enter-deli-boy-code-note").html("");
									ajaxInsert();
								}
						}else{
						$("#enter-deli-boy-code-note").html("");
						ajaxInsert();
					  }
					}
				}
			}
		}else if(frm == 'deliveryVendorMasterBean'){
			//alert($("#deli-boy-file").val().trim());
			var deliveryVendorName = $("#enter-deli-vendor-name").val().trim();
			$("#enter-deli-vendor-name").val(deliveryVendorName);
			var deliveryVendorCode = $("#enter-deli-vendor-code").val().trim();
			$("#enter-deli-vendor-code").val(deliveryVendorCode);
			var deliveryVendorContactPerson = $("#enter-deli-vendor-contact-person").val().trim();
			$("#enter-deli-vendor-contact-person").val(deliveryVendorContactPerson);
			var deliveryVendorPhone = $("#enter-deli-vendor-phone").val().trim();
			$("#enter-deli-vendor-phone").val(deliveryVendorPhone);
			var deliveryVendorEmail = $("#enter-deli-vendor-email").val().trim();
			$("#enter-deli-vendor-email").val(deliveryVendorEmail);
			var deliveryVendorAddressFirst = $("#enter-deli-vendor-address-line-first").val().trim();
			$("#enter-deli-vendor-address-line-first").val(deliveryVendorAddressFirst);
			var deliveryVendorAddressSecond = $("#enter-deli-vendor-address-line-second").val().trim();
			$("#enter-deli-vendor-address-line-second").val(deliveryVendorAddressSecond);
			var deliveryVendorPinCode = $("#enter-deli-vendor-pin-code").val().trim();
			$("#enter-deli-vendor-pin-code").val(deliveryVendorPinCode);
			var deliveryVendorPanNumber = $("#enter-deli-vendor-pan-num").val().trim();
			$("#enter-deli-vendor-pan-num").val(deliveryVendorPanNumber);
			var deliveryVendorGstin = $("#enter-deli-vendor-gstin").val().trim();
			$("#enter-deli-vendor-gstin").val(deliveryVendorGstin);
			var deliveryVendorPickUpHH = $("#enter-deli-ven-pick-time-hh").val().trim();
			$("#enter-deli-ven-pick-time-hh").val(deliveryVendorPickUpHH);
			var deliveryVendorPickUpMM = $("#enter-deli-ven-pick-time-mm").val().trim();
			$("#enter-deli-ven-pick-time-mm").val(deliveryVendorPickUpMM);
			var deliveryVendorPickUpSS = $("#enter-deli-ven-pick-time-ss").val().trim();
			$("#enter-deli-ven-pick-time-ss").val(deliveryVendorPickUpSS);
			if(deliveryVendorName == "" || deliveryVendorCode == "" || deliveryVendorContactPerson == "" || deliveryVendorPhone == "" || deliveryVendorEmail == "" || deliveryVendorAddressFirst == "" || deliveryVendorAddressSecond == "" || 
					$("#select-deli-vendor-city").val().trim() == "0" || $("#select-deli-vender-state").val().trim() == "0" || deliveryVendorPinCode == "" || deliveryVendorPanNumber == "" || deliveryVendorPanNumber == "" ||
					$("#select-deli-vendor-emboss-state").val().trim() == "0" || deliveryVendorPickUpHH == "" || deliveryVendorPickUpMM == "" || deliveryVendorPickUpSS == ""){
						if(deliveryVendorName == "" || deliveryVendorName == "0") 
						{
							$("#enter-deli-vendor-name-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-vendor-name-note").html("");
								status=true;  
							}
						if(deliveryVendorCode == "" || deliveryVendorCode == "0") 
						{
							$("#enter-deli-vendor-code-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-vendor-code-note").html("");
								status=true;  
							}
						if(deliveryVendorContactPerson == "" || deliveryVendorContactPerson == "0") 
						{
							$("#enter-deli-vendor-contact-person-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-vendor-contact-person-note").html("");
								status=true;  
							}
						if(deliveryVendorPhone == "" || deliveryVendorPhone == "0") 
						{
							$("#enter-deli-vendor-phone-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
							if(!mobileNumberValidation.test(deliveryVendorPhone))
							{
								$("#enter-deli-vendor-phone-note").html("**Mobile number should only be 10 digits");
								status=false; 
							}
							else
								{
									$("#enter-deli-vendor-phone-note").html("");
									status=true;  
								}
						    	//$("#enter-deli-vendor-phone-note").html("");
								//status=true;  
							}
						if(deliveryVendorEmail == "" || deliveryVendorEmail == "0") 
						{
							$("#enter-deli-vendor-email-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
							if(!emailIdValidation.test(deliveryVendorEmail))
							{
								$("#enter-deli-vendor-email-note").html("**Please enter valid email id");
								status=false; 
							}
							else
								{
									$("#enter-deli-vendor-email-note").html("");
									status=true;  
								}
							    //$("#enter-deli-vendor-email-note").html("");
								//status=true;  
							}
						if(deliveryVendorAddressFirst == "" || deliveryVendorAddressFirst == "0") 
						{
							$("#enter-deli-vendor-address-line-first-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-vendor-address-line-first-note").html("");
								status=true;  
							}
						if(deliveryVendorAddressSecond == "" || deliveryVendorAddressSecond == "0") 
						{
							$("#enter-deli-vendor-address-line-second-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-vendor-address-line-second-note").html("");
								status=true;  
							}
						if($("#select-deli-vendor-city").val().trim() == "0") 
						{
							$("#select-deli-vendor-city-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#select-deli-vendor-city-note").html("");
								status=true;  
							}
						if($("#select-deli-vender-state").val().trim() == "0") 
						{
							$("#select-deli-vender-state-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#select-deli-vender-state-note").html("");
								status=true;  
							}
						if(deliveryVendorPinCode == "" || deliveryVendorPinCode == "0") 
						{
							$("#enter-deli-vendor-pin-code-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
							if(!pinCodeValidation.test(deliveryVendorPinCode))
							{
								$("#enter-deli-vendor-pin-code-note").html("**zipcode should only be 5 digits");
								status=false; 
							}else{
								$("#enter-deli-vendor-pin-code-note").html("");
								status=true;  
							}
								//$("#enter-deli-vendor-pin-code-note").html("");
								//status=true;  
							}
						if(deliveryVendorPanNumber == "" || deliveryVendorPanNumber == "0") 
						{
							$("#enter-deli-vendor-pan-num-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
							if(!panNumberValidation.test(deliveryVendorPanNumber))
							{
								$("#enter-deli-vendor-pan-num-note").html("**Please enter valid pan Number");
								status=false; 
							}else{
								$("#enter-deli-vendor-pan-num-note").html("");
								status=true;  
							}
								//$("#enter-deli-vendor-pan-num-note").html("");
								//status=true;  
							}
						if(deliveryVendorGstin == "" || deliveryVendorGstin == "0") 
						{
							$("#enter-deli-vendor-gstin-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
							if(!gstinNumberValidation.test(deliveryVendorGstin))
							{
								$("#enter-deli-vendor-gstin-note").html("**Please enter valid gstin Number");
								status=false; 
							}else{
								$("#enter-deli-vendor-gstin-note").html("");
								status=true;  
							}
								//$("#enter-deli-vendor-gstin-note").html("");
								//status=true;  
							}
						if($("#select-deli-vendor-emboss-state").val().trim() == "0") 
						{
							$("#select-deli-vendor-emboss-state-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#select-deli-vendor-emboss-state-note").html("");
								status=true;  
							}
						if(deliveryVendorPickUpHH == "" || deliveryVendorPickUpHH == "0") 
						{
							$("#enter-deli-ven-pick-time-hh-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-ven-pick-time-hh-note").html("");
								status=true;  
							}
						if(deliveryVendorPickUpMM == "" || deliveryVendorPickUpMM == "0") 
						{
							$("#enter-deli-ven-pick-time-mm-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-ven-pick-time-mm-note").html("");
								status=true;  
							}
						if(deliveryVendorPickUpSS == "" || deliveryVendorPickUpSS == "0") 
						{
							$("#enter-deli-ven-pick-time-ss-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#enter-deli-ven-pick-time-ss-note").html("");
								status=true;  
							}
						if($("#enter-deli-ven-master-id").val().trim() == "0" || $("#enter-deli-ven-master-id").val().trim() == ""){
							if($("#deli-ven-file-one").val().trim() == "" || $("#deli-ven-file-one").val().trim() == "0") 
							{
								$("#deli-ven-file-one-note").html("**Please Fill The Required Field");
								status=false; 
							}
							else
								{
									$("#deli-ven-file-one-note").html("");
									status=true;
								}
						}
						if($("#enter-deli-ven-master-id").val().trim() == "0" || $("#enter-deli-ven-master-id").val().trim() == ""){
							if($("#deli-ven-file-two").val().trim() == "" || $("#deli-ven-file-two").val().trim() == "0") 
							{
								$("#deli-ven-file-two-note").html("**Please Fill The Required Field");
								status=false; 
							}
							else
								{
									$("#deli-ven-file-two-note").html("");
									status=true;
								}
						}
			}else if(deliveryVendorName != "" && deliveryVendorCode != "" && deliveryVendorContactPerson != "" && deliveryVendorPhone != "" && deliveryVendorEmail != "" && deliveryVendorAddressFirst != "" && deliveryVendorAddressSecond != "" && 
					$("#select-deli-vendor-city").val().trim() != "0" && $("#select-deli-vender-state").val().trim() != "0" && deliveryVendorPinCode != "" && deliveryVendorPanNumber != "" && deliveryVendorPanNumber != "" &&
					$("#select-deli-vendor-emboss-state").val().trim() != "0" && deliveryVendorPickUpHH != "" && deliveryVendorPickUpMM != "" && deliveryVendorPickUpSS != ""){
					$("#enter-deli-vendor-name-note").html("");
					$("#enter-deli-vendor-code-note").html("");
					$("#enter-deli-vendor-contact-person-note").html("");
					$("#enter-deli-vendor-phone-note").html("");
					$("#enter-deli-vendor-phone-note").html("");
					$("#enter-deli-vendor-email-note").html("");
					$("#enter-deli-vendor-address-line-first-note").html("");
					$("#enter-deli-vendor-address-line-second-note").html("");
					$("#select-deli-vendor-city-note").html("");
					$("#select-deli-vender-state-note").html("");
					$("#enter-deli-vendor-pin-code-note").html("");
					$("#enter-deli-vendor-pan-num-note").html("");
					$("#enter-deli-vendor-gstin-note").html("");
					$("#select-deli-vendor-emboss-state-note").html("");
					$("#enter-deli-ven-pick-time-hh-note").html("");
					$("#enter-deli-ven-pick-time-mm-note").html("");
					$("#enter-deli-ven-pick-time-ss-note").html("");
					$("#deli-ven-file-one-note").html("");
					$("#deli-ven-file-two-note").html("");
				if(!mobileNumberValidation.test(deliveryVendorPhone))
				{
					$("#enter-deli-vendor-phone-note").html("**Mobile number should only be 10 digits");
					status=false; 
				}
				else
					{
						$("#enter-deli-vendor-phone-note").html("");
						status=true;  
					}
				if(!emailIdValidation.test(deliveryVendorEmail))
				{
					$("#enter-deli-vendor-email-note").html("**Please enter valid email id");
					status=false; 
				}
				else
					{
						$("#enter-deli-vendor-email-note").html("");
						status=true;  
					}
				if(!pinCodeValidation.test(deliveryVendorPinCode))
				{
					$("#enter-deli-vendor-pin-code-note").html("**zipcode should only be 5 digits");
					status=false; 
				}else{
					$("#enter-deli-vendor-pin-code-note").html("");
					status=true;  
				}
				if(!panNumberValidation.test(deliveryVendorPanNumber))
				{
					$("#enter-deli-vendor-pan-num-note").html("**Please enter valid pan Number");
					status=false; 
				}else{
					$("#enter-deli-vendor-pan-num-note").html("");
					status=true;  
				}
				if(!gstinNumberValidation.test(deliveryVendorGstin))
				{
					$("#enter-deli-vendor-gstin-note").html("**Please enter valid gstin Number");
					status=false; 
				}else{
					$("#enter-deli-vendor-gstin-note").html("");
					status=true;  
				}
				if($("#enter-deli-ven-master-id").val().trim() == "0" || $("#enter-deli-ven-master-id").val().trim() == ""){
					if($("#deli-ven-file-one").val().trim() == "" || $("#deli-ven-file-one").val().trim() == "0") 
					{
						$("#deli-ven-file-one-note").html("**Please Fill The Required Field");
						status=false; 
					}
					else
						{
							$("#deli-ven-file-one-note").html("");
							status=true;
						}
				}
				if($("#enter-deli-ven-master-id").val().trim() == "0" || $("#enter-deli-ven-master-id").val().trim() == ""){
					if($("#deli-ven-file-two").val().trim() == "" || $("#deli-ven-file-two").val().trim() == "0") 
					{
						$("#deli-ven-file-two-note").html("**Please Fill The Required Field");
						status=false; 
					}
					else
						{
							$("#deli-ven-file-two-note").html("");
							status=true;
						}
				}
				if(pinCodeValidation.test(deliveryVendorPinCode) && mobileNumberValidation.test(deliveryVendorPhone) && emailIdValidation.test(deliveryVendorEmail) && panNumberValidation.test(deliveryVendorPanNumber) && gstinNumberValidation.test(deliveryVendorGstin)){
					var getAjax = $.ajax({
						async: false,
						type : "GET",
						url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
						success : function( data, status) {						
							for(var i=0;i<=data.result.length;i++){							
								var deliveryVendorCodeResult = data.result[i]['vendorId'].trim().toLowerCase().replace(/\s/g, '');						
								var deliveryVendorIdResult = data.result[i]['id'];						
								var deliveryVendorCodeString = $("#enter-deli-vendor-code").val().trim().toLowerCase().replace(/\s/g, '');							
								var deliveryVendorIdString = $("#enter-deli-ven-master-id").val();							
								if(deliveryVendorCodeResult === deliveryVendorCodeString && deliveryVendorIdResult != deliveryVendorIdString){
									$("#enter-deli-vendor-code-note").html("**Found Duplicate Data!");
									postAjax = 121;
									ajaxInsert.abort();
								}else {
									$("#enter-deli-vendor-code-note").html("");
									postAjax = 0;
								}
								}},
						error: function(xhr, resp, err) {
				            alert(err);
				        }});
					if(postAjax == 0){
						if($("#enter-deli-ven-master-id").val().trim() == "0" || $("#enter-deli-ven-master-id").val().trim() == ""){
							if($("#deli-ven-file-one").val().trim() == "" && $("#deli-ven-file-two").val().trim() == "") {
								$("#deli-ven-file-one-note").html("**Please Fill The Required Field");
								$("#deli-ven-file-two-note").html("**Please Fill The Required Field");
								status=false; 
							}else if($("#deli-ven-file-one").val().trim() == "" && $("#deli-ven-file-two").val().trim() != ""){
								$("#deli-ven-file-one-note").html("**Please Fill The Required Field");
								$("#deli-ven-file-two-note").html("");
								status=false; 
							}else if($("#deli-ven-file-one").val().trim() != "" && $("#deli-ven-file-two").val().trim() == "") {
								$("#deli-ven-file-one-note").html("");
								$("#deli-ven-file-two-note").html("**Please Fill The Required Field");
								status=false; 
							}else{
									$("#deli-ven-file-one-note").html("");
									$("#deli-ven-file-two-note").html("");
									status=true;
									$("#enter-deli-vendor-code-note").html("");
									ajaxInsert();
								}
						}else{
						$("#enter-deli-vendor-code-note").html("");
						ajaxInsert();
					  }
					}	
				}
					
			}
			
		}else if(frm == 'dealerMasterBean'){
			var dealerMasterName = $("#enter-dealer-master-name").val().trim();
			$("#enter-dealer-master-name").val(dealerMasterName);
			var dealerMasterContactPerson = $("#enter-dealer-master-contact-person").val().trim();
			$("#enter-dealer-master-contact-person").val(dealerMasterContactPerson);
			var dealerMasterPhoneNumber = $("#enter-dealer-master-phone-number").val().trim();
			$("#enter-dealer-master-phone-number").val(dealerMasterPhoneNumber);
			var dealerMasterEmail = $("#enter-dealer-master-email").val().trim();
			$("#enter-dealer-master-email").val(dealerMasterEmail);
			var dealerMasterPanNumber = $("#enter-dealer-master-pan-num").val().trim();
			$("#enter-dealer-master-pan-num").val(dealerMasterPanNumber);
			var dealerMasterAddressFirst = $("#enter-dealer-master-address-line-first").val().trim();
			$("#enter-dealer-master-address-line-first").val(dealerMasterAddressFirst);
			var dealerMasterAddressSecond = $("#enter-dealer-master-address-line-second").val().trim();
			$("#enter-dealer-master-address-line-second").val(dealerMasterAddressSecond);
			var dealerMasterGoogleLoc = $("#enter-dealer-master-google-loc").val().trim();
			$("#enter-dealer-master-google-loc").val(dealerMasterGoogleLoc);
			var dealerMasterPinCode = $("#enter-dealer-master-pin-code").val().trim();
			$("#enter-dealer-master-pin-code").val(dealerMasterPinCode);
			var dealerMasterGstin = $("#enter-dealer-master-gstin").val().trim();
			$("#enter-dealer-master-gstin").val(dealerMasterGstin);
			var dealerMasterOemCode = $("#enter-dealer-master-oem-code").val().trim();
			$("#enter-dealer-master-oem-code").val(dealerMasterOemCode);
			var dealerMasterCelexCode = $("#enter-dealer-master-celex-code").val().trim();
			$("#enter-dealer-master-celex-code").val(dealerMasterCelexCode);
			if($("#select-dealer-master-state-name").val().trim() == "0" || $("#select-dealer-master-zone-name").val().trim() == "0" || $("#select-dealer-master-manufac-name").val().trim() == "0" ||
					dealerMasterName == "" || dealerMasterContactPerson == "" || dealerMasterPhoneNumber == "" || dealerMasterPhoneNumber == "0" || dealerMasterEmail == "" || dealerMasterPanNumber == "" || dealerMasterAddressFirst == "" || dealerMasterAddressSecond == "" || 
					dealerMasterGoogleLoc == "" || $("#select-dealer-master-city-name").val().trim() == "0" || dealerMasterPinCode == "" || dealerMasterPinCode == "0" || dealerMasterGstin == "" || dealerMasterGstin == "0" || $("#select-dealer-master-rate-app").val().trim() == "0" ||
					dealerMasterOemCode == "" || dealerMasterOemCode == "0" || dealerMasterCelexCode == "" || dealerMasterCelexCode == "0" || $("#select-dealer-master-es-first").val().trim() == "0" || $("#select-dealer-master-vehicle-type").val().trim() == "0" || $("#select-dealer-master-es-second").val().trim() == "0"){
				//alert($("#enter-dealer-master-id").val().trim());
				if($("#select-dealer-master-state-name").val().trim() == "" || $("#select-dealer-master-state-name").val().trim() == "0") 
				{
					$("#select-dealer-master-state-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-state-name-note").html("");
						status=true;  
					}
				if($("#select-dealer-master-zone-name").val().trim() == "" || $("#select-dealer-master-zone-name").val().trim() == "0") 
				{
					$("#select-dealer-master-zone-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-zone-name-note").html("");
						status=true;  
					}
				if($("#select-dealer-master-manufac-name").val().trim() == "" || $("#select-dealer-master-manufac-name").val().trim() == "0") 
				{
					$("#select-dealer-master-manufac-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-manufac-name-note").html("");
						status=true;  
					}
				if(dealerMasterName == "" || dealerMasterName == "0") 
				{
					$("#enter-dealer-master-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-dealer-master-name-note").html("");
						status=true;  
					}
				if(dealerMasterContactPerson == "" || dealerMasterContactPerson == "0") 
				{
					$("#enter-dealer-master-contact-person-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-dealer-master-contact-person-note").html("");
						status=true;  
					}
				if(dealerMasterPhoneNumber == "" || dealerMasterPhoneNumber == "0") 
				{
					$("#enter-dealer-master-phone-number-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!mobileNumberValidation.test(dealerMasterPhoneNumber))
					{
						$("#enter-dealer-master-phone-number-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-dealer-master-phone-number-note").html("");
							status=true;  
						}
						//$("#enter-dealer-master-phone-number-note").html("");
						//status=true;  
					}
				if(dealerMasterEmail == "" || dealerMasterEmail == "0") 
				{
					$("#enter-dealer-master-email-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!emailIdValidation.test(dealerMasterEmail))
					{
						$("#enter-dealer-master-email-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-dealer-master-email-note").html("");
							status=true;  
						}
						 
					}
				if(dealerMasterPanNumber == "" || dealerMasterPanNumber == "0") 
				{
					$("#enter-dealer-master-pan-num-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!panNumberValidation.test(dealerMasterPanNumber))
					{
						$("#enter-dealer-master-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-dealer-master-pan-num-note").html("");
						status=true;  
					}
						//$("#enter-dealer-master-pan-num-note").html("");
						//status=true;  
					}
				if(dealerMasterAddressFirst == "" || dealerMasterAddressFirst == "0") 
				{
					$("#enter-dealer-master-address-line-first-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-dealer-master-address-line-first-note").html("");
						status=true;  
					}
				if(dealerMasterAddressSecond == "" || dealerMasterAddressSecond == "0") 
				{
					$("#enter-dealer-master-address-line-second-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-dealer-master-address-line-second-note").html("");
						status=true;  
					}
				if(dealerMasterGoogleLoc == "" || dealerMasterGoogleLoc == "0") 
				{
					$("#enter-dealer-master-google-loc-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-dealer-master-google-loc-note").html("");
						status=true;  
					}
				if($("#select-dealer-master-city-name").val().trim() == "" || $("#select-dealer-master-city-name").val().trim() == "0") 
				{
					$("#select-dealer-master-city-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-city-name-note").html("");
						status=true;  
					}
				if(dealerMasterPinCode == "" || dealerMasterPinCode == "0") 
				{
					$("#enter-dealer-master-pin-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!pinCodeValidation.test(dealerMasterPinCode))
					{
						$("#enter-dealer-master-pin-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						$("#enter-dealer-master-pin-code-note").html("");
						status=true;  
					}
						
					}
				if(dealerMasterGstin == "" || dealerMasterGstin == "0") 
				{
					$("#enter-dealer-master-gstin-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!gstinNumberValidation.test(dealerMasterGstin))
					{
						$("#enter-dealer-master-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-dealer-master-gstin-note").html("");
						status=true;  
					}
						//$("#enter-dealer-master-gstin-note").html("");
						//status=true;  
					}
				if($("#select-dealer-master-rate-app").val().trim() == "" || $("#select-dealer-master-rate-app").val().trim() == "0") 
				{
					$("#select-dealer-master-rate-app-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-rate-app-note").html("");
						status=true;  
					}
				if(dealerMasterOemCode == "" || dealerMasterOemCode == "0") 
				{
					$("#enter-dealer-master-oem-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-dealer-master-oem-code-note").html("");
						status=true;  
					}
				if(dealerMasterCelexCode == "" || dealerMasterCelexCode == "0") 
				{
					$("#enter-dealer-master-celex-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-dealer-master-celex-code-note").html("");
						status=true;  
					}
				if($("#select-dealer-master-es-first").val().trim() == "" || $("#select-dealer-master-es-first").val().trim() == "0") 
				{
					$("#select-dealer-master-es-first-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-es-first-note").html("");
						status=true;  
					}
				if($("#select-dealer-master-vehicle-type").val().trim() == "" || $("#select-dealer-master-vehicle-type").val().trim() == "0") 
				{
					$("#select-dealer-master-vehicle-type-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-vehicle-type-note").html("");
						status=true;  
					}
				if($("#select-dealer-master-es-second").val().trim() == "" || $("#select-dealer-master-es-second").val().trim() == "0") 
				{
					$("#select-dealer-master-es-second-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-dealer-master-es-second-note").html("");
						status=true;  
					}
				if($("#enter-dealer-master-id").val().trim() == "0" || $("#enter-dealer-master-id").val().trim() == ""){
					if($("#dealer-master-file").val().trim() == "" || $("#dealer-master-file").val().trim() == "0") 
					{
						$("#dealer-master-file-note").html("**Please Fill The Required Field");
						status=false; 
					}
					else
						{
							$("#dealer-master-file-note").html("");
							status=true;
						}
				}
			}else if($("#select-dealer-master-state-name").val().trim() != "0" && $("#select-dealer-master-zone-name").val().trim() != "0" && $("#select-dealer-master-manufac-name").val().trim() != "0" &&
					dealerMasterName != "" && dealerMasterContactPerson != "" && (dealerMasterPhoneNumber != "" || dealerMasterPhoneNumber != "0") && dealerMasterEmail != "" && dealerMasterPanNumber != "" && dealerMasterAddressFirst != "" && dealerMasterAddressSecond != "" && 
					dealerMasterGoogleLoc != "" && $("#select-dealer-master-city-name").val().trim() != "0" && (dealerMasterPinCode != "" || dealerMasterPinCode != "0") && (dealerMasterGstin != "" || dealerMasterGstin != "0") && $("#select-dealer-master-rate-app").val().trim() != "0" &&
					(dealerMasterOemCode != "" || dealerMasterOemCode != "0") && (dealerMasterCelexCode != "" || dealerMasterCelexCode != "0") && $("#select-dealer-master-es-first").val().trim() != "0" && $("#select-dealer-master-vehicle-type").val().trim() != "0" && $("#select-dealer-master-es-second").val().trim() != "0"){
					$("#select-dealer-master-state-name-note").html("");
					$("#select-dealer-master-zone-name-note").html("");
					$("#select-dealer-master-manufac-name-note").html("");
					$("#enter-dealer-master-name-note").html("");
					$("#enter-dealer-master-contact-person-note").html("");
					$("#enter-dealer-master-phone-number-note").html("");
					$("#enter-dealer-master-email-note").html("");
					$("#enter-dealer-master-pan-num-note").html("");
					$("#enter-dealer-master-address-line-first-note").html("");
					$("#enter-dealer-master-address-line-second-note").html("");
					$("#enter-dealer-master-google-loc-note").html("");
					$("#select-dealer-master-city-name-note").html("");
					$("#enter-dealer-master-pin-code-note").html("");
					$("#enter-dealer-master-gstin-note").html("");
					$("#select-dealer-master-rate-app-note").html("");
					$("#enter-dealer-master-oem-code-note").html("");
					$("#enter-dealer-master-celex-code-note").html("");
					$("#select-dealer-master-es-first-note").html("");
					$("#select-dealer-master-vehicle-type-note").html("");
					$("#select-dealer-master-es-second-note").html("");
					if(!mobileNumberValidation.test(dealerMasterPhoneNumber))
					{
						$("#enter-dealer-master-phone-number-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-dealer-master-phone-number-note").html("");
							status=true;  
						}
					if(!emailIdValidation.test(dealerMasterEmail))
					{
						$("#enter-dealer-master-email-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-dealer-master-email-note").html("");
							status=true;  
						}
					if(!pinCodeValidation.test(dealerMasterPinCode))
					{
						$("#enter-dealer-master-pin-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						$("#enter-dealer-master-pin-code-note").html("");
						status=true;  
					}
					if(!panNumberValidation.test(dealerMasterPanNumber))
					{
						$("#enter-dealer-master-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-dealer-master-pan-num-note").html("");
						status=true;  
					}
					if(!gstinNumberValidation.test(dealerMasterGstin))
					{
						$("#enter-dealer-master-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-dealer-master-gstin-note").html("");
						status=true;  
					}
					if($("#enter-dealer-master-id").val().trim() == "0" || $("#enter-dealer-master-id").val().trim() == ""){
						if($("#dealer-master-file").val().trim() == "" || $("#dealer-master-file").val().trim() == "0") 
						{
							$("#dealer-master-file-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#dealer-master-file-note").html("");
								status=true;
							}
					}
					if(pinCodeValidation.test(dealerMasterPinCode) && mobileNumberValidation.test(dealerMasterPhoneNumber) && emailIdValidation.test(dealerMasterEmail) && panNumberValidation.test(dealerMasterPanNumber) && gstinNumberValidation.test(dealerMasterGstin)){
						var getAjax = $.ajax({
							async: false,
							type : "GET",
							url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
							success : function( data, status) {						
								/*for(var i=0;i<=data.result.length;i++){							
									//var deliveryVendorCodeResult = data.result[i]['vendorId'].trim().toLowerCase().replace(/\s/g, '');						
									var deliveryVendorIdResult = data.result[i]['id'];						
									//var deliveryVendorCodeString = $("#enter-deli-vendor-code").val().trim().toLowerCase().replace(/\s/g, '');							
									var deliveryVendorIdString = $("#enter-dealer-master-id").val();							
									if(deliveryVendorCodeResult === deliveryVendorCodeString && deliveryVendorIdResult != deliveryVendorIdString){
										$("#enter-deli-vendor-code-note").html("**Found Duplicate Data!");
										postAjax = 121;
										ajaxInsert.abort();
									}else {
										$("#enter-deli-vendor-code-note").html("");
										postAjax = 0;
									}
									}*/},
							error: function(xhr, resp, err) {
					            alert(err);
					        }});
						if(postAjax == 0){
							if($("#enter-dealer-master-id").val().trim() == "0" || $("#enter-dealer-master-id").val().trim() == ""){
								if($("#dealer-master-file").val().trim() == "" || $("#dealer-master-file").val().trim() == "0") 
								{
									$("#dealer-master-file-note").html("**Please Fill The Required Field");
									status=false; 
								}
								else
									{
										$("#dealer-master-file-note").html("");
										status=true;
										ajaxInsert();
									}
							}else{
							$("#dealer-master-file-note").html("");
							ajaxInsert();
						  }
						}	
					}
			}
		}else if(frm == 'factoryMasterBean'){
			var factoryMasterName = $("#enter-factory-name").val().trim();
			$("#enter-factory-name").val(factoryMasterName);
			var factoryMasterContactName = $("#enter-factory-contact").val().trim();
			$("#enter-factory-contact").val(factoryMasterContactName);
			var factoryMasterPhoneNumber = $("#enter-factory-phone").val().trim();
			$("#enter-factory-phone").val(factoryMasterPhoneNumber);
			var factoryMasterEmail = $("#enter-factory-email").val().trim();
			$("#enter-factory-email").val(factoryMasterEmail);
			var factoryMasterAddressFirst= $("#enter-factory-address-line-first").val().trim();
			$("#enter-factory-address-line-first").val(factoryMasterAddressFirst);
			var factoryMasterAddressSecond= $("#enter-factory-address-line-second").val().trim();
			$("#enter-factory-address-line-second").val(factoryMasterAddressSecond);
			var factoryMasterPinCode= $("#enter-factory-pin-code").val().trim();
			$("#enter-factory-pin-code").val(factoryMasterPinCode);
			var factoryMasterPanNumber= $("#enter-factory-pan-num").val().trim();
			$("#enter-factory-pan-num").val(factoryMasterPanNumber);
			var factoryMasterGstin= $("#enter-factory-gstin").val().trim();
			$("#enter-factory-gstin").val(factoryMasterGstin);
			var factoryMasterCode= $("#enter-factory-code").val().trim();
			$("#enter-factory-code").val(factoryMasterCode);
			if(factoryMasterName == "" || factoryMasterContactName == "" || factoryMasterPhoneNumber == "" || factoryMasterEmail == "" || factoryMasterAddressFirst == "" ||
					factoryMasterAddressSecond == "" || $("#select-factory-city").val().trim() == "0" || $("#select-factory-state").val().trim() == "0" || factoryMasterPinCode == "" ||
					factoryMasterPanNumber == "" || factoryMasterGstin == "" || factoryMasterCode == ""){
				if(factoryMasterName == "" || factoryMasterName == "0") 
				{
					$("#enter-factory-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-factory-name-note").html("");
						status=true;  
					}
				if(factoryMasterContactName == "" || factoryMasterContactName == "0") 
				{
					$("#enter-factory-contact-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-factory-contact-note").html("");
						status=true;  
					}
				if(factoryMasterPhoneNumber == "" || factoryMasterPhoneNumber == "0") 
				{
					$("#enter-factory-phone-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!mobileNumberValidation.test(factoryMasterPhoneNumber))
					{
						$("#enter-factory-phone-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-factory-phone-note").html("");
							status=true;  
						}
						//$("#enter-factory-phone-note").html("");
						//status=true;  
					}
				if(factoryMasterEmail == "" || factoryMasterEmail == "0") 
				{
					$("#enter-factory-email-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!emailIdValidation.test(factoryMasterEmail))
					{
						$("#enter-factory-email-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-factory-email-note").html("");
							status=true;  
						}
						//$("#enter-factory-email-note").html("");
						//status=true;  
					}
				if(factoryMasterAddressFirst == "" || factoryMasterAddressFirst == "0") 
				{
					$("#enter-factory-address-line-first-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-factory-address-line-first-note").html("");
						status=true;  
					}
				if(factoryMasterAddressSecond == "" || factoryMasterAddressSecond == "0") 
				{
					$("#enter-factory-address-line-second-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-factory-address-line-second-note").html("");
						status=true;  
					}
				if($("#select-factory-city").val().trim() == "0" || $("#select-factory-city").val().trim() == "") 
				{
					$("#select-factory-city-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-factory-city-note").html("");
						status=true;  
					}
				if($("#select-factory-state").val().trim() == "0" || $("#select-factory-state").val().trim() == "") 
				{
					$("#select-factory-state-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-factory-state-note").html("");
						status=true;  
					}
				if(factoryMasterPinCode == "" || factoryMasterPinCode == "0") 
				{
					$("#enter-factory-pin-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!pinCodeValidation.test(factoryMasterPinCode))
					{
						$("#enter-factory-pin-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						$("#enter-factory-pin-code-note").html("");
						status=true;  
					}
						//$("#enter-factory-pin-code-note").html("");
						//status=true;  
					}
				if(factoryMasterPanNumber == "" || factoryMasterPanNumber == "0") 
				{
					$("#enter-factory-pan-num-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!panNumberValidation.test(factoryMasterPanNumber))
					{
						$("#enter-factory-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-factory-pan-num-note").html("");
						status=true;  
					}
						//$("#enter-factory-pan-num-note").html("");
						//status=true;  
					}
				if(factoryMasterGstin == "" || factoryMasterGstin == "0") 
				{
					$("#enter-factory-gstin-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
					if(!gstinNumberValidation.test(factoryMasterGstin))
					{
						$("#enter-factory-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-factory-gstin-note").html("");
						status=true;  
					}
						//$("#enter-factory-gstin-note").html("");
						//status=true;  
					}
				if(factoryMasterCode == "" || factoryMasterCode == "0") 
				{
					$("#enter-factory-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-factory-code-note").html("");
						status=true;  
					}
				if($("#enter-factory-master-id").val().trim() == "0" || $("#enter-factory-master-id").val().trim() == ""){
					if($("#fitting-master-file").val().trim() == "" || $("#fitting-master-file").val().trim() == "0") 
					{
						$("#fitting-master-file-note").html("**Please Fill The Required Field");
						status=false; 
					}
					else
						{
							$("#fitting-master-file-note").html("");
							status=true;
						}
				}
			}else if(factoryMasterName != "" && factoryMasterContactName != "" && factoryMasterPhoneNumber != "" && factoryMasterEmail != "" && factoryMasterAddressFirst != "" &&
					factoryMasterAddressSecond != "" && $("#select-factory-city").val().trim() != "0" && $("#select-factory-state").val().trim() != "0" && factoryMasterPinCode != "" &&
					factoryMasterPanNumber != "" && factoryMasterGstin != "" && factoryMasterCode != ""){
					$("#enter-factory-name-note").html("");
					$("#enter-factory-contact-note").html("");
					$("#enter-factory-phone-note").html("");
					$("#enter-factory-email-note").html("");
					$("#enter-factory-address-line-first-note").html("");
					$("#enter-factory-address-line-second-note").html("");
					$("#select-factory-city-note").html("");
					$("#select-factory-state-note").html("");
					$("#enter-factory-pin-code-note").html("");
					$("#enter-factory-pan-num-note").html("");
					$("#enter-factory-gstin-note").html("");
					$("#enter-factory-code-note").html("");
					$("#fitting-master-file-note").html("");
					if(!mobileNumberValidation.test(factoryMasterPhoneNumber))
					{
						$("#enter-factory-phone-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-factory-phone-note").html("");
							status=true;  
						}
					if(!emailIdValidation.test(factoryMasterEmail))
					{
						$("#enter-factory-email-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-factory-email-note").html("");
							status=true;  
						}
					if(!pinCodeValidation.test(factoryMasterPinCode))
					{
						$("#enter-factory-pin-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						$("#enter-factory-pin-code-note").html("");
						status=true;  
					}
					if(!panNumberValidation.test(factoryMasterPanNumber))
					{
						$("#enter-factory-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-factory-pan-num-note").html("");
						status=true;  
					}
					if(!gstinNumberValidation.test(factoryMasterGstin))
					{
						$("#enter-factory-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-factory-gstin-note").html("");
						status=true;  
					}
					if($("#enter-factory-master-id").val().trim() == "0" || $("#enter-factory-master-id").val().trim() == ""){
						if($("#fitting-master-file").val().trim() == "" || $("#fitting-master-file").val().trim() == "0") 
						{
							$("#fitting-master-file-note").html("**Please Fill The Required Field");
							status=false; 
						}
						else
							{
								$("#fitting-master-file-note").html("");
								status=true;
							}
					}
				if(pinCodeValidation.test(factoryMasterPinCode) && mobileNumberValidation.test(factoryMasterPhoneNumber) && emailIdValidation.test(factoryMasterEmail) && panNumberValidation.test(factoryMasterPanNumber) && gstinNumberValidation.test(factoryMasterGstin)){
					var getAjax = $.ajax({
						async: false,
						type : "GET",
						url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
						success : function( data, status) {						
							for(var i=0;i<=data.result.length;i++){							
								var fittingMasterCodeResult = data.result[i]['factoryCode'].trim().toLowerCase().replace(/\s/g, '');						
								var fittingMasterIdResult = data.result[i]['id'];						
								var fittingMasterCodeString = $("#enter-factory-code").val().trim().toLowerCase().replace(/\s/g, '');							
								var fittingMasterIdString = $("#enter-factory-master-id").val();							
								if(fittingMasterCodeResult === fittingMasterCodeString && fittingMasterIdResult != fittingMasterIdString){
									$("#enter-factory-code-note").html("**Found Duplicate Data!");
									postAjax = 121;
									ajaxInsert.abort();
								}else {
									$("#enter-factory-code-note").html("");
									postAjax = 0;
								}
								}},
						error: function(xhr, resp, err) {
				            alert(err);
				        }});
					if(postAjax == 0){
						if($("#enter-factory-master-id").val().trim() == "0" || $("#enter-factory-master-id").val().trim() == ""){
							if($("#fitting-master-file").val().trim() == "" || $("#fitting-master-file").val().trim() == "0") 
							{
								$("#fitting-master-file-note").html("**Please Fill The Required Field");
								status=false; 
							}
							else
								{
									$("#fitting-master-file-note").html("");
									status=true;
									$("#enter-factory-code-note").html("");
									ajaxInsert();
								}
						}else{
						$("#enter-factory-code-note").html("");
						ajaxInsert();
					  }
					}
				}
			}
		}else if(frm == 'productionLineMaster'){
			var productLineName = $("#enter-prod-line-name").val().trim();
			$("#enter-prod-line-name").val(productLineName);
			var productLineCode = $("#enter-prod-line-code").val().trim();
			$("#enter-prod-line-code").val(productLineCode);
			if(productLineName == "" || productLineCode == "" || $("#select-prod-line-factory").val().trim() == "0"){
				if(productLineName == "" || productLineName == "0") 
				{
					$("#enter-prod-line-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-prod-line-name-note").html("");
						status=true;  
					}
				if(productLineCode == "" || productLineCode == "0") 
				{
					$("#enter-prod-line-code-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-prod-line-code-note").html("");
						status=true;  
					}
				if($("#select-prod-line-factory").val().trim() == "" || $("#select-prod-line-factory").val().trim() == "0") 
				{
					$("#select-prod-line-factory-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-prod-line-factory-note").html("");
						status=true;  
					}
			}else if(productLineName != "" && productLineCode != "" && $("#select-prod-line-factory").val().trim() != "0"){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {
						$("#enter-prod-line-name-note").html("");
						$("#enter-prod-line-code-note").html("");
						$("#select-prod-line-factory-note").html("");
						for(var i=0;i<=data.result.length;i++){							
							var productLineCodeResult = data.result[i]['productionLineCode'].trim().toLowerCase().replace(/\s/g, '');						
							var productLineIdResult = data.result[i]['id'];						
							var productLineCodeString = $("#enter-prod-line-code").val().trim().toLowerCase().replace(/\s/g, '');							
							var productLineIdString = $("#enter-prod-line-id").val();							
							if(productLineCodeResult === productLineCodeString && productLineIdResult != productLineIdString){
								$("#enter-prod-line-code-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#enter-prod-line-code-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-prod-line-code-note").html("");
					ajaxInsert();
				 }
			}
		}else if(frm == 'unitMasterFrm'){
			var unitMasterName = $("#enter-unit-name").val().trim();
			$("#enter-unit-name").val(unitMasterName);
			var unitRepresentationName = $("#enter-unit-representation").val().trim();
			$("#enter-unit-representation").val(unitRepresentationName);
			if(unitMasterName == "" || unitRepresentationName == ""){
				if(unitMasterName == "" || unitMasterName == "0") 
				{
					$("#enter-unit-name-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-unit-name-note").html("");
						status=true;  
					}
				if(unitRepresentationName == "" || unitRepresentationName == "0") 
				{
					$("#enter-unit-representation-note").html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#enter-unit-representation-note").html("");
						status=true;  
					}
			}else if(unitMasterName != "" && unitRepresentationName != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {
						$("#enter-unit-name-note").html("");
						$("#enter-unit-representation-note").html("");
						for(var i=0;i<=data.result.length;i++){							
							var unitMasterNameResult = data.result[i]['unitCode'].trim().toLowerCase().replace(/\s/g, '');						
							var unitMasterIdResult = data.result[i]['id'];						
							var unitMasterNameString = $("#enter-unit-name").val().trim().toLowerCase().replace(/\s/g, '');							
							var unitMasterIdString = $("#enter-unit-master-id").val();							
							if(unitMasterNameResult === unitMasterNameString && unitMasterIdResult != unitMasterIdString){
								$("#enter-unit-name-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#enter-unit-name-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-unit-name-note").html("");
					ajaxInsert();
				 }
			}
		}else if(frm == 'rawMaterialMaster0' || frm == 'rawMaterialMaster1' || frm == 'rawMaterialMaster2'){
			var indexNumber = frm.substring(17, 18);
			var frmName = frm.substring(0, 17);
			var status=false;
			var rawMaterialItemId = $("#select-raw-material-item-id"+indexNumber).val().trim();
			var rawMaterialItemDimension = $("#select-raw-material-item-dim"+indexNumber).val().trim();
			var rawMaterialItemUnit = $("#select-raw-material-unit"+indexNumber).val().trim();
			var rawMaterialItemCode = $("#select-raw-material-item-code"+indexNumber).val().trim();
			$("#select-raw-material-item-code"+indexNumber).val(rawMaterialItemCode);	
			var rawMaterialItemHsnCode = $("#select-raw-material-item-hsn-code"+indexNumber).val().trim();
			$("#select-raw-material-item-hsn-code"+indexNumber).val(rawMaterialItemHsnCode);	
			if(rawMaterialItemDimension == "0" || rawMaterialItemUnit == "0" || rawMaterialItemCode == "" || rawMaterialItemHsnCode == ""){
				if(rawMaterialItemDimension == "" || rawMaterialItemDimension == "0") 
				{
					$("#select-raw-material-item-dim-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-raw-material-item-dim-note"+indexNumber).html("");
						status=true;  
					}
				if(rawMaterialItemUnit == "" || rawMaterialItemUnit == "0") 
				{
					$("#select-raw-material-unit-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-raw-material-unit-note"+indexNumber).html("");
						status=true;  
					}
				if(rawMaterialItemCode == "" || rawMaterialItemCode == "0") 
				{
					$("#select-raw-material-item-code-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-raw-material-item-code-note"+indexNumber).html("");
						status=true;  
					}
				if(rawMaterialItemHsnCode == "" || rawMaterialItemHsnCode == "0") 
				{
					$("#select-raw-material-item-hsn-code-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-raw-material-item-hsn-code-note"+indexNumber).html("");
						status=true;  
					}
			}else if(rawMaterialItemDimension != "0" && rawMaterialItemUnit != "0" && rawMaterialItemCode != "" && rawMaterialItemHsnCode != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frmName,
					success : function( data, status) {
						$("#select-raw-material-item-dim-note"+indexNumber).html("");
						$("#select-raw-material-unit-note"+indexNumber).html("");
						$("#select-raw-material-item-code-note"+indexNumber).html("");
							$("#select-raw-material-item-hsn-code-note"+indexNumber).html("");
						for(var i=0;i<=data.result.length;i++){							
							var rawMaterialItemHsnCodeResult = data.result[i]['itemHsn'].trim().toLowerCase().replace(/\s/g, '');						
							var rawMaterialIdResult = data.result[i]['id'];	
							var rawMaterialItemHsnCodeString = rawMaterialItemHsnCode.toLowerCase().replace(/\s/g, '');							
							var rawMaterialIdString = $("#enter-raw-material-id"+indexNumber).val();
							if(rawMaterialItemHsnCodeResult === rawMaterialItemHsnCodeString && rawMaterialIdResult != rawMaterialIdString){
								$("#select-raw-material-item-hsn-code-note"+indexNumber).html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#select-raw-material-item-hsn-code-note"+indexNumber).html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#select-raw-material-item-hsn-code-note"+indexNumber).html("");
					ajaxInsert();
				 }
			}
		}else if(frm == 'looseToolMaster0' || frm == 'looseToolMaster1' || frm == 'looseToolMaster2'){
			var indexNumber = frm.substring(15, 16);
			var frmName = frm.substring(0, 15);
			var status=false;
			var looseMaterialItemId = $("#select-loose-material-item-id"+indexNumber).val().trim();
			var looseMaterialItemColour = $("#select-loose-material-hot-foil-color"+indexNumber).val().trim();
			var looseMaterialItemDimension = $("#select-loose-material-plate-dim"+indexNumber).val().trim();
			var looseMaterialItemUnit = $("#select-loose-material-unit"+indexNumber).val().trim();
			var looseMaterialItemCode = $("#select-loose-material-item-code"+indexNumber).val().trim();
			$("#select-loose-material-item-code"+indexNumber).val(looseMaterialItemCode);	
			var looseMaterialHsnCode = $("#select-loose-material-hsn-code"+indexNumber).val().trim();
			$("#select-loose-material-hsn-code"+indexNumber).val(looseMaterialHsnCode);
			if(looseMaterialItemColour == "0" || looseMaterialItemDimension == "0" || looseMaterialItemUnit == "0" || looseMaterialItemCode == "" || looseMaterialHsnCode == ""){
				if(looseMaterialItemColour == "" || looseMaterialItemColour == "0") 
				{
					$("#select-loose-material-hot-foil-color-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-loose-material-hot-foil-color-note"+indexNumber).html("");
						status=true;  
					}
				if(looseMaterialItemDimension == "" || looseMaterialItemDimension == "0") 
				{
					$("#select-loose-material-plate-dim-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-loose-material-plate-dim-note"+indexNumber).html("");
						status=true;  
					}
				if(looseMaterialItemUnit == "" || looseMaterialItemUnit == "0") 
				{
					$("#select-loose-material-unit-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-loose-material-unit-note"+indexNumber).html("");
						status=true;  
					}
				if(looseMaterialItemCode == "" || looseMaterialItemCode == "0") 
				{
					$("#select-loose-material-item-code-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-loose-material-item-code-note"+indexNumber).html("");
						status=true;  
					}
				if(looseMaterialHsnCode == "" || looseMaterialHsnCode == "0") 
				{
					$("#select-loose-material-hsn-code-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}
				else
					{
						$("#select-loose-material-hsn-code-note"+indexNumber).html("");
						status=true;  
					}
			}else if(looseMaterialItemColour != "0" && looseMaterialItemDimension != "0" && looseMaterialItemUnit != "0" && looseMaterialItemCode != "" && looseMaterialHsnCode != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frmName,
					success : function( data, status) {
						$("#select-loose-material-hot-foil-color-note"+indexNumber).html("");
						$("#select-loose-material-plate-dim-note"+indexNumber).html("");
						$("#select-loose-material-unit-note"+indexNumber).html("");
							$("#select-loose-material-item-code-note"+indexNumber).html("");
							$("#select-loose-material-hsn-code-note"+indexNumber).html("");
						for(var i=0;i<=data.result.length;i++){							
							var looseMaterialItemHsnCodeResult = data.result[i]['itemType'].trim().toLowerCase().replace(/\s/g, '');	
							
							var looseMaterialIdResult = data.result[i]['id'];
							alert(looseMaterialIdResult);
							var looseMaterialItemHsnCodeString = looseMaterialHsnCode.toLowerCase().replace(/\s/g, '');	
							
							var looseMaterialIdString = $("#select-loose-material-id"+indexNumber).val();
							alert(looseMaterialIdString);
							if(looseMaterialItemHsnCodeResult === looseMaterialItemHsnCodeString && looseMaterialIdResult != looseMaterialIdString){
								$("#select-loose-material-hsn-code-note"+indexNumber).html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#select-loose-material-hsn-code-note"+indexNumber).html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#select-loose-material-hsn-code-note"+indexNumber).html("");
					ajaxInsert();
				 }
			}
				
		}else if(frm == 'hotStampingWithPlatesize'){
			if($("#select-hot-stamp-plate-type").val().trim() == "0" || $("#select-hot-stamp-plate-hsf-color").val().trim() == "0" || $("#select-hot-stamp-plate-hsf-dim").val().trim() == "0" || $("#select-hot-stamp-plate-hsf-type").val().trim() == "0"){
				if($("#select-hot-stamp-plate-type").val().trim() == "0" || $("#select-hot-stamp-plate-type").val().trim() == ""){
					$("#select-hot-stamp-plate-type-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-hot-stamp-plate-type-note").html("");
					status=true; 
				}
				if($("#select-hot-stamp-plate-hsf-color").val().trim() == "0" || $("#select-hot-stamp-plate-hsf-color").val().trim() == ""){
					$("#select-hot-stamp-plate-hsf-color-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-hot-stamp-plate-hsf-color-note").html("");
					status=true; 
				}
				if($("#select-hot-stamp-plate-hsf-dim").val().trim() == "0" || $("#select-hot-stamp-plate-hsf-dim").val().trim() == ""){
					$("#select-hot-stamp-plate-hsf-dim-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-hot-stamp-plate-hsf-dim-note").html("");
					status=true; 
				}
				if($("#select-hot-stamp-plate-hsf-type").val().trim() == "0" || $("#select-hot-stamp-plate-hsf-type").val().trim() == ""){
					$("#select-hot-stamp-plate-hsf-type-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-hot-stamp-plate-hsf-type-note").html("");
					status=true; 
				}
			}else if($("#select-hot-stamp-plate-type").val().trim() != "0" && $("#select-hot-stamp-plate-hsf-color").val().trim() != "0" && $("#select-hot-stamp-plate-hsf-dim").val().trim() != "0" && $("#select-hot-stamp-plate-hsf-type").val().trim() != "0"){
				$("#select-hot-stamp-plate-type-note").html("");
				$("#select-hot-stamp-plate-hsf-color-note").html("");
				$("#select-hot-stamp-plate-hsf-dim-note").html("");
				$("#select-hot-stamp-plate-hsf-type-note").html("");
				ajaxInsert();
			}
		}else if(frm == 'productionDetails'){
			var productDetailsAlumQuantity = $("#enter-prod-details-alum-qty").val().trim();
			$("#enter-prod-details-alum-qty").val(productDetailsAlumQuantity);
			var productDetailsRsQuantity = $("#enter-prod-details-rs-qty").val().trim();
			$("#enter-prod-details-rs-qty").val(productDetailsRsQuantity);
			var productDetailsCode = $("#enter-prod-detail-code").val().trim();
			$("#enter-prod-detail-code").val(productDetailsCode);
			if($("#select-prod-details-plate-type").val().trim() == "0" || $("#select-prod-details-alum-type").val().trim() == "0" || productDetailsAlumQuantity == "" || $("#select-prod-details-alum-unit").val().trim() == "0" || $("#select-prod-details-rs-type").val().trim() == "0" ||
					productDetailsRsQuantity == "" || $("#select-prod-details-rs-unit").val().trim() == "0" || productDetailsCode == ""){
				if($("#select-prod-details-plate-type").val().trim() == "0" || $("#select-prod-details-plate-type").val().trim() == ""){
					$("#select-prod-details-plate-type-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-prod-details-plate-type-note").html("");
					status=true; 
				}
				if($("#select-prod-details-alum-type").val().trim() == "0" || $("#select-prod-details-plate-type").val().trim() == ""){
					$("#select-prod-details-alum-type-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-prod-details-alum-type-note").html("");
					status=true; 
				}
				if(productDetailsAlumQuantity == "0" || productDetailsAlumQuantity == ""){
					$("#enter-prod-details-alum-qty-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-prod-details-alum-qty-note").html("");
					status=true; 
				}
				if($("#select-prod-details-alum-unit").val().trim() == "0" || $("#select-prod-details-alum-unit").val().trim() == ""){
					$("#select-prod-details-alum-unit-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-prod-details-alum-unit-note").html("");
					status=true; 
				}
				if($("#select-prod-details-rs-type").val().trim() == "0" || $("#select-prod-details-rs-type").val().trim() == ""){
					$("#select-prod-details-rs-type-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-prod-details-rs-type-note").html("");
					status=true; 
				}
				if(productDetailsRsQuantity == "0" || productDetailsRsQuantity == ""){
					$("#enter-prod-details-rs-qty-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-prod-details-rs-qty-note").html("");
					status=true; 
				}
				if($("#select-prod-details-rs-unit").val().trim() == "0" || $("#select-prod-details-rs-unit").val().trim() == ""){
					$("#select-prod-details-rs-unit-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-prod-details-rs-unit-note").html("");
					status=true; 
				}
				if(productDetailsCode == "0" || productDetailsCode == ""){
					$("#enter-prod-detail-code-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-prod-detail-code-note").html("");
					status=true; 
				}
			}else if($("#select-prod-details-plate-type").val().trim() != "0" && $("#select-prod-details-alum-type").val().trim() != "0" && productDetailsAlumQuantity != "" && $("#select-prod-details-alum-unit").val().trim() != "0" && $("#select-prod-details-rs-type").val().trim() != "0" &&
					productDetailsRsQuantity != "" && $("#select-prod-details-rs-unit").val().trim() != "0" && productDetailsCode != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {
						$("#select-prod-details-plate-type-note").html("");
						$("#select-prod-details-alum-type-note").html("");
						$("#enter-prod-details-alum-qty-note").html("");
						$("#select-prod-details-alum-unit-note").html("");
						$("#select-prod-details-rs-type-note").html("");
						$("#enter-prod-details-rs-qty-note").html("");
						$("#select-prod-details-rs-unit-note").html("");
						$("#enter-prod-detail-code-note").html("");
						for(var i=0;i<=data.result.length;i++){							
							var productionDetailsCodeResult = data.result[i]['productionCode'].trim().toLowerCase().replace(/\s/g, '');						
							var productionDetailsIdResult = data.result[i]['id'];						
							var productionDetailsCodeString = $("#enter-prod-detail-code").val().trim().toLowerCase().replace(/\s/g, '');							
							var productionDetailsIdString = $("#enter-prod-details-id").val();							
							if(productionDetailsCodeResult === productionDetailsCodeString && productionDetailsIdResult != productionDetailsIdString){
								$("#enter-prod-detail-code-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#enter-prod-detail-code-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-prod-detail-code-note").html("");
					ajaxInsert();
				 }
			}
				
		}else if(frm == 'supplierMasterBean'){
			var supplierMasterName = $("#enter-supplier-master-name").val().trim();
			$("#enter-supplier-master-name").val(supplierMasterName);
			var supplierMasterContact = $("#enter-supplier-master-contact").val().trim();
			$("#enter-supplier-master-contact").val(supplierMasterContact);
			var supplierMasterPhone = $("#enter-supplier-master-phone").val().trim();
			$("#enter-supplier-master-phone").val(supplierMasterPhone);
			var supplierMasterEmail = $("#enter-supplier-master-email").val().trim();
			$("#enter-supplier-master-email").val(supplierMasterEmail);
			var supplierMasterAddressFirst = $("#enter-supplier-master-address-line-first").val().trim();
			$("#enter-supplier-master-address-line-first").val(supplierMasterAddressFirst);
			var supplierMasterAddressSecond = $("#enter-supplier-master-address-line-second").val().trim();
			$("#enter-supplier-master-address-line-second").val(supplierMasterAddressSecond);
			var supplierMasterCity = $("#select-supplier-master-city").val().trim();
			var supplierMasterState = $("#select-supplier-master-state").val().trim();
			var supplierMasterPinCode = $("#enter-supplier-master-pin-code").val().trim();
			$("#enter-supplier-master-pin-code").val(supplierMasterPinCode);
			var supplierMasterPanNumber = $("#enter-supplier-master-pan-num").val().trim();
			$("#enter-supplier-master-pan-num").val(supplierMasterPanNumber);
			var supplierMasterGstin = $("#enter-supplier-master-gstin").val().trim();
			$("#enter-supplier-master-gstin").val(supplierMasterGstin);
			var supplierMasterRawMaterial = $("#select-supplier-master-raw-material").val().trim();
			var supplierMasterVendorCode = $("#enter-supplier-master-vendor-code").val().trim();
			$("#enter-supplier-master-vendor-code").val(supplierMasterVendorCode);
			var supplierMasterDeliveryTime = $("#enter-supplier-master-deli-time").val().trim();
			$("#enter-supplier-master-deli-time").val(supplierMasterDeliveryTime);
			if(supplierMasterName == "" || supplierMasterContact == "" || supplierMasterPhone == "" || supplierMasterEmail == "" || supplierMasterAddressFirst == "" || supplierMasterAddressSecond == "" ||
					supplierMasterCity == "0" || supplierMasterState == "0" || supplierMasterPinCode == "" || supplierMasterPanNumber == "" || supplierMasterGstin == "" || supplierMasterRawMaterial == "0" ||
					supplierMasterVendorCode == "" || supplierMasterDeliveryTime == ""){
				if(supplierMasterName == "0" || supplierMasterName == ""){
					$("#enter-supplier-master-name-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-supplier-master-name-note").html("");
					status=true; 
				}
				if(supplierMasterContact == "0" || supplierMasterContact == ""){
					$("#enter-supplier-master-contact-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-supplier-master-contact-note").html("");
					status=true; 
				}
				if(supplierMasterPhone == "0" || supplierMasterPhone == ""){
					$("#enter-supplier-master-phone-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!mobileNumberValidation.test(supplierMasterPhone)){
						$("#enter-supplier-master-phone-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}else{
							$("#enter-supplier-master-phone-note").html("");
							status=true;  
						}
					//$("#enter-supplier-master-phone-note").html("");
					//status=true; 
				}
				if(supplierMasterEmail == "0" || supplierMasterEmail == ""){
					$("#enter-supplier-master-email-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!emailIdValidation.test(supplierMasterEmail)){
						$("#enter-supplier-master-email-note").html("**Please enter valid email id");
						status=false; 
					}else{
							$("#enter-supplier-master-email-note").html("");
							status=true;  
						}
					//$("#enter-supplier-master-email-note").html("");
					//status=true; 
				}
				if(supplierMasterAddressFirst == "0" || supplierMasterAddressFirst == ""){
					$("#enter-supplier-master-address-line-first-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-supplier-master-address-line-first-note").html("");
					status=true; 
				}
				if(supplierMasterAddressSecond == "0" || supplierMasterAddressSecond == ""){
					$("#enter-supplier-master-address-line-second-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-supplier-master-address-line-second-note").html("");
					status=true; 
				}
				if(supplierMasterCity == "0" || supplierMasterCity == ""){
					$("#select-supplier-master-city-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-supplier-master-city-note").html("");
					status=true; 
				}
				if(supplierMasterState == "0" || supplierMasterState == ""){
					$("#select-supplier-master-state-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-supplier-master-state-note").html("");
					status=true; 
				}
				if(supplierMasterPinCode == "0" || supplierMasterPinCode == ""){
					$("#enter-supplier-master-pin-code-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!pinCodeValidation.test(supplierMasterPinCode)){
						$("#enter-supplier-master-pin-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						$("#enter-supplier-master-pin-code-note").html("");
						status=true;  
					}
					//$("#enter-supplier-master-pin-code-note").html("");
					//status=true; 
				}
				if(supplierMasterPanNumber == "0" || supplierMasterPanNumber == ""){
					$("#enter-supplier-master-pan-num-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!panNumberValidation.test(supplierMasterPanNumber))
					{
						$("#enter-supplier-master-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-supplier-master-pan-num-note").html("");
						status=true;  
					}
					//$("#enter-supplier-master-pan-num-note").html("");
					//status=true; 
				}
				if(supplierMasterGstin == "0" || supplierMasterGstin == ""){
					$("#enter-supplier-master-gstin-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!gstinNumberValidation.test(supplierMasterGstin))
					{
						$("#enter-supplier-master-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-supplier-master-gstin-note").html("");
						status=true;  
					}
					//$("#enter-supplier-master-gstin-note").html("");
					//status=true; 
				}
				if(supplierMasterRawMaterial == "0" || supplierMasterRawMaterial == ""){
					$("#select-supplier-master-raw-material-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-supplier-master-raw-material-note").html("");
					status=true; 
				}
				if(supplierMasterVendorCode == "0" || supplierMasterVendorCode == ""){
					$("#enter-supplier-master-vendor-code-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-supplier-master-vendor-code-note").html("");
					status=true; 
				}
				if(supplierMasterDeliveryTime == "0" || supplierMasterDeliveryTime == ""){
					$("#enter-supplier-master-deli-time-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-supplier-master-deli-time-note").html("");
					status=true; 
				}
				if($("#enter-supplier-master-id").val().trim() == "0" || $("#enter-supplier-master-id").val().trim() == ""){
					if($("#enter-supplier-master-file").val().trim() == "0" || $("#enter-supplier-master-file").val().trim() == ""){
						$("#enter-supplier-master-file-note").html("**Please Fill The Required Field");
						status=false; 
					}else{
						$("#enter-supplier-master-file-note").html("");
						status=true; 
					}
				}
			}else if(supplierMasterName != "" && supplierMasterContact != "" && supplierMasterPhone != "" && supplierMasterEmail != "" && supplierMasterAddressFirst != "" && supplierMasterAddressSecond != "" &&
					supplierMasterCity != "0" && supplierMasterState != "0" && supplierMasterPinCode != "" && supplierMasterPanNumber != "" && supplierMasterGstin != "" && supplierMasterRawMaterial != "0" &&
					supplierMasterVendorCode != "" && supplierMasterDeliveryTime != ""){
					$("#enter-supplier-master-name-note").html("");
					$("#enter-supplier-master-contact-note").html("");
					$("#enter-supplier-master-phone-note-note").html("");
					$("#enter-supplier-master-email-note").html("");
					$("#enter-supplier-master-address-line-first-note").html("");
					$("#enter-supplier-master-address-line-second-note").html("");
					$("#select-supplier-master-city-note").html("");
					$("#select-supplier-master-state-note").html("");
					$("#enter-supplier-master-pin-code-note").html("");
					$("#enter-supplier-master-pan-num-note").html("");
					$("#enter-supplier-master-gstin-note").html("");
					$("#select-supplier-master-raw-material-note").html("");
					$("#enter-supplier-master-vendor-code-note").html("");
					$("#enter-supplier-master-deli-time-note").html("");
					$("#enter-supplier-master-file-note").html("");
				if(!mobileNumberValidation.test(supplierMasterPhone)){
					$("#enter-supplier-master-phone-note").html("**Mobile number should only be 10 digits");
					status=false; 
				}else{
						$("#enter-supplier-master-phone-note").html("");
						status=true;  
					}
				if(!emailIdValidation.test(supplierMasterEmail)){
					$("#enter-supplier-master-email-note").html("**Please enter valid email id");
					status=false; 
				}else{
						$("#enter-supplier-master-email-note").html("");
						status=true;  
					}
				if(!pinCodeValidation.test(supplierMasterPinCode)){
					$("#enter-supplier-master-pin-code-note").html("**zipcode should only be 5 digits");
					status=false; 
				}else{
					$("#enter-supplier-master-pin-code-note").html("");
					status=true;  
				}
				if(!panNumberValidation.test(supplierMasterPanNumber))
				{
					$("#enter-supplier-master-pan-num-note").html("**Please enter valid pan Number");
					status=false; 
				}else{
					$("#enter-supplier-master-pan-num-note").html("");
					status=true;  
				}
				if(!gstinNumberValidation.test(supplierMasterGstin))
				{
					$("#enter-supplier-master-gstin-note").html("**Please enter valid gstin Number");
					status=false; 
				}else{
					$("#enter-supplier-master-gstin-note").html("");
					status=true;  
				}
				if($("#enter-supplier-master-id").val().trim() == "0" || $("#enter-supplier-master-id").val().trim() == ""){
					if($("#enter-supplier-master-file").val().trim() == "0" || $("#enter-supplier-master-file").val().trim() == ""){
						$("#enter-supplier-master-file-note").html("**Please Fill The Required Field");
						status=false; 
					}else{
						$("#enter-supplier-master-file-note").html("");
						status=true; 
					}
				}
			if(pinCodeValidation.test(supplierMasterPinCode) && mobileNumberValidation.test(supplierMasterPhone) && emailIdValidation.test(supplierMasterEmail) && panNumberValidation.test(supplierMasterPanNumber) && gstinNumberValidation.test(supplierMasterGstin)){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {						
						for(var i=0;i<=data.result.length;i++){							
							var supplierMasterVendorCodeResult = data.result[i]['vendorCode'].trim().toLowerCase().replace(/\s/g, '');						
							var supplierMasterVendorIdResult = data.result[i]['id'];						
							var supplierMasterVendorCodeString = supplierMasterVendorCode.toLowerCase().replace(/\s/g, '');							
							var supplierMasterVendorIdString = $("#enter-supplier-master-id").val();							
							if(supplierMasterVendorCodeResult === supplierMasterVendorCodeString && supplierMasterVendorIdResult != supplierMasterVendorIdString){
								$("#enter-supplier-master-vendor-code-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#enter-supplier-master-vendor-code-note").html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					if($("#enter-supplier-master-id").val().trim() == "0" || $("#enter-supplier-master-id").val().trim() == ""){
						if($("#enter-supplier-master-file").val().trim() == "0" || $("#enter-supplier-master-file").val().trim() == ""){
							$("#enter-supplier-master-file-note").html("**Please Fill The Required Field");
							status=false; 
						}else{
							$("#enter-supplier-master-file-note").html("");
							status=true; 
							$("#enter-supplier-master-vendor-code-note").html("");
							ajaxInsert();
						}
					}else{
					$("#enter-supplier-master-vendor-code-note").html("");
					ajaxInsert();
				  }
				}
			}
			
		  }
		}else if(frm == 'DetailsMasterBean0' || frm == 'DetailsMasterBean1' || frm == 'DetailsMasterBean2' || frm == 'DetailsMasterBean3' || frm == 'DetailsMasterBean4' || frm == 'DetailsMasterBean5'){
			
			var indexNumber = frm.substring(17, 18);
			alert(indexNumber);
			var frmName = frm.substring(0, 17);
			alert(frmName);
			var status=false;
			var detailsMasterBoxColour = $("#enter-details-material-box-colour"+indexNumber).val().trim();
			var detailsMasterBoxUnit = $("#enter-details-material-box-unit"+indexNumber).val().trim();
			var detailsMasterBoxWidth = $("#enter-details-material-box-width"+indexNumber).val().trim();
			$("#enter-details-material-box-width"+indexNumber).val(detailsMasterBoxWidth);
			var detailsMasterBoxLength = $("#enter-details-material-box-length"+indexNumber).val().trim();
			$("#enter-details-material-box-length"+indexNumber).val(detailsMasterBoxLength);
			var detailsMasterBoxHeight = $("#enter-details-material-box-height"+indexNumber).val().trim();
			$("#enter-details-material-box-height"+indexNumber).val(detailsMasterBoxHeight);
			var detailsMasterBoxCode = $("#enter-details-material-box-code"+indexNumber).val().trim();
			$("#enter-details-material-box-code"+indexNumber).val(detailsMasterBoxCode);
			var detailsMasterHsnCode = $("#enter-details-material-hsn-code"+indexNumber).val().trim();
			$("#enter-details-material-hsn-code"+indexNumber).val(detailsMasterHsnCode);
			if(detailsMasterBoxColour == "0" || detailsMasterBoxUnit == "0" || detailsMasterBoxWidth == "" || detailsMasterBoxHeight == "" ||
					detailsMasterBoxCode == "" || detailsMasterHsnCode == ""){
				if(detailsMasterBoxColour == "0" || detailsMasterBoxColour == ""){
					$("#enter-details-material-box-colour-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-details-material-box-colour-note"+indexNumber).html("");
					status=true; 
				}
				if(detailsMasterBoxUnit == "0" || detailsMasterBoxUnit == ""){
					$("#enter-details-material-box-unit-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-details-material-box-unit-note"+indexNumber).html("");
					status=true; 
				}
				if(detailsMasterBoxWidth == "0" || detailsMasterBoxWidth == ""){
					$("#enter-details-material-box-width-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-details-material-box-width-note"+indexNumber).html("");
					status=true; 
				}
				if(detailsMasterBoxLength == "0" || detailsMasterBoxLength == ""){
					$("#enter-details-material-box-length-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-details-material-box-length-note"+indexNumber).html("");
					status=true; 
				}
				if(detailsMasterBoxHeight == "0" || detailsMasterBoxHeight == ""){
					$("#enter-details-material-box-height-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-details-material-box-height-note"+indexNumber).html("");
					status=true; 
				}
				if(detailsMasterBoxCode == "0" || detailsMasterBoxCode == ""){
					$("#enter-details-material-box-code-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-details-material-box-code-note"+indexNumber).html("");
					status=true; 
				}
				if(detailsMasterHsnCode == "0" || detailsMasterHsnCode == ""){
					$("#enter-details-material-hsn-code-note"+indexNumber).html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-details-material-hsn-code-note"+indexNumber).html("");
					status=true; 
				}
			}else if(detailsMasterBoxColour != "0" && detailsMasterBoxUnit != "0" && detailsMasterBoxWidth != "" && detailsMasterBoxHeight != "" &&
					detailsMasterBoxCode != "" && detailsMasterHsnCode != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frmName,
					success : function( data, status) {
						$("#enter-details-material-box-colour-note"+indexNumber).html("");
						$("#enter-details-material-box-unit-note"+indexNumber).html("");
						$("#enter-details-material-box-width-note"+indexNumber).html("");
						$("#enter-details-material-box-length-note"+indexNumber).html("");
						$("#enter-details-material-box-height-note"+indexNumber).html("");
						$("#enter-details-material-box-code-note"+indexNumber).html("");
						$("#enter-details-material-hsn-code-note"+indexNumber).html("");
						for(var i=0;i<=data.result.length;i++){							
							var DetailsMasterHsnCodeResult = data.result[i]['hsnCode'].trim().toLowerCase().replace(/\s/g, '');						
							var DetailsMasterIdResult = data.result[i]['id'];						
							var DetailsMasterHsnCodeString = detailsMasterHsnCode.toLowerCase().replace(/\s/g, '');							
							var DetailsMasterIdString = $("#enter-details-material-id"+indexNumber).val();							
							if(DetailsMasterHsnCodeResult === DetailsMasterHsnCodeString && DetailsMasterIdResult != DetailsMasterIdString){
								$("#enter-details-material-hsn-code-note"+indexNumber).html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}else {
								$("#enter-details-material-hsn-code-note"+indexNumber).html("");
								postAjax = 0;
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-details-material-hsn-code-note"+indexNumber).html("");
					ajaxInsert();
				 }
			}
				
		}else if(frm == 'reasonDescMaster'){
			var reasonName = $("#enter-reason-name").val().trim();
			$("#enter-reason-name").val(reasonName);
			var reasonCode = $("#enter-reason-code").val().trim();
			$("#enter-reason-code").val(reasonCode);
			if(reasonName == "" || reasonCode  == ""){
				if(reasonName == "0" || reasonName == ""){
					$("#enter-reason-name-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-reason-name-note").html("");
					status=true; 
				}
				if(reasonCode == "0" || reasonCode == ""){
					$("#enter-reason-code-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-reason-code-note").html("");
					status=true; 
				}
			}else if(reasonName != "" && reasonCode  != ""){
				var getAjax = $.ajax({
					async: false,
					type : "GET",
					url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
					success : function( data, status) {	
						$("#enter-reason-name-note").html("");
						$("#enter-reason-code-note").html("");
						for(var i=0;i<=data.result.length;i++){	
							var reasonCodeResult = data.result[i]['contactPerson'].trim().toLowerCase().replace(/\s/g, '');
							var reasonIdResult = data.result[i]['id'];
							var reasonCodeString = $("#enter-reason-code").val().trim().toLowerCase().replace(/\s/g, '');
							var reasonIdString = $("#enter-reason-master-id").val();							
							if(reasonCodeResult === reasonCodeString && reasonIdResult != reasonIdString){
								$("#enter-reason-code-note").html("**Found Duplicate Data!");
								postAjax = 121;
								ajaxInsert.abort();
							}
							}},
					error: function(xhr, resp, err) {
			            alert(err);
			        }});
				if(postAjax == 0){
					$("#enter-reason-code-note").html("");
					//$("#enter-tax-rate-note").html("");
					ajaxInsert();
				}
			}
		}else if(frm == 'headOffice'){
			var headOfficeState = $("#select-head-office-vender-state").val().trim();
			var headOfficeName = $("#enter-head-office-name").val().trim();
			$("#enter-head-office-name").val(headOfficeName);
			var headOfficeContact = $("#enter-head-office-contact").val().trim();
			$("#enter-head-office-contact").val(headOfficeContact);
			var headOfficePhone = $("#enter-head-office-phone").val().trim();
			$("#enter-head-office-phone").val(headOfficePhone);
			var headOfficeEmail = $("#enter-head-office-email").val().trim();
			$("#enter-head-office-email").val(headOfficeEmail);
			var headOfficePanNumber = $("#enter-head-office-pan-num").val().trim();
			$("#enter-head-office-pan-num").val(headOfficePanNumber);
			var headOfficeAddressFirst = $("#enter-head-office-address-line-first").val().trim();
			$("#enter-head-office-address-line-first").val(headOfficeAddressFirst);
			var headOfficeAddressSecond = $("#enter-head-office-address-line-second").val().trim();
			$("#enter-head-office-address-line-second").val(headOfficeAddressSecond);
			var headOfficeCity = $("#select-head-office-city").val().trim();
			var headOfficePinCode = $("#enter-head-office-pin-code").val().trim();
			$("#enter-head-office-pin-code").val(headOfficePinCode);
			var headOfficeGstin = $("#enter-head-office-gstin").val().trim();
			$("#enter-head-office-gstin").val(headOfficeGstin);
			var headOfficeHoCode = $("#enter-head-office-ho-code").val().trim();
			$("#enter-head-office-ho-code").val(headOfficeHoCode);
			if(headOfficeState == "0" || headOfficeName == "" || headOfficeContact == "" || headOfficePhone == "" || headOfficeEmail == "" ||
					headOfficePanNumber == "" || headOfficeAddressFirst == "" || headOfficeAddressSecond == "" || headOfficeCity == "0" ||
					headOfficePinCode == "" || headOfficeGstin == "" || headOfficeHoCode == ""){
				if(headOfficeState == "0" || headOfficeState == ""){
					$("#select-head-office-vender-state-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-head-office-vender-state-note").html("");
					status=true; 
				}
				if(headOfficeName == "0" || headOfficeName == ""){
					$("#enter-head-office-name-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-head-office-name-note").html("");
					status=true; 
				}
				if(headOfficeContact == "0" || headOfficeContact == ""){
					$("#enter-head-office-contact-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-head-office-contact-note").html("");
					status=true; 
				}
				if(headOfficePhone == "0" || headOfficePhone == ""){
					$("#enter-head-office-phone-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!mobileNumberValidation.test(headOfficePhone))
					{
						$("#enter-head-office-phone-note").html("**Mobile number should only be 10 digits");
						status=false; 
					}
					else
						{
							$("#enter-head-office-phone-note").html("");
							status=true;  
						}
					//$("#enter-head-office-phone-note").html("");
					//status=true; 
				}
				if(headOfficeEmail == "0" || headOfficeEmail == ""){
					$("#enter-head-office-email-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!emailIdValidation.test(headOfficeEmail))
					{
						$("#enter-head-office-email-note").html("**Please enter valid email id");
						status=false; 
					}
					else
						{
							$("#enter-head-office-email-note").html("");
							status=true;  
						}
					//$("#enter-head-office-email-note").html("");
					//status=true; 
				}
				if(headOfficePanNumber == "0" || headOfficePanNumber == ""){
					$("#enter-head-office-pan-num-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!panNumberValidation.test(headOfficePanNumber))
					{
						$("#enter-head-office-pan-num-note").html("**Please enter valid pan Number");
						status=false; 
					}else{
						$("#enter-head-office-pan-num-note").html("");
						status=true;  
					}
					//$("#enter-head-office-pan-num-note").html("");
					//status=true; 
				}
				if(headOfficeAddressFirst == "0" || headOfficeAddressFirst == ""){
					$("#enter-head-office-address-line-first-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-head-office-address-line-first-note").html("");
					status=true; 
				}
				if(headOfficeAddressSecond == "0" || headOfficeAddressSecond == ""){
					$("#enter-head-office-address-line-second-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-head-office-address-line-second-note").html("");
					status=true; 
				}
				if(headOfficeCity == "0" || headOfficeCity == ""){
					$("#select-head-office-city-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#select-head-office-city-note").html("");
					status=true; 
				}
				if(headOfficePinCode == "0" || headOfficePinCode == ""){
					$("#enter-head-office-pin-code-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!pinCodeValidation.test(headOfficePinCode))
					{
						$("#enter-head-office-pin-code-note").html("**zipcode should only be 5 digits");
						status=false; 
					}else{
						$("#enter-head-office-pin-code-note").html("");
						status=true;  
					}
					//$("#enter-head-office-pin-code-note").html("");
					//status=true; 
				}
				if(headOfficeGstin == "0" || headOfficeGstin == ""){
					$("#enter-head-office-gstin-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					if(!gstinNumberValidation.test(headOfficeGstin))
					{
						$("#enter-head-office-gstin-note").html("**Please enter valid gstin Number");
						status=false; 
					}else{
						$("#enter-head-office-gstin-note").html("");
						status=true;  
					}
					//$("#enter-head-office-gstin-note").html("");
					//status=true; 
				}
				if(headOfficeHoCode == "0" || headOfficeHoCode == ""){
					$("#enter-head-office-ho-code-note").html("**Please Fill The Required Field");
					status=false; 
				}else{
					$("#enter-head-office-ho-code-note").html("");
					status=true; 
				}
				
			}else if(headOfficeState != "0" && headOfficeName != "" && headOfficeContact != "" && headOfficePhone != "" && headOfficeEmail != "" &&
					headOfficePanNumber != "" && headOfficeAddressFirst != "" && headOfficeAddressSecond != "" && headOfficeCity != "0" &&
					headOfficePinCode != "" && headOfficeGstin != "" && headOfficeHoCode != ""){
				$("#select-head-office-vender-state-note").html("");
				$("#enter-head-office-name-note").html("");
				$("#enter-head-office-contact-note").html("");
				$("#enter-head-office-phone-note-note").html("");
				$("#enter-head-office-email-note").html("");
				$("#enter-head-office-pan-num-note").html("");
				$("#enter-head-office-address-line-first-note").html("");
				$("#enter-head-office-address-line-second-note").html("");
				$("#select-head-office-city-note").html("");
				$("#enter-head-office-pin-code-note").html("");
				$("#enter-head-office-gstin-note").html("");
				$("#enter-head-office-ho-code-note").html("");
				if(!mobileNumberValidation.test(headOfficePhone))
				{
					$("#enter-head-office-phone-note").html("**Mobile number should only be 10 digits");
					status=false; 
				}
				else
					{
						$("#enter-head-office-phone-note").html("");
						status=true;  
					}
				if(!emailIdValidation.test(headOfficeEmail))
				{
					$("#enter-head-office-email-note").html("**Please enter valid email id");
					status=false; 
				}
				else
					{
						$("#enter-head-office-email-note").html("");
						status=true;  
					}
				if(!pinCodeValidation.test(headOfficePinCode))
				{
					$("#enter-head-office-pin-code-note").html("**zipcode should only be 5 digits");
					status=false; 
				}else{
					$("#enter-head-office-pin-code-note").html("");
					status=true;  
				}
				if(!panNumberValidation.test(headOfficePanNumber))
				{
					$("#enter-head-office-pan-num-note").html("**Please enter valid pan Number");
					status=false; 
				}else{
					$("#enter-head-office-pan-num-note").html("");
					status=true;  
				}
				if(!gstinNumberValidation.test(headOfficeGstin))
				{
					$("#enter-head-office-gstin-note").html("**Please enter valid gstin Number");
					status=false; 
				}else{
					$("#enter-head-office-gstin-note").html("");
					status=true;  
				}
				if(pinCodeValidation.test(headOfficePinCode) && mobileNumberValidation.test(headOfficePhone) && emailIdValidation.test(headOfficeEmail) && panNumberValidation.test(headOfficePanNumber) && gstinNumberValidation.test(headOfficeGstin)){
					var getAjax = $.ajax({
						async: false,
						type : "GET",
						url : "http://localhost:8080/getAdminPage/duplicateEntryCheck?formName="+frm,
						success : function( data, status) {	
							$("#enter-reason-name-note").html("");
							$("#enter-reason-code-note").html("");
							for(var i=0;i<=data.result.length;i++){	
								var headOfficeCodeResult = data.result[i]['hoCode'].trim().toLowerCase().replace(/\s/g, '');
								var headOfficeIdResult = data.result[i]['id'];
								var headOfficeCodeString = $("#enter-head-office-ho-code").val().trim().toLowerCase().replace(/\s/g, '');
								var headOfficeIdString = $("#enter-head-office-id").val();							
								if(headOfficeCodeResult === headOfficeCodeString && headOfficeIdResult != headOfficeIdString){
									$("#enter-head-office-ho-code-note").html("**Found Duplicate Data!");
									postAjax = 121;
									ajaxInsert.abort();
								}
								}},
						error: function(xhr, resp, err) {
				            alert(err);
				        }});
					if(postAjax == 0){
						$("#enter-head-office-ho-code-note").html("");
						//$("#enter-tax-rate-note").html("");
						ajaxInsert();
					}
				}
			}
			
		}
	
function ajaxInsert(){
	alert("ajaxInsert");
		var myForm = $("#"+frm)[0];
	
	postAjax = $.ajax({
		type : "POST",
		url : url,
		dataType: "JSON",
		//async: false,
        data: new FormData(myForm),
        processData: false,
        contentType: false,
		success : function(data, status) {
			//alert("success"+data);
			//alert("success"+status);
			$('#'+leftId).load(loadurl+' #'+rightId);
		},
		error: function(xhr, resp, err) {
            console.log(xhr, resp, err);
        }
	});
	}
 postAjax = 0;
}

function pageButtonClick(page, searchParam, tblName, currentPage, leftId, rightId){
	
	$(".pagination-div span").css({"cursor": "wait"});
	var srchP = '';
	if(searchParam!=''){
		srchP = $("#"+searchParam).val().trim().toLowerCase().replace(/\s/g, '');
	}
		if($(page).text() == "Previous"){
			var currentP = parseInt($("#"+currentPage).val())-1;
			$("#"+leftId).load("http://localhost:8080/getAdminPage/Generic?page="+currentP+"&&size=60&&searchParam="+srchP+"&&tableName="+tblName+" #"+rightId, function(response, status, xhr) {
				//style => balir ghori to -> default mouse arrow
				$(".pagination-div span").css({"cursor": "pointer"});
			});
		}
		else if($(page).text() == "Next"){
			var currentP = parseInt($("#"+currentPage).val())+1;
			$("#"+leftId).load("http://localhost:8080/getAdminPage/Generic?page="+currentP+"&&size=60&&searchParam="+srchP+"&&tableName="+tblName+" #"+rightId, function(response, status, xhr) {
				$(".pagination-div span").css({"cursor": "pointer"});
			});
		}
		else{
		    var pageNo = parseInt($(page).text())-1;
			$("#"+leftId).load("http://localhost:8080/getAdminPage/Generic?page="+pageNo+"&&size=60&&searchParam="+srchP+"&&tableName="+tblName+" #"+rightId, function(response, status, xhr) {
				$(".pagination-div span").css({"cursor": "pointer"});
			});
		}	
}

function textCase(id){
	var arr = $('#'+id).val().split(' '); 
    var result = ""; 
    for (var i=0; i<arr.length; i++){ 
    	result += arr[i].substring(0,1).toUpperCase() + arr[i].substr(1).toLowerCase();
        //result += arr[i].substring(0,1).toUpperCase() + arr[i].substring(1);
        if (i < arr.length-1) {
            result += ' ';
        }
    } 
   $('#'+id).val(result);
   //console.log(cursor_changed(this))
}

function textCaseAddSpaceBetDigit(id){
	var arr = $('#'+id).val().split(' '); 
    var result = ""; 
    for (var i=0; i<arr.length; i++){ 
    	result += arr[i].substring(0,1).toUpperCase() + arr[i].substr(1).toLowerCase().replace(/(\d+)/g, function(_,num){
    		console.log(num);
    		return ' '+num+' ';
    	});
        //result += arr[i].substring(0,1).toUpperCase() + arr[i].substring(1);
        if (i < arr.length-1) {
            result += ' ';
        }
        //result = result.trim();
    } 
   $('#'+id).val(result);
   //console.log(cursor_changed(this))
}

function divAppend(){
	alert("hi----"+generatedIdIncreament);
	//$("#dyanamicGeneratedId").val("0");
	//document.getElementById('dyanamicGeneratedId').value = "0";
	//var decr = generatedIdIncreament-1;
	$("#appendRefreshModelMaster").load("http://localhost:8080/getAdminPage/ModelMaster?generatedIdIncreament="+generatedIdIncreament+" #appendRefreshModelMaster");
	//document.getElementById('dyanamicGeneratedId').value++;
	alert("hi2----#appendDivModelMaster");
	//$("#hi").clone().appendTo("#row");
	$("#appendDivModelMaster").clone().appendTo("#appendRowModelMaster");
	generatedIdIncreament++;
	
}
