import React from 'react';
import {Link, graphql} from 'gatsby';
import {Box, Heading, Paragraph, Text} from 'grommet';
import Seo from '../components/seo';
import Description from '../components/description';

export const query = graphql`
  query InterfacesPageQuery {
    types: interfaceTypes {
      name
      slug
      descriptionAst
    }
  }
`;

const Interfaces = ({data}) => (
  <>
    <Seo title="GraphQL Interfaces" />
    <Box pad="medium" elevation="small" background="white">
      <Heading margin="none" level={3}>
        GraphQL Interfaces
      </Heading>
      <Paragraph size="small" fill>
        Like many type systems, GraphQL supports interfaces. An Interface is an
        abstract type that includes a certain set of fields that a type must
        include to implement the interface.
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

export default Interfaces;
