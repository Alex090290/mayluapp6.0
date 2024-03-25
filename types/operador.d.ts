type Operador = {
  id?: number;
  nombre: string;
  usuario: string;
  pswd: string;
  grupoid: number | string;
  activo: boolean;
  almacenes: any;
  createdat?: string;
  createdby?: string;
};

interface KanbanOperador {
  id: number;
  usuario: string;
  activo: boolean;
  name_grupo: string;
  grupoid: number;
  nombre: string;
  createdat: string;
}
