   if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js', { scope: './' })
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.error('SW failed:', err));
    }


  const form = document.getElementById("myForm");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop reload

    // Show toast
    toast.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  });