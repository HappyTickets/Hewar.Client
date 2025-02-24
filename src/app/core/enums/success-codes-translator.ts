import { SuccessCodes } from '../enums/success-codes';

export const successCodeTranslator = {
  'ar': {
    [SuccessCodes.None]: '',
    [SuccessCodes.OperationSuccessful]: 'العملية ناجحة',
    [SuccessCodes.Created]: 'تم الإنشاء',
    [SuccessCodes.Updated]: 'تم التحديث',
    [SuccessCodes.Deleted]: 'تم الحذف',
    [SuccessCodes.Authorized]: 'تم التصريح',
    [SuccessCodes.SoftDeleted]: 'تم الحذف المؤقت',
    [SuccessCodes.HardDeleted]: 'تم الحذف النهائي',
    [SuccessCodes.FileUploaded]: 'تم رفع الملف',
    [SuccessCodes.EmailConfirmed]: 'تم تأكيد البريد الإلكتروني',
    [SuccessCodes.PasswordReset]: 'تم إعادة تعيين كلمة المرور',
    [SuccessCodes.UserRegistered]: 'تم تسجيل المستخدم',
    [SuccessCodes.EmailConfirmation]: 'تأكيد البريد الإلكتروني',
    [SuccessCodes.EmailConfirmationMessage]: 'رسالة تأكيد البريد الإلكتروني',
    [SuccessCodes.EmailChangedSuccessfully]: 'تم تغيير البريد الإلكتروني بنجاح',
    [SuccessCodes.PasswordResetMessage]: 'رسالة إعادة تعيين كلمة المرور',
    [SuccessCodes.LoggedInSuccessfully]: 'تم تسجيل الدخول بنجاح',
    [SuccessCodes.LoggedOutSuccessfully]: 'تم تسجيل الخروج بنجاح',
    [SuccessCodes.UserReceived]: 'تم استلام المستخدم',
    [SuccessCodes.RoleAssigned]: 'تم تعيين الدور',
    [SuccessCodes.RoleUnassigned]: 'تم إلغاء تعيين الدور',
    [SuccessCodes.RoleCreated]: 'تم إنشاء الدور',
    [SuccessCodes.RoleDeleted]: 'تم حذف الدور',
    [SuccessCodes.RoleUpdated]: 'تم تحديث الدور',
    [SuccessCodes.RoleReceived]: 'تم استلام الدور',
    [SuccessCodes.RolesReceived]: 'تم استلام الأدوار',
    [SuccessCodes.RoleExists]: 'الدور موجود',
    [SuccessCodes.UserRemovedFromRole]: 'تم إزالة المستخدم من الدور',
    [SuccessCodes.TicketCreated]: 'تم إنشاء التذكرة',
    [SuccessCodes.TicketClosed]: 'تم إغلاق التذكرة',
    [SuccessCodes.CreateTicketMessage]: 'رسالة إنشاء التذكرة',
    [SuccessCodes.GetMyReceivedTickets]: 'تم استلام التذاكر المستلمة الخاصة بي',
    [SuccessCodes.GetMySentTickets]: 'تم استلام التذاكر المرسلة الخاصة بي',
    [SuccessCodes.GetTicketMessages]: 'تم استلام رسائل التذكرة',
    [SuccessCodes.AdCreated]: 'تم إنشاء الإعلان',
    [SuccessCodes.AdUpdated]: 'تم تحديث الإعلان',
    [SuccessCodes.AdPublished]: 'تم نشر الإعلان',
    [SuccessCodes.AdOfferAccepted]: 'تم قبول عرض الإعلان',
    [SuccessCodes.MyAdReceived]: 'تم استلام إعلاني',
    [SuccessCodes.OpenAdsReceived]: 'تم استلام الإعلانات المفتوحة',
    [SuccessCodes.OfferCreated]: 'تم إنشاء العرض',
    [SuccessCodes.OfferAccepted]: 'تم قبول العرض',
    [SuccessCodes.AdReceived]: 'تم استلام الإعلان',
    [SuccessCodes.AdsReceived]: 'تم استلام الإعلانات',
    [SuccessCodes.OfferRejected]: 'تم رفض العرض',
    [SuccessCodes.OfferCanceled]: 'تم إلغاء العرض',
    [SuccessCodes.MyOffersByAdIdAsFacilityReceived]: 'تم استلام عروضي كمنشأة حسب معرف الإعلان',
    [SuccessCodes.MyOffersAsFacilityReceived]: 'تم استلام عروضي كمنشأة',
    [SuccessCodes.MyOffersByAdIdAsCompanyReceived]: 'تم استلام عروضي كشركة حسب معرف الإعلان',
    [SuccessCodes.MyOffersAsCompanyReceived]: 'تم استلام عروضي كشركة',
    [SuccessCodes.CreateOfferMessage]: 'رسالة إنشاء العرض',
    [SuccessCodes.OfferMessagesReceived]: 'تم استلام رسائل العرض',
    [SuccessCodes.PriceRequestCreated]: 'تم إنشاء طلب السعر',
    [SuccessCodes.PriceRequestApproved]: 'تمت الموافقة على طلب السعر',
    [SuccessCodes.CreateRequestFacilityDetails]: 'إنشاء تفاصيل المنشأة الخاصة بالطلب',
    [SuccessCodes.UpdateRequestFacilityDetails]: 'تحديث تفاصيل المنشأة الخاصة بالطلب',
    [SuccessCodes.GetRequestFacilityDetails]: 'استلام تفاصيل المنشأة الخاصة بالطلب',
    [SuccessCodes.GetMyRequestsAsFacility]: 'استلام طلباتي كمنشأة',
    [SuccessCodes.GetMyRequestsAsCompany]: 'استلام طلباتي كشركة',
    [SuccessCodes.PriceRequestRejected]: 'تم رفض طلب السعر',
    [SuccessCodes.CancelRequest]: 'تم إلغاء الطلب',
    [SuccessCodes.CreateRequestMessage]: 'رسالة إنشاء الطلب',
    [SuccessCodes.GetRequestMessages]: 'تم استلام رسائل الطلب',
    [SuccessCodes.RefreshToken]: 'تحديث الرمز المميز',
    [SuccessCodes.CompanyCreated]: 'تم إنشاء الشركة',
    [SuccessCodes.CompanyUpdated]: 'تم تحديث الشركة',
    [SuccessCodes.CompanyReceived]: 'تم استلام الشركة',
    [SuccessCodes.CompaniesReceived]: 'تم استلام الشركات',
    [SuccessCodes.CompanySoftDeleted]: 'تم الحذف المؤقت للشركة',
    [SuccessCodes.CompanyHardDeleted]: 'تم الحذف النهائي للشركة',
    [SuccessCodes.FacilityCreated]: 'تم إنشاء المنشأة',
    [SuccessCodes.FacilityUpdated]: 'تم تحديث المنشأة',
    [SuccessCodes.FacilityReceived]: 'تم استلام المنشأة',
    [SuccessCodes.FacilitiesReceived]: 'تم استلام المنشآت',
    [SuccessCodes.FacilitySoftDeleted]: 'تم الحذف المؤقت للمنشأة',
    [SuccessCodes.FacilityHardDeleted]: 'تم الحذف النهائي للمنشأة',
    [SuccessCodes.GuardCreated]: 'تم إنشاء الحارس',
    [SuccessCodes.GuardUpdated]: 'تم تحديث الحارس',
    [SuccessCodes.GuardReceived]: 'تم استلام الحارس',
    [SuccessCodes.GuardsReceived]: 'تم استلام الحراس',
    [SuccessCodes.GuardSoftDeleted]: 'تم الحذف المؤقت للحارس',
    [SuccessCodes.GuardHardDeleted]: 'تم الحذف النهائي للحارس',
    [SuccessCodes.MarkAsRead]: 'تم تحديده كمقروء',
    [SuccessCodes.NotificationsReceived]: 'تم استلام الإشعارات',
    [SuccessCodes.CountUnRead]: 'تم احتساب الإشعارات غير المقروءة'
  },
  'en': {
    [SuccessCodes.None]: '',
    [SuccessCodes.OperationSuccessful]: 'Operation successful',
    [SuccessCodes.Created]: 'Created',
    [SuccessCodes.Updated]: 'Updated',
    [SuccessCodes.Deleted]: 'Deleted',
    [SuccessCodes.Authorized]: 'Authorized',
    [SuccessCodes.SoftDeleted]: 'Soft deleted',
    [SuccessCodes.HardDeleted]: 'Hard deleted',
    [SuccessCodes.FileUploaded]: 'File uploaded',
    [SuccessCodes.EmailConfirmed]: 'Email confirmed',
    [SuccessCodes.PasswordReset]: 'Password reset',
    [SuccessCodes.UserRegistered]: 'User registered',
    [SuccessCodes.EmailConfirmation]: 'Email confirmation',
    [SuccessCodes.EmailConfirmationMessage]: 'Email confirmation message',
    [SuccessCodes.EmailChangedSuccessfully]: 'Email changed successfully',
    [SuccessCodes.PasswordResetMessage]: 'Password reset message',
    [SuccessCodes.LoggedInSuccessfully]: 'Logged in successfully',
    [SuccessCodes.LoggedOutSuccessfully]: 'Logged out successfully',
    [SuccessCodes.UserReceived]: 'User received',
    [SuccessCodes.RoleAssigned]: 'Role assigned',
    [SuccessCodes.RoleUnassigned]: 'Role unassigned',
    [SuccessCodes.RoleCreated]: 'Role created',
    [SuccessCodes.RoleDeleted]: 'Role deleted',
    [SuccessCodes.RoleUpdated]: 'Role updated',
    [SuccessCodes.RoleReceived]: 'Role received',
    [SuccessCodes.RolesReceived]: 'Roles received',
    [SuccessCodes.RoleExists]: 'Role exists',
    [SuccessCodes.UserRemovedFromRole]: 'User removed from role',
    [SuccessCodes.TicketCreated]: 'Ticket created',
    [SuccessCodes.TicketClosed]: 'Ticket closed',
    [SuccessCodes.CreateTicketMessage]: 'Create ticket message',
    [SuccessCodes.GetMyReceivedTickets]: 'My received tickets',
    [SuccessCodes.GetMySentTickets]: 'My sent tickets',
    [SuccessCodes.GetTicketMessages]: 'Ticket messages received',
    [SuccessCodes.AdCreated]: 'Ad created',
    [SuccessCodes.AdUpdated]: 'Ad updated',
    [SuccessCodes.AdPublished]: 'Ad published',
    [SuccessCodes.AdOfferAccepted]: 'Ad offer accepted',
    [SuccessCodes.MyAdReceived]: 'My ad received',
    [SuccessCodes.OpenAdsReceived]: 'Open ads received',
    [SuccessCodes.OfferCreated]: 'Offer created',
    [SuccessCodes.OfferAccepted]: 'Offer accepted',
    [SuccessCodes.AdReceived]: 'Ad received',
    [SuccessCodes.AdsReceived]: 'Ads received',
    [SuccessCodes.OfferRejected]: 'Offer rejected',
    [SuccessCodes.OfferCanceled]: 'Offer canceled',
    [SuccessCodes.MyOffersByAdIdAsFacilityReceived]: 'My offers by ad ID as facility received',
    [SuccessCodes.MyOffersAsFacilityReceived]: 'My offers as facility received',
    [SuccessCodes.MyOffersByAdIdAsCompanyReceived]: 'My offers by ad ID as company received',
    [SuccessCodes.MyOffersAsCompanyReceived]: 'My offers as company received',
    [SuccessCodes.CreateOfferMessage]: 'Create offer message',
    [SuccessCodes.OfferMessagesReceived]: 'Offer messages received',
    [SuccessCodes.PriceRequestCreated]: 'Price request created',
    [SuccessCodes.PriceRequestApproved]: 'Price request approved',
    [SuccessCodes.CreateRequestFacilityDetails]: 'Create request facility details',
    [SuccessCodes.UpdateRequestFacilityDetails]: 'Update request facility details',
    [SuccessCodes.GetRequestFacilityDetails]: 'Get request facility details',
    [SuccessCodes.GetMyRequestsAsFacility]: 'Get my requests as facility',
    [SuccessCodes.GetMyRequestsAsCompany]: 'Get my requests as company',
    [SuccessCodes.PriceRequestRejected]: 'Price request rejected',
    [SuccessCodes.CancelRequest]: 'Cancel request',
    [SuccessCodes.CreateRequestMessage]: 'Create request message',
    [SuccessCodes.GetRequestMessages]: 'Get request messages',
    [SuccessCodes.RefreshToken]: 'Refresh token',
    [SuccessCodes.CompanyCreated]: 'Company created',
    [SuccessCodes.CompanyUpdated]: 'Company updated',
    [SuccessCodes.CompanyReceived]: 'Company received',
    [SuccessCodes.CompaniesReceived]: 'Companies received',
    [SuccessCodes.CompanySoftDeleted]: 'Company soft deleted',
    [SuccessCodes.CompanyHardDeleted]: 'Company hard deleted',
    [SuccessCodes.FacilityCreated]: 'Facility created',
    [SuccessCodes.FacilityUpdated]: 'Facility updated',
    [SuccessCodes.FacilityReceived]: 'Facility received',
    [SuccessCodes.FacilitiesReceived]: 'Facilities received',
    [SuccessCodes.FacilitySoftDeleted]: 'Facility soft deleted',
    [SuccessCodes.FacilityHardDeleted]: 'Facility hard deleted',
    [SuccessCodes.GuardCreated]: 'Guard created',
    [SuccessCodes.GuardUpdated]: 'Guard updated',
    [SuccessCodes.GuardReceived]: 'Guard received',
    [SuccessCodes.GuardsReceived]: 'Guards received',
    [SuccessCodes.GuardSoftDeleted]: 'Guard soft deleted',
    [SuccessCodes.GuardHardDeleted]: 'Guard hard deleted',
    [SuccessCodes.MarkAsRead]: 'Mark as read',
    [SuccessCodes.NotificationsReceived]: 'Notifications received',
    [SuccessCodes.CountUnRead]: 'Unread notifications count'
  }
};
