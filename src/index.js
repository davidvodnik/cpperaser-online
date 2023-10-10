import './prism.js'
import Module from '../cpperaser/build/src/cpperaser.js'

window.update = function update(text) {
  let result_element = document.querySelector('#highlighting-content')
  // Handle final newlines (see article)
  if (text[text.length - 1] == '\n') {
    // If the last character is a newline character
    text += ' ' // Add a placeholder space character to the final line
  }

  if (cpperaser != null) {
    let code = cpperaser.generate_interface(text)
    let output_element = document.querySelector('#result code')
    // Update code
    output_element.innerHTML = code
      .replace(new RegExp('&', 'g'), '&')
      .replace(new RegExp('<', 'g'), '<')
    // Syntax Highlight
    Prism.highlightElement(output_element)
  }

  // Update code
  result_element.innerHTML = text
    .replace(new RegExp('&', 'g'), '&')
    .replace(new RegExp('<', 'g'), '<')
  // Syntax Highlight
  Prism.highlightElement(result_element)
}

window.sync_scroll = function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector('#highlighting')
  // Get and set x and y
  result_element.scrollTop = element.scrollTop
  result_element.scrollLeft = element.scrollLeft
}

window.check_tab = function check_tab(element, event) {
  let code = element.value
  if (event.key == 'Tab') {
    /* Tab key pressed */
    event.preventDefault() // stop normal
    let before_tab = code.slice(0, element.selectionStart) // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length) // text after tab
    let cursor_pos = element.selectionEnd + 1 // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + '  ' + after_tab // add spaces
    // move cursor
    element.selectionStart = cursor_pos
    element.selectionEnd = cursor_pos
    update(element.value) // Update text to include indent
  }
}

var initial = 'struct Drawable {\n  void draw();\n};'
document.querySelector('#editing').value = 'struct Drawable {'
document.querySelector('#editing').value += '\n  void draw();'
document.querySelector('#editing').value += '\n};'
update(initial)

var cpperaser = null

Module().then((m) => {
  cpperaser = m
  update(initial)
})
