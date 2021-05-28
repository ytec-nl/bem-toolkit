/**
 * Workaround for IE11 not supporting classLists properly
 */
export default class ClassList extends Array<string> {
    private element: Element;

    public constructor(element: Element) {
        const classString = element.getAttribute('class');
        if (classString === null || classString === '') {
            super();
            this.element = element;
            return;
        }
        const classes = classString.split(' ');

        super(...classes);
        this.element = element;
    }

    /**
     * Add a class to the element
     *
     * @param className Name of the class that is added
     */
    public add(className: string): void {
        const classString = this.element.getAttribute('class') || '';
        const classes = classString.split(' ');

        if (classes.includes(className)) return;

        this.element.setAttribute('class', `${classString} ${className}`);
    }

    /**
     * Remove a class from the element
     *
     * @param className Name of the class that is removed
     */
    public remove(className: string): void {
        const classString = this.element.getAttribute('class') || '';
        const classes = classString.split(' ');

        if (!classes.includes(className)) return;

        const index = classes.indexOf(className);
        classes.splice(index, 1);

        this.element.setAttribute('class', `${classes.join(' ')}`);
    }

    /**
     *
     * Toggle whether or not a class exists on the element
     * @param className Name of the class that is added or removed
     * @param forceInput Force whether the element should have the class or not
     */
    public toggle(className: string, forceInput?: boolean): void {
        const classString = this.element.getAttribute('class') || '';
        const classes = classString.split(' ');

        let force: boolean;
        if (typeof forceInput === 'undefined') {
            force = !classes.includes(className);
        } else {
            force = forceInput;
        }

        if (force === true) this.add(className);
        else this.remove(className);
    }
}
