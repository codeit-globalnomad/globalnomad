'use client';

import { useEffect } from 'react';

export const useIntersectionObserver = (setCurrentTab: (tabId: string) => void) => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50% 0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setCurrentTab(id);
          }
        }
      });
    }, observerOptions);

    const descriptionEl = document.getElementById('description');
    const locationEl = document.getElementById('location');
    const reviewsEl = document.getElementById('reviews');

    if (descriptionEl) observer.observe(descriptionEl);
    if (locationEl) observer.observe(locationEl);
    if (reviewsEl) observer.observe(reviewsEl);

    return () => {
      if (descriptionEl) observer.unobserve(descriptionEl);
      if (locationEl) observer.unobserve(locationEl);
      if (reviewsEl) observer.unobserve(reviewsEl);
    };
  }, [setCurrentTab]);
};
