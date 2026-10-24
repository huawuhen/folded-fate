# 《命运折叠》AI互动影游项目投资提案 Web 平台

> **REDITH × 杭州红手印传媒科技有限公司**
> 
> 本项目是将原 PPT 格式的《命运折叠》AI互动影游项目书（v6）全维度重构升级的现代**数字化投资人提案网页**。支持纯静态运行与 **Vercel** 极速部署。

---

## 🌟 核心升级亮点 (Beyond PPT)

1. **沉浸式新黑色电影（Neo-Noir）美学**：
   - 提取原 PPT 中的 10 张核心视觉资产（海报、四大角色立绘、酒吧场景、现实主义影调图、尾页视觉），配合深色磨砂与高对比度光效。
2. **实机分支决策试玩器（07-08 Interactive Prototype）**：
   - 投资人可在网页中直接点击 **A（上车回家） / B（报警求助） / C（上前帮助）**，直观体验分支情节与二级危机推演，超越纸面描述。
3. **证据重构实验室比对台（09 Evidence Lab）**：
   - 真实模拟第11章“同一时间为什么出现两个周放？”的司法悖论。支持交互比对 NTP 时间篡改、EXIF 数据链剪辑以及目击者体征矛盾。
4. **全景章节交互地图（04 Chapter Map）**：
   - 1-12 章全景脉络，支持按“全部章节 / 周放线 / 阿溟线 / 安冉线”一键过滤筛选。
5. **双重呈现模式**：
   - **长图沉浸模式**：适合投资人自行用手机或电脑上下滑动细读。
   - **演示模式（Deck Presentation Mode）**：支持路演、投决会汇报，支持键盘 `←` / `→` / 空格键一键翻页。
6. **一键导出 / 打印**：
   - 内置精心调校的 `@media print` 样式，方便投资人直接在浏览器中另存为高清商业计划书 PDF。

---

## 🚀 部署指南 (Deploy to Vercel)

本项目采用**零依赖纯静态架构**（HTML5 + Modern CSS3 + Vanilla JavaScript），可零配置部署在任意静态托管平台：

### 方式一：Vercel 一键部署（推荐）
1. 将当前项目上传至你的 GitHub / GitLab 仓库。
2. 登录 [Vercel](https://vercel.com/)，点击 **Add New Project**。
3. 导入本仓库，Framework Preset 选择 **Other**（或保持默认），Root Directory 为当前根目录。
4. 点击 **Deploy**，几秒内即可生成全球 CDN 分发的在线链接（例如 `https://your-project.vercel.app`）。

### 方式二：本地运行预览
你可以直接双击 `index.html` 在 Chrome、Edge、Safari 等现代浏览器中打开，或者使用任意本地开发服务器：
```bash
# 使用 Python 启动本地测试服务器
python -m http.server 3000
```
访问浏览器：`http://localhost:3000`

---

## 📂 项目结构规范

```
tian_html/
├── AGENT.md                 # 面向投资人提案设计的思考、定位与规范体系 (核心交付文档)
├── README.md                # 项目快速指南与部署说明
├── index.html               # 提案主页面
├── vercel.json              # Vercel 静态缓存与干净 URL 配置文件
├── css/
│   └── style.css            # 电影级样式系统、交互组件与打印样式
├── js/
│   └── main.js              # 分支模拟器、证据重构比对、演示模式与章节筛选
└── assets/
    └── images/              # 从 PPT 中提取并规范化的高清视觉素材
        ├── hero-poster.jpg  # 封面主海报
        ├── char-zhoufang.jpg # 周放立绘
        ├── char-anran.jpg   # 安冉立绘
        ├── char-aming.jpg   # 阿溟立绘
        ├── char-linyiwen.jpg# 林亦雯立绘
        ├── scene-bar.jpg    # 酒吧风波场景
        ├── visual-red.jpg   # 红色视觉锚点
        ├── visual-office.jpg# 冷调办公空间
        ├── visual-crowd.jpg # 人群与压迫
        ├── footer-visual.jpg# 尾页视觉图
        ├── cam-01-apartment.jpg # CAM 01 周放住宅走廊监控
        └── cam-07-alley.jpg     # CAM 07 案发后巷暴雨暗道监控
```

---

## 📝 后续内容扩展与剧本接入

当项目推进并提供更详尽的剧本正文、新立绘三视图或视频 Demo 时：
1. **追加图片/视频**：放入 `assets/images/` 或 `assets/videos/`，并遵循 `AGENT.md` 中定义的命名规范。
2. **剧本节点扩展**：在 `js/main.js` 中的 `BRANCH_DATA` 字典扩展更多章节的选择树节点。
3. **团队与里程碑更新**：直接在 `index.html` 的 `04 / CHAPTER MAP` 与 `13 / ROADMAP` 区块中增减内容。
