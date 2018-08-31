import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    TaskSetComponent,
    TaskSetDeleteDialogComponent,
    TaskSetDeletePopupComponent,
    TaskSetDetailComponent,
    taskSetPopupRoute,
    taskSetRoute,
    TaskSetUpdateComponent
} from './index';

const ENTITY_STATES = [...taskSetRoute, ...taskSetPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaskSetComponent,
        TaskSetDetailComponent,
        TaskSetUpdateComponent,
        TaskSetDeleteDialogComponent,
        TaskSetDeletePopupComponent
    ],
    entryComponents: [TaskSetComponent, TaskSetUpdateComponent, TaskSetDeleteDialogComponent, TaskSetDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizTaskSetModule {}
