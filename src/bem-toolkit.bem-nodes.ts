import BEMNodeList from './bem-toolkit.bem-nodelist';
import './bem-toolkit';

/**
 * An associative array where the keys are BEM element names and the values are BEMNodeLists
 *
 * Block elements without a BEM element name have the key '$bareBlock'
 */
export default class BEMNodes {
    [key: string]: BEMNodeList;

    public constructor(target?: Element | NodeListOf<Element> | string, mustInclude?: string[], findRoot?: boolean) {
        const elements = BEMNodes.getElementsFromTarget(target);

        if (!elements) return;

        elements.forEach((elementNeedle) => {
            const startElement = findRoot ? elementNeedle.getBEMBlockRoot() : elementNeedle;

            const blockName = startElement.getBEMBlockName();

            BEMNodes.getBlockElements(this, startElement as Element, blockName);
        });

        if (mustInclude) {
            if (!BEMNodes.arrayContainsArray(Object.keys(this), mustInclude)) {
                throw new Error('Not all required elements were found in the DOM');
            }
        }
    }

    public static create<T>(): BEMNodes {
        return Object.create(BEMNodes.prototype) as BEMNodes;
    }

    /**
     * Adds an element to the BEMNodes
     *
     * @param key BEM element name that the Element will be added to
     * @param element Element that will be added to the BEMNodes
     */
    public static add(bemnodesIn: BEMNodes, key: string, element: Element, blockName: string): BEMNodes {
        const bemnodes = bemnodesIn;
        if (typeof bemnodes[key] === 'undefined') {
            bemnodes[key] = new BEMNodeList(element);
            bemnodes[key].blockName = blockName;
        } else {
            try {
                bemnodes[key].push(element);
            } catch (err) {
                if (typeof bemnodes[key] === 'function') {
                    throw new Error(
                        `Could not add element with name '${key}' to this BEMNodes, because it is also a BEMNodes method`
                    );
                } else {
                    throw new Error(err);
                }
            }
        }
        return bemnodes;
    }

    /**
     *  Outputs array of Elements from different inputs
     *
     * @param target Target entrypoint of the BEMNodes
     */
    private static getElementsFromTarget(target: string | Element | NodeListOf<Element>): Element[] {
        if (typeof target === 'string') {
            return document.querySelectorAll(target as string) as unknown as Element[];
        }
        if (target instanceof Element) {
            return [target as Element];
        }

        return target as unknown as Element[];
    }

    /**
     * Returns a BEMNodes with all BEM elements in a block from a start Element
     *
     * @param accumulator Accumulates BEM block elements in a BEMNodes
     * @param element Current element
     * @param requiredBlockName Elements are ignored if they don't have this block name
     */
    private static getBlockElements(accumulatorIn: BEMNodes, element: Element, requiredBlockName: string): BEMNodes {
        let accumulator = accumulatorIn;
        const elementName = element.getBEMElementName(requiredBlockName);
        const blockName = element.getBEMBlockName(requiredBlockName);

        let elementNameKey;
        if (elementName)
            elementNameKey = elementName.replace(/-([a-z])/g, (g) => {
                return g[1].toUpperCase();
            });

        if (elementName && blockName === requiredBlockName) {
            BEMNodes.add(accumulator, elementNameKey, element, blockName);
        } else if (blockName === requiredBlockName) {
            BEMNodes.add(accumulator, '$bareBlock', element, blockName);
        }

        if (typeof element.children !== 'undefined') {
            [...element.children].forEach((childNode: Element) => {
                accumulator = this.getBlockElements(accumulator, childNode, requiredBlockName);
            });
        }
        return accumulator;
    }

    /**
     * Checks whether every element of an array is inside another array
     */
    private static arrayContainsArray(superset: string[], subset: string[]): boolean {
        if (subset.length === 0) {
            return false;
        }
        return subset.every((value) => {
            return superset.indexOf(value) >= 0;
        });
    }
}
