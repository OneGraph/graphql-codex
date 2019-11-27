import React from 'react';
import {Link, graphql} from 'gatsby';
import {Box, Heading, Text} from 'grommet';
import SEO from '../components/seo';
import Description from '../components/description';

export const query = graphql`
  query ScalarssPageQuery {
    types: scalarTypes {
      name
      slug
      descriptionAst
    }
  }
`;

export default ({data}) => (
  <>
    <SEO title="GraphQL Scalars" />
    <Box pad="medium" elevation="small" background="white">
      <Heading margin="none" level={3}>
        GraphQL Scalars
      </Heading>
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
