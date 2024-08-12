function  login() {
    let username = document.getElementById("usuario").value;
    let password = document.getElementById("contrasena").value;

    fetch("modulos/moduloUsuario/usuario.json")
            .then(response => response.json())
            .then(data => {

                const users = data;

                const user = users.find(user => user.usuario === username && user.contraseña === password && user.estatus === 1);

                if (user) {
                    Swal.fire({
                        title: "Inicio de sesión exitoso",
                        text: "¿Deseas continuar?",
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: "Iniciar Sesión",
                        cancelButtonText: "Cancelar",
                        reverseButtons: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "VistaAdmin.html";
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Usuario y/o contraseña incorrecta \n\
         Inténtalo de nuevo."
                    });

                }
            })
            .catch(error => {
                console.error("Error al leer el archivo JSON", error);
            });
}