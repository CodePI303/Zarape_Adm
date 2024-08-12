let bebidas = [];
let bebidaSeleccionada;

fetch("bebidas.json")
    .then(response => response.json())
    .then(jsondata => {
        bebidas = jsondata;
        cargarTablaBebidas(1); 
    });

function revisarEstatus() {
    let checkboxProd = document.getElementById("switch-label");
    let estatusExterno = checkboxProd.checked ? 0 : 1; 
    cargarTablaBebidas(estatusExterno);
    document.getElementById("txtEstatus1").textContent = checkboxProd.checked ? "Inactivo" : "Activo";
}

function cargarTablaBebidas(estatusExterno) {
    let datosTabla = document.getElementById("tabla");
    let renglon = "";
    bebidas.forEach(bebida => {
        let estatus = bebida.bebida.estatus;
        let estatusN = estatus === "1" ? "Activo" : "Inactivo";

        if ((estatusExterno === 1 && estatus === "1") || (estatusExterno === 0 && estatus === "0")) {
            renglon += `<tr onclick='seleccionarRenglon(${bebidas.indexOf(bebida)})'>` +
                        `<td>${bebida.bebida.nombre_producto}</td>` +
                        `<td><img src='${bebida.bebida.foto}' alt='Foto' width='50'></td>` +
                        `<td style='text-align: justify'>${bebida.bebida.descripcion}</td>` +
                        `<td>${bebida.bebida.precio}</td>` +
                        `<td>${bebida.bebida.categoriafk.descripcion_categoria}</td>` +
                        `</tr>`;
        }
    });
    datosTabla.innerHTML = renglon;
}

function seleccionarRenglon(indice) {
    document.getElementById("nombreProducto").value = bebidas[indice].bebida.nombre_producto;
    document.getElementById("descripcionProducto").value = bebidas[indice].bebida.descripcion;
    document.getElementById("precioProducto").value = bebidas[indice].bebida.precio;
    document.getElementById("categoriaProducto").value = bebidas[indice].bebida.categoriafk.descripcion_categoria;
    bebidaSeleccionada = indice;
}

function agregarBebida() {
    let nombre_P = document.getElementById("nombreProducto").value.trim();
    let foto = "---"; // Asegúrate de obtener el valor del input correspondiente si se desea cambiar esto.
    let descripcion_p = document.getElementById("descripcionProducto").value.trim();
    let precio_p = document.getElementById("precioProducto").value.trim();
    let categoria_P = document.getElementById("categoriaProducto").value.trim();
    let estatus_p = "1";

    // Verificar si todos los campos están llenos
    if (!nombre_P || !descripcion_p || !precio_p || !categoria_P) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let nuevaCategoria = {
        descripcion_categoria: categoria_P
    };

    let nuevaBebida = {
        bebida: {
            id_producto: (bebidas.length + 1).toString(), // Genera un id único para la nueva bebida
            nombre_producto: nombre_P,
            descripcion: descripcion_p,
            foto: foto,
            precio: precio_p,
            categoriafk: nuevaCategoria,
            estatus: estatus_p
        }
    };

    bebidas.push(nuevaBebida);
    cargarTablaBebidas(1);
    limpiar(); // Opcional: limpiar el formulario después de agregar
}

function deleteBebida() {
    if (bebidaSeleccionada !== undefined) {
        bebidas[bebidaSeleccionada].bebida.estatus = "0";
        cargarTablaBebidas(1);
        limpiar();
    } else {
        alert("No hay ninguna bebida seleccionada.");
    }
}

function modificarBebida() {
    if (bebidaSeleccionada !== undefined) {
        let nombre_P = document.getElementById("nombreProducto").value.trim();
        let foto = "---"; // Asegúrate de obtener el valor del input correspondiente si se desea cambiar esto.
        let descripcion_p = document.getElementById("descripcionProducto").value.trim();
        let precio_p = document.getElementById("precioProducto").value.trim();
        let categoria_P = document.getElementById("categoriaProducto").value.trim();
        let estatus_p = "1";

        // Verificar si todos los campos están llenos
        if (!nombre_P || !descripcion_p || !precio_p || !categoria_P) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        let bebida = {
            nombre_producto: nombre_P,
            descripcion: descripcion_p,
            precio: precio_p,
            foto: foto,
            categoriafk: {
                descripcion_categoria: categoria_P
            },
            estatus: estatus_p
        };

        bebidas[bebidaSeleccionada].bebida = bebida;
        revisarEstatus(); // Actualiza la tabla según el estado del checkbox
    } else {
        alert("No hay ninguna bebida seleccionada.");
    }
}

function limpiar() {
    document.getElementById("nombreProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("categoriaProducto").value = "";
}

function buscar() {
    let buscar = document.getElementById("campoBusqueda").value.toLowerCase();
    let cuerpo = "";
    let tieneActivo = false;
    let tieneInactivo = false;

    bebidas.forEach(function (bebida) {
        let nombre = bebida.bebida.nombre_producto.toLowerCase(); 
        let precio = bebida.bebida.precio.toLowerCase();
        let categoria = bebida.bebida.categoriafk.descripcion_categoria.toLowerCase();

        if (nombre.includes(buscar) || precio.includes(buscar) || categoria.includes(buscar)) {
            let estatusN = bebida.bebida.estatus === "1" ? "Activo" : "Inactivo";
            if (bebida.bebida.estatus === "1") {
                tieneActivo = true;
            } else {
                tieneInactivo = true;
            }

            let registro =
                `<tr onclick="seleccionarRenglon(${bebidas.indexOf(bebida)})">` +
                `<td>${bebida.bebida.nombre_producto}</td>` +
                `<td>${bebida.bebida.foto}</td>` +
                `<td style="text-align: justify">${bebida.bebida.descripcion}</td>` +
                `<td>${bebida.bebida.precio}</td>` +
                `<td>${bebida.bebida.categoriafk.descripcion_categoria}</td>` +
                `</tr>`;
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