/**
 * Represents a menu item in a UI
 */
export class Menu {
    /**
     * Menu Id - Must be unique
     */
    id: string;
    /**
     * Title of the menu. Used to show in the UI
     */
    title: string;
    /**
     * Icon of the menu
     */
    icon: string;
    /**
     * Ordinal of the menu item
     */
    order: number;
    /**
     * Route to activate when user clicks the menu item
     */
    route: string
}