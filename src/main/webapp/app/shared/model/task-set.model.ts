import { ITask } from 'app/shared/model//task.model';

export interface ITaskSet {
    id?: number;
    name?: string;
    requiredTaskAmount?: number;
    maxPoint?: number;
    artificialSelection?: boolean;
    quizId?: number;
    tasks?: ITask[];
}

export class TaskSet implements ITaskSet {
    constructor(
        public id?: number,
        public name?: string,
        public requiredTaskAmount?: number,
        public maxPoint?: number,
        public artificialSelection?: boolean,
        public quizId?: number,
        public tasks?: ITask[]
    ) {
        this.artificialSelection = this.artificialSelection || false;
    }
}
