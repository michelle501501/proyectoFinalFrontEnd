export class ProjectModel{
    constructor(public id: number, public nombrePro: string, public descripcionPro: string, public fechaPro: string) { };

    static createOne(data: any): any {
        return new ProjectModel(data.id, data.nombrePro, data.descripcionPro, data.fechaPro);
    }
    static createArray(jsonArray: any[]): any[] {
        const result: any[] = [];
        for (const data of jsonArray) {
            result.push(ProjectModel.createOne(data));
        }
        return result;
    }
}