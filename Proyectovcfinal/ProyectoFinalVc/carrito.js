const Carrito = JSON.parse(localStorage.getItem("contenido-carrito")) || [];

function Total(carrito) {
    let carro = Array.from(carrito);
    const total = carro.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    document.querySelector("#total").innerText = "$" + total
}

const cargCarrito = (titulo, precio, cantidad) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const cantidadDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor-carrito")
    tituloDOM.classList.add("titulo-carrito")
    precioDOM.classList.add("precio-carrito")
    cantidadDOM.classList.add("cantidad-producto")
    botonDOM.classList.add("boton-eliminar")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    cantidadDOM.innerText = "Cantidad: " + cantidad
    botonDOM.innerText  = "Eliminar"

    botonDOM.addEventListener("click", ()=>{
        eliminarProducto(titulo)
    })
    
    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(cantidadDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}


const actualizarCarrito = () => {
    localStorage.setItem("contenido-carrito", JSON.stringify(Carrito));
    carrito.innerHTML = ""
    Carrito.forEach(el => {
        carrito.appendChild(cargCarrito(el.titulo, el.precio, el.cantidad))
    })
    Total(Carrito)
}


function cleanCarrito() {
    if(Carrito.length > 0){
        localStorage.clear();
        carrito.innerHTML = "";
        Swal.fire({
            title: "Muchas gracias por su compra",
           
        });
    }else{
        Swal.fire({
            icon: "error",
            title: "Su carrito esta vacio",
            toast: true,
            position: "center",
            timer: 1500,
            showConfirmButton: false
        });
    }
}

const boton = document.getElementById("boton-limpiar");
boton.addEventListener("click", cleanCarrito);

if(Carrito.length > 0){
    Carrito.forEach(el => {
        const carritoDOM = cargCarrito(el.titulo, el.precio, el.cantidad)
        carrito.appendChild(carritoDOM)
    })
    Total(Carrito)
}

const alertaProductoEliminado = (titulo) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timerProgressBar: true,
        timer: 2000,
        showConfirmButton: false,
        icon: "error",
        color: "#000000",
        background: "rgba(255, 255, 255, 0.8)",
        title: "Producto eliminado:",
        text: titulo
        
})
}

const eliminarProducto = (titulo, imagen) => {
    const producto = Carrito.find(el => {
        return el.titulo === titulo
    })
    if(producto.cantidad <= 1){
        let arrayDeTitulos = Carrito.map(el => {
            return el.titulo
        })
        let index = arrayDeTitulos.indexOf(titulo)
        Carrito.splice(index, 1)
    }else{
        producto.cantidad -= 1
    }

    actualizarCarrito()
    alertaProductoEliminado(titulo)
}



