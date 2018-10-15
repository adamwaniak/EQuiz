import { Moment } from 'moment';

export class QuizResolve {
    constructor(
        public quizId?: number,
        public name?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public maxTimeInMinutes?: number,
        public task?: Task[],
        public answers?: Answer[]
    ) {}
}

class Task {
    constructor(public taskId?: number, question?: string, public answers?: Answer[]) {}
}

class Answer {
    constructor(public answerId?: number, public name?: string, public studentAnswer?: boolean) {}
}
