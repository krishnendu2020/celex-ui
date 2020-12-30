
$("#addAluminiumInStock").click(function() {
    var aluminiumType = $("#selectAluminiumType").find(":selected").text();
    var vendorType = $("#selectVendorName").find(":selected").text();
    var almuniumQty = $("#enterAlmuniumQty").val();
    var aluminiumQtyUnit = $("#selectAlmuniumQtyUnit").find(":selected").text();
    var almuniumBatchNum = $("#enterAlmuniumBatchNum").val();
    var almuniumContainerNum = $("#enterAlmuniumContainerNum").val();
    var almuniumRollsNum = $("#enterAlmuniumRollsNum").val();
    var almuniumInvoiceNum = $("#enterAlmuniumInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddAluminiumPayload = JSON.parse('{"stockMaterialId": "1" , "stockMaterialType": "' + aluminiumType + '", "vandorName": "' + vendorType + '", "qty": "' + almuniumQty + '", "unit": "' + aluminiumQtyUnit + '", "stockBatchNumber": "' + almuniumBatchNum + '", "stockContainerNumber": "' + almuniumContainerNum + '", "stockNumberOfRolls": "' + almuniumRollsNum + '", "stockInvoiceNumber": "' + almuniumInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    console.log("reqAddAluminiumPayload");
    console.log(reqAddAluminiumPayload);
    console.log(typeof(reqAddAluminiumPayload));

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddAluminiumPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
        
      });
});

$("#addNewAluminium").click(function() {
    $('#addAluminiumInStock').trigger('click');
});

$("#almunium-stock-review-tab").click(function() {
    var reqAllAluminium = "1";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllAluminium,
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
			$("#aluminiumData").append(getAllMaterial);
		}
    });
});