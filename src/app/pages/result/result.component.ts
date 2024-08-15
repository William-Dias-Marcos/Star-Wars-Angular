import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CharacterDetails } from '../../interface/starwars';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';
import { StarwarsService } from '../../services/starwars/starwars.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { DetailsListComponent } from '../../components/details-list/details-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'wdm-result',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    LoadingComponent,
    DetailsListComponent,
  ],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  characterDetails!: CharacterDetails;

  films: any[] = [];
  species: any[] = [];
  starships: any[] = [];
  vehicles: any[] = [];
  planets: any[] = [];

  loading = true;
  pendingRequests = 0;

  router = inject(Router);
  starwarsService = inject(StarwarsService);

  ngOnInit(): void {
    this.characterDetails = this.starwarsService.getData();

    if (!this.characterDetails) {
      this.router.navigate(['/search']);
      return;
    }

    const fetchDetails = (urls: string[], targetArray: any[]) => {
      if (urls?.length) {
        this.pendingRequests++;
        this.starwarsService.getMultipleUrls(urls).subscribe(
          (responses) => {
            targetArray.push(...responses);
            this.checkLoading();
          },
          (error) => {
            console.error('Erro ao fazer requisições', error);
            this.checkLoading();
          }
        );
      }
    };

    fetchDetails(this.characterDetails.films, this.films);
    fetchDetails(this.characterDetails.species, this.species);
    fetchDetails(this.characterDetails.starships, this.starships);
    fetchDetails(this.characterDetails.vehicles, this.vehicles);
    if (this.characterDetails.homeworld) {
      fetchDetails([this.characterDetails.homeworld], this.planets);
    }

    if (this.pendingRequests === 0) {
      this.loading = false;
    }
  }

  checkLoading() {
    this.pendingRequests--;
    if (this.pendingRequests === 0) {
      this.loading = false;
    }
  }
}
