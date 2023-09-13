import { LitElement, css, html } from 'lit'
import 'lit-code'

export class DuckCodeEditor extends LitElement {

  render() {
    return html`
      <lit-code linenumbers></lit-code>
    `
  }

  static get styles() {
    return css`
      :host {
        width: 100%;
      }

      lit-code {
        border-radius: 8px;
        border: 2px solid #eee;
        height: 500px;
      }

    `
  }
}

window.customElements.define('cpperaser-editor', DuckCodeEditor)
