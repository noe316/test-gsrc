export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <img
              src="/images/logo-white.webp"
              alt="GSRC81"
              className="footer__logo"
            />
            <p className="footer__desc">
              구파발천을 기반으로 한 2030 러닝 커뮤니티
            </p>
          </div>
          
          <div className="footer__links">
            <a href="#about" className="footer__link">[소개]</a>
            <a href="#rules" className="footer__link">[회칙]</a>
            <a href="#training" className="footer__link">[프로그램]</a>
            <a href="#join" className="footer__link">[가입]</a>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>© 2025 GSRC81. All rights reserved.</p>
          <a href="/admin" className="footer__link">[Admin]</a>
        </div>
      </div>
    </footer>
  )
}
