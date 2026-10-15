/* Kode4Careers — Consultation inquiry form: validation & async submission (Formspree / Web3Forms) */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("consultation-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn.querySelector(".btn__label");
  const status = document.getElementById("form-status");
  const success = document.getElementById("form-success");
  const resetBtn = document.getElementById("form-reset");
  const honeypot = form.elements._gotcha;
  const subjectField = form.elements._subject;
  const fallbackEmail = form.dataset.fallbackEmail;

  const DEFAULT_LABEL = submitLabel.textContent;
  const LOADING_LABEL = "Sending Inquiry...";
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Client-side throttling only deters casual abuse; Formspree enforces the real limits server-side.
  const MIN_FILL_MS = 3000;
  const COOLDOWN_MS = 60 * 1000;
  const MAX_PER_HOUR = 3;
  const HISTORY_KEY = "k4c-inquiry-history";
  const loadedAt = Date.now();

  const getHistory = () => {
    try {
      const hourAgo = Date.now() - 60 * 60 * 1000;
      return (JSON.parse(localStorage.getItem(HISTORY_KEY)) || []).filter((t) => t > hourAgo);
    } catch {
      return [];
    }
  };

  const recordSubmission = () => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify([...getHistory(), Date.now()]));
    } catch {
      /* Storage unavailable (private mode) */
    }
  };

  const getThrottleMessage = () => {
    const history = getHistory();
    if (history.length >= MAX_PER_HOUR) {
      return "You've reached the submission limit. Please try again later";
    }
    const last = history[history.length - 1];
    if (last && Date.now() - last < COOLDOWN_MS) {
      return "Please wait a minute before sending another inquiry";
    }
    return "";
  };

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
    submitLabel.textContent = loading ? LOADING_LABEL : DEFAULT_LABEL;
  };

  const showError = (html) => {
    status.className = "form-status form-status--error";
    status.innerHTML = html;
  };

  const clearStatus = () => {
    status.className = "form-status";
    status.textContent = "";
  };

  const showSuccess = () => {
    form.reset();
    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      if (field) field.removeAttribute("aria-invalid");
    });
    form.hidden = true;
    success.hidden = false;
    success.focus();
  };

  // e.g. "New consultation inquiry: AI Agent Development — Jane Smith"
  const updateSubject = () => {
    if (!subjectField) return;
    const base = subjectField.dataset.subjectBase || "New consultation inquiry";
    const service = form.elements.service.value;
    const name = form.elements.name.value.trim();
    subjectField.value = `${base}${service ? `: ${service}` : ""}${name ? ` — ${name}` : ""}`;
  };

  // Formspree returns { errors: [{ message }] } on validation failures.
  const getServerError = async (response) => {
    try {
      const data = await response.json();
      if (Array.isArray(data.errors) && data.errors.length) {
        return data.errors.map((err) => err.message).join(" ");
      }
      if (data.message) return data.message;
    } catch {
      /* Non-JSON response body */
    }
    return "";
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
    if (submitBtn.disabled) return;
    clearStatus();

    if (!validateForm()) return;

    // Bots that fill the honeypot or submit instantly get a fake success so they don't retry.
    if ((honeypot && honeypot.value) || Date.now() - loadedAt < MIN_FILL_MS) {
      showSuccess();
      return;
    }

    const emailLink = `<a href="mailto:${fallbackEmail}">${fallbackEmail}</a>`;

    const throttleMessage = getThrottleMessage();
    if (throttleMessage) {
      showError(`${throttleMessage}, or email us directly at ${emailLink}.`);
      return;
    }

    if (form.action.includes("YOUR_FORM_ID")) {
      showError(
        `Online submissions aren't available yet. Please email us directly at ${emailLink} and we'll get back to you shortly.`
      );
      return;
    }

    updateSubject();
    setLoading(true);

    try {
      const response = await fetch(form.action, {
        method: form.method || "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        const serverError = await getServerError(response);
        throw new Error(serverError || `Request failed with status ${response.status}`);
      }

      recordSubmission();
      showSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      showError(
        `<strong>We couldn't send your inquiry.</strong> Please check your connection and try again, or email us directly at ${emailLink}.`
      );
    } finally {
      setLoading(false);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
      clearStatus();
      form.elements.name.focus();
    });
  }
});
