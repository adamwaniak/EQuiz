import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EQuizSharedModule } from 'app/shared';
import {
    TaskDeleteDialogComponent,
    TaskDeletePopupComponent
} from 'app/features/quiz-manager/task/task-delete-dialog/task-delete-dialog.component';
import { TaskUpdateComponent } from 'app/features/quiz-manager/task/task-update/task-update.component';
import { TaskDetailComponent } from 'app/features/quiz-manager/task/task-detail/task-detail.component';
import { TaskListComponent } from 'app/features/quiz-manager/task/task-list/task-list.component';
import { taskPopupRoute, taskRoute } from 'app/features/quiz-manager/task/task.route';

const ENTITY_STATES = [...taskRoute, ...taskPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TaskListComponent, TaskDetailComponent, TaskUpdateComponent, TaskDeleteDialogComponent, TaskDeletePopupComponent],
    entryComponents: [TaskListComponent, TaskUpdateComponent, TaskDeleteDialogComponent, TaskDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskModule {}
