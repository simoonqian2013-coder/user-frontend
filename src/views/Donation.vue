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
            我要捐赠
          </div>
          <p class="card-desc">选择捐赠金额，每一份爱心都珍贵</p>
          <div class="amount-grid">
            <button
              v-for="item in quickAmounts"
              :key="item"
              class="amount-btn"
              :class="{ active: amount === item }"
              @click="amount = item"
            >¥{{ item }}</button>
          </div>
          <div class="form-item">
            <label>自定义金额</label>
            <input v-model="customAmount" type="number" min="1" placeholder="¥ 输入其他金额" />
          </div>
          <div class="form-item">
            <label>姓名（选填）</label>
            <input v-model="donorName" type="text" placeholder="请输入您的姓名" />
          </div>
          <div class="form-item">
            <label>留言（选填）</label>
            <textarea v-model="donorNote" rows="3" placeholder="写下您想对毛孩子们说的话..."></textarea>
          </div>
          <div class="qr-box">
            <div class="qr-title">扫码捐赠</div>
            <div class="qr-image">
              <img :src="qrImage" alt="收款码" />
            </div>
            <div class="qr-tip">请使用微信/支付宝扫码完成捐赠</div>
          </div>
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
            <div class="contact-item">咨询电话：400-123-4567</div>
            <div class="contact-item">邮箱：donation@doghelp.com</div>
            <div class="contact-item">地址：北京市朝阳区爱心路123号</div>
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
      quickAmounts: [50, 100, 200, 500, 1000],
      amount: 100,
      customAmount: '',
      donorName: '',
      donorNote: '',
      qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=donate',
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

.amount-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.amount-btn {
  border: 1px solid #e6e6e6;
  background: #fff;
  padding: 10px 0;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.amount-btn.active {
  border-color: var(--orange-deep);
  color: var(--orange-deep);
  background: #fff3f6;
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
.form-item textarea {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
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

.qr-image img {
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  padding: 8px;
}

.qr-tip {
  font-size: 12px;
  color: var(--muted);
  margin-top: 10px;
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

  .amount-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
