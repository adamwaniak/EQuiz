import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { IQuiz } from 'app/shared/model/quiz.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { QuizResolve } from 'app/shared/model/quiz-resolve.model';

@Injectable({
    providedIn: 'root'
})
export class QuizResolveService {
    private resourceUrl = SERVER_API_URL + 'api/resolve';

    constructor(private http: HttpClient) {}

    getQuizForResolve(id: number): Observable<HttpResponse<QuizResolve>> {
        return this.http.get<IQuiz>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
