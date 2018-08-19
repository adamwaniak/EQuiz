/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';
import { StudentAnswerUpdateComponent } from 'app/entities/student-answer/student-answer-update.component';
import { StudentAnswerService } from 'app/entities/student-answer/student-answer.service';
import { StudentAnswer } from 'app/shared/model/student-answer.model';

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
