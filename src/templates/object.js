import React from 'react';
import {graphql, Link} from 'gatsby';
import TypeBox from '../components/type-box';
import FieldsBox from '../components/fields-box';
import Head from '../components/head';
import {Box, Text} from 'grommet';
import Description from '../components/description';

export default ({data}) => {
  const type = data.type;
  return (
    <>
      <TypeBox type={type}>
        <FieldsBox type={type} />
        {type.interfaces.length ? (
          <Box margin={{top: 'medium'}}>
            <Head label="IMPLEMENTS" />
            <div>
              {type.interfaces.map(i => (
                <div key={i.name}>
                  <Text size="small">
                    <Link to={i.slug} className="kind-NamedType">
                      {i.name}
                    </Link>
                    <Description ast={i.descriptionAst} />
                  </Text>
                </div>
              ))}
            </div>
          </Box>
        ) : null}
      </TypeBox>
    </>
  );
};

export const query = graphql`
  query($name: String!) {
    type(name: $name) {
      ...TypeBoxFields
      ... on GraphQLObjectType {
        ...FieldsBoxFields
        interfaces {
          name
          descriptionAst
          slug
        }
      }
    }
  }
`;
