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
  const protoChoiceHint = document.getElementById('protoChoiceHint');
  const hudStatus = document.getElementById('protoHudStatus');
  const resultBadge = document.getElementById('protoResultBadge');
  const resultTitle = document.getElementById('protoResultTitle');
  const step1 = document.getElementById('protoStep1');
  const step2 = document.getElementById('protoStep2');
  const step3 = document.getElementById('protoStep3');
  const resetBtn = document.getElementById('protoResetBtn');
  const protoSceneImg = document.getElementById('protoSceneImg');
  const protoVideo = document.getElementById('protoVideo');
  const protoReplayBtn = document.getElementById('protoReplayBtn');

  // 态势面板 DOM 元素
  const telemetryBpm = document.getElementById('telemetryBpm');
  const telemetryBpmStatus = document.getElementById('telemetryBpmStatus');
  const telemetryStressText = document.getElementById('telemetryStressText');
  const telemetryStressBar = document.getElementById('telemetryStressBar');
  const telemetryTruthDelta = document.getElementById('telemetryTruthDelta');
  const telemetryTruthBar = document.getElementById('telemetryTruthBar');
  const telemetryDangerDelta = document.getElementById('telemetryDangerDelta');
  const telemetryDangerBar = document.getElementById('telemetryDangerBar');
  const telemetryCausality = document.getElementById('telemetryCausality');
  const telemetryModeTag = document.getElementById('telemetryModeTag');

  const TELEMETRY_BASELINE = {
    bpm: "82",
    bpmStatus: "心率平稳",
    bpmBadgeClass: "metric-badge",
    stress: 35,
    stressText: "35% · 状态可控",
    stressLevel: "level-normal",
    truth: 40,
    truthDelta: "基准线",
    danger: 20,
    dangerDelta: "正常",
    causality: "提示：点击右侧任意抉择，即刻推演该行为对主线剧情的深层连锁震荡",
    modeTag: "REALTIME · 实时监测"
  };

  function applyTelemetry(t, isActive = false) {
    if (telemetryBpm) telemetryBpm.textContent = t.bpm;
    if (telemetryBpmStatus) {
      telemetryBpmStatus.textContent = t.bpmStatus;
      telemetryBpmStatus.className = t.bpmBadgeClass || "metric-badge";
    }
    if (telemetryStressText) telemetryStressText.textContent = t.stressText;
    if (telemetryStressBar) {
      telemetryStressBar.style.width = `${t.stress}%`;
      telemetryStressBar.className = `telemetry-progress-bar ${t.stressLevel}`;
    }
    if (telemetryTruthDelta) telemetryTruthDelta.textContent = t.truthDelta;
    if (telemetryTruthBar) telemetryTruthBar.style.width = `${t.truth}%`;
    if (telemetryDangerDelta) telemetryDangerDelta.textContent = t.dangerDelta;
    if (telemetryDangerBar) telemetryDangerBar.style.width = `${t.danger}%`;
    if (telemetryCausality) telemetryCausality.textContent = t.causality;
    if (telemetryModeTag) telemetryModeTag.textContent = t.modeTag;

    const causalityBox = document.querySelector('.telemetry-causality-box');
    if (causalityBox) {
      if (isActive) causalityBox.classList.add('active-choice');
      else causalityBox.classList.remove('active-choice');
    }
  }

  const VIDEO_MAP = {
    A: "assets/media/a-20261024-171624.mp4",
    B: "assets/media/b-20261024-171712.mp4",
    C: "assets/media/c-20261024-171736.mp4"
  };

  let currentChoice = null;

  // 视频播放结束监听：仅播放一遍，结束后显示重新放映按钮
  if (protoVideo) {
    protoVideo.addEventListener('ended', () => {
      if (protoReplayBtn) protoReplayBtn.style.display = 'inline-flex';
      if (currentChoice && BRANCH_DATA[currentChoice] && hudStatus) {
        hudStatus.textContent = BRANCH_DATA[currentChoice].status;
      }
    });
  }

  // 重新放映按钮事件
  if (protoReplayBtn && protoVideo) {
    protoReplayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      protoVideo.currentTime = 0;
      protoVideo.loop = false;
      protoReplayBtn.style.display = 'none';
      if (currentChoice && hudStatus) {
        hudStatus.textContent = `🎬 放映分支 ${currentChoice} 片段`;
      }
      protoVideo.play().catch(() => {
        protoVideo.muted = true;
        protoVideo.play();
      });
    });
  }

  const BRANCH_DATA = {
    A: {
      badge: "分支结果 A ｜ 独善其身",
      title: "上车回家：致命未接来电",
      status: "剧情走向：自证困境",
      step1: "周放发动汽车迅速离开了酒吧；驶离现场 500 米时，中控屏突然跳出安冉的紧急来电。",
      step2: "【不接听】：翌日新闻头条报道安冉于后巷遇害，行车记录仪录入离开路线，周放被公安机关列为重大嫌疑对象。<br>【接听】：电话中安冉在呼救中断线，背景传来清晰的碰撞声与某方言咒骂。",
      step3: "接听后可进一步抉择“就此回家”或“掉头报警”，不同的处理将直接决定后续周放被审讯时的口供真伪判定及家人安危。",
      telemetry: {
        bpm: "106",
        bpmStatus: "心率加速",
        bpmBadgeClass: "metric-badge badge-warning",
        stress: 55,
        stressText: "55% · 隐忧戒备",
        stressLevel: "level-warning",
        truth: 25,
        truthDelta: "-15% 错失先机",
        danger: 45,
        dangerDelta: "+25% 潜伏暗涌",
        causality: "🔗 因果锁定：【安冉遇险断线】错过第一现场直接线索，行车记录仪成为自证困境",
        modeTag: "SIMULATION · 分支 A 推演"
      }
    },
    B: {
      badge: "分支结果 B ｜ 报警求援",
      title: "报警求助：后巷追逐与涉险升级",
      status: "剧情走向：追逐逃生",
      step1: "电话接通 110 之前，醉汉察觉异样直接对周放发起袭击；周放亮明记者身份并拉住安冉向后巷窄道撤离。",
      step2: "后方车辆突然亮起大灯疯狂加速逼近，二人穿入极其狭窄的死胡同避难，后方汽车撞击在铁门上火花四溅。",
      step3: "躲开追逐后，玩家需在“护送安冉回家”与“就地分开”中做决断。若选择护送，将直接撞见受命前来的阿溟。",
      telemetry: {
        bpm: "128",
        bpmStatus: "剧烈紧张",
        bpmBadgeClass: "metric-badge badge-warning",
        stress: 72,
        stressText: "72% · 高度警戒",
        stressLevel: "level-warning",
        truth: 65,
        truthDelta: "+25% 官方立案",
        danger: 60,
        dangerDelta: "+40% 遭到围堵",
        causality: "🔗 因果锁定：【后巷死斗触发】固定出警时间轴与自保口供，但激怒暗中盯梢团伙",
        modeTag: "SIMULATION · 分支 B 推演"
      }
    },
    C: {
      badge: "分支结果 C ｜ 当场介入",
      title: "上前帮助：影像固证与人群威慑",
      status: "剧情走向：舆论双刃剑",
      step1: "周放高举手机亮屏录像、高声亮明调查记者身份并大声呼喊，迅速引来酒吧街周边多名路人围观形成人墙压力。",
      step2: "纠缠者在聚光灯与手机镜头下被当众喝退，但周放当众介入的这一幕被他人拍下，成为日后网暴周放的病毒级伪证原素材。",
      step3: "安冉得以脱身并向周放借调充电宝与隐秘线索 U 盘，周放由此提前获得了调查线索的接触权，但也被黑产团伙死死盯上。",
      telemetry: {
        bpm: "148",
        bpmStatus: "心率飙升",
        bpmBadgeClass: "metric-badge badge-danger",
        stress: 92,
        stressText: "92% · 极度紧绷",
        stressLevel: "level-danger",
        truth: 90,
        truthDelta: "+50% 一手铁证",
        danger: 88,
        dangerDelta: "+68% 正面冲突",
        causality: "🔗 因果锁定：【涉案U盘截获】赢得安冉绝密信任，当场固证但沦为舆论风暴靶心",
        modeTag: "SIMULATION · 分支 C 推演"
      }
    }
  };

  choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-choice');
      const data = BRANCH_DATA[choice];
      currentChoice = choice;

      choiceButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // 切换并播放对应实机影视片段
      if (protoVideo && VIDEO_MAP[choice]) {
        if (protoSceneImg) protoSceneImg.style.display = 'none';
        protoVideo.style.display = 'block';

        if (protoVideo.getAttribute('data-current-choice') !== choice) {
          protoVideo.src = VIDEO_MAP[choice];
          protoVideo.setAttribute('data-current-choice', choice);
          protoVideo.load();
        } else {
          protoVideo.currentTime = 0;
        }

        protoVideo.loop = false; // 严格播放一遍
        if (protoReplayBtn) protoReplayBtn.style.display = 'none';

        // 尝试自动播放
        const playPromise = protoVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            protoVideo.muted = true;
            protoVideo.play();
          });
        }
      }

      // 更新 HUD
      if (hudStatus) hudStatus.textContent = `🎬 放映分支 ${choice} 片段`;

      // 同步更新左侧影视级态势监控面板
      if (data.telemetry) {
        applyTelemetry(data.telemetry, true);
      }

      // 更新内容
      resultBadge.textContent = data.badge;
      resultTitle.textContent = data.title;
      step1.innerHTML = data.step1;
      step2.innerHTML = data.step2;
      step3.innerHTML = data.step3;

      if (protoChoiceHint) protoChoiceHint.style.display = 'none';
      resultBox.style.display = 'block';
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      choiceButtons.forEach(b => b.classList.remove('selected'));
      resultBox.style.display = 'none';
      if (protoChoiceHint) protoChoiceHint.style.display = 'flex';
      if (hudStatus) hudStatus.textContent = "等待玩家抉择";

      // 重置态势面板到基准线
      applyTelemetry(TELEMETRY_BASELINE, false);

      if (protoVideo) {
        protoVideo.pause();
        protoVideo.currentTime = 0;
        protoVideo.style.display = 'none';
        protoVideo.removeAttribute('data-current-choice');
      }
      if (protoSceneImg) protoSceneImg.style.display = 'block';
      if (protoReplayBtn) protoReplayBtn.style.display = 'none';
      currentChoice = null;
    });
  }
}

