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

function IndexPage() {
  return (
    <>
      <SEO title="OneGraph GraphQL Schema Reference" />
      <Box pad="medium" elevation="small" background="white">
        <Heading margin="none" level={3}>
          OneGraph's GraphQL Schema
        </Heading>
        <P>Welcome to OneGraph's GraphQL API Reference.</P>
        <Heading margin="none" level={4}>
          About the reference
        </Heading>
        <P>
          This reference provides information about every type in OneGraph's
          GraphQL Schema.
        </P>
        <P>
          Use the following links to get started, or browse the types in the
          sidebar.
        </P>
        <P>
          <Link to="/object/Query" className="kind-NamedType">
            Query
          </Link>
          : the starting point for making read-only queries into the APIs that
          OneGraph supports.
        </P>

        <P>
          <Link to="/object/Mutation" className="kind-NamedType">
            Mutation
          </Link>
          : the starting point for writing data to the APIs that OneGraph
          supports.
        </P>

        <P>
          <Link to="/object/Subscription" className="kind-NamedType">
            Subscription
          </Link>
          : the starting point for subscribing to new data from the APIs that
          OneGraph supports.
        </P>

        <P>
          If you have your own public GraphQL API,{' '}
          <Link to="/signup">learn more</Link> about how to create this schema
          reference for your API.
        </P>

        <Heading margin="none" level={4}>
          About OneGraph
        </Heading>
        <P>
          OneGraph is the easiest way to build integrations with 3rd-party
          services. Connect Stripe, Salesforce, Zendesk, Twitter, GitHub, and
          more through one consistent GraphQL interface.
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
