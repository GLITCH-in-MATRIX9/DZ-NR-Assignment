import Link from "next/link";

export default function GlobalErrorPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 720, textAlign: "center" }}>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
          Oops — Something went wrong
        </h1>
        <p style={{ color: "#555", marginBottom: "1.25rem" }}>
          The app encountered an unexpected error. You can try reloading the
          page or go back to the home page.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => location.reload()}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: 6,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            Reload
          </button>

          <Link href="/">
            <a
              style={{
                display: "inline-block",
                padding: "0.6rem 1rem",
                borderRadius: 6,
                background: "#0b61ff",
                color: "white",
                textDecoration: "none",
              }}
            >
              Home
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
}