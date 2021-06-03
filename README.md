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

## BEMNodes

BEMNodes(target, options)

### target

### options

element names are transformed from snake-case to camelCase

## BEMNodeList
