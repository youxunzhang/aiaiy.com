const state = {
  levels: [],
  items: [],
  selectedLevel: null,
  selectedEmotions: new Set(),
};

const elements = {
  levelList: document.querySelector('#level-list'),
  emotionList: document.querySelector('#emotion-list'),
  resultPanel: document.querySelector('#result-panel'),
  stepIndicators: document.querySelectorAll('[data-step-indicator]'),
  backButtons: document.querySelectorAll('[data-back]'),
  nextButtons: document.querySelectorAll('[data-next]'),
  selectedLevelText: document.querySelector('#selected-level-text'),
  selectionHint: document.querySelector('#selection-hint'),
  printButton: document.querySelector('#print-button'),
  explanationTitle: document.querySelector('#emotion-explanation-title'),
  explanationText: document.querySelector('#emotion-explanation-text'),
};

function setStep(step) {
  document.querySelectorAll('[data-step]').forEach((section) => {
    section.classList.toggle('hidden', section.dataset.step !== step);
  });

  elements.stepIndicators.forEach((indicator) => {
    indicator.classList.toggle('bg-indigo-600', indicator.dataset.stepIndicator === step);
    indicator.classList.toggle('text-white', indicator.dataset.stepIndicator === step);
    indicator.classList.toggle('bg-white', indicator.dataset.stepIndicator !== step);
    indicator.classList.toggle('text-slate-600', indicator.dataset.stepIndicator !== step);
  });

  elements.backButtons.forEach((btn) => {
    btn.disabled = step === '1';
  });
}

function createLevelCard(level) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className =
    'group relative flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500';
  button.innerHTML = `
    <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">第 ${level.order} 层</span>
    <span class="text-lg font-semibold text-slate-900">${level.name}</span>
    <span class="text-sm text-slate-500">点击开始自检</span>
  `;
  button.addEventListener('click', () => {
    state.selectedLevel = level.key;
    state.selectedEmotions.clear();
    elements.selectedLevelText.textContent = level.name;
    renderEmotions();
    updateEmotionHint();
    resetExplanation();
    setStep('2');
  });
  return button;
}

function updateEmotionHint() {
  const count = state.selectedEmotions.size;
  elements.selectionHint.textContent = count
    ? `已选 ${count} 项，可继续多选。`
    : '可多选你当下最贴近的情绪分支。';
}

function createEmotionCard(item) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className =
    'flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500';
  button.innerHTML = `
    <div class="flex items-center justify-between">
      <span class="text-lg font-semibold text-slate-900">${item.emotion}</span>
      <span class="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-500">${item.levelName}</span>
    </div>
  `;

  function updateSelected() {
    const isSelected = state.selectedEmotions.has(item.id);
    button.classList.toggle('border-indigo-500', isSelected);
    button.classList.toggle('bg-indigo-50', isSelected);
    button.classList.toggle('text-indigo-700', isSelected);
  }

  button.addEventListener('click', () => {
    if (state.selectedEmotions.has(item.id)) {
      state.selectedEmotions.delete(item.id);
      updateSelected();
      updateEmotionHint();
      setExplanation(item);
      return;
    }

    state.selectedEmotions.add(item.id);
    updateSelected();
    updateEmotionHint();
    setExplanation(item);
  });

  updateSelected();
  return button;
}

function getEmotionExplanation(item) {
  if (item.description) return item.description;
  const level = state.levels.find((levelItem) => levelItem.key === item.level);
  const levelName = level ? level.name : '当前层级';
  return `「${item.emotion}」指你在${levelName}状态下的一种常见情绪反应，可能表现为对当下处境的主观感受、身体反应或想法变化。`;
}

function resetExplanation() {
  if (!elements.explanationTitle || !elements.explanationText) return;
  elements.explanationTitle.textContent = '请选择一个情绪';
  elements.explanationText.textContent = '点击上方任意情绪卡片，查看该情绪的简要解释。';
}

function setExplanation(item) {
  if (!elements.explanationTitle || !elements.explanationText) return;
  elements.explanationTitle.textContent = item.emotion;
  elements.explanationText.textContent = getEmotionExplanation(item);
}

function renderLevels() {
  elements.levelList.innerHTML = '';
  const sorted = [...state.levels].sort((a, b) => a.order - b.order);
  sorted.forEach((level) => elements.levelList.appendChild(createLevelCard(level)));
}

function renderEmotions() {
  elements.emotionList.innerHTML = '';
  const level = state.levels.find((item) => item.key === state.selectedLevel);
  if (!level) return;

  const filtered = state.items
    .filter((item) => item.level === level.key)
    .map((item) => ({ ...item, levelName: level.name }));

  if (!filtered.length) {
    elements.emotionList.innerHTML =
      '<div class="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">这个层级暂时没有情绪数据，稍后再来看看吧。</div>';
    return;
  }

  filtered.forEach((item) => elements.emotionList.appendChild(createEmotionCard(item)));
}

function renderResults() {
  const selectedItems = state.items.filter((item) => state.selectedEmotions.has(item.id));
  if (!selectedItems.length) {
    elements.resultPanel.innerHTML =
      '<div class="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500">还没有选择情绪，请返回上一步。</div>';
    return;
  }

  const levelMap = new Map(state.levels.map((level) => [level.key, level.name]));
  const grouped = selectedItems.reduce((map, item) => {
    const key = item.level;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(item);
    return map;
  }, new Map());

  const cards = [...grouped.entries()]
    .map(([levelKey, items]) => {
      const tags = items
        .map(
          (item) =>
            `<span class="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">${item.emotion}</span>`,
        )
        .join('');
      return `
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <h3 class="text-lg font-semibold text-slate-900">${levelMap.get(levelKey)}</h3>
            <span class="text-xs text-slate-400">共 ${items.length} 项</span>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">${tags}</div>
        </div>
      `;
    })
    .join('');

  elements.resultPanel.innerHTML = `
    <div class="space-y-4">
      <div class="rounded-2xl bg-indigo-600 px-6 py-4 text-white">
        <h2 class="text-xl font-semibold">你的情绪扫描结果</h2>
        <p class="mt-1 text-sm text-indigo-100">共选择 ${selectedItems.length} 项情绪分支，可直接打印保存。</p>
      </div>
      <div class="grid gap-4 lg:grid-cols-2">${cards}</div>
    </div>
  `;
}

function handleNext(step) {
  if (step === '1') {
    if (!state.selectedLevel) return;
    setStep('2');
    return;
  }

  if (step === '2') {
    renderResults();
    setStep('3');
  }
}

function handleBack(step) {
  if (step === '2') {
    setStep('1');
  }
  if (step === '3') {
    setStep('2');
  }
}

async function init() {
  try {
    const response = await fetch('./data/emotions.seed.json');
    const data = await response.json();
    state.levels = data.levels || [];
    state.items = data.items || [];
    renderLevels();
    updateEmotionHint();
    resetExplanation();
  } catch (error) {
    elements.levelList.innerHTML =
      '<div class="rounded-2xl border border-dashed border-red-200 bg-white p-6 text-center text-sm text-red-500">数据加载失败，请稍后再试。</div>';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  init();
  setStep('1');

  elements.nextButtons.forEach((btn) => {
    btn.addEventListener('click', () => handleNext(btn.dataset.next));
  });

  elements.backButtons.forEach((btn) => {
    btn.addEventListener('click', () => handleBack(btn.dataset.back));
  });

  if (elements.printButton) {
    elements.printButton.addEventListener('click', () => window.print());
  }
});
