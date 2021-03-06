///<reference path='./base.d.ts' />

declare module '@stripe/stripe-js' {
  type StripeCardElement = StripeElementBase & {
    /**
     * The change event is triggered when the `Element`'s value changes.
     */
    on(
      eventType: 'change',
      handler: (event: StripeCardElementChangeEvent) => any
    ): void;

    /**
     * Triggered when the element is fully rendered and can accept `element.focus` calls.
     */
    on(eventType: 'ready', handler: () => any): StripeCardElement;

    /**
     * Triggered when the element gains focus.
     */
    on(eventType: 'focus', handler: () => any): StripeCardElement;

    /**
     * Triggered when the element loses focus.
     */
    on(eventType: 'blur', handler: () => any): StripeCardElement;

    /**
     * Updates the options the `CardElement` was initialized with.
     * Updates are merged into the existing configuration.
     *
     * If you collect certain information in a different part of your interface (e.g., ZIP or postal code), use `element.update` with the appropriate information.
     *
     * The styles of an `CardElement` can be dynamically changed using `element.update`.
     * This method can be used to simulate CSS media queries that automatically adjust the size of elements when viewed on different devices.
     */
    update(options: StripeCardElementOptions): void;
  };

  interface StripeCardElementOptions {
    classes?: StripeElementClasses;

    style?: StripeElementStyle;

    /**
     * A pre-filled set of values to include in the input (e.g., `{postalCode: '94110'}`).
     * Note that sensitive card information (card number, CVC, and expiration date) cannot be pre-filled.
     */
    value?: {postalCode?: string};

    /**
     * Hide the postal code field.
     * Default is `false`.
     * If you are already collecting a full billing address or postal code elsewhere, set this to `true`.
     */
    hidePostalCode?: boolean;

    /**
     * Appearance of the icon in the Element.
     */
    iconStyle?: 'default' | 'solid';

    /**
     * Hides the icon in the Element.
     * Default is `false`.
     */
    hideIcon?: boolean;

    /**
     * Applies a disabled state to the Element such that user input is not accepted.
     * Default is false.
     */
    disabled?: boolean;
  }

  interface StripeCardElementChangeEvent extends StripeElementChangeEvent {
    /**
     * The type of element that emitted this event.
     */
    elementType: 'card';

    /**
     * An object containing the currently entered `postalCode`.
     */
    value: {postalCode: string};

    /*
     * The card brand of the card number being entered.
     */
    brand:
      | 'visa'
      | 'mastercard'
      | 'amex'
      | 'discover'
      | 'diners'
      | 'jcb'
      | 'unionpay'
      | 'unknown';
  }
}
