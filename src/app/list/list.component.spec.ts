import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Observable } from "rxjs";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDividerModule
} from "@angular/material";
import { PhonePipe } from "../phone/phone.pipe";

import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store = {};
  const mockLocalStorage: Partial<LocalStorage> = {
    getItem: (key: string) => {
      return new Observable(subscriber => {
        subscriber.next(store[key] || null);
        subscriber.complete();
      });
    },
    setItemSubscribe(key: string, data: any) {
      store[key] = data;
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, PhonePipe],
      imports: [
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule
      ],
      providers: [{ provide: LocalStorage, useValue: mockLocalStorage }]
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it("should exist", () => {
    expect(component).toBeTruthy();
  });
  describe("default state", () => {
    describe("unselected providers", () => {
      it("should have an initial length of 3", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.unselectedProviders.length).toEqual(3);
        });
      });

      it("should have an id", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.unselectedProviders[0].id).toEqual("1");
        });
      });

      it("should have a name", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.unselectedProviders[0].name).toEqual("John");
        });
      });

      it("should have an address", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.unselectedProviders[0].address).toEqual(
            "123 Greenway Blvd"
          );
        });
      });

      it("should have a phone", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.unselectedProviders[0].phone).toEqual("8991234321");
        });
      });
    });

    describe("selected providers", () => {
      it("should have no initial length", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.selectedProviders.length).toEqual(0);
        });
      });
    });
  });
  describe("modified state", () => {
    let testedProvider;
    beforeAll(() => {
      testedProvider = component.unselectedProviders[1];
      component.selectProvider(testedProvider);
    });
    describe("select provider", () => {
      it("should add selected provider to selected list", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.selectedProviders.length).toEqual(1);
          expect(component.selectedProviders[0]).toEqual(testedProvider);
        });
      });
      it("should remove selected provider from unselected list", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.unselectedProviders.length).toEqual(2);
          expect(component.unselectedProviders.indexOf(testedProvider)).toEqual(
            -1
          );
        });
      });
    });
    describe("deselect provider", () => {
      beforeAll(() => {
        component.deselectProvider(testedProvider);
      });
      it("should remove deselected provider from selected list", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.selectedProviders.length).toEqual(0);
        });
      });
      it("should add deselected provider to unselected list in its original place", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.unselectedProviders.length).toEqual(3);
          expect(component.unselectedProviders.indexOf(testedProvider)).toEqual(
            1
          );
        });
      });
    });
  });
  describe("unusual states", () => {
    describe("compareProviders", () => {
      it("should return zero when arguments are not Providers", () => {
        expect(component.compareProviders("foo", "bar")).toEqual(0);
      });
      it("should return zero when arguments have the same ID", () => {
        let foo = {
          id: 123,
          name: "Foo"
        };
        let bar = {
          id: 123,
          name: "Bar"
        };
        expect(component.compareProviders(foo, bar)).toEqual(0);
      });
    });
  });
});
