// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../config/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string | any[]>
) {
    const { roomId } = req.query;
    const client = await clientPromise;
    const db = client.db("amongold");

    switch (req.method) {
        case 'POST':
            const collectionRoom = db.collection("rooms");
            const room = await collectionRoom.findOne({ id: roomId });

            if(!room)
               return res.status(404).json('Room not found');

            const updateDoc = { $set: { status: "STARTED" } };
            await collectionRoom.updateOne({ id: roomId }, updateDoc)

            const collectionJoin = db.collection("join_room")
            const joiners = await collectionJoin.find({ roomId })
                .sort({ metacritic: -1 })
                .limit(50)
                .toArray();
            const shuffledJoiners = shuffle(joiners);

            if(shuffledJoiners.length < 3)
                return res.status(404).json('The room needs at least 3 joiners');

            for (let i = 0; i < shuffledJoiners.length ; i++) {
                let updateJoiner = null;
                if(i === 0){
                    updateJoiner = { $set: { role: "D" } };
                    shuffledJoiners[0]['role'] = 'D';
                } else if (i === 1){
                    updateJoiner = { $set: { role: "A" } };
                    shuffledJoiners[1]['role'] = 'A';
                } else {
                    updateJoiner = { $set: { role: "V" } };
                    shuffledJoiners[i]['role'] = 'V';
                }
                await collectionJoin.updateOne({ roomId, name: shuffledJoiners[i].name }, updateJoiner)
            }

            res.status(200).json(shuffledJoiners)
        break;
        default:
            res.status(404).json('Path not found')
    }
}

const shuffle = ([...arr]): any[] => {
    let m = arr.length;
    while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
};