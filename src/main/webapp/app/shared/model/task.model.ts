import { IAnswer } from 'app/shared/model//answer.model';

export const enum TaskType {
    SINGLE = 'SINGLE',
    MULTI = 'MULTI'
}

export interface ITask {
    id?: number;
    question?: string;
    type?: TaskType;
    corectnessFactor?: number;
    answers?: IAnswer[];
    taskSetId?: number;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public question?: string,
        public type?: TaskType,
        public corectnessFactor?: number,
        public answers?: IAnswer[],
        public taskSetId?: number
    ) {}
}
