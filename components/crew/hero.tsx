"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

// SVG 속성 확장을 위한 타입 정의
declare module 'react' {
  interface SVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    side?: string;
  }
}

interface HeroProps {
  content: any[]
}

export function Hero({ content }: HeroProps) {
  const [time, setTime] = useState("")
  const [daysLeft, setDaysLeft] = useState(0)
  const [opacity, setOpacity] = useState(1);
  
  // 디버깅용 로그
  console.log("Hero content received:", content);

  const sectionContent = content.filter(item => item.section === "hero")
  const getValue = (field: string, defaultValue: string) => {
    const item = sectionContent.find(i => i.field === field)
    // 값이 있으면 그 값을, 없으면 기본값을 반환
    return item?.value || defaultValue
  }
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }))
      
      // Calculate days until next season (Spring 2026)
      const nextEvent = new Date('2026-04-01')
      const diffTime = nextEvent.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysLeft(diffDays > 0 ? diffDays : 0)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setOpacity(0.7);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <>
      <section className="hero-circle-section" style={{ opacity }}>
        <svg className="circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 300 300">
          <path id="SunCatcherStudio" fill="none" stroke="none"
                d="M 32.550491,148.48008 A -108.15144,-108.15144 0 0 1 140.70194,40.328644 -108.15144,-108.15144 0 0 1 248.85338,148.48008 -108.15144,-108.15144 0 0 1 140.70194,256.63153 -108.15144,-108.15144 0 0 1 32.550491,148.48008 Z"/>
          <text>
            <textPath xlinkHref="#SunCatcherStudio" side="left" startOffset="5">GSRC81 : Gupabal Steam Running Crew © 2023 ●</textPath>
          </text>
        </svg>
      </section>

      <section className="hero hero--almaty">
        {/* Top Bar */}
        <div className="hero__topbar">
          <div className="hero__countdown">
            <p className="hero__countdown-label">Left {daysLeft} days</p>
            <p className="hero__countdown-time">{time}</p>
          </div>
          <a href="#join" className="hero__more-btn">
            <span className="hero__more-dot" />
            More
          </a>
        </div>

        {/* Main Title - Almaty Style */}
        <div className="hero__main">
          <h1 className="hero__almaty-title">
            <img src="/images/logo-white.webp" alt="GSRC81" className="" />
            {/*<span className="hero__almaty-line">GSRC81</span>*/}
            {/*<span className="hero__almaty-line">RUNNING</span>*/}
            {/*<span className="hero__almaty-line">CREW</span>*/}
            {/*<span className="hero__almaty-line hero__almaty-line--accent">2024 /</span>*/}
            {/*<span className="hero__almaty-line hero__almaty-line--muted">SEOUL</span>*/}
          </h1>
        </div>

        {/* Bottom Info - 3 Column Layout */}
        <div className="hero__bottom">
          <div className="hero__bottom-col hero__bottom-col--desc">
            <p className="hero__bottom-text" style={{ whiteSpace: "pre-wrap" }}>
              {getValue("description",
                  "구파발천을 기반으로 한 2030 러닝크루" +"\n당근 모임에서 만나요!")}
            </p>
          </div>
          <div className="hero__bottom-col hero__bottom-col--location">
            <p className="hero__bottom-location">은평구, 서울</p>
            <p className="hero__bottom-sub">Seoul, Korea</p>
          </div>
          <div className="hero__bottom-col hero__bottom-col--info">
            <ul className="hero__info-list">
              <li className="hero__info-item">Regular session</li>
              <li className="hero__info-item">Beginner session</li>
              <li className="hero__info-item">Training team: ep-racer</li>
              <li className="hero__info-item">Trail Running</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
