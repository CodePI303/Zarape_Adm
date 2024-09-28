let sucursales = [];
let sucursalSeleccionada;

fetch("sucursal.json")
    .then(response => response.json())
    .then(jsondata => {
        sucursales = jsondata;
        cargarTablaSucursales(); 
    });

function revisarEstatus() {
    let checkboxProd = document.getElementById("switch-label");
    let estatusExterno = checkboxProd.checked ? 0 : 1; 
    cargarTablaSucursales(estatusExterno);
    document.getElementById("txtEstatus1").textContent = checkboxProd.checked ? "Inactivo" : "Activo";
}

function cargarTablaSucursales() {
    let datosTabla = document.getElementById("tabla");
    let renglon = "";
    sucursales.forEach(sucursal => {
        let estatusN = "Activo"; // Cambiar lógica si necesitas un estatus

        renglon += `<tr onclick='seleccionarRenglon(${sucursales.indexOf(sucursal)})'>` +
                    `<td>${sucursal.Nombre}</td>` +
                    `<td>${sucursal.Url}</td>` +
                    `<td>${sucursal.Horario}</td>` +
                    `<td>${sucursal.Colonia}</td>` +
                    `<td>${sucursal.Calle}</td>` +
                    `<td>${sucursal.Numero}</td>` +
                    `</tr>`;
    });
    datosTabla.innerHTML = renglon;
}

function seleccionarRenglon(indice) {
    document.getElementById("nombreSucursal").value = sucursales[indice].Nombre;
    document.getElementById("urlSucursal").value = sucursales[indice].Url;
    document.getElementById("horarioSucursal").value = sucursales[indice].Horario;
    document.getElementById("coloniaSucursal").value = sucursales[indice].Colonia;
    document.getElementById("calleSucursal").value = sucursales[indice].Calle;
    document.getElementById("numeroSucursal").value = sucursales[indice].Numero;
    sucursalSeleccionada = indice;
}

function agregarSucursal() {
    let nombre = document.getElementById("nombreSucursal").value.trim();
    let url = document.getElementById("urlSucursal").value.trim();
    let horario = document.getElementById("horarioSucursal").value.trim();
    let colonia = document.getElementById("coloniaSucursal").value.trim();
    let calle = document.getElementById("calleSucursal").value.trim();
    let numero = document.getElementById("numeroSucursal").value.trim();

    if (!nombre || !url || !horario || !colonia || !calle || !numero) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let nuevaSucursal = {
        Url: url,
        Calle: calle,
        Nombre: nombre,
        Numero: numero,
        Colonia: colonia,
        Horario: horario,
        "Clave Sucursal": sucursales.length + 1 // Genera un id único para la nueva sucursal
    };

    sucursales.push(nuevaSucursal);
    cargarTablaSucursales();
    limpiar(); // Opcional: limpiar el formulario después de agregar
}

function deleteSucursal() {
    if (sucursalSeleccionada !== undefined) {
        sucursales.splice(sucursalSeleccionada, 1); // Elimina la sucursal seleccionada
        cargarTablaSucursales();
        limpiar();
    } else {
        alert("No hay ninguna sucursal seleccionada.");
    }
}

function modificarSucursal() {
    if (sucursalSeleccionada !== undefined) {
        let nombre = document.getElementById("nombreSucursal").value.trim();
        let url = document.getElementById("urlSucursal").value.trim();
        let horario = document.getElementById("horarioSucursal").value.trim();
        let colonia = document.getElementById("coloniaSucursal").value.trim();
        let calle = document.getElementById("calleSucursal").value.trim();
        let numero = document.getElementById("numeroSucursal").value.trim();

        if (!nombre || !url || !horario || !colonia || !calle || !numero) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        let sucursal = {
            Url: url,
            Calle: calle,
            Nombre: nombre,
            Numero: numero,
            Colonia: colonia,
            Horario: horario,
            "Clave Sucursal": sucursales[sucursalSeleccionada]["Clave Sucursal"]
        };

        sucursales[sucursalSeleccionada] = sucursal;
        revisarEstatus(); // Actualiza la tabla según el estado del checkbox
    } else {
        alert("No hay ninguna sucursal seleccionada.");
    }
}

function limpiar() {
    document.getElementById("nombreSucursal").value = "";
    document.getElementById("urlSucursal").value = "";
    document.getElementById("horarioSucursal").value = "";
    document.getElementById("coloniaSucursal").value = "";
    document.getElementById("calleSucursal").value = "";
    document.getElementById("numeroSucursal").value = "";
}

function buscarSucursal() {
    let buscar = document.getElementById("campoBusqueda").value.toLowerCase();
    let cuerpo = "";
    let tieneActivo = false;
    let tieneInactivo = false;

    sucursales.forEach(function (sucursal) {
        let nombre = sucursal.Nombre.toLowerCase(); 
        let numero = sucursal.Numero.toLowerCase();
        let colonia = sucursal.Colonia.toLowerCase();

        if (nombre.includes(buscar) || numero.includes(buscar) || colonia.includes(buscar)) {
            let registro =
                `<tr onclick="seleccionarRenglon(${sucursales.indexOf(sucursal)})">` +
                `<td>${sucursal.Nombre}</td>` +
                `<td>${sucursal.Url}</td>` +
                `<td>${sucursal.Horario}</td>` +
                `<td>${sucursal.Colonia}</td>` +
                `<td>${sucursal.Calle}</td>` +
                `<td>${sucursal.Numero}</td>` +
                `</tr>`;
            cuerpo += registro;
        }
    });

    document.getElementById("tabla").innerHTML = cuerpo;
}
