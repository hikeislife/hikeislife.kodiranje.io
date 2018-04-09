// fixes top bar to the top of the page once scrolled pass logo
var topMenu = document.getElementById("header-bottom");
var smallDevice = window.innerWidth;

window.onscroll = function() {bindMenu()};

function bindMenu() {
  if (document.body.scrollTop >= 70 || document.documentElement.scrollTop >= 70) {
    topMenu.className = "fixed-top";
  }
  else {
    topMenu.className = "";
  }
}
//adding mobile menu to the cog
var mobMenu = document.getElementById("mobile-cog"),
	menuStatus = document.getElementById("side-nav");
	// = menuRead.style.display;

	mobMenu.addEventListener("click", loadMenu);

	function loadMenu() {
	//console.log("you've clicked me");
		console.log(menuStatus);
		if (menuStatus.style.display.match("inline")) {
			menuStatus.style.display = "none";

		}
		else {
			menuStatus.style.display = "inline";
		}
	
}