export class EducationModel{
    constructor(public id: number, public nombreE: string, public descripcionE: string) { };

    static createOne(data: any): any {
        return new EducationModel(data.id, data.nombreE, data.descripcionE);
    }
    static createArray(jsonArray: any[]): any[] {
        const result: any[] = [];
        for (const data of jsonArray) {
            result.push(EducationModel.createOne(data));
        }
        return result;
    }
}