import React from 'react';
import {graphql} from 'gatsby';
import TypeBox from '../components/type-box';
import Head from '../components/head';
import Description from '../components/description';
import {Text} from 'grommet';

const Enum = ({data}) => {
  const type = data.type;
  return (
    <>
      <TypeBox type={type}>
        <Head label="VALUES" />
        {type.values.map(v => (
          <div k={v.name}>
            <Text size="small" className="kind-EnumValue">
              {v.name}
            </Text>
            <Text size="small">
              <Description ast={v.descriptionAst} />
            </Text>
          </div>
        ))}
      </TypeBox>
    </>
  );
};

export const query = graphql`
  query($name: String!) {
    type(name: $name) {
      ...TypeBoxFields
      ... on GraphQLEnumType {
        values {
          name
          descriptionAst
        }
      }
    }
  }
`;

export default Enum;
