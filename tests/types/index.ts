///<reference path='../../types/index.d.ts' />

/*
 * This code will not run, but will be typechecked as a test.
 */

import {
  loadStripe,
  Stripe,
  StripeElements,
  StripeElementStyle,
  CssFontSource,
  StripeCardElement,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
  StripeCardElementChangeEvent,
  StripePaymentRequestButtonElementClickEvent,
  PaymentIntent,
  Token,
  StripeError,
  SetupIntent,
  PaymentRequest,
  PaymentRequestShippingOptionEvent,
  PaymentRequestShippingOption,
  CustomFontSource,
  StripeIbanElement,
  StripeIdealBankElement,
  StripePaymentRequestButtonElement,
  StripeElementType,
} from '@stripe/stripe-js';

const stripePromise: Promise<Stripe | null> = loadStripe('');
const stripeConnectPromise = loadStripe('', {stripeAccount: '', locale: 'en'});

declare const stripe: Stripe;

const OPEN_SANS: CssFontSource = {
  cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans',
};

const AVENIR: CustomFontSource = {
  family: 'Avenir',
  src: 'url(https://my-domain.com/assets/avenir.woff)',
  display: 'auto',
  weight: '500',
  style: 'normal',
};

const elements: StripeElements = stripe.elements({fonts: [OPEN_SANS, AVENIR]});

const MY_STYLE: StripeElementStyle = {
  base: {
    iconColor: '#c4f0ff',
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    ':-webkit-autofill': {
      color: '#fce883',
    },
    '::placeholder': {
      color: '#87BBFD',
    },
  },
  invalid: {
    iconColor: '#FFC7EE',
    color: '#FFC7EE',
  },
};

const cardElement: StripeCardElement = elements.create('card', {
  classes: {base: '', focus: ''},
  style: MY_STYLE,
  value: {postalCode: ''},
  hidePostalCode: true,
  iconStyle: 'solid',
  disabled: false,
});

const cardElementDefaults: StripeCardElement = elements.create('card');

const retrievedCardElement: StripeCardElement | null = elements.getElement(
  'card'
);

const cardNumberElement: StripeCardNumberElement = elements.create(
  'cardNumber',
  {style: MY_STYLE}
);

const retrievedCardNumberElement: StripeCardNumberElement | null = elements.getElement(
  'cardNumber'
);

const cardExpiryElement: StripeCardExpiryElement = elements.create(
  'cardExpiry',
  {style: MY_STYLE}
);

const retrievedCardExpiryElement: StripeCardExpiryElement | null = elements.getElement(
  'cardExpiry'
);

const cardCvcElement: StripeCardCvcElement = elements.create('cardCvc');

const retrievedCardCvcElement: StripeCardCvcElement | null = elements.getElement(
  'cardCvc'
);

const ibanElement = elements.create('iban', {supportedCountries: ['']});

const retrievedIbanElement: StripeIbanElement | null = elements.getElement(
  'iban'
);

const idealBankElement = elements.create('idealBank', {
  style: MY_STYLE,
  value: '',
  hideIcon: false,
  classes: {webkitAutoFill: ''},
});

const retrievedIdealBankElement: StripeIdealBankElement | null = elements.getElement(
  'idealBank'
);

const paymentRequestButtonElement = elements.create('paymentRequestButton', {
  style: {
    paymentRequestButton: {
      theme: 'light',
    },
  },
});

const retrievedPaymentRequestButtonElement: StripePaymentRequestButtonElement | null = elements.getElement(
  'paymentRequestButton'
);

const cardElementType: StripeElementType = 'card';
const ibanElementType: StripeElementType = 'iban';

cardElement.mount('#bogus-container');
ibanElement.mount('#bogus-container');

cardElement
  .on('ready', () => {})
  .on('focus', () => {})
  .on('blur', () => {})
  .on('change', (e: StripeCardElementChangeEvent) => {
    if (e.error) {
      console.error(e.error.message);
    }
  });

paymentRequestButtonElement.on(
  'click',
  (e: StripePaymentRequestButtonElementClickEvent) => {
    e.preventDefault();
  }
);

