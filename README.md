# Introduction

bem-toolkit is a collection of tools that use the structure that BEM provides so it can be used in Javascript. At it's core the bem-toolkit expands the functionality of HTMLElements and SVGElements.

BEMNodes aims to represent BEM structure in an object. This object has the BEM elements in a BEMNodeList, which adds some simple functionality to the elements.

# Install

```
npm install bem-toolkit --save
```

# Usage

```javascript
import { BEMNodes } from 'bem-toolkit';

const element = document.querySelector('.block');

// Will add a class 'block--modifier' to the element
element.addBEMModifier('modifier');

const blockName = element.getBEMBlockName();

// Returns a BEMNodes object
const nodes = element.getNodes();

// Getting a BEMNodes object using CSS Selectors
const nodes = new BEMNodes('.some-block');

// Getting a BEMNodes object using an element
const element2 = document.querySelector('.some-block');
const nodes2 = new BEMNodes(element);
```

# Documentation

### _Element_.getBEMBlockName([_requiredBlockName_])

Returns the BEM blockname that was deduced from the class list of the element. Returns _undefined_ if no blockname was found.

#### _requiredBlockName_ Required BEM blockname of the returned class.

---

### _Element_.getBEMElementName([_requiredBlockName_])

Returns the BEM Elementname that was deduced from the class list of the element. Returns _undefined_ if no blockname was found.

#### _requiredBlockName_ Required blockname of the returned class.

---

### _Element_.getBEMModifiers([_requiredBlockName_])

Returns an array of strings of all modifiers the deduced element has on this element

#### _requiredBlockName_ Required blockname of the element that has the modifiers

---

## BEMNodes

BEMNodes(target, options)

### target

### options

element names are transformed from snake-case to camelCase

## BEMNodeList
