
$("#addHotStampingFoilInStock").click(function() {
    var selectHotStampingFoilType = $("#selectHotStampingFoilType").find(":selected").text();
    var hotStampingFoilVendor = $("#selectHotStampingFoilVendor").find(":selected").text();
    var hotStampingFoilQty = $("#enterHotStampingFoilQty").val();
    var hotStampingFoilHologramQtyUnit = $("#selectHotStampingFoilQtyUnit").find(":selected").text();
    var hotStampingFoilBatchNum = $("#enterHotStampingFoilBatchNum").val();
    var hotStampingFoilContainerNum = $("#enterHotStampingFoilContainerNum").val();
    var hotStampingFoilRollsNum = $("#enterHotStampingFoilRollsNum").val();
    var hotStampingFoilInvoiceNum = $("#enterHotStampingFoilInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddHotStampingFoilPayload = JSON.parse('{"stockMaterialId": "5" , "stockMaterialType": "' + selectHotStampingFoilType + '", "vandorName": "' + hotStampingFoilVendor + '", "qty": "' + hotStampingFoilQty + '", "unit": "' + hotStampingFoilHologramQtyUnit + '", "stockBatchNumber": "' + hotStampingFoilBatchNum + '", "stockContainerNumber": "' + hotStampingFoilContainerNum + '", "stockNumberOfRolls": "' + hotStampingFoilRollsNum + '", "stockInvoiceNumber": "' + hotStampingFoilInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddHotStampingFoilPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
    });
});

$("#addNewHotStampingFoilSheet").click(function() {
    $('#addHotStampingFoilInStock').trigger('click');
});

$("#hot-stamping-foil-stock-review-tab").click(function() {
    var reqAllHotStampingFoil = "5";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllHotStampingFoil,
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
			$("#hotStampingFoilData").append(getAllMaterial);
		}
    });
});