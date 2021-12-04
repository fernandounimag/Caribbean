// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOjKc5cZtMXPqoIE3LMFJjGpqdOHZEINY",
  authDomain: "caribbeanfoodweb.firebaseapp.com",
  projectId: "caribbeanfoodweb",
  storageBucket: "caribbeanfoodweb.appspot.com",
  messagingSenderId: "986873180157",
  appId: "1:986873180157:web:20fd4941a89f374b72f394"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firestrore
import {
  getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where, getDocs
}
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
const db = getFirestore();



// variables usuario
let nombre_usuario = [];
let correo_usuario = [];
let boton_eliminar = '<a href="#" class="btn-sm bg-danger fas fa-user-times"></a>';
// cargar Usuarios
const q = query(collection(db, "users"), where("correo", "!=", ''));
const querySnapshot = await getDocs(q);
var cont = -1;
querySnapshot.forEach((doc) => {
  cont += 1;
  nombre_usuario[cont] = doc.data().nombre;
  correo_usuario[cont] = doc.data().correo;
});
// botones dropdown
let inicioBtn = document.getElementById('boton_inicio_admin');
let usuariosBtn = document.getElementById('boton_usuarios_admin');
let configuracionBtn = document.getElementById('boton_configuracion_admin');
let salirBtn = document.getElementById('boton_salir_admin');
// panels
let inicioPane = document.getElementById('panel_inicio_admin');
let usuariosPane = document.getElementById('panel_usuarios_admin');
let body_tabla_usuarios = document.getElementById('body_tabla_usuarios');
// eventos
inicioBtn.addEventListener('click', event =>{inicioPane.hidden = false;usuariosPane.hidden = true;});
usuariosBtn.addEventListener('click', event =>{inicioPane.hidden = true;usuariosPane.hidden = false;});
salirBtn.addEventListener('click', event => {sessionStorage.removeItem("usuario");location.replace('index.html');})
function tabla_usuarios(){
    for (var i = 0; i < nombre_usuario.length; i++) {
        // Crea las hileras de la tabla
        var row = document.createElement("tr"); // se crea  una nueva fila
    
        for (var j = 0; j < 4; j++) { // crea n columnas
          // Crea un elemento <td> y un nodo de texto, haz que el nodo de
          // texto sea el contenido de <td>, ubica el elemento <td> al final
          // de la hilera de la tabla
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(i+1);
          var textoCelda1 = document.createTextNode(nombre_usuario[i]);
          var textoCelda2 = document.createTextNode(correo_usuario[i]);
          var boton_eliminar_usuario = document.createElement("a");
          boton_eliminar_usuario.setAttribute('href','#');
          boton_eliminar_usuario.setAttribute('class','boton_eliminar_usuario_class btn bg-danger fas fa-user-times');
          if (j == 0){
            celda.appendChild(textoCelda);
            row.appendChild(celda);
          }
          if (j == 1){
            celda.appendChild(textoCelda1);
            row.appendChild(celda);
          }
          if (j == 2){
            celda.appendChild(textoCelda2);
            row.appendChild(celda);
          }
          if (j == 3){
            var cont3 = i + 1;
            boton_eliminar_usuario.setAttribute('id','boton_eliminar_usuario_'+ cont3)
            celda.appendChild(boton_eliminar_usuario);
            row.appendChild(celda);
          }
          let cont = i+1
          row.id = 'fila_'+cont
        }
    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        body_tabla_usuarios.appendChild(row);
      }
}
tabla_usuarios();
document.getElementById('boton_actualizar_lista').addEventListener('click', event => {
  location.reload();
});
document.querySelectorAll('.boton_eliminar_usuario_class').forEach(item => {
    item.addEventListener('click', event => {
      Swal.fire({
        title: 'Eliminar usuario?',
        text: "El usuario "+nombre_usuario[item.id.substr(23,24)-1].toUpperCase()+" será eliminado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          DeleteUser(correo_usuario[item.id.substr(23,24)-1]);
        }
      })
    })
});
// variables usuario activo
let adminID = 'admin@correo.com';
//funciones firebase
async function cargarNombre(){
  var ref = doc(db, "admins", adminID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()){
    document.getElementById('label_nombre_admin').innerHTML = docSnap.data().nombre;
  } else {
      Swal.fire('Error!','Usuario no encontrado','error');
  }
}
cargarNombre();
async function UpdateFieldsDocument(id){
  var ref = doc(db, "users", id);

  await updateDoc(
      ref, {
          //item: field
      }
  )
  .then(()=>{
      Swal.fire('Éxito!','Datos actualizados','success');
  })
  .catch((error)=>{
      Swal.fire('Error! ', error ,'error');
  }); 
}
async function UpdatePassword(id){
  var ref = doc(db, "users", id);
  await updateDoc(
      ref, {
          //password_item_name: password_field
      }
  )
  .then(()=>{
    Swal.fire('Éxito!','Contraseña actualizada','success');
  })
  .catch((error)=>{
    Swal.fire('Error!', error ,'error');
  }); 
}
async function DeleteUser(id){
  var ref = doc(db, "users", id);
  const docSnap = await getDoc(ref);

      if (!docSnap.exists()){
        Swal.fire('Error!','Usuario no existe','error');
          return;
      }await deleteDoc(ref)
      .then(()=>{
        Swal.fire('Éxito!','Usuario eliminado','success');
      })
      .catch((error)=>{
        Swal.fire('Error!',error,'error');
      }); 
      
}
async function Registro(correo, nombre, password){ // email
  var ref = doc(db, "users", correo);

  const docRef = await setDoc(
      ref, {
        correo: correo,
        nombre: nombre,
        password: password
      }
  )
  .then(()=>{
    Swal.fire('Éxito!','Usuario creado exitosamente','success');
  })
  .catch((error)=>{
      Swal.fire('Error!', error, 'error');
  });

}
async function GetDocument(){
  var ref = doc(db, "admins", adminID);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()){
    document.getElementById('label_nombre_admin').innerHTML = docSnap.data().nombre;
  } else {
      Swal.fire('Error!','Usuario no encontrado','error');
  }
}