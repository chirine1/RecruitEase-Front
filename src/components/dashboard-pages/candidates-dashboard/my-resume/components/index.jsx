import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import EducationModal from "./Education";
import AwardsModal from "./Awards";
import SkillSelector from "./SkillsMultiple";
import LanguageSelector from "./LanguageSelect";
import ExperienceModal from "./Experiences";
import  { axiosPrivate } from "@/axios/axios";
import { toast } from "react-toastify";

const Index = () => {
  const [educationModalOpen, setEducationModalOpen] = useState(false);
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      skills: [],
      educations: [],
      awards: [],
      experiences: [],
      languages: [],
    },
    onSubmit: (values) => {
      // Transform skills and languages to match the backend expected format
      const transformedValues = {
        ...values,
        skills: values.skills.map((skill) => ({ label: skill.label })),
        languages: values.languages.map((language) => ({
          label: language.label,
        })),
      };

      
      axiosPrivate
        .put(`/resume`, transformedValues)
        .then((response) => {
          console.log("Resume updated successfully:", response.data);
          toast.success("resume updated successfully")
        })
        .catch((error) => {
          console.error("Error updating resume:", error);
          toast.error("failed to update")
        });
    },
  });

  useEffect(() => {
    axiosPrivate.get(`/resume/current`).then((response) => {
      const data = response.data;

      // Transform skills and languages to the value-label format
      const transformedSkills = data.skills.map((skill) => ({
        value: skill.label,
        label: skill.label,
      }));
      const transformedLanguages = data.languages.map((language) => ({
        value: language.label,
        label: language.label,
      }));

      // Set initial values for formik form
      formik.setValues({
        skills: transformedSkills,
        educations: data.educations || [],
        awards: data.awards || [],
        experiences: data.experiences || [],
        languages: transformedLanguages,
      });
    }).catch((error) => {
      console.error("Error fetching resume data:", error);
    });
  }, []);

  const handleAddEducation = (education) => {
    formik.setFieldValue("educations", [
      ...formik.values.educations,
      education,
    ]);
    setEducationModalOpen(false); // Close the education modal after adding
    console.log(formik.values.educations);
  };
  const handleSkillChange = (selectedOptions) => {
    formik.setFieldValue("skills", selectedOptions);
    console.log(formik.values.skills);
  };

  const handleAddAward = (award) => {
    formik.setFieldValue("awards", [...formik.values.awards, award]);
    setAwardModalOpen(false); // Close the award modal after adding
    console.log(formik.values.awards);
  };

  const handleLanguageChange = (selectedLanguages) => {
    formik.setFieldValue("languages", selectedLanguages);
    console.log(formik.values.languages);
  };

  const handleAddExperience = (experience) => {
    formik.setFieldValue("experiences", [
      ...formik.values.experiences,
      experience,
    ]);
    setExperienceModalOpen(false);
  };

  const handleRemoveExperience = (indexToRemove) => {
    formik.setFieldValue(
      "experiences",
      formik.values.experiences.filter((exp, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <form className="default-form" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="form-group col-lg-12 col-md-12">
            <div className="resume-outer">
              <div className="upper-title">
                <h3 style={{ color: "#007FFF" }}>Educations</h3>
                <button
                  type="button"
                  className="add-info-btn"
                  onClick={() => setEducationModalOpen(true)}
                >
                  <span className="icon flaticon-plus"></span> Add Education
                </button>
              </div>
              <div className="education-table-resume">
                <table>
                  <thead>
                    <tr>
                      <th>Degree</th>
                      <th>Field of Study</th>
                      <th>Institution</th>
                      <th>Start Year</th>
                      <th>End Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.educations.map((edu, index) => (
                      <tr key={index}>
                        <td>{edu.degree}</td>
                        <td>{edu.field_of_study}</td>
                        <td>{edu.institution}</td>
                        <td>{edu.start_year}</td>
                        <td>{edu.end_year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="form-group col-lg-12 col-md-12">
            <div className="resume-outer">
              <div className="upper-title">
                <h3 style={{ color: "#007FFF" }}>Experiences</h3>
                <button
                  type="button"
                  className="add-info-btn"
                  onClick={() => setExperienceModalOpen(true)}
                >
                  <span className="icon flaticon-plus"></span> Add Experience
                </button>
              </div>
              <div className="education-table-resume">
                <table>
                  <thead>
                    <tr>
                      <th>Job Title</th>
                      <th>Company Name</th>
                      <th>Job Description</th>
                      <th>Start Year</th>
                      <th>End Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.experiences.map((exp, index) => (
                      <tr key={index}>
                        <td>{exp.job_title}</td>
                        <td>{exp.company_name}</td>
                        <td>{exp.job_description}</td>
                        <td>{exp.start_year}</td>
                        <td>{exp.end_year}</td>
                        <td>
                          <button onClick={() => handleRemoveExperience(index)}>
                            x
                          </button>{" "}
                          {/* Remove button */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h3 style={{ color: "#007FFF" }}>Skills</h3>
          <SkillSelector onChange={handleSkillChange} />

          <h3 style={{ color: "#007FFF" }}>Languages</h3>
          <LanguageSelector onChange={handleLanguageChange} />

          <div className="form-group col-lg-12 col-md-12">
            <div className="resume-outer theme-yellow">
              <div className="upper-title">
                <h3 style={{ color: "#007FFF" }}>Awards</h3>
                <button
                  type="button"
                  className="add-info-btn"
                  onClick={() => setAwardModalOpen(true)}
                >
                  <span className="icon flaticon-plus"></span> Add Award
                </button>
              </div>
              <div className="awards-table-resume">
                <table>
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>Awarded By</th>
                      <th>Award Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.awards.map((award, index) => (
                      <tr key={index}>
                        <td>{award.label}</td>
                        <td>{award.awarded_by}</td>
                        <td>{award.award_year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="form-group col-lg-12 col-md-12">
            <button
              type="submit"
              className="theme-btn btn-style-one"
              onClick={formik.handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </form>

      <EducationModal
        isOpen={educationModalOpen}
        onRequestClose={() => setEducationModalOpen(false)}
        onAdd={handleAddEducation}
      />

      <AwardsModal
        isOpen={awardModalOpen}
        onRequestClose={() => setAwardModalOpen(false)}
        onAdd={handleAddAward}
      />

      <ExperienceModal
        isOpen={experienceModalOpen}
        onRequestClose={() => setExperienceModalOpen(false)}
        onAdd={handleAddExperience}
      />
    </div>
  );
};

export default Index;
