import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareLocationDetailComponent } from './share-location-detail.component';

describe('ShareLocationDetailComponent', () => {
  let component: ShareLocationDetailComponent;
  let fixture: ComponentFixture<ShareLocationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareLocationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareLocationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
