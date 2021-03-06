/**
 * An array of BEM elements with some advanced functions
 */
export default class BEMNodeList extends Array<Element> {
    private _blockName: string;

    public static create<T>(): BEMNodeList {
        return Object.create(BEMNodeList.prototype) as BEMNodeList;
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
        this.forEach((element: Element) => {
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
    public setBEMState(modifier: string, indexInput: number | number[]): void {
        const indexes: number[] = Array.isArray(indexInput) ? (indexInput as number[]) : ([indexInput] as number[]);

        this.forEach((element, elementIndex) => {
            const setModifier = indexes.indexOf(elementIndex) !== -1;
            element.toggleBEMModifier(modifier, setModifier);
        });
    }
}
