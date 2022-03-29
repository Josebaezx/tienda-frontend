export interface Producto {
    [x: string]: any;
    id: number;
    codigo: string;
    color: string;
    fechaCreacion?: Date;
    marca: string;
    precio: number;
    tipo: string;
    imagen?: string;
}
