import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoCreateComponent } from './avaliacao-create.component';

describe('AvaliacaoCreateComponent', () => {
  let component: AvaliacaoCreateComponent;
  let fixture: ComponentFixture<AvaliacaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaliacaoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
