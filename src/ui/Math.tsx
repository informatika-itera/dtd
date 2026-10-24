import katex from 'katex';

const render = (tex: string, displayMode: boolean) =>
  katex.renderToString(tex, { displayMode, throwOnError: false });

export function M({ tex }: { tex: string }) {
  return <span dangerouslySetInnerHTML={{ __html: render(tex, false) }} />;
}

export function MathBlock({ tex }: { tex: string }) {
  return <div className="math-block" dangerouslySetInnerHTML={{ __html: render(tex, true) }} />;
}
