export enum ErrorCodes {
    // shared
    None = 0,
    NotFound = 1,
    Unauthorized = 2,
    Forbidden = 3,
    Conflict = 4,
    Validation = 5,

    // account
    PhoneExists = 100,
    EmailExists = 101,
    UserNameExists = 102,
    InvalidEmailOrPassword = 103,
    UnconfirmedEmail = 104,
    UnregisteredEmail = 105,
    InvalidToken = 106,

    // users
    UserExists = 200,
    UserNotExists = 201,

    // roles
    RoleExists = 300,
    RoleNotExists = 301,
    RemoveRoleFailed = 302,
    AssignUserRoleFailed = 303,
    UnassignUserRoleFailed = 304,
    GetRoleFailed = 305,
    RoleCreationFailed = 306,

    // tickets
    TicketExists = 400,
    TicketNotExists = 401,
    TicketClosed = 402,
    TicketAudienceError = 403,

    // insurance ads
    AdExists = 500,
    AdNotExists = 501,
    AdNotOpened = 502,
    AdClosed = 503,
    AdOfferNotPending = 504,

    // price requests
    PriceRequestExists = 600,
    PriceRequestNotExists = 601,
    PriceRequestNotPending = 602,
    PriceOfferNotExists = 603,
    PriceOfferExists = 604,
    PriceOfferNotPending = 605,

    // chat
    ChatClosed = 700,
    ChatAlreadyExist = 701,

    // contracts
    ContractNotExists = 801,
    ContractNotPending = 802,
    ContractNotActive = 803,
    NoActiveContracts = 804,

    // others
    Unknown = 999
}
