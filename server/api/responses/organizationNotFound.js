/**
 * organizationNotFound.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.organizationNotFound();
 *     // -or-
 *     return res.organizationNotFound(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'organizationNotFound'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function organizationNotFound(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 500;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.organizationNotFound()');
    return res.json({ code: statusCodeToSet, message: 'Organization not found' });
  }
  // Else if the provided data is an Error instance, if it has
  // a toJSON() function, then always run it and use it as the
  // response body to send.  Otherwise, send down its `.stack`,
  // except in production use res.sendStatus().
  else if (_.isError(optionalData)) {
    sails.log.info('Custom response `res.organizationNotFound()` called with an Error:', optionalData);

    // If the error doesn't have a custom .toJSON(), use its `stack` instead--
    // otherwise res.json() would turn it into an empty dictionary.
    // (If this is production, don't send a response body at all.)
    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.status(statusCodeToSet).json({ message: 'Organization Not Found' })
      }
      else {
        return res.status(statusCodeToSet).json({ message: 'Organization Not Found' })
      }
    }
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).json(optionalData);
  }

};
