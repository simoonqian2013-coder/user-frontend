<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <h1>联系我们</h1>
        <p class="hero-note">
          如果您有任何建议或问题，或者在生活中发现需要帮助的流浪动物，欢迎通过电话或邮箱与我们联系。请尽量提供发现地点、动物情况等信息，我们会根据实际情况进行核实与救助。
        </p>
      </div>
    </section>

    <section class="info-section">
      <div class="container info-grid">
        <div class="info-card">
          <div class="info-icon">📞</div>
          <div class="info-title">联系电话</div>
          <div class="info-main">173-5513-2852</div>
          <div class="info-desc">工作时间内为您提供咨询服务</div>
        </div>
        <div class="info-card">
          <div class="info-icon">✉️</div>
          <div class="info-title">邮箱地址</div>
          <div class="info-main">2185907473@qq.com</div>
          <div class="info-desc">我们会在24小时内回复您的邮件</div>
        </div>
        <div class="info-card">
          <div class="info-icon">📍</div>
          <div class="info-title">收留所地址</div>
          <div class="info-main">合肥市瑶海区方庙街道</div>
          <div class="info-desc">欢迎预约参观，了解我们的工作</div>
        </div>
        <div class="info-card">
          <div class="info-icon">⏰</div>
          <div class="info-title">开放时间</div>
          <div class="info-main">周一至周日 9:00-17:00</div>
          <div class="info-desc">节假日正常开放，为流浪动物提供照顾</div>
        </div>
      </div>
    </section>

    <section class="form-section">
      <div class="container form-grid">
        <div class="side-card">
          <div class="card-title">收留所位置</div>
          <div class="card-desc">合肥市瑶海区方庙街道</div>
          <div class="map-box">
            <iframe
              class="map-embed"
              title="收留所位置"
              src="https://www.openstreetmap.org/export/embed.html?bbox=117.3205%2C31.8726%2C117.3405%2C31.8846&layer=mapnik&marker=31.8786%2C117.3305"
            ></iframe>
          </div>
          <ul class="traffic-list">
            <li>地铁：10号线爱心站A出口，步行5分钟</li>
            <li>公交：123路、456路爱心路站下车</li>
            <li>自驾：提供免费停车位</li>
          </ul>
        </div>

        <div class="side-card">
          <div class="card-title">常见问题</div>
          <div class="qa-item">
            <div class="qa-q">如何领养动物？</div>
            <div class="qa-a">您可以在线提交领养申请，我们会安排工作人员与您联系，进行详细沟通和实地参观。</div>
          </div>
          <div class="qa-item">
            <div class="qa-q">可以参观收留所吗？</div>
            <div class="qa-a">当然可以！请提前电话预约，我们会安排专人介绍和参观。</div>
          </div>
          <div class="qa-item">
            <div class="qa-q">如何成为志愿者？</div>
            <div class="qa-a">通过联系电话联系我们，我们会根据您的时间和技能安排合适的志愿工作。</div>
          </div>
          <div class="qa-item">
            <div class="qa-q">捐赠物品有什么要求？</div>
            <div class="qa-a">我们需要狗粮、玩具、毯子等用品，请确保物品干净、无损坏。</div>
          </div>
        </div>

        <div class="side-card alert-card">
          <div class="alert-title">紧急救助</div>
          <div class="alert-text">如果您发现需要紧急救助的流浪动物，请立即联系我们：</div>
          <div class="alert-hotline">紧急热线：173-5513-2852</div>
          <div class="alert-sub">24小时接听，我们会立即派遣救助人员</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact'
};
</script>

<style scoped>
.page-hero {
  padding: 60px 0 30px;
  text-align: center;
}

.page-hero h1 {
  margin: 0 0 8px;
  font-size: 32px;
}

.page-hero p {
  margin: 0 auto;
  color: var(--muted);
  max-width: 980px;
  line-height: 1.9;
  font-size: 16px;
}

.info-section {
  padding: 20px 0 30px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.info-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px 16px;
  text-align: center;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.info-icon {
  width: 46px;
  height: 46px;
  margin: 0 auto 10px;
  border-radius: 50%;
  background: #ffe7ef;
  color: var(--orange-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.info-title {
  font-weight: 700;
  margin-bottom: 6px;
}

.info-main {
  font-weight: 600;
}

.info-desc {
  color: var(--muted);
  font-size: 12px;
  margin-top: 6px;
}

.form-section {
  padding: 20px 0 70px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.side-card {
  background: #fff;
  border-radius: 10px;
  padding: 22px 24px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}

.card-desc {
  color: var(--muted);
  margin-bottom: 16px;
}

.map-box {
  height: 460px;
  background: #eef0f4;
  border-radius: 8px;
  color: #6b7280;
  margin: 12px 0;
  overflow: hidden;
}

.map-embed {
  width: 100%;
  height: 100%;
  border: 0;
}

.traffic-list {
  padding-left: 18px;
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.qa-item {
  margin-bottom: 14px;
}

.qa-q {
  font-weight: 600;
  margin-bottom: 4px;
}

.qa-a {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.6;
}

.alert-card {
  background: #fff0f0;
  border: 1px solid #ffd1d1;
}

.alert-title {
  color: #d61f1f;
  font-weight: 700;
  margin-bottom: 8px;
}

.alert-text {
  color: #b91c1c;
}

.alert-hotline {
  color: #d61f1f;
  font-weight: 700;
  margin-top: 10px;
}

.alert-sub {
  color: #b91c1c;
  font-size: 12px;
  margin-top: 6px;
}

@media (max-width: 980px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .map-box {
    height: 320px;
  }
}
</style>
