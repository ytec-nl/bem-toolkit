"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var bem_nodelist_1 = require("./bem-nodelist");
require("./bem-toolkit");
/**
 * An associative array where the keys are BEM element names and the values are BEMNodeLists
 *
 * Block elements without a BEM element name have the key '$bareBlock'
 */
var BEMNodes = /** @class */ (function () {
    function BEMNodes(target, options) {
        var _this = this;
        var elements = BEMNodes.getElementsFromTarget(target);
        if (!elements)
            return;
        if (options.findGlobal) {
            var blockName = void 0;
            if (typeof target === 'undefined') {
                if (typeof options.blockName === 'undefined') {
                    throw new Error('The option findGlobal required a target to be set or a blockName to be defined');
                }
            }
            else if (target instanceof Element) {
                blockName = target.getBEMBlockName();
            }
            else if (target instanceof NodeList) {
                blockName = target[0].getBEMBlockName();
            }
            BEMNodes.getBlockElements(this, document.body, options.blockName);
        }
        else {
            elements.forEach(function (elementNeedle) {
                var startElement = options.findRoot ? elementNeedle.getBEMBlockRoot() : elementNeedle;
                var blockName = options.blockName ? options.blockName : startElement.getBEMBlockName();
                BEMNodes.getBlockElements(_this, startElement, blockName);
            });
        }
        if (options.mustInclude) {
            if (!BEMNodes.arrayContainsArray(Object.keys(this), options.mustInclude)) {
                throw new Error('Not all required elements were found in the DOM');
            }
        }
    }
    BEMNodes.create = function () {
        return Object.create(BEMNodes.prototype);
    };
    /**
     * Adds an element to the BEMNodes
     *
     * @param key BEM element name that the Element will be added to
     * @param element Element that will be added to the BEMNodes
     */
    BEMNodes.add = function (bemnodesIn, key, element, blockName) {
        var bemnodes = bemnodesIn;
        if (typeof bemnodes[key] === 'undefined') {
            bemnodes[key] = new bem_nodelist_1["default"](element);
            bemnodes[key].blockName = blockName;
        }
        else {
            try {
                bemnodes[key].push(element);
            }
            catch (err) {
                if (typeof bemnodes[key] === 'function') {
                    throw new Error("Could not add element with name '" + key + "' to this BEMNodes, because it is also a BEMNodes method");
                }
                else {
                    throw new Error(err);
                }
            }
        }
        return bemnodes;
    };
    /**
     *  Outputs array of Elements from different inputs
     *
     * @param target Target entrypoint of the BEMNodes
     */
    BEMNodes.getElementsFromTarget = function (target) {
        if (typeof target === 'string') {
            return document.querySelectorAll(target);
        }
        if (target instanceof Element) {
            return [target];
        }
        return target;
    };
    /**
     * Returns a BEMNodes with all BEM elements in a block from a start Element
     *
     * @param accumulator Accumulates BEM block elements in a BEMNodes
     * @param element Current element
     * @param requiredBlockName Elements are ignored if they don't have this block name
     */
    BEMNodes.getBlockElements = function (accumulatorIn, element, requiredBlockName) {
        var _this = this;
        var accumulator = accumulatorIn;
        var elementName = element.getBEMElementName(requiredBlockName);
        var blockName = element.getBEMBlockName(requiredBlockName);
        var elementNameKey;
        if (elementName)
            elementNameKey = elementName.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
        if (elementName && blockName === requiredBlockName) {
            BEMNodes.add(accumulator, elementNameKey, element, blockName);
        }
        else if (blockName === requiredBlockName) {
            BEMNodes.add(accumulator, '$bareBlock', element, blockName);
        }
        if (typeof element.children !== 'undefined') {
            __spreadArray([], element.children).forEach(function (childNode) {
                accumulator = _this.getBlockElements(accumulator, childNode, requiredBlockName);
            });
        }
        return accumulator;
    };
    /**
     * Checks whether every element of an array is inside another array
     */
    BEMNodes.arrayContainsArray = function (superset, subset) {
        if (subset.length === 0) {
            return false;
        }
        return subset.every(function (value) {
            return superset.indexOf(value) >= 0;
        });
    };
    return BEMNodes;
}());
exports["default"] = BEMNodes;
