import { ComposibleValidatable, Validator } from './types';
/** Each key of the object is a validatable */
export declare type ValidatableMapOrArray = {
    [key: string]: ComposibleValidatable<any>;
} | ComposibleValidatable<any>[] | Map<any, ComposibleValidatable<any>>;
/**
 * Just a wrapper around the helpers for a set of FieldStates or FormStates
 */
export declare class FormState<TValue extends ValidatableMapOrArray> implements ComposibleValidatable<TValue> {
    /**
     * SubItems can be any Validatable
     */
    $: TValue;
    protected mode: 'array' | 'map' | 'es6map';
    constructor(
        /**
         * SubItems can be any Validatable
         */
        $: TValue);
    /** Get validatable objects from $ */
    protected getValues: () => ComposibleValidatable<any>[];
    validating: boolean;
    protected _validators: Validator<TValue>[];
    validators: (...validators: Validator<TValue>[]) => this;
    /**
     * - Re-runs validation on all fields
     * - returns `hasError`
     * - if no error also return the validated values against each key.
     */
    validate(): Promise<{
        hasError: true;
    } | {
        hasError: false;
        value: TValue;
    }>;
    protected _error: string | null | undefined;
    /**
     * Does any field or form have an error
     */
    readonly hasError: boolean;
    /**
     * Does any field have an error
     */
    readonly hasFieldError: boolean;
    /**
     * Does form level validation have an error
     */
    readonly hasFormError: boolean;
    /**
     * Call it when you are `reinit`ing child fields
     */
    clearFormError(): void;
    /**
     * Error from some sub field if any
     */
    readonly fieldError: string | null | undefined;
    /**
     * Error from form if any
     */
    readonly formError: string | null | undefined;
    /**
     * The first error from any sub (if any) or form error
     */
    readonly error: string | null | undefined;
    /**
     * You should only show the form error if there are no field errors
     */
    readonly showFormError: boolean;
    /**
     * Resets all the fields in the form
     */
    reset: () => void;
    /**
     * Auto validation
     */
    protected autoValidationEnabled: boolean;
    enableAutoValidation: () => void;
    enableAutoValidationAndValidate: () => Promise<{
        hasError: true;
    } | {
        hasError: false;
        value: TValue;
    }>;
    disableAutoValidation: () => void;
    /**
     * Composible field validation tracking
     */
    validatedSubFields: ComposibleValidatable<any>[];
    /**
     * Composible fields (fields that work in conjuction with FormState)
     */
    compose(): this;
    on$ChangeAfterValidation: () => void;
    on$Reinit: () => void;
    setCompositionParent: (config: {
        on$ChangeAfterValidation: () => void;
        on$Reinit: () => void;
    }) => void;
}
