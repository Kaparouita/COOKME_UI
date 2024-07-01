import { DirectiveBinding } from 'vue';

const vInfiniteScroll = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
};

export default vInfiniteScroll;
