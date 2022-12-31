// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../config/mongodb";
import { headers } from "../../../../utils/api/headers";
import { Room } from "../index";

export type JoinersResponse = {
  name: string;
  owner: string;
  roomId: string;
  role: "V" | "D" | "A";
};

export type RoomResponse = {
  status: string;
  joiners: JoinersResponse[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoomResponse | string>
) {
  headers(res);

  const client = await clientPromise;
  const db = client.db("amongold");
  const { roomId: id } = req.query;

  switch (req.method) {
    case "GET":
      const room = await db.collection<Room>("rooms").findOne({ id });

      if (!room) return res.status(404).json("Room not found");

      const joinRooms = await db
        .collection<JoinersResponse>("join_room")
        .find({ roomId: id })
        .sort({ metacritic: -1 })
        .limit(50)
        .toArray();

      res.status(200).json({ status: room.status, joiners: joinRooms });
      break;
    default:
      res.status(404).json("Path not found");
  }
}
