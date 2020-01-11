import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    private popupDialogRef: MatDialogRef<PopupComponent>, // referencing material dialog box in a component
    @Inject(MAT_DIALOG_DATA) private data: any // inject material dialog data configurations in a variable
  ) { }

  ngOnInit() {
  }

  close(type) {
    this.popupDialogRef.close(type);
  }

}
