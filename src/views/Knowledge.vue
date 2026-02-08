<template>
  <div class="knowledge-page">
    <section class="page-hero">
      <div class="container">
        <h1>救助知识</h1>
        <p>学习专业的流浪动物救助知识和宠物护理技巧，让我们一起为毛孩子们提供更好的照顾</p>
      </div>
    </section>

    <section class="knowledge-main">
      <div class="container knowledge-grid">
        <aside class="side-panel">
          <div class="panel-card">
            <div class="panel-title">知识分类</div>
            <ul class="category-list">
              <li
                v-for="item in categories"
                :key="item.key"
                :class="{ active: activeKey === item.key }"
                @click="activeKey = item.key"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>

          <div class="panel-card alert-card">
            <div class="alert-title">紧急救助</div>
            <div class="alert-text">遇到紧急情况请立即联系：</div>
            <div class="alert-hotline">400-123-4567</div>
            <div class="alert-sub">24小时救助热线</div>
          </div>
        </aside>

        <main class="content-panel">
          <article class="content-card" v-for="block in activeContent" :key="block.title">
            <h2>{{ block.title }}</h2>
            <p>{{ block.desc }}</p>
            <div class="tip-box" v-if="block.tips && block.tips.length">
              <div class="tip-title">重要提示：</div>
              <ul>
                <li v-for="tip in block.tips" :key="tip">{{ tip }}</li>
              </ul>
            </div>
          </article>
        </main>
      </div>
    </section>

    <section class="cta-section">
      <div class="container cta-card">
        <div class="cta-text">
          <h2>需要更多帮助？</h2>
          <p>我们提供专业的咨询服务和培训课程</p>
        </div>
        <div class="cta-actions">
          <button class="btn btn-outline-light">联系专家</button>
          <button class="btn btn-light">了解课程</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Knowledge',
  data () {
    return {
      activeKey: 'rescue',
      categories: [
        { key: 'rescue', title: '救助知识' },
        { key: 'health', title: '健康护理' },
        { key: 'adopt', title: '领养指南' },
        { key: 'train', title: '训练技巧' },
        { key: 'safe', title: '安全防护' }
      ],
      contents: {
        rescue: [
          {
            title: '发现流浪动物时的正确做法',
            desc: '当您发现流浪动物时，首先要保持冷静，不要急于接近。观察动物的状态，如果它看起来受伤或生病，请立即联系当地的动物救助组织。如果动物看起来健康但害怕，可以尝试用温和的声音与它交流，准备一些食物和水。记住，安全第一，不要强行抓捕可能有攻击性的动物。',
            tips: ['保持安全距离，观察动物的行为', '准备食物和水，建立信任', '联系专业救助组织', '记录发现地点和时间', '如有伤病，优先联系兽医']
          },
          {
            title: '流浪动物的心理创伤及康复',
            desc: '许多流浪动物都经历过创伤，可能表现为恐惧、攻击性或过度顺从。康复需要时间和耐心。创造安全的环境，建立规律的作息，给予足够的关爱和社会化训练都是重要的康复步骤。',
            tips: ['提供安全稳定的环境', '建立规律的日常作息', '循序渐进的社会化训练', '给予充分的爱和耐心', '必要时寻求专业行为训练师帮助']
          }
        ],
        health: [
          {
            title: '狗狗的基础健康检查',
            desc: '定期的健康检查对狗狗的健康至关重要。包括检查眼睛、耳朵、牙齿、皮肤和被毛。观察狗狗的食欲、精神状态、排便情况等。任何异常都应该及时咨询兽医。',
            tips: ['每周检查眼睛是否清澈', '定期清洁耳朵，防止感染', '观察牙齿和牙龈健康', '检查皮肤是否有异常', '监控体重和食欲变化']
          },
          {
            title: '疫苗接种和驱虫计划',
            desc: '疫苗接种是预防疾病的重要手段。幼犬需要接种系列疫苗，成年犬需要定期加强免疫。同时，定期驱虫也是必要的健康管理措施。',
            tips: ['按时接种核心疫苗', '根据地区风险接种非核心疫苗', '定期进行体内外驱虫', '保持疫苗记录', '咨询兽医制定个性化计划']
          }
        ],
        adopt: [
          {
            title: '选择适合的宠物',
            desc: '选择宠物时要考虑多个因素：您的生活方式、居住环境、家庭成员、经济能力等。不同品种和年龄的宠物有不同的需求，选择合适的伙伴对双方都很重要。',
            tips: ['评估自己的生活方式', '考虑居住空间大小', '了解不同品种的特点', '考虑宠物的年龄和性格', '评估长期承担能力']
          },
          {
            title: '新宠物的适应期管理',
            desc: '新领养的宠物需要时间适应新环境。前几周是关键期，需要耐心帮助它们建立安全感。准备好必需品，建立规律，给予时间和空间适应。',
            tips: ['准备必需的用品', '建立固定的作息时间', '给予适应空间', '循序渐进介绍新环境', '保持耐心和理解']
          }
        ],
        train: [
          {
            title: '基础服从训练',
            desc: '基础训练包括坐下、趴下、等待、过来等指令。使用正向强化的方法，奖励正确行为而不是惩罚错误。保持训练的一致性和耐心是成功的关键。',
            tips: ['使用正向强化方法', '保持指令的一致性', '短时间高频率训练', '及时奖励正确行为', '保持耐心和积极态度']
          },
          {
            title: '社会化训练的重要性',
            desc: '社会化训练帮助狗狗适应各种环境、人群和其他动物。早期社会化尤为重要，但成年犬也可以通过训练改善社交能力。',
            tips: ['早期开始社会化训练', '逐步接触不同环境', '与其他友善的狗狗互动', '接触不同年龄的人群', '保持积极的体验']
          }
        ],
        safe: [
          {
            title: '家庭安全防护措施',
            desc: '为宠物创造安全的家庭环境很重要。移除有毒植物、化学品，确保电线安全，准备急救包。了解常见的家庭危险并采取预防措施。',
            tips: ['移除有毒植物和化学品', '确保电线和小物件安全', '准备宠物急救包', '了解紧急联系方式', '定期检查家庭安全']
          },
          {
            title: '户外活动安全指南',
            desc: '户外活动时要注意宠物的安全。使用合适的牵引绳，避免危险区域，注意天气条件，携带必要的用品。',
            tips: ['使用合适的牵引设备', '避开危险区域', '注意天气条件', '携带水和急救用品', '了解当地的宠物法规']
          }
        ]
      }
    };
  },
  computed: {
    activeContent () {
      return this.contents[this.activeKey] || [];
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

.knowledge-main {
  padding: 20px 0 40px;
}

.knowledge-grid {
  display: grid;
  grid-template-columns: 1fr 2.2fr;
  gap: 24px;
}

.panel-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px 18px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  margin-bottom: 18px;
}

.panel-title {
  font-weight: 700;
  margin-bottom: 12px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.category-list li {
  padding: 10px 12px;
  border-radius: 6px;
  color: var(--muted);
  background: #f8f8f8;
}

.category-list li.active {
  background: var(--orange-deep);
  color: #fff;
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

.content-card {
  background: #fff;
  border-radius: 10px;
  padding: 24px 26px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  margin-bottom: 20px;
}

.content-card h2 {
  margin: 0 0 10px;
  font-size: 20px;
}

.content-card p {
  margin: 0 0 16px;
  color: #4b5563;
  line-height: 1.7;
}

.tip-box {
  background: #fff4e6;
  border-radius: 8px;
  padding: 14px 16px;
  color: #b45309;
}

.tip-title {
  font-weight: 700;
  margin-bottom: 8px;
}

.tip-box ul {
  margin: 0;
  padding-left: 18px;
  line-height: 1.7;
}

.cta-section {
  padding: 0 0 70px;
}

.cta-card {
  background: linear-gradient(120deg, var(--orange-deep), var(--orange-light));
  color: #fff;
  padding: 28px 30px;
  border-radius: 10px;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.18);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cta-card h2 {
  margin: 0 0 6px;
  font-size: 22px;
}

.cta-card p {
  margin: 0;
  color: #fff3f6;
}

.cta-actions {
  display: flex;
  gap: 12px;
}

.btn {
  border: none;
  padding: 10px 22px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
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

@media (max-width: 980px) {
  .knowledge-grid {
    grid-template-columns: 1fr;
  }

  .cta-card {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
