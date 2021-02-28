import { Component, OnInit , Inject} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-dialog',
  templateUrl: './bottom-sheet-dialog.component.html',
  styleUrls: ['./bottom-sheet-dialog.component.css']
})
export class BottomSheetDialogComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetDialogComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit() {
  }
  closeSheet() {
    this.bottomSheetRef.dismiss();
  }

}
