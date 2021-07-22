import React from 'react';
import {Link, graphql} from 'gatsby';
import {Box, Heading, Paragraph, Text} from 'grommet';
import Seo from '../components/seo';
import Description from '../components/description';

export const query = graphql`
  query ObjectsPageQuery {
    types: objectTypes {
      name
      slug
      descriptionAst
    }
  }
`;

const Objects = ({data}) => (
  <>
    <Seo title="GraphQL Objects" />
    <Box pad="medium" elevation="small" background="white">
      <Heading margin="none" level={3}>
        GraphQL Objects
      </Heading>
      <Paragraph fill size="small">
        The most basic components of a GraphQL schema are object types, which
        just represent a kind of object you can fetch from your service, and
        what fields it has.
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

export default Objects;
