// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../../../../config/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {

    if(req.method === 'POST') {
        const { name, roomId } = req.query
        try {
            const client = await clientPromise;
            const db = client.db("amongold");

            const rooms = db.collection("rooms")
            const room = await rooms.findOne({ id: roomId });

            if(room){
                const joinRoom = db.collection("join_room");
                const isJoined = await joinRoom.findOne({ roomId, name });
                if(isJoined){
                    res.status(200).json(`${name} already has joined successfully`)
                    return;
                }

                await joinRoom.insertOne({
                    roomId,
                    name,
                    owner: false
                })
                res.status(201).json(`${name} has joined successfully`)
                return;
            }
            res.status(404).send('Room not found')
            return;
        } catch (e: any){
            console.log("error mongo", e)
        }

    }else {
        res.status(404).json('Path not found')
    }
}
