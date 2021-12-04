import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js"; // import del proyecto
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
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js"; // import base de datos
const db = getFirestore();
//
let input_correo = document.getElementById('input_correo_registro');
let input_password = document.getElementById('input_password_registro');
let input_nombre = document.getElementById('input_nombre_registro');
let check_condiciones = document.getElementById('check_condiciones_registro');
//events
document.getElementById('link_condiciones_registro').addEventListener('click', event =>{
	Swal.fire({
		title: 't&c',
		text: 'Configurar T&C',
		footer: "grupo 6 - Programción para Web"
	});
});
document.getElementById('btn_submit_registro').addEventListener('click', event => {
	if(validarCorreo(input_correo) && validarNombre(input_nombre) && validarPassword(input_password) && validarCheck(check_condiciones)){
		validarNuevo();
	} else {
		if (!validarCorreo(input_correo)){
			Swal.fire("","Correo inválido","info");
		}
		if (!validarNombre(input_nombre)){
			Swal.fire("","El nombre es muy corto","info");
		}
		if (!validarPassword(input_password)){
			Swal.fire("","Contraseña muy corta","info");
		}
		if (!validarCheck(check_condiciones)){
			Swal.fire("","Debe aceptar Términos y condiciones","info");
		}
	}
})
function validarCorreo(String){
	let expression = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
	if (expression.test(String.value) == true){
		return true;
	} else {
		return false;
	}
}
function validarPassword(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 7){
			return true;
		} else {
			return false;
		}
	}
}
function validarNombre(String){
	if (String.value.length == 0) {
		return false;
	} else {
		if (String.value.length >= 3){
			return true;
		} else {
			return false;
		}
	}
}
function validarCheck(CheckBox){
	if (CheckBox.checked == true){
		return true;
	} else {
		return false;
	}
}
async function Registro(){ // email
	var ref = doc(db, "users", input_correo.value);

	const docRef = await setDoc(
		ref, {
			correo: input_correo.value,
			nombre: input_nombre.value,
			password: input_password.value
		}
	)
	.then(()=>{
		sessionStorage.setItem('usuario',input_correo.value);
		window.location.replace('home.html');
	})
	.catch((error)=>{
		new swal('Error!', error, 'error');
	});

}
async function validarNuevo(){
	var ref = doc(db, "users", input_correo.value);
	const docSnap = await getDoc(ref);
	if (docSnap.exists()){
		Swal.fire("Atención","Ya esxiste una cuenta asociada a éste correo","error");
	} else {
		Registro(input_correo.value, input_nombre.value, input_password.vale);
	}
}