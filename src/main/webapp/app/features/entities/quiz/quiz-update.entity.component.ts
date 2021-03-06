import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IQuiz } from 'app/shared/model/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-quiz-update',
    templateUrl: './quiz-update.entity.component.html'
})
export class QuizUpdateEntityComponent implements OnInit {
    private _quiz: IQuiz;
    isSaving: boolean;

    users: IUser[];
    startDate: string;
    endDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private quizService: QuizService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ quiz }) => {
            this.quiz = quiz;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.quiz.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.quiz.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.quiz.id !== undefined) {
            this.subscribeToSaveResponse(this.quizService.update(this.quiz));
        } else {
            this.subscribeToSaveResponse(this.quizService.create(this.quiz));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQuiz>>) {
        result.subscribe((res: HttpResponse<IQuiz>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get quiz() {
        return this._quiz;
    }

    set quiz(quiz: IQuiz) {
        this._quiz = quiz;
        this.startDate = moment(quiz.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(quiz.endDate).format(DATE_TIME_FORMAT);
    }
}
