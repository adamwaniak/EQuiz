import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IStudentAnswer } from 'app/shared/model/student-answer.model';
import { StudentAnswerService } from '../../services/student-answer.service';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/services/student.service';
import { IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from 'app/features/services/answer.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/features/services/task.service';

@Component({
    selector: 'jhi-student-answer-update',
    templateUrl: './student-answer-update.component.html'
})
export class StudentAnswerUpdateComponent implements OnInit {
    private _studentAnswer: IStudentAnswer;
    isSaving: boolean;

    students: IStudent[];

    answers: IAnswer[];

    tasks: ITask[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private studentAnswerService: StudentAnswerService,
        private studentService: StudentService,
        private answerService: AnswerService,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ studentAnswer }) => {
            this.studentAnswer = studentAnswer;
        });
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudent[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.answerService.query().subscribe(
            (res: HttpResponse<IAnswer[]>) => {
                this.answers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.taskService.query().subscribe(
            (res: HttpResponse<ITask[]>) => {
                this.tasks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.studentAnswer.id !== undefined) {
            this.subscribeToSaveResponse(this.studentAnswerService.update(this.studentAnswer));
        } else {
            this.subscribeToSaveResponse(this.studentAnswerService.create(this.studentAnswer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudentAnswer>>) {
        result.subscribe((res: HttpResponse<IStudentAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStudentById(index: number, item: IStudent) {
        return item.id;
    }

    trackAnswerById(index: number, item: IAnswer) {
        return item.id;
    }

    trackTaskById(index: number, item: ITask) {
        return item.id;
    }
    get studentAnswer() {
        return this._studentAnswer;
    }

    set studentAnswer(studentAnswer: IStudentAnswer) {
        this._studentAnswer = studentAnswer;
    }
}
