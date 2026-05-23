// =====================================
// SISTEMA DE GESTIÓN DE PERSONAJES
// =====================================

// VARIABLE GLOBAL: Lista de personajes
// Esta lista almacena todos los personajes del sistema
let listaPersonajes = [];

// ID para identificar nuevos personajes
let proximoId = 3;

// Variable para rastrear si estamos editando un personaje
let editandoId = null;

// =====================================
// INICIALIZACIÓN: Cargar datos predeterminados
// =====================================
function inicializar() {
    // Personaje predeterminado 1
    listaPersonajes.push({
        id: 1,
        nombrePersonaje: "Héroe Principal",
        edad: 25,
        altura: 180,
        url_imagen: "https://via.placeholder.com/200?text=Heroe",
        descripcion: "El protagonista principal del universo.",
        habilidades: ["fuerza", "coraje", "liderazgo"],
        esVillano: false
    });

    // Personaje predeterminado 2
    listaPersonajes.push({
        id: 2,
        nombrePersonaje: "Villano Oscuro",
        edad: 45,
        altura: 185,
        url_imagen: "https://via.placeholder.com/200?text=Villano",
        descripcion: "El antagonista principal del universo.",
        habilidades: ["magia oscura", "astucia", "poder"],
        esVillano: true
    });

    // Mostrar los personajes en la pantalla
    mostrarPersonajes();
}

// =====================================
// FUNCIÓN: Mostrar todos los personajes
// =====================================
function mostrarPersonajes() {
    // Obtener el contenedor donde se mostrarán las tarjetas
    const contenedor = document.getElementById("contenedorPersonajes");
    
    // Limpiar el contenedor (remover tarjetas previas)
    contenedor.innerHTML = "";

    // Si no hay personajes, mostrar mensaje
    if (listaPersonajes.length === 0) {
        contenedor.innerHTML = "<p>No hay personajes. ¡Agrega uno nuevo!</p>";
        return;
    }

    // Recorrer cada personaje y crear su tarjeta
    listaPersonajes.forEach(personaje => {
        // Crear la tarjeta HTML
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta-personaje";

        // Determinar si es villano para cambiar el estilo
        const claseVillano = personaje.esVillano ? "villano" : "";

        // Crear el HTML de la tarjeta
        tarjeta.innerHTML = `
            <div class="tarjeta-imagen">
                <img src="${personaje.url_imagen}" alt="${personaje.nombrePersonaje}">
                <span class="etiqueta-villano ${claseVillano}">
                    ${personaje.esVillano ? "Villano" : "Héroe"}
                </span>
            </div>
            <div class="tarjeta-contenido">
                <h3>${personaje.nombrePersonaje}</h3>
                <p><strong>Edad:</strong> ${personaje.edad} años</p>
                <p><strong>Altura:</strong> ${personaje.altura} cm</p>
                <p><strong>Descripción:</strong> ${personaje.descripcion}</p>
                
                <div class="habilidades">
                    <strong>Habilidades:</strong>
                    <div class="lista-habilidades">
                        ${personaje.habilidades.map(h => `<span class="habilidad">${h}</span>`).join("")}
                    </div>
                </div>

                <div class="tarjeta-botones">
                    <button class="btn btn-small" onclick="editarPersonaje(${personaje.id})">✏️ Editar</button>
                    <button class="btn btn-small btn-danger" onclick="eliminarPersonaje(${personaje.id})">🗑️ Eliminar</button>
                </div>
            </div>
        `;

        // Agregar la tarjeta al contenedor
        contenedor.appendChild(tarjeta);
    });
}

// =====================================
// FUNCIÓN: Mostrar el formulario
// =====================================
function mostrarFormulario() {
    // Limpiar los datos del formulario
    document.getElementById("formularioPersonaje").reset();
    
    // Reiniciar el ID de edición
    editandoId = null;
    
    // Cambiar el título del formulario
    document.querySelector("#formularioDiv h2").textContent = "Agregar Nuevo Personaje";
    
    // Mostrar el formulario
    document.getElementById("formularioDiv").style.display = "block";
}

// =====================================
// FUNCIÓN: Cancelar el formulario
// =====================================
function cancelarFormulario() {
    // Limpiar los datos del formulario
    document.getElementById("formularioPersonaje").reset();
    
    // Reiniciar el ID de edición
    editandoId = null;
    
    // Ocultar el formulario
    document.getElementById("formularioDiv").style.display = "none";
}

