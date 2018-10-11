import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    AnswerDeleteDialogEntityComponent,
    AnswerDeletePopupEntityComponent,
    AnswerDetailEntityComponent,
    AnswerEntityComponent,
    answerEntityRoute,
    answerPopupRoute,
    AnswerUpdateEntityComponent
} from './index';

const ENTITY_STATES = [...answerEntityRoute, ...answerPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnswerEntityComponent,
        AnswerDetailEntityComponent,
        AnswerUpdateEntityComponent,
        AnswerDeleteDialogEntityComponent,
        AnswerDeletePopupEntityComponent
    ],
    entryComponents: [
        AnswerEntityComponent,
        AnswerUpdateEntityComponent,
        AnswerDeleteDialogEntityComponent,
        AnswerDeletePopupEntityComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizAnswerModule {}
