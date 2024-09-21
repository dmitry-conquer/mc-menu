import '../styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  class MobileMenuClass {
    private openButton: HTMLButtonElement | null;
    private closeButton: HTMLButtonElement | null;
    private menu: HTMLElement | null;
    private menuLinks: NodeListOf<HTMLElement>;
    constructor() {
      this.openButton = document.querySelector('.mobile-button-open');
      this.closeButton = document.querySelector('.mobile-button-close');
      this.menu = document.querySelector('.mobile-body');
      this.menuLinks = document.querySelectorAll('.item-mobile-menu__link_next');
    }
    public init = (): void => {
      if (!this.openButton || !this.closeButton || !this.menu) {
        console.warn('One or more required elements not found!');
        return;
      }
      this.initButtonsListeners();
      this.initLinksListeners();
    };
    private toggle = (): void => {
      this.menu?.classList.toggle('is-open');
      this.openButton?.classList.toggle('is-open');
      this.closeButton?.classList.toggle('is-open');
      document.body.classList.toggle('is-menu-open');
    };
    private initButtonsListeners = (): void => {
      this.openButton?.addEventListener('click', this.toggle);
      this.closeButton?.addEventListener('click', this.toggle);
    };

    private closeNoTargetItems = (e: Event): void => {
      const target = e.target as HTMLElement;
      this.menuLinks.forEach(link => {
        const submenu = link.nextElementSibling as HTMLElement;
        if (submenu?.classList.contains('is-open') && link !== target) {
          submenu?.classList.remove('is-open');
          link?.classList.remove('is-open');
          submenu.style.maxHeight = '';
        }
      });
    };
    private toggleSubmenus = (e: Event): void => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const submenu = target.nextElementSibling as HTMLElement;
      this.closeNoTargetItems(e);
      if (submenu) {
        target.classList.toggle('is-open');
        submenu.classList.toggle('is-open');
        requestAnimationFrame(() => {
          submenu.style.maxHeight = submenu.style.maxHeight === '' ? `${submenu.scrollHeight}px` : '';
        });
      }
    };

    private initLinksListeners = (): void => {
      this.menuLinks.forEach(link => {
        link.addEventListener('click', this.toggleSubmenus);
      });
    };
  }

  const mobileMenu = new MobileMenuClass();
  mobileMenu.init();
});
