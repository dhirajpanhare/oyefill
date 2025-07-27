import '../models/connection.js';
import formSchemaModel from '../models/form.model.js';

// -------- SAVE --------
export const save = async (req, res) => {
  try {
    const _id = Date.now(); // safer alternative

    const formsDetails = { ...req.body, _id, info: new Date().toISOString() };
    await formSchemaModel.create(formsDetails);

    res.status(201).json({ status: true, message: "Form saved successfully" });
  } catch (error) {
    console.error("Error saving form:", error.message);
    res.status(500).json({ status: false, message: "Failed to save form" });
  }
};

// -------- FETCH by CATEGORY --------
export const fetch = async (req, res) => {
  try {
    const catName = req.params.catName.toLowerCase(); // ensure case match
    const forms = await formSchemaModel.find({ catName });

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching category forms:", error.message);
    res.status(500).json({ message: "Server error while fetching category forms" });
  }
};

// -------- FETCH ALL (FULL) --------
export const full = async (req, res) => {
  try {
    const formList = await formSchemaModel.find(req.query);

    if (formList.length !== 0) {
      res.status(200).json(formList);
    } else {
      res.status(404).json({ status: "Resource not found" });
    }
  } catch (error) {
    console.error("Error in /forms/full:", error.message);
    res.status(500).json({ status: "Server error" });
  }
};

// -------- DELETE FORM --------
export const deleteForm = async (req, res) => {
  try {
    const obj = req.body;

    if (!obj || Object.keys(obj).length === 0) {
      return res.status(400).json({ status: "Please enter valid condition" });
    }

    const formDetails = await formSchemaModel.findOne(obj);
    if (!formDetails) {
      return res.status(404).json({ status: "Requested resource not available" });
    }

    const deleted = await formSchemaModel.deleteOne(obj);
    if (deleted.deletedCount > 0) {
      res.status(200).json({ status: "Form deleted successfully" });
    } else {
      res.status(500).json({ status: "Server error during deletion" });
    }
  } catch (error) {
    console.error("Error deleting form:", error.message);
    res.status(500).json({ status: "Server error" });
  }
};
