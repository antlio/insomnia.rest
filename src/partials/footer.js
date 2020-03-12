import React from 'react';
import { links, menus, site } from '../config';
import Link from '../components/link';
import iconSrc from '../assets/icon.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <section>
          <img src={iconSrc} alt="Insomnia REST Client logo" />
          <p className="footer__menu">
            {menus.footer &&
              menus.footer.map(item => (
                <Link key={item.key} to={item.url}>
                  {item.name}
                </Link>
              ))}
          </p>
          <p className="text-sm footer__copy">
            &copy; {new Date().getUTCFullYear()}&nbsp;
            <Link to={site.copyrightURL} target="_blank">
              {site.copyright}
            </Link>
          </p>
        </section>
      </footer>
    );
  }
}

export default Footer;
