import { useEffect, useState } from "react";

const defaultForm = {
  title: "",
  description: "",
  status: "Planning",
};

export const ProjectForm = ({ activeProject, onCancel, onSave, saving }) => {
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (activeProject) {
      setFormData({
        title: activeProject.title,
        description: activeProject.description,
        status: activeProject.status,
      });
      return;
    }

    setFormData(defaultForm);
  }, [activeProject]);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <form className="card project-form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Project Note</p>
          <h3>{activeProject ? "Update your progress" : "Add a new project note"}</h3>
        </div>
        {activeProject ? (
          <button className="ghost-button" onClick={onCancel} type="button">
            Cancel edit
          </button>
        ) : null}
      </div>

      <label>
        Title
        <input
          name="title"
          onChange={handleChange}
          placeholder="Landing page redesign"
          required
          type="text"
          value={formData.title}
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Describe the work, blockers, or next milestone"
          required
          rows="5"
          value={formData.description}
        />
      </label>

      <label>
        Status
        <select name="status" onChange={handleChange} value={formData.status}>
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </label>

      <button className="primary-button" disabled={saving} type="submit">
        {saving ? "Saving..." : activeProject ? "Update note" : "Save note"}
      </button>
    </form>
  );
};
