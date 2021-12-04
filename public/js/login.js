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
// variables
let input_correo = document.getElementById('input_correo_inicio');
let input_password = document.getElementById('input_password_inicio');
// botones
let boton_iniciar_sesion = document.getElementById('boton_iniciar_sesion');
// eventos
boton_iniciar_sesion.addEventListener('click', event => {
  
    if(input_correo.value.length > 0 && input_password.value.length > 0){
      iniciarSesionUser();
    } else {
      if (input_correo.value.length == 0){
        Swal.fire("","Ingrese un correo","info");
      }
      if (input_password.value.length == 0){
        Swal.fire("","Ingrese una contraseña","info");
      }
    }
})
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
async function iniciarSesionAdmin(){
    var ref = doc(db, "admins", input_correo.value);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()){
      if(docSnap.data().password == input_password.value){
          sessionStorage.setItem("usuario",docSnap.data().correo);
          location.replace('admin.html');
      } else {
          Swal.fire("Error","Contraseña incorrecta","error");
      }
    } else {
      Swal.fire('Error!','Usuario no encontrado','error');
    }
  }
async function iniciarSesionUser(){
  var ref = doc(db, "users", input_correo.value);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()){
    if(docSnap.data().password == input_password.value){
        sessionStorage.setItem("usuario",docSnap.data().correo);
        location.replace('home.html');
    } else {
        Swal.fire("Error","Contraseña incorrecta","error");
    }
  } else {
    iniciarSesionAdmin();   
  }
}
