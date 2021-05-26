import ClassList from "./bem-toolkit.classlist";
import BEMNodes from "./bem-toolkit.bem-nodes";
import BEMNodeList from "./bem-toolkit.bem-nodelist";

declare global {
  interface Element {
    getBEMBlockName(blockNameNeedle?: string): string;
    getBEMElementName(blockNameNeedle?: string): string;
    getBEMModifiers(): string[];
    addBEMModifier(modifier: string): void;
    removeBEMModifier(modifier: string): void;
    hasBEMModifier(modifier: string): boolean;
    toggleBEMModifier(modifier: string, force?: boolean): void;
    getBEMBlockRoot(): Element;
    getNodes(): BEMNodes;
    findBEM(
      elementName: string,
      modifierName?: string,
      findRoot?: boolean
    ): BEMNodeList;
  }
}

/**
 * Returns the BEM block name of an element
 *
 * @param blockNameNeedle Try to find a class with this block name
 */
Element.prototype.getBEMBlockName = function getBEMBlockName(
  blockNameNeedle?: string
): string {
  const classList = new ClassList(this);

  if (typeof classList === "undefined" || !(classList.length > 0))
    return undefined;

  if (blockNameNeedle) {
    /**
     * If blockNameNeedle is given, find first class that has that blockname and return that as the block name
     */
    for (let index = 0; index < classList.length; index++) {
      const elClass = classList[index];
      const blockName = elClass.split("__")[0];
      if (blockName === blockNameNeedle) return blockName;
    }
  }

  return classList[0].split("--")[0].split("__")[0];
};

/**
 * Returns the BEM element name of an element
 */
Element.prototype.getBEMElementName = function getBEMElementName(
  blockNameNeedle?: string
): string {
  const element = this as Element;
  const classList = new ClassList(this);

  if (
    typeof classList === "undefined" ||
    !(classList.length > 0) ||
    element.getBEMBlockName() === null
  )
    return null;

  let elementClass = element.classList[0];

  if (blockNameNeedle) {
    /**
     * If blockNameNeedle is given, find first class that has that blockname and return that element
     */
    for (let index = 0; index < element.classList.length; index++) {
      const elClass = element.classList[index];
      const blockName = elClass.split("__")[0];
      if (blockName === blockNameNeedle) {
        elementClass = elClass;
        break;
      }
    }
  }

  try {
    return elementClass
      .split(`${element.getBEMBlockName(blockNameNeedle)}__`)[1]
      .split("--")[0];
  } catch (_) {
    return null;
  }
};

/**
 * Returns an array of BEM modifiers on an element
 */
Element.prototype.getBEMModifiers = function getBEMModifiers(): string[] {
  const classList = new ClassList(this);
  const element = this as Element;

  if (typeof classList === "undefined" || !(classList.length > 0)) return null;
  const blockName = element.getBEMBlockName();
  const elementName = element.getBEMElementName();
  const classPrefix = elementName
    ? `${blockName}__${elementName}--`
    : `${blockName}--`;
  const accumulator = [];
  for (let i = 0; i < classList.length; i += 1) {
    const classItem = classList[i];
    if (classItem.indexOf(classPrefix) > -1) {
      const modifier = classItem.split(classPrefix)[1];
      if (modifier && modifier !== "") accumulator.push(modifier);
    }
  }
  return accumulator;
};

/**
 * Adds a BEM modifier
 */
Element.prototype.addBEMModifier = function addBEMModifier(
  modifier: string
): void {
  const classList = new ClassList(this);
  const element = this as Element;

  const blockName = element.getBEMBlockName();
  const elementName = element.getBEMElementName();
  const classPrefix = elementName
    ? `${blockName}__${elementName}`
    : `${blockName}`;

  classList.add(`${classPrefix}--${modifier}`);
};

/**
 * Removes a BEM modifier
 */
Element.prototype.removeBEMModifier = function removeBEMModifier(
  modifier: string
): void {
  const classList = new ClassList(this);
  const element = this as Element;

  const blockName = element.getBEMBlockName();
  const elementName = element.getBEMElementName();
  const classPrefix = elementName
    ? `${blockName}__${elementName}`
    : `${blockName}`;

  classList.remove(`${classPrefix}--${modifier}`);
};

/**
 * Returns whether an element has a specific BEM Modifier enabled
 */
Element.prototype.hasBEMModifier = function hasBEMModifier(
  modifier: string
): boolean {
  return (this as Element).getBEMModifiers().indexOf(modifier) > -1;
};

/**
 * Toggles a BEM modifier on or off
 */
Element.prototype.toggleBEMModifier = function toggleBEMModifier(
  modifier: string,
  force?: boolean
): void {
  const classList = new ClassList(this);
  const element = this as Element;

  const blockName = (this as Element).getBEMBlockName();
  const elementName = element.getBEMElementName();
  const classPrefix = elementName
    ? `${blockName}__${elementName}`
    : `${blockName}`;

  const modifierClass = `${classPrefix}--${modifier}`;
  if (force === true) {
    classList.add(modifierClass);
  } else if (force === false) {
    classList.remove(modifierClass);
  } else {
    classList.toggle(modifierClass);
  }
};

/**
 * Finds oldest ancestor that belongs to the block
 */
Element.prototype.getBEMBlockRoot = function getBEMBlockRoot(): Element {
  const element = this as Element;

  const block = element.getBEMBlockName();
  let highest = element;

  let el = this as Element;
  while (el.parentNode) {
    el = el.parentNode as Element;
    if (
      typeof el.getBEMBlockName !== "undefined" &&
      el.getBEMBlockName() === block
    )
      highest = el;
  }
  return highest;
};

/**
 * Returns a BEMNodes element with it's base in the Element
 */
Element.prototype.getNodes = function getNodes(
  mustInclude?: string[]
): BEMNodes {
  return new BEMNodes(this, mustInclude);
};

/**
 * Find elements within the block of an Element that match elementName and modifierName
 *
 * If the findRoot variable is set look up the DOM tree to find the oldest ancestor that belongs to the block,
 * and start looking from there
 */
Element.prototype.findBEM = function findBEM(
  elementName: string,
  modifierName?: string,
  findRoot = false
): BEMNodeList {
  const element =
    findRoot === true ? (this as Element).getBEMBlockRoot() : (this as Element);

  const rootElementMatches = element.getBEMElementName() === elementName;
  const rootModifierMatches = element.hasBEMModifier(modifierName);

  const block = element.getBEMBlockName();
  const className = modifierName
    ? `${block}__${elementName}--${modifierName}`
    : `${block}__${elementName}`;
  const nodeList = new BEMNodeList(
    ...(<Element[]>(<any>element.querySelectorAll(`.${className}`)))
  );

  if (
    (typeof modifierName !== "undefined" &&
      rootElementMatches &&
      rootModifierMatches) ||
    (typeof modifierName === "undefined" && rootElementMatches)
  )
    nodeList.push(element as Element);

  if (nodeList.length === 0) return undefined;
  return nodeList;
};

export { BEMNodeList, BEMNodes };
