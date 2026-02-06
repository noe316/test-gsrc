"use client";

import React from "react"

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__header">
          <img
            src="/images/logo-white.webp"
            alt="GSRC81"
            className="admin-login__logo"
          />
          <h1 className="admin-login__title">관리자 로그인</h1>
          <p className="admin-login__subtitle">사이트 콘텐츠를 수정하려면 로그인하세요</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login__form">
          {error && (
            <div className="admin-login__error">
              {error}
            </div>
          )}

          <div className="admin-login__field">
            <label htmlFor="email" className="admin-login__label">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-login__input"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="admin-login__field">
            <label htmlFor="password" className="admin-login__label">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login__input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn--primary admin-login__submit"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="admin-login__footer">
          <a href="/" className="admin-login__back">
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
}
