import { LitElement, css, html } from 'lit'
import Module from '../cpperaser/build/src/cpperaser.js'
import './prism.js'
import 'lit-code'

export class DuckCodeEditor extends LitElement {
  static get properties() {
    return {
      code: { type: String },
    }
  }

  constructor() {
    super()
    Module().then((m) => {
      this.cpperaser = m
      this.updateText(this.shadowRoot.querySelector('.left').getCode())
    })
  }

  updateText(code) {
    if (this.cpperaser) {
      this.code = this.cpperaser.generate_interface(code)
    }
  }

  render() {
    return html`
      <div class="editor-grid">
        <lit-code
          class="left"
          linenumbers
          code="struct Drawable {
  void draw();
};"
          language="cpp"
          @update=${({ detail: code }) => this.updateText(code)}
        ></lit-code>
        <lit-code
          code=${this.code}
          linenumbers
          class="right"
          language="cpp"
        ></lit-code>
      </div>
    `
  }

  static get styles() {
    return css`
      .editor-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
      }

      lit-code {
        min-width: 100%;
        width: 100%;
        height: 600px;
        box-sizing: border-box;
        border-radius: 2px;
        border: 2px solid #eee;
      }

      .left {
        height: 120px;
      }

      @media (min-width: 700px) {
        .editor-grid {
          grid-template-columns: 1fr 1fr;
        }

        .left {
          height: 600px;
        }
      }
    `
  }
}

window.customElements.define('cpperaser-editor', DuckCodeEditor)
