// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    client_id: 'C8c80c0f2b5fa9583e698248c2b981f0c860c2d06b13ded3dd5f65a6632aa9f93',
    redirect_uri: 'http://localhost:4200/callback',
    response_type: 'code',
    scope: 'spark:all',
    state: 'msgs-45jnf4f46',
  },
  access: {
    grant_type: 'authorization_code',
    client_id: 'C8c80c0f2b5fa9583e698248c2b981f0c860c2d06b13ded3dd5f65a6632aa9f93',
    client_secret: '8959e71547541fa0e1dc37a0d3688bcd7246f8c647d724ec8bcc50d79dfc5849',
    redirect_uri: 'http://localhost:4200/callback',
    code:''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
