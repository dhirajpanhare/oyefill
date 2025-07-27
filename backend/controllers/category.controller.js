import "../models/connection.js";
import url from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import CategorySchemaModel from "../models/category.model.js";

// ✅ Cloudinary inline config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ---------------- SAVE ----------------
export const save = async (req, res) => {
  try {
    const category = await CategorySchemaModel.find();
    const l = category.length;
    const _id = l === 0 ? 1 : category[l - 1]._id + 1;

    if (!req.files || !req.files.caticon) {
      return res.status(400).json({ status: false, message: "No file uploaded" });
    }

    const caticon = req.files.caticon;

    // ✅ Upload to Cloudinary (no config file needed)
    const result = await cloudinary.uploader.upload(caticon.tempFilePath, {
      folder: "oyefill_category_icons"
    });

    const cDetails = {
      ...req.body,
      _id,
      caticonnm: result.secure_url // ✅ save Cloudinary image URL
    };

    await CategorySchemaModel.create(cDetails);
    res.status(201).json({ status: true, url: result.secure_url });
  } catch (error) {
    console.error("Error in category/save:", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// ---------------- FETCH ----------------
export const fetch = async (req, res) => {
  try {
    let condition_obj = url.parse(req.url, true).query.condition_obj;
    condition_obj = condition_obj ? JSON.parse(condition_obj) : {};

    const cList = await CategorySchemaModel.find(condition_obj);
    if (cList.length !== 0)
      res.status(200).json(cList);
    else
      res.status(404).json({ status: "Resource not found" });
  } catch (error) {
    console.error("Error in category/fetch:", error.message);
    res.status(500).json({ status: "Server error" });
  }
};

// ---------------- DELETE ----------------
export const deleteCategory = async (req, res) => {
  try {
    const obj = req.body;

    if (!obj || !obj.condition_obj) {
      return res.status(400).json({ status: "Invalid delete request" });
    }

    const condition_obj = JSON.parse(obj.condition_obj);
    const cDetails = await CategorySchemaModel.findOne(condition_obj);

    if (!cDetails) {
      return res.status(404).json({ status: "Requested resource not available" });
    }

    const deleted = await CategorySchemaModel.deleteOne(condition_obj);
    if (deleted.deletedCount > 0)
      res.status(200).json({ status: "OK" });
    else
      res.status(500).json({ status: "Server error during deletion" });

  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ status: "Server error" });
  }
};
