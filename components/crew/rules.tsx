import { AlertCircle } from "lucide-react"

interface RulesProps {
  content: any[]
}

const defaultRules = [
  {
    number: "001",
    title: "당근 모임 필수",
    description: "당근 어플 안에 모임 가입은 필수입니다. 모든 일정은 당근에 올라옵니다.",
  },
  {
    number: "002",
    title: "카톡방 참여",
    description: "카톡 오픈채팅방은 소통방입니다. 카톡방을 나가시면 준회원으로 전환되어 활동이 제한됩니다.",
  },
  {
    number: "003",
    title: "무단 이탈 금지",
    description: "말없이 카톡방을 나가시면 당근 모임에서도 내보내집니다. 적극 참여 가능할 때 재방문 환영합니다.",
  },
  {
    number: "004",
    title: "닉네임 통일",
    description: "당근 닉네임과 카톡 닉네임을 일치시켜 주세요.",
  },
]

export function Rules({ content }: RulesProps) {
  const sectionContent = content.filter(item => item.section === "rules")
  const getValue = (field: string, defaultValue: string) => {
    const item = sectionContent.find(i => i.field === field)
    return item ? item.value : defaultValue
  }

  return (
    <section id="rules" className="section section--alt">
      <div className="section__inner">
        <p className="section__tag">Principles /</p>

        <h2 className="section__title mb-16 max-w-4xl">
          {getValue("title", "모두가 즐겁고 원활하게 활동할 수 있도록, 아래 규칙을 지켜주세요.")}
        </h2>

        <div className="rules__list">
          {defaultRules.map((rule) => (
            <div key={rule.number} className="rules__item">
              <div className="rules__item-grid">
                <span className="rules__number">{rule.number}</span>
                <h3 className="rules__title">{getValue(`rule_${rule.number}_title`, rule.title)}</h3>
                <p className="rules__desc">{getValue(`rule_${rule.number}_desc`, rule.description)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rules__notice">
          <div className="rules__notice-inner">
            <AlertCircle className="rules__notice-icon" />
            <div>
              <h4 className="rules__notice-title">가입 시 필수 입력 양식</h4>
              <p className="rules__notice-text">
                {getValue("notice_text", "닉네임 / 실명(성까지) / 사는 동네 / 생년 / 성별")}
              </p>
              <p className="rules__notice-example">
                {getValue("notice_example", "ex) 라이언 / 김아무개 / 불광 / 00 / 남")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
