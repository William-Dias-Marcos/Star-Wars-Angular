import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.development';
import { Character, CharacterDetails } from '../../interface/starwars';

@Injectable({
  providedIn: 'root',
})
export class StarwarsService {
  private apiUrl = environment.apiUrl;
  private data!: CharacterDetails;

  constructor(private http: HttpClient) {}

  setData(data: CharacterDetails) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getCharacterByName(name: string): Observable<CharacterDetails> {
    return this.http
      .get<{ results: Character[] }>(`${this.apiUrl}people/?search=${name}`)
      .pipe(map((response) => response.results[0]));
  }

  getMultipleUrls(urls: string[]): Observable<any[]> {
    console.log('URLs:', urls); // Verifique se as URLs estão corretas
    const requests = urls.map((url) =>
      this.http.get(url).pipe(
        catchError((error) => {
          console.error(`Erro ao fazer requisição para ${url}`, error);
          // Retorna um Observable vazio ou um objeto padrão em caso de erro
          return of(null);
        })
      )
    );
    return forkJoin(requests);
  }
}
