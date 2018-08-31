import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudentAnswer, StudentAnswer } from 'app/shared/model/student-answer.model';
import { StudentAnswerService } from '../../services/student-answer.service';
import { StudentAnswerComponent } from './student-answer.component';
import { StudentAnswerDetailComponent } from './student-answer-detail.component';
import { StudentAnswerUpdateComponent } from './student-answer-update.component';
import { StudentAnswerDeletePopupComponent } from './student-answer-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class StudentAnswerResolve implements Resolve<IStudentAnswer> {
    constructor(private service: StudentAnswerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((studentAnswer: HttpResponse<StudentAnswer>) => studentAnswer.body));
        }
        return of(new StudentAnswer());
    }
}

export const studentAnswerRoute: Routes = [
    {
        path: 'student-answer',
        component: StudentAnswerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'StudentAnswers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-answer/:id/view',
        component: StudentAnswerDetailComponent,
        resolve: {
            studentAnswer: StudentAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAnswers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-answer/new',
        component: StudentAnswerUpdateComponent,
        resolve: {
            studentAnswer: StudentAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAnswers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-answer/:id/edit',
        component: StudentAnswerUpdateComponent,
        resolve: {
            studentAnswer: StudentAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAnswers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentAnswerPopupRoute: Routes = [
    {
        path: 'student-answer/:id/delete',
        component: StudentAnswerDeletePopupComponent,
        resolve: {
            studentAnswer: StudentAnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'StudentAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
