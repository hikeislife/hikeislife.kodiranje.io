// registers service worker
if ('serviceWorker' in navigator) { // browser support check
  navigator.serviceWorker.register('sw.js')
  .then(function(reg) {
    // run if registration worked
    if(reg.installing) {
          console.log('Service worker installing');
        } else if(reg.waiting) {
          console.log('Service worker installed');
        } else if(reg.active) {
          console.log('Service worker active');
        }
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // run if registration failed
    console.log('Registration failed with ' + error);
  });
}

// adding mobile menu to the cog click
const mobMenu = document.querySelector("#mobile-cog").addEventListener("click", loadMenu);

function loadMenu() {
	let menuStatus = document.getElementById("side-nav"),
		menuList = document.getElementsByTagName("li"),
		menuLength = menuList.length;	
		
	if (menuStatus.style.display.match("block")) {
		menuStatus.style.display = "none";
	}
	else {
		menuStatus.style.zIndex = "999";
		menuStatus.style.display = "block";
		menuStatus.style.top = "5px";
		menuStatus.style.position = "fixed";
		for (let i = 0; i < menuLength; i ++) {
			menuList[i].style.boxShadow ="0 1px 0px 0 rgba(0, 0, 0, 0.3), 0 0px 2px 0 rgba(0, 0, 0, 0.3)";
			menuList[i].style.padding = "5px";
			menuList[i].style.backgroundColor = "#e5e5e5";
			menuList[i].style.listStyleType = "none";
		}
		menuList[0].style.borderRadius = "2px 2px 0 0";
		menuList[menuLength-1].style.borderRadius = "0 0 2px 2px";
	}
}


// fixes top bar to the top of the page once scrolled pass logo
window.onscroll = function() {bindMenu()};

function bindMenu() {
	let topMenu = document.getElementById("header-bottom"),
		smallDevice = window.innerWidth;
  	if (document.body.scrollTop >= 70 || document.documentElement.scrollTop >= 70) {
  	  	topMenu.className = "fixed-top";
  	}
  	else {
  	  	topMenu.className = "";
  	}
}

// adds copy/date to the footer
window.onload = function copid() {
	let d = new Date().getFullYear();
	document.querySelector('footer').innerHTML = "&copy; ČĎŠ " + d;
}

// top navigation
const topnav = document.getElementsByClassName("top-nav"),
	  topNav1 = document.getElementById("topNavHtmlCss"),
	  topNav2 = document.getElementById("topNavCmdGit");

//topnav[].addEventListener("mouseover", bolding);

//function bolding() {
//	console.log("I need to lose weight");
//}

topNav1.addEventListener("click", navigateTop1);
topNav2.addEventListener("click", navigateTop2);

function navigateTop1() {
	// define variables needed
	let sideNav = document.getElementById("side-menu"),
		items = document.getElementsByTagName("li"),
		sideLength = items.length,
		tutorial = document.getElementById("content"),
		rows = tutorial.getElementsByTagName("p");
	console.log(rows.length);
	// change side menu to html menu
	for (let i = 0; i < sideLength; i ++) {
		let k = i + 1;
		items[i].innerHTML = "html menu item " + k;
	}
	// load first html tutorial
	for (let j= 0; j < rows.length; j ++) {
		let l = j+ 1;
		rows[j].innerHTML = "html tutorijal " +l;
	}
}
function navigateTop2() {
	// define variables needed
	console.log("so you want to learn git");
	// change side menu to html menu

	// load first html tutorial
}	