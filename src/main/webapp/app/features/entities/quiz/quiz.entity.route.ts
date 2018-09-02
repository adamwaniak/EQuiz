import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IQuiz, Quiz } from 'app/shared/model/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { QuizEntityComponent } from './quiz.entity.component';
import { QuizDetailEntityComponent } from './quiz-detail.entity.component';
import { QuizUpdateEntityComponent } from './quiz-update.entity.component';
import { QuizEntityDeletePopupComponent } from './quiz-delete-dialog.entity.component';

@Injectable({ providedIn: 'root' })
export class QuizResolve implements Resolve<IQuiz> {
    constructor(private service: QuizService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((quiz: HttpResponse<Quiz>) => quiz.body));
        }
        return of(new Quiz());
    }
}

export const quizEntityRoute: Routes = [
    {
        path: 'quiz',
        component: QuizEntityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz/:id/view',
        component: QuizDetailEntityComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz/new',
        component: QuizUpdateEntityComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz/:id/edit',
        component: QuizUpdateEntityComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizPopupRoute: Routes = [
    {
        path: 'quiz/:id/delete',
        component: QuizEntityDeletePopupComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
