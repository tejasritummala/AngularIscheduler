import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExcelService } from '../../../HelperServices/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ImportUserService } from './import-user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BottomSheetDialogComponent } from '../../../shared/Dialogs/bottom-sheet-dialog/bottom-sheet-dialog.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-import-user',
  templateUrl: './import-user.component.html',
  styleUrls: ['./import-user.component.css']
})
export class ImportUserComponent implements OnInit {

  @ViewChild('inputFile', { static: false }) Fileinput: ElementRef;
  fileUploaded: File;
  isDisabled = true;
  filename = '';
  private onDestroy$: Subject<void> = new Subject<void>();
  // tslint:disable-next-line: max-line-length
  constructor(private bottomSheet: MatBottomSheet, private excelservice: ExcelService, private snackBar: MatSnackBar, private location: Location, private importUserService: ImportUserService) { }
  ngOnInit() {
  }

  /** Download sample import user template  */
  templatedownload() {
    this.excelservice.exportAsExcelFile([{
      first_name: '',
      last_name: '',
      email_id: '',
      user_type: ''
    }], 'UserexcelTemplate');
  }
  /** Upload excel file to add users  */
  uploadedFiles(event) {

    this.fileUploaded = event.target.files[0];
    const checkfileext = this.checkfile(this.fileUploaded);
    if (checkfileext) {
      this.isDisabled = false;
      this.filename = this.fileUploaded.name;
    } else {
      this.Fileinput.nativeElement.value = '';
      event.target.value = '';
    }
  }


  /** Check for excel file type  */
  checkfile(sender) {
    const validExts = new Array('.xlsx', '.xls');
    let fileExt = sender.name;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      this.snackBar.open('Invalid file selected, valid files are of ' +
        validExts.toString() + ' types.', '', {
        duration: 4000,
      });
      return false;
    } else {
      return true;
    }
  }


  /** Service call for Importing user  */
  importuser() {
    if (this.filename.length > 0) {
      const formData = new FormData();
      formData.append('file', this.fileUploaded);
      this.importUserService.importUserFile(formData).pipe(takeUntil(this.onDestroy$)).subscribe((data: any) => {
        if (data.code === 201) {
          this.filename = '';
          this.Fileinput.nativeElement.value = '';
          this.importUserService.importUserFileName(data).pipe(takeUntil(this.onDestroy$)).subscribe((finaldata: any) => {

            const bottomSheetRef = this.bottomSheet.open(BottomSheetDialogComponent, {
              data: finaldata,
            });

            bottomSheetRef.afterDismissed().subscribe(() => {
              bottomSheetRef.dismiss();
            });

          }, error => {

          });
        }

      }, error => {

      });

    } else {
      this.snackBar.open('Please Add file to upload', '', {
        duration: 4000,
      });

    }


  }


  /** Cancelation of addusers */
  cancel() {
    this.location.back();
  }
  remove() {
    this.filename = '';
     this.Fileinput.nativeElement.value = '';
  }



  /** Drag and drop  of excel file  */
  public dropped(files: NgxFileDropEntry[]) {
    const fileEntry = files[0].fileEntry as FileSystemFileEntry;
    this.doAsyncTask(fileEntry).then(
      (val) => {
        if (val) {
          // this.snackBar.open( 'File sucessfully uploaded' , '', {
          //   duration: 2000,
          // });
          this.filename = this.fileUploaded.name;
        }
      },
      (err) => console.error(err)
    );
  }
  doAsyncTask(fileEntry) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Async Work Complete');
        fileEntry.file((file: File) => {
          this.fileUploaded = file;
          const checkfileext = this.checkfile(this.fileUploaded);
          if (checkfileext) {
            this.isDisabled = false;
            resolve(true);
          }
        });
      }, 1000);
    });
    return promise;
  }
  // tslint:disable-next-line: use-lifecycle-interface
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy$.unsubscribe();
  }
}
