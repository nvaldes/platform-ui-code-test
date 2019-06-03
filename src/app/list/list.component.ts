import { Component, OnInit } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";

const defaultProviders = [
  {
    id: "1",
    name: "John",
    address: "123 Greenway Blvd",
    phone: "8991234321"
  },
  {
    id: "2",
    name: "Mary",
    address: "443 Windwhisper Road",
    phone: "2233211903"
  },
  {
    id: "3",
    name: "Jason",
    address: "9992 Pumpkin Hollow",
    phone: "4343219384"
  }
];

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  public providersLoading = true;
  public selectionLoading = true;
  public selectedProviders = [];
  public unselectedProviders = [];

  constructor(private localStorage: LocalStorage) {}

  ngOnInit() {
    this.localStorage.getItem("unselectedProviders").subscribe({
      next: value => {
        if (value !== null) {
          this.unselectedProviders = value;
        } else {
          this.unselectedProviders = defaultProviders;
        }
      },
      complete: () => {
        this.providersLoading = false;
      }
    });
    this.localStorage.getItem("selectedProviders").subscribe({
      next: value => {
        if (value !== null) {
          this.selectedProviders = value;
        } else {
          this.selectedProviders = [];
        }
      },
      complete: () => {
        this.selectionLoading = false;
      }
    });
  }

  selectProvider(provider) {
    this.selectedProviders.push(provider);
    this.selectedProviders.sort(this.compareProviders);
    this.localStorage.setItemSubscribe(
      "selectedProviders",
      this.selectedProviders
    );
    let index = this.unselectedProviders.indexOf(provider);
    this.unselectedProviders.splice(index, 1);
    this.localStorage.setItemSubscribe(
      "unselectedProviders",
      this.unselectedProviders
    );
  }

  deselectProvider(provider) {
    this.unselectedProviders.push(provider);
    this.unselectedProviders.sort(this.compareProviders);
    this.localStorage.setItemSubscribe(
      "selectedProviders",
      this.selectedProviders
    );
    let index = this.selectedProviders.indexOf(provider);
    this.selectedProviders.splice(index, 1);
    this.localStorage.setItemSubscribe(
      "unselectedProviders",
      this.unselectedProviders
    );
  }

  compareProviders(a, b) {
    //early-out if data cannot be compared
    if (
      a.id === undefined ||
      a.id === null ||
      b.id === undefined ||
      b.id === null
    ) {
      return 0;
    }
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
    return 0;
  }
}
