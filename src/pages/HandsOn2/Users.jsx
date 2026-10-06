import { useState, useEffect } from "react";
import { isValidEmail } from "../../utils/validators.js";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0); // change it to fetch again (Retry)

  useEffect(() => {
    const controller = new AbortController(); // cancels the request if we leave the page

    async function loadUsers() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        setUsers(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(`Could not load users. ${err.message}`);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadUsers();
    return () => controller.abort();
  }, [attempt]);

  if (loading) return <p className="status">Loading...</p>;

  if (error) {
    return (
      <section className="card">
        <p className="msg error" role="alert">{error}</p>
        <button className="btn full" onClick={() => setAttempt((a) => a + 1)}>
          Try again
        </button>
      </section>
    );
  }

  const text = query.trim().toLowerCase();
  const visible = users.filter((u) =>
    [u.name, u.username, u.email].some((field) => field.toLowerCase().includes(text))
  );

  return (
    <section className="card wide">
      <div className="toolbar">
        <h2>User List</h2>
        <input
          type="search"
          className="search"
          placeholder="Search name, username or email"
          aria-label="Search users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>
                  {isValidEmail(user.email) ? (
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  ) : (
                    <span className="invalid">{user.email} (invalid email)</span>
                  )}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={4} className="empty">No users match "{query}".</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="hint">Showing {visible.length} of {users.length} users</p>
    </section>
  );
}
