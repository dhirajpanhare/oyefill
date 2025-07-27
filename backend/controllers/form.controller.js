import '../models/connection.js';
import formSchemaModel from '../models/form.model.js';
import rs from 'randomstring';
import jwt from 'jsonwebtoken';

export const save = async (req, res) => {
  try {
    const forms = await formSchemaModel.find();
    const l = forms.length;
    const _id = l === 0 ? 1 : forms[l - 1]._id + 1;

    const formsDetails = { ...req.body, _id, info: Date() };
    await formSchemaModel.create(formsDetails);

    res.status(201).json({ status: true });
  } catch (error) {
    console.error("Error saving form:", error.message);
    res.status(500).json({ status: false });
  }
};

export const fetch = async (req, res) => {
  try {
    const catName = req.params.catName;
    console.log("Category:", catName);

    const forms = await formSchemaModel.find({ catName });
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching category forms:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

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
      res.status(200).json({ status: "OK" });
    } else {
      res.status(500).json({ status: "Server error" });
    }
  } catch (error) {
    console.error("Error deleting form:", error.message);
    res.status(500).json({ status: "Server error" });
  }
};
