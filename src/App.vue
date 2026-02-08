<template>
  <div id="app" class="home">
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <div class="brand-icon">❤</div>
          <div class="brand-text">
            <div class="brand-title">宠物领养救助平台</div>
            <div class="brand-sub">Rescue & Care</div>
          </div>
        </div>
        <nav class="nav">
          <a class="active" href="#">首页</a>
          <a href="#">领养中心</a>
          <a href="#">爱心捐赠</a>
          <a href="#">志愿者</a>
          <a href="#">救助故事</a>
          <a href="#">联系我们</a>
          <a href="#">救助知识</a>
        </nav>
      </div>
    </header>

    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-content">
        <p class="hero-tag">一起行动，为生命留一盏灯</p>
        <h1>给流浪动物一个温暖的家</h1>
        <p class="hero-desc">每一个生命都值得被善待，每一份爱心都能改变一个生命的轨迹</p>
        <div class="hero-actions">
          <button class="btn btn-solid">立即领养</button>
          <button class="btn btn-outline">爱心捐赠</button>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container stats-grid">
        <div class="stat-card">
          <div class="stat-icon">❤</div>
          <div class="stat-num">1,200+</div>
          <div class="stat-label">已救助动物</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-num">800+</div>
          <div class="stat-label">成功领养</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏅</div>
          <div class="stat-num">150+</div>
          <div class="stat-label">志愿者</div>
        </div>
      </div>
    </section>

    <section class="adoption">
      <div class="container">
        <div class="section-title">
          <h2>等待领养的毛孩子</h2>
          <p>它们正在等待一个充满爱的家庭，给它们一个重新开始的机会</p>
        </div>
        <div class="card-grid">
          <div class="pet-card">
            <div class="pet-cover" style="background-image:url('https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80')"></div>
            <div class="pet-body">
              <div class="pet-name">小白</div>
              <div class="pet-meta">2岁 · 金毛</div>
              <div class="pet-desc">温顺友善，喜欢和小朋友玩耍</div>
              <button class="btn btn-solid full">了解更多</button>
            </div>
          </div>
          <div class="pet-card">
            <div class="pet-cover" style="background-image:url('https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80')"></div>
            <div class="pet-body">
              <div class="pet-name">豆豆</div>
              <div class="pet-meta">1岁 · 拉布拉多</div>
              <div class="pet-desc">活泼可爱，很聪明，容易训练</div>
              <button class="btn btn-solid full">了解更多</button>
            </div>
          </div>
          <div class="pet-card">
            <div class="pet-cover" style="background-image:url('https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=900&q=80')"></div>
            <div class="pet-body">
              <div class="pet-name">毛毛</div>
              <div class="pet-meta">3岁 · 边牧</div>
              <div class="pet-desc">聪明伶俐，忠诚可靠的伙伴</div>
              <button class="btn btn-solid full">了解更多</button>
            </div>
          </div>
        </div>
        <div class="center-actions">
          <button class="btn btn-solid">查看所有待领养动物</button>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container cta-inner">
        <h2>加入我们的爱心行动</h2>
        <p>无论是领养、捐赠还是志愿服务，每一份参与都是对生命的尊重和关爱</p>
        <div class="cta-actions">
          <button class="btn btn-light">成为志愿者</button>
          <button class="btn btn-outline-light">查看救助故事</button>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-block">
          <div class="footer-brand">
            <span class="brand-icon">❤</span>
            <span>宠物领养救助平台</span>
          </div>
          <p>为流浪动物寻找温暖的家，让每一个生命都被善待。</p>
          <p>我们致力于救助流浪动物，为它们提供医疗救治、临时收容和寻找领养家庭的服务。</p>
        </div>
        <div class="footer-block">
          <div class="footer-title">联系方式</div>
          <div class="footer-item">400-123-4567</div>
          <div class="footer-item">rescue@doghelp.com</div>
          <div class="footer-item">北京市朝阳区爱心路123号</div>
        </div>
        <div class="footer-block">
          <div class="footer-title">快速链接</div>
          <div class="footer-item">领养中心</div>
          <div class="footer-item">爱心捐赠</div>
          <div class="footer-item">志愿者招募</div>
          <div class="footer-item">救助故事</div>
        </div>
      </div>
      <div class="footer-bottom">@2026 宠物领养救助平台</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
