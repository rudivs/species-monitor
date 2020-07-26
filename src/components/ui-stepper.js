/* MIT LICENSE

Copyright (c) 2018 Ed Babcock, Rudi von Staden

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

import WebComponent from "../core/webcomponent.js"
import "/web_modules/@polymer/paper-button/paper-button.js"

const template = (count) => `
<custom-style>
    <style>
      :host {
        display: block;
        @apply --ui-stepper;

        --paper-button: {
          border: var(--ui-stepper-border, 1px solid black);
        }
      }

      paper-button {
        border-radius: 50%;
        min-width: 2.5em;
        border-width: 1px;
      }

      [disabled] {
        --paper-button: {
          @apply --ui-stepper-disabled;
        }
      }

      paper-button:focus {
        box-shadow: var(--ui-stepper-outline, 0 2px 2px black);
      }

      span {
        margin: 0 1em;
      }
    </style>
</custom-style>

<paper-button id="dec">-</paper-button>
<span id="count">${count}</span>
<paper-button id="inc">+</paper-button>
`

    /**
    * `ui-stepper`
    * A basic counter to increment and decrement an integer. It uses a paper-button under the hood
    * for a ripple animation.
    *
    * When min is set, the button will disable when it hits that limit.
    *
    *
    * The following custom properties and mixins are also available for styling:
    *
    * Custom property | Description | Default
    * ----------------|-------------|----------
    * --ui-stepper | Mixin applied to the counter | `{}`
    * --ui-stepper-border | Border style for min and max buttons | `black`
    * --ui-stepper-disabled | Mixin applied to the disabled button |  `{}`
    * --ui-stepper-outline | Outline style for focused min and max buttons | `0 0 2px 2px black`
    */
    class UIStepper extends WebComponent {
        static get is() { 
            return 'ui-stepper'; 
        }

        get count() {
            return this._count;
        }

        init() {
            this._count = 0;
        }

        render() {
            this._shadow.innerHTML = template(this._count);
            this.$dec = this._shadow.getElementById("dec");
            this.$inc = this._shadow.getElementById("inc");
            this.$count = this._shadow.getElementById("count");
            this.$inc.onclick = () => {
                let oldVal = this._count;
                this._count += 1;
                this.$count.innerHTML = this._count;
                this._setDisabled(this._count, oldVal);
            }
            this.$dec.onclick = () => {
                if (this._count - 1 >= 0)
                {
                    let oldVal = this._count;
                    this._count -= 1;
                    this.$count.innerHTML = this._count;
                    this._setDisabled(this._count, oldVal);
                }
            }
            this._setDisabled(this._count, undefined);
        }

        _setDisabled(newVal, oldVal) {
            if (newVal === 0 &&
                (oldVal !== 0 || oldVal === undefined)) {
                    this.$dec.setAttribute('disabled', true);
            } else if (newVal !== 0 && oldVal === 0) {
                this.$dec.removeAttribute('disabled');
            }
        }
  }

  customElements.define(UIStepper.is, UIStepper);
