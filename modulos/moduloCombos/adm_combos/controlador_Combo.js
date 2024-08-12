let combos = [];
let comboSeleccionado;

fetch("combos.json")
    .then(response => response.json())
    .then(jsondata => {
        combos = jsondata;
        cargarTablaCombos(1);
    });

function revisarEstatus() {
    let checkboxProd = document.getElementById("switch-label");
    if (checkboxProd.checked) {
        cargarTablaCombos(0);
    } else {
        cargarTablaCombos(1);
    }
}

function cargarTablaCombos(estatusExterno) {
    let datosTabla = document.getElementById("tabla");
    let renglon = "";
    combos.forEach(combo => {
        let estatus = combo.combo.estatus;
        let estatusN;
        
        switch (estatus) {
            case 0:
                estatusN = "Inactivo";
                break;
            case 1:
                estatusN = "Activo";
                break;
            default:
                estatusN = "Desconocido";
                break;
        }
        
        if ((estatusExterno === 1 && estatus === 1) || (estatusExterno === 0 && estatus === 0)) {
            let platillos = combo.combo.checkboxes.filter(cb => cb.type === 'platillo').map(cb => cb.value).join(', ');
            let bebidas = combo.combo.checkboxes.filter(cb => cb.type === 'bebida').map(cb => cb.value).join(', ');
            
            renglon += "<tr onclick='seleccionarRenglon(" + combos.indexOf(combo) + ")'>" +
                        "<td>" + combo.combo.nombre_combo + "</td>" +
                        "<td>" + platillos + "</td>" +
                        "<td>" + bebidas + "</td>" +
                        "<td><img src='" + combo.combo.foto + "' alt='Foto' width='50'></td>" +
                        "<td>" + combo.combo.descripcion + "</td>" +
                        "<td>" + combo.combo.precio + "</td>" +
                        "</tr>";
        }
    });

    datosTabla.innerHTML = renglon;
}

function seleccionarRenglon(indice) {
    let combo = combos[indice].combo;
    document.getElementById("nombreCombo").value = combo.nombre_combo;
    document.getElementById("descripcionCombo").value = combo.descripcion;
    document.getElementById("precioCombo").value = combo.precio;
    restaurarCheckboxes(combo.checkboxes || []);
    comboSeleccionado = indice;
}

function agregarCombo() {
    let nombre_c = document.getElementById("nombreCombo").value;
    let foto = "---";
    let descripcion_c = document.getElementById("descripcionCombo").value;
    let precio_c = document.getElementById("precioCombo").value;
    let estatus_c = "1";
    let checkboxes = obtenerCheckboxesSeleccionados();

    // Verificar que al menos un platillo y una bebida estén seleccionados
    let platillosSeleccionados = checkboxes.filter(cb => cb.type === 'platillo').length;
    let bebidasSeleccionadas = checkboxes.filter(cb => cb.type === 'bebida').length;

    if (platillosSeleccionados === 0 || bebidasSeleccionadas === 0) {
        alert("Debes seleccionar al menos un platillo y una bebida.");
        return;
    }
        // Verificar si todos los campos están llenos
        if (!nombre_c || !descripcion_c || !precio_c) {
            alert("Por favor, complete todos los campos.");
            return;
        }

    let nuevaCombo = {
        combo: {
            id_combo: (combos.length + 1),
            nombre_combo: nombre_c,
            descripcion: descripcion_c,
            foto: foto,
            precio: parseFloat(precio_c),
            estatus: parseInt(estatus_c),
            checkboxes: checkboxes
        }
    };

    combos.push(nuevaCombo);
    cargarTablaCombos(1);
    limpiar();
}

function deleteCombo() {
    if (comboSeleccionado !== undefined) {
        combos[comboSeleccionado].combo.estatus = 0; 
        cargarTablaCombos(1); 
    } else {
        alert("No hay ningún combo seleccionado.");
    }
}

