import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperaContraseniaPage } from './recupera-contrasenia.page';

describe('RecuperaContraseniaPage', () => {
  let component: RecuperaContraseniaPage;
  let fixture: ComponentFixture<RecuperaContraseniaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperaContraseniaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
