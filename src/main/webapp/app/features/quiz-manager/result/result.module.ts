import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ResultListComponent} from './result-list/result-list.component';
import {studentRoute} from 'app/features/quiz-manager/result/result.route';
import {EQuizSharedModule} from 'app/shared';
import {EQuizAdminModule} from 'app/admin/admin.module';
import {RouterModule} from '@angular/router';

const ROUTES = [...studentRoute];

@NgModule({
    imports: [EQuizSharedModule, EQuizAdminModule, RouterModule.forChild(ROUTES)],
    declarations: [ResultListComponent],
    entryComponents: [ResultListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultModule {
}
