/* Visita Home Health — Las Vegas
   Progressive enhancement only: the page and the contact form
   work with JavaScript disabled. */
(function () {
  'use strict';

  var FORM_ENDPOINT = 'https://vision.leadrai.com/api/forms/ff3a93083739593d571636d274b510a5';

  /* ---------- Current year in the footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Hidden _page field = current URL ---------- */
  var pageField = document.getElementById('form-page');
  function currentPage() {
    return window.location.href;
  }
  if (pageField) {
    pageField.value = currentPage();
  }

  /* ---------- Confirmation handling ---------- */
  var form = document.getElementById('contact-form');
  var confirmBox = document.getElementById('form-confirm');
  var errorBox = document.getElementById('form-error');

  function showConfirmation(scrollIntoView) {
    if (!confirmBox) return;
    confirmBox.hidden = false;
    if (form) form.hidden = true;
    if (errorBox) errorBox.hidden = true;
    if (scrollIntoView) {
      try {
        confirmBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (e) {
        confirmBox.scrollIntoView();
      }
    }
  }

  /* Plain HTML submission returns to this page with ?submitted=1 */
  var params = new URLSearchParams(window.location.search);
  if (params.get('submitted') === '1') {
    showConfirmation(true);
  }

  /* ---------- Fetch submission (same endpoint, same fields) ---------- */
  if (form && window.fetch) {
    form.addEventListener('submit', function (event) {
      if (typeof form.reportValidity === 'function' && !form.checkValidity()) {
        return; /* let the browser show native validation messages */
      }

      event.preventDefault();

      if (pageField) pageField.value = currentPage();
      if (errorBox) errorBox.hidden = true;

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      var payload = {};
      var data = new FormData(form);
      data.forEach(function (value, key) {
        payload[key] = typeof value === 'string' ? value : String(value);
      });
      payload._page = currentPage();

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json().catch(function () {
            return { ok: response.ok };
          });
        })
        .then(function (result) {
          if (result && result.ok) {
            showConfirmation(true);
          } else {
            throw new Error('Submission rejected');
          }
        })
        .catch(function () {
          if (errorBox) errorBox.hidden = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });
  }

  /* ---------- Subtle reveal on scroll (skipped if reduced motion) ---------- */
  var prefersReduced = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.service-feature, .service-row, .pedi-card, .steps li, .cta-strip, .form-card, .contact-copy'
    );
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();
