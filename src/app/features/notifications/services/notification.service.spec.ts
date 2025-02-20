// import { TestBed } from '@angular/core/testing';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { NotificationService } from './notification.service';
// import { IResponse } from '../../../core/models/IResponse';

// describe('NotificationService', () => {
//   let service: NotificationService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [NotificationService],
//     });

//     service = TestBed.inject(NotificationService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify(); // Ensure no outstanding requests remain
//   });

//   it('should fetch all notifications', () => {
//     const mockResponse: IResponse<string[]> = {
//       status: 200,
//       isSuccess: true,
//       errorCode: 0,
//       successCode: 951,
//       data: [],
//     };

//     service.getAllNotifications().subscribe((response) => {
//       expect(response).toEqual(mockResponse);
//     });

//     const req = httpMock.expectOne('/api/notifications/getAll');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockResponse);
//   });

//   it('should fetch unread notifications count', () => {
//     const mockResponse: IResponse<number> = {
//       status: 200,
//       isSuccess: true,
//       errorCode: 0,
//       successCode: 952,
//       data: 0,
//     };

//     service.getUnreadNotificationsCount().subscribe((response) => {
//       expect(response).toEqual(mockResponse);
//     });

//     const req = httpMock.expectOne('/api/notifications/countUnRead');
//     expect(req.request.method).toBe('GET');
//     req.flush(mockResponse);
//   });

//   it('should mark a notification as read', () => {
//     const id = 123;
//     const mockResponse: IResponse<null> = {
//       status: 404,
//       isSuccess: false,
//       errorCode: 1,
//       successCode: 0,
//       data: null,
//     };

//     service.markNotificationAsRead(id).subscribe((response) => {
//       expect(response).toEqual(mockResponse);
//     });

//     const req = httpMock.expectOne(`/api/notifications/countUnRead/${id}`);
//     expect(req.request.method).toBe('PATCH');
//     req.flush(mockResponse);
//   });
// });
