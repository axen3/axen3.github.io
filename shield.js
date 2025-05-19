// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Right-click is disabled for security reasons.');
});

// Disable common developer tools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
document.addEventListener('keydown', function(e) {
    // Disable F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+U (view source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
});

// Attempt to block console access by overriding console methods
(function() {
    const consoleMethods = ['log', 'info', 'warn', 'error', 'debug', 'table', 'trace'];
    consoleMethods.forEach(method => {
        console[method] = function() {
            // Optionally show a message or do nothing
            // alert('Console access is restricted.');
        };
    });
})();

// Detect if DevTools is open (approximation, not foolproof)
(function detectDevTools() {
    let devtoolsOpen = false;
    const threshold = 160; // Approximate width/height change when DevTools opens

    const checkDevTools = function() {
        if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        ) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                alert('Developer Tools are open. This is not allowed.');
                // Optionally, redirect or take other action
                // window.location.href = 'about:blank';
            }
        } else {
            devtoolsOpen = false;
        }
    };

    setInterval(checkDevTools, 1000); // Check every second
})();

// Prevent source code viewing by redirecting Ctrl+U or direct access attempts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        document.body.innerHTML = ''; // Clear content
        alert('Viewing source code is disabled.');
    }
});

// Attempt to prevent direct source code access (not foolproof)
(function() {
    if (document.location.protocol === 'view-source:') {
        window.location.href = 'about:blank';
    }
})();