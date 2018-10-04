import { Route } from '@angular/router';

import { JhiDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'admin/docs',
    component: JhiDocsComponent,
    data: {
        pageTitle: 'API',
        state: 'api'
    }
};
