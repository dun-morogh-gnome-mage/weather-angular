import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
// import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { titleComponent } from './title/title.component';
import { tableComponent } from './table/table.component';
import { formComponent } from './form/form.component';
import { progressbarComponent } from './progress/progressbar.component';
import { navigationComponent } from './nav/navigation.component';
import { detailChartComponent } from './chart/detail-chart.component';
import { chartComponent } from './chart/chart.component';
import { detailTable } from './table/table-detail/table.detail.component';
import { mapComponent } from './map/map.component';
import { favoriteCityComponent} from './button/favorite-city/favorite-city.component';
import { favoriteListComponent } from './table/favorite-list/favorite-list.component';
import { favoriteButtonComponent } from './button/favorite/favorite-button.component';
import { ResultButtonComponent } from './button/result/result-button.component';

@NgModule({
  declarations: [
    AppComponent,
    formComponent,
    progressbarComponent,
    tableComponent,
    titleComponent,
    navigationComponent,
    detailChartComponent,
    chartComponent,
    detailTable,
    mapComponent,
    favoriteCityComponent,
    favoriteListComponent,
    favoriteButtonComponent,
    ResultButtonComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyCF-ApUa_YU-7nGr6ZIWZxddO8s-GHMZr0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
