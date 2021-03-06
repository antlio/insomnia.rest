import React from 'react';
import DownloadLink from '../../components/download-link';
import DownloadButton from '../../components/download-button';
import SocialCards from '../../components/social-cards';
import Img from 'gatsby-image';
import Link from '../../components/link';
import Companies from '../../partials/companies';
import Helmet from 'react-helmet';

// SVGs
import iconDownload from '../../assets/icons/icn-download.svg';
import logoCore from '../../assets/logos/logo-core-hero-28x.svg';
import logoDesigner from '../../assets/logos/logo-designer-hero-28x.svg';
import illustrationCore from '../../assets/illustration-insomnia-client.svg';
import illustrationDesigner from '../../assets/illustration-insomnia-designer.svg';

export default ({ data }) => (
  <React.Fragment>
    <Helmet>
      <body data-navbar="floating" />
    </Helmet>

    <SocialCards
      title="Insomnia Core | Desktop API Client for Rest and GraphQL"
      summary="Debug APIs like a human, not a robot"
      isBanner
    />

    <div className="jumbotron">
      <div className="jumbotron-inner">
        <div className="slogan container">
          <div className="row">
            <div className="col-12">
              <h1 className="font-regular">
                Insomnia <u>Designer</u>.
              </h1>
            </div>
          </div>
        </div>

        <div className="product-offerings container">
          <div className="row row-center-content">
            <div className="col-6 offering">
              <div className="graphic">
                <DownloadLink>
                  <img src={illustrationDesigner} />
                </DownloadLink>
              </div>
              <p>
                The Collaborative API Design Tool for designing and managing
                OpenAPI specs.
              </p>
              <DownloadButton className="button">
                <img src={iconDownload} className="icon" alt="Download" />{' '}
                Latest Release
                <span className="badge">New</span>
              </DownloadButton>
              <p className="latest-version">
                <small>
                  <Link to={`/changelog`}>Changelog</Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <main role="main">
      <section className="no-margin padding-top-lg padding-bottom-lg">
        <div className="container">
          <div className="row row-center-y">
            <div className="col-7">
              <Img
                sizes={data.documentsImg.childImageSharp.sizes}
                alt="Document Listing"
              />
            </div>
            <div className="col-5">
              <h3 className="text-xl">Manage APIs</h3>
              <p>Manage all of your API designs in one place.</p>
            </div>
          </div>
          <div className="row row-center-y padding-top">
            <div className="col-5">
              <h3 className="text-xl">Design APIs</h3>
              <p>
                Create, edit, preview, lint, debug, and your OpenAPI specs all
                in one collaborative API editor.
              </p>
            </div>
            <div className="col-7">
              <Img
                sizes={data.previewImg.childImageSharp.sizes}
                alt="Document Listing"
              />
            </div>
          </div>
          <div className="row row-center-y padding-top">
            <div className="col-7">
              <Img
                sizes={data.generateConfigImg.childImageSharp.sizes}
                alt="Config Generation"
              />
            </div>
            <div className="col-5">
              <h3 className="text-xl">Generate Config</h3>
              <p>
                Generate your API Gateway configuration based on your OpenAPI
                specifications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="light no-margin padding-bottom-lg padding-top-lg">
        <div className="container">
          <div className="row">
            <div className="col-12 center">
              <h2>More than 800,000 developers trust Insomnia</h2>
              <div className="padding-top">
                <Companies />
                <br />
                <br />
                <DownloadButton className="button--big">
                  Download App
                </DownloadButton>
                &nbsp;&nbsp;
                <Link
                  to="/teams"
                  className="button button--big button--no-outline">
                  Team Edition
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="dark no-margin padding-bottom-lg padding-top-lg">
        <div className="container">
          <div className="row">
            <div className="col-12 center">
              <h2 className="text-xl">Still not convinced?</h2>
              <p>Maybe this big ol' list of features will help</p>
            </div>
          </div>
          <div className="row feature-list">
            <div className="col-6">
              <ul>
                <li>
                  <Link to="/graphql/">GraphQL</Link> support
                </li>
                <li>OAuth 1.0 and 2.0 auth</li>
                <li>Multipart form builder</li>
                <li>Query parameter builder</li>
                <li>Plugin System</li>
                <li>SSL client certificates</li>
                <li>JSONPath and XPath</li>
                <li>Response history</li>
                <li>Data import/export</li>
                <li>Rendered HTML preview</li>
                <li>Image and SVG preview</li>
                <li>AWS authentication</li>
                <li>Configurable proxy</li>
                <li>Color themes</li>
                <li>Cloud sync and sharing</li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  Import from <code style={{ color: '#333' }}>curl</code>
                </li>
                <li>Digest, Basic, NTLM Auth</li>
                <li>Nunjucks templating</li>
                <li>Configurable timeout</li>
                <li>HAR import</li>
                <li>Swagger import</li>
                <li>Request filtering</li>
                <li>Toggle SSL validation</li>
                <li>Keyboard shortcuts</li>
                <li>Usable at almost all sizes</li>
                <li>NTLM authentication</li>
                <li>Responsive interface</li>
                <li>Autocomplete Hints</li>
                <li>Redirect chain visualization</li>
                <li>Mac, Windows and Linux</li>
              </ul>
            </div>
          </div>
          <br />
          <div className="center">
            <p>Go on, give it a try. You won't regret it.</p>
            <br />
            <DownloadButton className="button--big" />
          </div>
          <br />
        </div>
      </section>
    </main>
  </React.Fragment>
);

export const pageQuery = graphql`
  query GatsbyImageQueryDesigner {
    mainImg: file(relativePath: { eq: "screens/main.png" }) {
      childImageSharp {
        sizes(maxWidth: 880) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    mainImg: file(relativePath: { eq: "screens/main.png" }) {
      childImageSharp {
        sizes(maxWidth: 880) {
          ...GatsbyImageSharpSizes_withWebp
        }
      }
    }
    templateImg: file(relativePath: { eq: "screens/template.png" }) {
      childImageSharp {
        sizes(maxWidth: 250) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    responsesImg: file(relativePath: { eq: "screens/responses.png" }) {
      childImageSharp {
        sizes(maxWidth: 250) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    dragImg: file(relativePath: { eq: "screens/drag.png" }) {
      childImageSharp {
        sizes(maxWidth: 250) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    previewImg: file(relativePath: { eq: "screens/big/preview.png" }) {
      childImageSharp {
        sizes(maxWidth: 400) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    documentsImg: file(relativePath: { eq: "screens/big/documents.png" }) {
      childImageSharp {
        sizes(maxWidth: 400) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    generateConfigImg: file(
      relativePath: { eq: "screens/big/generate_config.png" }
    ) {
      childImageSharp {
        sizes(maxWidth: 400) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    environmentsImg: file(
      relativePath: { eq: "screens/big/environments.png" }
    ) {
      childImageSharp {
        sizes(maxWidth: 400) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    codeImg: file(relativePath: { eq: "screens/big/code.png" }) {
      childImageSharp {
        sizes(maxWidth: 400) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
    themesImg: file(relativePath: { eq: "screens/big/themes.png" }) {
      childImageSharp {
        sizes(maxWidth: 400) {
          ...GatsbyImageSharpSizes_withWebp_tracedSVG
        }
      }
    }
  }
`;
