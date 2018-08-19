export interface IAnswer {
    id?: number;
    name?: string;
    isCorrect?: boolean;
    taskId?: number;
}

export class Answer implements IAnswer {
    constructor(public id?: number, public name?: string, public isCorrect?: boolean, public taskId?: number) {
        this.isCorrect = this.isCorrect || false;
    }
}
