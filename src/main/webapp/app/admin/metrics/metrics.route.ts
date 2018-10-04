import { Route } from '@angular/router';

import { JhiMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'admin/jhi-metrics',
    component: JhiMetricsMonitoringComponent,
    data: {
        pageTitle: 'Application Metrics',
        state: 'metrics'
    }
};
