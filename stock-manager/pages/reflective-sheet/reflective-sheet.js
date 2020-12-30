
$("#addReflectiveSheetInStock").click(function() {
    var selectReflectiveSheetType = $("#selectReflectiveSheetType").find(":selected").text();
    var reflectiveSheetVendor = $("#selectReflectiveSheetVendor").find(":selected").text();
    var reflectiveSheetQty = $("#enterReflectiveSheetQty").val();
    var reflectiveSheetHologramQtyUnit = $("#selectReflectiveSheetHologramQtyUnit").find(":selected").text();
    var reflectiveSheetBatchNum = $("#enterReflectiveSheetBatchNum").val();
    var reflectiveSheetContainerNum = $("#enterReflectiveSheetContainerNum").val();
    var reflectiveSheetRollsNum = $("#enterReflectiveSheetRollsNum").val();
    var reflectiveSheetInvoiceNum = $("#enterReflectiveSheetInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddReflectiveSheetPayload = JSON.parse('{"stockMaterialId": "2" , "stockMaterialType": "' + selectReflectiveSheetType + '", "vandorName": "' + reflectiveSheetVendor + '", "qty": "' + reflectiveSheetQty + '", "unit": "' + reflectiveSheetHologramQtyUnit + '", "stockBatchNumber": "' + reflectiveSheetBatchNum + '", "stockContainerNumber": "' + reflectiveSheetContainerNum + '", "stockNumberOfRolls": "' + reflectiveSheetRollsNum + '", "stockInvoiceNumber": "' + reflectiveSheetInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddReflectiveSheetPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
    });
});

$("#addNewReflectiveSheet").click(function() {
    $('#addReflectiveSheetInStock').trigger('click');
});

$("#reflective-stock-review-tab").click(function() {
    var reqAllReflectiveSheet = "2";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllReflectiveSheet,
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
			$("#reflectiveSheetData").append(getAllMaterial);
		}
    });
});