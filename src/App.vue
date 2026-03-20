<template>
  <div id="app" class="shell">
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <img class="brand-logo" src="/logo.svg" alt="宠物领养救助平台" />
          <div class="brand-text">
            <div class="brand-title">宠物领养救助平台</div>
            <div class="brand-sub">Rescue & Care</div>
          </div>
        </div>
        <nav class="nav">
          <router-link to="/" exact-active-class="active">首页</router-link>
          <router-link to="/adopt" exact-active-class="active">领养中心</router-link>
          <router-link to="/donation" exact-active-class="active">爱心捐赠</router-link>
          <router-link to="/stories" exact-active-class="active">救助故事</router-link>
          <router-link to="/contact" exact-active-class="active">联系我们</router-link>
          <router-link to="/knowledge" exact-active-class="active">救助知识</router-link>
        </nav>
      </div>
    </header>

    <router-view />

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
          <div class="footer-item">173-5513-2852</div>
          <div class="footer-item">2185907473@qq.com</div>
          <div class="footer-item">合肥市瑶海区方庙街道</div>
        </div>
        <div class="footer-block">
          <div class="footer-title">快速链接</div>
          <router-link class="footer-item footer-link" to="/adopt">领养中心</router-link>
          <router-link class="footer-item footer-link" to="/donation">爱心捐赠</router-link>
          <router-link class="footer-item footer-link" to="/knowledge">救助知识</router-link>
          <router-link class="footer-item footer-link" to="/stories">救助故事</router-link>
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

.brand-logo {
  width: 52px;
  height: 52px;
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
  display: block;
  margin-bottom: 10px;
}

.footer-link {
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
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

  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
