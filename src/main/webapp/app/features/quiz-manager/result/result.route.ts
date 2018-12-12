import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ResultListComponent} from 'app/features/quiz-manager/result/result-list/result-list.component';
import {IStudent, Student} from 'app/shared/model/student.model';
import {StudentService} from 'app/features/services/student.service';

@Injectable({providedIn: 'root'})
export class StudentResolve implements Resolve<IStudent> {
    constructor(private service: StudentService) {
    }

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
        path: 'quiz-manager/:quiz-id/results',
        component: ResultListComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,desc',
            pageTitle: 'Results',
            state: 'result'
        },
        canActivate: [UserRouteAccessService]
    }
];
