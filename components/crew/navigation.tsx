"use client"

import { useState } from "react"

const navItems = [
  { label: "소개", href: "#about" },
  { label: "회칙", href: "#rules" },
  { label: "프로그램", href: "#training" },
  { label: "가입", href: "#join" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="nav">
        <a href="#" className="nav__logo">
          <img
            src="/images/logo-white.webp"
            alt="GSRC81"
            className="nav__logo-img"
          />
        </a>
        
        <div className="nav__menu">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="nav__link"
            >
              {item.label} {index < navItems.length - 1 && <span className="text-primary ml-2">/</span>}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="nav__toggle"
          aria-label="메뉴 열기"
        >
          Menu
        </button>
      </nav>

      {isOpen && (
        <div className="nav__mobile">
          <div className="nav__mobile-inner">
            <div className="nav__mobile-header">
              <img
                src="/images/logo-white.webp"
                alt="GSRC81"
                className="nav__logo-img"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="nav__toggle"
                aria-label="메뉴 닫기"
              >
                Close
              </button>
            </div>
            
            <div className="nav__mobile-menu">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="nav__mobile-item"
                >
                  <span className="nav__mobile-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="nav__mobile-label">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="nav__mobile-footer">
              <p className="font-mono">GSRC81</p>
              <p>구파발천 러닝크루</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