// =====================================
// FUNCIÓN: Guardar personaje (Agregar o Actualizar)
// =====================================
function guardarPersonaje() {
    // Obtener los valores del formulario
    const nombrePersonaje = document.getElementById("nombrePersonaje").value;
    const edad = parseInt(document.getElementById("edad").value);
    const altura = parseInt(document.getElementById("altura").value);
    const url_imagen = document.getElementById("url_imagen").value || "https://via.placeholder.com/200?text=Personaje";
    const descripcion = document.getElementById("descripcion").value;
    const habilidadesTexto = document.getElementById("habilidades").value;
    const esVillano = document.getElementById("esVillano").checked;

    // Validar que los campos obligatorios estén rellenos
    if (!nombrePersonaje || !edad || !altura || !descripcion) {
        alert("Por favor, rellena todos los campos obligatorios");
        return;
    }

    // Convertir el texto de habilidades a un array
    const habilidades = habilidadesTexto
        .split(",")
        .map(h => h.trim())
        .filter(h => h !== "");

    // Si estamos editando un personaje existente
    if (editandoId !== null) {
        // Buscar el personaje por ID y actualizar sus datos
        const personaje = listaPersonajes.find(p => p.id === editandoId);
        if (personaje) {
            personaje.nombrePersonaje = nombrePersonaje;
            personaje.edad = edad;
            personaje.altura = altura;
            personaje.url_imagen = url_imagen;
            personaje.descripcion = descripcion;
            personaje.habilidades = habilidades;
            personaje.esVillano = esVillano;
        }
        alert("Personaje actualizado correctamente");
    } else {
        // Si es un personaje nuevo, crearlo
        const nuevoPersonaje = {
            id: proximoId,
            nombrePersonaje: nombrePersonaje,
            edad: edad,
            altura: altura,
            url_imagen: url_imagen,
            descripcion: descripcion,
            habilidades: habilidades,
            esVillano: esVillano
        };
        
        // Agregar el nuevo personaje a la lista
        listaPersonajes.push(nuevoPersonaje);
        
        // Incrementar el ID para el próximo personaje
        proximoId++;
        
        alert("Personaje agregado correctamente");
    }

    // Actualizar la visualización de personajes
    mostrarPersonajes();
    
    // Ocultar el formulario
    cancelarFormulario();
}

// =====================================
// FUNCIÓN: Editar personaje
// =====================================
function editarPersonaje(id) {
    // Buscar el personaje por ID
    const personaje = listaPersonajes.find(p => p.id === id);
    
    if (!personaje) {
        alert("Personaje no encontrado");
        return;
    }

    // Guardar el ID del personaje que se está editando
    editandoId = id;

    // Rellenar el formulario con los datos del personaje
    document.getElementById("nombrePersonaje").value = personaje.nombrePersonaje;
    document.getElementById("edad").value = personaje.edad;
    document.getElementById("altura").value = personaje.altura;
    document.getElementById("url_imagen").value = personaje.url_imagen;
    document.getElementById("descripcion").value = personaje.descripcion;
    document.getElementById("habilidades").value = personaje.habilidades.join(", ");
    document.getElementById("esVillano").checked = personaje.esVillano;

    // Cambiar el título del formulario
    document.querySelector("#formularioDiv h2").textContent = "Editar Personaje";

    // Mostrar el formulario
    document.getElementById("formularioDiv").style.display = "block";

    // Desplazar hacia arriba para ver el formulario
    document.getElementById("formularioDiv").scrollIntoView();
}

// =====================================
// FUNCIÓN: Eliminar personaje
// =====================================
function eliminarPersonaje(id) {
    // Pedir confirmación antes de eliminar
    if (confirm("¿Estás seguro de que deseas eliminar este personaje?")) {
        // Buscar el índice del personaje en la lista
        const indice = listaPersonajes.findIndex(p => p.id === id);
        
        // Si se encuentra, eliminarlo
        if (indice !== -1) {
            listaPersonajes.splice(indice, 1);
            alert("Personaje eliminado correctamente");
            mostrarPersonajes();
        }
    }
}

// =====================================
// FUNCIÓN: Ordenar personajes por nombre
// =====================================
function ordenarPorNombre() {
    // Ordenar alfabéticamente por nombre
    listaPersonajes.sort((a, b) => {
        return a.nombrePersonaje.localeCompare(b.nombrePersonaje);
    });
    
    // Actualizar la visualización
    mostrarPersonajes();
}

// =====================================
// FUNCIÓN: Ordenar personajes por edad
// =====================================
function ordenarPorEdad() {
    // Ordenar de menor a mayor edad
    listaPersonajes.sort((a, b) => {
        return a.edad - b.edad;
    });
    
    // Actualizar la visualización
    mostrarPersonajes();
}

// =====================================
// INICIAR LA APLICACIÓN
// =====================================
// Esta función se ejecuta cuando la página carga completamente
window.addEventListener("DOMContentLoaded", inicializar);
