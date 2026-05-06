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

    <section class="query-section">
      <div class="container">
        <div class="query-card">
          <div class="query-bar">
            <div class="query-copy">
              <div class="query-title">申请查询</div>
              <div class="query-subtitle">已提交领养申请？请输入申请时填写的姓名和手机号，查看审核进度。</div>
            </div>
            <div class="query-form">
              <input
                v-model="queryForm.applicantName"
                type="text"
                placeholder="请输入姓名"
                @keyup.enter="submitQuery"
              />
              <input
                v-model="queryForm.phone"
                type="text"
                maxlength="11"
                placeholder="请输入手机号"
                @input="queryForm.phone = onlyDigits(queryForm.phone)"
                @keyup.enter="submitQuery"
              />
              <button class="btn btn-solid query-btn" :disabled="querying" @click="submitQuery">
                {{ querying ? '查询中...' : '立即查询' }}
              </button>
            </div>
          </div>

          <div class="query-error" v-if="queryError">{{ queryError }}</div>

          <div class="query-results" v-if="querySearched">
            <div class="query-empty" v-if="!queryResults.length">
              未查询到符合条件的申请记录，请确认姓名和手机号是否与提交申请时填写的一致。
            </div>

            <div class="query-result-list" v-else>
              <div class="query-result-card" v-for="item in queryResults" :key="item.id">
                <div class="query-result-head">
                  <div>
                    <div class="query-pet-name">{{ item.petNickname || '未命名宠物' }}</div>
                    <div class="query-time">申请时间：{{ formatDateTime(item.createdAt) }}</div>
                  </div>
                  <span class="status-pill" :class="statusClass(item.status)">
                    {{ statusText(item.status) }}
                  </span>
                </div>
                <div class="query-result-body">
                  <div class="query-line">
                    <span class="query-label">审核状态</span>
                    <span>{{ statusSummary(item.status) }}</span>
                  </div>
                  <div class="query-line">
                    <span class="query-label">审核说明</span>
                    <span>{{ reviewMessage(item) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pet-section">
      <div class="container">
        <div class="pet-filter">
          <div class="filter-tabs">
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
          <input
            v-model="petKeyword"
            class="pet-search"
            type="text"
            placeholder="搜索年龄、性别、城市、品种"
          />
          <button v-if="petKeyword" class="clear-search" @click="petKeyword = ''">清空</button>
        </div>
        <div class="pet-count">共找到 {{ filteredPets.length }} 只可领养宠物</div>

        <div class="pet-grid" v-if="filteredPets.length">
          <div class="pet-card" v-for="pet in filteredPets" :key="pet.id">
            <div
              class="pet-cover"
              :style="{ backgroundImage: `url('${getMainImageUrl(pet) || placeholderImage}')` }"
              @click="openDetail(pet)"
            >
              <span class="pet-tag">{{ sizeLabel(pet) }}</span>
              <span class="image-count" v-if="getPetImages(pet).length > 1">共{{ getPetImages(pet).length }}张</span>
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
                <div><span class="icon">📅</span> 登记时间：{{ pet.createdAt ? pet.createdAt.slice(0, 10) : '-' }}</div>
              </div>
              <div class="pet-actions">
                <button class="btn btn-ghost action-btn" @click="openDetail(pet)">查看详情</button>
                <button class="btn btn-solid action-btn" @click="openApply(pet)">申请领养</button>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-tip" v-else>暂无符合条件的宠物，请尝试更换关键词或分类。</div>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-card">
          <div class="contact-title">联系我们</div>
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-label">咨询电话</div>
              <div class="contact-value">173-5513-2852</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">收留所地址</div>
              <div class="contact-value">合肥市瑶海区方庙街道</div>
            </div>
            <div class="contact-item">
              <div class="contact-label">开放时间</div>
              <div class="contact-value">周一至周日 9:00-17:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="modal-mask" v-if="detailVisible">
      <div class="modal-card detail-card">
        <div class="modal-header">
          <div class="modal-title">{{ detailPet ? detailPet.nickname : '' }} 详情</div>
          <button class="modal-close" @click="closeDetail">×</button>
        </div>
        <div class="detail-body" v-if="detailPet">
          <div
            class="detail-main-image"
            :style="{ backgroundImage: `url('${getDetailImageUrl()}')` }"
          >
            <button
              v-if="getPetImages(detailPet).length > 1"
              class="image-nav image-nav-prev"
              @click="switchDetailImage(-1)"
            >‹</button>
            <button
              v-if="getPetImages(detailPet).length > 1"
              class="image-nav image-nav-next"
              @click="switchDetailImage(1)"
            >›</button>
          </div>
          <div class="detail-thumbs" v-if="getPetImages(detailPet).length > 1">
            <button
              v-for="(url, index) in getPetImages(detailPet)"
              :key="url + index"
              class="detail-thumb"
              :class="{ active: detailImageIndex === index }"
              :style="{ backgroundImage: `url('${url}')` }"
              @click="detailImageIndex = index"
            ></button>
          </div>
          <div class="detail-info-grid">
            <div>
              <span>年龄</span>
              <strong>{{ detailPet.age != null ? detailPet.age + '岁' : '-' }}</strong>
            </div>
            <div>
              <span>品种</span>
              <strong>{{ detailPet.breed || '-' }}</strong>
            </div>
            <div>
              <span>性别</span>
              <strong>{{ formatGender(detailPet.gender) }}</strong>
            </div>
            <div>
              <span>城市</span>
              <strong>{{ detailPet.city || '-' }}</strong>
            </div>
            <div>
              <span>登记时间</span>
              <strong>{{ detailPet.createdAt ? detailPet.createdAt.slice(0, 10) : '-' }}</strong>
            </div>
          </div>
          <div class="detail-address" v-if="detailPet.address">
            <span>所在地址</span>
            <p>{{ detailPet.address }}</p>
          </div>
          <div class="detail-desc">
            <span>宠物介绍</span>
            <p>{{ detailPet.detail || '温顺可爱，期待与你相遇。' }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-solid" @click="openApplyFromDetail">申请领养</button>
          <button class="btn btn-ghost" @click="closeDetail">关闭</button>
        </div>
      </div>
    </div>

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
            <input
              v-model="form.phone"
              type="text"
              maxlength="11"
              placeholder="请输入11位手机号"
              @input="form.phone = onlyDigits(form.phone)"
            />
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
            <textarea
              v-model="form.reason"
              rows="3"
              maxlength="200"
              placeholder="请描述您想领养该宠物的原因"
            ></textarea>
            <div class="char-count">{{ form.reason.length }}/200</div>
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
        <div class="success-text">申请已提交，请使用姓名和手机号查询审核进度，我们会尽快与您联系。</div>
        <div class="modal-footer">
          <button class="btn btn-solid" @click="successVisible = false">知道了</button>
        </div>
      </div>
    </div>
    <button v-if="showBackTop" class="back-top" @click="scrollToTop">返回顶部</button>
  </div>
</template>

<script>
export default {
  name: 'AdoptionCenter',
  data () {
    return {
      pets: [],
      activeCategory: 'ALL',
      petKeyword: '',
      placeholderImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80',
      modalVisible: false,
      detailVisible: false,
      detailPet: null,
      detailImageIndex: 0,
      showBackTop: false,
      successVisible: false,
      submitting: false,
      errorMessage: '',
      queryForm: {
        applicantName: '',
        phone: ''
      },
      queryResults: [],
      queryError: '',
      querySearched: false,
      querying: false,
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
      const keyword = this.petKeyword.trim().toLowerCase();
      return this.pets.filter(pet => {
        const categoryMatched = this.activeCategory === 'ALL' || this.petCategory(pet) === this.activeCategory;
        if (!categoryMatched) return false;
        if (!keyword) return true;
        return this.petSearchText(pet).includes(keyword);
      });
    }
  },
  created () {
    this.fetchPets();
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
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
    submitQuery () {
      const applicantName = this.queryForm.applicantName.trim();
      const phone = this.queryForm.phone.trim();
      if (!applicantName || !phone) {
        this.queryError = '请输入姓名和手机号';
        this.querySearched = false;
        this.queryResults = [];
        return;
      }
      if (!this.isValidPhone(phone)) {
        this.queryError = '请输入正确的11位手机号';
        this.querySearched = false;
        this.queryResults = [];
        return;
      }

      this.querying = true;
      this.queryError = '';
      fetch(`/api/adoptions/query?applicantName=${encodeURIComponent(applicantName)}&phone=${encodeURIComponent(phone)}`)
        .then(res => res.json())
        .then(data => {
          this.querySearched = true;
          this.queryResults = data && Array.isArray(data.data) ? data.data : [];
        })
        .catch(() => {
          this.queryError = '查询失败，请稍后重试';
          this.queryResults = [];
          this.querySearched = false;
        })
        .finally(() => {
          this.querying = false;
        });
    },
    getMainImageUrl (pet) {
      if (!pet) return '';
      const list = Array.isArray(pet.imageUrls) ? pet.imageUrls : [];
      const mainItem = list.find(item => item && item.isMain);
      return (mainItem && mainItem.url) || (list[0] && list[0].url) || pet.image || '';
    },
    getPetImages (pet) {
      if (!pet) return [];
      const urls = Array.isArray(pet.imageUrls)
        ? pet.imageUrls.map(item => item && item.url).filter(Boolean)
        : [];
      if (!urls.length && pet.image) urls.push(pet.image);
      return urls.length ? urls : [this.placeholderImage];
    },
    getDetailImageUrl () {
      const images = this.getPetImages(this.detailPet);
      return images[this.detailImageIndex] || images[0] || this.placeholderImage;
    },
    switchDetailImage (delta) {
      const images = this.getPetImages(this.detailPet);
      if (images.length <= 1) return;
      this.detailImageIndex = (this.detailImageIndex + delta + images.length) % images.length;
    },
    formatGender (value) {
      if (value === 'MALE') return '雄性';
      if (value === 'FEMALE') return '雌性';
      return value || '-';
    },
    formatDateTime (value) {
      if (!value) return '-';
      return String(value).replace('T', ' ').slice(0, 19);
    },
    statusText (status) {
      if (status === 1) return '已通过';
      if (status === 2) return '未通过';
      return '待审核';
    },
    statusClass (status) {
      if (status === 1) return 'status-approved';
      if (status === 2) return 'status-rejected';
      return 'status-pending';
    },
    petSearchText (pet) {
      const genderText = this.formatGender(pet && pet.gender);
      const ageText = pet && pet.age != null ? `${pet.age}岁 ${pet.age}` : '';
      return [
        pet && pet.nickname,
        pet && pet.breed,
        pet && pet.city,
        pet && pet.address,
        pet && pet.detail,
        pet && pet.type,
        pet && pet.species,
        pet && pet.category,
        genderText,
        ageText
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
    },
    statusSummary (status) {
      if (status === 1) return '您的申请已审核通过，工作人员将尽快与您联系。';
      if (status === 2) return '很抱歉，您的申请暂未通过审核。';
      return '您的申请已提交，工作人员正在审核中，请耐心等待。';
    },
    reviewMessage (item) {
      if (item && item.reviewRemark) return item.reviewRemark;
      if (item && item.status === 1) return '工作人员将尽快与您联系，请保持电话畅通。';
      if (item && item.status === 2) return '本次申请暂未通过审核。';
      return '工作人员正在处理中，请耐心等待。';
    },
    isValidPhone (phone) {
      return /^1[3-9]\d{9}$/.test(String(phone).trim());
    },
    onlyDigits (value) {
      return String(value || '').replace(/\D/g, '').slice(0, 11);
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
    openDetail (pet) {
      this.detailPet = pet;
      this.detailImageIndex = 0;
      this.detailVisible = true;
    },
    closeDetail () {
      this.detailVisible = false;
      this.detailPet = null;
      this.detailImageIndex = 0;
    },
    openApplyFromDetail () {
      const pet = this.detailPet;
      this.closeDetail();
      this.openApply(pet);
    },
    handleScroll () {
      this.showBackTop = window.pageYOffset > 420;
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      if (!this.isValidPhone(this.form.phone)) {
        this.errorMessage = '请输入正确的11位手机号';
        return;
      }
      if (this.form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email.trim())) {
        this.errorMessage = '请输入正确的邮箱地址';
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

.query-section {
  padding: 0 0 26px;
}

.query-card {
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.query-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.query-copy {
  min-width: 240px;
}

.query-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.query-subtitle {
  color: var(--muted);
  line-height: 1.6;
  font-size: 14px;
}

.query-form {
  display: grid;
  grid-template-columns: minmax(0, 180px) minmax(0, 220px) auto;
  gap: 12px;
  flex: 1;
}

.query-form input {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
}

.query-btn {
  white-space: nowrap;
}

.query-error {
  margin-top: 12px;
  color: #e11d48;
  font-size: 13px;
}

.query-results {
  margin-top: 20px;
}

.query-empty {
  padding: 18px 0 6px;
  color: var(--muted);
}

.query-result-list {
  display: grid;
  gap: 14px;
}

.query-result-card {
  border: 1px solid #f3d8df;
  background: #fff8fa;
  border-radius: 10px;
  padding: 18px 20px;
}

.query-result-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.query-pet-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.query-time {
  color: var(--muted);
  font-size: 13px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}

.status-pending {
  color: #b76e00;
  background: #fff4d6;
}

.status-approved {
  color: #117a43;
  background: #def7e8;
}

.status-rejected {
  color: #c2415b;
  background: #ffe1e8;
}

.query-result-body {
  display: grid;
  gap: 8px;
  color: #4b5563;
  line-height: 1.7;
}

.query-line {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 10px;
}

.query-label {
  color: var(--muted);
}

.pet-section {
  padding: 10px 0 40px;
}

.pet-filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
}

.filter-tabs {
  display: flex;
  gap: 10px;
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

.pet-search {
  width: min(360px, 100%);
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
  background: #fff;
}

.pet-search:focus {
  border-color: var(--orange-deep);
  box-shadow: 0 0 0 3px rgba(229, 96, 132, 0.12);
}

.clear-search {
  border: 1px solid #f3c7d4;
  background: #fff;
  color: var(--orange-deep);
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.pet-count {
  color: var(--muted);
  font-size: 14px;
  margin: -6px 0 18px;
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
  cursor: pointer;
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

.image-count {
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: rgba(17, 24, 39, 0.72);
  color: #fff;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
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

.pet-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
}

.action-btn {
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
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

.detail-card {
  max-width: 720px;
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
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

.detail-body {
  padding: 20px;
  overflow-y: auto;
}

.detail-main-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 360px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
}

.image-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: rgba(17, 24, 39, 0.62);
  color: #fff;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
}

.image-nav-prev {
  left: 14px;
}

.image-nav-next {
  right: 14px;
}

.detail-thumbs {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.detail-thumb {
  width: 84px;
  height: 58px;
  flex: 0 0 auto;
  border: 2px solid transparent;
  border-radius: 6px;
  background-size: cover;
  background-position: center;
  background-color: #f5f5f5;
  cursor: pointer;
}

.detail-thumb.active {
  border-color: var(--orange-deep);
}

.detail-info-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 18px;
}

.detail-info-grid div {
  border: 1px solid #f1dce3;
  border-radius: 8px;
  padding: 10px 12px;
  background: #fff8fa;
}

.detail-info-grid span,
.detail-address span,
.detail-desc span {
  display: block;
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 6px;
}

.detail-info-grid strong {
  color: var(--ink);
  font-size: 15px;
}

.detail-address,
.detail-desc {
  margin-top: 16px;
}

.detail-address p,
.detail-desc p {
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
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

.char-count {
  text-align: right;
  margin-top: 4px;
  color: var(--muted);
  font-size: 12px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px 20px 22px;
  flex-shrink: 0;
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

.back-top {
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 40;
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  background: var(--orange-deep);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(229, 96, 132, 0.28);
}

@media (max-width: 980px) {
  .query-bar,
  .query-form,
  .notice-grid,
  .pet-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .query-bar {
    display: grid;
  }

  .query-form {
    display: grid;
  }

  .query-line {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .pet-filter {
    align-items: stretch;
    flex-direction: column;
  }

  .filter-tabs {
    flex-wrap: wrap;
  }

  .pet-search {
    width: 100%;
  }

  .clear-search {
    width: 96px;
  }

  .detail-info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .query-card,
  .notice-card,
  .contact-card {
    padding: 20px;
  }

  .query-result-head {
    flex-direction: column;
  }

  .pet-actions,
  .detail-info-grid {
    grid-template-columns: 1fr;
  }

  .image-nav {
    width: 36px;
    height: 36px;
    font-size: 26px;
  }

  .back-top {
    right: 16px;
    bottom: 16px;
  }
}
</style>
