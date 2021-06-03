/**
 * An array of BEM elements with some advanced functions
 */
export default class BEMNodeList<
    BEMNodeListItem extends HTMLElement | SVGElement = HTMLElement
> extends Array<Element> {
    private _blockName: string;

    public static create<BEMNodeListItem extends HTMLElement | SVGElement>(): BEMNodeList<BEMNodeListItem> {
        return Object.create(BEMNodeList.prototype) as BEMNodeList<BEMNodeListItem>;
    }

    public set blockName(name: string) {
        if (typeof this._blockName === 'undefined') {
            this._blockName = name;
        }
    }

    public get blockName(): string {
        return this._blockName;
    }

    /**
     * sets innerHTML for all elements in the BEMNodeList
     */
    public set innerHTML(HTML: string) {
        this.forEach((element) => {
            element.innerHTML = HTML; // eslint-disable-line no-param-reassign
        });
    }

    /**
     * Returns a BEMNodelist containing all elements that have a certain BEM modifier
     * @param modifier BEM modifier string
     */
    public withModifier(modifier: string): BEMNodeList {
        const nodes = new BEMNodeList();
        this.forEach((element: BEMNodeListItem) => {
            if (element.getBEMModifiers(this._blockName).includes(modifier)) nodes.push(element);
        });

        return nodes;
    }

    /**
     * Adds an event listener to all elements in the BEMNodeList
     * @param type A case-sensitive string representing the event type to listen for.
     * @param listener Callback that is called when the event occurs
     * @param useCapture A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     */
    public addEventListener(type: string, listener: (event?: Event) => void, useCapture = false): void {
        this.forEach((element) => {
            element.addEventListener(type, listener, useCapture);
        });
    }

    /**
     * Removes an event listener from all elements in the BEMNodeList
     * @param type A case-sensitive string representing the event type to listen for.
     * @param listener The callback that is to be removed
     * @param useCapture A Boolean indicating whether events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
     */
    public removeEventListener(type: string, listener: (event?: Event) => void, useCapture = false): void {
        this.forEach((element) => {
            element.removeEventListener(type, listener, useCapture);
        });
    }

    /**
     * Toggles a BEM Modifier on or off for all elements of the BEMNodeList
     */
    public toggleBEMModifier(modifier: string, force?: boolean): void {
        this.forEach((element) => {
            element.toggleBEMModifier(modifier, force);
        });
    }

    /**
     * Adds a BEM Modifier for all elements of the BEMNodeList
     */
    public addBEMModifier(modifier: string): void {
        this.forEach((element) => {
            element.addBEMModifier(modifier);
        });
    }

    /**
     * Removes a BEM Modifier for all elements of the BEMNodeList
     */
    public removeBEMModifier(modifier: string): void {
        this.forEach((element) => {
            element.removeBEMModifier(modifier);
        });
    }

    /**
     * Sets BEM modifier for one element of the BEMNodelist and remove it for the others
     *
     * @param modifier BEM modifier that needs to be set
     * @param index Index of the element that needs the modifier to be added
     */
    public setBEMState(
        targetInput: number | number[] | BEMNodeListItem | BEMNodeListItem[],
        modifier: string | null,
        inverseModifier?: string
    ): void {
        if (modifier === null && typeof inverseModifier === 'undefined') {
            throw new Error("At least one of 'modifier' and 'inverseModifier' must not be null/undefined");
        }

        let indexes: number[];
        if (targetInput instanceof Element) {
            indexes = [this.indexOf(targetInput)];
        } else if (typeof targetInput === 'number') {
            indexes = [targetInput];
        } else {
            indexes = targetInput.map((target: number | BEMNodeListItem) => {
                if (typeof target === 'number') return target;
                if (target instanceof Element) return this.indexOf(target);
            });
        }

        this.forEach((element, elementIndex) => {
            let setModifier = indexes.indexOf(elementIndex) !== -1;

            if (modifier !== null) {
                element.toggleBEMModifier(modifier, setModifier);
            }
            if (typeof inverseModifier !== 'undefined') {
                element.toggleBEMModifier(inverseModifier, !setModifier);
            }
        });
    }
}
