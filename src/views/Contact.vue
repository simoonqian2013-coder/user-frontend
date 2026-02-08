<template>
  <div class="contact-page">
    <section class="page-hero">
      <div class="container">
        <h1>联系我们</h1>
        <p>如果您有任何问题或建议，请随时与我们联系，我们很乐意为您提供帮助</p>
      </div>
    </section>

    <section class="info-section">
      <div class="container info-grid">
        <div class="info-card">
          <div class="info-icon">📞</div>
          <div class="info-title">联系电话</div>
          <div class="info-main">400-123-4567</div>
          <div class="info-desc">工作时间内为您提供咨询服务</div>
        </div>
        <div class="info-card">
          <div class="info-icon">✉️</div>
          <div class="info-title">邮箱地址</div>
          <div class="info-main">rescue@doghelp.com</div>
          <div class="info-desc">我们会在24小时内回复您的邮件</div>
        </div>
        <div class="info-card">
          <div class="info-icon">📍</div>
          <div class="info-title">收留所地址</div>
          <div class="info-main">北京市朝阳区爱心路123号</div>
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
        <div class="form-card">
          <div class="card-title">✈ 发送消息</div>
          <div class="card-desc">填写以下表单，我们会尽快回复您</div>
          <div class="form-row">
            <div class="form-item">
              <label>姓名 *</label>
              <input v-model="form.name" type="text" placeholder="请输入您的姓名" />
            </div>
            <div class="form-item">
              <label>联系电话</label>
              <input v-model="form.phone" type="text" placeholder="请输入您的电话" />
            </div>
          </div>
          <div class="form-item">
            <label>邮箱 *</label>
            <input v-model="form.email" type="email" placeholder="请输入您的邮箱" />
          </div>
          <div class="form-item">
            <label>咨询类型</label>
            <select v-model="form.type">
              <option value="">请选择咨询类型</option>
              <option value="领养咨询">领养咨询</option>
              <option value="捐赠咨询">捐赠咨询</option>
              <option value="志愿者咨询">志愿者咨询</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="form-item">
            <label>留言内容 *</label>
            <textarea v-model="form.message" rows="4" placeholder="请详细描述您的问题或建议..."></textarea>
          </div>
          <button class="btn btn-solid" @click="submit">发送消息</button>
          <div class="form-tip" v-if="tip">{{ tip }}</div>
        </div>

        <div class="side-column">
          <div class="side-card">
            <div class="card-title">收留所位置</div>
            <div class="card-desc">北京市朝阳区爱心路123号</div>
            <div class="map-box">
              <iframe
                class="map-embed"
                title="收留所位置"
                src="https://www.openstreetmap.org/export/embed.html?bbox=116.4403%2C39.9209%2C116.4503%2C39.9309&layer=mapnik&marker=39.9259%2C116.4453"
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
              <div class="qa-a">填写志愿者申请表，我们会根据您的时间和技能安排合适的志愿工作。</div>
            </div>
            <div class="qa-item">
              <div class="qa-q">捐赠物品有什么要求？</div>
              <div class="qa-a">我们需要狗粮、玩具、毯子等用品，请确保物品干净、无损坏。</div>
            </div>
          </div>

          <div class="side-card alert-card">
            <div class="alert-title">紧急救助</div>
            <div class="alert-text">如果您发现需要紧急救助的流浪动物，请立即联系我们：</div>
            <div class="alert-hotline">紧急热线：400-123-4567</div>
            <div class="alert-sub">24小时接听，我们会立即派遣救助人员</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        type: '',
        message: ''
      },
      tip: ''
    };
  },
  methods: {
    submit () {
      if (!this.form.name.trim() || !this.form.email.trim() || !this.form.message.trim()) {
        this.tip = '请填写必填项后再提交';
        return;
      }
      this.tip = '消息已发送，我们会尽快回复您。';
      this.form = {
        name: '',
        phone: '',
        email: '',
        type: '',
        message: ''
      };
    }
  }
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
  margin: 0;
  color: var(--muted);
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
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.form-card,
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

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-item {
  margin-bottom: 14px;
}

.form-item label {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
  color: var(--muted);
}

.form-item input,
.form-item select,
.form-item textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
}

.btn {
  border: none;
  padding: 12px 28px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  background: var(--orange-deep);
  color: #fff;
  width: 100%;
}

.form-tip {
  margin-top: 10px;
  color: var(--orange-deep);
}

.map-box {
  height: 180px;
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
  .info-grid,
  .form-grid,
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
