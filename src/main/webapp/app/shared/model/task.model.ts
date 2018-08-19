import { IAnswer } from 'app/shared/model//answer.model';

export interface ITask {
    id?: number;
    question?: string;
    correctnessFactor?: number;
    imageContentType?: string;
    image?: any;
    answers?: IAnswer[];
    taskSetId?: number;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public question?: string,
        public correctnessFactor?: number,
        public imageContentType?: string,
        public image?: any,
        public answers?: IAnswer[],
        public taskSetId?: number
    ) {}
}
