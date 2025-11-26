// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorá errores específicos del frontend
    if (err.message.includes("Cannot read properties of null")) {
    return false // Cypress NO falla el test
    }
  // Para otros errores, que sí fallen
    return true
    })

import './commands'
import './jCommands'