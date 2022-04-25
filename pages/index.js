import Producto from "../components/Producto";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function Home() {

  const { categoriaActual } = useQuiosco()

  const productos = categoriaActual?.productos

  return (
    <Layout
      pagina={categoriaActual?.nombre}
    >
      <h1 className='text-4xl font-black text-center'>{categoriaActual?.nombre}</h1>
      <p className='mt-3 mb-6 md:text-2xl w-full text-center'>
        Elige y personaliza tu pedido a continuación
      </p>

      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {productos?.map( (producto) => (
          <Producto
            key={producto.id}
            producto={producto}
          />
        ) )}
      </div>

    </Layout>
  )
}