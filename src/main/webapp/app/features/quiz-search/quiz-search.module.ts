import { NgModule } from '@angular/core';
import { QuizSearchComponent } from './quiz-search.component';
import { RouterModule, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { EQuizSharedModule } from 'app/shared';
import { EQuizAdminModule } from 'app/admin/admin.module';

const searchRoute: Routes = [
    {
        path: 'search',
        component: QuizSearchComponent,
        data: {
            pageTitle: 'Search',
            state: 'search'
        },
        canActivate: [UserRouteAccessService],
        resolve: {
            pagingParams: JhiResolvePagingParams
        }
    }
];

@NgModule({
    imports: [EQuizSharedModule, EQuizAdminModule, RouterModule.forChild(searchRoute)],
    declarations: [QuizSearchComponent]
})
export class QuizSearchModule {}
