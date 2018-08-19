import { Route } from '@angular/router';
import { FeatureComponent } from 'app/features/feature.component';
import { UserRouteAccessService } from 'app/core';

export const FEATURE_ROUTE: Route = {
    path: 'feature',
    component: FeatureComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Yours tests'
    },
    canActivate: [UserRouteAccessService]
};
