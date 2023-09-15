import { LitElement, css, html } from "lit";
import Module from "../cpperaser/build/src/cpperaser.js";
import "./prism.js";
import "lit-code";

export class DuckCodeEditor extends LitElement {
  static get properties() {
    return {
      code: { type: String },
    };
  }

  constructor() {
    super();
    Module().then((m) => {
      this.cpperaser = m;
      this.updateText(this.code);
    });
  }

  generate_interface(name) {
    const output = this.cpperaser._malloc(65536);
    const isValid = this.cpperaser.ccall(
      "parse_interface",
      "number",
      ["string", "number"],
      [name, output],
    );
    var outputString = this.cpperaser.UTF8ToString(output);
    this.cpperaser._free(output);
    return outputString;
  }

  updateText(code) {
    this.code = code;
    if (this.cpperaser) {
      this.code = this.generate_interface(code);
    }
  }

  render() {
    return html`
      <div class="editor-group">
        <lit-code
          linenumbers
          code="struct Drawable {
  void draw();
};"
          @update=${({ detail: code }) => this.updateText(code)}
          language="cpp"
        ></lit-code>
        <lit-code linenumbers language="cpp" code="${this.code}"></lit-code>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1em;
        margin: 1em;
      }

      lit-code {
        border-radius: 8px;
        border: 2px solid #eee;
        height: 800px;
        min-width: 100%;
      }
    `;
  }
}

window.customElements.define("cpperaser-editor", DuckCodeEditor);
