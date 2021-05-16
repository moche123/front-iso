interface _TemaUser {
    _id: string;
    nombre: string;
    img: string;
    email:string;
}


export class Tema {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _TemaUser,
        public habilitado?:boolean
    ) {}

}

