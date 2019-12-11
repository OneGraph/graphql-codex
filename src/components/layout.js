/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Grommet, Box, Anchor, Text} from 'grommet';
import Sidebar from './sidebar';
import {useSingleton} from '@tippy.js/react';
import {withPrefix} from 'gatsby';

import './layout.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

const baseSpacing = 24;

const theme = {
  name: 'gql-docs',
  rounding: 4,
  spacing: baseSpacing,
  anchor: {
    fontWeight: 400,
  },
  global: {
    colors: {
      brand: '#E535AB',
      'accent-1': '#9a4d92',
      'accent-2': '#804079',
      'accent-3': '#e6cfe3',
      'accent-4': '#bf30b1',
      control: {
        light: '#E535AB',
        dark: '#E535AB',
      },
      focus: '#E535AB',
    },
    font: {
      family: '"Rubik"',
    },
    size: {
      xxsmall: `${baseSpacing * 2}px`, // 48
      xsmall: `${baseSpacing * 4}px`, // 96
      small: `${baseSpacing * 8}px`, // 192
      medium: `${baseSpacing * 14}px`, // 384
      large: `${baseSpacing * 30}px`, // 768
      xlarge: `${baseSpacing * 48}px`, // 1152
      xxlarge: `${baseSpacing * 64}px`, // 1536
      full: '100%',
    },
  },
};

export const TippySingleton = React.createContext(null);

const Layout = ({children}) => {
  const tippySingleton = useSingleton({
    delay: 150,
    theme: 'light-border',
    arrow: true,
    trigger: 'mouseenter focus click',
    placement: 'bottom',
    flipBehavior: ['bottom', 'right'],

    inertia: true,
    interactive: true,
    interactiveBorder: 10,
    duration: [75, 75],
    allowHTML: false,
    maxWidth: '50vw',
  });

  return (
    <TippySingleton.Provider value={tippySingleton}>
      <Grommet theme={theme}>
        <div className="layout">
          <Box className="header" gridArea="header">
            <Text>
              <Box
                style={{padding: '1em'}}
                elevation="small"
                background="white"
                direction="row"
                justify="stretch"
                fill>
                <Box direction="row" gap="small">
                  <Anchor href={withPrefix('/')}>Home</Anchor>
                </Box>
              </Box>
            </Text>
          </Box>
          <Box style={{maxWidth: 720}} gridArea="main">
            {children}
            {/* Prevent box from shrinking */}
            <div style={{visibility: 'hidden', wordBreak: 'break-word'}}>
              {''.padStart(100, '_')}
            </div>
          </Box>
          <Box style={{minWidth: 336}} gridArea="sidebar">
            <Sidebar />
          </Box>
        </div>
      </Grommet>
    </TippySingleton.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
