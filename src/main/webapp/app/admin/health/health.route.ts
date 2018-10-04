import { Route } from '@angular/router';

import { JhiHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'admin/jhi-health',
    component: JhiHealthCheckComponent,
    data: {
        pageTitle: 'Health Checks',
        state: 'health'
    }
};
