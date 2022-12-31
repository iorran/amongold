// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../config/mongodb";
import { v4 as uuidv4 } from 'uuid';

type Room = {
    id: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Room | Room[] | string>
) {
    const client = await clientPromise;
   if(req.method === 'POST') {
       let id: string = uuidv4().substring(0,6);
       try {
           const db = client.db("amongold");
           const rooms = db.collection("rooms");
           await rooms.insertOne({ id })
       } catch (e: any){
           console.log("Error when try to insert in rooms", e)
           res.status(500).send("Error when try to insert in rooms");
           return;
       }
       res.status(200).json({ id })
   } else if (req.method === 'GET'){
       try {
           const db = client.db("amongold");
           const rooms = await db
               .collection("rooms")
               .find({})
               .sort({ metacritic: -1 })
               .limit(50)
               .toArray();
           res.status(200)
              .json(rooms.map((room) => room['id']))
       } catch (e: any){
           console.log("Error when searching for rooms", e);
           res.status(500).send("Error when searching for rooms");
           return;
       }
   } else {
       res.status(404).json('Path not found')
   }
}
