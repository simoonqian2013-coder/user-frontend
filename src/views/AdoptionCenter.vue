<template>
  <div class="adopt-page">
    <section class="page-hero">
      <div class="container">
        <h1>领养中心</h1>
        <p>这些可爱的毛孩子正在等待一个充满爱的家庭，给它们一个重新开始的机会</p>
      </div>
    </section>

    <section class="notice-section">
      <div class="container">
        <div class="notice-card">
          <div class="notice-title">领养须知</div>
          <div class="notice-grid">
            <div>
              <div class="notice-subtitle">领养条件</div>
              <ul>
                <li>年满18周岁，有稳定收入</li>
                <li>有适合的居住环境</li>
                <li>家人同意并支持养宠</li>
                <li>承诺不弃养，负责到底</li>
              </ul>
            </div>
            <div>
              <div class="notice-subtitle">领养流程</div>
              <ul>
                <li>在线提交领养申请</li>
                <li>工作人员电话回访</li>
                <li>预约实地看望宠物</li>
                <li>签署领养协议</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pet-section">
      <div class="container">
        <div class="pet-filter">
          <button
            class="filter-btn"
            :class="{ active: activeCategory === 'ALL' }"
            @click="activeCategory = 'ALL'"
          >全部</button>
          <button
            class="filter-btn"
            :class="{ active: activeCategory === 'DOG' }"
            @click="activeCategory = 'DOG'"
          >狗狗</button>
          <button
            class="filter-btn"
            :class="{ active: activeCategory === 'CAT' }"
            @click="activeCategory = 'CAT'"
          >猫猫</button>
        </div>

        <div class="pet-grid" v-if="filteredPets.length">
          <div class="pet-card" v-for="pet in filteredPets" :key="pet.id">
            <div class="pet-cover" :style="{ backgroundImage: `url('${getMainImageUrl(pet) || placeholderImage}')` }">
              <span class="pet-tag">{{ sizeLabel(pet) }}</span>
            </div>
            <div class="pet-body">
              <div class="pet-row">
                <div>
                  <div class="pet-name">{{ pet.nickname || '-' }}</div>
                  <div class="pet-meta">
                    {{ pet.age != null ? pet.age + '岁' : '-' }} · {{ pet.breed || '-' }} · {{ formatGender(pet.gender) }}
                  </div>
                </div>
                <div class="pet-like">♡</div>
              </div>
              <div class="pet-desc">{{ pet.detail || '温顺可爱，期待与你相遇' }}</div>
              <div class="pet-info">
                <div><span class="icon">📅</span> 入院时间：{{ pet.createdAt ? pet.createdAt.slice(0, 10) : '-' }}</div>
                <div><span class="icon">✅</span> 健康状况：健康良好，已绝育，疫苗齐全</div>
              </div>
              <button class="btn btn-solid full" @click="openApply(pet)">申请领养</button>
            </div>
          </div>
        </div>
        <div class="empty-tip" v-else>暂无可领养动物</div>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-card">
          <div class="contact-title">联系我们</div>
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-label">咨询电话</div>
              <div class="contact-value">400-123-4567</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">收留所地址</div>
              <div class="contact-value">北京市朝阳区爱心路123号</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">开放时间</div>
              <div class="contact-value">周一至周日 9:00-17:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="modal-mask" v-if="modalVisible">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title">申请领养 {{ currentPet ? currentPet.nickname : '' }}</div>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="form-item">
            <label>姓名 *</label>
            <input v-model="form.name" type="text" placeholder="请输入姓名" />
          </div>
          <div class="form-item">
            <label>联系电话 *</label>
            <input v-model="form.phone" type="text" placeholder="请输入联系电话" />
          </div>
          <div class="form-item">
            <label>所在城市 *</label>
            <input v-model="form.city" type="text" placeholder="请输入城市" />
          </div>
          <div class="form-item">
            <label>邮箱</label>
            <input v-model="form.email" type="email" placeholder="请输入邮箱" />
          </div>
          <div class="form-item">
            <label>居住地址 *</label>
            <input v-model="form.address" type="text" placeholder="请输入居住地址" />
          </div>
          <div class="form-item">
            <label>养宠经验</label>
            <select v-model="form.experience">
              <option value="">请选择</option>
              <option value="无经验">无经验</option>
              <option value="1年以内">1年以内</option>
              <option value="1-3年">1-3年</option>
              <option value="3年以上">3年以上</option>
            </select>
          </div>
          <div class="form-item">
            <label>领养原因 *</label>
            <textarea v-model="form.reason" rows="3" placeholder="请描述您想领养该宠物的原因"></textarea>
          </div>
          <div class="form-error" v-if="errorMessage">{{ errorMessage }}</div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-solid" :disabled="submitting" @click="submitApply">
            {{ submitting ? '提交中...' : '提交申请' }}
          </button>
          <button class="btn btn-ghost" @click="closeModal">取消</button>
        </div>
      </div>
    </div>

    <div class="modal-mask" v-if="successVisible">
      <div class="modal-card success-card">
        <div class="success-icon">✓</div>
        <div class="success-title">提交成功</div>
        <div class="success-text">申请已提交，请等待审核，我们会尽快与您联系。</div>
        <div class="modal-footer">
          <button class="btn btn-solid" @click="successVisible = false">知道了</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdoptionCenter',
  data () {
    return {
      pets: [],
      activeCategory: 'ALL',
      placeholderImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80',
      modalVisible: false,
      successVisible: false,
      submitting: false,
      errorMessage: '',
      currentPet: null,
      form: {
        name: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        experience: '',
        reason: ''
      }
    };
  },
  computed: {
    filteredPets () {
      if (this.activeCategory === 'ALL') return this.pets;
      return this.pets.filter(pet => this.petCategory(pet) === this.activeCategory);
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
    },
    formatGender (value) {
      if (value === 'MALE') return '雄性';
      if (value === 'FEMALE') return '雌性';
      return value || '-';
    },
    sizeLabel (pet) {
      const age = pet && typeof pet.age === 'number' ? pet.age : null;
      if (age == null) return '中型宠';
      if (age <= 1) return '小型宠';
      if (age <= 3) return '中型宠';
      return '大型宠';
    },
    petCategory (pet) {
      const text = [
        pet && pet.type,
        pet && pet.species,
        pet && pet.category,
        pet && pet.breed
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (text.includes('dog') || text.includes('犬') || text.includes('狗')) return 'DOG';
      if (text.includes('cat') || text.includes('猫')) return 'CAT';
      return 'DOG';
    },
    openApply (pet) {
      this.currentPet = pet;
      this.modalVisible = true;
      this.errorMessage = '';
      this.form = {
        name: '',
        phone: '',
        email: '',
        city: '',
        address: '',
        experience: '',
        reason: ''
      };
    },
    closeModal () {
      this.modalVisible = false;
      this.submitting = false;
      this.errorMessage = '';
    },
    submitApply () {
      if (!this.currentPet) return;
      if (!this.form.name.trim() || !this.form.phone.trim() || !this.form.city.trim() || !this.form.address.trim() || !this.form.reason.trim()) {
        this.errorMessage = '请填写所有必填项';
        return;
      }
      this.errorMessage = '';
      this.submitting = true;
      fetch('/api/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petId: this.currentPet.id,
          applicantName: this.form.name.trim(),
          phone: this.form.phone.trim(),
          email: this.form.email.trim(),
          city: this.form.city.trim(),
          address: this.form.address.trim(),
          experience: this.form.experience,
          remark: this.form.reason.trim()
        })
      })
        .then(res => res.json())
        .then(() => {
          this.submitting = false;
          this.closeModal();
          this.successVisible = true;
        })
        .catch(() => {
          this.submitting = false;
          this.errorMessage = '提交失败，请稍后重试';
        });
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

