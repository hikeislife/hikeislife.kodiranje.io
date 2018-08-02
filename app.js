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

// content loader...
let xhr = new XMLHttpRequest();
xhr.open("GET", "js/content.json");
xhr.send(null);
(xhr.onreadystatechange = function () {
 let xhrt = xhr.responseText;
 if ((xhr.status === 200) && (xhr.readyState === 4)) {
  conParser(xhrt);
 }
})();

var contents;

function conParser(xhrt){
  contents = JSON.parse(xhrt); // list
  pageInit();
}

if (!location.hash) {
 location.hash = "#home";
}

function pageInit() {
 const frag = location.hash.substr(1); // address bar 
 initContent(frag, contents);
 //getXMP(contents);
}

function initContent(frag, contents) {
 for (e in contents) {
  if (contents[e].tag == frag) {
   var page = contents[e].content;
   var sideNavId = contents[e].id;
   break;
  }
 }
 loadMain(page);
 loadSideNav(sideNavId);
 setActive(frag);
}

function loadMain(page) {
 const mainContent = document.getElementById("placeholder");
 mainContent.innerHTML = page;
 textAreaSizer();
}

window.addEventListener("hashchange", pageInit);

function loadSideNav(sideNavId) {                   // links                                                    items
 const sideNav = [["mp", ["#brauzeri_i_editori", "#ada", "#turing", "#timbl", "#brendan_eich"], ["Softver", "Ada Lovlejs", "Alan Turing", "TimBL", "Brendan Ejh",]],
                  ["hc", ["#uvod_u_HTML_i_CSS", "#struktura_HTML_stranice", "#prvi_sajt", "#linkovi", "#uvod_u_CSS", "#predah", "#boje", "#uvod_u_slike"], ["Uvod", "HTML struktura", "Prvi Sajt", "Linkovi", "Uvod u CSS", "Predah", "Boje", "Uvod u slike"]],
                  ["gc", ["#uvod_u_cmd"], ["uskoro..."]]];
 for (let i = 1; i < sideNav.length; i ++) {
  document.getElementById(sideNav[i][0]).removeAttribute("class");
 }
 let pos = document.getElementById("side-nav");
 var sideMenu = '<ul id="side-menu">';
 for (e in sideNav) {
  if (sideNav[e][0] == sideNavId) {
   var links = sideNav[e][1],
       items = sideNav[e][2];
   for (el in links) {
    sideMenu = sideMenu + '<a href="' + links[el] + '"><li>' + items[el] + '</li></a>';
   }
  }
 }
 pos.innerHTML = sideMenu + '</ul>'
 if(sideNavId != "mp") {
  document.getElementById(sideNavId).setAttribute("class", "selected");
 }
}

function setActive(frag) {
 var links = document.querySelectorAll("#side-nav a");
 let i, link, pageName;
 for (i = 0; i < links.length; i++) {
  link = links[i];
  pageName = link.getAttribute("href").substr(1);
  if (pageName === frag) {
   link.firstChild.setAttribute("class", "active");
  } else {
   link.firstChild.removeAttribute("class");
  }
 }
}

function textAreaSizer() {

 var test = document.getElementsByClassName("code_snippet");
 //console.log(test);
 for (let i = 0; i < test.length; i ++) {
  let scroll = test[i].scrollHeight;
  test[i].style.height = test[i].scrollHeight + 'px';
  //console.log(scroll);
  }
}