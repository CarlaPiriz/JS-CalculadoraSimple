let numeroDeInicio = 0;
let buffer = "0";
let anteriorOperador;
let screen = document.querySelector(".box-result");
document
  .querySelector(".box-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });
const buttonClick = (value) => {
  if (isNaN(parseInt(value))) {
    esSimbolo(value);
  } else {
    esNumero(value);
  }
  rerrender(); // Siempre devuelve con esto.
};
const esNumero = (value) => {
  // concadena los numeros en pantalla ejemplo si pulso 7 y despues 5 = 75
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
};
const esSimbolo = (value) => {
  switch (value) {
    case "C":
      numeroDeInicio = 0;
      buffer = "0";
      break;
    case "=":
      if (anteriorOperador === null) {
        // necesita 2 numeros para calcular
        return;
      }
      hacerMatematicas(parseInt(buffer));
      anteriorOperador = null;
      buffer = +numeroDeInicio;
      numeroDeInicio = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      rerrender();
      break;
    case "+":
    case "-":
    case "x":
    case "/":
      hacerMatematicas(value);
      break;
  }
};
// ME FALTA HACER LAS MATEMATICAS.
const hacerMatematicas = (value) => {
  if (buffer === "0") {
    // no hace nada
    return;
  }

  const intBuffer = parseInt(buffer);
  if (numeroDeInicio === 0) {
    numeroDeInicio = intBuffer;
  } else {
    hacerOperacion(intBuffer);
  }
  anteriorOperador = value; // aca guardo el valor del numero antes de la operacion
  buffer = "0"; // aca se resetea para poder ingresar otro numero
};
function hacerOperacion(intBuffer) {
  if (anteriorOperador === "+") {
    numeroDeInicio += intBuffer;
  } else if (anteriorOperador === "-") {
    numeroDeInicio -= intBuffer;
  } else if (anteriorOperador === "x") {
    numeroDeInicio *= intBuffer;
  } else {
    numeroDeInicio /= intBuffer;
  }
}

const rerrender = () => {
  screen.innerText = buffer;
};
