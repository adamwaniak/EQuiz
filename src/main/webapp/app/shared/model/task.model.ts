import { IAnswer } from 'app/shared/model//answer.model';

export interface ITask {
    id?: number;
    question?: string;
    corectnessFactor?: number;
    answers?: IAnswer[];
    taskSetId?: number;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public question?: string,
        public corectnessFactor?: number,
        public answers?: IAnswer[],
        public taskSetId?: number
    ) {}
}
