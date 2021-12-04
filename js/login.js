import Swal from '/node_modules/sweetalert2/src/sweetalert2.js'
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import {getFirestore, doc, getDoc}from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOjKc5cZtMXPqoIE3LMFJjGpqdOHZEINY",
  authDomain: "caribbeanfoodweb.firebaseapp.com",
  databaseURL: "https://caribbeanfoodweb-default-rtdb.firebaseio.com",
  projectId: "caribbeanfoodweb",
  storageBucket: "caribbeanfoodweb.appspot.com",
  messagingSenderId: "986873180157",
  appId: "1:986873180157:web:20fd4941a89f374b72f394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const mauth = getAuth();
const db = getFirestore();

let input_correo = document.getElementById('input_correo_inicio');
let input_password = document.getElementById('input_password_inicio');
let input_correo_re = document.getElementById('input_email_recuperar');

// botones
let boton_iniciar_sesion = document.getElementById('boton_iniciar_sesion');
let boton_recuperar = document.getElementById('btn-recuperar');

// eventos
boton_iniciar_sesion.addEventListener('click', event => {
    iniciarSesionAdmin();
})

boton_recuperar.addEventListener('click',(e)=>{
  sendPasswordResetEmail(mauth,input_correo_re.value).then(function() {
    Swal.fire('ENVIADO');
    location.replace('admin.html');
  })
  .catch(function(error) {
    console.log(error);
  });
})

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
        iniciarSesionUser();
    }
  }
async function iniciarSesionUser(){
  const correo = input_correo.value;
  const password = input_password.value;
  var ref = doc(db, "users", correo);
  const docSnap = await getDoc(ref);
  signInWithEmailAndPassword(mauth,correo,password).then((userCredential)=>{
      sessionStorage.setItem("usuario", docSnap.data().correo);
      location.replace('home.html');
  }).catch((e)=>{
    if (docSnap.exists()==false)Swal.fire('Error!','Usuario no encontrado','error');
    if(docSnap.data().password != input_password)Swal.fire("Error","Contraseña incorrecta","error");

	})
}