.notice-section {
  padding: 24px 0 36px;
}

.notice-card {
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.notice-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 14px;
}

.notice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.notice-subtitle {
  font-weight: 600;
  margin-bottom: 8px;
}

.notice-card ul {
  padding-left: 18px;
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.pet-section {
  padding: 10px 0 40px;
}

.pet-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
}

.filter-btn {
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #6b7280;
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
}

.filter-btn.active {
  border-color: var(--orange-deep);
  color: var(--orange-deep);
  background: #fff3f6;
}

.pet-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.pet-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
}

.pet-cover {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.pet-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--ink);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
}

.pet-body {
  padding: 18px 20px 22px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pet-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pet-name {
  font-size: 20px;
  font-weight: 700;
}

.pet-meta {
  margin-top: 6px;
  color: var(--muted);
}

.pet-like {
  color: #b0a4a8;
  font-size: 20px;
}

.pet-desc {
  margin: 12px 0 10px;
  color: #4b5563;
  line-height: 1.6;
}

.pet-info {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
  margin-bottom: 16px;
}

.icon {
  margin-right: 6px;
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
  background: var(--orange-deep);
  color: #fff;
}

.btn.full {
  width: 100%;
  margin-top: auto;
}

.contact-section {
  padding: 0 0 70px;
}

.contact-card {
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.contact-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 14px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.contact-label {
  color: var(--muted);
  margin-bottom: 6px;
}

.contact-value {
  font-weight: 600;
}

.empty-tip {
  text-align: center;
  color: var(--muted);
  padding: 24px 0 10px;
}

.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 20px;
}

.modal-card {
  width: 100%;
  max-width: 560px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #f1f1f1;
}

.modal-title {
  font-weight: 700;
}

.modal-close {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  color: #888;
}

.modal-body {
  padding: 20px;
  display: grid;
  gap: 14px;
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

.form-error {
  color: #e11d48;
  font-size: 13px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px 20px 22px;
}

.btn-ghost {
  background: #f8f8f8;
  color: #666;
}

.success-card {
  text-align: center;
  padding: 28px 24px 20px;
}

.success-icon {
  width: 54px;
  height: 54px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #ffe9f0;
  color: var(--orange-deep);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
}

.success-title {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 6px;
}

.success-text {
  color: var(--muted);
  font-size: 14px;
}

@media (max-width: 980px) {
  .notice-grid,
  .pet-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
