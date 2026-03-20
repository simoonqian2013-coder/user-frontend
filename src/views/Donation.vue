<template>
  <div class="donation-page">
    <section class="page-hero">
      <div class="container">
        <h1>爱心捐赠</h1>
        <p>您的每一份爱心都能帮助流浪动物获得更好的生活，让我们一起为它们创造希望</p>
      </div>
    </section>

    <section class="donation-main">
      <div class="container donation-grid">
        <div class="donation-card">
          <div class="card-title">
            <span class="icon">❤</span>
            爱心倡议
          </div>
          <div class="initiative-content">
            <p>流浪动物的生活环境十分艰难，它们需要食物、医疗和温暖的住所。</p>
            <p>本平台致力于为流浪动物提供救助和领养服务，您的每一份支持都会为它们带来新的希望。</p>
            <p>如果您愿意参与到流浪动物救助行动中，您可以通过以下方式：</p>
            <ol class="initiative-list">
              <li>
                <strong>扫码捐赠</strong>
                <div>通过微信或支付宝扫码即可完成捐赠</div>
              </li>
              <li>
                <strong>联系工作人员</strong>
                <div>如果希望长期资助，可以通过电话联系我们</div>
              </li>
              <li>
                <strong>物资捐赠</strong>
                <div>也欢迎捐赠宠物粮食、药品等物资</div>
              </li>
            </ol>
            <div class="initiative-usage-title">您的每一份爱心都将用于：</div>
            <ul class="initiative-usage-list">
              <li>医疗救助</li>
              <li>食物供给</li>
              <li>收留所维护</li>
              <li>流浪动物绝育</li>
            </ul>
          </div>
          <div class="qr-box">
            <div class="qr-title">扫码捐赠</div>
            <div class="qr-grid">
              <div class="qr-item">
                <div class="qr-label">微信支付</div>
                <div class="qr-image">
                  <img class="qr-wechat" src="/weixin.jpg" alt="微信支付收款码" />
                </div>
              </div>
              <div class="qr-item">
                <div class="qr-label">支付宝</div>
                <div class="qr-image">
                  <img class="qr-alipay" src="/zhifubao.jpg" alt="支付宝收款码" />
                </div>
              </div>
            </div>
            <div class="qr-tip">支持微信和支付宝扫码捐赠</div>
          </div>
          <div class="thanks-text">感谢您的关注与支持，愿每一只流浪动物都能被温柔以待。</div>
        </div>

        <div class="side-column">
          <div class="donation-card">
            <div class="card-title">资金使用情况</div>
            <p class="card-desc">本月支出：¥30,000</p>
            <div class="usage-item" v-for="item in usageList" :key="item.title">
              <div class="usage-row">
                <span>{{ item.title }}</span>
                <strong>¥{{ item.amount }}</strong>
              </div>
              <div class="usage-bar">
                <span :style="{ width: item.percent + '%' }"></span>
              </div>
              <div class="usage-desc">{{ item.desc }}</div>
            </div>
          </div>

          <div class="donation-card">
            <div class="card-title">最近捐赠</div>
            <p class="card-desc">感谢每一位爱心人士</p>
            <div class="donor-item" v-for="item in recentDonors" :key="item.name + item.date">
              <div>
                <div class="donor-name">{{ item.name }}</div>
                <div class="donor-date">{{ item.date }}</div>
                <div class="donor-note" v-if="item.note">“{{ item.note }}”</div>
              </div>
              <div class="donor-amount">¥{{ item.amount }}</div>
            </div>
          </div>

          <div class="donation-card">
            <div class="card-title">联系我们</div>
            <div class="contact-item">咨询电话：173-5513-2852</div>
            <div class="contact-item">邮箱：2185907473@qq.com</div>
            <div class="contact-item">地址：合肥市瑶海区方庙街道</div>
            <div class="contact-tip">如有捐赠相关问题，欢迎随时联系我们</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Donation',
  data () {
    return {
      usageList: [
        { title: '医疗费用', amount: 12000, percent: 40, desc: '疫苗、绝育、治疗等医疗支出' },
        { title: '食物饲料', amount: 9000, percent: 30, desc: '狗粮、营养品等日常饮食' },
        { title: '场地维护', amount: 6000, percent: 20, desc: '收留所租金、水电、清洁用品' },
        { title: '人员工资', amount: 3000, percent: 10, desc: '兽医、护理员等工作人员' }
      ],
      recentDonors: [
        { name: '爱心人士', date: '2024-03-20', amount: 500, note: '希望小动物们都能找到温暖的家' },
        { name: '张女士', date: '2024-03-19', amount: 200, note: '支持你们的爱心事业' },
        { name: '匿名', date: '2024-03-18', amount: 1000, note: '' },
        { name: '李先生', date: '2024-03-17', amount: 100, note: '每个生命都值得被善待' }
      ]
    };
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

.donation-main {
  padding: 20px 0 70px;
}

.donation-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.donation-card {
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-desc {
  color: var(--muted);
  margin: 0 0 16px;
}

.initiative-content {
  color: #4b5563;
  line-height: 1.9;
  font-size: 16px;
}

.initiative-content p {
  margin: 0 0 12px;
}

.initiative-list {
  margin: 0 0 14px;
  padding-left: 20px;
}

.initiative-list li {
  margin-bottom: 10px;
}

.initiative-usage-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.initiative-usage-list {
  margin: 0;
  padding-left: 18px;
}

.initiative-usage-list li {
  margin-bottom: 6px;
}

.qr-box {
  margin-top: 20px;
  text-align: center;
  background: #fff7fb;
  border-radius: 10px;
  padding: 18px;
}

.qr-title {
  font-weight: 600;
  margin-bottom: 12px;
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-label {
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--ink);
}

.qr-image {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  overflow: hidden;
}

.qr-image img {
  width: 250px;
  height: 250px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  padding: 0;
}

.qr-wechat {
}

.qr-alipay {
}

.qr-tip {
  font-size: 12px;
  color: var(--muted);
  margin-top: 10px;
}

.thanks-text {
  margin-top: 14px;
  color: #6b7280;
  text-align: center;
}

.usage-item {
  margin-bottom: 16px;
}

.usage-row {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

.usage-bar {
  height: 6px;
  background: #f1f1f1;
  border-radius: 999px;
  margin: 6px 0;
  overflow: hidden;
}

.usage-bar span {
  display: block;
  height: 100%;
  background: var(--orange-deep);
}

.usage-desc {
  color: var(--muted);
  font-size: 12px;
}

.donor-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  padding: 12px 0;
}

.donor-item:last-child {
  border-bottom: none;
}

.donor-name {
  font-weight: 600;
}

.donor-date {
  font-size: 12px;
  color: var(--muted);
}

.donor-note {
  font-size: 12px;
  color: var(--muted);
}

.donor-amount {
  font-weight: 700;
  color: var(--orange-deep);
}

.contact-item {
  margin-bottom: 8px;
  color: var(--muted);
}

.contact-tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 980px) {
  .donation-grid {
    grid-template-columns: 1fr;
  }

  .qr-grid {
    grid-template-columns: 1fr;
  }
}
</style>
