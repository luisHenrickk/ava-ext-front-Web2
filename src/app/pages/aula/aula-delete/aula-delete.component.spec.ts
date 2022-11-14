import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulaDeleteComponent } from './aula-delete.component';

describe('AulaDeleteComponent', () => {
  let component: AulaDeleteComponent;
  let fixture: ComponentFixture<AulaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulaDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
