const {
  TokenKind,
  visit,
  parse,
  TypeInfo,
  visitWithTypeInfo,
  buildClientSchema,
  GraphQLNamedType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  isObjectType,
  isInputObjectType,
  isUnionType,
  isInterfaceType,
  isScalarType,
  isEnumType,
  isListType,
  isNonNullType,
  getNamedType,
} = require('graphql');
const path = require(`path`);
const fs = require('fs');
const Remark = require(`remark`);
const visitRemark = require('unist-util-visit');
const toHAST = require(`mdast-util-to-hast`);
const fetch = require('node-fetch');
const crypto = require('crypto');

const List = GraphQLList;
const NonNull = GraphQLNonNull;
const String = GraphQLString;
const Boolean = GraphQLBoolean;
const ID = GraphQLID;

const schema = buildClientSchema(
  JSON.parse(fs.readFileSync('./schema.json', 'UTF-8')),
);

function classifyTypes(schema) {
  const scalars = [];
  const objects = [];
  const interfaces = [];
  const unions = [];
  const enums = [];
  const inputObjects = [];
  const allTypes = [];
  const typeMap = schema.getTypeMap();
  const keys = Object.keys(typeMap);
  keys.sort((a, b) => a.localeCompare(b));

  const requiredBy = {};
  for (const k of keys) {
    requiredBy[k] = new Set();
  }
  const addRequiredBy = type => {
    const fields = type.getFields();
    for (const k of Object.keys(fields)) {
      const field = fields[k];
      requiredBy[getNamedType(field.type).name].add(type);
    }
  };

  for (const k of keys) {
    const type = typeMap[k];
    if (type.name.startsWith('__')) {
      continue;
    }
    allTypes.push(type);
    if (isObjectType(type)) {
      objects.push(type);
      addRequiredBy(type);
    } else if (isInputObjectType(type)) {
      inputObjects.push(type);
      addRequiredBy(type);
    } else if (isUnionType(type)) {
      unions.push(type);
    } else if (isEnumType(type)) {
      enums.push(type);
    } else if (isInterfaceType(type)) {
      interfaces.push(type);
      addRequiredBy(type);
    } else if (isScalarType(type)) {
      scalars.push(type);
    } else {
      throw new Error('Unhandled type for ' + type.name);
    }
  }

  for (const k of keys) {
    const required = [...requiredBy[k]];
    required.sort((a, b) => a.name.localeCompare(b.name));
    requiredBy[k] = required;
  }

  return {
    allTypes,
    scalars,
    objects,
    interfaces,
    unions,
    enums,
    inputObjects,
    requiredBy,
  };
}

const classified = classifyTypes(schema);

function slugForType(type) {
  switch (type.constructor) {
    case GraphQLObjectType:
      return `/object/${type.name}`;
    case GraphQLInputObjectType:
      return `/input-object/${type.name}`;
    case GraphQLUnionType:
      return `/union/${type.name}`;
    case GraphQLEnumType:
      return `/enum/${type.name}`;
    case GraphQLInterfaceType:
      return `/interface/${type.name}`;
    case GraphQLScalarType:
      return `/scalar/${type.name}`;
    default:
      throw new Error('Unhandled type for ' + type.name);
  }
}

const remark = new Remark().data('settings', {
  commonmark: true,
  pedantic: true,
  position: false,
});

const descriptionAstCache = new Map();

const noDescriptionAst = toHAST(remark.parse('_No description_'));

function makeDescriptionAst(x) {
  if (descriptionAstCache.has(x)) {
    return descriptionAstCache.get(x);
  }
  if (!x.description) {
    return noDescriptionAst;
  }
  const md = x.description;
  const res = toHAST(remark.parse(md));
  descriptionAstCache.set(x, res);
  return res;
}

function makeFieldDescriptionAstImpl(f) {
  if (!f.description) {
    const type = getNamedType(f.type);
    if (!isScalarType(type)) {
      return makeDescriptionAst(type);
    }
  }
  return makeDescriptionAst(f);
}

