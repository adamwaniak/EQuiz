import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { QuizListComponent } from 'app/features/quiz-manager/quiz-list/quiz-list.component';
import { QuizTaskSetListComponent } from 'app/features/quiz-manager/quiz-task-set-list/quiz-task-set-list.component';
import { UserRouteAccessService } from 'app/core';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IQuiz, Quiz } from 'app/shared/model/quiz.model';
import { QuizService } from 'app/features/services/quiz.service';
import { of } from 'rxjs/index';
import { QuizDetailComponent } from 'app/features/quiz-manager/quiz-list/quiz-detail/quiz-detail.component';
import { QuizUpdateComponent } from 'app/features/quiz-manager/quiz-list/quiz-update/quiz-update.component';
import { QuizDeletePopupComponent } from 'app/features/quiz-manager/quiz-list/quiz-delete-dialog/quiz-delete-dialog.component';

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

export const QUIZ_ROUTES: Routes = [
    {
        path: 'quiz-manager',
        component: QuizListComponent,
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'startDate,asc'
        },
        canActivate: [UserRouteAccessService],
        resolve: {
            pagingParams: JhiResolvePagingParams
        }
    },
    {
        path: 'quiz-manager/:id/view',
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
        path: 'quiz-manager/new',
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
        path: 'quiz-manager/:id/edit',
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
        path: 'quiz-manager/:id/delete',
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
