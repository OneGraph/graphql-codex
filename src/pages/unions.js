import React from 'react';
import {Link, graphql} from 'gatsby';
import {Box, Heading, Paragraph, Text} from 'grommet';
import SEO from '../components/seo';
import Description from '../components/description';

export const query = graphql`
  query UnionsPageQuery {
    types: unionTypes {
      name
      slug
      descriptionAst
    }
  }
`;

export default ({data}) => (
  <>
    <SEO title="GraphQL Unions" />
    <Box elevation="small" background="white" pad="medium">
      <Heading margin="none" level={3}>
        GraphQL Unions
      </Heading>
      <Paragraph size="small" fill>
        Union types in GraphQL allow a single field to a number of different
        types.
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