function makeFieldDescriptionAst(f) {
  if (descriptionAstCache.has(f)) {
    return descriptionAstCache.get(f);
  }

  const res = makeFieldDescriptionAstImpl(f);
  descriptionAstCache.set(f, res);
  return res;
}

function fieldIsBeta(f) {
  return f.deprecationReason ? f.deprecationReason.startsWith('Beta') : false;
}

function fieldIsDeprecated(f) {
  return fieldIsBeta(f) ? false : f.isDeprecated;
}

exports.createResolvers = ({createResolvers, intermediateSchema}) => {
  const Example = intermediateSchema.getType('Example');
  const JSON = intermediateSchema.getType('JSON');
  const NamedType = new GraphQLInterfaceType({
    name: 'GraphQLNamedType',
    fields: () => ({
      name: {
        type: NonNull(String),
      },
      slug: {type: NonNull(String)},
      description: {type: String},
      descriptionAst: {type: NonNull(JSON)},
      requiredBy: {type: NonNull(List(NonNull(NamedType)))},
      examples: {type: NonNull(List(NonNull(Example)))},
    }),
    resolveType(type) {
      switch (type.constructor) {
        case GraphQLObjectType:
          return ObjectType;
        case GraphQLInputObjectType:
          return InputObjectType;
        case GraphQLUnionType:
          return UnionType;
        case GraphQLEnumType:
          return EnumType;
        case GraphQLInterfaceType:
          return InterfaceType;
        case GraphQLScalarType:
          return ScalarType;
        default:
          throw new Error('Unhandled type for ' + type.name);
      }
    },
  });

  const descriptionAst = {
    type: NonNull(JSON),
    resolve(x) {
      return makeDescriptionAst(x);
    },
  };

  const namedFields = {
    name: {
      type: NonNull(String),
      resolve(t) {
        return t.name;
      },
    },
    slug: {
      type: NonNull(String),
      resolve(t) {
        return slugForType(t);
      },
    },
    description: {
      type: String,
      resolve(t) {
        return t.description;
      },
    },
    descriptionAst,
    requiredBy: {
      type: NonNull(List(NonNull(NamedType))),
      resolve(t) {
        return classified.requiredBy[t.name];
      },
    },
    examples: {
      type: NonNull(List(NonNull(Example))),
      resolve(t, args, context) {
        return context.nodeModel
          .runQuery({
            query: {
              filter: {
                typesUsedNames: {eq: t.name},
              },
            },
            type: 'Example',
            firstOnly: false,
          })
          .then(res => res || []);
      },
    },
  };

  const Type = new GraphQLUnionType({
    name: 'GraphQLType',
    types: () => [
      NonNullType,
      ListType,
      ObjectType,
      InputObjectType,
      EnumType,
      ScalarType,
      UnionType,
      InterfaceType,
    ],
    resolveType(type) {
      switch (type.constructor) {
        case GraphQLNonNull:
          return NonNullType;
        case GraphQLList:
          return ListType;
        case GraphQLObjectType:
          return ObjectType;
        case GraphQLInputObjectType:
          return InputObjectType;
        case GraphQLUnionType:
          return UnionType;
        case GraphQLEnumType:
          return EnumType;
        case GraphQLInterfaceType:
          return InterfaceType;
        case GraphQLScalarType:
          return ScalarType;
        default:
          throw new Error('Unhandled type for ' + type.name);
      }
    },
  });

  const NonNullType = new GraphQLObjectType({
    name: 'GraphQLNonNullType',
    fields: {
      ofType: {
        type: NonNull(Type),
        resolve(t) {
          return t.ofType;
        },
      },
    },
  });
  const ListType = new GraphQLObjectType({
    name: 'GraphQLListType',
    fields: {
      ofType: {
        type: NonNull(Type),
        resolve(t) {
          return t.ofType;
        },
      },
    },
  });

  const Field = new GraphQLObjectType({
    name: 'GraphQLField',
    fields: {
      name: {
        type: NonNull(String),
        resolve(f) {
          return f.name;
        },
      },
      description: {
        type: String,
        resolve(f) {
          return f.description;
        },
      },
      descriptionAst: {
        type: NonNull(JSON),
        resolve(f) {
          return makeFieldDescriptionAst(f);
        },
      },
      isBeta: {
        type: NonNull(Boolean),
        resolve(f) {
          return fieldIsBeta(f);
        },
      },
      isDeprecated: {
        type: NonNull(Boolean),
        resolve(f) {
          return fieldIsDeprecated(f);
        },
      },
      deprecationReason: {
        type: String,
        resolve(f) {
          return f.deprecationReason;
        },
      },
      type: {
        type: NonNull(Type),
        resolve(f) {
          return f.type;
        },
      },
    },
  });

  const HasFieldsInterface = new GraphQLInterfaceType({
    name: 'GraphQLHasFieldsType',
    fields: {
      fields: {
        type: NonNull(List(NonNull(Field))),
      },
      deprecatedFields: {
        type: NonNull(List(NonNull(Field))),
      },
    },
    resolveType(type) {
      if (isObjectType(type)) {
        return ObjectType;
      } else if (isInputObjectType(type)) {
        return InputObjectType;
      } else if (isInterfaceType(type)) {
        return InterfaceType;
      } else {
        throw new Error('Unhandled type for ' + type.name);
      }
    },
  });

  const fieldsField = {
    fields: {
      type: NonNull(List(NonNull(Field))),
      resolve(t) {
        const fieldMap = t.getFields();
        const fields = Object.values(fieldMap);
        return fields
          .filter(x => !fieldIsDeprecated(x))
          .sort((a, b) => a.name.localeCompare(b.name));
      },
    },
    deprecatedFields: {
      type: NonNull(List(NonNull(Field))),
      resolve(t) {
        const fieldMap = t.getFields();
        const fields = Object.values(fieldMap);
        return fields
          .filter(x => fieldIsDeprecated(x))
          .sort((a, b) => a.name.localeCompare(b.name));
      },
    },
  };

  const ObjectType = new GraphQLObjectType({
    name: 'GraphQLObjectType',
    interfaces: [NamedType, HasFieldsInterface],
    fields: () => ({
      interfaces: {
        type: NonNull(List(NonNull(InterfaceType))),
        resolve(t) {
          return t.getInterfaces();
        },
      },
      ...namedFields,
      ...fieldsField,
    }),
  });
  const InputObjectType = new GraphQLObjectType({
    name: 'GraphQLInputObjectType',
    interfaces: [NamedType, HasFieldsInterface],
    fields: {
      ...namedFields,
      ...fieldsField,
    },
  });
  const UnionType = new GraphQLObjectType({
    name: 'GraphQLUnionType',
    interfaces: [NamedType],
    fields: {
      ...namedFields,
      possibleTypes: {
        type: NonNull(List(NonNull(ObjectType))),
        resolve(t) {
          return schema.getPossibleTypes(t);
        },
      },
    },
  });
  const EnumValue = new GraphQLObjectType({
    name: 'GraphQLEnumValue',
    fields: {
      name: {
        type: NonNull(String),
        resolve(t) {
          return t.name;
        },
      },
      description: {
        type: String,
        resolve(t) {
          return t.description;
        },
      },
      descriptionAst,
    },
  });
  const EnumType = new GraphQLObjectType({
    name: 'GraphQLEnumType',
    interfaces: [NamedType],
    fields: {
      ...namedFields,
      values: {
        type: NonNull(List(NonNull(EnumValue))),
        resolve(t) {
          return t.getValues();
        },
      },
    },
  });
  const InterfaceType = new GraphQLObjectType({
    name: 'GraphQLInterfaceType',
    interfaces: [NamedType, HasFieldsInterface],
    fields: {
      possibleTypes: {
        type: NonNull(List(NonNull(ObjectType))),
        resolve(t) {
          return schema.getPossibleTypes(t);
        },
      },
      ...namedFields,
      ...fieldsField,
    },
  });
  const ScalarType = new GraphQLObjectType({
    name: 'GraphQLScalarType',
    interfaces: [NamedType],
    fields: {
      ...namedFields,
    },
  });

  const resolvers = {
    Example: {
      typesUsed: {
        type: NonNull(List(NonNull(NamedType))),
        resolve(e) {
          return e.typesUsedNames.map(t => schema.getType(t));
        },
      },
      queryAst: {
        type: NonNull(JSON),
        resolve(e) {
          return createQueryAst(e.rawQuery);
        },
      },
      descriptionAst,
    },
    Query: {
      objectTypes: {
        type: NonNull(List(NonNull(ObjectType))),
        resolve(source, args, context, info) {
          return classified.objects;
        },
      },
      inputObjectTypes: {
        type: NonNull(List(NonNull(InputObjectType))),
        resolve(source, args, context, info) {
          return classified.inputObjects;
        },
      },
      unionTypes: {
        type: NonNull(List(NonNull(UnionType))),
        resolve(source, args, context, info) {
          return classified.unions;
        },
      },
      enumTypes: {
        type: NonNull(List(NonNull(EnumType))),
        resolve(source, args, context, info) {
          return classified.enums;
        },
      },
      interfaceTypes: {
        type: NonNull(List(NonNull(InterfaceType))),
        resolve(source, args, context, info) {
          return classified.interfaces;
        },
      },
      scalarTypes: {
        type: NonNull(List(NonNull(ScalarType))),
        resolve(source, args, context, info) {
          return classified.scalars;
        },
      },
      types: {
        type: NonNull(List(NonNull(NamedType))),
        resolve(source, args, context, info) {
          return classified.allTypes;
        },
      },
      type: {
        type: NonNull(NamedType),
        args: {
          name: {
            type: NonNull(String),
          },
        },
        resolve(source, args, context, info) {
          return schema.getType(args.name);
        },
      },
    },
  };
  createResolvers(resolvers);
};

