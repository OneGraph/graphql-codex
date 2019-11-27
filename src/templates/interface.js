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
        {type.possibleTypes.length ? (
          <Box margin={{top: 'medium'}}>
            <Head label="IMPLEMENTED BY" />
            <div>
              {type.possibleTypes.map(t => (
                <div key={t.name}>
                  <Text size="small">
                    <Link to={t.slug} className="kind-NamedType">
                      {t.name}
                    </Link>
                    <Description ast={t.descriptionAst} />
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
      ... on GraphQLInterfaceType {
        ...FieldsBoxFields
        possibleTypes {
          name
          slug
          descriptionAst
        }
      }
    }
  }
`;
