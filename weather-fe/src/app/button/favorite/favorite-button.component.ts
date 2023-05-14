import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector : 'app-favorite-button',
    templateUrl :'./favorite-button.component.html'
})
export class favoriteButtonComponent {
    constructor() {}
    @Output() clickLink = new EventEmitter<number>();
    @Input() buttonClick : boolean = false;;
    @Output() setButton = new EventEmitter<number>();
    displayList() {
        this.clickLink.emit(4);
        this.setButton.emit(1);
    }

}