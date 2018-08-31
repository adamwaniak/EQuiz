import './vendor.ts';

import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LocalStorageService, Ng2Webstorage, SessionStorageService} from 'ngx-webstorage';
import {JhiEventManager} from 'ng-jhipster';

import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {EQuizSharedModule} from 'app/shared';
import {EQuizCoreModule} from 'app/core';
import {EQuizAppRoutingModule} from './app-routing.module';
import {EQuizHomeModule} from 'app/home';
import {EQuizAccountModule} from './account/account.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {ErrorComponent, FooterComponent, JhiMainComponent, NavbarComponent, PageRibbonComponent} from './layouts';
import {QuizManagerModule} from 'app/features/quiz-manager/quiz-manager.module';
import {EntityModule} from 'app/features/entities/entity.module';

@NgModule({
    imports: [
        BrowserModule,
        EQuizAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        EQuizSharedModule,
        EQuizCoreModule,
        EQuizHomeModule,
        EQuizAccountModule,
        EntityModule,
        QuizManagerModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class EQuizAppModule {}
