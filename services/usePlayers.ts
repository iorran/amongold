import { useQuery } from "@tanstack/react-query";
import { RoomResponse } from "../pages/api/rooms/[roomId]";
import { api } from "./api";

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data;
};

export const usePlayers = (roomId: string) => {
  return useQuery<RoomResponse>(
    ["players"],
    () => fetcher(`api/rooms/${roomId}`),
    { refetchInterval: 3000 }
  );
};
