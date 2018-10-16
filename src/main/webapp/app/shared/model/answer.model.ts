export interface IAnswer {
    id?: number;
    name?: string;
    isCorrect?: boolean;
    imageContentType?: string;
    image?: any;
    taskId?: number;
}

export class Answer implements IAnswer {
    constructor(
        public id?: number,
        public name?: string,
        public isCorrect?: boolean,
        public taskId?: number,
        public imageContentType?: string,
        public image?: any,
    ) {
    }
}
