import { Component, Inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialog } from "./dialog/confirmation-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class AppShared {

    constructor(private dialog: MatDialog) {

    }

    public showConfirm(message: string, buttonText: string[]) {
        const dialogRef = this.dialog.open(ConfirmationDialog, {
            data: {
                message,
                buttonText: {
                    ok: buttonText[0] || 'Sure',
                    cancel: buttonText[1] || 'Cancel'
                }
            }
        });
        return dialogRef.afterClosed();
    }
}