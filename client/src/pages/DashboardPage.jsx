import axios from "axios";
import { useEffect, useState } from "react";
import { ProjectForm } from "../components/ProjectForm";
import { ProjectList } from "../components/ProjectList";
import { useAuth } from "../context/AuthContext";

export const DashboardPage = () => {
  const { apiUrl, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${apiUrl}/projects`, config);
      setProjects(data);
      setError("");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to load project notes"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSave = async (formData) => {
    try {
      setSaving(true);
      if (activeProject) {
        await axios.put(`${apiUrl}/projects/${activeProject._id}`, formData, config);
      } else {
        await axios.post(`${apiUrl}/projects`, formData, config);
      }

      setActiveProject(null);
      await loadProjects();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to save note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/projects/${id}`, config);
      if (activeProject?._id === id) {
        setActiveProject(null);
      }
      await loadProjects();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to delete note");
    }
  };

  return (
    <main className="dashboard-layout">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Studio Workspace</p>
          <h1>{user.name}&apos;s Project Dashboard</h1>
          <p>
            Review active notes, track production momentum, and manage every update
            through your secure workspace.
          </p>
        </div>
      </section>

      {error ? <div className="card form-error banner-error">{error}</div> : null}

      <section className="dashboard-grid">
        <ProjectForm
          activeProject={activeProject}
          onCancel={() => setActiveProject(null)}
          onSave={handleSave}
          saving={saving}
        />

        <div>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Saved Notes</p>
              <h2>Project timeline and progress</h2>
            </div>
          </div>

          <ProjectList
            items={projects}
            loading={loading}
            onDelete={handleDelete}
            onEdit={setActiveProject}
          />
        </div>
      </section>
    </main>
  );
};
