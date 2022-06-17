const allRoles = {
  user: [],
  verifiedUser: [],
  admin: ['getUsers', 'manageUsers'],
};

const role = {
  VERIFIED_USER: 'verifiedUser',
  USER: 'user',
  ADMIN: 'admin',
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  role,
  roles,
  roleRights,
};
