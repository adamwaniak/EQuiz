import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizManagerRoutingModule } from './quiz-manager-routing.module';
import { QuizListComponent } from 'app/features/quiz-manager/quiz-list/quiz-list.component';
import { QuizManagerContainerComponent } from './container/quiz-manager-container.component';
import { QuizTaskSetListComponent } from './quiz-task-set-list/quiz-task-set-list.component';

@NgModule({
    imports: [CommonModule, QuizManagerRoutingModule],
    declarations: [QuizListComponent, QuizManagerContainerComponent, QuizTaskSetListComponent],
    exports: [QuizManagerContainerComponent]
})
export class QuizManagerModule {}
