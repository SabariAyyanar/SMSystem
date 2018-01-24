import { Injectable ,OnInit} from '@angular/core';
import {MatDialog,MatSnackBar,MatSnackBarConfig,
  MatSnackBarVerticalPosition,
   MatSnackBarHorizontalPosition} from '@angular/material';
import {MydialogcomponentComponent} from '../mydialogcomponent/mydialogcomponent.component';
import { PaymentHistory } from '../models/paymentmodel';
import {MyeditdialogComponent} from '../dialog/myeditdialog/myeditdialog.component';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { tryParse } from 'selenium-webdriver/http';

@Injectable()
export class StorageService{

   
    constructor(private _http:HttpClient ,public dialog:MatDialog,public matSnackBar:MatSnackBar){
 
    }

    BaseUrl:string = 'http://localhost:2210';   
    BaseNodeUrl:string = 'http://localhost:3000';

    SearchIndexPosition(itemToSearch:any, listToSearch:any[]):any{      
    for(var key in listToSearch){
        if(listToSearch[key].Id === itemToSearch){
          return key;
        }
    }
  }

  SearchIndexPositionInDifferentTable(itemToSearch:any, listToSearch:any[]):any{      
    for(var key in listToSearch){
        if(listToSearch[key].employeeId === itemToSearch){
          return key;
        }
    }
  }

  
   
    openSnackbar(message:string){
        this.matSnackBar.open("Error During Processing. " + message,"Got It")
        setTimeout(()=>
            this.matSnackBar.dismiss()
        ,3000);
      }

      
      verticalTopPosition:MatSnackBarVerticalPosition = 'top';
      verticalBottomPosition:MatSnackBarVerticalPosition = 'bottom';
      horizontalRightPosition:MatSnackBarHorizontalPosition = 'right';
      horizontalLeftPosition:MatSnackBarHorizontalPosition = 'left';


      openSnackbarForSuccess(message:string){
        this.matSnackBar.open(message,"Got It")
        setTimeout(()=>
            this.matSnackBar.dismiss()
        ,3000);
      }

      openSnackbarForSuccessTopLeft(message:string){
        let config = new MatSnackBarConfig();
        config.horizontalPosition = this.horizontalLeftPosition;
        config.verticalPosition = this.verticalTopPosition;
        this.matSnackBar.open(message,"Got It",config)
        setTimeout(()=>
            this.matSnackBar.dismiss()
        ,3000);
      }

      openSnackbarForSuccessTopRight(message:string){
        let config = new MatSnackBarConfig();
        config.horizontalPosition = this.horizontalRightPosition;
        config.verticalPosition = this.verticalTopPosition;
        this.matSnackBar.open(message,"Got It",config)
        setTimeout(()=>
            this.matSnackBar.dismiss()
        ,3000);
      }

      openSnackbarForSuccessBottomLeft(message:string){
        let config = new MatSnackBarConfig();
        config.horizontalPosition = this.horizontalLeftPosition;
        config.verticalPosition = this.verticalBottomPosition;
        this.matSnackBar.open(message,"Got It",config)
        setTimeout(()=>
            this.matSnackBar.dismiss()
        ,3000);
      }

      openSnackbarForSuccessBottomRight(message:string){
        let config = new MatSnackBarConfig();
        config.horizontalPosition = this.horizontalRightPosition;
        config.verticalPosition = this.verticalBottomPosition;
        this.matSnackBar.open(message,"Got It",config)
        setTimeout(()=>
            this.matSnackBar.dismiss()
        ,3000);
      }


    openDialog(header:string,message:string,cancelbutton:string):string{
       let finalresult:string = "";
      let dialogRef = this.dialog.open(MydialogcomponentComponent,{
          width: '600px',
          data: [header,message,cancelbutton]
        });
        dialogRef.afterClosed().subscribe(result => {
          finalresult = result;
          return result;
        });

        return finalresult;
        
      }

      dialogRef:any;
      openDialogToWaitConfirmation(header:string,message:string,cancelbutton:string):MatDialog{
      
       this.dialogRef = this.dialog.open(MydialogcomponentComponent,{
           width: '600px',
           data: [header,message,cancelbutton],
           disableClose: true
         });

         return this.dialogRef;
         
       }

       dialogEditRef:any;
       openDialogToEditPayment(paymenthistory:PaymentHistory):MatDialog{
       
        this.dialogEditRef = this.dialog.open(MyeditdialogComponent,{
            width: '600px',
            data: [paymenthistory],
            disableClose: true
          });
 
          return this.dialogEditRef;
          
        }

        

}
