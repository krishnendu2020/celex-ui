function getAllStock() {
	$.ajax({ 
		type: "GET",
		contentType: "application/json",
		url: "http://localhost:8080/StockController/getStock",
		success: function(data){ 
			console.log(data.resObject);       
			if(data.status === "success") {
				var getAllStock = '';
				jQuery.each( data.resObject, function( i, stockDetails ) {
					var stockData = '';
					stockData = '<div class="col-xl-3 col-md-4 col-sm-6 d-flex align-items-stretch pl-sm-3 pr-sm-3 p-0 mb-3">';
					stockData += '<div class="card shadow bg-white w-100"><div class="card-header border-bottom-0 pt-4">';
					stockData += '<a href="javascript:void();"><label>'+ stockDetails.itemName +' Stock </label></a></div>';
					stockData += '<div class="card-body pt-1 pb-0">';
					stockData += '<div class="master-table table-responsive">';
					stockData += '<table class="table table-striped table-hover table-bordered mb-0">';
					stockData += '<thead><tr><th scope="col-lg">Item Name</th><th scope="col-lg">Avl Qty</th><th scope="col-lg">Status</th></tr></thead>';
					stockData += '<tbody><tr>';
					stockData += '<th scope="row">'+ stockDetails.itemCode +'</th>';
					stockData += '<td>'+ stockDetails.availableQuantity +'</td>';
					stockData += '<td class="bg-red">Red</td>';
					stockData += '</tr>';
					stockData += '</tbody></table></div></div>';
					stockData += '<div class="card-footer text-center bg-white pb-3">';
					stockData += '<a href="javascript:void();"><label>More Details</label></a>';
					stockData += '</div></div></div>';
					getAllStock = getAllStock + stockData;
				});
			}
			console.log("getAllStock");
			console.log(getAllStock);
			$("#getAllStockDetails").append(getAllStock);
		}
	 });
}

$(document).ready(function() {
	getAllStock();
});