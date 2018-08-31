import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import { EQuizAdminModule } from 'app/admin/admin.module';
import {
    QuizComponent,
    QuizDeleteDialogComponent,
    QuizDeletePopupComponent,
    QuizDetailComponent,
    quizPopupRoute,
    quizRoute,
    QuizUpdateComponent
} from './index';

const ENTITY_STATES = [...quizRoute, ...quizPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, EQuizAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [QuizComponent, QuizDetailComponent, QuizUpdateComponent, QuizDeleteDialogComponent, QuizDeletePopupComponent],
    entryComponents: [QuizComponent, QuizUpdateComponent, QuizDeleteDialogComponent, QuizDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizQuizModule {}
