// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtElemento = document.querySelector('#selElemento'); // tu select
const txtAstro = document.querySelector('#txtAstro');
const txtPiedra = document.querySelector('#txtPiedra');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad  = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
	const archivo = txtArchi.files[0];
	if(!archivo){
		alert('Debe seleccionar una imagen');
		return;
	}

	const nomarch = archivo.name;
	const metadata = { contentType: archivo.type };
	
	const subir = container.child('zodiaco/' + nomarch).put(archivo, metadata);
	subir
		.then(snapshot => snapshot.ref.getDownloadURL())
		.then(url => {
			// Insertar en Firestore solo agregando los nuevos campos
			db.collection("datosZodiaco").add({
				posic: parseInt(txtPosic.value),
				signo: txtSigno.value,
				rango: txtRango.value,
				elemento: txtElemento.value,
				astro: txtAstro.value,
				piedra: txtPiedra.value,
				url: url
			})
			.then(docRef => {
				alert("Signo agregado correctamente. ID: " + docRef.id);
				limpiar();
			})
			.catch(FirebaseError => {
				alert("Error al subir los datos: " + FirebaseError);
				console.error(FirebaseError);
			});
		})
		.catch(error => {
			alert("Error al subir la imagen: " + error.message);
			console.error(error);
		});
});

function limpiar(){
	txtPosic.value = '';
	txtSigno.value = '';
	txtRango.value = '';
	txtElemento.value = '';
	txtAstro.value = '';
	txtPiedra.value = '';
	txtArchi.value = '';
	txtPosic.focus();
}
