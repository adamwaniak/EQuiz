/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { EQuizTestModule } from '../../../test.module';
import { TaskSet } from 'app/shared/model/task-set.model';
import { TaskSetService, TaskSetUpdateEntityComponent } from 'app/features/entities/task-set';

describe('Component Tests', () => {
    describe('TaskSet Management Update Component', () => {
        let comp: TaskSetUpdateEntityComponent;
        let fixture: ComponentFixture<TaskSetUpdateEntityComponent>;
        let service: TaskSetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EQuizTestModule],
                declarations: [TaskSetUpdateEntityComponent]
            })
                .overrideTemplate(TaskSetUpdateEntityComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaskSetUpdateEntityComponent);
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
