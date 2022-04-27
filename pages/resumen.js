import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";
import ListadoResumen from "../components/ListadoResumen";

export default function Resumen() {

    const { pedido } = useQuiosco()

    return (
        <Layout
            pagina={'Resumen'}
        >
            <h1 className='text-4xl font-black text-center'>Resumen</h1>
            <p className='text-2xl my-3 text-center'>Revisa tu pedido</p>

            {pedido.length === 0 ? (
                <p className='text-center text-2xl mt-36'>Aun no has agregado elementos</p>
            ) : (
                pedido.map( (producto) => (
                    <ListadoResumen
                        key={producto.id}
                        producto={producto}
                    />
                ) )
            )}

        </Layout>
    )

}
