import { useQuery } from "@tanstack/react-query";
import { RoomResponse } from "../pages/api/rooms/[roomId]";
import { api } from "./api";

const fetcher = async (url: string) => {
  const { data } = await api.get(url);
  return data;
};

export const useRooms = () => {
  return useQuery<string[]>(["rooms"], () => fetcher(`api/rooms`), {
    refetchInterval: 3000,
  });
};
