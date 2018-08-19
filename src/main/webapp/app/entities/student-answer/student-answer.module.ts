import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    StudentAnswerComponent,
    StudentAnswerDetailComponent,
    StudentAnswerUpdateComponent,
    StudentAnswerDeletePopupComponent,
    StudentAnswerDeleteDialogComponent,
    studentAnswerRoute,
    studentAnswerPopupRoute
} from './';

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
