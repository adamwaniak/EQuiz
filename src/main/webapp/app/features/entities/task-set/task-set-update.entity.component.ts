import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITaskSet } from 'app/shared/model/task-set.model';
import { TaskSetService } from '../../services/task-set.service';
import { IQuiz } from 'app/shared/model/quiz.model';
import { QuizService } from 'app/features/services/quiz.service';

@Component({
    selector: 'jhi-task-set-update',
    templateUrl: './task-set-update.entity.component.html'
})
export class TaskSetUpdateEntityComponent implements OnInit {
    private _taskSet: ITaskSet;
    isSaving: boolean;

    quizzes: IQuiz[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private taskSetService: TaskSetService,
        private quizService: QuizService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ taskSet }) => {
            this.taskSet = taskSet;
        });
        this.quizService.query().subscribe(
            (res: HttpResponse<IQuiz[]>) => {
                this.quizzes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.taskSet.id !== undefined) {
            this.subscribeToSaveResponse(this.taskSetService.update(this.taskSet));
        } else {
            this.subscribeToSaveResponse(this.taskSetService.create(this.taskSet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITaskSet>>) {
        result.subscribe((res: HttpResponse<ITaskSet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackQuizById(index: number, item: IQuiz) {
        return item.id;
    }
    get taskSet() {
        return this._taskSet;
    }

    set taskSet(taskSet: ITaskSet) {
        this._taskSet = taskSet;
    }
}