:root {
  --orange: #f28aa6;
  --orange-deep: #e56786;
  --orange-light: #ffb8c9;
  --ink: #2b1b1f;
  --muted: #7a5a63;
  --bg: #fff7f9;
  --dark: #2b1b1f;
  --card: #ffffff;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Alibaba PuHuiTi", "Noto Sans SC", "Microsoft YaHei", sans-serif;
  color: var(--ink);
  background: var(--bg);
}

a {
  text-decoration: none;
  color: inherit;
}

.container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 20px;
}

.site-header {
  background: #fff;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.08);
  position: sticky;
  top: 0;
  z-index: 20;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 78px;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ffe6d0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--orange-deep);
  font-weight: 700;
}

.brand-title {
  font-weight: 700;
  color: var(--orange-deep);
}

.brand-sub {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 1px;
}

.nav {
  display: flex;
  gap: 22px;
  font-size: 14px;
}

.nav a {
  padding: 8px 6px;
  color: var(--muted);
  border-bottom: 2px solid transparent;
}

.nav a.active {
  color: var(--orange-deep);
  border-color: var(--orange-deep);
  font-weight: 600;
}

.hero {
  position: relative;
  color: #fff;
  padding: 110px 0 130px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, var(--orange-deep), var(--orange-light));
}

.hero-content {
  position: relative;
  text-align: center;
}

.hero-tag {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  letter-spacing: 2px;
  font-size: 12px;
}

.hero h1 {
  margin: 22px 0 10px;
  font-size: 46px;
}

.hero-desc {
  margin: 0;
  font-size: 18px;
  color: #fff3e6;
}

.hero-actions {
  margin-top: 28px;
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn {
  border: none;
  padding: 12px 28px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.btn-solid {
  background: #fff;
  color: var(--orange-deep);
  box-shadow: 0 8px 20px rgba(244, 124, 44, 0.35);
}

.btn-outline {
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
}

.btn-solid:hover {
  transform: translateY(-1px);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.18);
}

.stats {
  background: #fff;
  padding: 56px 0 68px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.stat-card {
  text-align: center;
  background: #fff;
  border-radius: 12px;
  padding: 22px 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.stat-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin: 0 auto 12px;
  background: #ffe6d0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--orange-deep);
  font-size: 22px;
}

.stat-num {
  font-size: 30px;
  font-weight: 700;
}

.stat-label {
  color: var(--muted);
  margin-top: 6px;
}

.adoption {
  background: #fffaf4;
  padding: 70px 0 90px;
}

.section-title {
  text-align: center;
  margin-bottom: 36px;
}

.section-title h2 {
  margin: 0 0 8px;
  font-size: 30px;
}

.section-title p {
  margin: 0;
  color: var(--muted);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
}

.pet-card {
  background: var(--card);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.pet-cover {
  height: 180px;
  background-size: cover;
  background-position: center;
}

.pet-body {
  padding: 18px 20px 22px;
}

.pet-name {
  font-size: 20px;
  font-weight: 700;
}

.pet-meta {
  margin: 8px 0 12px;
  color: var(--muted);
}

.pet-desc {
  color: #4b5563;
  margin-bottom: 18px;
}

.btn.full {
  width: 100%;
}

.center-actions {
  display: flex;
  justify-content: center;
  margin-top: 34px;
}

.cta {
  background: linear-gradient(120deg, var(--orange-deep), var(--orange));
  padding: 70px 0;
  color: #fff;
}

.cta-inner {
  text-align: center;
}

.cta-inner h2 {
  margin: 0 0 12px;
  font-size: 32px;
}

.cta-inner p {
  margin: 0;
  color: #ffe8d2;
}

.cta-actions {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-light {
  background: #fff;
  color: var(--orange-deep);
}

.btn-outline-light {
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
}

.footer {
  background: #1f2937;
  color: #d1d5db;
  padding: 58px 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 28px;
}

.footer-title {
  font-weight: 600;
  margin-bottom: 12px;
  color: #fff;
}

.footer-item {
  margin-bottom: 10px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-weight: 600;
  margin-bottom: 10px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 32px;
  padding-top: 16px;
  text-align: center;
  color: #9ca3af;
}

@media (max-width: 980px) {
  .nav {
    display: none;
  }

  .stats-grid,
  .card-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 36px;
  }

  .hero-actions,
  .cta-actions {
    flex-direction: column;
  }
}
</style>
