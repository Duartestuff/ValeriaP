//Crea una variable global donde se almacenara el indice del registro que se va a actualizar para su uso en actualizarDatos()
let indexGlobal;

document.onload = mostrarDatos();//Aunque se recargue la pagina se siga ejecutando la funcion

// Se recomienda poner los eventos al inicio del archivo
//botones con funciones anonimas

//Evento para guardar los datos del formulario al actualizar
document.getElementById('actualizar').addEventListener('click', function () {
    //Obtener los datos del formulario
    let id = document.getElementById('id').value;
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let correo = document.getElementById('correo').value;
    let fecha = document.getElementById('año').value;
//Obtener los datos del localStorage
    let listaDatos = JSON.parse(localStorage.getItem('Usuario')) || [];

 //Actualizar el dato en la posición indexGlobal
    listaDatos[indexGlobal] = {
        "Identificacion": id,
        "Nombre": nombre,
        "Edad": edad,
        "CorreoElectronico": correo,
        "FechadeNacimiento": fecha
    }
//Actualizar el Local Storage y recargar la tabla
    localStorage.setItem('Usuario', JSON.stringify(listaDatos));
//Mostrar los datos en la tabla
    mostrarDatos();
//Limpiar los campos del formulario
    document.getElementById('id').value = "";
    document.getElementById('nombre').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('correo').value = "";
    document.getElementById('año').value = "";
//Cambiar el boton actualizar por el boton guardar
    document.getElementById('actualizar').style.display = 'none';
    document.getElementById('guardar').style.display = 'block';
});

//Evento para guardar los buscra datos con el id
document.getElementById('Buscar').addEventListener('click', function () {

    let Identificacion = document.getElementById('IdBuscar').value;
    //Obtener los datos del localStorage
    let listaDatos = JSON.parse(localStorage.getItem('Usuario')) || [];

    //Buscar el el record por el id
    let resultadoIndex = listaDatos.findIndex(datos => datos.Identificacion === Identificacion);

    console.log(listaDatos[resultadoIndex]);

    //Llamar tabla
    let tabla = document.querySelector('#informacion tbody');
    //Limpiar la tabla
    tabla.innerHTML = '';

    //Mostrar los datos en la tabla sin mostrar el resto de datos buscando si el usuario existe y dando una alerta si no existe
    if (listaDatos[resultadoIndex] != undefined) {
       //Mostrar los datos en la tabla
        tabla.innerHTML += 
        //+=: Esto agrega contenido al valor existente de la variable html.
        `
            <tr>
                <td>${listaDatos[resultadoIndex].Identificacion}</td>
                <td>${listaDatos[resultadoIndex].Nombre}</td>
                <td>${listaDatos[resultadoIndex].Edad}</td>
                <td>${listaDatos[resultadoIndex].CorreoElectronico}</td>
                <td>${listaDatos[resultadoIndex].FechadeNacimiento}</td>
                <td><button class='btn btn-warning' onclick='llamarDatos(${resultadoIndex})'>Actualizar</button></td>
                <td><button class='btn btn-danger' onclick='eliminarDatos(${resultadoIndex})'>Eliminar</button></td>
            </tr>
        `;
    }else{
        //Mostrar una alerta si el usuario no existe
        alert("El usuario no existe");
        //Mostrar todos los datos en la tabla porque no dio resultados la busqueda
        mostrarDatos();
    }
    
});

document.getElementById('limpiar').addEventListener('click', function () {
    localStorage.clear();
    mostrarDatos();
});

