// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const baseUrl = 'http://localhost:3000/login'
export const resetPasswordUrl = 'http://localhost:3000/resend-password/'
export const registerUrl = 'http://localhost:3000/register'
export const changePasswordUrl = 'http://localhost:3000/reset-password/'
export const socketURL = 'http://localhost:3000'
export const updateUrl = 'http://localhost:3000/update'
export const orderMessageUrl = 'http://localhost:3000/message-order/'
export const messageHistoryUrl = 'http://localhost:3000/message-history/'
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
