import { ComposibleValidatable, Validator } from './types';
/**
 * Helps maintain the value + error information about a field
 *
 * This is the glue between the *page* and *field* in the presence of invalid states.
 */
export declare class FieldState<TValue> implements ComposibleValidatable<TValue> {
    private _initValue;
    /**
     * The value you should bind to the input in your field.
     */
    value: TValue;
    /** If there is any error on the field on last validation attempt */
    error?: string;
    /**
     * Allows you to set an error on a field lazily
     * Use case:
     *  You validate some things on client (e.g. isRequired)
     *  You then validate the field on the backend with an explict action (e.g. continue button)
     *  You now want to highlight an error from the backend for this field
     **/
    setError(error: string): void;
    /** If the field has been touched */
    dirty?: boolean;
    /** The value set from code or a `value` that's been validated */
    $: TValue;
    /**
     * Set to true if a validation run has been completed since init
     * Use case:
     * - to show a green color in the field : `hasError == false && hasBeenValidated == true`
     **/
    hasBeenValidated: boolean;
    /**
     * Allows you to preserve the `_autoValidationEnabled` value across `reinit`s
     */
    protected _autoValidationDefault: boolean;
    setAutoValidationDefault: (autoValidationDefault: boolean) => this;
    getAutoValidationDefault: () => boolean;
    protected _autoValidationEnabled: boolean;
    enableAutoValidation: () => this;
    enableAutoValidationAndValidate: () => Promise<{
        hasError: true;
    } | {
        hasError: false;
        value: TValue;
    }>;
    disableAutoValidation: () => this;
    constructor(_initValue: TValue);
    protected _validators: Validator<TValue>[];
    validators: (...validators: Validator<TValue>[]) => this;
    protected _onUpdate: (state: FieldState<TValue>) => any;
    /**
     * onUpdate is called whenever we change something in our local state that is significant
     * - value
     * - $
     * - error
     */
    onUpdate: (handler: (state: FieldState<TValue>) => any) => this;
    protected executeOnUpdate: () => void;
    /**
     * Allows you to take actions in your code based on `value` changes caused by user interactions
     */
    protected _onDidChange: (config: {
        newValue: TValue;
        oldValue: TValue;
    }) => any;
    onDidChange: (handler: (config: {
        newValue: TValue;
        oldValue: TValue;
    }) => any) => this;
    protected executeOnDidChange: (config: {
        newValue: TValue;
        oldValue: TValue;
    }) => void;
    setAutoValidationDebouncedMs: (milliseconds: number) => this;
    /** Trackers for validation */
    protected lastValidationRequest: number;
    protected preventNextQueuedValidation: boolean;
    /** On change on the component side */
    onChange: (value: TValue) => void;
    /**
     * If the page wants to reinitialize the field,
     * it should call this function
     */
    reset: (value?: TValue) => void;
    readonly hasError: boolean;
    validating: boolean;
    /**
     * Runs validation on the current value immediately
     */
    validate: () => Promise<{
        hasError: true;
    } | {
        hasError: false;
        value: TValue;
    }>;
    queuedValidationWakeup: () => void;
    /**
     * Runs validation with debouncing to keep the UI super smoothly responsive
     * NOTE:
     * - also setup in constructor
     * - Not using `action` from mobx *here* as it throws off our type definitions
     */
    protected queueValidation: () => void;
    /**
     * Composible fields (fields that work in conjuction with FormState)
     */
    on$ChangeAfterValidation: () => void;
    on$Reinit: () => void;
    setCompositionParent: (config: {
        on$ChangeAfterValidation: () => void;
        on$Reinit: () => void;
    }) => void;
}
