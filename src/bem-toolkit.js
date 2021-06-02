"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.BEMNodes = exports.BEMNodeList = void 0;
var classlist_1 = require("./classlist");
var bem_nodes_1 = require("./bem-nodes");
exports.BEMNodes = bem_nodes_1["default"];
var bem_nodelist_1 = require("./bem-nodelist");
exports.BEMNodeList = bem_nodelist_1["default"];
/**
 * Returns the BEM block name of an element
 *
 * @param blockNameNeedle Try to find a class with this block name
 */
Element.prototype.getBEMBlockName = function getBEMBlockName(blockNameNeedle) {
    var classList = new classlist_1["default"](this);
    if (typeof classList === 'undefined' || !(classList.length > 0))
        return undefined;
    if (blockNameNeedle) {
        /**
         * If blockNameNeedle is given, find first class that has that blockname and return that as the block name
         */
        for (var index = 0; index < classList.length; index++) {
            var elClass = classList[index];
            var blockName = elClass.split('__')[0];
            if (blockName === blockNameNeedle)
                return blockName;
        }
        return undefined;
    }
    return classList[0].split('--')[0].split('__')[0];
};
/**
 * Returns the BEM element name of an element
 */
Element.prototype.getBEMElementName = function getBEMElementName(requiredBlockName) {
    var element = this;
    var classList = new classlist_1["default"](this);
    if (typeof classList === 'undefined' || !(classList.length > 0) || element.getBEMBlockName() === null)
        return null;
    var elementClass = element.classList[0];
    if (requiredBlockName) {
        /**
         * If requiredBlockName is given, find first class that has that blockname and return that element
         */
        for (var index = 0; index < element.classList.length; index++) {
            var elClass = element.classList[index];
            var blockName = elClass.split('__')[0];
            if (blockName === requiredBlockName) {
                elementClass = elClass;
                break;
            }
        }
    }
    try {
        return elementClass.split(element.getBEMBlockName(requiredBlockName) + "__")[1].split('--')[0];
    }
    catch (_) {
        return null;
    }
};
/**
 * Returns an array of BEM modifiers on an element
 */
Element.prototype.getBEMModifiers = function getBEMModifiers(requiredBlockName) {
    var classList = new classlist_1["default"](this);
    var element = this;
    if (typeof classList === 'undefined' || !(classList.length > 0))
        return null;
    var blockName = requiredBlockName || element.getBEMBlockName();
    var elementName = element.getBEMElementName(blockName);
    var classPrefix = elementName ? blockName + "__" + elementName + "--" : blockName + "--";
    var accumulator = [];
    for (var i = 0; i < classList.length; i += 1) {
        var classItem = classList[i];
        if (classItem.indexOf(classPrefix) > -1) {
            var modifier = classItem.split(classPrefix)[1];
            if (modifier && modifier !== '')
                accumulator.push(modifier);
        }
    }
    return accumulator;
};
/**
 * Adds a BEM modifier
 */
Element.prototype.addBEMModifier = function addBEMModifier(modifier, requiredBlockName) {
    var classList = new classlist_1["default"](this);
    var element = this;
    var blockName = requiredBlockName ? requiredBlockName : element.getBEMBlockName();
    var elementName = element.getBEMElementName();
    var classPrefix = elementName ? blockName + "__" + elementName : "" + blockName;
    classList.add(classPrefix + "--" + modifier);
};
/**
 * Removes a BEM modifier
 */
Element.prototype.removeBEMModifier = function removeBEMModifier(modifier, requiredBlockName) {
    var classList = new classlist_1["default"](this);
    var element = this;
    var blockName = requiredBlockName ? requiredBlockName : element.getBEMBlockName();
    var elementName = element.getBEMElementName();
    var classPrefix = elementName ? blockName + "__" + elementName : "" + blockName;
    classList.remove(classPrefix + "--" + modifier);
};
/**
 * Returns whether an element has a specific BEM Modifier enabled
 */
Element.prototype.hasBEMModifier = function hasBEMModifier(modifier, requiredBlockName) {
    return this.getBEMModifiers(requiredBlockName).indexOf(modifier) > -1;
};
/**
 * Toggles a BEM modifier on or off
 */
Element.prototype.toggleBEMModifier = function toggleBEMModifier(modifier, force, requiredBlockName) {
    var classList = new classlist_1["default"](this);
    var element = this;
    var blockName = requiredBlockName ? requiredBlockName : this.getBEMBlockName();
    var elementName = element.getBEMElementName();
    var classPrefix = elementName ? blockName + "__" + elementName : "" + blockName;
    var modifierClass = classPrefix + "--" + modifier;
    if (force === true) {
        classList.add(modifierClass);
    }
    else if (force === false) {
        classList.remove(modifierClass);
    }
    else {
        classList.toggle(modifierClass);
    }
};
/**
 * Finds oldest ancestor that belongs to the block
 */
Element.prototype.getBEMBlockRoot = function getBEMBlockRoot(requiredBlockName) {
    var element = this;
    var blockName = requiredBlockName ? requiredBlockName : element.getBEMBlockName();
    var highest = element;
    var el = this;
    while (el.parentNode) {
        el = el.parentNode;
        if (typeof el.getBEMBlockName !== 'undefined' && el.getBEMBlockName() === blockName)
            highest = el;
    }
    return highest;
};
/**
 * Returns a BEMNodes element with it's base in the Element
 */
Element.prototype.getNodes = function getNodes(mustInclude, requiredBlockName) {
    return new bem_nodes_1["default"](this, { mustInclude: mustInclude, blockName: requiredBlockName });
};
/**
 * Find elements within the block of an Element that match elementName and modifierName
 *
 * If the findRoot variable is set look up the DOM tree to find the oldest ancestor that belongs to the block,
 * and start looking from there
 */
Element.prototype.findBEM = function findBEM(elementName, modifierName, findRoot, requiredBlockName) {
    if (findRoot === void 0) { findRoot = false; }
    var element = findRoot === true ? this.getBEMBlockRoot() : this;
    var rootElementMatches = element.getBEMElementName() === elementName;
    var rootModifierMatches = element.hasBEMModifier(modifierName);
    var blockName = requiredBlockName ? requiredBlockName : element.getBEMBlockName();
    var className = modifierName ? blockName + "__" + elementName + "--" + modifierName : blockName + "__" + elementName;
    var nodeList = new (bem_nodelist_1["default"].bind.apply(bem_nodelist_1["default"], __spreadArray([void 0], element.querySelectorAll("." + className))))();
    if ((typeof modifierName !== 'undefined' && rootElementMatches && rootModifierMatches) ||
        (typeof modifierName === 'undefined' && rootElementMatches))
        nodeList.push(element);
    if (nodeList.length === 0)
        return undefined;
    return nodeList;
};
