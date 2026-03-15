/*------------------------------------------------Mapa interactivo--------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------*/

// Crear el mapa
var map;
let zonaHoraria = Number(getCookie("zonaHoraria"));

let primeraVez = true;


let lat = getCookie("latCookie");
let lng = getCookie("lngCookie");

if (lat != "" && lng != "") {
  obtenerDatosApi(lat, lng, false);
  console.log("latCookie: " + lat);
  console.log("lngCookie: " + lng);

  map = L.map('map').setView([lat, lng], 12); // Coordenadas seleccionadas anteriormente

} else {
  map = L.map('map').setView([40.4168, -3.7038], 12); // Coordenadas de Madrid, zoom nivel 12
}

let horas;
let hora24;
let minutos;
let segundos;

let month;
let mesTxt;
let day;
let year;
let hour;
let minute;
let second;
let dayTxt;

const arrayDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const arrayMeses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];



// Añadir el mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir un evento para detectar los clics en el mapa
map.on('click', async function (e) {
  // Obtener las coordenadas de la ubicación donde se hace clic
  lat = e.latlng.lat;
  lng = e.latlng.lng;

  //Establecer cookies de latitud y longidud
  var latCookie = lat;
  document.cookie = "latCookie=" + encodeURIComponent(latCookie);
  document.cookie = `latCookie=${lat};expires=Sat, 6 Aug 2025 13:00:00 GMT`;

  var lngCookie = lng;
  document.cookie = "lngCookie=" + encodeURIComponent(lngCookie);
  document.cookie = `lngCookie=${lng};expires=Sat, 6 Aug 2025 13:00:00 GMT`;

  await obtenerDatosApi(lat, lng, true);


});




/*----------------------------------------------------Eventos menu formatos--------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------*/

const textViewTimeZone = document.getElementById("textViewTimeZone");
const textViewFecha = document.getElementById("textViewFecha");
const textViewDigitalHora = document.getElementById("textViewDigitalHora");
const textViewDigitalMinuto = document.getElementById("textViewDigitalMinuto");
const textViewDigitalSegundo = document.getElementById("textViewDigitalSegundo");

const textViewDigitalPM = document.getElementById("textViewDigitalPM");
const textViewDigitalAM = document.getElementById("textViewDigitalAM");
textViewDigitalPM.style.visibility = "hidden";
textViewDigitalAM.style.visibility = "hidden";


//Si es la primera vez que se ejecuta la aplicacion inicializa los local storage
//Si no ya estan inicializados de la ultima vez

//Gestionar las cookies para saber cual se ha seleccionado anteriormente
let formatoFecha = Number(getCookie("formatoFechaCookie"));
//let formatoFecha2 = false;
//let formatoFecha3 = false;
let formatoHora = Number(getCookie("formatoHoraCookie"));
//let formatoHora2 = false;





const buttonFormatoFecha1 = document.getElementById("buttonFormatoFecha1");
const buttonFormatoFecha2 = document.getElementById("buttonFormatoFecha2");
const buttonFormatoFecha3 = document.getElementById("buttonFormatoFecha3");

const buttonFormatoHora1 = document.getElementById("buttonFormatoHora1");
const buttonFormatoHora2 = document.getElementById("buttonFormatoHora2");


switch (formatoFecha) {
  case 1: {
    buttonFormatoFecha1.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
    break;
  }
  case 2: {
    buttonFormatoFecha2.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
    break;
  }
  case 3: {
    buttonFormatoFecha3.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
    break;
  }
}
switch (formatoHora) {
  case 1: {
    buttonFormatoHora1.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
    break;
  }
  case 2: {
    buttonFormatoHora2.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
    break;
  }
}


buttonFormatoFecha1.addEventListener("click", function () {

  console.log("Se pulsa el boton");

  console.log(formatoFecha);

  formatoFecha = 1;

  buttonFormatoFecha1.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
  buttonFormatoFecha2.style.backgroundColor = "rgb(105, 105, 105)";
  buttonFormatoFecha3.style.backgroundColor = "rgb(105, 105, 105)";



  //console.log("El boton esta true, se cambia a false");

  var formatoFechaCookie = formatoFecha;
  document.cookie = "formatoFechaCookie=" + encodeURIComponent(formatoFechaCookie);
  document.cookie = `formatoFechaCookie=${formatoFechaCookie};expires=Sat, 6 Aug 2025 13:00:00 GMT`;

  /*buttonFormatoFecha1.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
  buttonFormatoFecha2.style.backgroundColor = "rgb(105, 105, 105)";
  buttonFormatoFecha3.style.backgroundColor = "rgb(105, 105, 105)";*/


}, false);


