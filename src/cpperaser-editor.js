import { LitElement, css, html } from 'lit'
import './prism.js'
import 'lit-code'

export class DuckCodeEditor extends LitElement {

  render() {
    return html`
      <div class="row">
        <lit-code linenumbers code="struct Drawable {\n  void draw();\n};" language="cpp"></lit-code>
        <lit-code linenumbers language="cpp"></lit-code>
      </div>
    `
  }

  static get styles() {
    return css`
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1em;
        margin: 1em;
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
