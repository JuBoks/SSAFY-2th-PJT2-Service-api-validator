const Domain = require("../database/Domain");

const getAllDomains = async (category_id) => {
  try {
    const allDomains = await Domain.getAllDomains(category_id);
    return allDomains;
  } catch (error) {
    throw error;
  }
};

const createNewDomain = async (newDomain) => {
  try {
    const createdDomain = await Domain.createNewDomain(newDomain);
    return createdDomain;
  } catch (error) {
    throw error;
  }
};

const updateOneDomain = async (domainId, changes) => {
  try {
    const updatedDomain = await Domain.updateOneDomain(domainId, changes);
    return updatedDomain;
  } catch (error) {
    throw error;
  }
};

const deleteOneDomain = async (domainId) => {
  try {
    await Domain.deleteOneDomain(domainId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllDomains,
  createNewDomain,
  updateOneDomain,
  deleteOneDomain,
};
