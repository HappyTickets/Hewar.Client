import { ErrorCodes } from "./error-codes";

export const errorCodeTranslator = {
    'ar': {
        [ErrorCodes.None]: '',
        [ErrorCodes.NotFound]: 'غير موجود',
        [ErrorCodes.Unauthorized]: 'غير مصرح',
        [ErrorCodes.Forbidden]: 'ممنوع',
        [ErrorCodes.Conflict]: 'تعارض',
        [ErrorCodes.Validation]: 'تحقق',

        // الحسابات
        [ErrorCodes.PhoneExists]: 'رقم الهاتف موجود',
        [ErrorCodes.EmailExists]: 'البريد الإلكتروني موجود',
        [ErrorCodes.UserNameExists]: 'اسم المستخدم موجود',
        [ErrorCodes.InvalidEmailOrPassword]: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
        [ErrorCodes.UnconfirmedEmail]: 'البريد الإلكتروني غير مؤكد',
        [ErrorCodes.UnregisteredEmail]: 'البريد الإلكتروني غير مسجل',
        [ErrorCodes.InvalidToken]: 'رمز غير صالح',

        // المستخدمون
        [ErrorCodes.UserExists]: 'المستخدم موجود',
        [ErrorCodes.UserNotExists]: 'المستخدم غير موجود',

        // الأدوار
        [ErrorCodes.RoleExists]: 'الدور موجود',
        [ErrorCodes.RoleNotExists]: 'الدور غير موجود',
        [ErrorCodes.RemoveRoleFailed]: 'فشل إزالة الدور',
        [ErrorCodes.AssignUserRoleFailed]: 'فشل تعيين دور المستخدم',
        [ErrorCodes.UnassignUserRoleFailed]: 'فشل إلغاء تعيين دور المستخدم',
        [ErrorCodes.GetRoleFailed]: 'فشل الحصول على الدور',
        [ErrorCodes.RoleCreationFailed]: 'فشل إنشاء الدور',

        // التذاكر
        [ErrorCodes.TicketExists]: 'التذكرة موجودة',
        [ErrorCodes.TicketNotExists]: 'التذكرة غير موجودة',
        [ErrorCodes.TicketClosed]: 'التذكرة مغلقة',
        [ErrorCodes.TicketAudienceError]: 'خطأ في جمهور التذكرة',

        // الإعلانات
        [ErrorCodes.AdExists]: 'الإعلان موجود',
        [ErrorCodes.AdNotExists]: 'الإعلان غير موجود',
        [ErrorCodes.AdNotOpened]: 'الإعلان غير مفتوح',
        [ErrorCodes.AdClosed]: 'الإعلان مغلق',
        [ErrorCodes.AdOfferNotPending]: 'عرض الإعلان غير معلق',

        // طلبات التسعير
        [ErrorCodes.PriceRequestExists]: 'طلب السعر موجود',
        [ErrorCodes.PriceRequestNotExists]: 'طلب السعر غير موجود',
        [ErrorCodes.PriceRequestNotPending]: 'طلب السعر غير معلق',
        [ErrorCodes.PriceOfferNotExists]: 'عرض السعر غير موجود',
        [ErrorCodes.PriceOfferExists]: 'عرض السعر موجود',
        [ErrorCodes.PriceOfferNotPending]: 'عرض السعر غير معلق',

        // الدردشة
        [ErrorCodes.ChatClosed]: 'المحادثة مغلقة',
        [ErrorCodes.ChatAlreadyExist]: 'المحادثة موجودة بالفعل',

        // العقود
        [ErrorCodes.ContractNotExists]: 'العقد غير موجود',
        [ErrorCodes.ContractNotPending]: 'العقد غير معلق',
        [ErrorCodes.ContractNotActive]: 'العقد غير نشط',
        [ErrorCodes.NoActiveContracts]: 'لا توجد عقود نشطة',

        // غير معروف
        [ErrorCodes.Unknown]: 'خطأ غير متوقع'
    },
    'en': {
        [ErrorCodes.None]: '',
        [ErrorCodes.NotFound]: 'Not Found',
        [ErrorCodes.Unauthorized]: 'Unauthorized',
        [ErrorCodes.Forbidden]: 'Forbidden',
        [ErrorCodes.Conflict]: 'Conflict',
        [ErrorCodes.Validation]: 'Validation',

        // Accounts
        [ErrorCodes.PhoneExists]: 'Phone number exists',
        [ErrorCodes.EmailExists]: 'Email exists',
        [ErrorCodes.UserNameExists]: 'Username exists',
        [ErrorCodes.InvalidEmailOrPassword]: 'Invalid email or password',
        [ErrorCodes.UnconfirmedEmail]: 'Unconfirmed email',
        [ErrorCodes.UnregisteredEmail]: 'Unregistered email',
        [ErrorCodes.InvalidToken]: 'Invalid token',

        // Users
        [ErrorCodes.UserExists]: 'User exists',
        [ErrorCodes.UserNotExists]: 'User does not exist',

        // Roles
        [ErrorCodes.RoleExists]: 'Role exists',
        [ErrorCodes.RoleNotExists]: 'Role does not exist',
        [ErrorCodes.RemoveRoleFailed]: 'Failed to remove role',
        [ErrorCodes.AssignUserRoleFailed]: 'Failed to assign user role',
        [ErrorCodes.UnassignUserRoleFailed]: 'Failed to unassign user role',
        [ErrorCodes.GetRoleFailed]: 'Failed to get role',
        [ErrorCodes.RoleCreationFailed]: 'Failed to create role',

        // Tickets
        [ErrorCodes.TicketExists]: 'Ticket exists',
        [ErrorCodes.TicketNotExists]: 'Ticket does not exist',
        [ErrorCodes.TicketClosed]: 'Ticket closed',
        [ErrorCodes.TicketAudienceError]: 'Ticket audience error',

        // Ads
        [ErrorCodes.AdExists]: 'Ad exists',
        [ErrorCodes.AdNotExists]: 'Ad does not exist',
        [ErrorCodes.AdNotOpened]: 'Ad not opened',
        [ErrorCodes.AdClosed]: 'Ad closed',
        [ErrorCodes.AdOfferNotPending]: 'Ad offer not pending',

        // Price Requests
        [ErrorCodes.PriceRequestExists]: 'Price request exists',
        [ErrorCodes.PriceRequestNotExists]: 'Price request does not exist',
        [ErrorCodes.PriceRequestNotPending]: 'Price request not pending',
        [ErrorCodes.PriceOfferNotExists]: 'Price offer does not exist',
        [ErrorCodes.PriceOfferExists]: 'Price offer exists',
        [ErrorCodes.PriceOfferNotPending]: 'Price offer not pending',

        // Chat
        [ErrorCodes.ChatClosed]: 'Chat closed',
        [ErrorCodes.ChatAlreadyExist]: 'Chat already exists',

        // Contracts
        [ErrorCodes.ContractNotExists]: 'Contract does not exist',
        [ErrorCodes.ContractNotPending]: 'Contract not pending',
        [ErrorCodes.ContractNotActive]: 'Contract not active',
        [ErrorCodes.NoActiveContracts]: 'No active contracts',

        // Unknown
        [ErrorCodes.Unknown]: 'Unknown error'
    }
};
