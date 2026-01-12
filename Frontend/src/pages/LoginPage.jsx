import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2 } from "lucide-react"; // Optional: Install lucide-react for icons

const baseUrl = import.meta.env.VITE_BASE_API_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${baseUrl}/auth/login`, formData);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      {/* Decorative background element */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Please enter your details to sign in</p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center animate-shake">
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;