import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { Principal, User, UserService } from 'app/core';
import { UserMgmtComponent } from './user-management.component';
import { UserMgmtDetailComponent } from './user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management-update.component';

@Injectable({ providedIn: 'root' })
export class UserResolve implements CanActivate {
    constructor(private principal: Principal) {}

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}

@Injectable({ providedIn: 'root' })
export class UserMgmtResolve implements Resolve<any> {
    constructor(private service: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['login'] ? route.params['login'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new User();
    }
}

export const userMgmtRoute: Routes = [
    {
        path: 'admin/user-management',
        component: UserMgmtComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            pageTitle: 'admin/Users',
            defaultSort: 'id,asc',
            state: 'user-management'
        }
    },
    {
        path: 'admin/user-management/:login/view',
        component: UserMgmtDetailComponent,
        resolve: {
            user: UserMgmtResolve
        },
        data: {
            pageTitle: 'Users',
            state: 'user-management'
        }
    },
    {
        path: 'admin/user-management/new',
        component: UserMgmtUpdateComponent,
        resolve: {
            user: UserMgmtResolve
        },
        data: {
            state: 'user-management'
        }
    },
    {
        path: 'admin/user-management/:login/edit',
        component: UserMgmtUpdateComponent,
        resolve: {
            user: UserMgmtResolve
        },
        data: {
            state: 'user-management'
        }
    }
];
