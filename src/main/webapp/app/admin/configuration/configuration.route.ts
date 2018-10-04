import { Route } from '@angular/router';

import { JhiConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'admin/jhi-configuration',
    component: JhiConfigurationComponent,
    data: {
        pageTitle: 'Configuration',
        state: 'configuration'
    }
};
