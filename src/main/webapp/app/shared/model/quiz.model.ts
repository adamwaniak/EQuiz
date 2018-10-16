import { Moment } from 'moment';
import { ITaskSet } from 'app/shared/model//task-set.model';
import { IStudent } from 'app/shared/model//student.model';

export interface IQuiz {
    id?: number;
    name?: string;
    startDate?: Moment;
    endDate?: Moment;
    password?: string;
    edition?: number;
    url?: string;
    maxTimeInMinutes?: number;
    taskSets?: ITaskSet[];
    students?: IStudent[];
    ownerId?: number;
    taskSetNumber?: number;
    requiredTaskNumber?: number;
    taskNumber?: number;
    resolvedNumber?: number;
}

export class Quiz implements IQuiz {
    constructor(
        public id?: number,
        public name?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public password?: string,
        public edition?: number,
        public url?: string,
        public maxTimeInMinutes?: number,
        public taskSets?: ITaskSet[],
        public students?: IStudent[],
        public ownerId?: number,
        public taskSetNumber?: number,
        public requiredTaskNumber?: number,
        public taskNumber?: number,
        public resolvedNumber?: number
    ) {}
}
