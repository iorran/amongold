// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../../config/mongodb";
import {Room} from "../index";

export type Response = {
    status: string,
    joiners: Room[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response | string>
) {
    const client = await clientPromise;
    const db = client.db("amongold");
    const { roomId: id } = req.query;

    switch (req.method) {
        case 'GET':
            const room = await db.collection<Room>("rooms").findOne({ id })

            if(!room)
                return res.status(404).json('Room not found');

            const joinRooms = await db
                .collection<Room>("join_room")
                .find({ roomId: id})
                .sort({ metacritic: -1 })
                .limit(50)
                .toArray();

            res.status(200).json({ status: room.status, joiners: joinRooms })
            break;
        default:
            res.status(404).json('Path not found')
    }

}