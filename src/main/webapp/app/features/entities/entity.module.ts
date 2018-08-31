import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { EQuizEntityModule } from './quiz/quiz.entity.module';
import { EQuizTaskModule } from './task/task.module';
import { EQuizTaskSetModule } from './task-set/task-set.module';
import { EQuizAnswerModule } from './answer/answer.module';
import { EQuizStudentModule } from './student/student.module';
import { EQuizStudentAnswerModule } from './student-answer/student-answer.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EQuizEntityModule,
        EQuizTaskModule,
        EQuizTaskSetModule,
        EQuizAnswerModule,
        EQuizStudentModule,
        EQuizStudentAnswerModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntityModule {}
