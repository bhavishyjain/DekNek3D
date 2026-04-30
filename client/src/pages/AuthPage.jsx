export const AuthPage = ({ onOpenAuth }) => {
  return (
    <main className="hero-layout">
      <section className="hero-copy">
        <p className="eyebrow">DekNek3D Workspace</p>
        <h1>Build, track, and present every 3D project from one focused workspace.</h1>
        <p className="hero-text">
          Designed for teams shaping 3D assets, concept visuals, and production-ready
          outputs. Keep your pipeline secure, organized, and easier to review at every stage.
        </p>

        <div className="hero-cta-row">
          <button className="primary-button" onClick={() => onOpenAuth("signup")} type="button">
            Start workspace
          </button>
          <button className="ghost-button" onClick={() => onOpenAuth("login")} type="button">
            Explore member login
          </button>
        </div>
      </section>

      <section className="hero-visual" aria-hidden="true">
        <div className="model-stage">
          <div className="model-glow"></div>
          <div className="model-shadow"></div>
          <div className="model-ring model-ring-back"></div>
          <div className="model-ring model-ring-mid"></div>
          <div className="model-cluster">
            <div className="model-core">
              <div className="model-face model-face-top"></div>
              <div className="model-face model-face-bottom"></div>
              <div className="model-face model-face-left"></div>
              <div className="model-face model-face-right"></div>
              <div className="model-face model-face-front"></div>
              <div className="model-face model-face-back"></div>
            </div>
            <div className="model-shard model-shard-a"></div>
            <div className="model-shard model-shard-b"></div>
            <div className="model-shard model-shard-c"></div>
            <div className="model-orbit model-orbit-a"></div>
            <div className="model-orbit model-orbit-b"></div>
            <div className="model-node model-node-a"></div>
            <div className="model-node model-node-b"></div>
            <div className="model-node model-node-c"></div>
          </div>
          <div className="model-ring model-ring-front"></div>
        </div>
      </section>
    </main>
  );
};
