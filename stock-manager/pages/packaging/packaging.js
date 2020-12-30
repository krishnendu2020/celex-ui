
$("#addPackingInStock").click(function() {
    var selectPackingType = $("#selectPackingType").find(":selected").text();
    var packingVendor = $("#selectPackingVendor").find(":selected").text();
    var packingQty = $("#enterPackingQty").val();
    var packingQtyUnit = $("#selectPackingQtyUnit").find(":selected").text();
    var packingBatchNum = $("#enterPackingBatchNum").val();
    var packingContainerNum = $("#enterPackingContainerNum").val();
    var packingRollsNum = $("#enterPackingRollsNum").val();
    var packingInvoiceNum = $("#enterPackingInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddPackingPayload = JSON.parse('{"stockMaterialId": "8" , "stockMaterialType": "' + selectPackingType + '", "vandorName": "' + packingVendor + '", "qty": "' + packingQty + '", "unit": "' + packingQtyUnit + '", "stockBatchNumber": "' + packingBatchNum + '", "stockContainerNumber": "' + packingContainerNum + '", "stockNumberOfRolls": "' + packingRollsNum + '", "stockInvoiceNumber": "' + packingInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddPackingPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
    });
});

$("#addNewPackingSheet").click(function() {
    $('#addPackingInStock').trigger('click');
});

$("#packaging-stock-review-tab").click(function() {
    var reqAllPacking = "8";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllPacking,
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
					materialData += '<td>'+ stockDetails.stockNumberOfRolls +'</td>';
					materialData += '<td>'+ stockDetails.stockInvoiceNumber +'</td>';
					materialData += '<td class="'+ avilabilityColor +'">'+ avilability +'</td>';
					materialData += '</tr>';
					getAllMaterial = getAllMaterial + materialData;
					counter++;
				});
			}
			$("#packingData").append(getAllMaterial);
		}
    });
});