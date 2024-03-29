import { Tema } from './tema.model';

interface _PublicacionUser {
    _id: string;
    nombre: string;
    img: string;
    email: string;
}


export class Publicacion {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _PublicacionUser,
        public tema?: Tema,
        public contenido?:string,
        public articulo?:string,
        public habilitado?:boolean,
        public caa?:string
    ) {}

}

