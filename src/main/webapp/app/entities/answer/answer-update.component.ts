import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from './answer.service';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';

@Component({
    selector: 'jhi-answer-update',
    templateUrl: './answer-update.component.html'
})
export class AnswerUpdateComponent implements OnInit {
    private _answer: IAnswer;
    isSaving: boolean;

    tasks: ITask[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private answerService: AnswerService,
        private taskService: TaskService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ answer }) => {
            this.answer = answer;
        });
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
        if (this.answer.id !== undefined) {
            this.subscribeToSaveResponse(this.answerService.update(this.answer));
        } else {
            this.subscribeToSaveResponse(this.answerService.create(this.answer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAnswer>>) {
        result.subscribe((res: HttpResponse<IAnswer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTaskById(index: number, item: ITask) {
        return item.id;
    }
    get answer() {
        return this._answer;
    }

    set answer(answer: IAnswer) {
        this._answer = answer;
    }
}
