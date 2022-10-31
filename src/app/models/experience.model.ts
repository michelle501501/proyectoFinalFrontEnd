export class ExperienceModel {
    constructor(public id: number, public nombreE: string, public descripcionE: string, public empresaE: string) { };

    static createOne(data: any): any {
        return new ExperienceModel(data.id, data.nombreE, data.descripcionE, data.empresaE);
    }
    static createArray(jsonArray: any[]): any[] {
        const result: any[] = [];
        for (const data of jsonArray) {
            result.push(ExperienceModel.createOne(data));
        }
        return result;
    }
}