function modificarCombo() {
    if (comboSeleccionado !== undefined) {
        let nombre_c = document.getElementById("nombreCombo").value;
        let foto = "---";
        let descripcion_c = document.getElementById("descripcionCombo").value;
        let precio_c = document.getElementById("precioCombo").value;
        let estatus_c = "1";
        let checkboxes = obtenerCheckboxesSeleccionados();

        let platillosSeleccionados = checkboxes.filter(cb => cb.type === 'platillo').length;
        let bebidasSeleccionadas = checkboxes.filter(cb => cb.type === 'bebida').length;

        if (platillosSeleccionados === 0 || bebidasSeleccionadas === 0) {
            alert("Debes seleccionar al menos un platillo y una bebida.");
            return;
        }
        
        if (!nombre_c || !descripcion_c || !precio_c) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        combos[comboSeleccionado].combo = {
            id_combo: combos[comboSeleccionado].combo.id_combo,
            nombre_combo: nombre_c,
            descripcion: descripcion_c,
            foto: foto,
            precio: parseFloat(precio_c),
            estatus: parseInt(estatus_c),
            checkboxes: checkboxes
        };

        let checkboxProd = document.getElementById("switch-label");
        if (checkboxProd.checked) {
            cargarTablaCombos(0);
        } else {
            cargarTablaCombos(1);
        }
    } else {
        alert("No hay ningún combo seleccionado.");
    }
}

function limpiar() {
    document.getElementById("nombreCombo").value = "";
    document.getElementById("descripcionCombo").value = "";
    document.getElementById("precioCombo").value = "";
    document.getElementById("estatus").value = "";
    limpiarCheckboxes();
}

function buscar() {
    let buscar = document.getElementById("campoBusqueda").value.toLowerCase();
    let cuerpo = "";
    let tieneActivo = false;
    let tieneInactivo = false;

    combos.forEach(function (combo) {
        let nombre = combo.combo.nombre_combo.toLowerCase(); 
        let precio = combo.combo.precio.toString().toLowerCase(); 

        if (nombre.includes(buscar) || precio.includes(buscar)) {
            let estatusN = combo.combo.estatus === 1 ? "Activo" : "Inactivo";
            if (combo.combo.estatus === 1) {
                tieneActivo = true;
            } else {
                tieneInactivo = true;
            }

            let platillos = combo.combo.checkboxes.filter(cb => cb.type === 'platillo').map(cb => cb.value).join(', ');
            let bebidas = combo.combo.checkboxes.filter(cb => cb.type === 'bebida').map(cb => cb.value).join(', ');

            let registro =
                '<tr onclick="seleccionarRenglon(' + combos.indexOf(combo) + ')">' +
                '<td>' + combo.combo.nombre_combo + '</td>' +
                '<td>' + platillos + '</td>' +
                '<td>' + bebidas + '</td>' +
                '<td><img src="' + combo.combo.foto + '" alt="Foto" width="50"></td>' +
                '<td>' + combo.combo.descripcion + '</td>' +
                '<td>' + combo.combo.precio + '</td>' +
                '</tr>';
            cuerpo += registro;
        }
    });

    let checkboxProd = document.getElementById("switch-label");
    if (tieneActivo) {
        checkboxProd.checked = false; 
    } else if (tieneInactivo) {
        checkboxProd.checked = true; 
    }

    document.getElementById("tabla").innerHTML = cuerpo;
}

function obtenerCheckboxesSeleccionados() {
    let checkboxesSeleccionados = [];
    // Obtener checkboxes seleccionados de productos
    document.querySelectorAll('input[name="platillo"]:checked').forEach(checkbox => {
        checkboxesSeleccionados.push({type: 'platillo', value: checkbox.value});
    });
    // Obtener checkboxes seleccionados de bebidas
    document.querySelectorAll('input[name="bebida"]:checked').forEach(checkbox => {
        checkboxesSeleccionados.push({type: 'bebida', value: checkbox.value});
    });
    return checkboxesSeleccionados;
}

function restaurarCheckboxes(checkboxes) {
    // Restaurar checkboxes de productos
    document.querySelectorAll('input[name="platillo"]').forEach(checkbox => {
        checkbox.checked = checkboxes.some(c => c.type === 'platillo' && c.value === checkbox.value);
    });
    // Restaurar checkboxes de bebidas
    document.querySelectorAll('input[name="bebida"]').forEach(checkbox => {
        checkbox.checked = checkboxes.some(c => c.type === 'bebida' && c.value === checkbox.value);
    });
}

function limpiarCheckboxes() {
    // Limpiar checkboxes de productos
    document.querySelectorAll('input[name="platillo"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    // Limpiar checkboxes de bebidas
    document.querySelectorAll('input[name="bebida"]').forEach(checkbox => {
        checkbox.checked = false;
    });
}