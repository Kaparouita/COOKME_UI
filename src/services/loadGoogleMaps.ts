export function loadGoogleMaps(apiKey: string): Promise<typeof google.maps> {
  return new Promise((resolve, reject) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
      resolve(window.google.maps);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve(window.google.maps);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
