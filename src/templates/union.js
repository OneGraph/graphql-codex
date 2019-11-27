import React from 'react';
import {graphql, Link} from 'gatsby';
import TypeBox from '../components/type-box';
import Head from '../components/head';
import Description from '../components/description';
import {Box, Text} from 'grommet';

export default ({data}) => {
  const type = data.type;
  return (
    <>
      <TypeBox type={type}>
        {type.possibleTypes.length ? (
          <Box margin={{top: 'medium'}}>
            <Head label="POSSIBLE TYPES" />
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
      ... on GraphQLUnionType {
        possibleTypes {
          name
          slug
          descriptionAst
        }
      }
    }
  }
`;
