const pantalla1 = document.querySelector(".pantalla1");
const pantalla2 = document.querySelector(".pantalla2");
const pantalla3 = document.querySelector(".pantalla3");
const pantalla4 = document.querySelector(".pantalla4");
const pantalla5 = document.querySelector(".pantalla5");
const pantalla6 = document.querySelector(".pantalla6");
const pantalla7 = document.querySelector(".total-kbps");
const pantalla8 = document.querySelector(".total-mbps");
const botones = document.querySelectorAll(".btn");

let guarda = document.getElementById("guarda");
let sega = document.getElementById("seg1");
let segb = document.getElementById("seg2");
let segc = document.getElementById("seg3");

let cda = document.getElementById("cd_conv1");
let cdb = document.getElementById("cd_conv2");
let cdc = document.getElementById("cd_conv3");

let mda = document.getElementById("mod1");
let mdb = document.getElementById("mod2");
let mdc = document.getElementById("mod3");

// Función para validar que la suma de segmentos no exceda 13
function validarSegmentos(segav, segbv, segcv) {
    return (segav + segbv + segcv) <= 13;
}

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        // Obtener valores de los select e input
        let guardav = guarda.options[guarda.selectedIndex].value;

        let segav = parseInt(sega.value) || 0;
        let segbv = parseInt(segb.value) || 0;
        let segcv = parseInt(segc.value) || 0;

        let cdav = parseFloat(cda.value) || 0;
        let cdbv = parseFloat(cdb.value) || 0;
        let cdcv = parseFloat(cdc.value) || 0;

        let mdav = parseInt(mda.value) || 0;
        let mdbv = parseInt(mdb.value) || 0;
        let mdcv = parseInt(mdc.value) || 0;

        if (!validarSegmentos(segav, segbv, segcv)) {
            alert('El total de segmentos en A, B y C no puede exceder 13. Ajuste los valores.');
            return;
        }

        const tasaKbpsa = calculateKbps(segav, cdav, mdav, guardav) * 1000;
        const tasaMbpsa = tasaKbpsa / 1000;
        const tasaKbpsb = calculateKbps(segbv, cdbv, mdbv, guardav) * 1000;
        const tasaMbpsb = tasaKbpsb / 1000;
        const tasaKbpsc = calculateKbps(segcv, cdcv, mdcv, guardav) * 1000;
        const tasaMbpsc = tasaKbpsc / 1000;

        const totalKbpsValue = tasaKbpsa + tasaKbpsb + tasaKbpsc;
        const totalMbpsValue = totalKbpsValue / 1000;

        if (boton.id === "calcular") {
            pantalla1.textContent = tasaKbpsa.toFixed(3);
            pantalla3.textContent = tasaKbpsb.toFixed(3);
            pantalla5.textContent = tasaKbpsc.toFixed(3);
            pantalla2.textContent = tasaMbpsa.toFixed(3);
            pantalla4.textContent = tasaMbpsb.toFixed(3);
            pantalla6.textContent = tasaMbpsc.toFixed(3);
            pantalla7.textContent = totalKbpsValue.toFixed(3);
            pantalla8.textContent = totalMbpsValue.toFixed(3);
        }

        if (boton.id === "borrar") {
            location.reload();
        }
    });
});

function calculateKbps(seg, cdConv, mod, guarda) {
    if (seg === 0 || cdConv === 0 || mod === 0 || guarda === "0") {
        return 0;
    } else {
        return seg * ((8 * 0.922 * cdConv * Math.log2(mod)) / (21 * (1 + parseFloat(guarda))));
    }
}

