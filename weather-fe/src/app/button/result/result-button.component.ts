import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector : 'app-result-button',
    templateUrl :'./result-button.component.html'
})
export class ResultButtonComponent {
    constructor() {}
    @Output() showTable = new EventEmitter<number>();
    @Input() buttonClick : boolean = true;
    @Output() setButton = new EventEmitter<number>();
    displayTable() {
        this.showTable.emit(0);
        this.setButton.emit(0);
    }
}