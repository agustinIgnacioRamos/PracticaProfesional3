async function convertir() {
    try{

        let input= document.getElementById("pesos").value.replace(/,/g, '');
        let error = document.getElementById("error");
        let resultado = document.getElementById("resultado");

        error.innerHTML="";
        error.classList.remove("show");
        resultado.innerHTML="";

        if (input === "") {
            error.innerHTML = "ingrese un valor";
            error.classList.add("show");
            return;
        } //verifico  si  hay valor en el input  y sino muestra error

        if ( isNaN(input)){
            error.innerHTML = "Debe ser un número";
            error.classList.add("show");
            return;
        } //si no es numero entra al if y muestra el error;

        let pesos = parseFloat(input); //traigo lo ingresado y lo convierto en decimales y lo guardo en pesos
        console.log(pesos);
        const response= await fetch ("https://dolarapi.com/v1/dolares");
        const data= await response.json();

        let oficial = data.find(d=> d.nombre === "Oficial"); // busco en el  en el array el primer objeto que  su nombre sea "Oficial" y lo guardo
        let blue = data.find(d=> d.nombre === "Blue");
        let mep = data.find(d=> d.nombre === "Bolsa");

        let arrayDolares = [oficial, blue, mep]; 

        mostrarResultados(pesos, arrayDolares);
    } catch(e){
         let error = document.getElementById("error");
         error.innerHTML="Error con la API";
         error.classList.add("show");
    } 
}

function mostrarResultados(pesos, arrayDolares){
        let resultado = document.getElementById("resultado");
        let r = "";
        arrayDolares.forEach(t => {
                r += ` <div class="tarjeta ${t.nombre.toLowerCase().replace('bolsa', 'mep')}" >
                        <h3>${t.nombre}</h3>
                       <p> Compra: $${formatearConComas(Number(t.compra).toFixed(2))} -> USD ${formatearConComas((pesos / t.compra).toFixed(2))}</p> 
                       <p> Venta: $${formatearConComas(Number(t.venta).toFixed(2))} -> USD ${formatearConComas((pesos / t.venta).toFixed(2))}</p>
                        </div>`
                   
        });
       
        resultado.innerHTML = r;
    
}

// F() para formatear números con comas
function formatearConComas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Agregar formateo de separador de miles al input
document.getElementById("pesos").addEventListener('input', function(e) {
    let valor = e.target.value.replace(/,/g, '');
    if (!isNaN(valor) && valor !== '') {
        e.target.value = formatearConComas(valor);
    }
});