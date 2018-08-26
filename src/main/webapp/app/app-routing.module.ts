import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const ROUTES = [{ path: 'quiz-manager', loadChildren: './features/quiz-manager/quiz-manager.module#QuizManagerModule' }];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#EQuizAdminModule'
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        ),
        RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: DEBUG_INFO_ENABLED })
    ],
    exports: [RouterModule]
})
export class EQuizAppRoutingModule {}
