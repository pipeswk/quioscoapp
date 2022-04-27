import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useRouter } from 'next/router'

const Sidebar = () => {

    const { categorias, handleChangePaso } = useQuiosco()

    const router = useRouter()


  return (
    <>
        <Image
            width={300}
            height={100}
            src='/assets/img/logo.svg'
            alt='logotipo'
            className='hover:cursor-pointer'
            onClick={() => {
                router.push('/')
                handleChangePaso(1)
            }}
        />

        <nav className='mt-10'>
            {categorias.map( (categoria) => (
                <Categoria
                    key={categoria.id}
                    categoria={categoria}
                />
            ) )}
        </nav>

    </>
  )
}

export default Sidebar