import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private catApiKey = 'live_SwWuHo1gsLGVOLLn09ZnbuvcHUwmZ00ZG7Uqv4sBDZAZNPiPzTnEuiYoOpxkU77q';
  private dogApiKey = 'live_aSkdEoY2oxZ9Xz657uDQSgfuK9Ukym8n4mmZMEJMDpV9w05to8DpLaEdJeXaPnYV';
  private catApiUrl = 'https://api.thecatapi.com/v1/breeds';
  private dogApiUrl = 'https://api.thedogapi.com/v1/breeds';

  constructor(private http: HttpClient) {}

  getCatBreeds(): Observable<any> {
    return this.http.get(this.catApiUrl, {
      headers: { 'x-api-key': this.catApiKey }
    });
  }

  getDogBreeds(): Observable<any> {
    return this.http.get(this.dogApiUrl, {
      headers: { 'x-api-key': this.dogApiKey }
    });
  }
}

