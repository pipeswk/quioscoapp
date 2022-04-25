import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Categoria = ( { categoria } ) => {

    const { handleClickCategoria, categoriaActual } = useQuiosco()

    const { id, nombre, icono } = categoria

  return (
    <div
        className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-4 hover:bg-amber-400 hover:cursor-pointer`}
        onClick={ () => {
            handleClickCategoria(categoria)
        } }
    >
        <div className='mx-3'>
            <Image
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
                alt='icono categoria'
            />
        </div>
        <h2
            type='button'
            className='text-2xl font-bold'
        >
            {nombre}
        </h2>
    </div>
  )
}

export default Categoria