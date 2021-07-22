import React from 'react';
import {graphql, Link} from 'gatsby';
import Head from '../components/head';
import {Box, Text, Heading, Anchor} from 'grommet';
import {Share} from 'grommet-icons';
import Description from '../components/description';
import RenderExample from '../components/render-example';
import Seo from '../components/seo';

const Example = ({data}) => {
  const {example} = data;
  return (
    <>
      <Seo title={example.name} />
      <Box pad="medium" elevation="small" background="white">
        <Heading margin="none" className="def" level={3}>
          {example.name}
        </Heading>
        <Text size="small">
          <Description ast={example.descriptionAst} />
        </Text>
        <Box
          margin={{vertical: 'medium'}}
          pad={{vertical: 'none', horizontal: 'small'}}
          background="rgb(248, 248, 248)">
          <Text size="xsmall">
            <RenderExample queryAst={example.queryAst} />
          </Text>
        </Box>
        <Box margin={{bottom: 'medium'}}>
          <Anchor target="_blank" size="small" href={example.graphiqlUrl}>
            View in GraphiQL <Share size="small" color="brand" />
          </Anchor>
        </Box>
        <Head label="Types used in this example" />
        {example.typesUsed.map(t => (
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
    </>
  );
};

export const query = graphql`
  query($id: String!) {
    example(id: {eq: $id}) {
      name
      queryAst
      graphiqlUrl
      descriptionAst
      typesUsed {
        name
        descriptionAst
        slug
      }
    }
  }
`;

export default Example;
