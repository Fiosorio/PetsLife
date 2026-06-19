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
  private catImageUrl ='https://api.thecatapi.com/v1/images/search';
  private dogImageUrl = 'https://api.thedogapi.com/v1/images/search';
                                                                                                                 private dogFacts: string[] = [
                                                                                                                     "Acute Hearing: Dogs can hear sounds at much higher frequencies than humans, reaching up to 65,000 Hz. This allows them to perceive sounds that we cannot, like the whistle of a mouse or a distant doorbell.",
                                                                                                                                                                                                                                "Unique Nose Print: A dog's nose print is as unique as a human fingerprint. The patterns of ridges and creases on their noses are specific to each dog, allowing for individual identification.",
                                                                                                                    "Body Language Communication: Dogs communicate their emotions primarily through body language. Tail movements, postures, and facial expressions are key to understanding how they feel.",
                                                                                                                    "Smallest Dog: The Chihuahua is the smallest dog breed, weighing as little as 2 pounds (0.9 kg). Despite their size, they have big personalities and can be very protective.",
                                                                                                                    "Olfactory Memory: Dogs have such a powerful olfactory memory that they can remember scents for years. This allows them to identify people and other animals by their smell, even after a long time.",
                                                                                                                    "Variety of Breeds: There are over 340 recognized dog breeds worldwide, each with distinct physical traits and temperaments. This diversity allows them to adapt to various lifestyles and environments.",
                                                                                                                    "Therapy Dogs: Dogs are used in therapy to help people cope with stress and anxiety. Their presence can have a calming effect and contribute to emotional well-being.",
                                                                                                                    "Varied Diet: Although they are carnivorous by nature, dogs can digest a variety of foods, including grains and vegetables. However, their diet must be balanced to ensure their health.",
                                                                                                                    "Dogs and Cold Weather: Some dog breeds are better adapted to cold weather than others, such as Siberian Huskies, which have a dense coat that protects them from extreme temperatures.",
                                                                                                                    "Dogs in History: Dogs have been companions to humans for over 14,000 years, playing important roles in various cultures throughout history."
                                                                                                                      ];

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

  getRandomDogFact(): string {
    const randomIndex = Math.floor(Math.random() * this.dogFacts.length);
    return this.dogFacts[randomIndex];
  }
}

