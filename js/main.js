(function () {
  'use strict';

  function fmt(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  /* ── Calculator (honest model) ──
     Current monthly fees = card volume × effective rate.
     Cash-discount path: properly configured program can offset
     processing so net merchant processing cost approaches $0
     on card volume. No unused sliders. */
  function calcSavings() {
    var revEl = document.getElementById('revenue');
    var rateEl = document.getElementById('rate');
    if (!revEl || !rateEl) return;

    var rev = parseFloat(revEl.value);
    var ratePct = parseFloat(rateEl.value);
    var rate = ratePct / 100;

    var currentFees = rev * rate;
    var annual = currentFees * 12;
    var fiveyr = currentFees * 60;
    // Net with cash discount approaches $0 on card volume
    var withCd = 0;
    var monthlySavings = currentFees - withCd;

    var setText = function (id, text) {
      var el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setText('rev-display', fmt(rev));
    setText('rate-display', ratePct.toFixed(1) + '%');
    setText('current-monthly', fmt(currentFees));
    setText('annual-loss', fmt(annual));
    setText('fiveyear-loss', fmt(fiveyr));
    setText('bar-old-label', fmt(currentFees) + '/mo');
    setText('bar-new-label', fmt(withCd) + '/mo');
    setText('monthly-savings', fmt(monthlySavings));

    var oldBar = document.getElementById('bar-old');
    if (oldBar) oldBar.style.width = '100%';
  }

  ['revenue', 'rate'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', calcSavings);
  });
  calcSavings();

  /* ── Mobile nav ── */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Phone formatting ── */
  var phone = document.getElementById('phone');
  if (phone) {
    phone.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 10);
      if (v.length >= 7) {
        v = '(' + v.slice(0, 3) + ') ' + v.slice(3, 6) + '-' + v.slice(6);
      } else if (v.length >= 4) {
        v = '(' + v.slice(0, 3) + ') ' + v.slice(3);
      }
      this.value = v;
    });
  }

  /* ── Form validation + Formspree ── */
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  function clearErrors(formEl) {
    formEl.querySelectorAll('.form-group').forEach(function (g) {
      g.classList.remove('has-error');
    });
    formEl.querySelectorAll('.is-invalid').forEach(function (el) {
      el.classList.remove('is-invalid');
    });
  }

  function markInvalid(input, message) {
    var group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    input.classList.add('is-invalid');
    var err = group.querySelector('.form-error');
    if (err && message) err.textContent = message;
  }

  function validateForm(formEl) {
    clearErrors(formEl);
    var ok = true;
    var fname = formEl.querySelector('[name="fname"]');
    var lname = formEl.querySelector('[name="lname"]');
    var phoneInput = formEl.querySelector('[name="phone"]');
    var biz = formEl.querySelector('[name="bizname"]');

    if (fname && !fname.value.trim()) {
      markInvalid(fname, 'Required');
      ok = false;
    }
    if (lname && !lname.value.trim()) {
      markInvalid(lname, 'Required');
      ok = false;
    }
    if (phoneInput) {
      var digits = phoneInput.value.replace(/\D/g, '');
      if (digits.length < 10) {
        markInvalid(phoneInput, 'Enter a 10-digit phone number');
        ok = false;
      }
    }
    if (biz && !biz.value.trim()) {
      markInvalid(biz, 'Required');
      ok = false;
    }
    return ok;
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!validateForm(this)) return;

      var btn = this.querySelector('.form-submit');
      var original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        var res = await fetch('https://formspree.io/f/xnpqjkll', {
          method: 'POST',
          body: new FormData(this),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          this.style.display = 'none';
          if (success) success.classList.add('is-visible');
        } else {
          btn.textContent = original;
          btn.disabled = false;
          alert('Something went wrong. Please text Alec at 502-693-2990.');
        }
      } catch (err) {
        btn.textContent = original;
        btn.disabled = false;
        alert('Network error. Please text Alec at 502-693-2990.');
      }
    });
  }

  /* ── Active nav highlight ── */
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function onScroll() {
    var current = '';
    sections.forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navAnchors.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === '#' + current) a.classList.add('is-active');
      else a.classList.remove('is-active');
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
