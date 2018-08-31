import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IQuiz, Quiz } from 'app/shared/model/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { QuizComponent } from './quiz.component';
import { QuizDetailComponent } from './quiz-detail.component';
import { QuizUpdateComponent } from './quiz-update.component';
import { QuizDeletePopupComponent } from './quiz-delete-dialog.component';

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

export const quizRoute: Routes = [
    {
        path: 'quiz',
        component: QuizComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz/:id/view',
        component: QuizDetailComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz/new',
        component: QuizUpdateComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz/:id/edit',
        component: QuizUpdateComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const quizPopupRoute: Routes = [
    {
        path: 'quiz/:id/delete',
        component: QuizDeletePopupComponent,
        resolve: {
            quiz: QuizResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];