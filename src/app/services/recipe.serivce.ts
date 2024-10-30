import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesSubject = new BehaviorSubject<any[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getTopProducedRecipes(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get(`${environment.apiUrl}Recipe/TopProduced`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAllRecipes(
    pageNumber: number,
    pageSize: number,
    filter?: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (filter) {
      params = params.set('filter', filter);
    }

    return this.httpClient.get(`${environment.apiUrl}Recipe`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      params,
    });
  }

  createRecipe(recipeData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.post(`${environment.apiUrl}Recipe`, recipeData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getRecipeById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get(`${environment.apiUrl}Recipe/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateRecipe(id: string, recipeData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.put(
      `${environment.apiUrl}Recipe/${id}`,
      recipeData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deleteRecipe(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(`${environment.apiUrl}Recipe/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateRecipesList(): void {
    this.getTopProducedRecipes().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.recipesSubject.next(response.data.topProducedRecipes);
        }
      },
      error: (error) =>
        console.error(
          'Erro ao atualizar a lista de receitas mais produzidas:',
          error
        ),
    });
  }

  notifyRecipesUpdated(): void {
    this.updateRecipesList();
  }
}
