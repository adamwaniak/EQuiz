import { Route } from '@angular/router';

import { LogsComponent } from './logs.component';

export const logsRoute: Route = {
    path: 'admin/logs',
    component: LogsComponent,
    data: {
        pageTitle: 'Logs',
        state: 'logs'
    }
};
