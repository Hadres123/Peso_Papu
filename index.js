document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value) / 100; // convertir a metros

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    let mensaje = "";
    let imagen = "";
    let sonido = "";

    // Detener cualquier sonido que esté reproduciéndose
    stopSound();

    if (imc < 18.5) {
        mensaje = "Estás por debajo del peso ideal.";
        imagen = "esqueleto.jpg"; // Cambia la ruta de la imagen según sea necesario
        sonido = "esqueleto.mp3"; // Ruta al archivo de sonido correspondiente
    } else if (imc >= 18.5 && imc <= 24.9) {
        mensaje = "¡Estás en tu peso ideal! Sigue manteniendo un estilo de vida saludable.";
        imagen = "img/peso_ideal.png";
        sonido = "normal.mp3";
    } else if (imc >= 25 && imc <= 29.9) {
        mensaje = "Tienes sobrepeso. Considera mejorar tu dieta y aumentar la actividad física.";
        imagen = "gorda.jpg";
        sonido = "gorda.mp3";


    } else {
        mensaje = "Estás en un rango de obesidad. Es recomendable que consultes a un especialista.";
        imagen = "img/obesidad.png";
        sonido = "audio/obesidad.mp3";
    }

    document.getElementById("resultado").innerHTML = `
        <p>Tu IMC es ${imc}</p>
        <p>${mensaje}</p>
        <img src="${imagen}" alt="Resultado">
    `;

    // Reproducir el sonido correspondiente
    playSound(sonido);
});

// Función para reproducir el sonido
function playSound(src) {
    const audio = new Audio(src);
    audio.play();
}

// Función para detener el sonido actual
function stopSound() {
    const audios = document.getElementsByTagName('audio');
    for (let i = 0; i < audios.length; i++) {
        audios[i].pause();
        audios[i].currentTime = 0; // Reiniciar el sonido al comienzo
    }
}