cardElement.destroy();
cardNumberElement.destroy();
cardCvcElement.destroy();
cardExpiryElement.destroy();
ibanElement.destroy();
idealBankElement.destroy();
paymentRequestButtonElement.destroy();

stripe.redirectToCheckout({sessionId: ''});

stripe
  .redirectToCheckout({
    items: [{sku: 'sku_123', quantity: 1}],
    successUrl: 'https://your-website.com/success',
    cancelUrl: 'https://your-website.com/canceled',
  })
  .then((result) => {
    console.error(result.error.message);
  });

stripe.createToken(cardElement, {name: ''});

stripe
  .createToken(cardElement)
  .then(({token, error}: {token?: Token; error?: StripeError}) => {
    console.log(token);
  });

stripe.createToken(cardNumberElement);

stripe.createToken('pii', {personal_id_number: ''});

stripe.createToken(ibanElement, {
  currency: '',
  account_holder_name: '',
  account_holder_type: '',
});

stripe.createToken('bank_account', {
  country: '',
  currency: '',
  routing_number: '',
  account_number: '',
  account_holder_name: '',
  account_holder_type: '',
});

const createSource = async () => {
  const {source, error} = await stripe.createSource(ibanElement, {
    type: 'sepa_debit',
    currency: 'eur',
    owner: {
      name: 'Jenny Rosen',
    },
  });

  if (error) {
    console.log(error.message);
  }

  if (source) {
    console.log(source.type);
  }
};

const createSourceRaw = async () => {
  const {source, error} = await stripe.createSource({
    type: 'ideal',
    amount: 1099,
    currency: 'eur',
    owner: {
      name: 'Jenny Rosen',
    },
    redirect: {
      return_url: 'https://shop.example.com/crtA6B28E1',
    },
  });

  if (error) {
    console.log(error.message);
  }

  if (source) {
    console.log(source.type);
  }
};

stripe.retrieveSource({id: '', client_secret: ''}).then((result) => {
  console.log(result.source!.type);
});

stripe
  .confirmCardPayment('', {
    payment_method: {card: cardElement, billing_details: {name: ''}},
  })
  .then((result) => console.log(result.paymentIntent!.amount));

stripe.confirmCardPayment('', {payment_method: ''});

stripe.confirmCardPayment('', {payment_method: ''}, {handleActions: false});

stripe.confirmCardPayment('', {payment_method: {card: {token: ''}}});

stripe.confirmCardPayment('');

stripe.confirmCardPayment('');

stripe.confirmIdealPayment('', {
  payment_method: {ideal: idealBankElement},
  return_url: window.location.href,
});

stripe.confirmIdealPayment('', {payment_method: ''});

stripe.confirmIdealPayment('', {payment_method: ''}, {handleActions: false});

stripe.confirmIdealPayment('', {payment_method: {ideal: {bank: ''}}});

stripe.confirmIdealPayment('');

stripe.confirmSepaDebitPayment('', {
  payment_method: {
    sepa_debit: ibanElement,
    billing_details: {name: '', email: ''},
  },
});

stripe.confirmSepaDebitPayment('', {
  payment_method: {
    sepa_debit: {iban: ''},
    billing_details: {name: '', email: ''},
  },
});

stripe.confirmSepaDebitPayment('', {payment_method: ''});

stripe.confirmSepaDebitPayment('');

stripe
  .handleCardAction('')
  .then(({paymentIntent}: {paymentIntent?: PaymentIntent}) => {});

stripe
  .createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {name: 'Jenny Rosen'},
  })
  .then((result) => {
    if (result.paymentMethod) {
      console.log(result.paymentMethod.id);
    }
  });

stripe.createPaymentMethod({
  type: 'ideal',
  ideal: idealBankElement,
});

stripe.createPaymentMethod({
  type: 'ideal',
  ideal: {},
});

stripe.createPaymentMethod({
  type: 'ideal',
  ideal: {bank: ''},
});

