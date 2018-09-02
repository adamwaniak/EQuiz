import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudent, Student } from 'app/shared/model/student.model';
import { StudentService } from '../../services/student.service';
import { StudentComponent } from './student.component';
import { StudentDetailComponent } from './student-detail.component';
import { StudentUpdateComponent } from './student-update.component';
import { StudentDeletePopupComponent } from './student-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class StudentResolve implements Resolve<IStudent> {
    constructor(private service: StudentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((student: HttpResponse<Student>) => student.body));
        }
        return of(new Student());
    }
}

export const studentRoute: Routes = [
    {
        path: 'student',
        component: StudentComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            defaultSort: 'id,asc',
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student/:id/view',
        component: StudentDetailComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student/new',
        component: StudentUpdateComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student/:id/edit',
        component: StudentUpdateComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student/:id/delete',
        component: StudentDeletePopupComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Students'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
