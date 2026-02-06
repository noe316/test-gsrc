import { ArrowUpRight } from "lucide-react"

interface TrainingProps {
  content: any[]
}

const defaultPrograms = [
  {
    number: "01",
    level: "BEGINNER",
    title: "초보벙",
    description: "처음 러닝을 시작하는 초보분들을 위한 프로그램",
    features: ["5~6km", "7'00~7'30", "800m 러닝 + 200m 걷기"],
  },
  {
    number: "02",
    level: "All",
    title: "정기런",
    description: "전체 크루원 대상으로 모든 수준의 러너가 함께 달리는 프로그램",
    features: ["4~5km", "A-E 수준별 조편성", "매주 화요일"],
  },
  {
    number: "03",
    level: "ADVANCED",
    title: "은평레이서",
    description: "하프마라톤 및 각종 대회 참가를 목표로 하는 러너를 위한 연합훈련",
    features: ["8~13km", "1~6 수준별 조편성", "매주 목요일"],
  },
]

const defaultSchedule = [
  { day: "화", time: "20:00", type: "인터벌", location: "구파발천" },
  { day: "목", time: "20:00", type: "그룹런", location: "구파발천" },
  { day: "토", time: "09:00", type: "정기런", location: "북한산 일대" },
]

export function Training({ content }: TrainingProps) {
  const sectionContent = content.filter(item => item.section === "training")
  const getValue = (field: string, defaultValue: string) => {
    const item = sectionContent.find(i => i.field === field)
    return item ? item.value : defaultValue
  }

  return (
    <section id="training" className="section section-wh">
      <div className="section__inner">
        <p className="section__tag">Programs /</p>

        <h2 className="section__title mb-6 max-w-4xl">
          {getValue("title", "레벨에 맞는 프로그램을 선택하고, 체계적인 훈련으로 목표를 달성하세요.")}
        </h2>
        <p className="section__desc mb-16">
          {getValue("description", "당신의 러닝 여정을 함께합니다.")}
        </p>

        <div className="programs__grid">
          {defaultPrograms.map((program) => (
            <div key={program.level} className="programs__card">
              <div className="programs__card-header">
                <span className="programs__card-number">{program.number}</span>
                <span className="programs__card-level">{program.level}</span>
              </div>
              
              <h3 className="programs__card-title">{getValue(`program_${program.number}_title`, program.title)}</h3>
              
              <p className="programs__card-desc">{getValue(`program_${program.number}_desc`, program.description)}</p>

              <ul className="programs__features">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="programs__feature">
                    <span className="programs__feature-dot" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button type="button" className="programs__card-btn">
                자세히 보기
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div>
          <p className="section__tag">Weekly Schedule /</p>
          
          <div className="schedule__grid">
            {defaultSchedule.map((item) => (
              <div key={item.day} className="schedule__card">
                <div className="schedule__header">
                  <p className="schedule__day">{item.day}</p>
                  <p className="schedule__time">{getValue(`schedule_${item.day}_time`, item.time)}</p>
                </div>
                <div className="schedule__body">
                  <p className="schedule__type">{getValue(`schedule_${item.day}_type`, item.type)}</p>
                  <p className="schedule__location">{getValue(`schedule_${item.day}_location`, item.location)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="schedule__note">
            {getValue("schedule_note", "* 모든 일정은 당근 모임에서 확인해주세요. 날씨 등에 따라 일정이 변경될 수 있습니다.")}
          </p>
        </div>
      </div>
    </section>
  )
}
