import React from 'react';
import {graphql} from 'gatsby';
import TypeBox from '../components/type-box';
import FieldsBox from '../components/fields-box';

const InputObject = ({data}) => {
  const type = data.type;
  return (
    <>
      <TypeBox type={type}>
        <FieldsBox type={type} />
      </TypeBox>
    </>
  );
};

export const query = graphql`
  query($name: String!) {
    type(name: $name) {
      ...TypeBoxFields
      ... on GraphQLInputObjectType {
        ...FieldsBoxFields
      }
    }
  }
`;

export default InputObject;
