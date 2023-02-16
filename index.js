const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const incorrecto = document.querySelector("incorrecto");
const correcto = document.querySelector("correcto");

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    clave: /^.{8}$/,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    confirmar: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
};

const campos = {
    nombre: false,
    email: false,
    clave: false,
    confirmar: false
};

const validarFormulario = (e) => {
    if (!e.target.value) {
        document.getElementById(e.target.name).classList.add("formulario_grupo-incorrecto");
        document.getElementById(e.target.name).classList.remove("formulario_grupo-correcto");
        document.getElementById('error_' + e.target.name).innerText = "Rellene este campo";
        document.getElementById('validar_' + e.target.name).classList.add("formulario_validacion-estado_error");
    } else {
        switch (e.target.name) {
            case "nombre":

                validarCampo(expresiones.nombre, e.target, "nombre");
                break;

            case "email":
                validarCampo(expresiones.email, e.target, "email");
                break;

            case "clave":
                validarCampo(expresiones.clave, e.target, "clave");
                break;

            case "confirmar":
                validarCampo(expresiones.clave, e.target, "confirmar");
                validarClave();
                break;
        }
    }
};

const validarCampo = (expresiones, input, campo) => {

    if (expresiones.test(input.value)) {
        document.getElementById(campo).classList.remove("formulario_grupo-incorrecto");
        document.getElementById(campo).classList.add("formulario_grupo-correcto");
        document.getElementById('validar_' + campo).classList.remove("formulario_validacion-estado_error");
        document.getElementById('validar_' + campo).classList.add("formulario_validacion-estado_ok");
        document.getElementById('error_' + campo).innerText = "";
        campos[campo] = true;
    } else {
        document.getElementById(campo).classList.add("formulario_grupo-incorrecto");
        document.getElementById(campo).classList.remove("formulario_grupo-correcto");
        document.getElementById('validar_' + campo).classList.remove("formulario_validacion-estado_ok");
        document.getElementById('validar_' + campo).classList.add("formulario_validacion-estado_error");
        campos[campo] = false;
        switch (campo) {
            case "nombre":

                document.getElementById('error_' + campo).innerText = "";
                break;

            case "email":
                document.getElementById('error_' + campo).innerText = "Email inválido";
                break;

            case "clave":
                document.getElementById('error_' + campo).innerText = "No debe tener más de 8 caracteres";
                break;

            case "confirmar":
                validarClave();
                break;
        }

    }
};

const validarClave = () => {
    let inputClave1 = document.getElementById("clave");
    let inputClave2 = document.getElementById("confirmar");

    if (inputClave1.value !== inputClave2.value) {
        document.getElementById('error_confirmar').innerText = "Las contraseñas no coinciden";
        campos["confirmar"] = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

function Validar() {
    if (campos.nombre && campos.email && campos.clave && campos.confirmar) {
        alert("Formulario enviado con éxito");
    }
}