//1.funcion que valide que los inputs esten digitados.
function validarFormulario() {
    //Paso 1.A:Traer en variables cada input del formulario
    //se usan los id de cada input para traerlos a JS
    let id = document.getElementById('id').value;
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let correo = document.getElementById('correo').value;
    let fecha = document.getElementById('año').value;

    //Paso 1.B: Validar si hay algun campo vacio del formulario
    //Si hay algun campo vacio, la funcion retornara false, si todos los campos estan llenos, la funcion retornara true
    if (id == "" || nombre == "" || edad == "" || correo == "" || fecha == "") {
        alert("Todos los datos son requeridos para guardar");
        return false;
    }
    return true;
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//2.funcion que guarde los datos del formulario en el LocalStorage
function GuardarDatos() {
    //Crear la funcion que va a guardar los datos del formulario en el LocalStorage
    //Paso 2.A:Traer en variables cada input del formulario
    let id = document.getElementById('id').value;
    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let correo = document.getElementById('correo').value;
    let fecha = document.getElementById('año').value;

    //Paso 2.B: Verificar el estado de la funcion anterior 
    if (validarFormulario() == true) {
        /*Validamos el estado de la funcion validarFormulario(), si la funcion esta en true, quiere decir que todos los 
       campos estan llenos */

        /*Despues de validar, vamos a pasar a guardar los datos en el localStorage,recordemos que: Al ser una base de 
        datos no relacional, los registros se guardan en forma de  Clave-Valor, en este caso como queremos guardar varios 
        datos dentro de la misma clave, usaremos Array y funciones de Array, guardando siempre en la misma clave.*/

        let listaDatos;//Esta variable va a almacenar la informacion que esta en el localStorage

        /*Vamos a validar si no existe la clave Usuario en el almacenamiento local, si no existe, se inicializa la 
        variable listaDatos como un arreglo vacio*/
        if (localStorage.getItem('Usuario') == null) {
            listaDatos = [];
        }
        else {
            /*Si 'Usuario' ya existe en el almacenamiento local, se obtiene su valor y se convierte en un objeto JavaScript 
        utilizando JSON.parse()*/
            listaDatos = JSON.parse(localStorage.getItem('Usuario'));
            /*JSON.parse() convierte un objeto JSON en un objeto JavaScript*/
        }
        //Despues de validar, vamos a pasar a guardar los datos en el localStorage
        //Crear la forma de enviar los datos del formulario en un arreglo y despues los enviamos a localStorage
        listaDatos.push( //push() agrega uno o mas elementos al final de un arreglo y devuelve la nueva longitud del arreglo
            {
                "Identificacion": id,
                "Nombre": nombre,
                "Edad": edad,
                "CorreoElectronico": correo,
                "FechadeNacimiento": fecha
            }
        )
        //Despues de guardar los datos en el arreglo, vamos a enviarlos al localStorage
        localStorage.setItem('Usuario', JSON.stringify(listaDatos));
        //JSON.stringify() convierte un objeto JavaScript en un objeto JSON

        //Despues de guardar los datos en el localStorage, vamos a mostrarlos en una tabla
        mostrarDatos();//Ejecutamos la funcion mostrarDatos() cuando se de click en el boton guardar

        document.getElementById('id').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('edad').value = "";
        document.getElementById('correo').value = "";
        document.getElementById('año').value = "";
    }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//3.funcion que imprime los datos guardados en una tabla 
function mostrarDatos() {   //Obtener los datos del localStorage
    let listaDatos;
    if (localStorage.getItem('Usuario') == null) {
        listaDatos = [];
    }
    else {
        listaDatos = JSON.parse(localStorage.getItem('Usuario'));//JSON.parse() convierte un objeto JSON en un objeto JavaScript
    }
    /*Despues de convertir los datos almacenados en el localStorage como un objeto de JavaScrip, ya los podemos 
    manipular, en esta funcion necesitamos que cada registro se muestre en una fila de la tabla que dejamos en HTML, 
    para eso usaremos un foreach(es un ciclo que recorre arreglos) para imprimir.*/
    let html = "";
    listaDatos.forEach(function (indices, valor) {
        html += "<tr>";//<tr> es una etiqueta de HTML que sirve para crear una fila en una tabla 
        // html += ...: Esto agrega contenido al valor existente de la variable html.
        //console.log(indices.Identificacion);  
        html += "<td>" + indices.Identificacion + "</td>";
        /*"<td>" + indices.Identificacion + "</td>": Aquí, estás concatenando la cadena "<td>", el valor de indices.
        Identificacion y "</td>" para formar una celda de tabla completa.*/
        html += "<td>" + indices.Nombre + "</td>";
        html += "<td>" + indices.Edad + "</td>";
        html += "<td>" + indices.CorreoElectronico + "</td>";
        html += "<td>" + indices.FechadeNacimiento + "</td>";
        // Agregar el botón
        html += "<td><button class='btn btn-warning' onclick='llamarDatos(" + valor + ")'>Actualizar</button></td>";
        /*utiliza el valor onclick para llamar a una función GuardarDatos pasando el índice como argumento.*/
        html += "<td><button class='btn btn-danger' onclick='eliminarDatos(" + valor + ")'>Eliminar</button></td>";
        html += "</tr>";//"</tr>": Esto cierra la etiqueta de fila de tabla que abriste anteriormente.
    })
    //console.log(html);

    //Mostrar esos datos en HTML
    document.querySelector('#informacion tbody').innerHTML = html;
    //document.querySelector es una forma de llamar a una etiqueta de HTML por medio de cualquier selector: si es un id usamos #, si es una clase usamos .        
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//4.funcion que elimina los datos del localStorage
function eliminarDatos(index) {
    // Obtener los datos del localStorage
    let listaDatos = JSON.parse(localStorage.getItem('Usuario')) || [];

    // Eliminar el elemento en la posición index
    listaDatos.splice(index, 1);

    // Actualizar el Local Storage y recargar la tabla
    localStorage.setItem('Usuario', JSON.stringify(listaDatos));
    mostrarDatos();
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//5.funcion que llame los datos del localStorage para actualizarlos
function llamarDatos(index) {

    document.getElementById('actualizar').style.display = 'block';
    document.getElementById('guardar').style.display = 'none';

    indexGlobal = index;

    console.log(indexGlobal);

    // Obtener los datos del localStorage
    let listaDatos = JSON.parse(localStorage.getItem('Usuario')) || [];

    // Obtener el elemento a editar
    let datos = listaDatos[index];

    // Mostrar los datos en el formulario
    document.getElementById('id').value = datos.Identificacion;
    document.getElementById('nombre').value = datos.Nombre;
    document.getElementById('edad').value = datos.Edad;
    document.getElementById('correo').value = datos.CorreoElectronico;
    document.getElementById('año').value = datos.FechadeNacimiento;

    mostrarDatos();
    
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*

//5.Crear una funcion que limpie los datos del localStorage
function limpiarDatos() {
    localStorage.clear();
    mostrarDatos();
}
*/

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//6.Crear una funcion que busque los datos del localStorage




