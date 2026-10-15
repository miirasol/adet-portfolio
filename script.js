// localStorage key for the saved theme
const THEME_KEY = "portfolio-theme";

// Add or remove the "dark" class on <html>
function applyTheme(theme) {
	document.documentElement.classList.toggle("dark", theme === "dark");
}

// Saved theme if any, otherwise the system preference
function getInitialTheme() {
	const saved = localStorage.getItem(THEME_KEY);
	if (saved) return saved;
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

// Apply right away to avoid a white flash
applyTheme(getInitialTheme());

// Switch theme and save the choice
function toggleTheme() {
	const isDark = document.documentElement.classList.contains("dark");
	const next = isDark ? "light" : "dark";
	applyTheme(next);
	localStorage.setItem(THEME_KEY, next);
}

// Open or close the mobile nav and update aria attributes
function toggleMenu(nav, button) {
	const isOpen = nav.classList.toggle("open");
	button.setAttribute("aria-expanded", String(isOpen));
	button.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

// Wait for the HTML before finding elements
document.addEventListener("DOMContentLoaded", function () {
	const themeButton = document.getElementById("theme-toggle");
	const menuButton = document.getElementById("menu-toggle");
	const nav = document.getElementById("site-nav");

	themeButton.addEventListener("click", toggleTheme);

	menuButton.addEventListener("click", function () {
		toggleMenu(nav, menuButton);
	});

	// Close the menu after a link is tapped
	nav.querySelectorAll("a").forEach(function (link) {
		link.addEventListener("click", function () {
			if (nav.classList.contains("open")) {
				toggleMenu(nav, menuButton);
			}
		});
	});
});
