let usuario = [];
let usuarios = [];
let usuarioSeleccionado;

function loadTableUser(estatus) {
    const date = new Date();
    const añototal = date.getFullYear();
    const mesN = date.getMonth() + 1;
    const diaN = date.getDay() + 1;
    let cuerpo = "";
    usuarios.forEach(function (usuario) {
        if (estatus === 1 && usuario.estatus === 1) {
            let registro =
                    '<tr onclick="seleccionarUsuario(' + usuarios.indexOf(usuario) + ')">' +
                    '<td>' + usuario.persona.nombre + '</td>' +
                    '<td>' + usuario.persona.ape_paterno + '</td>' +
                    '<td>' + usuario.persona.ape_materno + '</td>' +
                    '<td>' + usuario.persona.telefono + '</td>' +
                    '<td>' + usuario.sucursal.nombre_sucursal + '</td>' +
                    '<td style="text-align: justify">' + usuario.usuario + '</td>' +
                    '<td>' + "************" + '</td>';
            //'<td>' + crearContraseña(usuario.persona.nombre,usuario.persona.ape_paterno,usuario.persona.ape_materno,diaN+"",mesN+"",añototal+"") + '</td>';
            cuerpo += registro;
        } else if (estatus === 0 && usuario.estatus === 0) {
            let registro =
                    '<tr onclick="seleccionarUsuario(' + usuarios.indexOf(usuario) + ')">' +
                    '<td>' + usuario.persona.nombre + '</td>' +
                    '<td>' + usuario.persona.ape_paterno + '</td>' +
                    '<td>' + usuario.persona.ape_materno + '</td>' +
                    '<td>' + usuario.persona.telefono + '</td>' +
                    '<td>' + usuario.sucursal.nombre_sucursal + '</td>' +
                    '<td style="text-align: justify">' + usuario.usuario + '</td>' +
                    '<td>' + "************" + '</td>';
            cuerpo += registro;
        }

    });
    document.getElementById("tblUsuarios").innerHTML = cuerpo;
}


function seleccionarUsuario(indice) {
    document.getElementById("nombreUsuario").value = usuarios[indice].persona.nombre;
    document.getElementById("apellidoPaterno").value = usuarios[indice].persona.ape_paterno;
    document.getElementById("apellidoMaterno").value = usuarios[indice].persona.ape_materno;
    document.getElementById("telefono").value = usuarios[indice].persona.telefono;
    document.getElementById("txtSucursal").value = usuarios[indice].sucursal.nombre_sucursal;
    usuarioSeleccionado = indice;
}



function addUsers() {
    let nuevoUsuario = {};
    let nuevaSucursal = {};
    let nombre = document.getElementById("nombreUsuario").value;
    let apellidoPaterno = document.getElementById("apellidoPaterno").value;
    let apellidoMaterno = document.getElementById("apellidoMaterno").value;
    let telefono = document.getElementById("telefono").value;
    let sucursal = document.getElementById("txtSucursal").value;
    if (nombre === "" && apellidoMaterno === "" && apellidoPaterno === "" && telefono === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Todos los campos son abligatorios"

        });
    } else {
        nuevoUsuario.nombre = nombre;
        nuevoUsuario.ape_paterno = apellidoPaterno;
        nuevoUsuario.ape_materno = apellidoMaterno;
        nuevoUsuario.telefono = telefono;
        nuevaSucursal.nombre_sucursal = sucursal;

        let newUsuario = {
            usuario: "user_" + nombre,
            estatus: 1,
            sucursal: nuevaSucursal,
            persona: nuevoUsuario
        };

        usuarios.push(newUsuario);

        loadTableUser(1);
    }
    clean();
}

function crearContraseña(nombre, ap, am, dia, mes, año) {
    let contra;
    let apn = ap;
    let tamanio = apn.length;
    let amn = am;
    let tamanioM = amn.length;
    contra = nombre.charAt(0).toUpperCase() + nombre.charAt(1).toLowerCase() +
            ap.charAt(0).toLowerCase() + am.charAt(0).toLowerCase() +
            ap.charAt(tamanio - 1).toLowerCase() + am.charAt(tamanioM - 1).toLowerCase() +
            dia.charAt(0) + dia.charAt(1) +
            mes.charAt(0) + mes.charAt(1) +
            año.charAt(2) + año.charAt(3);
    //alert(contra);
    //console.log(contra);
    return contra;
}

//onload="crearContraseña('Jaqueline', 'Garcia', 'Gonzalez', '09', '08', '2024')"


function modificarUser() {
    let persona = {};
    let sucursal = {};
    let nombre = document.getElementById("nombreUsuario").value;
    let apellidoPaterno = document.getElementById("apellidoPaterno").value;
    let apellidoMaterno = document.getElementById("apellidoMaterno").value;
    let telefono = document.getElementById("telefono").value;
    let sucursalN = document.getElementById("txtSucursal").value;

    persona.nombre = nombre;
    persona.ape_paterno = apellidoPaterno;
    persona.ape_materno = apellidoMaterno;
    persona.telefono = telefono;
    sucursal.nombre_sucursal = sucursalN;
    persona.estatus = 1;

    usuarios[usuarioSeleccionado].persona = persona;
    usuarios[usuarioSeleccionado].sucursal = sucursal;
    loadTableUser(1);
}

function clean() {
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("apellidoPaterno").value = "";
    document.getElementById("apellidoMaterno").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("txtSucursal").value = "";

}

function deleteUsuario() {
    usuarios[usuarioSeleccionado].estatus = 0;
    loadTableUser(1);
}

function revisarEstatus() {
    let checkboxProd = document.getElementById("switch-label");
    let textI = document.getElementById("textI");
    let textA = document.getElementById("textA");
    if (checkboxProd.checked) {
        loadTableUser(0);
        textI.style.display = "block";

        textA.style.display = "none";
    } else {
        loadTableUser(1);
        textI.style.display = "none";
        textA.style.display = "block";
    }
}



function buscarUsuario() {
    let buscar = document.getElementById("campoBusqueda").value.toLowerCase();
    let cuerpo = "";

    usuarios.forEach(function (usuario) {

        let nombre = usuario.persona.nombre.toLowerCase();
        let apellidoP = usuario.persona.ape_paterno.toLowerCase();
        let apellidoM = usuario.persona.ape_materno.toLowerCase();


        if (nombre === buscar || apellidoP === buscar || apellidoM === buscar) {
            let registro =
                    '<tr onclick="seleccionarUsuario(' + usuarios.indexOf(usuario) + ')">' +
                    '<td>' + usuario.persona.nombre + '</td>' +
                    '<td>' + usuario.persona.ape_paterno + '</td>' +
                    '<td>' + usuario.persona.ape_materno + '</td>' +
                    '<td>' + usuario.persona.telefono + '</td>' +
                    '<td>' + usuario.sucursal.nombre_sucursal + '</td>' +
                    '<td style="text-align: justify">' + usuario.usuario + '</td>' +
                    '<td>' + "*****" + '</td>' +
                    '</tr>';
            cuerpo += registro;
        }
    });

    document.getElementById("tblUsuarios").innerHTML = cuerpo;
}



fetch("usuario.json")
        .then(
                response => {
                    return response.json();
                })
        .then(
                function (jsondata) {
                    usuarios = jsondata;
                    loadTableUser(1);
                }
        );