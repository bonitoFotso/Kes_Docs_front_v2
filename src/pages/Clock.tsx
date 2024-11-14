import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import Clock from '../sections/clock/Clock';

// ----------------------------------------------------------------------

export default function PageClock() {
  return (
    <>
      <Helmet>
        <title> {`Time - ${CONFIG.appName}`}</title>
        <meta
          name="description"
        />
      </Helmet>

      <Clock />
    </>
  );
}
