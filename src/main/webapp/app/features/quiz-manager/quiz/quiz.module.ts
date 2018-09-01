import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import { EQuizAdminModule } from 'app/admin/admin.module';
import { QuizListComponent } from 'app/features/quiz-manager/quiz/quiz-list/quiz-list.component';
import { QuizDetailComponent } from 'app/features/quiz-manager/quiz/quiz-detail/quiz-detail.component';
import { QuizUpdateComponent } from 'app/features/quiz-manager/quiz/quiz-update/quiz-update.component';
import {
    QuizDeleteDialogComponent,
    QuizDeletePopupComponent
} from 'app/features/quiz-manager/quiz/quiz-delete-dialog/quiz-delete-dialog.component';
import { QUIZ_ROUTES } from 'app/features/quiz-manager/quiz/quiz.route';

const ENTITY_STATES = [...QUIZ_ROUTES];

@NgModule({
    imports: [EQuizSharedModule, EQuizAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [QuizListComponent, QuizDetailComponent, QuizUpdateComponent, QuizDeleteDialogComponent, QuizDeletePopupComponent],
    entryComponents: [QuizListComponent, QuizUpdateComponent, QuizDeleteDialogComponent, QuizDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizModule {}
