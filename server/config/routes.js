/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /**
   * @route:access-tokens
   */
  'POST /api/access-tokens': 'access-tokens/create',
  'DELETE /api/access-tokens/me': 'access-tokens/delete',

  /**
   * users
   */
  'GET /api/users': 'users/index',
  'POST /api/users': 'users/create',
  'GET /api/users/:id': 'users/show',
  'PATCH /api/users/:id': 'users/update',
  'PATCH /api/users/:id/email': 'users/update-email',
  'PATCH /api/users/:id/password': 'users/update-password',
  'PATCH /api/users/:id/username': 'users/update-username',
  'POST /api/users/:id/avatar': 'users/update-avatar',
  'DELETE /api/users/:id': 'users/delete',

  // organizations
  'GET /api/organizations/init': 'organizations/init',

  // tags
  'POST /api/tags': 'tags/create',

  // transactions
  'POST /api/transactions': 'transactions/create',

  // transaction-tag
  'POST /api/transaction-tag': 'transaction-tag/create',

  // test route
  'GET /api/test': 'test/index',

  'GET /*': {
    view: 'index',
    skipAssets: true,
  },
};
