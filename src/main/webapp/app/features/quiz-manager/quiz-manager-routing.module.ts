import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from 'app/features/quiz-manager/quiz-list/quiz-list.component';
import { QuizTaskSetListComponent } from 'app/features/quiz-manager/quiz-task-set-list/quiz-task-set-list.component';
import { QuizManagerContainerComponent } from 'app/features/quiz-manager/container/quiz-manager-container.component';
import { UserRouteAccessService } from 'app/core';

const routes: Routes = [
    {
        path: '',
        component: QuizManagerContainerComponent,
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Quizzes'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: '',
                component: QuizListComponent
            },
            {
                path: ':id/task-set-list',
                component: QuizTaskSetListComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuizManagerRoutingModule {}
