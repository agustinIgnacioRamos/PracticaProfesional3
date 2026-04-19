class Carta {
    constructor(emoji) {
        this.emoji = emoji;
        this.visible = false;
        this.resuelta = false;
    }
}

class Juego {
    constructor(size) {
        this.size = size;
        this.totalCartas = size * size;
        this.cartas = [];
        this.seleccionadas = [];
        this.intentos = 0;
        this.tiempo = 0;
        this.intervalo = null;
        this.juegoActivo = false;



        this.bloqueado = false;

        this.tablero = document.getElementById("tablero");
        this.mensaje = document.getElementById("mensaje");
        this.intentosHTML = document.getElementById("intentos");
        this.tiempoHTML = document.getElementById("tiempo");

        this.iniciar();
    }

    iniciar() {

        this.juegoActivo = true;

        this.mensaje.textContent = "";

        this.intentos = 0;

        this.tiempo = 0;

        this.actualizarIntentos();

        this.actualizarTiempo();

        clearInterval(this.intervalo);

        this.iniciarTiempo();

        this.generarCartas();

        this.mezclar();

        this.render();

    }

    iniciarTiempo() {

        clearInterval(this.intervalo);

        this.intervalo = setInterval(() => {

            if (!this.juegoActivo) return;

            this.tiempo++;

            this.actualizarTiempo();

        }, 1000);

    }
    actualizarTiempo() {

        this.tiempoHTML.textContent = "Tiempo: " + this.tiempo + "s";

    }

    actualizarIntentos() {

        this.intentosHTML.textContent = "Intentos: " + this.intentos;

    }

    generarCartas() {

        const emojis = [
            "🌊", "🐚", "🐠", "🐬", "🪸", "🏖️", "☀️", "🌴", "🍹", "🧴",
            "🩴", "👙", "🕶️", "🌺", "🌸", "💎", "✨", "🌞", "🌅", "🌈",
            "🎧", "🎤", "💃", "🕺", "💿", "📀", "🎶", "🎵", "💙", "🩵",
            "🤍", "💛", "💖", "🪩", "🌟", "🔥", "🍉", "🥥", "🍍", "🍓",
            "🫧", "🌬️", "🌼", "🌻", "🏄‍♀️", "🚤", "⛵", "🌙", "⭐", "💫"
        ];

        this.cartas = [];

        let paresNecesarios = this.totalCartas / 2;

        let seleccionados = emojis.slice(0, paresNecesarios);

        let duplicados = [...seleccionados, ...seleccionados];

        duplicados.forEach(e => {
            this.cartas.push(new Carta(e));
        });
    }

    mezclar() {

        for (let i = this.cartas.length - 1; i > 0; i--) {

            let j = Math.floor(Math.random() * (i + 1));

            let temp = this.cartas[i];
            this.cartas[i] = this.cartas[j];
            this.cartas[j] = temp;

        }

    }

    render() {

        this.tablero.innerHTML = "";

        this.tablero.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;
        this.cartas.forEach((carta, index) => {

            let div = document.createElement("div");

            div.classList.add("carta");

            div.dataset.index = index;

            if (carta.visible || carta.resuelta) {
                div.textContent = carta.emoji;
                div.classList.add("visible");
            }

            if (carta.resuelta) {
                div.classList.add("resuelta");
            }

            div.addEventListener("click", () => this.clickCarta(index));

            this.tablero.appendChild(div);

        });

    }

    clickCarta(index) {

        if (this.bloqueado) return;

        let carta = this.cartas[index];

        if (carta.visible || carta.resuelta) return;

        carta.visible = true;

        this.seleccionadas.push(index);

        this.render();

        if (this.seleccionadas.length === 2) {

            this.verificar();

        }

    }

    verificar() {

        this.bloqueado = true;

        this.intentos++;
        this.actualizarIntentos();

        let [i1, i2] = this.seleccionadas;

        let c1 = this.cartas[i1];

        let c2 = this.cartas[i2];

        if (c1.emoji === c2.emoji) {

            setTimeout(() => {

                c1.resuelta = true;

                c2.resuelta = true;

                this.resetTurno();

                this.verificarFin();

            }, 300);

        }
        else {

            setTimeout(() => {


                c1.visible = false;
                c2.visible = false;

                this.resetTurno();

            }, 1000);

        }

    }

    resetTurno() {

        this.seleccionadas = [];

        this.bloqueado = false;

        this.render();

    }

    verificarFin() {

        let terminado = this.cartas.every(c => c.resuelta);

        if (terminado) {

            this.juegoActivo = false;

            this.mensaje.textContent = "Juego terminado";

            clearInterval(this.intervalo);

        }


    }

}


let juegoActual = null;

function iniciarJuego() {

    if (juegoActual) {

        clearInterval(juegoActual.intervalo);

        juegoActual.juegoActivo = false;

    }

    let size = parseInt(document.getElementById("tamano").value);

    juegoActual = new Juego(size);

}


document.getElementById("nuevoJuego").addEventListener("click", iniciarJuego);

iniciarJuego();