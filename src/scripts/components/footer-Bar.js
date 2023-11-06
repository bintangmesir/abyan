class FooterBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
          <p tabindex="0">copyright © Muhammad Abyan Shidqi - 2023 - Restaurant Finder</p>
        </footer>    
    `;
  }
}
customElements.define('footer-bar', FooterBar);
