import { useAuth } from "./context/AuthContext";

function TestAuth() {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking auth...</p>;

  return (
    <div>
      {user ? (
        <pre>LOGGED IN USER 👉 {JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>NOT LOGGED IN ❌</p>
      )}
    </div>
  );
}

export default TestAuth;
