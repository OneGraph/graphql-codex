import React from 'react';
import {Link, graphql} from 'gatsby';
import {Box, Heading, Paragraph, Text} from 'grommet';
import Seo from '../components/seo';
import Description from '../components/description';

export const query = graphql`
  query InputObjectsPageQuery {
    types: inputObjectTypes {
      name
      slug
      descriptionAst
    }
  }
`;

const InputObjets = ({data}) => (
  <>
    <Seo title="GraphQL Input Objects" />
    <Box pad="medium" elevation="small" background="white">
      <Heading margin="none" level={3}>
        GraphQL Input Objects
      </Heading>
      <Paragraph size="small" fill>
        Input objects allow fields to take complex objects as arguments.
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

export default InputObjets;
