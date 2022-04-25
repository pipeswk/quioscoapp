import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Producto = ( { producto } ) => {

    const { handleClickProducto, handleChangeModal } = useQuiosco() 
    const { id, nombre, precio, imagen } = producto

    const moneda = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(precio)


  return (
    <div
      className='border p-3 rounded-lg m-2 hover:cursor-pointer'
      onClick={() => {
        handleClickProducto(producto)
        handleChangeModal()
      }}
    >
        <Image
            src={`/assets/img/${imagen}.jpg`}
            width={350}
            height={350}
            alt={nombre}
        />
        <div className='p-5'>
            <h3 className='text-2xl font-bold'>{nombre}</h3>
            <p className='mt-5 font-black text-4xl text-amber-500'>{moneda}</p>
        </div>
    </div>
  )
}

export default Producto