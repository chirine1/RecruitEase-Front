import React, { useEffect, useState } from "react";
import axios from "@/axios/axios";
import { toast } from "react-toastify";

const SkillsTable = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const fetchSkills = async () => {
    try {
      const response = await axios.get("/skill");
      setSkills(response.data);
    } catch (error) {
      console.error("Failed to fetch skills", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error("Skill label cannot be empty");
      return;
    }

    try {
      const response = await axios.post("/skill", { label: newSkill });
      console.log(`API response: ${response.data}`);
      setSkills([...skills, response.data]);
      setNewSkill("");
      toast.success("Skill added successfully");
    } catch (error) {
      console.error("Failed to add skill", error);
      toast.error("Error adding skill");
    }
  };

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>Skills Management</h4>
      </div>
      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-skill-table">
            <thead>
              <tr>
                <th>Skill ID</th>
                <th>Label</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.id}</td>
                  <td>{skill.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div style={{ textAlign: "center" }}>
           
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter skill label"
              style={{
                padding: "10px",
                marginRight: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={handleAddSkill}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Skill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTable;
