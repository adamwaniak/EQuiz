import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudentAnswer } from 'app/shared/model/student-answer.model';

type EntityResponseType = HttpResponse<IStudentAnswer>;
type EntityArrayResponseType = HttpResponse<IStudentAnswer[]>;

@Injectable({ providedIn: 'root' })
export class StudentAnswerService {
    private resourceUrl = SERVER_API_URL + 'api/student-answers';

    constructor(private http: HttpClient) {}

    create(studentAnswer: IStudentAnswer): Observable<EntityResponseType> {
        return this.http.post<IStudentAnswer>(this.resourceUrl, studentAnswer, { observe: 'response' });
    }

    update(studentAnswer: IStudentAnswer): Observable<EntityResponseType> {
        return this.http.put<IStudentAnswer>(this.resourceUrl, studentAnswer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStudentAnswer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStudentAnswer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
