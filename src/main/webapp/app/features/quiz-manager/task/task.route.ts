import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from '../../services/task.service';
import { TaskListComponent } from 'app/features/quiz-manager/task/task-list/task-list.component';
import { TaskDetailComponent } from 'app/features/quiz-manager/task/task-detail/task-detail.component';
import { TaskUpdateComponent } from 'app/features/quiz-manager/task/task-update/task-update.component';
import { TaskDeletePopupComponent } from 'app/features/quiz-manager/task/task-delete-dialog/task-delete-dialog.component';

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

export const taskRoute: Routes = [
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task',
        component: TaskListComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:id/view',
        component: TaskDetailComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/new',
        component: TaskUpdateComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:id/edit',
        component: TaskUpdateComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taskPopupRoute: Routes = [
    {
        path: 'quiz-manager/:quiz-id/task-set/:task-set-id/task/:id/delete',
        component: TaskDeletePopupComponent,
        resolve: {
            task: TaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tasks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
