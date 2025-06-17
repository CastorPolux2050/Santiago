const fs = require('fs');

// Helper to stub matchMedia
beforeEach(() => {
  document.body.innerHTML = `
    <button id="darkModeToggle" aria-label="Alternar modo oscuro/claro"></button>
    <nav><a href="#section1">Link</a></nav>
    <section id="section1"></section>
  `;
  localStorage.clear();
  window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {}
  });

  jest.resetModules();
  require('./script');
  document.dispatchEvent(new Event('DOMContentLoaded'));
});

describe('dark mode toggle', () => {
  test('toggles class and label', () => {
    const button = document.getElementById('darkModeToggle');
    const body = document.body;

    // initial state
    expect(body.classList.contains('dark-mode')).toBe(false);
    expect(button.textContent).toBe('🌙');
    expect(button.getAttribute('aria-label')).toBe('Alternar a modo oscuro');

    // first click activates dark mode
    button.click();
    expect(body.classList.contains('dark-mode')).toBe(true);
    expect(button.textContent).toBe('☀️');
    expect(button.getAttribute('aria-label')).toBe('Alternar a modo claro');

    // second click restores light mode
    button.click();
    expect(body.classList.contains('dark-mode')).toBe(false);
    expect(button.textContent).toBe('🌙');
    expect(button.getAttribute('aria-label')).toBe('Alternar a modo oscuro');
  });
});
