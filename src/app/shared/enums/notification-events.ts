export interface NotificationEvents {
  PriceRequestCreated: 1;
  PriceRequestAccepted: 2;
  PriceRequestRejected: 3;
  PriceRequestCancelled: 4;
  PriceRequestMessageCreated: 5;

  TicketCreated: 50;
  TicketClosed: 51;
  TicketMessageCreated: 52;

  InsuranceAdOfferCreated: 100;
  InsuranceAdOfferAccepted: 101;
  InsuranceAdOfferRejected: 102;
  InsuranceAdOfferCancelled: 103;
  InsuranceAdOfferMessageCreated: 104;
}
