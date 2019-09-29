if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {
      //console.log("Pronađen servisni worker, nema potrebe za registracijom");
    } else {
      // Register the service worker
      navigator.serviceWorker
      .register("service-worker.js", {
        //scope: "./kodiranje/"
        scope: "./"
    })
      .then(function (reg) {
        console.log("Servisni worker je registrovan za zadati opseg: " + reg.scope);
      });
  }
}

console.log(`Dobro došli na sajt za učenje kodiranja i programiranja. Ovo je naša konzola :)`)


// adding mobile menu to the cog click
const mobMenu = document.querySelector("#mobile-cog").addEventListener("click", loadMenu);

// hides menu on outside click:
window.onmouseup = function() {
  const hide = document.querySelector("#side-nav");
  hide.style.display = "none";
}

// shows / hides mobile menu on cog click
function loadMenu() {
 let menuStatus = document.getElementById("side-nav");
  
 if (menuStatus.style.display.match("block")) {
  menuStatus.style.display = "none";
 }
 else {
  menuStatus.style.display = "block";
 }
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

/*
 scrolls the page back to top on link click as it otherwise loads
 the content staying at the same scroll pos it was at before the click
*/
function backToTop() {
 const toTop = Array.from(document.querySelectorAll("a[rel$='chapter']"));
 for (topSide in toTop) {
  toTop[topSide].onclick = () => window.scrollTo(0, 0);
 }
}

// highlights active side nav item
function setActive(frag) {
 var links = document.querySelectorAll("#side-nav a");
 for (let i = 0; i < links.length; i++) {
  if (links[i].getAttribute("href").substr(1) === frag) {
   links[i].firstChild.setAttribute("class", "active");
  } else {
   links[i].firstChild.removeAttribute("class");
  }
 }
 backToTop();
}

function initContent(frag, contents) {
 for (e in contents) {
  if (contents[e].tag == frag) {
   loadMain(contents[e].content);
   document.title = ` Kodiranje | ${ contents[e].pagetitle } ` // sets page title
   document.querySelector('#metadesc').content = contents[e].pagedesc; // dinamički updejtuje sadržaj meta taga za svaku stranicu
   loadSideNav(contents[e].id);
   break;
  }
 }

 setActive(frag);
}

// resizes text area containing code to fit the contents
function textAreaSizer() {
 var test = document.getElementsByClassName("code_snippet");
 for (let i = 0; i < test.length; i ++) {
  let scroll = test[i].scrollHeight;
  test[i].style.height = test[i].scrollHeight + 'px';
 }
}

function detailsFixer() {
  const detailsOpen = Array.from(document.getElementsByTagName("details"));
  for (em in detailsOpen) {
    detailsOpen[em].addEventListener("toggle", ()=> {
      textAreaSizer();
      closeDetails(detailsOpen);
      // add func that will close all open details 
      // it should have open attribute, with statuses open and false
    });
  }
}

function closeDetails (detailsOpen) {
  //
}

function loadMain(page) {
 const mainContent = document.getElementById("placeholder");
 mainContent.innerHTML = page;
 textAreaSizer();
 detailsFixer();
}

window.addEventListener("hashchange", pageInit);

// functionality of sideway nav
function leftRightNav(links) {
  let levo = document.getElementById("left");
  let desno = document.getElementById("right");
  let current = location.hash;
  let ind = links.indexOf(current)
  if (current == "#home") {
    levo.style.display = "none";
    desno.style.display = "none";
  }
  if (ind == 0) {
    levo.style.display = "none";
  }
  else {
    levo.innerHTML = ""; // important otherwise the pr.'s add up
    let backlink = document.createElement("a");
    levo.appendChild(backlink);
    backlink.setAttribute("href", links[ind-1]);
    backlink.setAttribute("rel", "prev chapter");
    backlink.setAttribute("rev", "next");
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
    forlink.setAttribute("rev", "prev");
    forlink.setAttribute("rel", "next chapter");
    forlink.innerHTML = "sl.";
  }
}



function loadSideNav(sideNavId) {
 const sideNav = [["mp", [         // links
                         "#recnik",
                         "#brauzeri_i_editori",
                         "#HTML_u_JSON_izbegavanje_karaktera",
                         "#ada",
                         "#turing",
                         "#aleksandar_totic",
                         "#brendan_eich",
                         "#vitalik_buterin",
                         "#grace_hopper",
                         "#lajnus_torvalds",
                         "#maja_pantic",
                         "#mika_alas",
                         "#ryan_dahl",
                         "#rajko_tomovic",
                         "#timbl",
                         "#hedy_lamarr",
                         ], [      //items
                                 "Rečnik",
                                 "Softver",
                                 "HTML u JSON",
                                 "Ada Lovlejs",
                                 "Alan Turing",
                                 "Aleksandar Totić",
                                 "Brendan Ajk",
                                 "Vitalik Buterin",
                                 "Grejs Hoper",
                                 "Lajnus Torvalds",
                                 "Maja Pantić",
                                 "Mihailo Petrović Alas",
                                 "Rajan Dal",
                                 "Rajko Tomović",
                                 "TimBL",
                                 "Hedi Lamar",
                                 ]],
                  ["hc", [         // links
                          "#uvod_u_HTML_i_CSS",
                          "#struktura_HTML_stranice",
                          "#prvi_sajt",
                          "#linkovi",
                          "#css_border",
                          "#css_border_radius",
                          "#osnovni_css",
                          "#css_linkova",
                          "#predah",
                          "#uvod_u_slike",
                          "#boje",
                          "#klase_i_id-ijevi",
                          "#divovi_i_spanovi",
                          "#html_liste",
                          "#css_liste",
                          "#meta",
                          "#css_flexbox",
                          ], [      //items
                                 "Uvod",
                                 "HTML struktura",
                                 "Prvi Sajt",
                                 "Linkovi",
                                 "Uvod u CSS - Border",
                                 "Zaobljeni ćoškovi",
                                 "Osnovni CSS",
                                 "CSS Linkova",
                                 "Predah",
                                 "Uvod u slike",
                                 "Boje",
                                 "Klase i Id-ijevi",
                                 "Divovi i Spanovi",
                                 "Liste",
                                 "Stilizacija Lista",
                                 "Meta tagovi",
                                 "Flexbox",
                                 ]],
                  ["gc", [         // links
                          "#uvod_u_cmd",
                          "#cd_md_rd",
                          "#uvod_u_git",
                          "#git_instalacija",
                          "#git_inicijacija",
                          "#dodavanje_i_komit",
                          "#pregled_loga",
                          "#git_hash",
                          "#git_status",
                          "#git_diff",
                          "#git_brisanje",
                          "#git_preimenovanje",
                          ], [      //items
                                 "Uvod u cmd",
                                 "CD, MD, RD",
                                 "Uvod u Git",
                                 "Instalacija, Podešavanja",
                                 "Inicijacija Repo-a",
                                 "Dodavanje i Komit",
                                 "Pregledanje loga",
                                 "Hašovanje",
                                 "Status",
                                 "Pregled izmena",
                                 "Brisanje Fajlova",
                                 "Promena Naziva",
                                 ]],
                  ["js", [         // links
                         "#uvod_u_js",
                         "#js_konzola",
                         "#js_tipovi",
                         "#js_typeof",
                         "#js_varijable_i_konstante",
                         "#js_brojevi",
                         "#js_math",
                         "#js_bools",
                         "#js_if",
                         "#js_stringovi",
                         "#js_arrayi_uvod",
                         "#es1_array",
                         "#es5_array",
                         "#es6_array",
                         "#js_petlje",
                         "#js_simboli",
                         "#json",
                         "#js_funkcije",
                         "#uvod_u_node",
                         "#node_modularnost",
                         "#node_konzola",
                         "#node_fs_modul_uvod",
                         "#pwa_uvod_manifest",
                         "#js_kako_brauzer_radi",
                         ], [      //items
                                 "Uvod u JS",
                                 "Konzola",
                                 "Primitivni tipovi",
                                 "Spec tipovi i typeof",
                                 "Varijable i konstante",
                                 "Brojevi naširoko",
                                 "Math",
                                 "Buliani naširoko",
                                 "If blokovi",
                                 "Stringovi naširoko",
                                 "Array-i uvod",
                                 "Array metode ES1",
                                 "Array metode ES3 i ES5",
                                 "Array metode ES6 i ES7",
                                 "Petlje",
                                 "Simboli naširoko",
                                 "JSON",
                                 "Funkcije",
                                 "Node uvod",
                                 "Node modularnost",
                                 "Konzolna aplikacija",
                                 "Uvod u rad sa fajlovima",
                                 "PWA Manifest",
                                 "JS Motor",
                                 ]],
                    ["ar", [         // links
                         "#arduino_uvod_i_instalacija",
                         "#arduino_pregled_arduina",
                         "#arduino_diode",
                         "#arduino_otpornici",
                         "#arduino_ide",
                         "#arduino_varijable",
                         "#arduino_rgb_led",
                         "#arduino_if_blokovi",
                         "#arduino_predah",
                         ], [      //items
                                 "Uvod i instalacija",
                                 "Pregled arduina",
                                 "LED",
                                 "Otpornici",
                                 "IDE",
                                 "Varijable",
                                 "RGB LED",
                                 "If blokovi",
                                 "Još jedan if",
                                 ]]
                  ];

// clears up previously selected top nav item
 for (let i = 1; i < sideNav.length; i ++) {
  document.getElementById(sideNav[i][0]).removeAttribute("class");
 }

 for (e in sideNav) {
  if (sideNav[e][0] == sideNavId) {
   getSideNavList(sideNav[e])
   var links = sideNav[e][1]
  }
 }

 let leftright = document.getElementsByClassName("leftright");
 if(sideNavId != "mp") {
  document.getElementById(sideNavId).setAttribute("class", "selected");
  for(var i = 0; i < 2; i++) {
   leftright[i].style.display = "inline"
  }
 }
 else if (sideNavId == "mp") {
  for(var i = 0; i < 2; i++) {
    leftright[i].style.display = "none";
  }
 }
 leftRightNav(links);
}

// populates side-nav 
function getSideNavList(list) {
 let sideMenu = '<ul id="side-menu">';
 var [ id, links, items ] = list;
 for (el in links) {
  sideMenu = sideMenu + '<a href="' + links[el] + '" rel="chapter"><li>' + items[el] + '</li></a>';
 }
 document.getElementById("side-nav").innerHTML = sideMenu + '</ul>';
 //leftRightNav(links);
}

// fixes top bar to the top of the page once scrolled pass logo
function bindMenu() {
 let topMenu = document.getElementById("header-bottom"),
     home = document.getElementById("backhome"),
     smallDevice = window.innerWidth;

  if (document.body.scrollTop >= 70 || document.documentElement.scrollTop >= 70) {
   topMenu.className = "fixed-top";
   home.style.visibility = "visible";
  }
  else {
   topMenu.className = "";
   home.style.visibility = "hidden";
   // home.style.top = "0px";
  }
}

window.onscroll = ()=> bindMenu();

// adds copy/date to the footer
(copid = function() {
 let d = new Date().getFullYear();
 document.querySelector('#copydate').innerHTML = "&copy; ČĎŠ " + d;
})();

// JSON escape tool button 1
function escapeBad() {
 let insertion = document.getElementById("insertf").value;
 const bad = [
              "ć", 
              "đ", 
              "š", 
              "ž", 
              "č", 
              "Š", 
              "Ć", 
              "Đ", 
              "Ž", 
              "Č", 
              "Ď", 
              "ô", 
              "λ",
              '"', 
              "(\\r\\n|\\r|\\n)", 
              "\\/", 
              ];
 const good = [
              "\\u0107", // ć
              "\\u0111", // đ
              "\\u0161", // š
              "\\u017E", // ž
              "\\u010D", // č
              "\\u0160", // Š
              "\\u0106", // Ć
              "\\u0110", // Đ
              "\\u017D", // Ž
              "\\u010C", // Č
              "\\u010E", // Ď
              "\\u00F4", // ô
              "\\u03BB", // λ
              '\\\"', 
              "\\r\\n", 
              "\\/", 
              ];
 for(let i = 0; i < bad.length; i++) {
  insertion = insertion.replace(RegExp(bad[i], 'g'), good[i]);
 }
  
 var res = document.getElementById("result");
 res.value = `${insertion}`;
}

// JSON escape tool button 2
function clearField() {
 document.getElementById("insertf").value = "";
 document.getElementById("result").value = "";
}