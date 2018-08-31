import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    StudentAnswerComponent,
    StudentAnswerDeleteDialogComponent,
    StudentAnswerDeletePopupComponent,
    StudentAnswerDetailComponent,
    studentAnswerPopupRoute,
    studentAnswerRoute,
    StudentAnswerUpdateComponent
} from './index';

const ENTITY_STATES = [...studentAnswerRoute, ...studentAnswerPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StudentAnswerComponent,
        StudentAnswerDetailComponent,
        StudentAnswerUpdateComponent,
        StudentAnswerDeleteDialogComponent,
        StudentAnswerDeletePopupComponent
    ],
    entryComponents: [
        StudentAnswerComponent,
        StudentAnswerUpdateComponent,
        StudentAnswerDeleteDialogComponent,
        StudentAnswerDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizStudentAnswerModule {}
