import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientsSubject = new BehaviorSubject<any[]>([]);
  ingredients$ = this.ingredientsSubject.asObservable();
  constructor(private httpClient: HttpClient) {}

  addIngredient(ingredient: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.post(environment.apiUrl + 'Ingredient', ingredient, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getAllIngredients(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get(environment.apiUrl + 'Ingredient', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  }

  getIngredients(
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

    return this.httpClient.get(environment.apiUrl + 'Ingredient', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      params: params,
    });
  }

  getIngredientById(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.get(`${environment.apiUrl}Ingredient/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateIngredient(id: string, ingredient: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.put(
      `${environment.apiUrl}Ingredient/${id}`,
      ingredient,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  updateIngredientsList(): void {
    this.getAllIngredients().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.ingredientsSubject.next(response.data.ingredients);
        }
      },
      error: (error) =>
        console.error('Erro ao atualizar a lista de ingredientes:', error),
    });
  }

  deleteProduct(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(`${environment.apiUrl}Ingredient/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getStockMovements(pageNumber: number, pageSize: number, dataInicial?: string, dataFinal?: string): Observable<any> {
    const token = localStorage.getItem('token');
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
  
    if (dataInicial) {
      params = params.set('dataInicial', dataInicial);
    }
    if (dataFinal) {
      params = params.set('dataFinal', dataFinal);
    }
  
    return this.httpClient.get(environment.apiUrl + 'StockMovement', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      params: params,
    });
  }
  

  notifyIngredientsUpdated(): void {
    this.updateIngredientsList();
  }
}
