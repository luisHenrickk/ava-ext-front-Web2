import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoComponent } from './avaliacao.component';

describe('AvaliacaoListComponent', () => {
  let component: AvaliacaoComponent;
  let fixture: ComponentFixture<AvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvaliacaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
