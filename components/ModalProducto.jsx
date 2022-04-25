import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import { useState, useEffect } from 'react'

const ModalProducto = () => {

    const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco()

    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)

    const { id, nombre, precio, imagen } = producto

    useEffect(() => {
        // Comprobacion de existencia del modal actual en pedido
        if(pedido.some( (item) => item.id === id )) {
            const productoEdicion = pedido.find( (item) => item.id === id )
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        }
    }, [producto, pedido])

    

    const moneda = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio)

  return (
    <div className='md:flex gap-10'>
        <div className='md:w-1/3'>
            <Image
                width={400}
                height={400}
                alt={`Producto: ${nombre}`}
                src={`/assets/img/${imagen}.jpg`}
            />
        </div>

        <div className='md:w-2/3'>
            <div className='flex justify-end'>
                <button
                    onClick={() => handleChangeModal()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <h1 className='text-3xl font-bold mt-5'>{nombre}</h1>
            <p className='mt-5 font-black text-5xl text-amber-500'>{moneda}</p>

            <div className='flex gap-4 mt-5'>
                <button
                    type='button'
                    onClick={() => {
                        if(cantidad === 1) {
                            setCantidad(1)
                        } else {
                            setCantidad(cantidad - 1)
                        } return
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>    
                </button>

                <p className='text-3xl font-bold'>{cantidad}</p>

                <button
                    type='button'
                    onClick={() => {
                        if(cantidad === 5) {
                            setCantidad(5)
                        } else {
                            setCantidad(cantidad + 1)
                        } return
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>

            <button
                type='button'
                className='bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-2 mt-5 rounded-md uppercase'
                onClick={() => {
                    handleAgregarPedido({
                        ...producto,
                        cantidad
                    })
                }}
            >
                {edicion ? (
                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <p>Actualizar</p>
                    </div>
                ) : (
                    <div className='flex gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <p>Agregar al pedido</p>
                    </div>
                )}
            </button>

        </div>
    </div>
  )
}

export default ModalProducto