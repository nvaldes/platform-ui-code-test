import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { ListComponent } from "./list/list.component";
import { PhonePipe } from "./phone/phone.pipe";

@NgModule({
  declarations: [AppComponent, ListComponent, PhonePipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
