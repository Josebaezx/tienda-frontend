export class ProductoDto {
    

    constructor(
        public codigo: string,
        public color: string,
        public marca: string,
        public precio: number,
        public tipo: string,
        public imagen: string){}
}
