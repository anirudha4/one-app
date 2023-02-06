module.exports = {
  inputs: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
      required: true
    },
    organizationId: {
      type: 'string',
      required: true
    }
  },
  exits: {
    organizationNotFound: {
      responseType: 'organizationNotFound'
    },
    memberAlreadyExists: {
      responseType: 'memberAlreadyExists'
    }
  },
  fn: async function (inputs, exits) {
    const { organizationId, ...user } = this.req.currentUser;

    // fetch organization
    const organization = await sails.helpers.organizations.getOrganizationByCriteria({ id: organizationId });

    if (!organization) {
      return exits.organizationNotFound();
    }

    const { name, email, organizationId: memberOrganizationId } = inputs;

    // check if member exists in the organization
    const memberExistsInSameOrganization = await sails.helpers.users.getOne({ email, organizationId: memberOrganizationId });
    if (memberExistsInSameOrganization) {
      return exits.memberAlreadyExists();
    }

    // set password to old password if user already exists
    const memberExists = await sails.helpers.users.getOne({ email });
    let password = sails.helpers.utils.generateRandomPassword();

    // generate random color for user
    const color = await sails.helpers.utils.generateRandomColor();
    // create member user for organization
    const memberValues = {
      name,
      email,
      organizationId: memberOrganizationId,
      registrationType: 'invite',
      password,
      color
    }
    if (memberExists) {
      memberValues.password = memberExists.password;
      memberValues.isEmailVerified = memberExists.isEmailVerified
    }
    const { member } = await sails.helpers.users.createMemberOnInvite(memberValues, user.id, organizationId);

    const { token } = await sails.helpers.tokens.createRegisterToken(member.id);
    sails.helpers.emails.sendOrganizationInvite(member, organization, token).then(() => { }).catch(() => { })
    return exits.success({
      member
    });
  }
};
