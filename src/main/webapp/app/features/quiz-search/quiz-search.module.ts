import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSearchComponent } from './quiz-search.component';
import { RouterModule, Routes } from '@angular/router';

const searchRoute: Routes = [
    {
        path: 'search',
        component: QuizSearchComponent,
        data: {
            pageTitle: 'Search',
            state: 'search'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(searchRoute, { enableTracing: true }), CommonModule],
    declarations: [QuizSearchComponent]
})
export class QuizSearchModule {}
