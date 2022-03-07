const { Template } = require('../models');

/**
 * Query for templates
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTemplates = async (filter, options) => {
  const templates = await Template.paginate(filter, options);
  return templates;
};

/**
 * Get template by id
 * @param {ObjectId} id
 * @returns {Promise<Template>}
 */
const getTemplateById = async id => {
  return Template.findById(id);
};

// const checkDuplicateName = async (name, excludeUserId) => {
//   const template = await Template.findOne({ name, _id: { $ne: excludeUserId } });
//   console.log(template);
//   if (template) {
//     return template;
//   }
//   return false;
// };

// /**
//  * Create a template
//  * @param {Object} templateBody
//  * @returns {Promise<{Template}>}
//  */
// const createTemplate = async templateBody => {
//   if (await checkDuplicateName(body.name)) {
//     apiResponse.successResponse(res, 'Name already exists');
//   }
//   const template = await Template.create(templateBody);
//   return template;
// };

module.exports = {
  getTemplateById,
  queryTemplates,
};
