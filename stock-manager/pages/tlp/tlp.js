
$("#addTLPInStock").click(function() {
    var selectTLPType = $("#selectTLPType").find(":selected").text();
    var tlpVendor = $("#selectTLPVendor").find(":selected").text();
    var tlpQty = $("#enterTLPQty").val();
    var tlpHologramQtyUnit = $("#selectTLPQtyUnit").find(":selected").text();
    var tlpBatchNum = $("#enterTLPBatchNum").val();
    var tlpContainerNum = $("#enterTLPContainerNum").val();
    var tlpRollsNum = $("#enterTLPRollsNum").val();
    var tlpInvoiceNum = $("#enterTLPInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddTLPPayload = JSON.parse('{"stockMaterialId": "4" , "stockMaterialType": "' + selectTLPType + '", "vandorName": "' + tlpVendor + '", "qty": "' + tlpQty + '", "unit": "' + tlpHologramQtyUnit + '", "stockBatchNumber": "' + tlpBatchNum + '", "stockContainerNumber": "' + tlpContainerNum + '", "stockNumberOfRolls": "' + tlpRollsNum + '", "stockInvoiceNumber": "' + tlpInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddTLPPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
    });
});

$("#addNewTLPSheet").click(function() {
    $('#addTLPInStock').trigger('click');
});

$("#tlp-stock-review-tab").click(function() {
    var reqAllTlp = "4";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllTlp,
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
			$("#tlpData").append(getAllMaterial);
		}
    });
});