# 《命运折叠》AI互动影游项目投资提案 Web 平台

> **REDITH × 杭州红手印传媒科技有限公司**
> 
> 本项目是将《命运折叠》AI互动影游项目提案全维度重构升级的现代**数字化投资人提案网页**。支持纯静态运行与 **Vercel** 极速一键部署。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhuawuhen%2Ffolded-fate)

---

## 🚀 极速一键部署 (Deploy to Vercel)

本项目采用**零依赖纯静态架构**（HTML5 + Modern CSS3 + Vanilla JavaScript），完美兼容 Vercel 全球边缘网络，秒级部署上线：

### 方式一：Vercel 一键点击部署（最推荐）

点击下方按钮，直接将本项目克隆到您的 GitHub 并在 Vercel 上自动完成构建与域名绑定：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fhuawuhen%2Ffolded-fate)

### 方式二：手动导入 Vercel
1. 登录 [Vercel 控制台](https://vercel.com/)，点击 **Add New...** -> **Project**；
2. 找到并选择导入 `huawuhen/folded-fate` 仓库；
3. Framework Preset 选择 **Other**（或保持默认，无需任何环境变量与构建命令）；
4. 点击 **Deploy**，约 10 秒内即可生成专属全球访问链接（如 `https://folded-fate.vercel.app`）。

### 方式三：本地运行预览
可以直接双击 `index.html` 在任意现代浏览器中打开，或使用本地服务：
```bash
# Python 快速本地预览
python -m http.server 3000
```
访问：`http://localhost:3000`

---

## 🌟 核心提案功能亮点 (Beyond PPT)

1. **沉浸式新黑色电影（Neo-Noir）美学 & 磨砂海报全局背景**：
   - 提取官方高清概念主视觉海报（倒悬都市、黄纸折船与雨夜反光），结合 `blur` 与深色微阶渐变，打造通透的磨砂质感全局底色。
2. **首屏视差呼吸镜头**：
   - 采用 1086×1448 母版海报，配合平滑呼吸变焦（Ken Burns）动态，打造影院级开篇气场。
3. **实机分支决策试玩器（07-08 Interactive Prototype）**：
   - 投资人可在网页中直接交互点击 **A（上车回家） / B（报警求助） / C（上前帮助）**，直观体验分支情节、HUD 态势与二级危机推演。
4. **证据重构实验室比对台（09 Evidence Lab）**：
   - 真实模拟“同一时间为什么出现两个周放？”的司法悖论。支持交互比对 NTP 时间欺骗、EXIF 数据链剪辑以及目击者体征矛盾。
5. **对标品类与壁垒分析（10-11 Benchmarks）**：
   - 横向深度对标《隐形守护者》《飞越13号房》《完蛋！我被美女包围了！》，凸显 AI 全链路工业化降本 60% 与强悬疑题材差异化护城河。
6. **全景章节交互地图（04 Chapter Map）**：
   - 1-12 章全景脉络，支持按“全部章节 / 周放线 / 阿溟线 / 安冉线”一键过滤筛选。
7. **投决会演示模式（Deck Presentation Mode）**：
   - 支持路演、投决会汇报，快捷键支持 `←` / `→` 切页，`Space` 键瞬回首页。
8. **一键导出 / 打印**：
   - 内置精心调校的 `@media print` 样式，方便直接在浏览器中另存为高清商业计划书 PDF。

---

## 📂 项目结构规范

```
folded-fate/
├── AGENT.md                 # 投资人认知模型、提案逻辑规范与AI一致性工程标准
├── README.md                # 项目快速指南与一键部署说明
├── index.html               # 提案主页面 (纯静态零依赖)
├── vercel.json              # Vercel 静态托管与缓存配置文件
├── css/
│   └── style.css            # 电影级样式系统、交互组件与响应式样式
├── js/
│   └── main.js              # 分支模拟器、证据比对、幻灯片控制与磨砂视差引擎
└── assets/
    └── images/              # 高清视觉素材、立绘及监控对比图
        ├── hero-poster-master.png # 官方概念主视觉海报 (1086x1448)
        ├── char-zhoufang.jpg      # 周放角色立绘
        ├── char-anran.jpg         # 安冉角色立绘
        ├── char-aming.jpg         # 阿溟角色立绘
        ├── char-linyiwen.jpg      # 林亦雯角色立绘
        ├── cam-01-apartment.jpg   # CAM 01 周放住宅走廊监控
        ├── cam-07-alley.jpg       # CAM 07 案发后巷暴雨暗道监控
        ├── benchmark-yxshz.png    # 对标案例 1
        ├── benchmark-fy13.png     # 对标案例 2
        └── benchmark-wdmn.png     # 对标案例 3
```

---

## 📝 商务与版权声明

* **企划版权**：杭州红手印传媒科技有限公司（REDITH）
* **项目形态**：AI影视短剧 × 多分支互动影游
* **部署状态**：Ready for Vercel & Production
