
$("#addLooseMaterialInStock").click(function() {
    var selectLooseMaterialType = $("#selectLooseMaterialType").find(":selected").text();
    var looseMaterialVendor = $("#selectLooseMaterialVendor").find(":selected").text();
    var looseMaterialQty = $("#enterLooseMaterialQty").val();
    var looseMaterialQtyUnit = $("#selectLooseMaterialQtyUnit").find(":selected").text();
    var looseMaterialBatchNum = $("#enterLooseMaterialBatchNum").val();
    var looseMaterialContainerNum = $("#enterLooseMaterialContainerNum").val();
    var looseMaterialRollsNum = $("#enterLooseMaterialRollsNum").val();
    var looseMaterialInvoiceNum = $("#enterLooseMaterialInvoiceNum").val();
    var createdBy = 'admin';
    var currDateTime = 'timestamp';

    var reqAddLooseMaterialPayload = JSON.parse('{"stockMaterialId": "7" , "stockMaterialType": "' + selectLooseMaterialType + '", "vandorName": "' + looseMaterialVendor + '", "qty": "' + looseMaterialQty + '", "unit": "' + looseMaterialQtyUnit + '", "stockBatchNumber": "' + looseMaterialBatchNum + '", "stockContainerNumber": "' + looseMaterialContainerNum + '", "stockNumberOfRolls": "' + looseMaterialRollsNum + '", "stockInvoiceNumber": "' + looseMaterialInvoiceNum + '", "stockCreationDate": "' + currDateTime + '", "stockCreatedBy": "' + createdBy + '"}');

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:8080/StockController/saveStockDetails",
        data: JSON.stringify(reqAddLooseMaterialPayload),
        success: function(response){
            console.log("response");
            console.log(response);
        }
    });
});

$("#addNewLooseMaterialSheet").click(function() {
    $('#addLooseMaterialInStock').trigger('click');
});

$("#loose-material-stock-review-tab").click(function() {
    var reqAllLooseMaterial = "7";
    $.ajax({ 
		type: "GET",
		contentType: "application/json",
        url: "http://localhost:8080/StockController/getStockDetailsByItemMaterialId?itemMaterialId=" + reqAllLooseMaterial,
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
			$("#looseMaterialData").append(getAllMaterial);
		}
    });
});
