import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Total() {
    
    const [offButton, setOffButton] = useState(true)

    const router = useRouter()

    const { pedido, nombre, setNombre, mesa, setMesa, mesero, setMesero, colocarOrden, total } = useQuiosco()

    const granTotal = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total)

    const comprobarPedido = () =>{
        return pedido.length === 0
    }

    useEffect(() => {
      const validador = comprobarPedido()
      if(validador === (true || false) || nombre === '' || mesa === '' || mesero === '') {
          setOffButton(true)
      } else if(validador === false && nombre !== '' && mesa !== '' && mesero !== '') {
          setOffButton(false)
      }
    }, [pedido, nombre, mesa, mesero])


    return (
        <Layout
            pagina={'Total'}
        >
            <h1 className='text-4xl font-black text-center'>Total</h1>
            <p className='text-2xl my-3 text-center'>Confirma tu pedido a continuación</p>

            <form
                className='md:flex md:gap-10 mt-6 md:mt-40'
                onSubmit={colocarOrden}    
            >
                <div className='md:w-5/12 shadow rounded-md p-3'>
                    <label htmlFor='nombre' className='block uppercase text-slate-800 font-bold'>Nombre Cliente</label>
                    <input
                        id='nombre'
                        type='text'
                        className='bg-gray-200 w-full p-1 rounded mt-2'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <label htmlFor='mesa' className='block uppercase text-slate-800 font-bold'>Mesa</label>
                        <select
                            id='mesa'
                            className='bg-gray-200 w-full p-1 rounded mt-2 text-center'
                            value={mesa}
                            onChange={(e) => setMesa(e.target.value)}
                        >
                            <option value=''>--Seleccionar--</option>
                            <option value='1'>Mesa 1</option>
                            <option value='2'>Mesa 2</option>
                            <option value='3'>Mesa 3</option>
                            <option value='4'>Mesa 4</option>
                        </select>

                    <label htmlFor='mesero' className='block uppercase text-slate-800 font-bold'>Mesero</label>
                        <select
                            id='mesero'
                            className='bg-gray-200 w-full p-1 rounded mt-2 text-center'
                            value={mesero}
                            onChange={(e) => setMesero(e.target.value)}
                        >
                            <option value=''>--Seleccionar--</option>
                            <option value='1023943150'>Felipe</option>
                            <option value='1015423165'>Kevin</option>
                            <option value='1031514545'>Teylor</option>
                            <option value='1019113798'>Ana</option>
                        </select>
                    
                </div>

                <div className='md:w-7/12 mt-5 md:mt-0'>
                    <p className='text-2xl font-medium'>{`Total a pagar: `} <span className='font-bold'>{granTotal}</span></p>
                    <input
                        disabled={offButton}
                        type='submit'
                        className={offButton === false ? (
                            'bg-green-500 px-2 py-2 text-center text-white text-lg font-bold rounded-md shadow-lg hover:bg-green-600 w-full hover:cursor-pointer mt-4'
                        ) : (
                            'bg-green-200 px-2 py-2 text-center text-white text-lg font-bold rounded-md shadow-lg w-full mt-4'
                        )}
                        value={offButton === false ? (
                            'Confirmar pedido'
                        ) : (
                            'Agrega productos y completa los campos'
                        )}
                        onClick={() => router.push('/')}
                    />
                </div>

            </form>

        </Layout>
    )

}
