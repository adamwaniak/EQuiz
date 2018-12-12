import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {QuizModule} from 'app/features/quiz-manager/quiz/quiz.module';
import {TaskSetModule} from 'app/features/quiz-manager/task-set/task-set.module';
import {TaskModule} from 'app/features/quiz-manager/task/task.module';
import {AnswerModule} from 'app/features/quiz-manager/answer/answer.module';
import {ResultModule} from 'app/features/quiz-manager/result/result.module';

@NgModule({
    imports: [QuizModule, TaskSetModule, TaskModule, AnswerModule, ResultModule],
    declarations: [],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizManagerModule {}
