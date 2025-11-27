"use client";

import { useEffect, useRef, useState } from "react";

export function SplineBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check reduced motion preference immediately (synchronously)
    if (typeof window === "undefined") return;

    const checkMotionPreference = () => {
      try {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        return mediaQuery.matches;
      } catch {
        return false;
      }
    };

    // Check current theme - multiple methods for reliability
    const checkTheme = () => {
      // Method 1: Check DOM class
      if (document.documentElement.classList.contains('dark')) {
        return true;
      }
      // Method 2: Check localStorage as fallback
      try {
        const stored = localStorage.getItem('theme');
        return stored === 'dark';
      } catch {
        return false;
      }
    };

    // Update theme state
    const updateTheme = () => {
      setIsDark(checkTheme());
    };

    // Initialize theme state
    updateTheme();

    // Only load if user doesn't prefer reduced motion
    const prefersReducedMotion = checkMotionPreference();
    
    if (!prefersReducedMotion) {
      // Load immediately - no delays, no observers
      setShouldLoad(true);
    }

    // Method 1: Listen for DOM changes via MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Method 2: Listen for custom theme change event (dispatched by ThemeToggle)
    const handleThemeChange = (e: CustomEvent) => {
      const newTheme = e.detail?.theme === 'dark';
      setIsDark(newTheme);
    };

    window.addEventListener('themechange', handleThemeChange as EventListener);

    // Method 3: Poll for changes as a fallback (catches any missed updates)
    const pollInterval = setInterval(() => {
      const currentTheme = checkTheme();
      setIsDark((prev) => {
        if (prev !== currentTheme) {
          return currentTheme;
        }
        return prev;
      });
    }, 250);

    // Optional: Listen for reduced motion changes
    const cleanup = () => {
      observer.disconnect();
      window.removeEventListener('themechange', handleThemeChange as EventListener);
      clearInterval(pollInterval);
    };

    try {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handleChange = (e: MediaQueryListEvent) => {
        setShouldLoad(!e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        cleanup();
      };
    } catch {
      return cleanup;
    }
  }, []);

  // Handle iframe load errors
  const handleIframeError = () => {
    setHasError(true);
  };

  // Spline URLs for light and dark modes
  const lightModeUrl = "https://my.spline.design/sphereofparticles-TLHDcVdMs6593ycCIR9ZEwJf/";
  const darkModeUrl = "https://my.spline.design/darkmodecubes-E5jULNFP7Y2HivdqmvoLnI4z/";

  // Use isDark state directly - React will handle re-render
  const splineUrl = isDark ? darkModeUrl : lightModeUrl;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ 
        zIndex: 0,
        // Remove pointer-events-none to allow interaction with Spline
      }}
      aria-hidden="true"
    >
      {shouldLoad && !hasError && (
        <iframe
          key={`spline-${isDark ? 'dark' : 'light'}`}
          src={splineUrl}
          frameBorder="0"
          className="absolute inset-0 w-full h-full border-0"
          style={{ 
            transform: 'scale(1.1)', 
            transformOrigin: 'center center',
            minWidth: '100%',
            minHeight: '100%',
          }}
          loading="eager"
          allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope; camera; microphone"
          allowFullScreen
          onError={handleIframeError}
          title="3D Interactive Cubes Background"
        />
      )}

      {/* Stripe pattern overlay - visible in light mode only */}
      {!isDark && (
        <div 
          className="absolute inset-0"
          style={{ 
            pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0, 0, 0, 0.04) 60px, rgba(0, 0, 0, 0.04) 62px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Gradient overlay to keep text readable - dark mode only */}
      {isDark && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-black/40" 
          style={{ pointerEvents: 'none' }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default SplineBackground;
