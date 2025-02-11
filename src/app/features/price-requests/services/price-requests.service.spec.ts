import { TestBed } from '@angular/core/testing';
// import { HttpTestingController } from '@angular/common/http/testing';
import { PriceRequestsService } from './price-requests.service';
import { ICreatePriceReq } from '../models/icreate-price-request';
import { IAcceptPriceReq } from '../models/IAcceptPriceReq';
import { IResponse } from '../../../core/models/IResponse';
import { ICreatePriceReqFacilityDetails } from '../models/ICreatePriceReqFacilityDetails';
import { IUpdatePriceReqFacilityDetails } from '../models/IUpdatePriceReqFacilityDetails';
import { ICreateRequestMessage } from '../models/ICreateRequestMessage';
import { IFacilityRequest } from '../models/IFacilityRequest';
import { ICompanyRequest } from '../models/ICompanyRequest';
import { IRequestFacilityDetails } from '../models/IRequestFacilityDetails';
import { IRequestMessage } from '../models/IRequestMessage';
import { SecurityRoles } from '../../../shared/enums/security-roles';
import { ShiftType } from '../../../shared/enums/shift-type';
import { ContractType } from '../../../shared/enums/contract-type';
import { provideHttpClient } from '@angular/common/http';

describe('PriceRequestsService', () => {
  let service: PriceRequestsService;
  // let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [PriceRequestsService, provideHttpClient()],
    });
    service = TestBed.inject(PriceRequestsService);
    // httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create a price request', () => {
    const mockRequest: ICreatePriceReq = {
      securityRole: SecurityRoles.Guard,
      guardsCount: 5,
      workShift: WorkShifts.Evening,
      contractType: ContractTypes.FullTime,
      startDate: 'String',
      endDate: 'String',
      description: 'String',
      companyId: 2,
    };

    service.createPriceRequest(mockRequest).subscribe((response) => {
      expect(response.data).toBeGreaterThan(0);
    });
  });

  it('should accept a price request', () => {
    const mockRequest: IAcceptPriceReq = {
      priceRequestId: 3,
      offer: '456',
    };
    const mockResponse: IResponse<null> = {
      status: 409,
      isSuccess: false,
      errorCode: 602,
      successCode: 0,
      data: null,
    };

    service.acceptPriceRequest(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should reject a price request', () => {
    const priceRequestId = 3;
    const mockResponse: IResponse<null> = {
      status: 409,
      isSuccess: false,
      errorCode: 602,
      successCode: 0,
      data: null,
    };

    service.rejectPriceRequest(priceRequestId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should cancel a price request', () => {
    const priceRequestId = 3;
    const mockResponse: IResponse<null> = {
      status: 409,
      isSuccess: false,
      errorCode: 602,
      successCode: 0,
      data: null,
    };

    service.cancelPriceRequest(priceRequestId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should fetch facility requests', () => {
    const mockResponse: IResponse<IFacilityRequest[]> = {
      status: 200,
      isSuccess: true,
      errorCode: 0,
      successCode: 505,
      data: [
        {
          id: 1,
          securityRole: 2,
          guardsCount: 5,
          workShift: 1,
          contractType: 1,
          startDate: '2024-12-27T08:59:58.543+00:00',
          endDate: '2024-12-27T17:59:58.543+00:00',
          description:
            'Night shift security for the premises. Responsible for monitoring security systems, performing patrols, and ensuring safety protocols are followed.',
          status: 2,
          offer: {
            id: 1,
            content: null,
            respondedDate: '2024-12-27T09:19:59.0882037+00:00',
          },
          company: {
            id: 7,
            name: 'John Doe',
            imageUrl: '',
            email: 'c@gmail.com',
            phoneNumber: '+1234567893',
          },
        },
        {
          id: 2,
          securityRole: 1,
          guardsCount: 4,
          workShift: 1,
          contractType: 1,
          startDate: '2024-12-27T13:04:00.872+00:00',
          endDate: '2024-12-27T13:04:00.872+00:00',
          description: 'string',
          status: 4,
          offer: null,
          company: {
            id: 7,
            name: 'John Doe',
            imageUrl: '',
            email: 'c@gmail.com',
            phoneNumber: '+1234567893',
          },
        },
        {
          id: 3,
          securityRole: 1,
          guardsCount: 30,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 2,
          offer: {
            id: 2,
            content: null,
            respondedDate: '2025-01-20T11:17:54.2871275+00:00',
          },
          company: {
            id: 1,
            name: 'Anas',
            imageUrl: '',
            email: 'anasamin2002f@gmail.com',
            phoneNumber: '+201032040677',
          },
        },
        {
          id: 4,
          securityRole: 1,
          guardsCount: 1,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:13:47.439+00:00',
          endDate: '2025-01-20T11:13:47.439+00:00',
          description: 'string',
          status: 1,
          offer: null,
          company: {
            id: 1,
            name: 'Anas',
            imageUrl: '',
            email: 'anasamin2002f@gmail.com',
            phoneNumber: '+201032040677',
          },
        },
        {
          id: 5,
          securityRole: 1,
          guardsCount: 3,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 1,
          offer: null,
          company: {
            id: 2,
            name: 'string',
            imageUrl: '',
            email: 'strin@xs.com',
            phoneNumber: 'string',
          },
        },
        {
          id: 6,
          securityRole: 1,
          guardsCount: 3,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 1,
          offer: null,
          company: {
            id: 5,
            name: 'fouad mohamed',
            imageUrl: '',
            email: 'fouad@gmail.com',
            phoneNumber: '+49 01155069179',
          },
        },
        {
          id: 7,
          securityRole: 1,
          guardsCount: 3,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 1,
          offer: null,
          company: {
            id: 5,
            name: 'fouad mohamed',
            imageUrl: '',
            email: 'fouad@gmail.com',
            phoneNumber: '+49 01155069179',
          },
        },
        {
          id: 8,
          securityRole: 1,
          guardsCount: 3,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 4,
          offer: null,
          company: {
            id: 5,
            name: 'fouad mohamed',
            imageUrl: '',
            email: 'fouad@gmail.com',
            phoneNumber: '+49 01155069179',
          },
        },
        {
          id: 9,
          securityRole: 1,
          guardsCount: 3,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 3,
          offer: null,
          company: {
            id: 5,
            name: 'fouad mohamed',
            imageUrl: '',
            email: 'fouad@gmail.com',
            phoneNumber: '+49 01155069179',
          },
        },
        {
          id: 10,
          securityRole: 1,
          guardsCount: 3,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 2,
          offer: {
            id: 3,
            content: null,
            respondedDate: '2025-01-20T11:18:14.9958196+00:00',
          },
          company: {
            id: 10,
            name: 'John Doe',
            imageUrl: 'https://example.com/profile.jpg',
            email: 'ct@gmail.com',
            phoneNumber: '+1234461890',
          },
        },
      ],
    };

    service.getMyPriceRequestsAsFacility().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should fetch company requests', () => {
    const mockResponse: IResponse<ICompanyRequest[]> = {
      status: 200,
      isSuccess: true,
      errorCode: 0,
      successCode: 506,
      data: [
        {
          id: 3,
          securityRole: 1,
          guardsCount: 30,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:02:16.225+00:00',
          endDate: '2025-01-20T11:02:16.225+00:00',
          description: 'string',
          status: 2,
          offer: {
            id: 2,
            content: null,
            respondedDate: '2025-01-20T11:17:54.2871275+00:00',
          },
          facility: {
            id: 1,
            name: 'New Facility',
            imageUrl: 'http://example.com/image.jpg',
            email: 'updatedemail@example.com',
            phoneNumber: '123456789',
          },
        },
        {
          id: 4,
          securityRole: 1,
          guardsCount: 1,
          workShift: 1,
          contractType: 1,
          startDate: '2025-01-20T11:13:47.439+00:00',
          endDate: '2025-01-20T11:13:47.439+00:00',
          description: 'string',
          status: 1,
          offer: null,
          facility: {
            id: 1,
            name: 'New Facility',
            imageUrl: 'http://example.com/image.jpg',
            email: 'updatedemail@example.com',
            phoneNumber: '123456789',
          },
        },
      ],
    };

    service.getMyPriceRequestsAsCompany().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should create facility details for a price request', () => {
    const mockRequest: ICreatePriceReqFacilityDetails = {
      facilityName: 'string',
      facilityEmail: 'string',
      facilityPhone: 'string',
      facilityAddress: 'string',
      facilitySize: 'string',
      facilityActivityType: 'string',
      facilityCommercialRegistrationNumber: 'string',
      facilityCommercialRegistrationExpiryDate: '2025-01-20T16:04:56.979Z',
      facilityLicenseNumber: 'string',
      facilityLicenseExpiryDate: '2025-01-20T16:04:56.979Z',
      facilityNotes: 'string',
      representativeName: 'string',
      representativeEmail: 'string',
      representativePhone: 'string',
      representativeNationalId: 'string',
      representativeNationality: 'string',
      representativeNotes: 'string',
      commissionerName: 'string',
      commissionerEmail: 'string',
      commissionerPhone: 'string',
      commissionerNationalId: 'string',
      commissionerNationality: 'string',
      commissionerNotes: 'string',
      priceRequestId: 0,
    };
    const mockResponse: IResponse<unknown> = {
      status: 400,
      isSuccess: false,
      errorCode: 5,
      successCode: 0,
      data: null,
    };

    service.createRequestFacilityDetails(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should update facility details for a price request', () => {
    const mockRequest: IUpdatePriceReqFacilityDetails = {
      facilityName: 'string',
      facilityEmail: 'string',
      facilityPhone: 'string',
      facilityAddress: 'string',
      facilitySize: 'string',
      facilityActivityType: 'string',
      facilityCommercialRegistrationNumber: 'string',
      facilityCommercialRegistrationExpiryDate: '2025-01-20T16:07:09.551Z',
      facilityLicenseNumber: 'string',
      facilityLicenseExpiryDate: '2025-01-20T16:07:09.551Z',
      facilityNotes: 'string',
      representativeName: 'string',
      representativeEmail: 'string',
      representativePhone: 'string',
      representativeNationalId: 'string',
      representativeNationality: 'string',
      representativeNotes: 'string',
      commissionerName: 'string',
      commissionerEmail: 'string',
      commissionerPhone: 'string',
      commissionerNationalId: 'string',
      commissionerNationality: 'string',
      commissionerNotes: 'string',
    };
    const facilityDetailsId = 2;
    const mockResponse: IResponse<unknown> = {
      status: 200,
      isSuccess: true,
      errorCode: 0,
      successCode: 503,
      data: {},
    };

    service
      .updateRequestFacilityDetails(mockRequest, facilityDetailsId)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
  });

  it('should fetch facility details of a price request', () => {
    const priceRequestId = 5;
    const mockResponse: IResponse<IRequestFacilityDetails> = {
      status: 200,
      isSuccess: true,
      errorCode: 0,
      successCode: 504,
      data: {
        id: 2,
        facilityName: 'string',
        facilityEmail: 'string',
        facilityPhone: 'string',
        facilityAddress: 'string',
        facilitySize: 'string',
        facilityActivityType: 'string',
        facilityCommercialRegistrationNumber: 'string',
        facilityCommercialRegistrationExpiryDate:
          '2025-01-20T16:07:09.551+00:00',
        facilityLicenseNumber: 'string',
        facilityLicenseExpiryDate: '2025-01-20T16:07:09.551+00:00',
        facilityNotes: 'string',
        representativeName: 'string',
        representativeEmail: 'string',
        representativePhone: 'string',
        representativeNationalId: 'string',
        representativeNationality: 'string',
        representativeNotes: 'string',
        commissionerName: 'string',
        commissionerEmail: 'string',
        commissionerPhone: 'string',
        commissionerNationalId: 'string',
        commissionerNationality: 'string',
        commissionerNotes: 'string',
      },
    };

    service
      .getPriceRequestFacilityDetails(priceRequestId)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
  });

  it('should create a request message', () => {
    const mockRequest: ICreateRequestMessage = {
      content: 'string',
      medias: [
        {
          type: 'string',
          url: 'string',
        },
      ],
      priceRequestId: 1,
    };
    const mockResponse: IResponse<unknown> = {
      status: 409,
      isSuccess: false,
      errorCode: 602,
      successCode: 0,
      data: null,
    };

    service.createRequestMessage(mockRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('should fetch messages for a request', () => {
    const requestId = 1;
    const mockResponse: IResponse<IRequestMessage[]> = {
      status: 200,
      isSuccess: true,
      errorCode: 0,
      successCode: 510,
      data: [
        {
          id: 1,
          content:
            'We are requesting a price quote for a bulk order of 500 units of our latest product. Please include any applicable discounts and delivery costs.',
          medias: [
            {
              type: 'image',
              url: 'https://example.com/product-image.jpg',
            },
          ],
          sentDate: '2024-12-27T09:17:24.9008979+00:00',
          senderId: 1,
          senderType: 2,
        },
        {
          id: 2,
          content:
            'Please provide a detailed price quote for the upcoming order of 200 units of product XYZ. Include any shipping costs and discounts for bulk purchases.',
          medias: [
            {
              type: 'pdf',
              url: 'https://example.com/product-specifications.pdf',
            },
          ],
          sentDate: '2024-12-27T09:18:57.745083+00:00',
          senderId: 7,
          senderType: 1,
        },
      ],
    };

    service.getRequestMessages(requestId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
  });
});
