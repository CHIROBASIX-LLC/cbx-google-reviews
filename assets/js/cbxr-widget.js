/**
 * CHIROBASIX Google Reviews Widget - Frontend Widget
 */
(function () {
	'use strict';

	var widget  = document.getElementById('cbxr-widget');
	var badge   = document.getElementById('cbxr-badge');
	var panel   = document.getElementById('cbxr-panel');
	var close   = document.getElementById('cbxr-close');
	var overlay = document.getElementById('cbxr-overlay');

	if (!widget || !badge || !panel) return;

	// The widget is positioned/hidden via inline style attributes (see render()), so it survives
	// WP Rocket "Remove Unused CSS" — which strips the stylesheet's `.cbxr-open` rule and would
	// otherwise leave the panel stuck off-canvas. Drive open/close through those same inline styles.
	var hiddenTransform = widget.classList.contains('cbxr-pos-right') ? 'translateX(101%)' : 'translateX(-101%)';

	function openPanel() {
		widget.classList.add('cbxr-open');
		panel.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		panel.style.transform = 'translateX(0)';
		if (overlay) { overlay.style.opacity = '1'; overlay.style.pointerEvents = 'auto'; }
	}

	function closePanel() {
		widget.classList.remove('cbxr-open');
		panel.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		panel.style.transform = hiddenTransform;
		if (overlay) { overlay.style.opacity = '0'; overlay.style.pointerEvents = 'none'; }
	}

	badge.addEventListener('click', openPanel);
	close.addEventListener('click', closePanel);
	overlay.addEventListener('click', closePanel);

	// Escape key
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && widget.classList.contains('cbxr-open')) {
			closePanel();
		}
	});

	// Read more toggles
	var readMoreBtns = widget.querySelectorAll('.cbxr-read-more');
	readMoreBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			var textEl = btn.previousElementSibling;
			if (textEl && textEl.classList.contains('cbxr-review-text')) {
				var isExpanded = textEl.classList.toggle('cbxr-expanded');
				btn.textContent = isExpanded ? 'Show less' : 'Read more';
			}
		});
	});
})();
