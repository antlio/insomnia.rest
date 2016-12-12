import * as session from '../session';

export function init (pathname) {
  if (!pathname.match(/^\/app\/subscribe\/$/)) {
    return;
  }

  Stripe.setPublishableKey(process.env.STRIPE_PUB_KEY);

  document.querySelector('form')
    .addEventListener('submit', _handleSubmit);

  document.querySelector('input[name="card-number"]')
    .addEventListener('input', _handleCardNumberChange);

  document.querySelector('input[name="card-cvc"]')
    .addEventListener('input', _handleCvcChange);

}

let _cardTypeElement;
function _setCardType (cardType) {
  _cardTypeElement = _cardTypeElement || document.querySelector('#card-type');
  _cardTypeElement.innerHTML = cardType ? `<span class="subtle">(${cardType})</span>` : '';
}

function _handleCvcChange (e) {
  const value = e.target.value.trim();
  if (!value) {
    return;
  }

  e.target.value = value.replace(/[^0-9]/g, '').trim()
}

function _handleCardNumberChange (e) {
  // Using timeout or else target.value will not have been updated yet
  const value = e.target.value.trim();
  if (!value) {
    return;
  }

  const cardType = Stripe.card.cardType(value);
  const lastChar = value[e.target.value.length - 1];
  const num = value.replace(/[^0-9]*/g, '');
  let newNum = '';

  if (cardType === 'American Express') {
    // 1111 222222 33333
    const g1 = num.slice(0, 4);
    const g2 = num.slice(4, 10);
    const g3 = num.slice(10, 15);

    newNum = g1;
    newNum += g2 ? ` ${g2}` : '';
    newNum += g3 ? ` ${g3}` : '';
  } else if (cardType === 'Diners Club') {
    // 1111 2222 3333 44
    const g1 = num.slice(0, 4);
    const g2 = num.slice(4, 8);
    const g3 = num.slice(8, 12);
    const g4 = num.slice(12, 14);

    newNum = g1;
    newNum += g2 ? ` ${g2}` : '';
    newNum += g3 ? ` ${g3}` : '';
    newNum += g4 ? ` ${g4}` : '';
  } else {
    // 1111 2222 3333 4444
    const g1 = num.slice(0, 4);
    const g2 = num.slice(4, 8);
    const g3 = num.slice(8, 12);
    const g4 = num.slice(12, 16);

    newNum = g1;
    newNum += g2 ? ` ${g2}` : '';
    newNum += g3 ? ` ${g3}` : '';
    newNum += g4 ? ` ${g4}` : '';
  }

  // Handle trailing dash so we can add and delete dashes properly
  if (lastChar === ' ') {
    newNum += ' ';
  }

  // this.setState({cardType: cardType === 'Unknown' ? '' : cardType});
  if (cardType.toLowerCase() !== 'unknown') {
    _setCardType(cardType);
  } else {
    _setCardType('');
  }

  // Only update number if it changed from the user's original to prevent cursor jump
  if (newNum !== value) {
    e.target.value = newNum;
  }

  if (Stripe.card.validateCardNumber(newNum)) {
    e.target.setCustomValidity('');
  } else {
    e.target.setCustomValidity('Invalid card number');
  }
}

function serializeForm () {
  return {
    name: document.querySelector('input[name="full-name"]').value,
    cardNumber: document.querySelector('input[name="card-number"]').value,
    cardExpireMonth: document.querySelector('select[name="card-expire-month"]').value,
    cardExpireYear: document.querySelector('select[name="card-expire-year"]').value,
    cardSecurityCode: document.querySelector('input[name="card-cvc"]').value,
    planId: document.querySelector('input[name="plan-id"]:checked').value,
  }
}

async function _handleSubmit (e) {
  e.preventDefault();

  const button = this.querySelector('button[type="submit"]');
  const buttonText = button.innerHTML;
  button.innerHTML = '...';
  button.setAttribute('disabled', 'disabled');

  const data = serializeForm();

  const params = {
    name: data.name,
    number: data.cardNumber.replace(/ /g, ''),
    cvc: data.cardSecurityCode,
    exp_month: parseInt(data.cardExpireMonth, 10),
    exp_year: parseInt(data.cardExpireYear, 10),
  };

  Stripe.card.createToken(params, async (status, response) => {
    if (status === 200) {
      try {
        await session.subscribe(response.id, data.planId);
        window.location = '/app/'
      } catch (err) {
        console.error('Failed to subscribe', err);
      }
    } else {
      console.error('Failed to subscribe', status);
    }

    button.removeAttribute('disabled');
    button.innerHTML = buttonText;
  });
}

