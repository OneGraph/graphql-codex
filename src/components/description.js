import React from 'react';
import rehypeReact from 'rehype-react';

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

function Description({ast}) {
  return renderAst(ast);
}

export default Description;
