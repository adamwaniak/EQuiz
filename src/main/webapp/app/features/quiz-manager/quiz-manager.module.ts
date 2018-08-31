import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {QuizModule} from 'app/features/quiz-manager/quiz-list/quiz.module';

@NgModule({
    imports: [QuizModule],
    declarations: [],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizManagerModule {}
