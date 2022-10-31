export class SkillModel{
    constructor(public id: number, public nombre: string, public porcentaje: number) { };

    static createOne(data: any): any {
        return new SkillModel(data.id, data.nombre, data.porcentaje);
    }
    static createArray(jsonArray: any[]): any[] {
        const result: any[] = [];
        for (const data of jsonArray) {
            result.push(SkillModel.createOne(data));
        }
        return result;
    }
}