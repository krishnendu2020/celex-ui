
$("#addMaskingLabelInStock").click(function() {
    var selectMaskingLabelType = $("#selectMaskingLabelType").find(":selected").text();
    var maskingLabelVendor = $("#selectMaskingLabelVendor").find(":selected").text();
    var maskingLabelQty = $("#enterMaskingLabelQty").val();
    var maskingLabelQtyUnit = $("#selectMaskingLabelQtyUnit").find(":selected").text();
    var maskingLabelBatchNum = $("#enterMaskingLabelBatchNum").val();
    var maskingLabelContainerNum = $("#enterMaskingLabelContainerNum").val();
    var maskingLabelRollsNum = $("#enterMaskingLabelRollsNum").val();
    var maskingLabelInvoiceNum = $("#enterMaskingLabelInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddMaskingLabelPayload = JSON.parse('{"stockMaterialId": "6" , "stockMaterialType": "' + selectMaskingLabelType + '", "vandorName": "' + maskingLabelVendor + '", "qty": "' + maskingLabelQty + '", "unit": "' + maskingLabelQtyUnit + '", "stockBatchNumber": "' + maskingLabelBatchNum + '", "stockContainerNumber": "' + maskingLabelContainerNum + '", "stockNumberOfRolls": "' + maskingLabelRollsNum + '", "stockInvoiceNumber": "' + maskingLabelInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddMaskingLabelPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
    });
});

$("#addNewMaskingLabelSheet").click(function() {
    $('#addMaskingLabelInStock').trigger('click');
});

$("#masking-label-stock-review-tab").click(function() {
    var reqAllMasking = "6";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllMasking,
		success: function(data){ 
			console.log(data);       
			if(data.status === "success") {
				var getAllMaterial = '';
				var counter = 1;
				jQuery.each( data.resObject, function( i, stockDetails ) {
					var materialData = '';
					console.log(parseInt(stockDetails.qty));
					console.log(typeof(parseInt(stockDetails.qty)));
					console.log((parseInt(stockDetails.qty) > 60) ? "bg-red" : "bg-green");
					var avilability = (parseInt(stockDetails.qty) > 50) ? "GREEN" : "RED";
					var avilabilityColor = (parseInt(stockDetails.qty) > 50) ? "bg-green" : "bg-red";
					materialData += '<tr>';
					materialData += '<th scope="row">'+ counter +'</th>';
					materialData += '<td>'+ stockDetails.stockMaterialType +'</td>';
					materialData += '<td>'+ stockDetails.stockMaterialId +'</td>';
					materialData += '<td>'+ stockDetails.qty +'</td>';
					materialData += '<td>'+ stockDetails.stockBatchNumber +'</td>';
					materialData += '<td>'+ stockDetails.stockContainerNumber +'</td>';
					materialData += '<td>'+ stockDetails.stockNumberOfRolls +'</td>';
					materialData += '<td>'+ stockDetails.stockInvoiceNumber +'</td>';
					materialData += '<td class="'+ avilabilityColor +'">'+ avilability +'</td>';
					materialData += '</tr>';
					getAllMaterial = getAllMaterial + materialData;
					counter++;
				});
			}
			$("#maskingData").append(getAllMaterial);
		}
    });
});