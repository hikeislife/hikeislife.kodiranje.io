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

window.onmouseup = function() {
  const hide = document.querySelector("#side-nav");
  hide.style.display = "none";
  window.scrollTo(0, 0);
}
function loadMenu() {
 let menuStatus = document.getElementById("side-nav"),
  menuList = document.getElementsByTagName("li"),
  menuLength = menuList.length; 
  
 if (menuStatus.style.display.match("block")) {
  menuStatus.style.display = "none";
 }
 else {
  menuStatus.style.display = "block";
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
var frag;
function pageInit() {
 frag = location.hash.substr(1); // address bar 
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
 const sideNav = [["mp", ["#recnik", "#brauzeri_i_editori", "#ada", "#turing", ["#vitalik_buterin"], "#timbl", "#brendan_eich"], ["Rečnik", "Softver", "Ada Lovlejs", "Alan Turing", ["Vitalik Buterin"], "TimBL", "Brendan Ajk",]],
                  ["hc", ["#uvod_u_HTML_i_CSS", "#struktura_HTML_stranice", "#prvi_sajt", "#linkovi", "#uvod_u_CSS", "#predah", "#boje", "#uvod_u_slike"], ["Uvod", "HTML struktura", "Prvi Sajt", "Linkovi", "Uvod u CSS", "Predah", "Boje", "Uvod u slike"]],
                  ["gc", ["#uvod_u_cmd", "#cd_md_rd"], ["Uvod u cmd", "CD, MD, RD"]],
                  //["js", ["#uvod_u_js"], ["Uvod u JS"]]
                  ];
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
 let leftright = document.getElementsByClassName("leftright");
 if(sideNavId != "mp") {
  document.getElementById(sideNavId).setAttribute("class", "selected");
  for(var i = 0; i < 2; i++) {
   leftright[i].style.display = "inline";
   document.getElementById("disqus_thread").style.display ="block";
   var disqus_config = function () {
    this.page.url = window.location.href;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = frag; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
console.log(location.href);
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://kodiranje.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
  }
 }
 else {
  for(var i = 0; i < 2; i++) {
    leftright[i].style.display = "none";
  }
 }
 leftRight(links);
}

function leftRight(links) {
  let levo = document.getElementById("left");
  let desno = document.getElementById("right");
  let current = location.hash;
  let ind = links.indexOf(current)
  if (ind == 0) {
    levo.style.display = "none";
  }
  else {
    levo.innerHTML = "";
    let backlink = document.createElement("a");
    levo.appendChild(backlink);
    backlink.setAttribute("href", links[ind-1]);
    backlink.innerHTML = "pr.";
  }
  if (ind == (links.length -1)) {
    desno.style.display = "none";
  }
  else {
    desno.innerHTML = "";
    let forlink = document.createElement("a");
    desno.appendChild(forlink);
    forlink.setAttribute("href", links[ind+1]);
    forlink.innerHTML = "sl.";
  }
 levo.onclick = function() {
  window.scrollTo(0, 0);
 } 
 desno.onclick = function() {
  window.scrollTo(0, 0);
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

