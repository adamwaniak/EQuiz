export interface IStudentAnswer {
    id?: number;
    studentId?: number;
    answerId?: number;
    taskId?: number;
    isChecked?: boolean;
}

export class StudentAnswer implements IStudentAnswer {
    constructor(public id?: number, public studentId?: number, public answerId?: number, public taskId?: number, public isChecked?: boolean) {
    }
}
