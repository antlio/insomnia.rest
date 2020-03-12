import React from 'react';
import SocialCards from '../components/social-cards';
import Title from '../partials/title';
import DownloadButton from '../components/download-button';
import ImportButton from '../components/import-button';
import Link from '../components/link';

export default () => (
  <React.Fragment>
    <article>
      <Title>Run in Insomnia</Title>
      <SocialCards title="Insomnia" summary="Run in Insomnia" isBanner />

      <section className="container header--big run-in-container">
        <div className="run-in">
          <header className="run-in__header">
            <h1>Run API</h1>
          </header>
          <div className="run-in__body">
            <div className="run-in__body__preview">
              <svg width="100%" height="100%" viewBox="0 0 500 300">
                <rect x="0" y="0" width="100%" height="100%" fill="#282925" />
                <rect x="25%" y="0" width="100%" height="10%" fill="#fff" />
                <rect x="0" y="0" width="25%" height="100%" fill="#2e2f2b" />
                <rect x="0" y="0" width="25%" height="10%" fill="#695eb8" />
                <line
                  x1="25%"
                  x2="100%"
                  y1="10%"
                  y2="10%"
                  strokeWidth="1"
                  stroke="rgba(130, 130, 130, 0.35)"
                />
                <line
                  x1="62%"
                  x2="62%"
                  y1="0"
                  y2="100%"
                  strokeWidth="1"
                  stroke="rgba(130, 130, 130, 0.35)"
                />
                <line
                  x1="25%"
                  x2="25%"
                  y1="0"
                  y2="100%"
                  strokeWidth="1"
                  stroke="rgba(130, 130, 130, 0.35)"
                />
                <line
                  x1="0"
                  x2="25%"
                  y1="10%"
                  y2="10%"
                  strokeWidth="1"
                  stroke="rgba(130, 130, 130, 0.35)"
                />
                <rect x="40%" y="85%" width="5%" height="8%" fill="#59a210" />
                <rect x="50%" y="85%" width="5%" height="8%" fill="#1c90b4" />
                <rect x="60%" y="85%" width="5%" height="8%" fill="#d07502" />
                <rect x="70%" y="85%" width="5%" height="8%" fill="#d04444" />
                <rect x="80%" y="85%" width="5%" height="8%" fill="#7d69cb" />
                <rect x="90%" y="85%" width="5%" height="8%" fill="#1c90b4" />
              </svg>
            </div>
            <p>Have Insomnia installed?</p>
            <ImportButton />
          </div>
          <footer className="run-in__footer">
            Don't have the Insomnia?&nbsp;
            <DownloadButton className="button--subtle button--compact" />
          </footer>
        </div>
        <p className="small center">
          Or, <Link to="/create-run-button">create your own</Link> run button
        </p>
      </section>
    </article>
  </React.Fragment>
);
