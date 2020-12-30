
$("#addHologramsInStock").click(function() {
    var hologramsType = $("#selectHologramsType").find(":selected").text();
    var hologramsVendor = $("#selectHologramsVendor").find(":selected").text();
    var hologramsQty = $("#enterHologramsQty").val();
    var hologramsQtyUnit = $("#selectHologramsQtyUnit").find(":selected").text();
    var hologramsBatchNum = $("#enterHologramsBatchNum").val();
    var hologramsContainerNum = $("#enterHologramsContainerNum").val();
    var hologramsRollsNum = $("#enterHologramsRollsNum").val();
    var hologramsInvoiceNum = $("#enterHologramsInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddHologramsPayload = JSON.parse('{"stockMaterialId": "3" , "stockMaterialType": "' + hologramsType + '", "vandorName": "' + hologramsVendor + '", "qty": "' + hologramsQty + '", "unit": "' + hologramsQtyUnit + '", "stockBatchNumber": "' + hologramsBatchNum + '", "stockContainerNumber": "' + hologramsContainerNum + '", "stockNumberOfRolls": "' + hologramsRollsNum + '", "stockInvoiceNumber": "' + hologramsInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddHologramsPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
    });
});

$("#addNewHolograms").click(function() {
    $('#addHologramsInStock').trigger('click');
});

$("#hologram-stock-review-tab").click(function() {
    var reqAllHologram = "3";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllHologram,
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
			$("#hologramData").append(getAllMaterial);
		}
    });
});