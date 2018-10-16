import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer, IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from 'app/features/services/answer.service';
import { AnswerComponent } from 'app/features/quiz-manager/answer/answer.component';
import { UserRouteAccessService } from 'app/core';
import { AnswerDetailComponent } from 'app/features/quiz-manager/answer/answer-detail.component';
import { AnswerUpdateComponent } from 'app/features/quiz-manager/answer/answer-update.component';
import { AnswerDeletePopupComponent } from 'app/features/quiz-manager/answer/answer-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class AnswerResolve implements Resolve<IAnswer> {
    constructor(private service: AnswerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((answer: HttpResponse<Answer>) => answer.body));
        }
        return of(new Answer());
    }
}

export const answerRoute: Routes = [
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:task-id/answers',
        component: AnswerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            defaultSort: 'id,asc',
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:task-id/answer/:id/view',
        component: AnswerDetailComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:task-id/answer/new',
        component: AnswerUpdateComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:task-id/answer/:id/edit',
        component: AnswerUpdateComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const answerPopupRoute: Routes = [
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:task-id/answer/:id/delete',
        component: AnswerDeletePopupComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
