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