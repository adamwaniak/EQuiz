import {NgModule} from '@angular/core';

import {QuizResolveRoutingModule} from './quiz-resolve-routing.module';
import {EQuizSharedModule} from 'app/shared';
import {QuizStartComponent} from './quiz-start/quiz-start.component';
import {QuizPasswordCheckComponent} from './quiz-password-check/quiz-password-check.component';
import {QuizCoreComponent} from './quiz-core/quiz-core.component';
import {QuizCoreNavigationComponent} from './quiz-core/quiz-core-navigation/quiz-core-navigation.component';
import {QuizCoreContentComponent} from './quiz-core/quiz-core-content/quiz-core-content.component';
import {QuizResultComponent} from './quiz-result/quiz-result.component';

@NgModule({
    imports: [EQuizSharedModule, QuizResolveRoutingModule],
    declarations: [QuizStartComponent, QuizPasswordCheckComponent,
        QuizCoreComponent, QuizCoreNavigationComponent, QuizCoreContentComponent, QuizResultComponent]
})
export class QuizResolveModule {}