/* ==========================================================================
   3. 09 / 证据重构实验室比对
   ========================================================================== */
function initEvidenceLab() {
  const toolButtons = document.querySelectorAll('.ev-tool-btn');
  const evClueDisplay = document.getElementById('evClueDisplay');
  const clueTitle = document.getElementById('evClueTitle');
  const clueContent = document.getElementById('evClueContent');
  const clueConclusion = document.getElementById('evClueConclusion');

  const CLUE_DATA = {
    time: {
      title: "比对拍摄时间与网络时钟同步",
      content: "经司法技术复核：小区监控 A 采用独立局域网，与国家授时中心毫秒级时间同步无误；而案发现场附近的监控 B 录像服务器被植入了 NTP 时间欺骗插件，<strong>其系统时钟比真实时间慢了整整 47 分钟</strong>！有人在案发前刻意篡改了录像元数据！",
      conclusion: "周放当晚确实在回家的车程中，后巷录像实际为案发后 47 分钟由替身演戏伪造栽赃！"
    },
    data: {
      title: "查看原始文件 EXIF 与数据链流转",
      content: "调取监控 B 导出的 MP4 封装包，分析其十六进制文件头。发现该视频并非流式编码直接落盘，而是<strong>由两段不同焦段的监控素材在案发当晚 23:15 进行过跳帧剪辑</strong>，音频轨道缺失了酒吧街特有的雨滴声低频环境音。",
      conclusion: "监控 B 文件存在二次剪辑伪造痕迹，无法作为直接定罪证据！"
    },
    witness: {
      title: "走访证人与比对真实物理视线",
      content: "寻访当夜后巷目击的环卫工与便利店店员。证人表示当晚走过的人<strong>身高约 178cm、体态微躬且左肩有轻微跛行</strong>，而周放身高 184cm，无任何步态缺陷。当晚实际行经后巷的人，身型与阿溟高度相符。",
      conclusion: "被录入监控的并非周放，而是被胁迫前去刺杀安冉的阿溟！"
    }
  };

  toolButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tool = btn.getAttribute('data-tool');
      const data = CLUE_DATA[tool];

      toolButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (evClueDisplay) {
        evClueDisplay.classList.remove('ev-standby-state');
      }
      if (clueConclusion) {
        clueConclusion.style.display = 'block';
      }

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

  function syncBackdropWithSlide(idx) {
    const posterLayer = document.querySelector('.backdrop-poster-layer');
    if (!posterLayer) return;
    const progress = sections.length > 1 ? idx / (sections.length - 1) : 0;
    const shiftY = (progress * 36 - 18).toFixed(1);
    const shiftX = (Math.sin(idx * 0.8) * 10).toFixed(1);
    const scale = (1.04 + (idx % 3) * 0.015).toFixed(3);
    posterLayer.style.transform = `scale(${scale}) translate3d(${shiftX}px, ${shiftY}px, 0)`;
  }

  function updateDeckView() {
    if (!isDeckMode) return;
    const targetSection = sections[currentIndex];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      indicator.textContent = `${currentIndex + 1} / ${sections.length}`;
      syncBackdropWithSlide(currentIndex);
    }
  }

  // 滚动时背景磨砂海报的微视差
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking && !isDeckMode) {
      window.requestAnimationFrame(() => {
        const posterLayer = document.querySelector('.backdrop-poster-layer');
        if (posterLayer) {
          const scrollFrac = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
          const shiftY = (scrollFrac * 30 - 15).toFixed(1);
          posterLayer.style.transform = `scale(1.04) translate3d(0, ${shiftY}px, 0)`;
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

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
