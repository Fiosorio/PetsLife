import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetsFactsApi {
  private baseUrl = 'https://cat-fact.herokuapp.com/facts/random'; // API para hechos aleatorios de gatos
  private catApiKey = 'live_SwWuHo1gsLGVOLLn09ZnbuvcHUwmZ00ZG7Uqv4sBDZAZNPiPzTnEuiYoOpxkU77q';
  private dogApiKey = 'live_aSkdEoY2oxZ9Xz657uDQSgfuK9Ukym8n4mmZMEJMDpV9w05to8DpLaEdJeXaPnYV';
  private catImageUrl ='https://api.thecatapi.com/v1/images/search';
  private dogImageUrl = 'https://api.thedogapi.com/v1/images/search';

  constructor(private http: HttpClient) {}

  // Método para obtener un hecho aleatorio
  getRandomFact(animalType: string): Observable<any> {
    
    return this.http.get<any>(this.baseUrl).pipe(
      map(fact => {
        
        return fact.text.length > 40 ? fact : { text: 'No hay datos suficientes.' };
      })
    );
  }

  // Método para obtener una imagen aleatoria de un gato
  getRandomCatImage(): Observable<any> {
    return this.http.get<any>(this.catImageUrl, {
      headers: { 'x-api-key': this.catApiKey }
    });
  }

  // Método para obtener una imagen aleatoria de un perro
  getRandomDogImage(): Observable<any> {
    return this.http.get<any>(this.dogImageUrl, {
      headers: { 'x-api-key': this.dogApiKey }
    });
  }
}
