<template>
  <div class="home">
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-content">
        <p class="hero-tag">一起行动，为生命留一盏灯</p>
        <h1>给流浪动物一个温暖的家</h1>
        <p class="hero-desc">每一个生命都值得被善待，每一份爱心都能改变一个生命的轨迹</p>
        <div class="hero-actions">
          <router-link class="btn btn-solid" to="/adopt">立即领养</router-link>
          <router-link class="btn btn-outline" to="/donation">爱心捐赠</router-link>
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
      placeholderImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80'
    };
  },
  computed: {
    topPets () {
      const list = Array.isArray(this.pets) ? this.pets : [];
      return list.filter(item => item && item.status === 1).slice(0, 3);
    }
  },
  created () {
    this.fetchPets();
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
  .card-grid {
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
