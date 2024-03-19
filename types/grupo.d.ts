type Accesos = {
  punto_venta: {
    registro: boolean;
    caja: boolean;
    abrir_cajon: boolean;
    monitor: boolean;
  };
  catalogos: {
    almacenes: boolean;
    productos: boolean;
    clientes: boolean;
    proveedores: boolean;
    operadores: boolean;
  };
  herramientas: {};
  movimientos: {};
  utileria: {};
};

type Grupo = {
  id?: string;
  nombre: string;
  accesos: Accesos;
  createdat?: string;
  createdby?: string;
};
