import '../styles/style.scss';
// import MobileMenuClass from './mobile.ts';

document.addEventListener('DOMContentLoaded', () => {
  class DeskTopMenuClass {
    private desktopMenu: HTMLElement | null;
    constructor() {
      this.desktopMenu = document.getElementById('desk-menu')!;
    }

    public init = (): void => {
      if (!this.desktopMenu) {
        console.warn('One or more required elements not found!');
        return;
      }
      this.initListeners();
    };
    private closeNoTargetItems = (e: Event): void => {
      const target = e.target as HTMLElement;
      const menuLinks = this.desktopMenu?.querySelectorAll('.next-sub-list')! as NodeListOf<HTMLElement>;
      menuLinks.forEach(link => {
        const submenu = link.nextElementSibling as HTMLElement;
        if (submenu?.classList.contains('is-open') && link !== target) {
          submenu?.classList.remove('is-open');
          link?.classList.remove('is-open');
          submenu.style.maxHeight = '';
        }
      });
    };
    private clickOutside = (e: Event) => {
      const target = e.target as Element;
      if (!target.closest('.desk-nav__item')) {
        const menuLinks = this.desktopMenu?.querySelectorAll('.next-sub-list')! as NodeListOf<HTMLElement>;
        menuLinks.forEach(link => {
          const submenu = link.nextElementSibling as HTMLElement;
          if (submenu?.classList.contains('is-open') && link !== target) {
            submenu?.classList.remove('is-open');
            link?.classList.remove('is-open');
          }
        });
      }
    };
    private toggle = (e: Event) => {
      const target = e.target as Element;
      if (target && target.classList.contains('next-sub-list')) {
        e.preventDefault();
        const submenu = target.nextElementSibling as Element;
        if (submenu) {
          this.closeNoTargetItems(e);
          this.clickOutside(e);
          submenu.classList.toggle('is-open');
          target.classList.toggle('is-open');
        }
      }
    };

    private initListeners = () => {
      this.desktopMenu?.addEventListener('click', this.toggle);
      document.addEventListener('click', this.clickOutside);
    };
  }

  const desktopMenu = new DeskTopMenuClass();
  desktopMenu.init();
});
