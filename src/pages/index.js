import React from 'react';
import {Link} from 'gatsby';
import {Heading, Paragraph, Box} from 'grommet';

import SEO from '../components/seo';

function P({children}) {
  return (
    <Paragraph fill size="small">
      {children}
    </Paragraph>
  );
}

export const query = graphql`
  query TypesQuery {
    queryType {
      name
      slug
    }
    mutationType {
      name
      slug
    }
    subscriptionType {
      name
      slug
    }
  }
`;

function IndexPage({data}) {
  const {queryType, mutationType, subscriptionType} = data;
  return (
    <>
      <SEO title="GraphQL Schema Reference" />
      <Box pad="medium" elevation="small" background="white">
        <Heading margin="none" level={3}>
          GraphQL Schema
        </Heading>
        <P>Welcome to the GraphQL API Reference.</P>
        <Heading margin="none" level={4}>
          About the reference
        </Heading>
        <P>
          This reference provides information about every type in the GraphQL
          Schema.
        </P>
        <P>
          Use the following links to get started, or browse the types in the
          sidebar.
        </P>
        {queryType ? (
          <P>
            <Link to={queryType.slug} className="kind-NamedType">
              {queryType.name}
            </Link>
            : the starting point for reading data.
          </P>
        ) : null}
        {mutationType ? (
          <P>
            <Link to={mutationType.slug} className="kind-NamedType">
              {mutationType.name}
            </Link>
            : the starting point for writing data.
          </P>
        ) : null}

        {subscriptionType ? (
          <P>
            <Link to={subscriptionType.slug} className="kind-NamedType">
              {subscriptionType.name}
            </Link>
            : the starting point for subscribing to new data.
          </P>
        ) : null}

        <P>
          If you have your own public GraphQL API,{' '}
          <Link to="/signup">learn more</Link> about how to create this schema
          reference for your API.
        </P>

        <Heading margin="none" level={4}>
          About GraphQL
        </Heading>
        <P>
          GraphQL is a query language for APIs and a runtime for fulfilling
          those queries with your existing data. GraphQL provides a complete and
          understandable description of the data in your API, gives clients the
          power to ask for exactly what they need and nothing more, makes it
          easier to evolve APIs over time, and enables powerful developer tools.
        </P>
        <P>
          Learn more about GraphQL at{' '}
          <a
            href="https://graphql.org"
            target="_blank"
            rel="noreferrer noopener">
            graphql.org
          </a>
          .
        </P>
      </Box>
    </>
  );
}

export default IndexPage;
