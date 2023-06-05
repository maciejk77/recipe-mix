import decode from "jwt-decode";
import { nanoid } from "nanoid";

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.add(
  "login",
  (username, password, appState = { targetUrl: "/" }) => {
    cy.log(`Logging in as ${username}`);

    const options = {
      method: "POST",
      url: "https://dev-dwj5kc4roq02n208.uk.auth0.com/oauth/token",
      body: {
        grant_type: "password",
        username: username,
        password: password,
        audience: "https://dev-dwj5kc4roq02n208.uk.auth0.com/api/v2/",
        scope: "openid profile email",
        client_id: "ITMcOV3R2CFtGesnRYtfeNDdfL9fDOLX",
        client_secret:
          "tMK_4Jnz5_hY20O6SWAz-QVijkudUogkg6eRiJrvLFuOq4E0Hu-fujODRPY1IW-T",
      },
    };

    cy.request(options).then(({ body }) => {
      const { access_token, expires_in, id_token } = body;

      cy.intercept("POST", "oauth/token", {
        response: {
          access_token: access_token,
          id_token: id_token,
          scope: "openid profile email",
          expires_in: expires_in,
          token_type: "Bearer",
        },
      });

      // Auth0 SPA SDK will check for value in cookie to get appState
      // add validate nonce (which has been removed for simplicity)
      // const stateId = "test"; // good enough for you local machine, but not for prod

      const stateId = JSON.stringify({
        nonce: nanoid(),
        state: Math.random().toString(36).substring(7),
      });

      cy.setCookie(
        `a0.spajs.txs.${stateId}`,
        encodeURIComponent(
          JSON.stringify({
            appState: appState,
            scope: "openid profile email",
            audience: "https://dev-dwj5kc4roq02n208.uk.auth0.com/api/v2/",
            redirect_uri: "http://localhost:3000",
          })
        )
      ).then(() => {
        cy.visit(`/?code=test-code&state=${stateId}`);
      });
    });
  }
);

// Cypress.Commands.add("login", (overrides = {}) => {
//   Cypress.log({
//     name: "loginViaAuth0",
//   });

//   cy.request({
//     method: "POST",
//     url: "https://dev-dwj5kc4roq02n208.uk.auth0.com/oauth/token",
//     body: {
//       grant_type: "password",
//       username: "e2e-testing@mytestdomain.com", // Cypress.env("AUTH0_USERNAME_CY"),
//       password: "test1ng456!", //Cypress.env("AUTH0_PASSWORD_CY"),
//       audience: "https://dev-dwj5kc4roq02n208.uk.auth0.com/api/v2/", //Cypress.env("AUTH0_AUDIENCE_CY"),
//       scope: "openid profile email", //Cypress.env("AUTH0_SCOPE_CY"),
//       client_id: "ITMcOV3R2CFtGesnRYtfeNDdfL9fDOLX", //Cypress.env("AUTH0_CLIENT_ID_CY"),
//       client_secret:
//         // "8df479379a651399bd934b5ace949b174ba5dd452ed8878a2605a85018eae4ff",
//         "tMK_4Jnz5_hY20O6SWAz-QVijkudUogkg6eRiJrvLFuOq4E0Hu-fujODRPY1IW-T",
//     },
//   }).then(({ body }) => {
//     const claims = decode(body.id_token);

//     const {
//       nickname,
//       name,
//       picture,
//       updated_at,
//       email,
//       email_verified,
//       sub,
//       exp,
//     } = claims;

//     const item = {
//       body: {
//         ...body,
//         decodedToken: {
//           claims,
//           user: {
//             nickname,
//             name,
//             picture,
//             updated_at,
//             email,
//             email_verified,
//             sub,
//           },
//           audience: "https://dev-dwj5kc4roq02n208.uk.auth0.com/api/v2/",
//           client_id: "ITMcOV3R2CFtGesnRYtfeNDdfL9fDOLX",
//         },
//       },
//       expiresAt: exp,
//     };

//     window.localStorage.setItem("auth0Cypress", JSON.stringify(item));

//     cy.visit("/");
//   });
// });

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