buttonFormatoFecha2.addEventListener("click", function () {

  console.log("Se pulsa el boton");

  console.log(formatoFecha);

  formatoFecha = 2;

  buttonFormatoFecha2.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
  buttonFormatoFecha1.style.backgroundColor = "rgb(105, 105, 105)";
  buttonFormatoFecha3.style.backgroundColor = "rgb(105, 105, 105)";



  //console.log("El boton esta true, se cambia a false");

  var formatoFechaCookie = formatoFecha;
  document.cookie = "formatoFechaCookie=" + encodeURIComponent(formatoFechaCookie);
  document.cookie = `formatoFechaCookie=${formatoFechaCookie};expires=Sat, 6 Aug 2025 13:00:00 GMT`;

}, false);

buttonFormatoFecha3.addEventListener("click", function () {

  console.log("Se pulsa el boton");

  console.log(formatoFecha);

  formatoFecha = 3;

  buttonFormatoFecha3.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
  buttonFormatoFecha2.style.backgroundColor = "rgb(105, 105, 105)";
  buttonFormatoFecha1.style.backgroundColor = "rgb(105, 105, 105)";



  //console.log("El boton esta true, se cambia a false");

  var formatoFechaCookie = formatoFecha;
  document.cookie = "formatoFechaCookie=" + encodeURIComponent(formatoFechaCookie);
  document.cookie = `formatoFechaCookie=${formatoFechaCookie};expires=Sat, 6 Aug 2025 13:00:00 GMT`;

}, false);

buttonFormatoHora1.addEventListener("click", function () {

  formatoHora = 1;
  buttonFormatoHora1.style.backgroundColor = "rgba(0, 0, 0, 0.359)";
  buttonFormatoHora2.style.backgroundColor = "rgb(105, 105, 105)";

  var formatoHoraCookie = formatoHora;
  document.cookie = "formatoHoraCookie=" + encodeURIComponent(formatoHoraCookie);
  document.cookie = `formatoHoraCookie=${formatoHoraCookie};expires=Sat, 6 Aug 2025 13:00:00 GMT`;

}, false);

buttonFormatoHora2.addEventListener("click", function () {

  formatoHora = 2;
  buttonFormatoHora1.style.backgroundColor = "rgb(105, 105, 105)";
  buttonFormatoHora2.style.backgroundColor = "rgba(0, 0, 0, 0.359)";

  var formatoHoraCookie = formatoHora;
  document.cookie = "formatoHoraCookie=" + encodeURIComponent(formatoHoraCookie);
  document.cookie = `formatoHoraCookie=${formatoHoraCookie};expires=Sat, 6 Aug 2025 13:00:00 GMT`;

}, false);

/*----------------------------------------------------Reloj Canvas--------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------*/
//Objeto canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");



//Radio del reloj (altura del canvas)
var radius = canvas.height / 2;

//Traslada la posición(0,0) al centro del dibujo.
ctx.translate(radius, radius);

//Reduce el radio al 90% para que quede dibujado bien dentro del canvas.
radius = radius * 0.90

// DIBUJAR EL RELOJ
// drawClock();

//Para INICIAR EL RELOJ, llamar a la función drawClock en intervalos.
setInterval(drawClock, 1000);
function drawClock() {

  if (primeraVez){
    crearHoraSegunZonaHoraria();
    primeraVez = false;
  }
  

  drawFace(ctx, radius);
  drawNumbers(ctx, radius);

  //Calculos cada segundo
  segundos = segundos + 1;
  if (segundos > 59) {
    minutos = minutos + 1;
    segundos = 0;
  }
  if (minutos >= 59) {
    horas = horas + 1;
    minutos = 0;
  }

  if (horas >= 24) {
    horas = 0; // Reinicia las horas si llega a 24
    day = day + 1;
    primeraVez = true;
  }





  drawTime(ctx, radius);
}

