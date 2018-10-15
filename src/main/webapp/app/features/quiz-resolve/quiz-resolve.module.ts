import { NgModule } from '@angular/core';

import { QuizResolveRoutingModule } from './quiz-resolve-routing.module';
import { EQuizSharedModule } from 'app/shared';
import { QuizStartComponent } from './quiz-start/quiz-start.component';
import { QuizPasswordCheckComponent } from './quiz-password-check/quiz-password-check.component';
import { QuizCoreComponent } from './quiz-core/quiz-core.component';

@NgModule({
    imports: [EQuizSharedModule, QuizResolveRoutingModule],
    declarations: [QuizStartComponent, QuizPasswordCheckComponent, QuizCoreComponent]
})
export class QuizResolveModule {}
