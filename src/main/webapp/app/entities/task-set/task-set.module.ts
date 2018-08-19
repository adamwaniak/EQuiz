import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    TaskSetComponent,
    TaskSetDetailComponent,
    TaskSetUpdateComponent,
    TaskSetDeletePopupComponent,
    TaskSetDeleteDialogComponent,
    taskSetRoute,
    taskSetPopupRoute
} from './';

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
