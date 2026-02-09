"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { Save, LogOut, Plus, Trash2 } from "lucide-react";

interface ContentItem {
  id: string;
  section: string;
  field: string;
  value: string;
  updated_at: string;
}

interface AdminDashboardProps {
  user: User;
  initialContent: ContentItem[];
}

const SECTIONS = [
  { id: "hero", name: "히어로 섹션" },
  { id: "about", name: "크루 소개" },
  { id: "rules", name: "회칙" },
  { id: "training", name: "훈련 프로그램" },
  { id: "join", name: "가입 안내" },
];

export default function AdminDashboard({ user, initialContent }: AdminDashboardProps) {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [newField, setNewField] = useState({ field: "", value: "" });
  const [mountedDates, setMountedDates] = useState<Record<string, string>>({});
  const router = useRouter();
  const supabase = createClient();

  // 클라이언트에서만 날짜 포맷팅하기
  useEffect(() => {
    const dates: Record<string, string> = {};
    initialContent.forEach((item) => {
      dates[item.id] = new Date(item.updated_at).toLocaleString("ko-KR");
    });
    setMountedDates(dates);
  }, [initialContent]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleSave = async (item: ContentItem) => {
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("site_content")
      .upsert({
        id: item.id,
        section: item.section,
        field: item.field,
        value: item.value,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setMessage({ type: "error", text: `저장 실패: ${error.message}` });
    } else {
      setMessage({ type: "success", text: "저장되었습니다!" });
      router.refresh(); // 서버 컴포넌트 데이터 갱신
    }

    setSaving(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddField = async () => {
    if (!newField.field || !newField.value) return;

    const id = `${activeSection}_${newField.field.toLowerCase().replace(/\s+/g, "_")}`;

    const newItem: ContentItem = {
      id,
      section: activeSection,
      field: newField.field,
      value: newField.value,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("site_content").upsert(newItem);

    if (error) {
      setMessage({ type: "error", text: `추가 실패: ${error.message}` });
      return;
    }

    setContent([...content, newItem]);
    setNewField({ field: "", value: "" });
    setMessage({ type: "success", text: "필드가 추가되었습니다!" });
    router.refresh(); // 서버 컴포넌트 데이터 갱신
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const { error } = await supabase.from("site_content").delete().eq("id", id);

    if (error) {
      setMessage({ type: "error", text: `삭제 실패: ${error.message}` });
      return;
    }

    setContent(content.filter((item) => item.id !== id));
    setMessage({ type: "success", text: "삭제되었습니다!" });
    router.refresh(); // 서버 컴포넌트 데이터 갱신
    setTimeout(() => setMessage(null), 3000);
  };

  const handleValueChange = (id: string, value: string) => {
    setContent(
      content.map((item) =>
        item.id === id ? { ...item, value } : item
      )
    );
  };

  const filteredContent = content.filter((item) => item.section === activeSection);

  return (
    <div className="admin">
      {/* Header */}
      <header className="admin__header">
        <div className="admin__header-inner">
          <div className="admin__brand">
            <img src="/images/logo-white.webp" alt="GSRC81" className="admin__logo" />
            <span className="admin__title">콘텐츠 관리</span>
          </div>
          <div className="admin__user">
            <span className="admin__email">{user.email}</span>
            <button onClick={handleLogout} className="admin__logout" type="button">
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className={`admin__message admin__message--${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin__layout">
        {/* Sidebar */}
        <aside className="admin__sidebar">
          <nav className="admin__nav">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`admin__nav-item ${activeSection === section.id ? "admin__nav-item--active" : ""}`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin__main">
          <div className="admin__section-header">
            <h2 className="admin__section-title">
              {SECTIONS.find((s) => s.id === activeSection)?.name}
            </h2>
          </div>

          {/* Content List */}
          <div className="admin__content-list">
            {filteredContent.length === 0 ? (
              <div className="admin__empty">
                이 섹션에 등록된 콘텐츠가 없습니다.
              </div>
            ) : (
              filteredContent.map((item) => (
                <div key={item.id} className="admin__content-item">
                  <div className="admin__content-header">
                    <label className="admin__content-label">{item.field}</label>
                    <div className="admin__content-actions">
                      <button
                        type="button"
                        onClick={() => handleSave(item)}
                        disabled={saving}
                        className="admin__btn admin__btn--save"
                      >
                        <Save className="w-4 h-4" />
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="admin__btn admin__btn--delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={item.value}
                    onChange={(e) => handleValueChange(item.id, e.target.value)}
                    className="admin__textarea"
                    rows={item.value.length > 100 ? 5 : 2}
                  />
                  <span className="admin__updated">
                    마지막 수정: {mountedDates[item.id] || "로딩 중..."}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Add New Field */}
          <div className="admin__add-field">
            <h3 className="admin__add-title">새 필드 추가</h3>
            <div className="admin__add-form">
              <input
                type="text"
                placeholder="필드명 (예: title, description)"
                value={newField.field}
                onChange={(e) => setNewField({ ...newField, field: e.target.value })}
                className="admin__input"
              />
              <textarea
                placeholder="내용을 입력하세요"
                value={newField.value}
                onChange={(e) => setNewField({ ...newField, value: e.target.value })}
                className="admin__textarea"
                rows={3}
              />
              <button
                type="button"
                onClick={handleAddField}
                className="btn btn--primary"
              >
                <Plus className="w-4 h-4" />
                필드 추가
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
