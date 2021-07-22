import React from 'react';
import Seo from '../components/seo';
import {
  Anchor,
  Box,
  Heading,
  Text,
  Form,
  FormField,
  TextInput,
  Button,
  Paragraph,
} from 'grommet';

const DOC_ID = '33b2a41e-928d-4635-b2d3-20d9d1c1f20b';

async function subscribeToList({email, firstName, lastName}) {
  const resp = await fetch(
    'https://serve.onegraph.com/graphql?app_id=8df48b07-4ad5-4e35-b8d7-2bad3774400f',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        doc_id: DOC_ID,
        variables: {
          email,
          firstName,
          lastName,
        },
      }),
    },
  );
  const json = await resp.json();
  const body = json?.data?.mailchimp?.makeRestCall?.post?.jsonBody;
  if (!body) {
    throw new Error('unknown error');
  }
  if (body.email_address) {
    return;
  }
  const errors = json?.data?.mailchimp?.makeRestCall?.post?.jsonBody?.errors;

  if (errors) {
    if (errors.find(e => e.field === 'email_address')) {
      throw new Error('invalid email');
    } else {
      throw new Error('unknown error');
    }
  }

  const errorDetail = body.detail;
  if (errorDetail) {
    throw new Error(errorDetail);
  }
}

function Signup() {
  const [formFields, setFormFields] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  if (success) {
    return (
      <Box>
        <Heading level={4} margin="none">
          Signed up!
        </Heading>
        <Text margin={{top: 'small'}} size="small">
          Check your email for the confirmation.
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      <Box>
        <Form
          errors={error ? {email: error} : {}}
          value={formFields}
          onSubmit={async e => {
            e.stopPropagation();
            e.preventDefault();
            setIsLoading(true);
            setError(null);
            try {
              await subscribeToList(formFields);
              setSuccess(true);
            } catch (e) {
              setError(
                `Error signing up: ${e.message}
                Email sayhi@onegraph.com for help.`,
              );
              console.error('Error signing up', e);
            } finally {
              setIsLoading(false);
            }
          }}>
          <FormField name="firstName˚">
            <TextInput
              disabled={isLoading}
              value={formFields.firstName}
              onChange={e =>
                setFormFields({
                  ...formFields,
                  firstName: e.target.value,
                })
              }
              placeholder="First name"
            />
          </FormField>
          <FormField name="lastName">
            <TextInput
              disabled={isLoading}
              value={formFields.lastName}
              onChange={e =>
                setFormFields({
                  ...formFields,
                  lastName: e.target.value,
                })
              }
              placeholder="Last name"
            />
          </FormField>
          <FormField name="email">
            <TextInput
              disabled={isLoading}
              value={formFields.email}
              onChange={e =>
                setFormFields({
                  ...formFields,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />
          </FormField>
          <Button disabled={isLoading} type="submit" label="Sign up" />
        </Form>
      </Box>
    </Box>
  );
}

function P({children}) {
  return (
    <Paragraph fill size="small">
      {children}
    </Paragraph>
  );
}

const SignupPage = ({data}) => {
  return (
    <>
      <Seo title="Sign up" />
      <Box pad="medium" elevation="small" background="white">
        <Heading margin="none" level={3}>
          Sign Up
        </Heading>
        <Box margin={{vertical: 'medium'}}>
          <P>
            The source for the schema reference is available on GitHub at{' '}
            <Anchor
              href="https://github.com/onegraph/graphql-docs"
              target="_blank"
              rel="noopener noreferrer">
              OneGraph/graphql-docs
            </Anchor>
            .
          </P>

          <P>
            If you{"'"}d like to have this schema reference for your GraphQL
            API, sign up below and we{"'"}ll help you get it set up!
          </P>
        </Box>
        <Text size="small">
          <Signup />
        </Text>
      </Box>
    </>
  );
};

export default SignupPage;
