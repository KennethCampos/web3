var db = firebase.apps[0].firestore();
const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query){
    tabla.innerHTML = "";
    var salida = "";
    query.forEach(function(doc){
        const data = doc.data();
        salida += '<div class="divAnuncio m-3">'
        salida += '  <div class="imgBlock"><img src="' + data.url +'" width="100%" /></div>'
        salida += '  <div><strong>Signo:</strong> ' + data.signo + '<br/>'
        salida += '       <strong>Rango:</strong> ' + data.rango + '<br/>'
        salida += '       <strong>Elemento:</strong> ' + data.elemento + '<br/>'
        salida += '       <strong>Astro:</strong> ' + data.astro + '<br/>'
        salida += '       <strong>Piedra:</strong> ' + data.piedra + '</div><br/>'
        salida += '</div>';
    });
    tabla.innerHTML = salida;
}).catch(function(error){
    console.error("Error al leer datos: ", error);
});
