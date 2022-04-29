import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    if(req.method === 'POST') {
        const nuevaOrden = await prisma.orden.create({
            data: {
                pedido: req.body.pedido,
                nombre: req.body.nombre,
                mesa: req.body.mesa,
                mesero: req.body.mesero,
                fecha: req.body.fecha,
                total: req.body.total
            }
        })
        res.status(200).json(nuevaOrden)
    }

}