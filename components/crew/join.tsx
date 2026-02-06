import { ArrowUpRight } from "lucide-react"

interface JoinProps {
  content: any[]
}

export function Join({ content }: JoinProps) {
  const sectionContent = content.filter(item => item.section === "join")
  const getValue = (field: string, defaultValue: string) => {
    const item = sectionContent.find(i => i.field === field)
    return item ? item.value : defaultValue
  }

  return (
    <section id="join" className="section section--alt">
      <div className="section__inner">
        <p className="section__tag">Join Us /</p>

        <div className="join__grid">
          <div>
            <h2 className="section__title">
              {getValue("title", "함께 달릴 준비가 되셨나요?")}
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="section__desc">
              {getValue("description", "GSRC81과 함께 구파발천을 달려보세요. 당근 모임에서 가입 신청이 가능합니다. 카톡 오픈채팅방은 소통을 위한 공간입니다.")}
            </p>
          </div>
        </div>

        <div className="join__buttons">
          <a href={getValue("link_carrot", "#")} className="btn btn--primary btn--large" target="_blank" rel="noopener noreferrer">
            당근 모임 가입
            <ArrowUpRight className="btn__icon" />
          </a>
          <a href={getValue("link_kakao", "#")} className="btn btn--outline btn--large" target="_blank" rel="noopener noreferrer">
            카톡 오픈채팅
            <ArrowUpRight className="btn__icon" />
          </a>
        </div>

        <div className="join__checklist">
          <p className="join__checklist-title">가입 전 확인사항</p>
          <ul className="join__checklist-grid">
            <li className="join__checklist-item">
              <span className="join__checklist-number">01</span>
              <span className="join__checklist-text">당근 어플 내 모임 가입 필수</span>
            </li>
            <li className="join__checklist-item">
              <span className="join__checklist-number">02</span>
              <span className="join__checklist-text">카톡 닉네임은 당근 닉네임과 동일하게 설정</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
