import React from 'react';
import {Link, graphql} from 'gatsby';
import {Box, Heading, Paragraph, Text} from 'grommet';
import Seo from '../components/seo';
import Description from '../components/description';

export const query = graphql`
  query EnumsPageQuery {
    types: enumTypes {
      name
      slug
      descriptionAst
    }
  }
`;

const Enums = ({data}) => (
  <>
    <Seo title="GraphQL Enums" />
    <Box pad="medium" elevation="small" background="white">
      <Heading margin="none" level={3}>
        GraphQL Enums
      </Heading>
      <Paragraph size="small" fill>
        Enumeration types are a special kind of scalar that is restricted to a
        particular set of allowed values.
      </Paragraph>
      <Box margin={{top: 'medium'}}>
        {data.types.map(t => (
          <div key={t.name}>
            <Text size="small">
              <Link to={t.slug} className="kind-NamedType">
                {t.name}
              </Link>
              <Description ast={t.descriptionAst} />
            </Text>
          </div>
        ))}
      </Box>
    </Box>
  </>
);

export default Enums;
