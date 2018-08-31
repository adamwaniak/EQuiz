import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    AnswerComponent,
    AnswerDeleteDialogComponent,
    AnswerDeletePopupComponent,
    AnswerDetailComponent,
    answerPopupRoute,
    answerRoute,
    AnswerUpdateComponent
} from './index';

const ENTITY_STATES = [...answerRoute, ...answerPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AnswerComponent, AnswerDetailComponent, AnswerUpdateComponent, AnswerDeleteDialogComponent, AnswerDeletePopupComponent],
    entryComponents: [AnswerComponent, AnswerUpdateComponent, AnswerDeleteDialogComponent, AnswerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizAnswerModule {}
