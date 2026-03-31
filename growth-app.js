(function(){
  const data = window.AIAIY_DATA;
  const $ = (s)=>document.querySelector(s);
  const toolMap = Object.fromEntries(data.tools.map(t=>[t.slug,t]));
  function track(event, params={}){ if(window.gtag){ window.gtag('event', event, params);} }
  window.aiaiyTrack = track;

  function toolTags(t){
    return [t.pricing, t.supportsChinese==='yes'?'Chinese support':'', t.companyRegion==='china'?'China tool':'Global', t.apiSupport?'API available':'', t.chinaAccessibility==='easy'?'China-accessible':'']
      .filter(Boolean).map(tag=>`<span class="tag">${tag}</span>`).join('');
  }

  function renderCards(slugs){
    return slugs.map(s=>toolMap[s]).filter(Boolean).map(t=>`
      <article class="card tool-card" data-name="${t.name.toLowerCase()}" data-categories="${t.categories.join(',')}" data-pricing="${t.pricing}" data-region="${t.companyRegion}" data-zh="${t.supportsChinese}" data-cn="${t.chinaAccessibility}">
        <h3><a href="/tools/${t.slug}/" data-event="tool_card_click" data-tool="${t.name}">${t.name}</a></h3>
        <p>${t.shortDescription}</p>
        <div class="tags">${toolTags(t)}</div>
      </article>`).join('');
  }

  function renderToolPage(slug){
    const t = toolMap[slug]; if(!t) return;
    document.title = `${t.name} 评测与替代方案 | AIAIY`;
    $('#page-title').textContent = `${t.name}：功能、价格、国内可用性与替代方案`;
    $('#intro').textContent = t.shortDescription;
    $('#meta-tags').innerHTML = toolTags(t);
    $('#tool-body').innerHTML = `<section><h2>What it is</h2><p>${t.shortDescription}，适合 ${t.bestFor.join(' / ')} 场景。</p></section>
    <section><h2>Key features</h2><ul>${t.pros.map(p=>`<li>${p}</li>`).join('')}</ul></section>
    <section><h2>Pros / Cons</h2><p><strong>Pros:</strong> ${t.pros.join('；')}。</p><p><strong>Cons:</strong> ${t.cons.join('；')}。</p></section>
    <section><h2>Pricing overview</h2><p>${t.pricing}，${t.freeTrial?'提供免费试用':'暂不提供免费试用'}。</p></section>
    <section><h2>China usability</h2><p>Supports Chinese: ${t.supportsChinese}；Accessible in China: ${t.chinaAccessibility}。</p></section>
    <section><h2>Alternatives</h2><div class="grid">${renderCards(t.alternatives)}</div></section>`;
    track('tool_detail_view',{tool_name:t.name,page_type:'tool'});
    $('#official-link').href = t.website;
    $('#official-link').addEventListener('click',()=>track('outbound_click',{tool_name:t.name,page_type:'tool'}));
  }

  function renderListPage(kind, slug){
    const source = data[kind]; const item = source.find(x=>x.slug===slug); if(!item) return;
    $('#page-title').textContent = item.title;
    $('#intro').textContent = item.description || item.summary;
    const slugs = item.tools || [];
    $('#tool-body').innerHTML = `<section><h2>快速结论</h2><p>${item.summary || item.description}</p></section><section><h2>推荐工具</h2><div class="grid">${renderCards(slugs)}</div></section><section><h2>FAQ</h2><p>Q: 适合新手吗？A: 建议先从免费/中文支持工具开始。</p></section>`;
    const eventName = kind==='comparisons'?'comparison_page_view':(kind==='useCases'?'use_case_page_view':(kind==='categories'?'category_page_view':'ranking_page_view'));
    track(eventName,{page_type:kind,category:slug});
  }

  function initHome(){
    const box = $('#search-input'); if(!box) return;
    const dataset = [
      ...data.tools.map(t=>({label:t.name,url:`/tools/${t.slug}/`,type:'tool'})),
      ...data.comparisons.map(c=>({label:c.title,url:`/compare/${c.slug}/`,type:'compare'})),
      ...data.useCases.map(u=>({label:u.title,url:`/use-cases/${u.slug}/`,type:'use_case'})),
      ...data.categories.map(c=>({label:c.title,url:`/categories/${c.slug}/`,type:'category'})),
      ...data.rankings.map(r=>({label:r.title,url:`/rankings/${r.slug}/`,type:'ranking'})),
    ];
    const suggest = $('#search-suggestions');
    function render(q){
      const k = q.toLowerCase().trim();
      const res = dataset.filter(i=>i.label.toLowerCase().includes(k)).slice(0,6);
      suggest.innerHTML = res.length?res.map(i=>`<a href="${i.url}" class="suggest-item">${i.label} <small>${i.type}</small></a>`).join(''):'<p class="empty">未找到结果，试试：DeepSeek vs Kimi / 免费 AI 工具</p>';
    }
    box.addEventListener('input',()=>render(box.value));
    $('#search-form').addEventListener('submit',(e)=>{e.preventDefault(); render(box.value); track('search_used',{page_type:'home',keyword:box.value});});
    render('');

    document.querySelectorAll('[data-event]').forEach(el=>el.addEventListener('click',()=>track(el.dataset.event,{tool_name:el.dataset.tool||'',source_section:el.dataset.section||'home'})));
    const subBtn = $('#subscribe-btn'); if(subBtn){ subBtn.addEventListener('click',()=>track('subscribe_click',{page_type:'home'})); }
    const comBtn = $('#community-btn'); if(comBtn){ comBtn.addEventListener('click',()=>track('community_click',{page_type:'home'})); }
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const type = document.body.dataset.pageType;
    const slug = document.body.dataset.slug;
    if(type==='tool') renderToolPage(slug);
    else if(type==='comparison') renderListPage('comparisons',slug);
    else if(type==='use-case') renderListPage('useCases',slug);
    else if(type==='category') renderListPage('categories',slug);
    else if(type==='ranking') renderListPage('rankings',slug);
    else initHome();
  });
})();
