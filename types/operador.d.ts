type Operador = {
  id?: number;
  nombre: string;
  usuario: string;
  pswd: string;
  grupoid: number | string;
  activo: boolean;
  empresas: any;
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
