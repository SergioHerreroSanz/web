/*--------------------Cambiar navbar al hacer scroll--------------------*/
window.addEventListener("scroll", changeNavCssOnScroll);
function changeNavCssOnScroll() {
  var nav = document.getElementById("nav");

  if (this.scrollY >= 25) {
    nav.classList.add("scrollNavbar");
  } else {
    nav.classList.remove("scrollNavbar");
  }
}

/*--------------------Animación texto landing--------------------*/
/*https://css-tricks.com/snippets/css/typewriter-effect/*/
var TxtType = function (el, toRotate, period, speed) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.speed = parseInt(speed, 10) || 200;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = this.speed - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    var speed = elements[i].getAttribute("data-speed");
    var skew = elements[i].getAttribute("data-tilt");
    var bar = elements[i].getAttribute("data-bar-speed");

    bar = parseFloat(bar) || 1;
    skew = parseFloat(skew) || 0;

    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period, speed);
    }

    aniadirTarjetas();
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML =
    ".typewrite{ transform: skew(-" +
    skew +
    "deg);}" +
    ".typewrite > .wrap {border-right: 0.08em solid #fff; animation: barra " +
    bar +
    "s infinite;}@keyframes barra {0%,100%{border-right: 0.08em solid #fff;}50%{border-right: 0.08em solid transparent;}}";
  document.body.appendChild(css);
};

/**/
function aniadirTarjetas() {
  var request = new XMLHttpRequest();

  request.open("GET", "proyectos.html", true), request.send();

  request.addEventListener(
    "load",
    function (evt) {
      var parser = new DOMParser();

      var contenedor = document.getElementById("aniadirTarjetas");
      var doc = parser.parseFromString(evt.target.response, "text/html");

      //console.log(evt);
      //console.log(doc);

      tarjetas = doc.getElementsByClassName("destacar-proyecto");
      //console.log(tarjetas);

      for (var i = 0; i < tarjetas.length; i++) {
        contenedor.appendChild(tarjetas[i]);
        console.log(tarjetas[i]);
      }
    },
    false
  );
}

function desplegarNav() {
  var x = document.getElementById("nav-links");
  if (x.className != "nav-links") {
    x.className = "nav-links";
  } else {
    if (document.documentElement.clientWidth < 1000) {
      x.className += " responsive";
    }
  }
}
