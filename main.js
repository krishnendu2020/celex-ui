function displayHash(hash) {
	if (hash) {
		console.log(hash);
		var pageName = hash.replace("#", "");
		$(".active").removeClass("active");
		$('a[href="' + hash + '"]').parent().addClass("active");
		console.log(pageName);
		var moduleName = pageName.split('_')[0];
		var packageName = pageName.split('_')[1];
		console.log(moduleName);
		console.log(packageName);
		$("#mainSection").load(moduleName + "/pages/" + packageName + "/" + packageName + ".html");
	}
}

function checkLoginSession () {
	
}

function userPriviledge () {
	
}

function displayMenuOptions () {
	var moduleName = sessionStorage.getItem("package");
	console.log('moduleName');
	console.log(moduleName);
	$('.sidebar .sidebar-menu ul.' + moduleName).css("display", "block");
}

$(document).ready(function() {
	idleTime = 0;
	checkLoginSession();
	userPriviledge();
	displayMenuOptions();
	var moduleName = sessionStorage.getItem("package");
	
	if(window.location.hash) {
		displayHash(window.location.hash);
	} else {
		$("#mainSection").load(moduleName + "/pages/dashboard/dashboard.html")
	}
	
	$(window).on('hashchange', function() {
		//on every hash change the render function is called with the new hash
		displayHash(window.location.hash);
	});
});















