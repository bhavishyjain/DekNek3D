export const ProjectList = ({ items, onDelete, onEdit, loading }) => {
  if (loading) {
    return <div className="card empty-state">Loading your project notes...</div>;
  }

  if (!items.length) {
    return (
      <div className="card empty-state">
        No project notes yet. Add one to show your backend and database flow.
      </div>
    );
  }

  return (
    <div className="project-grid">
      {items.map((item) => (
        <article className="card project-card" key={item._id}>
          <div className="project-card-top">
            <span className={`status-pill status-${item.status.toLowerCase().replace(" ", "-")}`}>
              {item.status}
            </span>
            <div className="project-actions">
              <button className="ghost-button" onClick={() => onEdit(item)} type="button">
                Edit
              </button>
              <button
                className="danger-button"
                onClick={() => onDelete(item._id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>

          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>
      ))}
    </div>
  );
};
