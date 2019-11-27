import React from 'react';
import {graphql} from 'gatsby';
import TypeBox from '../components/type-box';

export default ({data}) => {
  const type = data.type;
  if (type.__typename !== 'GraphQLScalarType') {
    throw new Error('Unknown scalar ' + type.name);
  }
  return (
    <>
      <TypeBox type={type}></TypeBox>
    </>
  );
};

export const query = graphql`
  query($name: String!) {
    type(name: $name) {
      __typename
      ...TypeBoxFields
    }
  }
`;
