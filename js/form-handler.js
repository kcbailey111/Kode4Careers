/* Kode4Careers — Consultation inquiry form: validation & submission */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("consultation-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.querySelector(".btn__label");
  const status = document.getElementById("form-status");
  const success = document.getElementById("form-success");
  const resetBtn = document.getElementById("form-reset");
  const fallbackEmail = form.dataset.fallbackEmail;

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (value) => (value.trim().length >= 2 ? "" : "Please enter your full name."),
    email: (value) => {
      if (!value.trim()) return "Please enter your email address.";
      return EMAIL_PATTERN.test(value.trim()) ? "" : "Please enter a valid email address.";
    },
    service: (value) => (value ? "" : "Please select a service of interest."),
    message: (value) =>
      value.trim().length >= 10 ? "" : "Please share a few details about your project (at least 10 characters).",
  };

  const getErrorEl = (field) => document.getElementById(`${field.id}-error`);

  const validateField = (field) => {
    const rule = rules[field.name];
    if (!rule) return true;

    const message = rule(field.value);
    const wrapper = field.closest(".form-field");
    const errorEl = getErrorEl(field);

    wrapper.classList.toggle("has-error", Boolean(message));
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (errorEl) errorEl.textContent = message;

    return !message;
  };

  const validateForm = () => {
    let firstInvalid = null;
    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      if (field && !validateField(field) && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  };

  const setLoading = (loading) => {
    submitBtn.disabled = loading;
    submitBtn.setAttribute("aria-busy", String(loading));
    submitLabel.textContent = loading ? "Sending…" : "Submit Inquiry";
  };

  const showError = (html) => {
    status.className = "form-status form-status--error";
    status.innerHTML = html;
  };

  const clearStatus = () => {
    status.className = "form-status";
    status.textContent = "";
  };

  Object.keys(rules).forEach((name) => {
    const field = form.elements[name];
    if (!field) return;
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".form-field").classList.contains("has-error")) validateField(field);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearStatus();

    if (!validateForm()) return;

    const emailLink = `<a href="mailto:${fallbackEmail}">${fallbackEmail}</a>`;

    if (form.action.includes("YOUR_FORM_ID")) {
      showError(
        `Online submissions aren't available yet. Please email us directly at ${emailLink} and we'll get back to you shortly.`
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      console.error("Form submission error:", error);
      showError(`Something went wrong sending your inquiry. Please try again, or email us at ${emailLink}.`);
    } finally {
      setLoading(false);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
      form.elements.name.focus();
    });
  }
});
