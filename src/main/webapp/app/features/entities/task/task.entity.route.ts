import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from '../../services/task.service';
import { TaskEntityComponent } from './task.entity.component';
import { TaskDetailEntityComponent } from './task-detail.entity.component';
import { TaskUpdateEntityComponent } from './task-update.entity.component';
import { TaskDeleteEntityPopupComponent } from './task-delete-dialog.entity.component';

@Injectable({ providedIn: 'root' })
export class TaskResolve implements Resolve<ITask> {
    constructor(private service: TaskService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((task: HttpResponse<Task>) => task.body));
        }
        return of(new Task());
    }
}

export const taskEntityRoute: Routes = [
    {
        path: 'task',
        component: TaskEntityComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task/:id/view',
        component: TaskDetailEntityComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task/new',
        component: TaskUpdateEntityComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'task/:id/edit',
        component: TaskUpdateEntityComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskPopupRoute: Routes = [
    {
        path: 'task/:id/delete',
        component: TaskDeleteEntityPopupComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
