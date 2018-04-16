import React from 'react';
import PropTypes from 'prop-types';
import CancelLink from '../../lib/common/cancel';
import SignOutLink from '../../lib/common/sign-out';
import App from '../../lib/app-wrapper';
import Link from '../../components/link';

class Home extends React.Component {
  renderNotice() {
    const {billingDetails, whoami} = this.props;

    let notice = null;

    const trialEndDate = new Date(whoami.trialEnd * 1000);
    const trialEndMillis = trialEndDate.getTime() - Date.now();
    const trialDays = Math.ceil(trialEndMillis / 1000 / 60 / 60 / 24);
    const isTrialing = whoami.isTrialing;
    const isTrialOver = trialDays <= 0;
    const isPremium = whoami.isPremium;

    if (billingDetails) {
      // Credit card entered but needs to pay
      if (billingDetails.isPaymentRequired) {
        notice = (
          <p className="notice info">
            <strong>Payment Required</strong>. Please subscribe to a plan to continue
            using Insomnia.
            <br/>
            <br/>
            <Link to="/app/subscribe/" className="button button--compact">
              Update Subscription
            </Link>
          </p>
        );
      } else if (billingDetails.subCancelled && billingDetails.subPeriodEnd * 1000 > Date.now()) {
        const dateString = (new Date(billingDetails.subPeriodEnd * 1000)).toDateString();
        notice = (
          <p className="notice info">
            Subscription <strong>Cancelled</strong> and will end <strong>{dateString}</strong>
            <br/>
            <br/>
            <Link to="/app/subscribe/" className="button button--compact">
              Resubscribe
            </Link>
          </p>
        );
      } else if (billingDetails.subCancelled) {
        notice = (
          <p className="notice info">
            Your subscription is <strong>Cancelled</strong>
            <br/>
            <br/>
            <Link to="/app/subscribe/" className="button button--compact">
              Resubscribe
            </Link>
          </p>
        );
      }
    } else {
      if (isTrialing && !isTrialOver) {
        notice = (
          <p className="notice info">
            You still have <strong>{trialDays}</strong> day{trialDays === 1 ? '' : 's'} left
            on your free trial
            <br/>
            <br/>
            <Link to="/app/subscribe/" className="button button--compact">
              Select a Plan
            </Link>
          </p>
        );
      } else if (!isPremium && isTrialOver) {
        notice = (
          <p className="notice warn">
            Your trial ended <strong>{-1 * trialDays}</strong> day{trialDays === 1 ? '' : 's'} ago.
            Please subscribe to a plan to continue using your account.
            <br/>
            <br/>
            <Link to="/app/subscribe/" className="button button--compact">
              Update Subscription
            </Link>
          </p>
        );
      }
    }

    return <div>{notice}<br/></div>;
  }

  renderLoginNotice() {
    if (this.props.whoami.appNumLaunches) {
      return null;
    }

    return (
      <p className="notice info">
        You may now sign in to the app 💻
      </p>
    );
  }

  render() {
    const {whoami, billingDetails} = this.props;
    const description = billingDetails && billingDetails.description;

    const total = billingDetails && billingDetails.subTotal;
    const discountAmount = billingDetails ? total * (billingDetails.subPercentOff / 100) : 0;
    const totalAfterDiscount = total - discountAmount;
    const periodEnd = billingDetails && new Date(billingDetails.subPeriodEnd * 1000).toDateString();

    return (
      <div>
        {this.renderLoginNotice()}
        {this.renderNotice()}
        <p className="bold text-lg">Hi {whoami.firstName},</p>
        <p>Your email address is <code>{whoami.email}</code>.</p>
        {description ? <p>You are subscribed to <strong>{description}</strong>!</p> : null}
        {(billingDetails && !billingDetails.subCancelled) ? (
          <p>
            Your next invoice is scheduled for <strong>{periodEnd}</strong> and will be
            {' '}
            <strong>${(totalAfterDiscount / 100).toFixed(2)} USD</strong>
            {billingDetails.subPercentOff ? (
              <span className="success bold">
                {' '}
                (after {billingDetails.subPercentOff}% discount)
              </span>
            ) : null}
            .
          </p>
        ) : null}
        <p>Here are some things you might want to do.</p>
        <ul>
          <li>
            {billingDetails
              ? <Link to="/app/subscribe/">Change Subscription</Link>
              : <Link to="/app/subscribe/">Choose Plan</Link>
            }
          </li>
          <li>
            <Link to="/app/teams/">Manage Teams</Link>
          </li>
          <li>
            <Link to="/app/change-password/">Change Password</Link>
          </li>
          <li>
            <Link to="/app/change-email/">Change Email</Link>
          </li>
          <li>
            <Link to="/app/invoices/">Invoices</Link>
          </li>
          {billingDetails ? <li><CancelLink/></li> : null}
          <li>
            <SignOutLink/>
          </li>
        </ul>
      </div>
    );
  }
}

Home.propTypes = {
  whoami: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    planName: PropTypes.string.isRequired,
    trialEnd: PropTypes.number.isRequired,
    isTrialing: PropTypes.bool.isRequired,
    isPaymentRequired: PropTypes.bool.isRequired,
    isVerified: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    appNumLaunches: PropTypes.number.isRequired,
    canManageTeams: PropTypes.bool.isRequired,
  }).isRequired,
  billingDetails: PropTypes.shape({
    description: PropTypes.string.isRequired,
    isPaymentRequired: PropTypes.bool.isRequired,
    subTrialing: PropTypes.bool.isRequired,
    subTrialEnd: PropTypes.number.isRequired,
    subCancelled: PropTypes.bool.isRequired,
    subPeriodEnd: PropTypes.number.isRequired,
    subPercentOff: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
  }),
};

export default () => (
  <App hideFooter title="Account" subTitle="Manage your Insomnia account">
    {props => <Home {...props}/>}
  </App>
);

