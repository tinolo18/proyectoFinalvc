const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")
const Carrito = JSON.parse(localStorage.getItem("contenido-carrito")) || []

const updateCarrito = () => {
    localStorage.setItem("contenido-carrito", JSON.stringify(Carrito));
}

const loadProductos = (imagen, titulo, precio) => {
    const contenedor = document.createElement("div")
    const imagenDOM = document.createElement("img")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    imagenDOM.classList.add("imagen")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton-agregar")

    imagenDOM.src = imagen
    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText  = "Comprar"
    
    botonDOM.addEventListener("click", ()=>{
        addtoCarrito(titulo, precio, imagen)
    })

    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}

const addtoCarrito = (titulo, precio, imagen) => {
    const bandera = Carrito.some(el => {
        return el.titulo === titulo
    })
    if(bandera){
        const producto = Carrito.find(el => {
            return el.titulo === titulo
        })
        producto.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        })
    }   
    updateCarrito()
    alertaProductoAdd(titulo, imagen)
}
const alertaProductoAdd = (titulo, imagen) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timerProgressBar: true,
        timer: 2000,
        showConfirmButton: false,
        icon: "success",
        color: "#000000",
        background: "rgba(255, 255, 255, 0.8)",
        html: `
            <div class="alerta">
                <img src="${imagen}" alt="">
                <div>
                    <strong>producto seleccionado + :</strong><br>
                    ${titulo}
                </div>
            </div>
        `,
    });
}

const traerProductos = async () => {
    let resp = await fetch("./info.json")
    let data = await resp.json()

    data.forEach(el => {
        const productoDOM = loadProductos(el.imagen, el.titulo, el.precio)
    
        productos.appendChild(productoDOM)
    })
} 

traerProductos()