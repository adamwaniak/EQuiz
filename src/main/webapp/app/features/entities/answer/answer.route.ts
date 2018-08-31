import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer, IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from '../../services/answer.service';
import { AnswerComponent } from './answer.component';
import { AnswerDetailComponent } from './answer-detail.component';
import { AnswerUpdateComponent } from './answer-update.component';
import { AnswerDeletePopupComponent } from './answer-delete-dialog.component';

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
        path: 'answer',
        component: AnswerComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answer/:id/view',
        component: AnswerDetailComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answer/new',
        component: AnswerUpdateComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answer/:id/edit',
        component: AnswerUpdateComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const answerPopupRoute: Routes = [
    {
        path: 'answer/:id/delete',
        component: AnswerDeletePopupComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
