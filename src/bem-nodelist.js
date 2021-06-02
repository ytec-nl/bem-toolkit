"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
/**
 * An array of BEM elements with some advanced functions
 */
var BEMNodeList = /** @class */ (function (_super) {
    __extends(BEMNodeList, _super);
    function BEMNodeList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BEMNodeList.create = function () {
        return Object.create(BEMNodeList.prototype);
    };
    Object.defineProperty(BEMNodeList.prototype, "blockName", {
        get: function () {
            return this._blockName;
        },
        set: function (name) {
            if (typeof this._blockName === 'undefined') {
                this._blockName = name;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BEMNodeList.prototype, "innerHTML", {
        /**
         * sets innerHTML for all elements in the BEMNodeList
         */
        set: function (HTML) {
            this.forEach(function (element) {
                element.innerHTML = HTML; // eslint-disable-line no-param-reassign
            });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns a BEMNodelist containing all elements that have a certain BEM modifier
     * @param modifier BEM modifier string
     */
    BEMNodeList.prototype.withModifier = function (modifier) {
        var _this = this;
        var nodes = new BEMNodeList();
        this.forEach(function (element) {
            if (element.getBEMModifiers(_this._blockName).includes(modifier))
                nodes.push(element);
        });
        return nodes;
    };
    /**
     * Adds an event listener to all elements in the BEMNodeList
     * @param type A case-sensitive string representing the event type to listen for.
     * @param listener Callback that is called when the event occurs
     * @param useCapture A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     */
    BEMNodeList.prototype.addEventListener = function (type, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        this.forEach(function (element) {
            element.addEventListener(type, listener, useCapture);
        });
    };
    /**
     * Removes an event listener from all elements in the BEMNodeList
     * @param type A case-sensitive string representing the event type to listen for.
     * @param listener The callback that is to be removed
     * @param useCapture A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     */
    BEMNodeList.prototype.removeEventListener = function (type, listener, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        this.forEach(function (element) {
            element.removeEventListener(type, listener, useCapture);
        });
    };
    /**
     * Toggles a BEM Modifier on or off for all elements of the BEMNodeList
     */
    BEMNodeList.prototype.toggleBEMModifier = function (modifier, force) {
        this.forEach(function (element) {
            element.toggleBEMModifier(modifier, force);
        });
    };
    /**
     * Adds a BEM Modifier for all elements of the BEMNodeList
     */
    BEMNodeList.prototype.addBEMModifier = function (modifier) {
        this.forEach(function (element) {
            element.addBEMModifier(modifier);
        });
    };
    /**
     * Removes a BEM Modifier for all elements of the BEMNodeList
     */
    BEMNodeList.prototype.removeBEMModifier = function (modifier) {
        this.forEach(function (element) {
            element.removeBEMModifier(modifier);
        });
    };
    /**
     * Sets BEM modifier for one element of the BEMNodelist and remove it for the others
     *
     * @param modifier BEM modifier that needs to be set
     * @param index Index of the element that needs the modifier to be added
     */
    BEMNodeList.prototype.setBEMState = function (modifier, targetInput, inverse) {
        var _this = this;
        if (inverse === void 0) { inverse = false; }
        var indexes;
        if (targetInput instanceof Element) {
            indexes = [this.indexOf(targetInput)];
        }
        else if (typeof targetInput === 'number') {
            indexes = [targetInput];
        }
        else {
            indexes = targetInput.map(function (target) {
                if (typeof target === 'number')
                    return target;
                if (target instanceof Element)
                    return _this.indexOf(target);
            });
        }
        this.forEach(function (element, elementIndex) {
            var setModifier = indexes.indexOf(elementIndex) !== -1;
            if (inverse)
                setModifier = !setModifier;
            element.toggleBEMModifier(modifier, setModifier);
        });
    };
    return BEMNodeList;
}(Array));
exports["default"] = BEMNodeList;
