import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITaskSet } from 'app/shared/model/task-set.model';

type EntityResponseType = HttpResponse<ITaskSet>;
type EntityArrayResponseType = HttpResponse<ITaskSet[]>;

@Injectable({ providedIn: 'root' })
export class TaskSetService {
    private resourceUrl = SERVER_API_URL + 'api/task-sets';

    constructor(private http: HttpClient) {}

    create(taskSet: ITaskSet): Observable<EntityResponseType> {
        return this.http.post<ITaskSet>(this.resourceUrl, taskSet, { observe: 'response' });
    }

    update(taskSet: ITaskSet): Observable<EntityResponseType> {
        return this.http.put<ITaskSet>(this.resourceUrl, taskSet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITaskSet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITaskSet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
