export const verifyPhoneNumber = (phoneNumber: string) => /^\+?[1-9]\d{1,14}$/.test(phoneNumber);
