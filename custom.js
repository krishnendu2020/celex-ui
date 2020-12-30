$(document).ready(function() {
    $("#login").click(function() {
		var packageName = $( "#selectedRole" ).val();
		sessionStorage.setItem("package", packageName);

        window.location.href = 'index.html';
    });
});















