import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/services/petsapi.service';

@Component({
  selector: 'app-datos-r',
  templateUrl: './datos-r.component.html',
  styleUrls: ['./datos-r.component.scss'],
})
export class DatosRComponent implements OnInit {
  catFact: string;
  dogFact: string;
  catImageUrl: string;
  dogImageUrl: string;
  selectedCatBreed: string;

  constructor(private petService: PetService) {}

  ngOnInit() {
    
    this.loadCatBreedFact();
    this.loadCatImage();
    this.loadDogFact(); 
    this.loadDogImage(); 
  }

  
  loadCatBreedFact() {
    this.petService.getCatBreeds().subscribe(data => {
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedBreed = data[randomIndex];
        this.catFact = selectedBreed.description || 'No hay datos disponibles.'; 
        this.selectedCatBreed = selectedBreed.name; 
        this.loadCatImage(this.selectedCatBreed); 
      } else {
        this.catFact = 'No hay razas disponibles.';
      }
    });
  }

  
  loadDogFact() {
    this.dogFact = this.petService.getRandomDogFact(); 
  }

  loadCatImage(breed?: string) {
    const breedQuery = breed ? `?breed_ids=${breed.toLowerCase()}` : ''; 
    this.petService.getRandomCatImage().subscribe(data => {
      if (data && data.length > 0) {
        this.catImageUrl = data[0].url; 
      } else {
        this.catImageUrl = 'No hay imagen de gato disponible.';
      }
    });
  }

loadDogImage() {
  this.petService.getRandomDogImage().subscribe(data => {
      if (data && data.length > 0) { 
          this.dogImageUrl = data[0].url; 
      } else {
          this.dogImageUrl = 'No hay imagen de perro disponible.';
      }
  });
}

}
