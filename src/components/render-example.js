import React from 'react';
import {Link} from 'gatsby';
import {TippySingleton} from './layout';
import Tippy from '@tippy.js/react';
import rehypeReact from 'rehype-react';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {Tooltip: Tooltip, Link},
}).Compiler;

const renderAstNoTooltip = new rehypeReact({
  createElement: React.createElement,
  components: {Tooltip: NoTooltip, Link},
}).Compiler;

function NoTooltip(props) {
  return <span>{props.children}</span>;
}

function Tooltip(props) {
  const singleton = React.useContext(TippySingleton);
  return (
    <Tippy content={renderAst(props.content)} singleton={singleton}>
      <span>{props.children}</span>
    </Tippy>
  );
}

const RenderExample = React.forwardRef(({queryAst, noTooltips}, ref) => {
  const render = noTooltips ? renderAstNoTooltip : renderAst;
  return <pre ref={ref}>{render(queryAst)}</pre>;
});

export default RenderExample;
