<template>
  <div id="app" class="page">
    <header class="hero">
      <h1>用户端首页</h1>
      <p>Vue2 初始模板已就绪。</p>
    </header>
    <main class="content">
      <section class="card">
        <h2>开始开发</h2>
        <ol>
          <li>安装依赖</li>
          <li>启动开发服务器</li>
          <li>开始编写页面</li>
        </ol>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
:root {
  --bg: #f7f2ee;
  --text: #1f1f1f;
  --accent: #1b6e5a;
  --card: #ffffff;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "ZCOOL XiaoWei", "Noto Serif SC", "Microsoft YaHei", serif;
  color: var(--text);
  background: radial-gradient(1000px 600px at 20% -10%, #ffe9d6 0%, rgba(255,233,214,0) 60%),
              radial-gradient(800px 500px at 90% 10%, #d8efe8 0%, rgba(216,239,232,0) 55%),
              var(--bg);
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 20px 80px;
}

.hero {
  text-align: center;
  max-width: 720px;
}

.hero h1 {
  font-size: 36px;
  margin: 0 0 8px;
  letter-spacing: 1px;
}

.hero p {
  margin: 0;
  color: #555;
}

.content {
  width: 100%;
  max-width: 880px;
  margin-top: 32px;
}

.card {
  background: var(--card);
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.card h2 {
  margin: 0 0 12px;
  color: var(--accent);
}

.card ol {
  margin: 0;
  padding-left: 18px;
  color: #444;
}
</style>
