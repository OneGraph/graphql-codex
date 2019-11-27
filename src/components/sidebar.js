import {Link, useStaticQuery, graphql} from 'gatsby';
import React from 'react';
import {Box, Text, Button, Collapsible} from 'grommet';
import {FormDown, FormNext} from 'grommet-icons';
import {FixedSizeList} from 'react-window';

const ITEM_SIZE = 28;

function SidebarListTypesImpl({types}) {
  const Row = ({style, index}) => {
    const type = types[index];
    return (
      <Box
        style={style}
        pad={{left: '30px'}}
        border={{
          side: 'bottom',
          size: 'xsmall',
          color:
            index === types.length - 1
              ? 'transparent'
              : 'rgba(209, 209, 209, 0.5)',
        }}>
        <Link to={type.slug} className="kind-NamedType">
          <Text size="small">{type.name}</Text>
        </Link>
      </Box>
    );
  };

  return (
    <FixedSizeList
      width="100%"
      height={
        Math.min(20, types.length) * ITEM_SIZE -
        (types.length > 20 ? ITEM_SIZE / 2 : 0)
      }
      itemCount={types.length}
      itemSize={ITEM_SIZE}
      style={{
        overflowX: 'hidden',
        borderBottom: '1px solid #D1D1D1',
      }}>
      {Row}
    </FixedSizeList>
  );
}

const SidebarListTypes = React.memo(SidebarListTypesImpl);

function SidebarSection({section, open, classified, setActiveSection}) {
  const Icon = open ? FormDown : FormNext;
  let label = null;
  switch (section) {
    case 'objects':
      label = 'Objects';
      break;
    case 'scalars':
      label = 'Scalars';
      break;
    case 'interfaces':
      label = 'Interfaces';
      break;
    case 'unions':
      label = 'Unions';
      break;
    case 'enums':
      label = 'Enums';
      break;
    case 'inputObjects':
      label = 'Input Objects';
      break;
    default:
      // eslint-disable-next-line no-unused-expressions
      throw new Error('Unknown section ' + section);
  }
  return (
    <Box>
      <Box border={{side: 'bottom', size: 'xsmall', color: '#D1D1D1'}}>
        <Button
          onClick={() =>
            open ? setActiveSection(null) : setActiveSection(section)
          }>
          <Box direction="row" align="center" pad="xsmall">
            <Icon color="black" />
            <Text size="small" weight="bold">
              {label}
            </Text>
          </Box>
        </Button>
      </Box>
      <Collapsible open={open}>
        <SidebarListTypes types={classified[section]} />
      </Collapsible>
    </Box>
  );
}

function Sidebar() {
  const [activeSection, setActiveSection] = React.useState(null);

  const classified = useStaticQuery(graphql`
    query TypesForSidebar {
      objects: objectTypes {
        name
        slug
      }
      scalars: scalarTypes {
        name
        slug
      }
      interfaces: interfaceTypes {
        name
        slug
      }
      unions: unionTypes {
        name
        slug
      }
      enums: enumTypes {
        name
        slug
      }
      inputObjects: inputObjectTypes {
        name
        slug
      }
    }
  `);

  const schemaLinks = [
    {
      to: '/object/Query',
      text: 'Query',
    },
    {
      to: '/object/Mutation',
      text: 'Mutation',
    },
    {
      to: '/object/Subscription',
      text: 'Subscription',
    },
    {
      to: '/objects',
      text: 'All GraphQL Objects',
    },
    {
      to: '/scalars',
      text: 'All GraphQL Scalars',
    },
    {
      to: '/interfaces',
      text: 'All GraphQL Interfaces',
    },
    {
      to: '/unions',
      text: 'All GraphQL Unions',
    },
    {
      to: '/enums',
      text: 'All GraphQL Enums',
    },
    {
      to: '/input-objects',
      text: 'All GraphQL Input Objects',
    },
  ];

  return (
    <Box pad="none" elevation="small" background="white">
      <Box>
        <Box border={{side: 'bottom', size: 'xsmall', color: '#D1D1D1'}}>
          <Button
            onClick={() =>
              activeSection === 'schema'
                ? setActiveSection(null)
                : setActiveSection('schema')
            }>
            <Box direction="row" align="center" pad="xsmall">
              {activeSection === 'schema' ? (
                <FormDown color="black" />
              ) : (
                <FormNext color="black" />
              )}
              <Text size="small" weight="bold">
                Schema
              </Text>
            </Box>
          </Button>
        </Box>
        <Collapsible open={activeSection === 'schema'}>
          <div style={{height: ITEM_SIZE * schemaLinks.length}}>
            {schemaLinks.map(({to, text}) => (
              <Box
                key={to}
                style={{height: ITEM_SIZE}}
                pad={{left: '30px'}}
                border={{
                  side: 'bottom',
                  size: 'xsmall',
                  color: 'rgba(209, 209, 209, 0.5)',
                }}>
                <Link to={to}>
                  <Text size="small">{text}</Text>
                </Link>
              </Box>
            ))}
          </div>
        </Collapsible>
      </Box>

      {[
        'objects',
        'scalars',
        'interfaces',
        'unions',
        'enums',
        'inputObjects',
      ].map(section => (
        <SidebarSection
          key={section}
          section={section}
          open={activeSection === section}
          classified={classified}
          setActiveSection={setActiveSection}
        />
      ))}
    </Box>
  );
}

export default Sidebar;
