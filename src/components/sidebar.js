import {Link, useStaticQuery, graphql} from 'gatsby';
import React from 'react';
import {Box, Text, Button, Collapsible} from 'grommet';
import {FormDown, FormNext} from 'grommet-icons';
import {FixedSizeList} from 'react-window';

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

  const itemSize = 28;
  return (
    <FixedSizeList
      width="100%"
      height={Math.min(20, types.length) * 28 - (types.length > 20 ? 14 : 0)}
      itemCount={types.length}
      itemSize={itemSize}
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
          <div style={{height: 28 * 9}}>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/object/Query">
                <Text size="small">Query</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/object/Mutation">
                <Text size="small">Mutation</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/object/Subscription">
                <Text size="small">Subscription</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/objects">
                <Text size="small">All Objects</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/scalars">
                <Text size="small">All Scalars</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/interfaces">
                <Text size="small">All Interfaces</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/unions">
                <Text size="small">All Unions</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/enums">
                <Text size="small">All Enums</Text>
              </Link>
            </Box>
            <Box
              style={{height: 28}}
              pad={{left: '30px'}}
              border={{
                side: 'bottom',
                size: 'xsmall',
                color: 'rgba(209, 209, 209, 0.5)',
              }}>
              <Link to="/input-objects">
                <Text size="small">All Input Objects</Text>
              </Link>
            </Box>
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
