export const USER_TYPE = {
    CLIENT_DEVELOPER: 0,
    SERVER_DEVELOPER: 1,
    QA: 2,
    ETC: 3
}
type USER_TYPE = typeof USER_TYPE[keyof typeof USER_TYPE];

export const USER_STATE = {
    NEWBIE: 0,
    USER: 1,
    ADMIN: 2,
    SYSTEM_ADMIN: 3
}
type USER_STATE = typeof USER_STATE[keyof typeof USER_STATE];
