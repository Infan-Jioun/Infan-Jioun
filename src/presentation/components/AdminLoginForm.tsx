"use client";

import { useState } from "react";
import { Lock, Mail, Key, ShieldCheck, AlertCircle, RefreshCw, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { signIn } from "@/infrastructure/auth/auth-client";

interface AdminLoginFormProps {
  onSuccess: () => void;
}

export function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const [email, setEmail] = useState("infanjiounrahman20606@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await signIn.email({
        email: email.trim(),
        password,
      });

      if (res.error) {
        setErrorMessage(res.error.message || "Invalid credentials. Please verify your email and password.");
      } else {
        onSuccess();
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerSeed = async () => {
    setSeeding(true);
    setSeedStatus(null);
    try {
      const res = await fetch("/api/auth/seed", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setSeedStatus(json.data.message);
        if (json.data.email) {
          setEmail(json.data.email);
        }
      } else {
        setSeedStatus(json.error || "Failed to trigger seed.");
      }
    } catch {
      setSeedStatus("Network error while seeding admin account.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4 selection:bg-cyan-500 selection:text-slate-950">
      <div className="w-full max-w-md bg-slate-900/90 border-2 border-indigo-500/50 shadow-[8px_8px_0px_0px_#4f46e5] p-6 sm:p-8 relative overflow-hidden">
        {/* Neon top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_#22d3ee]" />

        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-cyan-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          <span className="text-[10px] font-black uppercase bg-indigo-950 text-cyan-300 border border-cyan-400/40 px-2.5 py-0.5">
            Better Auth · Production
          </span>
        </div>

        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 bg-indigo-950 border-2 border-cyan-400 shadow-[3px_3px_0px_0px_#4f46e5] flex items-center justify-center text-cyan-300">
            <Lock size={22} />
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
            Admin Verification
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Enter your credentials to access the PostgreSQL project management portal.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 bg-rose-950/80 border-2 border-rose-500 p-3 text-xs text-rose-200 flex items-start gap-2 shadow-[3px_3px_0px_0px_#000]">
            <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Seed Info / Status */}
        {seedStatus && (
          <div className="mb-5 bg-emerald-950/80 border-2 border-emerald-500 p-3 text-xs text-emerald-200 flex items-start gap-2 shadow-[3px_3px_0px_0px_#000]">
            <ShieldCheck size={16} className="shrink-0 mt-0.5 text-emerald-400" />
            <span>{seedStatus}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5 flex items-center gap-1.5">
              <Mail size={13} className="text-cyan-400" /> Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@infan.dev"
              className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5] font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5 flex items-center gap-1.5">
              <Key size={13} className="text-cyan-400" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5] font-semibold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 py-2.5 px-4 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#4f46e5] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw size={14} className="animate-spin" /> : <ShieldCheck size={16} />}
            {loading ? "Authenticating Session..." : "Authorize Dashboard Access"}
          </button>
        </form>

        {/* Database Seed Helper Box */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">
            First time setting up? Seed the initial admin account into Neon PostgreSQL:
          </p>
          <button
            type="button"
            onClick={() => void handleTriggerSeed()}
            disabled={seeding}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase text-indigo-300 hover:text-cyan-300 bg-slate-950 border border-indigo-500/30 px-3 py-1 cursor-pointer transition-colors"
          >
            <Sparkles size={12} className={seeding ? "animate-spin text-cyan-400" : "text-cyan-400"} />
            {seeding ? "Seeding Database..." : "Seed Admin to PostgreSQL"}
          </button>
        </div>
      </div>
    </div>
  );
}
