import { Component, Input } from '@angular/core';

@Component( {
    selector : 'app-google-map',
    templateUrl : './map.component.html',
    styles : [`
                agm-map {
                    height: 600px;
                    width : 100%;
                }
            `]
})
export class mapComponent {

  @Input() lat : number;
  @Input() lng : number;
  constructor() {}

}

