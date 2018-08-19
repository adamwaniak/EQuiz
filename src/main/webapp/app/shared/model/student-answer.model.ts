export interface IStudentAnswer {
    id?: number;
    studentId?: number;
    answerId?: number;
    taskId?: number;
}

export class StudentAnswer implements IStudentAnswer {
    constructor(public id?: number, public studentId?: number, public answerId?: number, public taskId?: number) {}
}
