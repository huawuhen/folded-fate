/**
 * 《命运折叠》AI互动影游 - 交互逻辑核心
 * 包含：实机互动试玩器、证据重构实验室比对、章节筛选、全屏演示模式
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPrototypeSimulator();
  initEvidenceLab();
  initChapterFilter();
  initDeckMode();
});

/* ==========================================================================
   1. 导航栏滚动交互与移动端菜单
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      navbar.classList.toggle('mobile-open');
    });
  }

  // 点击链接后移动端自动关闭
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mobile-open');
    });
  });
}

/* ==========================================================================
   2. 07-08 / 酒吧风波 实机互动试玩器
   ========================================================================== */
function initPrototypeSimulator() {
  const choiceButtons = document.querySelectorAll('#protoChoicesGrid .choice-btn');
  const resultBox = document.getElementById('protoResultBox');
  const hudStatus = document.getElementById('protoHudStatus');
  const resultBadge = document.getElementById('protoResultBadge');
  const resultTitle = document.getElementById('protoResultTitle');
  const step1 = document.getElementById('protoStep1');
  const step2 = document.getElementById('protoStep2');
  const step3 = document.getElementById('protoStep3');
  const resetBtn = document.getElementById('protoResetBtn');

  const BRANCH_DATA = {
    A: {
      badge: "分支结果 A ｜ 独善其身",
      title: "上车回家：致命未接来电",
      status: "剧情走向：自证困境",
      step1: "周放发动汽车迅速离开了酒吧；驶离现场 500 米时，中控屏突然跳出安冉的紧急来电。",
      step2: "【不接听】：翌日新闻头条报道安冉于后巷遇害，行车记录仪录入离开路线，周放被公安机关列为重大嫌疑对象。<br>【接听】：电话中安冉在呼救中断线，背景传来清晰的碰撞声与某方言咒骂。",
      step3: "接听后可进一步抉择“就此回家”或“掉头报警”，不同的处理将直接决定后续周放被审讯时的口供真伪判定及家人安危。"
    },
    B: {
      badge: "分支结果 B ｜ 报警求援",
      title: "报警求助：后巷追逐与涉险升级",
      status: "剧情走向：追逐逃生",
      step1: "电话接通 110 之前，醉汉察觉异样直接对周放发起袭击；周放亮明记者身份并拉住安冉向后巷窄道撤离。",
      step2: "后方车辆突然亮起大灯疯狂加速逼近，二人穿入极其狭窄的死胡同避难，后方汽车撞击在铁门上火花四溅。",
      step3: "躲开追逐后，玩家需在“护送安冉回家”与“就地分开”中做决断。若选择护送，将直接撞见受命前来的阿溟。"
    },
    C: {
      badge: "分支结果 C ｜ 当场介入",
      title: "上前帮助：影像固证与人群威慑",
      status: "剧情走向：舆论双刃剑",
      step1: "周放高举手机亮屏录像、高声亮明调查记者身份并大声呼喊，迅速引来酒吧街周边多名路人围观形成人墙压力。",
      step2: "纠缠者在聚光灯与手机镜头下被当众喝退，但周放当众介入的这一幕被他人拍下，成为日后网暴周放的病毒级伪证原素材。",
      step3: "安冉得以脱身并向周放借调充电宝与隐秘线索 U 盘，周放由此提前获得了调查线索的接触权，但也被黑产团伙死死盯上。"
    }
  };

  choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-choice');
      const data = BRANCH_DATA[choice];

      choiceButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // 更新 HUD
      if (hudStatus) hudStatus.textContent = data.status;

      // 更新内容
      resultBadge.textContent = data.badge;
      resultTitle.textContent = data.title;
      step1.innerHTML = data.step1;
      step2.innerHTML = data.step2;
      step3.innerHTML = data.step3;

      resultBox.style.display = 'block';
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      choiceButtons.forEach(b => b.classList.remove('selected'));
      resultBox.style.display = 'none';
      if (hudStatus) hudStatus.textContent = "等待玩家抉择";
    });
  }
}

/* ==========================================================================
   3. 09 / 证据重构实验室比对
   ========================================================================== */
