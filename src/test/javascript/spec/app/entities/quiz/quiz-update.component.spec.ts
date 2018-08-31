/* tslint:disable max-line-length */
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';

import {EQuizTestModule} from '../../../test.module';

import {Quiz} from 'app/shared/model/quiz.model';
import {QuizService, QuizUpdateEntityComponent} from 'app/features/entities/quiz';

describe('Component Tests', () => {
    describe('Quiz Management Update Component', () => {
        let comp: QuizUpdateEntityComponent;
        let fixture: ComponentFixture<QuizUpdateEntityComponent>;
        let service: QuizService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [QuizUpdateEntityComponent]
            })
                .overrideTemplate(QuizUpdateEntityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QuizUpdateEntityComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QuizService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Quiz(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quiz = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Quiz();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.quiz = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
