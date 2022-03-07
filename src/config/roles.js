const roles = ['user'];

const roleRights = new Map();
roleRights.set(roles[0], [ 'getTickets','manageTickets']);

module.exports = {
  roles,
  roleRights,
};
