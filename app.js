if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(function(reg) {
    // registration worked
    if(reg.installing) {
          console.log('Service worker installing');
        } else if(reg.waiting) {
          console.log('Service worker installed');
        } else if(reg.active) {
          console.log('Service worker active');
        }
    console.log('Registration succeeded. Scope is ' + reg.scope);

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

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
//adding mobile menu to the cog click
var mobMenu = document.getElementById("mobile-cog"),
	menuStatus = document.getElementById("side-nav"),
	menuU = document.getElementById("side-menu"),
	menuList = menuU.getElementsByTagName("li"),
	menuLength = menuList.length;

	mobMenu.addEventListener("click", loadMenu);

	function loadMenu() {
		
		if (menuStatus.style.display.match("inline")) {

			menuStatus.style.display = "none";
			
		}
		else {
			menuStatus.style.display = "inline";
			menuStatus.style.top = "5px";
			menuStatus.style.position = "fixed";
			menuStatus.style.zIndex = "999";
			for (var i = 0; i < menuLength; i ++) {
				menuList[i].style.boxShadow ="0 1px 0px 0 rgba(0, 0, 0, 0.3), 0 0px 2px 0 rgba(0, 0, 0, 0.3)";
				menuList[i].style.padding = "5px";
				menuList[i].style.backgroundColor = "#e5e5e5";
				menuList[i].style.listStyleType = "none";
			}
			menuList[0].style.borderRadius = "2px 2px 0 0";
			menuList[menuLength-1].style.borderRadius = "0 0 2px 2px";
		}
	
}