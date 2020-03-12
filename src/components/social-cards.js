import React from 'react';
import Helmet from 'react-helmet';

const SocialCards = ({ isBanner, title, summary }) =>
  isBanner ? (
    <Helmet>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@GetInsomnia" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={summary} />
      <meta
        name="twitter:image"
        content="https://insomnia.rest/images/twitter-promo.png"
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta
        property="og:image"
        content="https://insomnia.rest/images/twitter-promo.png"
      />
    </Helmet>
  ) : (
    <Helmet>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@GetInsomnia" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={summary} />
      <meta
        name="twitter:image"
        content="https://insomnia.rest/images/twitter-card-icon.png"
      />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta
        property="og:image"
        content="https://insomnia.rest/images/twitter-card-icon.png"
      />
    </Helmet>
  );

export default SocialCards;