function typeUsagesWithin(doc) {
  const s = new Set();
  const typeInfo = new TypeInfo(schema);

  visit(
    doc,
    visitWithTypeInfo(typeInfo, {
      enter(node) {
        const type = typeInfo.getType();
        const inputType = typeInfo.getInputType();
        if (type) {
          s.add(getNamedType(type).name);
        }
        if (inputType) {
          s.add(getNamedType(inputType).name);
        }
      },
    }),
  );
  return s;
}

function typeLink(type) {
  if (isNonNullType(type)) {
    return {
      type: 'element',
      tagName: 'span',
      children: [typeLink(type.ofType), {type: 'text', value: '!'}],
    };
  }
  if (isListType(type)) {
    return {
      type: 'element',
      tagName: 'span',
      children: [
        {type: 'text', value: '['},
        typeLink(type.ofType),
        {type: 'text', value: ']'},
      ],
    };
  }
  return {
    type: 'element',
    tagName: 'Link',
    properties: {
      to: slugForType(type),
      className: ['kind-NamedType'],
    },
    children: [{type: 'text', value: type.name}],
  };
}

function createQueryAst(query) {
  const parsed = parse(query);
  const tokenTypeInfo = new Map();
  const typeInfo = new TypeInfo(schema);
  visit(
    parsed,
    visitWithTypeInfo(typeInfo, {
      enter(node) {
        if (node.kind !== 'Name') {
          const loc = node.loc;
          if (loc) {
            tokenTypeInfo.set(loc.startToken, {
              type: typeInfo.getType(),
              inputType: typeInfo.getInputType(),
              parentType: typeInfo.getParentType(),
              parentInputType: typeInfo.getParentInputType(),
              fieldDef: typeInfo.getFieldDef(),
              argument: typeInfo.getArgument(),
              enumValue: typeInfo.getEnumValue(),
              node,
            });
          }
        }
      },
    }),
  );

  let tok = parsed.loc.startToken;
  const res = [];
  while (tok && tok.kind !== TokenKind.EOF) {
    const {value, kind} = tok;
    let nextValue = '';
    let nextEl = null;
    switch (kind) {
      case '<SOF>': {
        break;
      }
      case '<EOF>': {
        break;
      }
      case '!':
      case '$':
      case '&':
      case '(':
      case ')':
      case '...':
      case ':':
      case '=':
      case '@':
      case '[':
      case ']':
      case '{':
      case '|':
      case '}': {
        nextValue = kind;
        nextEl = {type: 'text', value: kind};
        break;
      }
      case 'Name':
      case 'Int':
      case 'Float':
      case 'String': {
        if (value) {
          const {
            node,
            type,
            inputType,
            fieldDef,
            parentType,
            parentInputType,
            argument,
            enumValue,
          } = tokenTypeInfo.get(tok) || {};
          const nodeKind = node ? node.kind : null;
          nextEl = {
            type: 'element',
            tagName: 'span',
            properties: {className: nodeKind ? [`kind-${nodeKind}`] : []},
            children: [
              {
                type: 'text',
                value: kind === 'String' ? JSON.stringify(value) : value,
              },
            ],
          };
          const tokenType = inputType || type;
          const field = enumValue || argument || fieldDef;
          if (tokenType) {
            nextEl = {
              type: 'element',
              tagName: 'span',
              children: [
                {
                  type: 'element',
                  tagName: 'Tooltip',
                  properties: {
                    content: {
                      type: 'root',
                      children: [
                        {
                          type: 'element',
                          tagName: 'div',
                          properties: {
                            style: {
                              fontFamily: 'sans-serif',
                              whiteSpace: 'pre-wrap',
                            },
                          },
                          children: [
                            field
                              ? {
                                  type: 'element',
                                  tagName: 'span',
                                  children: [
                                    enumValue
                                      ? typeLink(getNamedType(tokenType))
                                      : typeLink(
                                          getNamedType(
                                            parentInputType || parentType,
                                          ),
                                        ),

                                    {type: 'text', value: '.'},
                                    {
                                      type: 'element',
                                      tagName: 'span',
                                      properties: {
                                        className: enumValue
                                          ? ['kind-EnumValue']
                                          : [],
                                      },
                                      children: [
                                        {type: 'text', value: field.name},
                                      ],
                                    },

                                    {
                                      type: 'text',
                                      value: enumValue ? '' : ': ',
                                    },
                                  ],
                                }
                              : null,
                            enumValue ? null : typeLink(tokenType),
                            field
                              ? {
                                  type: 'element',
                                  tagName: 'div',
                                  children: makeFieldDescriptionAst(field)
                                    .children,
                                }
                              : null,
                          ].filter(x => x),
                        },
                      ],
                    },
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'span',
                      properties: {
                        className: nodeKind ? [`kind-${nodeKind}`] : [],
                      },
                      children: [
                        {
                          type: 'text',
                          value:
                            kind === 'String' ? JSON.stringify(value) : value,
                        },
                      ],
                    },
                  ],
                },
              ],
            };
          }
          nextValue = kind === 'String' ? JSON.stringify(value) : value;
        }
        break;
      }
      case 'BlockString': {
        if (value) {
          nextValue = printBlockString(value, ''.padStart(tok.column - 1));
          nextEl = {type: 'text', value: nextValue};
        }
        break;
      }
      case 'Comment': {
        if (value) {
          nextValue += '#' + value;
          nextEl = {
            type: 'element',
            tagName: 'span',
            properties: {className: ['comment']},
            children: [{type: 'text', value: nextValue}],
          };
        }
        break;
      }
      default: {
        throw new Error('Unknown kind ' + kind);
      }
    }
    if (nextEl) {
      res.push(nextEl);
    }
    const nextTok = tok.next;
    if (nextTok) {
      if (nextTok.line > tok.line && tok.line > 0) {
        res.push({type: 'text', value: '\n'});
        const whitespace = nextTok.column - 1;
        if (whitespace > 0) {
          res.push({type: 'text', value: ''.padStart(whitespace)});
        }
      } else if (tok.column > 0) {
        const whitespace = nextTok.column - (tok.column + nextValue.length);
        if (whitespace === 2) {
          res.push({type: 'text', value: ', '});
        } else if (whitespace > 0) {
          res.push({type: 'text', value: ''.padStart(whitespace)});
        }
      }
    }
    tok = nextTok;
  }
  return {type: 'root', children: res};
}

