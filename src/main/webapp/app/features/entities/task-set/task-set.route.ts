import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITaskSet, TaskSet } from 'app/shared/model/task-set.model';
import { TaskSetService } from '../../services/task-set.service';
import { TaskSetComponent } from './task-set.component';
import { TaskSetDetailComponent } from './task-set-detail.component';
import { TaskSetUpdateComponent } from './task-set-update.component';
import { TaskSetDeletePopupComponent } from './task-set-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class TaskSetResolve implements Resolve<ITaskSet> {
    constructor(private service: TaskSetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((taskSet: HttpResponse<TaskSet>) => taskSet.body));
        }
        return of(new TaskSet());
    }
}

export const taskSetRoute: Routes = [
    {
        path: 'task-set',
        component: TaskSetComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'TaskSets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-set/:id/view',
        component: TaskSetDetailComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TaskSets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-set/new',
        component: TaskSetUpdateComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TaskSets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task-set/:id/edit',
        component: TaskSetUpdateComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TaskSets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskSetPopupRoute: Routes = [
    {
        path: 'task-set/:id/delete',
        component: TaskSetDeletePopupComponent,
        resolve: {
            taskSet: TaskSetResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TaskSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
