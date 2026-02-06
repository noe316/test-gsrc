import { ArrowUpRight } from "lucide-react"

interface AboutProps {
  content: any[]
}

export function About({ content }: AboutProps) {
  const sectionContent = content.filter(item => item.section === "about")
  const getValue = (field: string, defaultValue: string) => {
    const item = sectionContent.find(i => i.field === field)
    return item ? item.value : defaultValue
  }

  return (
    <section id="about" className="section section-wh">
      <div className="section__inner">
        <p className="section__tag">About Us /</p>

        <div className="about__grid">
          <div>
            <h2 className="section__title">
              {getValue("title", "GSRC81은 당근 모임에서 구파발천을 기반으로 한 러닝크루입니다.")}
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="section__desc mb-8">
              {getValue("description", "자세한 공지사항은 회칙과 당근에 작성된 게시물 참고바랍니다. 당근 어플 안에 모임 가입은 필수입니다.")}
            </p>
            <a href="#join" className="about__link">
              가입 신청하기
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="about__stats">
          <div className="about__stat">
            <p className="about__stat-value">G</p>
            <p className="about__stat-label">Gupabal</p>
          </div>
          <div className="about__stat">
            <p className="about__stat-value">S</p>
            <p className="about__stat-label">Stream</p>
          </div>
          <div className="about__stat">
            <p className="about__stat-value">R</p>
            <p className="about__stat-label">Running</p>
          </div>
          <div className="about__stat">
            <p className="about__stat-value">C</p>
            <p className="about__stat-label">Crew</p>
          </div>
        </div>

        <div className="about__tagline">
          <div className="about__tagline-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <p key={i} className="about__tagline-text">
                For<span className="about__tagline-accent">Runners</span>By<span className="about__tagline-accent">Runners</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