function initEvidenceLab() {
  const toolButtons = document.querySelectorAll('.ev-tool-btn');
  const clueTitle = document.getElementById('evClueTitle');
  const clueContent = document.getElementById('evClueContent');
  const clueConclusion = document.getElementById('evClueConclusion');

  const CLUE_DATA = {
    time: {
      title: "比对拍摄时间与网络时钟同步",
      content: "经司法技术复核：小区监控 A 采用独立局域网，与国家授时中心毫秒级时间同步无误；而案发现场附近的监控 B 录像服务器被植入了 NTP 时间欺骗插件，<strong>其系统时钟比真实时间慢了整整 47 分钟</strong>！有人在案发前刻意篡改了录像元数据！",
      conclusion: "破案结论：周放当晚确实在回家的车程中，后巷录像实际为案发后 47 分钟由替身演戏伪造栽赃！"
    },
    data: {
      title: "查看原始文件 EXIF 与数据链流转",
      content: "调取监控 B 导出的 MP4 封装包，分析其十六进制文件头。发现该视频并非流式编码直接落盘，而是<strong>由两段不同焦段的监控素材在案发当晚 23:15 进行过跳帧剪辑</strong>，音频轨道缺失了酒吧街特有的雨滴声低频环境音。",
      conclusion: "证据瑕疵：监控 B 文件存在二次剪辑伪造痕迹，无法作为直接定罪证据！"
    },
    witness: {
      title: "走访证人与比对真实物理视线",
      content: "寻访当夜后巷目击的环卫工与便利店店员。证人表示当晚走过的人<strong>身高约 178cm、体态微躬且左肩有轻微跛行</strong>，而周放身高 184cm，无任何步态缺陷。当晚实际行经后巷的人，身型与阿溟高度相符。",
      conclusion: "人物关系逆转：被录入监控的并非周放，而是被胁迫前去刺杀安冉的阿溟！"
    }
  };

  toolButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.getAttribute('data-tool');
      const data = CLUE_DATA[tool];

      toolButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      clueTitle.textContent = data.title;
      clueContent.innerHTML = data.content;
      clueConclusion.innerHTML = `<strong>破案突破：</strong>${data.conclusion}`;
    });
  });
}

/* ==========================================================================
   4. 04 / 12章节全景地图动态筛选
   ========================================================================== */
function initChapterFilter() {
  const tabs = document.querySelectorAll('#chapterFilterTabs .ch-tab');
  const cards = document.querySelectorAll('#chapterTimeline .chapter-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      cards.forEach(card => {
        const role = card.getAttribute('data-role');
        if (filter === 'all' || role === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   5. 演示模式（Deck Presentation Mode）与快捷键控制
   ========================================================================== */
function initDeckMode() {
  const toggleBtn = document.getElementById('deckModeToggle');
  const deckControls = document.getElementById('deckControls');
  const prevBtn = document.getElementById('deckPrev');
  const nextBtn = document.getElementById('deckNext');
  const exitBtn = document.getElementById('deckExit');
  const indicator = document.getElementById('deckPageIndicator');
  const shortcutTip = document.getElementById('shortcutTip');
  const tipCloseBtn = document.getElementById('tipCloseBtn');

  const sections = Array.from(document.querySelectorAll('main > section'));
  let currentIndex = 0;
  let isDeckMode = false;

  // 快捷键提示关闭按钮
  if (tipCloseBtn && shortcutTip) {
    tipCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      shortcutTip.classList.add('dismissed');
    });
  }

  // 点击提示条本身也能快速切换演示模式
  if (shortcutTip) {
    shortcutTip.addEventListener('click', (e) => {
      if (e.target !== tipCloseBtn) {
        if (!isDeckMode) enterDeckMode();
      }
    });
  }

  function getCurrentSectionIndex() {
    // 根据当前滚动视口确定最靠近顶部的 section
    const scrollPos = window.scrollY + 100;
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollPos >= sections[i].offsetTop) {
        return i;
      }
    }
    return 0;
  }

  function updateDeckView() {
    if (!isDeckMode) return;
    const targetSection = sections[currentIndex];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      indicator.textContent = `${currentIndex + 1} / ${sections.length}`;
    }
  }

  function enterDeckMode() {
    isDeckMode = true;
    currentIndex = getCurrentSectionIndex();
    document.body.classList.add('deck-mode-active');
    if (toggleBtn) {
      toggleBtn.querySelector('.btn-text').textContent = '退出演示';
      toggleBtn.classList.add('active');
    }
    updateDeckView();
  }

  function exitDeckMode() {
    isDeckMode = false;
    document.body.classList.remove('deck-mode-active');
    if (toggleBtn) {
      toggleBtn.querySelector('.btn-text').textContent = '演示模式';
      toggleBtn.classList.remove('active');
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (isDeckMode) {
        exitDeckMode();
      } else {
        enterDeckMode();
      }
    });
  }

  if (exitBtn) exitBtn.addEventListener('click', exitDeckMode);

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < sections.length - 1) {
        currentIndex++;
        updateDeckView();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateDeckView();
      }
    });
  }

  // 键盘快捷键监听
  window.addEventListener('keydown', (e) => {
    // 忽略输入框或表单输入时的事件
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // Space 键：跳回到首页
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      currentIndex = 0;
      if (isDeckMode) {
        updateDeckView();
      } else {
        const heroEl = document.getElementById('hero');
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      e.preventDefault();
      if (!isDeckMode) {
        enterDeckMode();
      }
      if (currentIndex < sections.length - 1) {
        currentIndex++;
        updateDeckView();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      if (!isDeckMode) {
        enterDeckMode();
      }
      if (currentIndex > 0) {
        currentIndex--;
        updateDeckView();
      }
    } else if (e.key === 'Home') {
      if (isDeckMode) {
        e.preventDefault();
        currentIndex = 0;
        updateDeckView();
      }
    } else if (e.key === 'End') {
      if (isDeckMode) {
        e.preventDefault();
        currentIndex = sections.length - 1;
        updateDeckView();
      }
    } else if (e.key === 'Escape') {
      if (isDeckMode) {
        exitDeckMode();
      }
    }
  });
}
