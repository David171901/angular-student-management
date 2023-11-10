import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, CookieService],
    });
  });

  it('should send credentials and set token in cookies', inject(
    [AuthService, HttpTestingController],
    (service: AuthService, httpMock: HttpTestingController) => {
      const mockResponse = { token: 'dummyToken' };
      const username = 'testUser';
      const password = 'testPassword';

      service.sendCredentials(username, password).subscribe((res) => {
        expect(res).toEqual(mockResponse);
        expect(service['_cookie'].get('token')).toBe('dummyToken');
      });

      const req = httpMock.expectOne('https://dummyjson.com/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      httpMock.verify();
    }
  ));

  it('should delete token from cookies and navigate to /auth', inject(
    [AuthService],
    (service: AuthService) => {
      const cookieService = service['_cookie'];
      spyOn(cookieService, 'delete');
      spyOn(service['router'], 'navigate');

      service.logout();

      expect(cookieService.delete).toHaveBeenCalledWith('token');
      expect(service['router'].navigate).toHaveBeenCalledWith(['/','auth']);
    }
  ));
});
