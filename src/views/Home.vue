<template>
  <div class="home">
    <section class="hero">
      <div
        v-for="(slide, index) in heroSlides"
        :key="slide.title"
        class="hero-slide"
        :class="{ active: activeHeroIndex === index }"
        :style="{ backgroundImage: `url('${slide.image}')` }"
      ></div>
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <p class="hero-tag">{{ currentHero.tag }}</p>
        <h1>{{ currentHero.title }}</h1>
        <p class="hero-desc">{{ currentHero.desc }}</p>
        <div class="hero-actions">
          <router-link class="btn btn-solid" :to="currentHero.primaryTo">{{ currentHero.primaryText }}</router-link>
          <router-link class="btn btn-outline" :to="currentHero.secondaryTo">{{ currentHero.secondaryText }}</router-link>
        </div>
        <div class="hero-dots">
          <button
            v-for="(slide, index) in heroSlides"
            :key="slide.title + '-dot'"
            class="hero-dot"
            :class="{ active: activeHeroIndex === index }"
            @click="setHeroSlide(index)"
          ></button>
        </div>
      </div>
      <button class="hero-nav hero-prev" @click="switchHeroSlide(-1)">‹</button>
      <button class="hero-nav hero-next" @click="switchHeroSlide(1)">›</button>
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
        <div class="card-grid" v-if="topPets.length">
          <div class="pet-card" v-for="pet in topPets" :key="pet.id">
            <div
              class="pet-cover"
              :style="{ backgroundImage: `url('${getMainImageUrl(pet) || placeholderImage}')` }"
            ></div>
            <div class="pet-body">
              <div class="pet-name">{{ pet.nickname || '-' }}</div>
              <div class="pet-meta">
                {{ pet.age != null ? pet.age + '岁' : '-' }} · {{ pet.breed || '-' }}
              </div>
              <div class="pet-desc">{{ pet.detail || '温顺可爱，期待与你相遇' }}</div>
              <router-link class="btn btn-solid full pet-link" to="/adopt">了解更多</router-link>
            </div>
          </div>
        </div>
        <div class="empty-tip" v-else>
          暂无可领养动物
        </div>
        <div class="center-actions">
          <router-link class="btn btn-solid" to="/adopt">查看所有待领养动物</router-link>
        </div>
      </div>
    </section>

    <section class="feedback">
      <div class="container">
        <div class="section-title">
          <h2>暖心留言</h2>
          <p>来自领养家庭和志愿者的真实感受，记录每一次善意的抵达</p>
        </div>
        <div class="feedback-grid">
          <div class="feedback-card" v-for="item in feedbackList" :key="item.name">
            <div class="feedback-icon">❤</div>
            <p class="feedback-text">“{{ item.content }}”</p>
            <div class="feedback-person">{{ item.name }}</div>
            <div class="feedback-tag">{{ item.tag }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container cta-inner">
        <h2>加入我们的爱心行动</h2>
        <p>无论是领养、捐赠还是志愿服务，每一份参与都是对生命的尊重和关爱</p>
        <div class="cta-actions">
          <router-link class="btn btn-light" to="/donation">爱心捐赠</router-link>
          <router-link class="btn btn-outline-light" to="/stories">查看救助故事</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      pets: [],
      activeHeroIndex: 0,
      heroTimer: null,
      heroSlides: [
        {
          tag: '温暖领养',
          title: '给流浪动物一个温暖的家',
          desc: '每一个生命都值得被善待，每一次领养都是新的开始',
          image: '/hero-adopt.jpg',
          primaryText: '立即领养',
          primaryTo: '/adopt',
          secondaryText: '查看故事',
          secondaryTo: '/stories'
        },
        {
          tag: '救助陪伴',
          title: '看见每一个被救助的生命',
          desc: '用记录传递善意，用陪伴帮助它们重新靠近生活',
          image: '/hero-rescue.jpg',
          primaryText: '救助故事',
          primaryTo: '/stories',
          secondaryText: '领养中心',
          secondaryTo: '/adopt'
        },
        {
          tag: '爱心支持',
          title: '让爱心持续发生',
          desc: '您的每一份支持，都能帮助更多毛孩子获得照顾',
          image: '/hero-donate.jpg',
          primaryText: '爱心捐赠',
          primaryTo: '/donation',
          secondaryText: '联系我们',
          secondaryTo: '/contact'
        }
      ],
      feedbackList: [
        {
          content: '小白到家后很适应，感谢平台工作人员耐心沟通，让我们顺利完成领养。',
          name: '李女士',
          tag: '成功领养家庭'
        },
        {
          content: '申请流程很清楚，审核也很负责，能感受到平台对动物和领养人的认真。',
          name: '张先生',
          tag: '领养回访'
        },
        {
          content: '希望更多人关注流浪动物，也希望更多毛孩子能等到属于自己的家。',
          name: '爱心志愿者',
          tag: '救助支持'
        }
      ],
      placeholderImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80'
    };
  },
  computed: {
    currentHero () {
      return this.heroSlides[this.activeHeroIndex] || this.heroSlides[0];
    },
    topPets () {
      const list = Array.isArray(this.pets) ? this.pets : [];
      return list.filter(item => item && item.status === 1).slice(0, 3);
    }
  },
  created () {
    this.fetchPets();
  },
  mounted () {
    this.startHeroTimer();
  },
  beforeDestroy () {
    this.stopHeroTimer();
  },
  methods: {
    fetchPets () {
      fetch('/api/pets?status=1')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            this.pets = data;
          } else if (data && Array.isArray(data.data)) {
            this.pets = data.data;
          } else {
            this.pets = [];
          }
        })
        .catch(() => {
          this.pets = [];
        });
    },
    getMainImageUrl (pet) {
      if (!pet) return '';
      const list = Array.isArray(pet.imageUrls) ? pet.imageUrls : [];
      const mainItem = list.find(item => item && item.isMain);
      return (mainItem && mainItem.url) || (list[0] && list[0].url) || pet.image || '';
    },
    switchHeroSlide (delta) {
      this.activeHeroIndex = (this.activeHeroIndex + delta + this.heroSlides.length) % this.heroSlides.length;
      this.startHeroTimer();
    },
    setHeroSlide (index) {
      this.activeHeroIndex = index;
      this.startHeroTimer();
    },
    startHeroTimer () {
      this.stopHeroTimer();
      this.heroTimer = window.setInterval(() => {
        this.activeHeroIndex = (this.activeHeroIndex + 1) % this.heroSlides.length;
      }, 4500);
    },
    stopHeroTimer () {
      if (this.heroTimer) {
        window.clearInterval(this.heroTimer);
        this.heroTimer = null;
      }
    }
  }
};
</script>

