import { Route } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { AuditsComponent } from './audits.component';

export const auditsRoute: Route = {
    path: 'admin/audits',
    component: AuditsComponent,
    resolve: {
        pagingParams: JhiResolvePagingParams
    },
    data: {
        pageTitle: 'Audits',
        defaulSort: 'auditEventDate,desc',
        state: 'audits'
    }
};
