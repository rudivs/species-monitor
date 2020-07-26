/* MIT License

Copyright (c) 2020 Toby Kurien

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */



export default class WebComponent extends HTMLElement {
    constructor() {
        super()
        this._shadow = this.attachShadow({ mode: "open" })
        this.init()
    }

    /**
     * Called when your component is attached to the DOM.
     * By default, this calls the render() method, You should 
     * not normally need to override this.
     */
    connectedCallback() {
        this.render()
    }

    /**
     * Initialize and reset your state. The default reset() method
     * uses this to reset the state and re-render your component.
     */
    init() { }

    /**
     * Render the component. You can create a DOM tree and attach 
     * it to the `shadow` property, or set the HTML string into 
     * the `shadow.innerHTML` property.
     */
    render() { }

    /**
     * Reset the component. By default, calls `init()` and `render()`.
     */
    reset() {
        this.init()
        this.render()
    }

    /**
     * Update the component's UI with the current state. Call this 
     * method after making state changes. By default, it calls the 
     * `render()` method, but you can override this to do more efficient
     * updates, since `render()` will tear down and re-create the component DOM
     */
    update() {
        this.render()
    }
}
