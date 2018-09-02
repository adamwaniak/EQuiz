import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EQuizSharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { EQuizAdminModule } from 'app/admin/admin.module';
import { taskSetPopupRoute, taskSetRoute } from 'app/features/quiz-manager/task-set/task-set.route';
import { TaskSetDetailComponent } from 'app/features/quiz-manager/task-set/task-set-detail/task-set-detail.component';
import { TaskSetUpdateComponent } from 'app/features/quiz-manager/task-set/task-set-update/task-set-update.component';
import {
    TaskSetDeleteDialogComponent,
    TaskSetDeletePopupComponent
} from 'app/features/quiz-manager/task-set/task-set-delete-dialog/task-set-delete-dialog.component';
import { TaskSetListComponent } from 'app/features/quiz-manager/task-set/task-set-list/task-set-list.component';

const ROUTES = [...taskSetRoute, ...taskSetPopupRoute];

@NgModule({
    imports: [EQuizSharedModule, EQuizAdminModule, RouterModule.forChild(ROUTES)],
    declarations: [
        TaskSetListComponent,
        TaskSetDetailComponent,
        TaskSetUpdateComponent,
        TaskSetDeleteDialogComponent,
        TaskSetDeletePopupComponent
    ],
    entryComponents: [TaskSetListComponent, TaskSetUpdateComponent, TaskSetDeleteDialogComponent, TaskSetDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskSetModule {}
