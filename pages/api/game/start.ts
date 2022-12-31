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

    const shuffle = ([...arr]): any[] => {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    };

    switch (req.method) {
        case 'POST':
            const joiners = await db
                .collection("join_room")
                .find({ roomId })
                .sort({ metacritic: -1 })
                .limit(50)
                .toArray();
            const shuffledJoiners = shuffle(joiners);
            shuffledJoiners[0]['role'] = 'D';
            shuffledJoiners[1]['role'] = 'A';
            for (let i = 2; i < shuffledJoiners.length ; i++) {
                shuffledJoiners[i]['role'] = 'V';
            }
            console.log(shuffle(joiners))

            res.status(200).json(shuffledJoiners)
        break;
        default:
            res.status(404).json('Path not found')
    }


}