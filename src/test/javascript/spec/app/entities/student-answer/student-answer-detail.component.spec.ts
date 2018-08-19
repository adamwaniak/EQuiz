/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';
import { StudentAnswerDetailComponent } from 'app/entities/student-answer/student-answer-detail.component';
import { StudentAnswer } from 'app/shared/model/student-answer.model';

describe('Component Tests', () => {
    describe('StudentAnswer Management Detail Component', () => {
        let comp: StudentAnswerDetailComponent;
        let fixture: ComponentFixture<StudentAnswerDetailComponent>;
        const route = ({ data: of({ studentAnswer: new StudentAnswer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [StudentAnswerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StudentAnswerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StudentAnswerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.studentAnswer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
