import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoDeleteComponent } from './avaliacao-delete.component';

describe('AvaliacaoDeleteComponent', () => {
  let component: AvaliacaoDeleteComponent;
  let fixture: ComponentFixture<AvaliacaoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
