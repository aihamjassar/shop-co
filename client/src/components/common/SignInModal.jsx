import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/slices/auth.Slice";
import { login, loginWithGoogle } from "../../store/thunks/authThunk";
import { Eye, EyeClosed, KeyRound, Mail, X } from "lucide-react";
import { AppleDark, Google } from "@ridemountainpig/svgl-react";
import { useGoogleLogin } from "@react-oauth/google";
import { AppleLoginButton } from "./AppleLoginButton";

const fieldClass = "w-full rounded-xl border bg-white px-11 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

export const SignInModal = ({ dispatch: modalDispatch }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({});
  const reduxDispatch = useDispatch();
  const { status, errors } = useSelector((store) => store.auth);
  const busy = status.login === "loading" || status.google === "loading" || status.apple === "loading";

  const googleLogin = useGoogleLogin({ onSuccess: ({ access_token }) => reduxDispatch(loginWithGoogle(access_token)) });

  useEffect(() => () => {
    reduxDispatch(clearError("login"));
    reduxDispatch(clearError("google"));
  }, [reduxDispatch]);

  useEffect(() => {
    if (status.login === "succeeded" || status.google === "succeeded" || status.apple === "succeeded") {
      const timer = setTimeout(() => modalDispatch({ type: "CLOSE_SIGNIN_MODAL" }), 700);
      return () => clearTimeout(timer);
    }
  }, [status.login, status.google, status.apple, modalDispatch]);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setValidation((current) => ({ ...current, [event.target.name]: "" }));
    if (errors.login || errors.google) {
      reduxDispatch(clearError("login"));
      reduxDispatch(clearError("google"));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextValidation = {};
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextValidation.email = "Enter a valid email address.";
    if (formData.password.length < 6) nextValidation.password = "Password must be at least 6 characters.";
    setValidation(nextValidation);
    if (Object.keys(nextValidation).length === 0) reduxDispatch(login(formData));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onMouseDown={() => modalDispatch({ type: "CLOSE_SIGNIN_MODAL" })}>
      <div role="dialog" aria-modal="true" aria-labelledby="signin-title" className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="absolute right-5 top-5 rounded-full p-2 text-black/60 transition hover:bg-black/5 hover:text-black" onClick={() => modalDispatch({ type: "CLOSE_SIGNIN_MODAL" })} aria-label="Close sign in dialog"><X size={20} /></button>
        <div className="mb-7 pr-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Welcome back</p><h2 id="signin-title" className="text-3xl font-bold tracking-tight">Sign in to Shop.co</h2><p className="mt-2 text-sm text-black/60">Save your favorites, track orders, and check out faster.</p></div>
        <div className="space-y-3">
          <button disabled={busy} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white font-semibold transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={() => googleLogin()}><Google className="size-6" />{status.google === "loading" ? "Connecting..." : "Continue with Google"}</button>
          <AppleLoginButton />
        </div>
        <div className="my-6 flex items-center gap-3 text-xs text-black/40"><span className="h-px flex-1 bg-black/10" />OR CONTINUE WITH EMAIL<span className="h-px flex-1 bg-black/10" /></div>
        {(errors.login || errors.google) && <div role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.login || errors.google}</div>}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div><label htmlFor="signin-email" className="mb-1.5 block text-sm font-semibold">Email address</label><div className="relative"><Mail className="absolute left-3.5 top-3.5 text-black/40" size={18} /><input id="signin-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={`${fieldClass} ${validation.email ? "border-red-500" : "border-black/15"}`} aria-invalid={!!validation.email} />{validation.email && <p className="mt-1 text-xs text-red-600">{validation.email}</p>}</div></div>
          <div><div className="mb-1.5 flex items-center justify-between"><label htmlFor="signin-password" className="text-sm font-semibold">Password</label><button type="button" className="text-xs font-medium text-black/60 hover:text-black" onClick={() => { modalDispatch({ type: "CLOSE_SIGNIN_MODAL" }); modalDispatch({ type: "OPEN_FORGOT_PASSWORD_MODAL" }); }}>Forgot password?</button></div><div className="relative"><KeyRound className="absolute left-3.5 top-3.5 text-black/40" size={18} /><input id="signin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className={`${fieldClass} ${validation.password ? "border-red-500" : "border-black/15"}`} aria-invalid={!!validation.password} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-3 text-black/50 hover:text-black" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeClosed size={19} /> : <Eye size={19} />}</button></div>{validation.password && <p className="mt-1 text-xs text-red-600">{validation.password}</p>}</div>
          <button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-black font-bold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60">{status.login === "loading" ? "Signing in..." : status.login === "succeeded" ? "Signed in" : "Sign in"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-black/60">New to Shop.co? <button type="button" className="font-semibold text-black underline underline-offset-4" onClick={() => { modalDispatch({ type: "CLOSE_SIGNIN_MODAL" }); modalDispatch({ type: "OPEN_SIGNUP_MODAL" }); }}>Create an account</button></p>
      </div>
    </div>
  );
};
