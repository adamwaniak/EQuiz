import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer, IAnswer } from 'app/shared/model/answer.model';
import { AnswerService } from '../../services/answer.service';
import { AnswerEntityComponent } from './answer.entity.component';
import { AnswerDetailEntityComponent } from './answer-detail.entity.component';
import { AnswerUpdateEntityComponent } from './answer-update.entity.component';
import { AnswerDeletePopupEntityComponent } from './answer-delete-dialog.entity.component';

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

export const answerEntityRoute: Routes = [
    {
        path: 'answer',
        component: AnswerEntityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answer/:id/view',
        component: AnswerDetailEntityComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answer/new',
        component: AnswerUpdateEntityComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'answer/:id/edit',
        component: AnswerUpdateEntityComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const answerPopupRoute: Routes = [
    {
        path: 'answer/:id/delete',
        component: AnswerDeletePopupEntityComponent,
        resolve: {
            answer: AnswerResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Answers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
