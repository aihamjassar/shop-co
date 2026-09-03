import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/slices/auth.Slice";
import { register, loginWithGoogle } from "../../store/thunks/authThunk";
import { Eye, EyeClosed, KeyRound, Mail, UserRound, X } from "lucide-react";
import { Google } from "@ridemountainpig/svgl-react";
import { useGoogleLogin } from "@react-oauth/google";
import { AppleLoginButton } from "./AppleLoginButton";

const fieldClass = "w-full rounded-xl border bg-white px-11 py-3 text-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10";

export const SignUpModal = ({ dispatch: modalDispatch }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState({});
  const reduxDispatch = useDispatch();
  const { status, errors } = useSelector((store) => store.auth);
  const busy = status.register === "loading" || status.google === "loading" || status.apple === "loading";
  const passwordChecks = useMemo(() => ({ length: formData.password.length >= 6, upper: /[A-Z]/.test(formData.password), lower: /[a-z]/.test(formData.password), number: /\d/.test(formData.password) }), [formData.password]);
  const passwordScore = Object.values(passwordChecks).filter(Boolean).length;
  const googleLogin = useGoogleLogin({ onSuccess: ({ access_token }) => reduxDispatch(loginWithGoogle(access_token)) });

  useEffect(() => () => { reduxDispatch(clearError("register")); reduxDispatch(clearError("google")); }, [reduxDispatch]);
  useEffect(() => {
    if (status.register === "succeeded" || status.google === "succeeded" || status.apple === "succeeded") {
      const timer = setTimeout(() => modalDispatch({ type: "CLOSE_SIGNUP_MODAL" }), 700);
      return () => clearTimeout(timer);
    }
  }, [status.register, status.google, status.apple, modalDispatch]);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    setValidation((current) => ({ ...current, [event.target.name]: "" }));
    if (errors.register || errors.google) { reduxDispatch(clearError("register")); reduxDispatch(clearError("google")); }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextValidation = {};
    if (formData.username.trim().length < 3) nextValidation.username = "Username must be at least 3 characters.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextValidation.email = "Enter a valid email address.";
    if (passwordScore < 4) nextValidation.password = "Use at least 6 characters with upper, lower, and numeric characters.";
    setValidation(nextValidation);
    if (Object.keys(nextValidation).length === 0) reduxDispatch(register(formData));
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onMouseDown={() => modalDispatch({ type: "CLOSE_SIGNUP_MODAL" })}>
      <div role="dialog" aria-modal="true" aria-labelledby="signup-title" className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="absolute right-5 top-5 rounded-full p-2 text-black/60 transition hover:bg-black/5 hover:text-black" onClick={() => modalDispatch({ type: "CLOSE_SIGNUP_MODAL" })} aria-label="Close sign up dialog"><X size={20} /></button>
        <div className="mb-7 pr-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/50">Join the community</p><h2 id="signup-title" className="text-3xl font-bold tracking-tight">Create your account</h2><p className="mt-2 text-sm text-black/60">Get a more personal shopping experience from your first visit.</p></div>
        <div className="space-y-3"><button disabled={busy} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white font-semibold transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={() => googleLogin()}><Google className="size-6" />{status.google === "loading" ? "Connecting..." : "Continue with Google"}</button><AppleLoginButton /></div>
        <div className="my-6 flex items-center gap-3 text-xs text-black/40"><span className="h-px flex-1 bg-black/10" />OR SIGN UP WITH EMAIL<span className="h-px flex-1 bg-black/10" /></div>
        {(errors.register || errors.google) && <div role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errors.register || errors.google}</div>}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div><label htmlFor="signup-username" className="mb-1.5 block text-sm font-semibold">Username</label><div className="relative"><UserRound className="absolute left-3.5 top-3.5 text-black/40" size={18} /><input id="signup-username" name="username" type="text" autoComplete="username" value={formData.username} onChange={handleChange} placeholder="Your username" className={`${fieldClass} ${validation.username ? "border-red-500" : "border-black/15"}`} aria-invalid={!!validation.username} />{validation.username && <p className="mt-1 text-xs text-red-600">{validation.username}</p>}</div></div>
          <div><label htmlFor="signup-email" className="mb-1.5 block text-sm font-semibold">Email address</label><div className="relative"><Mail className="absolute left-3.5 top-3.5 text-black/40" size={18} /><input id="signup-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className={`${fieldClass} ${validation.email ? "border-red-500" : "border-black/15"}`} aria-invalid={!!validation.email} />{validation.email && <p className="mt-1 text-xs text-red-600">{validation.email}</p>}</div></div>
          <div><label htmlFor="signup-password" className="mb-1.5 block text-sm font-semibold">Password</label><div className="relative"><KeyRound className="absolute left-3.5 top-3.5 text-black/40" size={18} /><input id="signup-password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" className={`${fieldClass} ${validation.password ? "border-red-500" : "border-black/15"}`} aria-invalid={!!validation.password} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-3 text-black/50 hover:text-black" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeClosed size={19} /> : <Eye size={19} />}</button></div><div className="mt-2"><div className="mb-1 flex gap-1">{[1, 2, 3, 4].map((step) => <span key={step} className={`h-1 flex-1 rounded-full ${passwordScore >= step ? passwordScore === 4 ? "bg-emerald-500" : "bg-amber-400" : "bg-black/10"}`} />)}</div><p className="text-xs text-black/50">{passwordScore === 4 ? "Strong password" : "Use 6+ characters, upper/lower case, and a number."}</p>{validation.password && <p className="mt-1 text-xs text-red-600">{validation.password}</p>}</div></div>
          <button type="submit" disabled={busy} className="h-12 w-full rounded-xl bg-black font-bold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60">{status.register === "loading" ? "Creating account..." : status.register === "succeeded" ? "Account created" : "Create account"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-black/60">Already have an account? <button type="button" className="font-semibold text-black underline underline-offset-4" onClick={() => { modalDispatch({ type: "CLOSE_SIGNUP_MODAL" }); modalDispatch({ type: "OPEN_SIGNIN_MODAL" }); }}>Sign in</button></p>
      </div>
    </div>
  );
};
