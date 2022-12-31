// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../config/mongodb";

import {v4 as uuidv4} from 'uuid';



type Response = {
    roomId: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
   if(req.method === 'POST') {
       let roomId: string = uuidv4().substring(0,6);
       try {
           const client = await clientPromise;
           const db = client.db("amongold");
           const rooms = db.collection("rooms");
           await rooms.insertOne({
               id: roomId
           })
       } catch (e: any){
           console.log("error mongo", e)
       }
       res.status(200).json({ roomId })
   }
}
