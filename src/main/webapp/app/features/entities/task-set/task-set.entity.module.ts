import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    TaskSetDeleteDialogEntityComponent,
    TaskSetDeletePopupEntityComponent,
    TaskSetDetailEntityComponent,
    TaskSetEntityComponent,
    taskSetEntityPopupRoute,
    taskSetEntityRoute,
    TaskSetUpdateEntityComponent
} from './index';

const ENTITY_STATES = [...taskSetEntityRoute, ...taskSetEntityPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaskSetEntityComponent,
        TaskSetDetailEntityComponent,
        TaskSetUpdateEntityComponent,
        TaskSetDeleteDialogEntityComponent,
        TaskSetDeletePopupEntityComponent
    ],
    entryComponents: [
        TaskSetEntityComponent,
        TaskSetUpdateEntityComponent,
        TaskSetDeleteDialogEntityComponent,
        TaskSetDeletePopupEntityComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizTaskSetEntityModule {}
