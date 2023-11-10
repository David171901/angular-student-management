import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SideBarComponent } from './side-bar.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    TestBed.configureTestingModule({
      declarations: [SideBarComponent],
      imports: [MatListModule, MatIconModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.logout() on logout()', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

});
