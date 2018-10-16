import {Moment} from 'moment';

export class QuizResolve {
    constructor(
        public quizId?: number,
        public name?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public maxTimeInMinutes?: number,
        public tasks?: TaskForResolve[],
    ) {}
}

export class TaskForResolve {
    constructor(public taskId?: number, question?: string, public answers?: AnswerForResolve[]) {
    }
}

export class AnswerForResolve {
    constructor(public answerId?: number, public name?: string, public studentAnswer?: boolean, public studentAnswerId?: number) {
    }
}
