import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { QuizModule } from 'app/features/quiz-manager/quiz/quiz.module';
import { TaskSetModule } from 'app/features/quiz-manager/task-set/task-set.module';

@NgModule({
    imports: [QuizModule, TaskSetModule],
    declarations: [],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizManagerModule {}
