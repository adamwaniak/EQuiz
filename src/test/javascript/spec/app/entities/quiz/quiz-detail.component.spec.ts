/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';

import { Quiz } from 'app/shared/model/quiz.model';
import { QuizDetailEntityComponent } from 'app/features/entities/quiz';

describe('Component Tests', () => {
    describe('Quiz Management Detail Component', () => {
        let comp: QuizDetailEntityComponent;
        let fixture: ComponentFixture<QuizDetailEntityComponent>;
        const route = ({ data: of({ quiz: new Quiz(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [QuizDetailEntityComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QuizDetailEntityComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QuizDetailEntityComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.quiz).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
