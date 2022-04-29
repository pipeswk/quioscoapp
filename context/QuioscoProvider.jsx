import { useState, useEffect, createContext } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'

const QuioscoContext = createContext()

const QuioscoProvider = ( { children } ) => {

     const [categorias, setCategorias] = useState([])
     const [categoriaActual, setCategoriaActual] = useState({})
     const [producto, setProducto] = useState({})
     const [modal, setModal] = useState(false)
     const [pedido, setPedido] = useState([])
     const [nombre, setNombre] = useState('')
     const [mesa, setMesa] = useState('')
     const [mesero, setMesero] = useState('')
     const [total, setTotal] = useState(0)


     const obtenerCategorias = async () => {
        try {
            const url = '/api/categorias'
            const { data } = await axios(url)
            setCategorias(data)
        } catch (error) {
            console.error(error)
        }
     }

     useEffect(() => {
       obtenerCategorias()
     }, [])

     useEffect(() => {
        setCategoriaActual(categorias[0])
     }, [categorias])

     useEffect(() => {
       const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0 )
       setTotal(nuevoTotal)
     }, [pedido])
     
     

     const handleClickCategoria = (categoria) => {
         setCategoriaActual(categoria)
     }

     const handleClickProducto = (producto) => {
         setProducto(producto)
     }

     const handleChangeModal = () => {
         setModal(!modal)
     }

     const handleAgregarPedido = (item) => {
        if(pedido.some( (producto) => producto.id === item.id )) {
            // Actualizar carrito
            const pedidoActualizado = pedido.map( (producto) => producto.id === item.id ? item : producto )
            setPedido(pedidoActualizado)
            toast.info('Producto Actualizado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } else {
            setPedido([...pedido, item])
            toast.success('Producto agregado ☕', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

        setModal(false)
     }

     const handleEditarCantidades = (producto) => {
         setProducto(producto)
         setModal(!modal)
     }

     const handleEliminarProducto = (id) => {
         const pedidoActualizado = pedido.filter( (producto) => producto.id !== id )
         setPedido(pedidoActualizado)
     }

     const colocarOrden = async (e) => {
        e.preventDefault()
        try {
            const url = '/api/ordenes'
            await axios.post(url, {
               pedido,
               nombre,
               mesa,
               mesero,
               fecha: Date.now().toString(),
               total 
            })
            //Se reinicia App
            setCategoriaActual(categorias[0])
            setProducto({})
            setPedido([])
            setNombre('')
            setMesa('')
            setMesero('')
            setTotal(0)
            toast.success('Pedido agregado exitosamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.error(error)
        }
    }
     

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleClickProducto,
                handleChangeModal,
                modal,
                producto,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                mesa,
                setMesa,
                mesero,
                setMesero,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )

}

export {
    QuioscoProvider
}
export default QuioscoContext