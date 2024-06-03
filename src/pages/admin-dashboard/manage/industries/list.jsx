import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import { toast } from "react-toastify";

const JobCategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/industry");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch job categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const response = await axios.post("/industry", { label: newCategory });
      console.log(`API response: ${response.data}`);
      setCategories([...categories, response.data]);
      setNewCategory("");
      toast.success("Category added successfully");
    } catch (error) {
      console.error("Failed to add category", error);
      toast.error("Error adding category");
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Job Categories Management</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-category-table">
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div style={{ textAlign: "center" }}>
           
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              style={{
                padding: "10px",
                marginRight: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={handleAddCategory}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCategoryTable;
