/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';

import { StudentAnswer } from 'app/shared/model/student-answer.model';
import { StudentAnswerService, StudentAnswerUpdateComponent } from 'app/features/entities/student-answer';

describe('Component Tests', () => {
    describe('StudentAnswer Management Update Component', () => {
        let comp: StudentAnswerUpdateComponent;
        let fixture: ComponentFixture<StudentAnswerUpdateComponent>;
        let service: StudentAnswerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [StudentAnswerUpdateComponent]
            })
                .overrideTemplate(StudentAnswerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StudentAnswerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentAnswerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new StudentAnswer(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.studentAnswer = entity;
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
                    const entity = new StudentAnswer();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.studentAnswer = entity;
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
