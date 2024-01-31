const { readJSON, writeJSON } = require("./UserUtil");
const { Resource } = require("../models/Resource");
async function addResource(req, res) {
  try {
    const name = req.body.name;
    const location = req.body.location;
    const description = req.body.description;
    const owner = req.body.owner;
    const newResource = new Resource(name, location, description, owner);
    const updatedResources = await writeJSON(
      newResource,
      "utils/resources.json"
    );
    return res.status(201).json(updatedResources);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = {
  addResource,
};
