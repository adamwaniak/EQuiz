import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import { EQuizAdminModule } from 'app/admin/admin.module';
import {
    QuizEntityComponent,
    QuizDeleteDialogEntityComponent,
    QuizEntityDeletePopupComponent,
    QuizDetailEntityComponent,
    quizPopupRoute,
    quizEntityRoute,
    QuizUpdateEntityComponent
} from './index';

const ENTITY_STATES = [...quizEntityRoute, ...quizPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, EQuizAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        QuizEntityComponent,
        QuizDetailEntityComponent,
        QuizUpdateEntityComponent,
        QuizDeleteDialogEntityComponent,
        QuizEntityDeletePopupComponent
    ],
    entryComponents: [QuizEntityComponent, QuizUpdateEntityComponent, QuizDeleteDialogEntityComponent, QuizEntityDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizEntityModule {}
