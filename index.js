let historialIMC = [];
let sonidoActual = null;

document.getElementById("imc-form").addEventListener("submit", function (event) {
    event.preventDefault();
    calcularIMC();
});

function calcularIMC() {
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const edad = parseInt(document.getElementById("edad").value);
    const etapaVida = document.getElementById("etapa-vida").value;
    const pesoUnidad = document.getElementById("peso-unidad").value;
    const alturaUnidad = document.getElementById("altura-unidad").value;

    let pesoKg = peso;
    let alturaCm = altura;

    if (pesoUnidad === "lb") {
        pesoKg = peso * 0.453592;
    }

    if (alturaUnidad === "in") {
        alturaCm = altura * 2.54;
    }

    const alturaMetros = alturaCm / 100;
    const imc = (pesoKg / (alturaMetros * alturaMetros)).toFixed(2);

    const resultado = interpretarIMC(imc, edad, etapaVida);
    mostrarResultado(imc, resultado);
    mostrarConsejos(imc, edad, etapaVida);
    actualizarHistorial(imc);

    
    document.getElementById("resultado").scrollIntoView({ behavior: 'smooth' });
}

function interpretarIMC(imc, edad, etapaVida) {
    let categoria, mensaje, color, imagen, sonido;

    if (edad < 18) {
        categoria = "Consultar profesional";
        mensaje = "Para mujeres menores de 18 años, es mejor consultar con un pediatra o especialista en crecimiento.";
        color = "#FFA500";
        imagen = "img/consulta.png";
        sonido = "audio/consulta.mp3";
    } else {
        if (imc < 18.5) {
            categoria = "Bajo peso";
            mensaje = "Tu IMC indica bajo peso. Considera aumentar tu ingesta calórica de manera saludable.";
            color = "#FFA500";
            imagen = "esqueleto.jpg";
            sonido = "esqueleto.mp3";
        } else if (imc >= 18.5 && imc < 25) {
            categoria = "Peso normal";
            mensaje = "¡Felicidades! Tu IMC está en un rango saludable.";
            color = "#4CAF50";
            imagen = "gesto.jpg";
            sonido = "normal.mp3";
        } else if (imc >= 25 && imc < 30) {
            categoria = "Sobrepeso";
            mensaje = "Tu IMC indica sobrepeso. Considera hacer algunos ajustes en tu dieta y aumentar tu actividad física.";
            color = "#FF9800";
            imagen = "gorda.jpg";
            sonido = "gorda.mp3";
        } else {
            categoria = "Obesidad";
            mensaje = "Tu IMC indica obesidad. Te recomendamos consultar con un profesional de la salud para un plan personalizado.";
            color = "#F44336";
            imagen = "ballena.jpg";
            sonido = "audio/obesidad.mp3";
        }

        
        switch (etapaVida) {
            case "embarazada":
                mensaje += " Durante el embarazo, es normal ganar peso. Consulta con tu obstetra para un seguimiento adecuado.";
                break;
            case "postparto":
                mensaje += " Después del parto, tu cuerpo necesita tiempo para recuperarse. No te presiones y sigue una dieta equilibrada.";
                break;
            case "menopausia":
                mensaje += " Durante la menopausia, los cambios hormonales pueden afectar tu peso. Mantén una dieta equilibrada y haz ejercicio regularmente.";
                break;
        }
    }

    return { categoria, mensaje, color, imagen, sonido };
}

function mostrarResultado(imc, resultado) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.classList.remove("hidden");
    resultadoDiv.style.opacity = "0";

    document.getElementById("imc-valor").textContent = imc;
    document.getElementById("imc-valor").style.color = resultado.color;
    document.getElementById("imc-categoria").textContent = resultado.categoria;
    document.getElementById("imc-mensaje").textContent = resultado.mensaje;

    // Agregar imagen
    const imagenResultado = document.createElement("img");
    imagenResultado.src = resultado.imagen;
    imagenResultado.alt = resultado.categoria;
    imagenResultado.style.maxWidth = "200px";
    imagenResultado.style.marginTop = "20px";
    document.getElementById("imc-grafico").innerHTML = "";
    document.getElementById("imc-grafico").appendChild(imagenResultado);

  
    reproducirSonido(resultado.sonido);


    setTimeout(() => {
        resultadoDiv.style.transition = "opacity 0.5s ease-in";
        resultadoDiv.style.opacity = "1";
    }, 100);
}

function reproducirSonido(src) {
    if (sonidoActual) {
        sonidoActual.pause();
        sonidoActual.currentTime = 0;
    }
    sonidoActual = new Audio(src);
    sonidoActual.play();
}

