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
                pedido
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