import { Link, useNavigate } from "react-router-dom";
import Input from "@/body component/input-component";
import { useState } from "react";
import { toast } from "sonner";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";

export default function LoginComponent({ header }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(false);
  const { login } = useLoginAuth();

  async function handleLogin(e) {
    setState(true);
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/loading", { state: { redirectTo: "/" } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setState(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-xl shadow-lg border border-border">
      <h1 className="text-2xl font-bold text-center mb-6 text-foreground">{header || "Login"}</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="accent-primary h-4 w-4" />
          <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
        </div>

        <button
          disabled={state}
          className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state ? "Logging in..." : "Login"}
        </button>

        <div className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? <Link to="/register" className="text-primary hover:underline font-semibold">Register now</Link>
        </div>

        <hr className="my-6 border-border" />

        <Link className="text-center block text-sm text-muted-foreground hover:text-foreground transition-colors" to='/RecoverPassword'>
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