async function ogFetch({query, variables, operationName}) {
  const res = await fetch(
    'https://serve.onegraph.com/graphql?app_id=8df48b07-4ad5-4e35-b8d7-2bad3774400f',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({query, variables, operationName}),
    },
  );
  const json = await res.json();
  if (json.errors) {
    console.error('Error sending gql request to onegraph', json.errors);
    throw new Error('GQL request failed');
  }
  return json.data;
}

const shortenQueryMutation = `
  mutation ShortenQuery($query: String!) {
    oneGraph {
      createShortenedUrl(input: {query: $query}) {
        shortenedUrl {
          id
        }
      }
    }
  }
`;

async function onCreateNode(arg) {
  const {node, getNode, actions, createNodeId, cache} = arg;
  const {createNode} = actions;
  if (node.internal.type === 'MarkdownRemark' && node.parent) {
    const file = getNode(node.parent);
    if (file.sourceInstanceName === 'examples') {
      let query = null;
      function attacher() {
        return transformer;
        function transformer(ast, file) {
          visitRemark(ast, 'code', visitor);
          function visitor(node) {
            if (node.lang === 'gql' || node.lang === 'graphql') {
              if (query) {
                throw new Error('Multiple queries in file ' + file.name);
              }
              query = node.value;
            }
          }
        }
      }
      Remark()
        .use(attacher)
        .process(node.rawMarkdownBody, (err, file) => {
          if (err) {
            throw err;
          }
        });
      if (!query) {
        throw new Error('Missing query in file ' + file.name);
      }

      const queryDigest = crypto
        .createHash(`md5`)
        .update(query)
        .digest(`hex`);

      const queryCacheKey = `short-graphiql-url-${queryDigest}`;

      let shortId = await cache.get(queryCacheKey);
      if (!shortId) {
        const shortIdResult = await ogFetch({
          query: shortenQueryMutation,
          variables: {query},
        });
        shortId = shortIdResult.oneGraph.createShortenedUrl.shortenedUrl.id;
        if (!shortId) {
          throw new Error('Shortening URL did not work');
        }
        await cache.set(queryCacheKey, shortId);
      }

      const parsed = parse(query);

      const typesUsed = typeUsagesWithin(parsed);

      const nodeId = createNodeId(`Example-${file.name}`);
      createNode({
        id: nodeId,
        parent: node.id,
        internal: {
          type: 'Example',
          contentDigest: node.internal.contentDigest,
        },
        slug: `/example/${file.name}`,
        // XXX: ensure description is there
        description: node.frontmatter.description,
        rawQuery: query,
        name: file.name, // XXX: fix and validate example matches file name
        typesUsedNames: [...typesUsed],
        graphiqlUrl: `https://www.onegraph.com/graphiql?shortenedId=${shortId}`,
      });
    }
  }
}
exports.onCreateNode = onCreateNode;

