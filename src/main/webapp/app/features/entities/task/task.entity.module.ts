import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    TaskDeleteDialogEntityComponent,
    TaskDeleteEntityPopupComponent,
    TaskDetailEntityComponent,
    TaskEntityComponent,
    taskEntityRoute,
    taskPopupRoute,
    TaskUpdateEntityComponent
} from './index';

const ENTITY_STATES = [...taskEntityRoute, ...taskPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaskEntityComponent,
        TaskDetailEntityComponent,
        TaskUpdateEntityComponent,
        TaskDeleteDialogEntityComponent,
        TaskDeleteEntityPopupComponent
    ],
    entryComponents: [TaskEntityComponent, TaskUpdateEntityComponent, TaskDeleteDialogEntityComponent, TaskDeleteEntityPopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizTaskModule {}
