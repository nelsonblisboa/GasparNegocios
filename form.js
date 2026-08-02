/* ===========================================================
   GASPAR — Negócios JPA · Lógica do formulário de cadastro
   =========================================================== */

(function() {
  'use strict';

  // Early debug
  window.addEventListener('error', (e) => {
    try { document.title = 'JS ERROR: ' + e.message; } catch (_) {}
  });
  console.log('[GASPAR form] script loaded');

  // === Config ===
  const SUPABASE_URL = 'https://ybsiwhdzuzlskyazvvvw.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_qTeNRDmzXzTe0O6Rb1IcDg_hll0gOCs';

  // === Helpers ===
  const $  = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  // === Inicializa Supabase (com try/catch) ===
  let supabase = null;
  try {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
      console.log('[GASPAR form] Supabase client OK, has .from:', typeof supabase?.from);
    } else {
      console.error('[GASPAR form] window.supabase não está disponível (CDN falhou?)');
    }
  } catch (e) {
    console.error('[GASPAR form] Falha ao criar cliente Supabase:', e);
  }

  // === Ano no rodapé ===
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // === Feedback UI ===
  function showSuccess() {
    $('#feedbackError').classList.remove('show');
    $('#feedbackSuccess').classList.add('show');
    $('#feedbackSuccess').scrollIntoView({ behavior: 'smooth', block: 'center' });
    $('#leadForm').style.display = 'none';
    const h2 = $('.form-card h2');
    if (h2) h2.style.display = 'none';
    const sub = $('.form-subtitle');
    if (sub) sub.style.display = 'none';
  }

  function showError(msg) {
    $('#feedbackSuccess').classList.remove('show');
    if (msg) $('#errorMsg').textContent = msg;
    $('#feedbackError').classList.add('show');
    $('#feedbackError').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function hideFeedback() {
    $('#feedbackSuccess').classList.remove('show');
    $('#feedbackError').classList.remove('show');
  }

  function setLoading(on) {
    const btn = $('#submitBtn');
    if (!btn) return;
    if (on) {
      btn.classList.add('loading');
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
    } else {
      btn.classList.remove('loading');
      btn.disabled = false;
      btn.removeAttribute('aria-busy');
    }
  }

  function clearErrors() {
    $$('.form-group').forEach((g) => g.classList.remove('has-error'));
  }

  function markError(id) {
    const el = document.getElementById(id);
    if (el && el.closest) {
      const g = el.closest('.form-group');
      if (g) g.classList.add('has-error');
    }
  }

  // === Validação ===
  function validateForm(data) {
    clearErrors();
    let ok = true;
    if (!data.nome || data.nome.length < 3) { markError('nome'); ok = false; }
    const waDigits = (data.whatsapp || '').replace(/\D/g, '');
    if (waDigits.length < 10 || waDigits.length > 13) { markError('whatsapp'); ok = false; }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(data.email || '')) { markError('email'); ok = false; }
    if (!data.produto) { markError('produto'); ok = false; }
    if (!data.consentimento) {
      const cg = $('.checkbox-group');
      if (cg) {
        cg.style.outline = '2px solid var(--c-danger)';
        setTimeout(() => { cg.style.outline = ''; }, 3000);
      }
      ok = false;
    }
    if (data.idade !== null && (data.idade < 0 || data.idade > 120)) {
      markError('idade');
      ok = false;
    }
    return ok;
  }

  // === Submit ===
  async function submitForm(e) {
    if (e && e.preventDefault) e.preventDefault();
    hideFeedback();

    const get = (id) => {
      const el = document.getElementById(id);
      return el ? el.value : '';
    };
    const idadeRaw = get('idade');
    const idadeParsed = parseInt(idadeRaw, 10);

    const data = {
      nome:         get('nome').trim(),
      whatsapp:     get('whatsapp').trim(),
      email:        get('email').trim().toLowerCase(),
      idade:        isNaN(idadeParsed) ? null : idadeParsed,
      cidade:       get('cidade').trim() || null,
      produto:      get('produto'),
      observacoes:  get('observacoes').trim() || null,
      consentimento: $('#consentimento').checked,
      origem:       'formulario-gaspar',
      user_agent:   navigator.userAgent.substring(0, 200),
      criado_em:    new Date().toISOString()
    };

    if (!validateForm(data)) {
      showError('Por favor, corrija os campos destacados antes de enviar.');
      const firstErr = document.querySelector('.form-group.has-error input, .form-group.has-error select');
      if (firstErr) firstErr.focus();
      return;
    }

    if (!supabase) {
      showError('Sistema indisponível no momento. Tente novamente em alguns minutos.');
      return;
    }

    setLoading(true);
    try {
      const { data: inserted, error } = await supabase
        .from('leads')
        .insert([data])
        .select();

      if (error) {
        console.error('[Supabase] error:', error);
        if (error.code === '42501' || /row-level security/i.test(error.message)) {
          showError('O formulário ainda não está configurado no Supabase (RLS). Fale com o administrador.');
        } else if (error.code === 'PGRST205' || /relation.*does not exist/i.test(error.message)) {
          showError('A tabela "leads" ainda não foi criada no Supabase. Execute o SQL do README.');
        } else {
          showError('Erro ao enviar. Tente novamente em alguns instantes.');
        }
        return;
      }

      showSuccess();
    } catch (err) {
      console.error('[Submit] exception:', err);
      showError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  // === Listeners (só adiciona se os elementos existirem) ===
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', submitForm);
    console.log('[GASPAR form] submit listener attached');
  } else {
    console.error('[GASPAR form] form#leadForm não encontrado');
  }

  const retryBtn = document.getElementById('retryBtn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      hideFeedback();
      const f = $('#leadForm'); if (f) f.style.display = '';
      const h2 = $('.form-card h2'); if (h2) h2.style.display = '';
      const sub = $('.form-subtitle'); if (sub) sub.style.display = '';
    });
  }

  // Máscara do WhatsApp
  const waInput = document.getElementById('whatsapp');
  if (waInput) {
    waInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 2) v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10);
      e.target.value = v;
    });
  }

  // Limpa erro do checkbox
  const consentEl = document.getElementById('consentimento');
  if (consentEl) {
    consentEl.addEventListener('change', (e) => {
      if (e.target.checked) {
        const cg = $('.checkbox-group');
        if (cg) cg.style.outline = '';
      }
    });
  }

  console.log('[GASPAR form] init complete. supabase available:', !!supabase);
})();
