import { RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export const SeedPage = () => {
  const hasSeeded = useRef(false);
  const [state, setState] = useState({ status: "loading", message: "Seeding products...", count: 0 });

  const runSeed = async () => {
    setState({ status: "loading", message: "Deleting old products and adding fresh seed data...", count: 0 });
    try {
      const response = await axiosInstance.get("/seed");
      setState({
        status: "success",
        message: response.data.message,
        count: response.data.count,
      });
    } catch (error) {
      setState({
        status: "error",
        message: error.response?.data?.message || "Seed failed. Make sure the API is running in development mode.",
        count: 0,
      });
    }
  };

  useEffect(() => {
    if (hasSeeded.current) return;
    hasSeeded.current = true;
    runSeed();
  }, []);

  return (
    <div className="container mx-auto px-5 md:px-8 py-16 min-h-[60vh] flex items-center justify-center">
      <section className="w-full max-w-xl border border-black/15 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
        {state.status === "loading" && <RefreshCw className="mx-auto animate-spin" size={52} />}
        {state.status === "success" && <CheckCircle2 className="mx-auto text-green-600" size={58} />}
        {state.status === "error" && <AlertTriangle className="mx-auto text-red-600" size={58} />}
        <h1 className="mt-5 text-3xl font-extrabold uppercase -tracking-wider">Seed products</h1>
        <p className="mt-3 text-black/60 leading-6">{state.message}</p>
        {state.status === "success" && (
          <p className="mt-4 text-lg font-bold">{state.count} products are now available.</p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {state.status === "error" && (
            <button
              type="button"
              onClick={runSeed}
              className="inline-flex items-center justify-center h-11 px-7 rounded-2xl bg-black text-white"
            >
              Try again
            </button>
          )}
          <Link
            to="/shop"
            className="inline-flex items-center justify-center h-11 px-7 rounded-2xl border border-black/20"
          >
            Open shop
          </Link>
        </div>
      </section>
    </div>
  );
};
