import React from 'react';
import {Box, Heading, Text} from 'grommet';
import {graphql, Link} from 'gatsby';
import Head from './head';
import Tippy from '@tippy.js/react';
import {TippySingleton} from './layout';
import RenderExample from './render-example';
import Description from './description';
import SEO from './seo';

export const query = graphql`
  fragment TypeBoxFields on GraphQLNamedType {
    name
    descriptionAst
    requiredBy {
      name
      slug
      descriptionAst
    }
    examples {
      name
      slug
      descriptionAst
      queryAst
    }
  }
`;

export default function TypeBox({type, children}) {
  const {requiredBy, examples} = type;
  const singleton = React.useContext(TippySingleton);
  return (
    <>
      <SEO title={type.name} />
      <Box pad="medium" elevation="small" background="white">
        <Heading margin="none" className="kind-NamedType" level={3}>
          {type.name}
        </Heading>
        <Text size="small">
          <Description ast={type.descriptionAst} />
        </Text>
        {examples.length ? (
          <Box margin={{top: 'medium'}}>
            <Head label="EXAMPLE USAGES" />
            {examples.map(example => (
              <div key={example.name}>
                <Text size="small">
                  <Link to={example.slug} className="def">
                    <Tippy
                      singleton={singleton}
                      content={
                        <Text size="xsmall">
                          <RenderExample
                            queryAst={example.queryAst}
                            noTooltips
                          />
                        </Text>
                      }>
                      <span>{example.name}</span>
                    </Tippy>
                  </Link>
                  <Description ast={example.descriptionAst} />
                </Text>
              </div>
            ))}
          </Box>
        ) : null}
        {children}
        {requiredBy.length ? (
          <Box margin={{top: 'medium'}}>
            <Head label="REQUIRED BY" />
            {requiredBy.map(type => (
              <div key={type.name}>
                <Text size="small">
                  <Link to={type.slug} className="kind-NamedType">
                    {type.name}
                  </Link>
                  <Description ast={type.descriptionAst} />{' '}
                </Text>
              </div>
            ))}
          </Box>
        ) : null}
      </Box>
    </>
  );
}
