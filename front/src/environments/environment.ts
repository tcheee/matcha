// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  socketURL : 'http://localhost:3000',
};

export const baseUrl = 'http://localhost:3000/login'
export const resetPasswordUrl = 'http://localhost:3000/resend-password/'
export const registerUrl = 'http://localhost:3000/register'
export const changePasswordUrl = 'http://localhost:3000/reset-password/'

export const updateUrl = 'http://localhost:3000/update'
export const orderMessageUrl = 'http://localhost:3000/message-order/'
export const messageHistoryUrl = 'http://localhost:3000/message-history/'
export const resetNotifUrl = 'http://localhost:3000/notifications-seen'
export const resetMessagefUrl = 'http://localhost:3000/messages-seen'
export const imageUrl = 'http://localhost:3000/all-photos/'
export const blockUrl = 'http://localhost:3000/block/'
export const activateUrl = 'http://localhost:3000/activate-account/'
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
