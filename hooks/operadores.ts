import { create } from "zustand";
import axios, { AxiosResponse } from "axios";

interface Store {
  createOperador: (body: any) => Promise<any>;
}

const useOperadores = create<Store>((set, get) => ({
  createOperador: async (body: any) => {
    const { data }: AxiosResponse = await axios.post("/api/operadores", body);
    return data;
  },
}));

export default useOperadores;
