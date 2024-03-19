import { create } from "zustand";
import axios, { AxiosResponse } from "axios";

interface Store {
  grupos: Array<Grupo>;
  fetchGrupos: () => Promise<any>;
  createGrupo: (body: any) => Promise<any>;
}

const useGrupos = create<Store>((set, get) => ({
  grupos: [],

  fetchGrupos: async () => {
    const { data }: AxiosResponse = await axios.get("/api/grupos");
    set((st) => ({
      ...st,
      grupos: data.data,
    }));
  },

  createGrupo: async (body: any) => {
    const { data }: AxiosResponse = await axios.post("/api/grupos", body);
    if (data.res === "success") {
      await get().fetchGrupos();
    }
    return data;
  },
}));

export default useGrupos;
