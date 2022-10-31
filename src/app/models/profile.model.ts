export class ProfileModel {
    constructor(public nombre: string, public apellido: string, public img: string, public puesto: string, public bio: string) { };

    get fullName() {
        return this.nombre + ' ' + this.apellido;
    }
}