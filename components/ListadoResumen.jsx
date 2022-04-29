import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const ListadoResumen = ( { producto } ) => {

    const { handleEditarCantidades, handleEliminarProducto } = useQuiosco()

    const { nombre, precio, imagen, cantidad, id} = producto

    const moneda = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio)
    const subtotal = precio * cantidad
    const subtotalF = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(subtotal)

  return (
    <div className='p-5 mb-3 md:flex gap-10 items-center shadow'>
        <div className='md:w-1/6'>
            <Image
                src={`/assets/img/${imagen}.jpg`}
                width={300}
                height={300}
                alt={`Producto ${nombre}`}
            />
        </div>
        <div className='md:w-4/6'>
            <p className='text-3xl font-bold'>{nombre}</p>
            <p className='text-2xl font-semibold'>{`Cantidad: ${cantidad}`}</p>
            <p className='text-2xl font-semibold'>{`Precio: ${moneda}`}</p>
            <p className='text-2xl font-semibold text-amber-500'>{`Subtotal: ${subtotalF}`}</p>
        </div>

        <div>
          <button
            className='bg-sky-700 px-3 py-1 rounded text-white font-bold hover:bg-sky-800 shadow-md flex gap-1 w-full justify-center mb-4'
            onClick={() => {
              handleEditarCantidades(producto)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Editar
          </button>
          <button
            className='bg-red-700 px-3 py-1 rounded text-white font-bold hover:bg-red-800 shadow-md flex gap-1 w-full justify-center mb-4'
            onClick={() => {
              handleEliminarProducto(id)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Eliminar
          </button>
        </div>
    </div>
  )
}

export default ListadoResumen