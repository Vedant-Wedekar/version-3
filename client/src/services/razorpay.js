// Lazily loads the Razorpay checkout script. Razorpay needs a real DOM script
// (their `window.Razorpay` global comes from this); npm has no equivalent SDK.

let scriptLoaded = false;
let scriptPromise = null;

export function loadRazorpay() {
  if (scriptLoaded) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => {
      scriptLoaded = true;
      resolve(true);
    };
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  return scriptPromise;
}