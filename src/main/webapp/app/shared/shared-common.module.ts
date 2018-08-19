import { NgModule } from '@angular/core';

import { EQuizSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EQuizSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EQuizSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EQuizSharedCommonModule {}
