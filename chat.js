// Live chat widget: Tawk.to live chat + WhatsApp.
// To turn on Tawk.to, paste your IDs from tawk.to (Administration → Chat Widget):
// the embed link looks like https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
const CHAT_CONFIG = {
  whatsappNumber: "923003407860",
  tawkPropertyId: "",
  tawkWidgetId: "",
};

(function () {
  const tawkEnabled = CHAT_CONFIG.tawkPropertyId && CHAT_CONFIG.tawkWidgetId;

  const launcher = document.createElement("button");
  launcher.className = "chat-launcher";
  launcher.setAttribute("aria-label", "Open live chat");
  launcher.setAttribute("aria-expanded", "false");
  launcher.innerHTML = `
    <svg class="chat-icon-open" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z" fill="currentColor"/></svg>
    <svg class="chat-icon-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
    <span class="chat-dot" aria-hidden="true"></span>`;

  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Live chat");
  panel.innerHTML = `
    <div class="chat-header">
      <div class="chat-avatar">SA</div>
      <div>
        <div class="chat-name">Sajjad Ali</div>
        <div class="chat-status"><span class="chat-dot-inline"></span>Online</div>
      </div>
    </div>
    <div class="chat-body">
      <div class="chat-bubble">
        <strong>We are live and ready to chat with you now.</strong><br>
        Say something to start a live chat.
      </div>
    </div>
    <form class="chat-form">
      <textarea class="chat-input" rows="2" placeholder="Type your message…" aria-label="Your message" required></textarea>
      <div class="chat-actions">
        ${tawkEnabled ? `<button type="button" class="chat-btn chat-btn-live">💬 Start live chat</button>` : ""}
        <button type="submit" class="chat-btn chat-btn-wa">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/></svg>
          Chat on WhatsApp
        </button>
      </div>
    </form>`;

  document.body.append(panel, launcher);

  const input = panel.querySelector(".chat-input");
  const setOpen = open => {
    panel.classList.toggle("open", open);
    launcher.classList.toggle("open", open);
    launcher.setAttribute("aria-expanded", open);
    if (open) setTimeout(() => input.focus(), 150);
  };
  launcher.addEventListener("click", () => setOpen(!panel.classList.contains("open")));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });

  // WhatsApp: open a chat with the visitor's message already typed
  panel.querySelector(".chat-form").addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim() || "Hi Sajjad, I visited your portfolio and would like to chat.";
    window.open(`https://wa.me/${CHAT_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    input.value = "";
    setOpen(false);
  });

  // Enter sends, Shift+Enter adds a new line
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      panel.querySelector(".chat-form").requestSubmit();
    }
  });

  if (!tawkEnabled) return;

  // Tawk.to: load it hidden, and only show its window when the visitor picks live chat
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  Tawk_API.onLoad = () => Tawk_API.hideWidget();
  Tawk_API.onChatMinimized = () => Tawk_API.hideWidget();

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://embed.tawk.to/${CHAT_CONFIG.tawkPropertyId}/${CHAT_CONFIG.tawkWidgetId}`;
  s.charset = "UTF-8";
  s.setAttribute("crossorigin", "*");
  document.body.appendChild(s);

  panel.querySelector(".chat-btn-live").addEventListener("click", () => {
    if (!Tawk_API.maximize) return; // still loading
    setOpen(false);
    Tawk_API.showWidget();
    Tawk_API.maximize();
  });
})();