stripe.createPaymentMethod({
  type: 'sepa_debit',
  sepa_debit: ibanElement,
  billing_details: {name: 'Jenny Rosen', email: 'jenny@example.com'},
});

stripe.createPaymentMethod({
  type: 'sepa_debit',
  sepa_debit: {iban: ''},
  billing_details: {name: 'Jenny Rosen', email: 'jenny@example.com'},
});

stripe.retrievePaymentIntent('{PAYMENT_INTENT_CLIENT_SECRET}');

stripe.confirmCardSetup('', {
  payment_method: {card: cardElement, billing_details: {name: ''}},
});

stripe.confirmCardSetup('', {payment_method: ''});

stripe.confirmCardSetup('', {payment_method: ''}, {handleActions: false});

stripe.confirmCardSetup('', {payment_method: {card: {token: ''}}});

stripe
  .confirmCardSetup('')
  .then((result: {setupIntent?: SetupIntent; error?: StripeError}) => null);

stripe.confirmSepaDebitSetup('', {
  payment_method: {
    sepa_debit: ibanElement,
    billing_details: {name: '', email: ''},
  },
});

stripe.confirmSepaDebitSetup('', {
  payment_method: {
    sepa_debit: ibanElement,
    billing_details: {name: '', email: ''},
  },
});

stripe.confirmSepaDebitSetup('', {payment_method: ''});

stripe.confirmSepaDebitSetup('', {
  payment_method: {
    sepa_debit: {iban: ''},
    billing_details: {name: '', email: ''},
  },
});

stripe
  .retrieveSetupIntent('')
  .then((result: {setupIntent?: SetupIntent}) => null);

const paymentRequest: PaymentRequest = stripe.paymentRequest({
  country: 'US',
  currency: 'usd',
  total: {label: 'Demo total', amount: 1000},
  requestPayerName: true,
  requestPayerEmail: true,
});

paymentRequest.canMakePayment().then((result) => {
  if (result) {
    const {applePay} = result;
    console.log(applePay);
  }
});

paymentRequest.show();

paymentRequest.update({
  total: {
    label: 'Demo total',
    amount: 2000,
  },
  shippingOptions: [
    {
      id: 'basic',
      label: 'Ground shipping',
      detail: 'Ground shipping via UPS or FedEx',
      amount: 995,
    },
  ],
});

paymentRequest.on('paymentmethod', function(ev) {
  console.log(ev.paymentMethod.id);
  ev.complete('success');
  ev.complete('fail');
  ev.complete('invalid_payer_name');
  ev.complete('invalid_payer_phone');
  ev.complete('invalid_payer_email');
  ev.complete('invalid_shipping_address');
});

paymentRequest.on('token', function(ev) {
  console.log(ev.token.id);
  console.log(ev.payerEmail);
  ev.complete('success');
});

paymentRequest.on('source', function(ev) {
  console.log(ev.source.id);
  console.log(ev.methodName);
  console.log(ev.payerPhone);
  ev.complete('invalid_payer_email');

  const {
    country,
    addressLine,
    region,
    city,
    postalCode,
    recipient,
    phone,
    sortingCode,
    dependentLocality,
  } = ev.shippingAddress!;
});

paymentRequest.on('shippingaddresschange', function(ev) {
  if (ev.shippingAddress.country !== 'US') {
    ev.updateWith({status: 'invalid_shipping_address'});
  } else {
    fetch('/calculateShipping', {
      body: JSON.stringify({shippingAddress: ev.shippingAddress}),
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        ev.updateWith({
          status: 'success',
          shippingOptions: result.supportedShippingOptions,
        });
      });
  }
});

paymentRequest.on('cancel', () => {});

paymentRequest.on(
  'shippingoptionchange',
  (e: PaymentRequestShippingOptionEvent) => {
    const selectedOption: PaymentRequestShippingOption = e.shippingOption;

    console.log(selectedOption);

    e.updateWith({
      total: {amount: 2, label: ''},
      shippingOptions: [
        {
          id: 'someUniqueID',
          label: 'Ground',
          detail: 'UPS standard ground shipping',
          amount: 9.99,
        },
      ],
    });
  }
);
