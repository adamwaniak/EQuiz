import { IStudentAnswer } from 'app/shared/model//student-answer.model';

export interface IStudent {
    id?: number;
    name?: string;
    score?: number;
    grade?: string;
    quizId?: number;
    studentAnswers?: IStudentAnswer[];
}

export class Student implements IStudent {
    constructor(
        public id?: number,
        public name?: string,
        public score?: number,
        public grade?: string,
        public quizId?: number,
        public studentAnswers?: IStudentAnswer[]
    ) {}
}
