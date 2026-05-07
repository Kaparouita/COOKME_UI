export function loadGoogleMaps(apiKey: string): Promise<typeof google.maps> {
  return new Promise((resolve, reject) => {
    if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
      resolve(window.google.maps);
      return;
    }

    const callbackName = `__googleMapsInit_${Date.now()}`;
    (window as any)[callbackName] = () => {
      resolve(window.google.maps);
      delete (window as any)[callbackName];
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
