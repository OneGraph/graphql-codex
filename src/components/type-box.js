import React from 'react';
import {Box, Heading, Text, Button} from 'grommet';
import {FormDown} from 'grommet-icons';
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

// baseCount - number of items to show initially
//             will only hide items if items.length > baseCount * 1.5
function ViewAllBox({items, baseCount, children}) {
  const [viewAll, setViewAll] = React.useState(items.length < baseCount * 1.5);
  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        display: 'block',
        height: '100%',
      }}>
      <Box>
        {items.slice(0, viewAll ? items.length : baseCount).map((item, i) => (
          <React.Fragment key={i}>{children(item)}</React.Fragment>
        ))}
      </Box>
      {viewAll ? null : (
        <Box
          height="8em"
          style={{
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
          }}
          direction="row"
          justify="center"
          align="end"
          background="linear-gradient(to bottom, rgba(255,255,255,0) 30%, rgba(255,255,255,1) 100%)">
          <Button
            plain
            onClick={() => setViewAll(true)}
            label={
              <Text color="brand" size="small">
                View All <FormDown size="small" color="brand" fill="brand" />
              </Text>
            }
          />
        </Box>
      )}
    </Box>
  );
}

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
            <ViewAllBox items={examples} baseCount={10}>
              {example => (
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
              )}
            </ViewAllBox>
          </Box>
        ) : null}
        {children}
        {requiredBy.length ? (
          <Box margin={{top: 'medium'}}>
            <Head label="REQUIRED BY" />
            <ViewAllBox items={requiredBy} baseCount={100}>
              {type => (
                <div>
                  <Text size="small">
                    <Link to={type.slug} className="kind-NamedType">
                      {type.name}
                    </Link>
                    <Description ast={type.descriptionAst} />{' '}
                  </Text>
                </div>
              )}
            </ViewAllBox>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
