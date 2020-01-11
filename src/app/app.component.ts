import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  popupDialogRef: MatDialogRef<PopupComponent>; // referencing the component as a material dialog box

  isPlayerOne: boolean = true;
  isActive: boolean = true;
  isPopup: boolean = true;

  gridTotal: number = 9;
  grids: any = [];

  keyCodes: any = [ 55, 56, 57, 52, 53, 54, 49, 50, 51 ];

  patternsObj: any = [
    [ 1, 1, 1, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 1, 1, 1, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0, 0, 1, 1, 1 ],
    [ 1, 0, 0, 1, 0, 0, 1, 0, 0 ],
    [ 0, 1, 0, 0, 1, 0, 0, 1, 0 ],
    [ 0, 0, 1, 0, 0, 1, 0, 0, 1 ],
    [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ],
    [ 0, 0, 1, 0, 1, 0, 1, 0, 0 ],
  ];

  scoreLogs: any = [];

  playerOneCount: number = 0;
  playerTwoCount: number = 0;

  @HostListener("document:keypress", ['$event'])
  private onKeyDown(event) {
    this.checkInputCode(event.keyCode); // check the keyCode
  }

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {
    this.initGrids();
  }

  initGrids() {
    this.grids = [];
    for( let i = 1; i <= this.gridTotal; i++ ) { // populate grid properties with empty values
      this.grids.push({
        id: i,
        value: ''
      });
    }
  }

  checkInputCode(keyCode) {
    this.keyCodes.map((key, index) => { // get the id for specifieds keyCode
      if( keyCode == key ) {
        this.setValue(index + 1);
      }
    })
  }

  setValue(id) {
    if( this.isActive ) {
      this.playerOneCount = 0;
      this.playerTwoCount = 0;
      let currentValue = this.grids.filter(opt => opt.id == id)[0].value;
      if( currentValue == '' ) { // check if grid has no value
        if( this.isPlayerOne ) {
          this.grids.filter(opt => opt.id == id)[0].value = 'X'; // set X if player one
        } else {
          this.grids.filter(opt => opt.id == id)[0].value = 'O'; // set O if player two
        }
        this.checkValue();
        this.togglePlayer(); // toggle player upon placing your move
      }
    }
  }

  togglePlayer() {
    this.isPlayerOne = !this.isPlayerOne; // toggle change player
  }

  checkValue() {
    this.scoreLogs = []; // empty score logs
    this.patternsObj.map((patternArr) => {
      patternArr.map((pattern, j) => {
        if( pattern == 1 && this.grids[j].value != '' ) {
          this.checkMove(this.grids[j].value);
        }
      });
      this.countScore();
      this.playerOneCount = 0;
      this.playerTwoCount = 0;
    });
    this.checkLogs();
  }

  checkMove(move) {
    // count moves for each pattern if the same
    if( move == 'X' ) {
      this.playerOneCount += 1;
      this.scoreLogs.push(this.playerOneCount);
    } else if( move == 'O' ) {
      this.playerTwoCount += 1;
      this.scoreLogs.push(this.playerTwoCount);
    }
  }

  countScore() {
      if( this.playerOneCount == 3 ) {
        this.openPopup('Player X Won!');
        this.isActive = false;
      } else if( this.playerTwoCount == 3 ) {
        this.openPopup('Player O Won!');
        this.isActive = false;
      }
  }

  checkLogs() {
    // check if all grids are placed and both players are the same in score
    if( this.grids.filter(opt => opt.value == '').length == 0 && this.scoreLogs.indexOf(3) === -1 ) {
      this.openPopup('Cat\'s Game!');
      this.isActive = false;
    }
  }

  restart() {
    this.playerOneCount = 0;
    this.playerTwoCount = 0;
    this.isPlayerOne = true;
    this.isActive = true;
    this.isPopup = true;
    this.initGrids();
  }

  openPopup(message) {
    if( this.isPopup ) {
      this.isPopup = false;
      let dialogConfig = new MatDialogConfig(); // instantiate dialog config of material dialog box
      dialogConfig.disableClose = true;
      dialogConfig.minWidth = '335px';
      dialogConfig.data = { // modal details
        message: message,
      };
      this.popupDialogRef = this.dialog.open(PopupComponent, dialogConfig);
      this.checkPopup(); // check dialog state
    }
  }

  checkPopup() {
    this.popupDialogRef.afterClosed().subscribe(result => { // subscribe to result of dialog box
      if( result == 'done' ) {
        this.restart();
      }
    });
  }

}
