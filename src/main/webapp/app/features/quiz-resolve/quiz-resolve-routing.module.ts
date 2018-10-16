import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizStartComponent} from 'app/features/quiz-resolve/quiz-start/quiz-start.component';
import {QuizPasswordCheckComponent} from 'app/features/quiz-resolve/quiz-password-check/quiz-password-check.component';
import {QuizCoreComponent} from 'app/features/quiz-resolve/quiz-core/quiz-core.component';

const routes: Routes = [
    {
        path: 'quiz/:code',
        component: QuizPasswordCheckComponent,
        data: {
            state: 'quiz-password-check'
        }
    },
    {
        path: 'quiz/:code/password',
        component: QuizPasswordCheckComponent,
        data: {
            state: 'quiz-password-check'
        }
    },
    {
        path: 'quiz/:code/start',
        component: QuizStartComponent,
        data: {
            state: 'quiz-start'
        }
    },
    {
        path: 'quiz/:code/start/:active-task',
        component: QuizCoreComponent,
        data: {
            state: 'quiz-core'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizResolveRoutingModule {}
