/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';
import { TaskSetUpdateComponent } from 'app/entities/task-set/task-set-update.component';
import { TaskSetService } from 'app/entities/task-set/task-set.service';
import { TaskSet } from 'app/shared/model/task-set.model';

describe('Component Tests', () => {
    describe('TaskSet Management Update Component', () => {
        let comp: TaskSetUpdateComponent;
        let fixture: ComponentFixture<TaskSetUpdateComponent>;
        let service: TaskSetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [TaskSetUpdateComponent]
            })
                .overrideTemplate(TaskSetUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskSetUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaskSetService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TaskSet(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.taskSet = entity;
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
                    const entity = new TaskSet();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.taskSet = entity;
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
