'use client';
import WeatherWidget from '../WeatherWidget/WeatherWidget';

import styles from './Footer.module.css';

const Footer = (props) => {
  return (
    <footer>
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.churchImage}>
            <h2>
              Contact <span>Us</span>
            </h2>
            <p>
              (217) 562-2641 | ​panacountryclub@gmail.com | 411 East 9th Street
              ​PO Box 16 Pana, IL 62557
            </p>
          </div>
        </div>
        <div className="row">
          <div className="">
            <ul className="nav-footer">
              <li>
                <a
                  href="/club/page_navig.asp?GRP=26389&amp;NS=PUBLIC"
                  className="title"
                >
                  About Pana Country Club
                </a>
              </li>
              <li>
                <a href="/club/scripts/view/view_directions.asp?NS=PUBLIC">
                  Contact &amp; Directions
                </a>
              </li>
            </ul>
            <ul className="nav-footer">
              <li>
                <a href="/club/scripts/library/view_document.asp?NS=WE&amp;DN=CLUBEVENTS">
                  Club Calendar
                </a>
              </li>
            </ul>
            <ul className="nav-footer">
              <li>
                <a
                  href="/club/page_navig.asp?GRP=26392&amp;NS=MEM"
                  className="title"
                >
                  Membership
                </a>
              </li>
              <li>
                <a href="/club/scripts/library/view_document.asp?NS=MEM&amp;DN=MEMCAT">
                  Membership Categories
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-offset-1 col-xs-12">
            <WeatherWidget
              apiKey={process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}
              geo={{ lat: '39.3787', long: '-89.0766' }}
            />
          </div>
        </div>
      </div>
      <div className="copy">
        <a itemProp="url" href="//www.panacountryclub.com/"></a>
        <span itemProp="name">Pana Country Club</span> |
        <span
          itemProp="address"
          itemScope=""
          itemType="//schema.org/PostalAddress"
        >
          <span itemProp="streetAddress">411 E 9th St, Pana, IL 62557</span>,
          <span itemProp="addressLocality">Pana</span>,
          <span itemProp="addressRegion">IL</span>
          <span itemProp="postalCode">62557</span> |
          <span itemProp="telephone">(217) 562-2641</span>
        </span>
        <div itemProp="geo" itemScope="" itemType="//schema.org/GeoCoordinates">
          <meta itemProp="latitude" content="39.3787" />
          <meta itemProp="longitude" content="89.0766" />
          <meta itemProp="elevation" content="213m" />
        </div>
      </div>
    </footer>
  );
};

export { Footer };