<style scoped>
.hero {
  position: relative;
  color: #fff;
  padding: 110px 0 130px;
  overflow: hidden;
  min-height: 520px;
}

.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.03);
  transition: opacity 0.7s ease, transform 1.2s ease;
}

.hero-slide.active {
  opacity: 1;
  transform: scale(1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(115, 37, 56, 0.72), rgba(229, 96, 132, 0.48)),
    linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.24));
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

.hero-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 34px;
}

.hero-dot {
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.52);
  cursor: pointer;
}

.hero-dot.active {
  width: 28px;
  border-radius: 999px;
  background: #fff;
}

.hero-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.58);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
}

.hero-prev {
  left: 34px;
}

.hero-next {
  right: 34px;
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

.pet-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.center-actions {
  display: flex;
  justify-content: center;
  margin-top: 34px;
}

.feedback {
  background: #fff;
  padding: 70px 0 86px;
}

.feedback-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.feedback-card {
  background: #fff;
  border: 1px solid #f6d5df;
  border-radius: 12px;
  padding: 24px 24px 22px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
}

.feedback-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ffe6ee;
  color: var(--orange-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.feedback-text {
  margin: 0 0 18px;
  color: #4b5563;
  line-height: 1.8;
}

.feedback-person {
  font-weight: 700;
  color: var(--ink);
}

.feedback-tag {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
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

.empty-tip {
  text-align: center;
  color: var(--muted);
  padding: 24px 0 10px;
}

@media (max-width: 980px) {
  .stats-grid,
  .card-grid,
  .feedback-grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 36px;
  }

  .hero-actions,
  .cta-actions {
    flex-direction: column;
  }

  .hero {
    min-height: 500px;
    padding: 90px 0 100px;
  }

  .hero-nav {
    display: none;
  }
}
</style>
