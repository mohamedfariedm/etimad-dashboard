import Cookie from 'js-cookie';
// import SSRCookie from 'cookie';
import {
  AUTH_TOKEN,
//   EMAIL_VERIFIED,
//   PERMISSIONS,
//   STAFF,
//   STORE_OWNER,
//   SUPER_ADMIN,
//   TOKEN,
} from '@/config/constants';

// export const allowedRoles = [SUPER_ADMIN, STORE_OWNER, STAFF];
// export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
// export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STORE_OWNER, STAFF];
// export const adminOnly = [SUPER_ADMIN];
// export const ownerOnly = [STORE_OWNER];
// export const ownerAndStaffOnly = [STORE_OWNER, STAFF];

export function setAuthCredentials(token: string) {
  Cookie.set(AUTH_TOKEN, token, { expires: 7});
}
// export function setEmailVerified(emailVerified: boolean) {
//   Cookie.set(EMAIL_VERIFIED, JSON.stringify({ emailVerified }));
// }
// export function getEmailVerified(): {
//   emailVerified: boolean;
// } {
//   const emailVerified = Cookie.get(EMAIL_VERIFIED);
//   return emailVerified ? JSON.parse(emailVerified) : false;
// }

// export function getAuthCredentials(context?: any): {
//   token: string | null;
//   permissions: string[] | null;
// } {
//   let authCred;
//   if (context) {
//     authCred = parseSSRCookie(context)[AUTH_CRED];
//   } else {
//     authCred = Cookie.get(AUTH_CRED);
//   }
//   if (authCred) {
//     return JSON.parse(authCred);
//   }
//   return { token: null, permissions: null };
// }

// export function parseSSRCookie(context: any) {
//   return SSRCookie.parse(context.req.headers.cookie ?? '');
// }

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((aRole) => _userPermissions.includes(aRole))
    );
  }
  return false;
}
// export function isAuthenticated(_cookies: any) {
//   return (
//     !!_cookies[TOKEN] &&
//     Array.isArray(_cookies[PERMISSIONS]) &&
//     !!_cookies[PERMISSIONS].length
//   );
// }

