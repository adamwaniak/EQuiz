import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeatureComponent } from './feature.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTE } from 'app/home';
import { EQuizSharedModule } from 'app/shared';
import { FEATURE_ROUTE } from 'app/features/feature.route';
import { ListQuizComponent } from 'app/features/list-quiz/list-quiz.component';

@NgModule({
    // prettier-ignore
    imports: [
        EQuizSharedModule, RouterModule.forChild([FEATURE_ROUTE])
    ],
    declarations: [FeatureComponent, ListQuizComponent],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EQuizFeatureModule {}
