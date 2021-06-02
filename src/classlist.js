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
 * Workaround for IE11 not supporting classLists properly
 */
var ClassList = /** @class */ (function (_super) {
    __extends(ClassList, _super);
    function ClassList(element) {
        var _this = this;
        var classString = element.getAttribute('class');
        if (classString === null || classString === '') {
            _this = _super.call(this) || this;
            _this.element = element;
            return;
        }
        var classes = classString.split(' ');
        _this = _super.apply(this, classes) || this;
        _this.element = element;
        return _this;
    }
    /**
     * Add a class to the element
     *
     * @param className Name of the class that is added
     */
    ClassList.prototype.add = function (className) {
        var classString = this.element.getAttribute('class') || '';
        var classes = classString.split(' ');
        if (classes.includes(className))
            return;
        this.element.setAttribute('class', classString + " " + className);
    };
    /**
     * Remove a class from the element
     *
     * @param className Name of the class that is removed
     */
    ClassList.prototype.remove = function (className) {
        var classString = this.element.getAttribute('class') || '';
        var classes = classString.split(' ');
        if (!classes.includes(className))
            return;
        var index = classes.indexOf(className);
        classes.splice(index, 1);
        this.element.setAttribute('class', "" + classes.join(' '));
    };
    /**
     *
     * Toggle whether or not a class exists on the element
     * @param className Name of the class that is added or removed
     * @param forceInput Force whether the element should have the class or not
     */
    ClassList.prototype.toggle = function (className, forceInput) {
        var classString = this.element.getAttribute('class') || '';
        var classes = classString.split(' ');
        var force;
        if (typeof forceInput === 'undefined') {
            force = !classes.includes(className);
        }
        else {
            force = forceInput;
        }
        if (force === true)
            this.add(className);
        else
            this.remove(className);
    };
    return ClassList;
}(Array));
exports["default"] = ClassList;
