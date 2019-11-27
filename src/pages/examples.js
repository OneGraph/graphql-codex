import React from 'react';
import {Link, graphql} from 'gatsby';
import SEO from '../components/seo';
import {Box, Heading, Text} from 'grommet';
import Description from '../components/description';

export const query = graphql`
  query ExamplesPageQuery {
    allExample {
      nodes {
        id
        descriptionAst
        rawQuery
        name
        slug
      }
    }
  }
`;

export default ({data}) => {
  return (
    <>
      <SEO title="Example Queries" />
      <Box pad="medium" elevation="small" background="white">
        <Heading margin="none" level={3}>
          Example queries
        </Heading>
        <Box margin={{top: 'medium'}}>
          {data.allExample.nodes.map(t => (
            <div key={t.name}>
              <Text size="small">
                <Link to={t.slug} className="def">
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
};
