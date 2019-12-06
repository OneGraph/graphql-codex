import React from 'react';
import Head from './head';
import {Box, Text, Button} from 'grommet';
import Tippy from '@tippy.js/react';
import {Link, graphql} from 'gatsby';
import Description from './description';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

export const query = graphql`
  fragment FieldsBoxFields on GraphQLHasFieldsType {
    fields {
      ...FieldFragment
    }
    deprecatedFields {
      ...FieldFragment
      deprecationReason
    }
  }

  fragment FieldFragment on GraphQLField {
    name
    descriptionAst
    isBeta
    ...FieldTypeFields
  }

  fragment NamedTypeFields on GraphQLNamedType {
    __typename
    name
    slug
  }

  fragment ListTypeFields on GraphQLListType {
    ofType {
      __typename
      ...NamedTypeFields
      ... on GraphQLNonNullType {
        __typename
        ofType {
          ...NamedTypeFields
          ... on GraphQLListType {
            __typename
            ofType {
              ...NamedTypeFields
              ... on GraphQLNonNullType {
                __typename
                ofType {
                  ...NamedTypeFields
                }
              }
            }
          }
        }
      }
      ... on GraphQLListType {
        __typename
        ofType {
          ...NamedTypeFields
          ... on GraphQLNonNullType {
            __typename
            ofType {
              ...NamedTypeFields
            }
          }
        }
      }
    }
  }

  fragment NonNullTypeFields on GraphQLNonNullType {
    ofType {
      __typename
      ...NamedTypeFields
      ...ListTypeFields
    }
  }

  fragment FieldTypeFields on GraphQLField {
    type {
      __typename
      ...NamedTypeFields
      ...ListTypeFields
      ...NonNullTypeFields
    }
  }
`;

function TypeLink({type}) {
  console.log('type', type);
  switch (type.__typename) {
    case 'GraphQLNonNullType':
      return (
        <span>
          <TypeLink type={type.ofType} />!
        </span>
      );
    case 'GraphQLListType':
      return (
        <span>
          [<TypeLink type={type.ofType} />]
        </span>
      );
    default:
      if (!type.slug) {
        throw new Error('No slug for type ' + type.__typename);
      }
      return (
        <Link to={type.slug} className="kind-NamedType">
          {type.name}
        </Link>
      );
  }
}

export default function FieldsBox({type: {fields, deprecatedFields}}) {
  const [showDeprecated, setShowDeprecated] = React.useState(false);
  return (
    <Box margin={{top: 'medium'}}>
      <Head label="FIELDS" />
      {fields.map(field => {
        console.log('field', field);
        const isBeta = field.isBeta;

        return (
          <div key={field.name}>
            <Text size="small">
              <span className="kind-Field">{field.name}</span>{' '}
              {isBeta ? (
                <Tippy
                  theme="light-border"
                  content="This field is still in beta while we work out the kinks">
                  <span>
                    <Text
                      color="rgba(244, 67, 54, 0.8)"
                      size="9px"
                      weight="bold">
                      BETA
                    </Text>
                  </span>
                </Tippy>
              ) : null}{' '}
              (
              <TypeLink type={field.type} />)
            </Text>
            <Text size="small">
              <Description ast={field.descriptionAst} />
            </Text>
          </div>
        );
      })}
      {deprecatedFields.length ? (
        <>
          <Head label="DEPRECATED FIELDS">
            <Button
              style={{visibility: showDeprecated ? 'visible' : 'hidden'}}
              plain
              margin={{left: '8px'}}
              onClick={() => setShowDeprecated(false)}
              label={
                <Text color="#999999" size="xsmall">
                  Hide
                </Text>
              }
            />
          </Head>
          {showDeprecated ? (
            deprecatedFields.map(field => (
              <div key={field.name}>
                <Text size="small">
                  <span className="kind-Field">{field.name}</span>{' '}
                  <TypeLink type={field.type} />
                </Text>
                {field.deprecationReason ? (
                  <div>
                    <Text size="small" color="status-error">
                      {field.deprecationReason}
                    </Text>
                  </div>
                ) : null}
                <Text size="small">
                  <Description ast={field.descriptionAst} />
                </Text>
              </div>
            ))
          ) : (
            <Button
              plain
              onClick={() => setShowDeprecated(true)}
              label={
                <Text style={{fontStyle: 'italic'}} size="small">
                  Show Deprecated
                </Text>
              }
            />
          )}
        </>
      ) : null}
    </Box>
  );
}
