let alimentos = [];
let alimentoSeleccionado;

fetch("myjson_platillos.json")
    .then(response => response.json())
    .then(jsondata => {
        alimentos = jsondata;
        cargarTablaAlimentos(1); 
    });

function revisarEstatus() {
    let checkboxProd = document.getElementById("switch-label");
    let estatusExterno = checkboxProd.checked ? 0 : 1; 
    cargarTablaAlimentos(estatusExterno);
    document.getElementById("txtEstatus1").textContent = checkboxProd.checked ? "Inactivo" : "Activo";
}
function validarCampos() {
    let nombre = document.getElementById("nombreProducto").value.trim();    
    let descripcion = document.getElementById("descripcionProducto").value.trim();
    let precio = document.getElementById("precioProducto").value.trim();
    let categoria = document.getElementById("categoriaPlatillos").value.trim();
   
    if (nombre === "" || descripcion === "" || precio === "" || categoria === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Formulario incompleto. Todos los campos deben ser llenados."
        });
    } else {
        agregarAlimento();
    }
}
function cargarTablaAlimentos(estatusExterno) {
    let datosTabla = document.getElementById("tabla");
    let renglon = "";
    alimentos.forEach(food => {
        let estatus = food.alimento.estatus;
        let estatusN = estatus === "1" ? "Activo" : "Inactivo";

        if ((estatusExterno === 1 && estatus === "1") || (estatusExterno === 0 && estatus === "0")) {
            renglon += `<tr onclick='seleccionarRenglon(${alimentos.indexOf(food)})'>` +
                        `<td>${food.alimento.nombre_producto}</td>` +
                        //`<td>${food.alimento.foto}</td>` +
                        `<td><img src='" + food.alimento.foto + "' alt='Foto' width='50'></td>` +
                        `<td style='text-align: justify'>${food.alimento.descripcion}</td>` +
                        `<td>${food.alimento.precio}</td>` +
                        `<td>${food.alimento.categoriafk.descripcion_categoria}</td>` +
                        //`<td>${estatusN}</td>` +
                        `</tr>`;
        }
    });
    datosTabla.innerHTML = renglon;
}

function seleccionarRenglon(indice) {
    document.getElementById("nombreProducto").value = alimentos[indice].alimento.nombre_producto;
    // document.getElementById("fotoProducto").value = alimentos[indice].alimento.foto;
    document.getElementById("descripcionProducto").value = alimentos[indice].alimento.descripcion;
    document.getElementById("precioProducto").value = alimentos[indice].alimento.precio;
    document.getElementById("categoriaPlatillos").value = alimentos[indice].alimento.categoriafk.descripcion_categoria;
    //document.getElementById("estatus").value = alimentos[indice].alimento.estatus;
    alimentoSeleccionado = indice;
}

function agregarAlimento() {
    let nuevoAlimento = {};
    let nuevaCategoria = {};

    let nombre_P = document.getElementById("nombreProducto").value;
    let foto = "---"; // Si deseas cambiar esto, asegúrate de obtener el valor del input correspondiente.
    let descripcion_p = document.getElementById("descripcionProducto").value;
    let precio_p = document.getElementById("precioProducto").value;
    let categoria_P = document.getElementById("categoriaPlatillos").value;
    let estatus_p ="1";

    nuevaCategoria.descripcion_categoria = categoria_P;

    nuevoAlimento.alimento = {
        id_producto: (alimentos.length + 1).toString(), // Genera un id único para el nuevo alimento
        nombre_producto: nombre_P,
        descripcion: descripcion_p,
        foto: foto,
        precio: precio_p,
        categoriafk: nuevaCategoria,
        estatus: estatus_p
    };

    alimentos.push(nuevoAlimento);
    cargarTablaAlimentos(1);
}

function deleteAlimentos() {
    if (alimentoSeleccionado !== undefined) {
        alimentos[alimentoSeleccionado].alimento.estatus = "0";
        cargarTablaAlimentos(1);
        limpiar();
    } else {
        alert("No hay ningún alimento seleccionado.");
    }
}

function modificarAlimento() {
    if (alimentoSeleccionado !== undefined) {
        let alimento = {};

        let nombre_P = document.getElementById("nombreProducto").value;
        let foto = "---"; 
        let descripcion_p = document.getElementById("descripcionProducto").value;
        let precio_p = document.getElementById("precioProducto").value;
        let categoria_P = document.getElementById("categoriaPlatillos").value;
        let estatus_p = "1";

        alimento.nombre_producto = nombre_P;
        alimento.descripcion = descripcion_p;
        alimento.precio = precio_p;
        alimento.foto = foto;
        alimento.categoriafk = {
            descripcion_categoria: categoria_P
        };
        alimento.estatus = estatus_p;

        alimentos[alimentoSeleccionado].alimento = alimento;

        revisarEstatus(); // Actualiza la tabla según el estado del checkbox
    } else {
        alert("No hay ningún alimento seleccionado.");
    }
}

function limpiar() {
    document.getElementById("nombreProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("categoriaPlatillos").value = "";
    //document.getElementById("estatus").value = "";
}

function buscar() {
    let buscar = document.getElementById("campoBusqueda").value.toLowerCase();
    let cuerpo = "";
    let tieneActivo = false;
    let tieneInactivo = false;

    alimentos.forEach(function (alimento) {
        let nombre = alimento.alimento.nombre_producto.toLowerCase(); 
        let precio = alimento.alimento.precio.toLowerCase();
        let categoria = alimento.alimento.categoriafk.descripcion_categoria.toLowerCase();

        if (nombre.includes(buscar) || precio.includes(buscar) || categoria.includes(buscar)) {
            let estatusN = alimento.alimento.estatus === "1" ? "Activo" : "Inactivo";
            if (alimento.alimento.estatus === "1") {
                tieneActivo = true;
            } else {
                tieneInactivo = true;
            }

            let registro =
                `<tr onclick="seleccionarRenglon(${alimentos.indexOf(alimento)})">` +
                `<td>${alimento.alimento.nombre_producto}</td>` +
                `<td>${alimento.alimento.foto}</td>` +
                `<td style="text-align: justify">${alimento.alimento.descripcion}</td>` +
                `<td>${alimento.alimento.precio}</td>` +
                `<td>${alimento.alimento.categoriafk.descripcion_categoria}</td>` +
                //`<td>${estatusN}</td>` +
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
