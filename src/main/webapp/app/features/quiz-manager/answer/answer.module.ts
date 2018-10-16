import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { answerPopupRoute, answerRoute } from 'app/features/quiz-manager/answer/answer.route';
import { EQuizSharedModule } from 'app/shared';
import { AnswerComponent } from 'app/features/quiz-manager/answer/answer.component';
import { AnswerDetailComponent } from 'app/features/quiz-manager/answer/answer-detail.component';
import { AnswerUpdateComponent } from 'app/features/quiz-manager/answer/answer-update.component';
import { AnswerDeleteDialogComponent, AnswerDeletePopupComponent } from 'app/features/quiz-manager/answer/answer-delete-dialog.component';

const ENTITY_STATES = [...answerRoute, ...answerPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AnswerComponent, AnswerDetailComponent, AnswerUpdateComponent, AnswerDeleteDialogComponent, AnswerDeletePopupComponent],
    entryComponents: [AnswerComponent, AnswerUpdateComponent, AnswerDeleteDialogComponent, AnswerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnswerModule {}