function crearHoraSegunZonaHoraria() {
  var now = new Date();
  /*let hourNow = now.getHours();
  let minuteNow = now.getMinutes();
  let secondNow = now.getSeconds();
  let yearNow = now.getFullYear();
  let monthNow = now.getMonth();
  let dayNow = now.getDate();
  let dayTxtNow = now.getDay();*/

  //Sumo 1 porque España es zona 1+
  //zonaHoraria = zonaHoraria + 1;

  if (zonaHoraria != 1){
    now.setHours(now.getHours() + (zonaHoraria - 1));
  }
  //Resto 1 porque estamos en España zona 1+ y si es zona 0 no resta
  /*if (zonaHoraria == 0){
    now.setHours(now.getHours() - 1);
  }*/

  console.log("Hora actual + " + zonaHoraria + " = " + now.getHours());

  let horas12 = now.getHours();
  if (horas12 > 12){
    horas = horas12 - 12;
  } else horas = horas12;
  hora24 = now.getHours();
  minutos = now.getMinutes();
  segundos = now.getSeconds();

  let numMesTxt = now.getMonth();
  mesTxt = arrayMeses[numMesTxt];
  month = numMesTxt + 1;
 
  day = now.getDate();
  let numDiaTxt = now.getDay();
  dayTxt = arrayDias[numDiaTxt];
  year = now.getFullYear();

  console.log("Dia: " + day);
  console.log("Mes: " + month);
  console.log("Año: " + year);


  
  



}
function drawFace(ctx, radius) {
  var grad;

  //Circulo blanco interior
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();

  //Crear un gradiente radial (95% y 105% del radio original del reloj)
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);

  //3 paradas de color, correspondientes con el borde interior, medio y exterior del arco.
  // ColorStop crea un efecto 3D
  grad.addColorStop(0, 'black');
  grad.addColorStop(0.5, 'black');
  grad.addColorStop(1, 'black');

  //Definir el degradado como el estilo de trazo del objeto de dibujo
  ctx.strokeStyle = grad;

  //Ancho de línea del objeto (10% del radio)
  ctx.lineWidth = radius * 0.1;

  //Dibujar el circulo
  ctx.stroke();

  //Circulo en el centro del reloj.
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;

  //Font size (15% del radio)
  ctx.font = radius * 0.15 + "px arial";
  ctx.fillStyle = 'white';

  //Alineación del texto en el centro y en el centro de la posición de impresión
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  //Calcular la posición de impresion de los números.
  // 85% del radio,rotado pi/6 por cada número.
  for (num = 1; num < 13; num++) {
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {

  console.log("horas:" + horas);
  console.log("horas24:" + hora24);
  console.log("minutos:" + minutos);
  console.log("segundos:" + segundos);
  console.log("month:" + month);
  console.log("mestxt:" + mesTxt);
  console.log("dia: " + day);
  //console.log("diasemana:" + diaSemanaTxt);
  console.log("year:" + year);

  //console.log("horas: " + horas);
  //console.log("minutos: " + minutos);
  //console.log("segundos: " + segundos);

  if (formatoHora == 1) {
    textViewDigitalHora.innerHTML = formatTwoDigits(horas);
    if (hora24 > 12) {
      textViewDigitalPM.style.visibility = "visible";
      textViewDigitalAM.style.visibility = "hidden";
    } else {
      textViewDigitalPM.style.visibility = "hidden";
      textViewDigitalAM.style.visibility = "visible";
    }
  } else {
    textViewDigitalHora.innerHTML = formatTwoDigits(hora24);
    textViewDigitalPM.style.visibility = "hidden";
    textViewDigitalAM.style.visibility = "hidden";
  }

  textViewDigitalMinuto.innerHTML = formatTwoDigits(minutos);
  textViewDigitalSegundo.innerHTML = formatTwoDigits(segundos);

  if (formatoFecha == 3) {
    textViewFecha.innerHTML = `${dayTxt}, ${formatTwoDigits(day)} de ${mesTxt} de ${year}`;
  } else if (formatoFecha == 2) {
    textViewFecha.innerHTML = `${dayTxt.substring(0, 3)}, ${formatTwoDigits(day)}  ${mesTxt.substring(0, 3)}  ${year}`;
  } else {
    textViewFecha.innerHTML = `${formatTwoDigits(day)}/${formatTwoDigits(month)}/${year}`;
  }



  //Calcular el ángulo de las agujas del reloj según la hora.
  let horasAnalogico = 0;
  let minutosAnalogico = 0;
  let segundosAnalogico = 0;
  //horas
  //horas = horas % 12;
  horasAnalogico = (horas * Math.PI / 6) + (minutos * Math.PI / (6 * 60)) + (segundos * Math.PI / (360 * 60));
  drawHand(ctx, horasAnalogico, radius * 0.5, radius * 0.07, 'white');
  //minutos
  minutosAnalogico = (minutos * Math.PI / 30) + (segundos * Math.PI / (30 * 60));
  drawHand(ctx, minutosAnalogico, radius * 0.8, radius * 0.07, 'white');
  // segundos
  segundosAnalogico = (segundos * Math.PI / 30);
  drawHand(ctx, segundosAnalogico, radius * 0.9, radius * 0.02, 'white');

  function formatTwoDigits(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  }

}

//Dibujar la línea indicando longitud y ancho.
function drawHand(ctx, pos, length, width, color) {


  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);

}