const createTypePages = async ({graphql, actions}) => {
  const {createPage, createRedirect} = actions;
  const result = await graphql(`
    query {
      types {
        __typename
        name
        slug
      }
    }
  `);
  const componentForType = {
    GraphQLObjectType: path.resolve(`./src/templates/object.js`),
    GraphQLInputObjectType: path.resolve(`./src/templates/input-object.js`),
    GraphQLUnionType: path.resolve(`./src/templates/union.js`),
    GraphQLEnumType: path.resolve(`./src/templates/enum.js`),
    GraphQLInterfaceType: path.resolve(`./src/templates/interface.js`),
    GraphQLScalarType: path.resolve(`./src/templates/scalar.js`),
  };
  result.data.types.forEach(type => {
    createRedirect({
      fromPath: `/type/${type.name}`,
      toPath: type.slug,
      redirectInBrowser: false,
      isPermanent: true,
    });
    createPage({
      path: type.slug,
      component: componentForType[type.__typename],
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        name: type.name,
      },
    });
  });
};

const createExamplePages = async ({graphql, actions}) => {
  const {createPage} = actions;
  const result = await graphql(`
    query {
      allExample {
        nodes {
          id
          slug
        }
      }
    }
  `);
  const component = path.resolve(`./src/templates/example.js`);
  result.data.allExample.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        id: node.id,
      },
    });
  });
};

exports.createPages = async ({graphql, actions}) => {
  await createTypePages({graphql, actions});
  await createExamplePages({graphql, actions});
};
