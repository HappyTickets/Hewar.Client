import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { IRegisterCompany } from '../models/register/iregister-company';
import { IApiResponse } from '../../../shared/models/IApiResponse';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a company', () => {
    const mockCompany: IRegisterCompany = {
      email: 'test@test.com',
      phone: '0123456789',
      password: 'Password123!',
      name: 'Test Company',
      imageUrl: 'https://example.com/image.png',
      address: '123 Test St',
    };

    const mockResponse: IApiResponse<IRegisterCompany> = {
      status: 200,
      isSuccess: true,
      errorCode: 0,
      message: 'Company registered successfully',
      errors: null,
      data: mockCompany,
    };

    service.registerCompany(mockCompany).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      'http://188.138.101.4:6852/api/Authentication/registerCompany'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle error when registering a company', () => {
    const mockCompany: IRegisterCompany = {
      email: 'test@test.com',
      phone: '0123456789',
      password: 'Password123!',
      name: 'Test Company',
      imageUrl: 'https://example.com/image.png',
      address: '123 Test St',
    };

    const mockErrorResponse = {
      status: 400,
      isSuccess: false,
      errorCode: 5,
      message: 'One or more validations have occurred',
      errors: [
        'Email is not in a valid format!',
        'Invalid password! ensure that it contains at least 8 characters, at least one digit, at least one capital and one small letters, and at least one special character',
      ],
      data: null,
    };

    service.registerCompany(mockCompany).subscribe(
      () => fail('expected an error, not a response'),
      (error) => {
        expect(error.message).toContain('Error Code: 400');
      }
    );

    const req = httpMock.expectOne(
      'http://188.138.101.4:6852/api/Authentication/registerCompany'
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });
  });
});