async function obtenerDatosApi(lat, lng, click) {
  try {
    // Usar fetch para obtener la zona horaria y la hora local desde ipgeolocation.io
    let apiKey = '';  // Reemplaza con tu API Key de ipgeolocation.io
    let response = await fetch(`https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&lat=${lat}&long=${lng}`);

    if (!response.ok) throw new Error("Error al obtener la hora.");

    // Convertir la respuesta en JSON
    let data = await response.json();

    // Obtener datos de fecha y hora
    //let datetime = data.date_time_txt; // "2018-12-06 02:02:09",
    //let timezone = data.timezone;      // "America/Los_Angeles",
    zonaHoraria = data.timezone_offset;
    document.cookie = "zonaHoraria=" + encodeURIComponent(zonaHoraria);
    document.cookie = `zonaHoraria=${zonaHoraria};expires=Sat, 6 Aug 2025 13:00:00 GMT`;
    console.log("timeZone: " + zonaHoraria);

    
    //let fecha = data.date; //"date": "2018-12-06"
    //let time_24 = data.time_24; //"time_24": "02:02:09",
    //console.log("time_24: " + time_24);
    //let time_12 = data.time_12; //"time_12": "02:02:09 AM",
    //console.log("time_12: " + time_12);
    //Variable global
    //month = data.month; //"month": "12",
    //Variable global
    //year = data.year; //"2018",
    //let date_time_txt = data.date_time_txt; //"Thursday, December 06, 2018 02:02:09",
    //let date_time_wti = data.date_time_wti; //"Thu, 06 Dec 2018 02:02:09 -0800"

    // Separa la hora (02:02:09) del período (AM)
    /*const [horaCompleta, periodo] = time_12.split(" ");

    // Divide la hora completa en horas, minutos y segundos
    const [horas1, minutos1, segundos1] = horaCompleta.split(":");

    const [anyo, mes, dia] = fecha.split("-");
    //Variable global
    day = dia;
    //console.log("Horas:", horas);       // "02"
    //console.log("Minutos:", minutos);   // "02"
    //console.log("Segundos:", segundos); // "09"

    horas = parseInt(horas1); // Convertir a número
    minutos = parseInt(minutos1); // Convertir a número
    segundos = parseInt(segundos1); // Convertir a número 
    //Calculos para separar las fechas y horas

    const [horas2, minutos2, segundos2] = time_24.split(":");
    //Variable global
    hora24 = horas2;

    //Variable global
    mesTxt = buscarMesTxt(month);

    let diaSemana = date_time_wti.substring(0, 3);
    console.log(diaSemana);

    //Variable global
    diaSemanaTxt = buscarDiaSemanaTxt(diaSemana);*/


    //drawClock(horas, hora24, minutos, segundos, month, mesTxt, diaSemanaTxt);

    if (click) {
      // Añadir un marcador en el mapa en la posición donde se hizo clic
      L.marker([lat, lng]).addTo(map)
        
      primeraVez = true;
    }


  } catch (error) {
    console.error("Error:", error);
    alert("No se pudo obtener la fecha y hora.");
  }
}

/*-------------------------------Obtener una cookie por nombre--------------------------*/
function getCookie(cname) {

  console.log("Entra en la funcion getCookie()");

  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
