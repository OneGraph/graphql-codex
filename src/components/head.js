import React from 'react';
import {Box, Text} from 'grommet';

export default function Head({label, children}) {
  return (
    <Box
      direction="row"
      border={{side: 'bottom', size: 'xsmall', color: '#D1D1D1'}}
      margin={{bottom: 'small'}}
      align="baseline">
      <Text color="#999999" size="small">
        {label}
      </Text>
      {children}
    </Box>
  );
}
