#!/usr/bin/env python3
"""One-shot porter: legacy root pertemuan-N.html (reveal.js, normalized) -> src/decks/pertemuan-NN.tsx.

Usage: python3 scripts/port-legacy.py 2 3 4 ...   (no args = all except 1)
The legacy deck is the content source of truth; the output is a readable TSX draft that is
meant to be hand-edited afterwards (this script is NOT part of the build).
"""
import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = Path(__file__).resolve().parent.parent

# emoji -> Material Symbols Rounded ligature name
ICONS = {
    '📝': 'edit_note', '📊': 'bar_chart', '💬': 'chat', '📱': 'smartphone', '⚙': 'settings', '💡': 'lightbulb',
    '🖥': 'desktop_windows', '🔒': 'lock', '🎯': 'target', '🔢': 'pin', '⚖': 'balance', '🌐': 'language',
    '🛒': 'shopping_cart', '🤖': 'smart_toy', '🖼': 'image', '📈': 'trending_up', '💰': 'payments', '🔄': 'sync',
    '🎨': 'palette', '🚀': 'rocket_launch', '🧠': 'psychology', '💾': 'save', '🎓': 'school', '📋': 'content_paste',
    '⚡': 'bolt', '📚': 'menu_book', '🛡': 'shield', '👁': 'visibility', '📄': 'description', '👤': 'person',
    '🏛': 'account_balance', '🔧': 'build', '📐': 'square_foot', '🔍': 'search', '📑': 'bookmarks', '🌍': 'public',
    '🔤': 'text_fields', '☁': 'cloud', '🔐': 'enhanced_encryption', '🤔': 'psychology_alt', '🛵': 'two_wheeler',
    '💳': 'credit_card', '📡': 'cell_tower', '🏥': 'local_hospital', '🏦': 'account_balance', '🌾': 'agriculture',
    '⚠': 'warning', '✂': 'content_cut', '🔗': 'link', '🖨': 'print', '🧮': 'calculate', '🧩': 'extension',
    '➕': 'add', '📏': 'straighten', '🎬': 'movie', '⌨': 'keyboard', '📧': 'mail', '🔊': 'volume_up',
    '🗄': 'database', '🏗': 'construction', '📰': 'newspaper', '😢': 'sentiment_dissatisfied', '🎣': 'phishing',
    '🏢': 'apartment', '🌱': 'eco', '❌': 'cancel', '✅': 'check_circle', '🗣': 'record_voice_over', '♻': 'recycling',
    '💭': 'chat_bubble', '💿': 'album', '📥': 'move_to_inbox', '📤': 'outbox', '🔌': 'electrical_services',
    '💧': 'water_drop', '📘': 'book', '📗': 'book', '📅': 'calendar_month', '🥧': 'pie_chart', '🔽': 'filter_alt',
    '📁': 'folder', '🔬': 'biotech', '🎭': 'theater_comedy', '⛓': 'link', '✉': 'mail', '🌀': 'cyclone',
    '🏁': 'flag', '🔘': 'radio_button_checked', '🗺': 'map', '🔀': 'shuffle', '📦': 'inventory_2', '⭐': 'star',
    '👥': 'group', '🐦': 'flutter_dash', '📸': 'photo_camera', '🎵': 'music_note', '📢': 'campaign', '🕐': 'schedule',
    '💼': 'work', '🚗': 'directions_car', '✍': 'edit', '🟢': 'circle', '🔴': 'circle', '🚫': 'block',
    '🦠': 'coronavirus', '🪱': 'pest_control', '🐴': 'bug_report', '🔑': 'key', '🛍': 'shopping_bag', '🎲': 'casino',
    '🧬': 'genetics', '🏭': 'factory', '✏': 'edit', '⬡': 'hexagon', '🏷': 'sell', '🔠': 'format_bold',
    '✒': 'ink_pen', '🖍': 'format_underlined', '↩': 'undo', '↪': 'redo', '🔖': 'bookmark', '🤝': 'handshake',
    '🧑': 'person', '🏠': 'home', '📞': 'call', '🔔': 'notifications', '🎤': 'mic', '🎮': 'sports_esports',
}
ICON_ONLY_EXTRA = {'©': 'copyright', '↔': 'swap_horiz'}
KEYCAP = re.compile(r'^(\d)\u20e3$')
EMOJI_RE = re.compile('(' + '|'.join(re.escape(k) for k in sorted(ICONS, key=len, reverse=True)) + ')')
JUNK = re.compile('[\ufe0f\u200d]')
missing_icons: set[str] = set()
unknown_classes: set[str] = set()
used: set[str] = set()   # components used in this deck
CUR = {'siblings': 0}    # number of content blocks on the slide being converted


def use(name: str) -> str:
    used.add(name)
    return name


def cls(el) -> list[str]:
    return el.get('class') or [] if isinstance(el, Tag) else []


def tags(el):
    return [c for c in el.children if isinstance(c, Tag)]


def attr(s: str) -> str:
    """JSX attribute value from a plain string."""
    s = JUNK.sub('', s).strip()
    if not any(ch in s for ch in '"\\{}<>\n') :
        return f'"{s}"'
    return '{' + json.dumps(s, ensure_ascii=False) + '}'


def esc(text: str) -> str:
    """Escape raw text for JSX children."""
    if any(ch in text for ch in '{}<>'):
        return '{' + json.dumps(text, ensure_ascii=False) + '}'
    return text


def icon_of(text: str):
    """Leading emoji of a string -> (icon, remainder) or (None, text)."""
    t = JUNK.sub('', text).strip()
    m = EMOJI_RE.match(t)
    if m:
        return ICONS[m.group(1)], t[m.end():].strip()
    return None, t


def icon_only(el):
    """Icon-only container -> ('icon', name) | ('num', n) | ('glyph', text) | None."""
    t = JUNK.sub('', el.get_text()).strip()
    km = KEYCAP.match(t)
    if km:
        return ('num', int(km.group(1)))
    m = EMOJI_RE.search(t)
    if m:
        return ('icon', ICONS[m.group(1)])
    if t in ICON_ONLY_EXTRA:
        return ('icon', ICON_ONLY_EXTRA[t])
    return ('glyph', t) if t else None


def inline(el, keep_ws=True) -> str:
    """Inline JSX for the children of el."""
    out = []
    for c in el.children:
        if isinstance(c, NavigableString):
            raw = JUNK.sub('', str(c))
            raw = re.sub(r'\s+', ' ', raw)
            pos = 0
            for m in EMOJI_RE.finditer(raw):
                out.append(esc(raw[pos:m.start()]))
                out.append(f'<{use("I")} n="{ICONS[m.group(1)]}" />')
                pos = m.end()
            rest = raw[pos:]
            # unmapped emoji (outside BMP symbols) -> report
            for ch in rest:
                if ord(ch) > 0x1F000:
                    missing_icons.add(ch)
            out.append(esc(rest))
        elif isinstance(c, Tag):
            n = c.name
            cl = cls(c)
            if n == 'br':
                out.append('<br />')
            elif n == 'span' and 'mono' in cl or n == 'code':
                out.append(f'<code>{inline(c)}</code>')
            elif n in ('strong', 'em', 'b', 'i', 'sub', 'sup'):
                out.append(f'<{n}>{inline(c)}</{n}>')
            elif n == 'span' and 'tag' in cl:
                out.append(f'<{use("Tag")}>{inline(c)}</{use("Tag")}>')
            elif n == 'a':
                out.append(f'<a href={attr(c.get("href", "#"))}>{inline(c)}</a>')
            elif n in ('span', 'div', 'p'):
                if cl:
                    unknown_classes.add('.'.join(cl))
                out.append(inline(c))
            else:
                out.append(gen(c))
    s = ''.join(out)
    return s.strip() if not keep_ws else re.sub(r'^\s+|\s+$', '', s)


def gen(el, ind='') -> str:
    """Generic element -> JSX (used for lists, tables, paragraphs, unknown containers)."""
    if isinstance(el, NavigableString):
        return esc(re.sub(r'\s+', ' ', str(el)))
    n = el.name
    cl = cls(el)
    if n == 'p':
        return f'<p className="mono">{inline(el)}</p>' if 'mono' in cl else f'<p>{inline(el)}</p>'
    if n in ('ul', 'ol'):
        lis = ''.join(f'<li>{inline(li)}</li>' for li in el.find_all('li', recursive=False))
        return f'<{n}>{lis}</{n}>'
    if n in ('h3', 'h4', 'h5'):
        return f'<{n}>{inline(el)}</{n}>'
    if n == 'table':
        rows = []
        for sec in tags(el):
            if sec.name in ('thead', 'tbody'):
                trs = []
                for tr in tags(sec):
                    cells = []
                    for td in tags(tr):
                        content = inline(td)
                        if 'mono' in cls(td):
                            content = f'<code>{content}</code>'
                        cells.append(f'<{td.name}>{content}</{td.name}>')
                    trs.append(f'<tr>{"".join(cells)}</tr>')
                rows.append(f'<{sec.name}>{"".join(trs)}</{sec.name}>')
            elif sec.name == 'tr':
                cells = ''.join(f'<{td.name}>{inline(td)}</{td.name}>' for td in tags(sec))
                rows.append(f'<tr>{cells}</tr>')
        return ''.join(rows)
    if n == 'img':
        return f'<{use("Figure")} src={attr(re.sub(r"^(\.\./|\./)?assets/", "", el["src"]))} alt={attr(el.get("alt", ""))} />'
    if n == 'br':
        return '<br />'
    return '\n'.join(block(el, ind)) if n == 'div' else inline(el)


def mixed(el, ind='') -> str:
    """Children of el keeping text, inline tags and block tags in order."""
    out = []
    for c in el.children:
        if isinstance(c, NavigableString):
            t = re.sub(r'\s+', ' ', str(c))
            if t.strip():
                out.append(esc(t))
        elif c.name in ('strong', 'em', 'b', 'i', 'sub', 'sup', 'br', 'code', 'span', 'a'):
            holder = BeautifulSoup('<x></x>', 'lxml').x
            holder.append(c.__copy__())
            out.append(inline(holder))
        else:
            out.append(gen(c, ind))
    return ''.join(out)


def box_title(el):
    """h3/h4/.diagram-title of a box -> (icon, title_jsx)."""
    t = el.find(['h3', 'h4'], recursive=False) or el.find(class_='diagram-title', recursive=False)
    if t is None:
        return None, None, None
    raw = JUNK.sub('', t.get_text()).strip()
    ic, rest = icon_of(raw)
    if ic and EMOJI_RE.sub('', rest) == rest:
        # rebuild inline without the leading emoji
        html = inline(t)
        html = re.sub(r'^<I n="[a-z_0-9]+" />\s*', '', html)
        return ic, html, t
    return None, inline(t), t


def card(el, ind) -> list[str]:
    ic = None
    num = None
    title = None
    mono = False
    rest: list[str] = []
    body = el.find(class_='card-body') or el
    ci = el.find(class_='card-icon')
    glyph = None
    if ci is not None:
        r = icon_only(ci)
        if r and r[0] == 'icon':
            ic = r[1]
        elif r and r[0] == 'num':
            num = r[1]
        elif r:
            glyph = r[1]
    cn = el.find(class_='card-num')
    if cn is not None:
        raw_cn = cn.get_text().strip()
        if raw_cn.isdigit():
            num = int(raw_cn)
        else:
            glyph = raw_cn
    for c in tags(body):
        k = cls(c)
        if c.name in ('h3', 'h4') and title is None:
            title = inline(c)
            mono = 'mono' in k
        elif c.name == 'div' and 'card-header' in k:
            continue
        elif 'card-icon' in k or 'card-num' in k:
            continue
        elif 'tags' in k:
            rest.append(f'<{use("Tags")}>' + ''.join(f'<{use("Tag")}>{inline(t)}</{use("Tag")}>' for t in tags(c)) + f'</{use("Tags")}>')
        else:
            rest.append(gen(c, ind))
    props = ''
    if ic:
        props += f' icon="{ic}"'
    if glyph:
        props += f' glyph={attr(glyph)}'
    if num is not None:
        props += f' num={{{num}}}'
    if title:
        props += f' title={{<>{title}</>}}'
    if mono:
        props += ' mono'
    inner = ''.join(rest)
    return [f'{ind}<{use("Card")}{props}>{inner}</{use("Card")}>' if inner else f'{ind}<{use("Card")}{props} />']


def flow(el, ind) -> list[str]:
    kids = tags(el)
    # timeline-only container
    if len(kids) == 1 and 'timeline' in cls(kids[0]):
        return timeline(kids[0], ind)
    out = [f'{ind}<{use("Flow")}>']
    for c in kids:
        k = cls(c)
        if 'diagram-arrow' in k:
            g = c.get_text().strip() or '→'
            out.append(f'{ind}  <{use("Arrow")} glyph={attr(g)} />')
        elif 'diagram-box' in k:
            out.extend(box(c, ind + '  '))
        else:
            out.extend(block(c, ind + '  '))
    out.append(f'{ind}</{use("Flow")}>')
    return out


def box(el, ind) -> list[str]:
    ic, title, t = box_title(el)
    prim = ' primary' if 'primary' in cls(el) else ''
    inner = []
    for c in tags(el):
        if c is t:
            continue
        inner.append(gen(c, ind + '  '))
    props = (f' icon="{ic}"' if ic else '') + (f' title={{<>{title}</>}}' if title else '') + prim
    body = ''.join(inner)
    return [f'{ind}<{use("Box")}{props}>{body}</{use("Box")}>' if body else f'{ind}<{use("Box")}{props} />']


def timeline(el, ind) -> list[str]:
    out = [f'{ind}<{use("TimelineBlock")}>']
    for it in tags(el):
        dot = it.find(class_='timeline-dot')
        r = icon_only(dot) if dot else None
        ic = r[1] if r and r[0] == 'icon' else None
        era = it.find('h4')
        paras = ''.join(gen(p) for p in it.find_all('p', recursive=False))
        props = (f' icon="{ic}"' if ic else '') + (' active' if dot and 'active' in cls(dot) else '')
        out.append(f'{ind}  <{use("TimelineItem")} era={{<>{inline(era)}</>}}{props}>{paras}</{use("TimelineItem")}>')
    out.append(f'{ind}</{use("TimelineBlock")}>')
    return out


def block(el, ind='') -> list[str]:
    """Convert one legacy block element into JSX lines."""
    if isinstance(el, NavigableString):
        t = str(el).strip()
        return [ind + esc(t)] if t else []
    n, k = el.name, cls(el)
    if n == 'p':
        tone = 'highlight' if 'text-caption-highlight' in k else 'source' if 'text-source' in k else 'caption' if 'text-caption' in k else 'body'
        tp = f' tone="{tone}"' if tone != 'body' else ''
        return [f'{ind}<{use("Para")}{tp}>{inline(el)}</{use("Para")}>']
    if n == 'ul' and 'bullet-list' in k:
        lis = ''.join(f'<li>{inline(li)}</li>' for li in el.find_all('li', recursive=False))
        return [f'{ind}<{use("Bullets")}>{lis}</{use("Bullets")}>']
    if n in ('ul', 'ol'):
        return [ind + gen(el)]
    if n == 'img':
        return [ind + gen(el)]
    if n in ('h3', 'h4'):
        return [ind + gen(el)]
    if n != 'div':
        return [ind + gen(el)]
    # ---- div blocks ----
    if 'stat-number' in k:
        return [f'{ind}<div className="big">{inline(el)}</div>']
    if 'stat-label' in k:
        return [f'{ind}<div className="lab">{inline(el)}</div>']
    if 'stats-row' in k:
        boxes = tags(el)
        out = [f'{ind}<{use("Stats")}>' if len(boxes) == 3 else f'{ind}<{use("Stats")}>']
        for b in boxes:
            out.append(f'{ind}  <{use("Stat")} n={{<>{inline(b.find(class_="stat-number"))}</>}} l={{<>{inline(b.find(class_="stat-label"))}</>}} />')
        out.append(f'{ind}</{use("Stats")}>')
        return out
    m = re.search(r'cards-grid(?:-(\d))?', ' '.join(k))
    if m:
        cols = int(m.group(1) or 3) if m.group(1) else 3
        n_cards = len(tags(el))
        if not m.group(1):
            cols = 3 if n_cards in (3, 5, 6, 9) else 2 if n_cards in (2, 4) else min(n_cards, 4)
        total = sum(len(c.get_text()) for c in tags(el))
        tight = ' tight' if n_cards >= 5 or CUR['siblings'] > 1 or (n_cards >= 3 and total / max(n_cards, 1) > 110) else ''
        out = [f'{ind}<{use("Cards")} cols={{{cols}}}{tight}>']
        for c in tags(el):
            out.extend(card(c, ind + '  '))
        out.append(f'{ind}</{use("Cards")}>')
        return out
    if 'diagram-content' in k and el.find(class_='diagram-item'):
        pairs = ', '.join(f'[{json.dumps(i.find(class_="diagram-icon").get_text().strip(), ensure_ascii=False)}, {json.dumps(i.find("strong").get_text().strip())}]' for i in el.find_all(class_='diagram-item'))
        out = [f'{ind}<{use("CharStrip")} items={{[{pairs}]}} />']
        for x in tags(el):
            if x.name == 'div' and not cls(x):
                out.append(f'{ind}<{use("Para")} tone="caption">{inline(x)}</{use("Para")}>')
        return out
    if 'diagram-container' in k:
        return flow(el, ind)
    if 'diagram-box' in k:
        return box(el, ind)
    if 'timeline' in k:
        return timeline(el, ind)
    if 'highlight-box' in k:
        t = el.find(class_='highlight-title')
        c = el.find(class_='highlight-content')
        if t is None and c is None:
            return [f'{ind}<{use("Callout")}>{"".join(gen(x) for x in tags(el))}</{use("Callout")}>']
        content = mixed(c) if c is not None and any(x.name in ('ul', 'ol', 'p', 'div', 'table') for x in tags(c)) else (inline(c) if c is not None else '')
        title = f' title={{<>{inline(t)}</>}}' if t is not None else ''
        return [f'{ind}<{use("Callout")}{title}>{content}</{use("Callout")}>']
    if 'two-col' in k:
        out = [f'{ind}<{use("Cols")}>']
        for c in tags(el):
            h = c.find('h3', recursive=False)
            inner = ''.join(gen(x) for x in tags(c) if x is not h)
            ttl = f' title={{<>{inline(h)}</>}}' if h is not None else ''
            out.append(f'{ind}  <{use("Col")}{ttl}>{inner}</{use("Col")}>')
        out.append(f'{ind}</{use("Cols")}>')
        return out
    if 'tags' in k:
        return [f'{ind}<{use("Tags")}>' + ''.join(f'<{use("Tag")}>{inline(t)}</{use("Tag")}>' for t in tags(el)) + f'</{use("Tags")}>']
    if 'quote-block' in k:
        p = el.find('p')
        ct = el.find('cite')
        cite = f' cite={{<>{inline(ct)}</>}}' if ct else ''
        return [f'{ind}<{use("QuoteBlock")}{cite}>{inline(p)}</{use("QuoteBlock")}>']
    if 'data-table' in k:
        return [f'{ind}<{use("DataTable")}>{gen(el.find("table"))}</{use("DataTable")}>']
    if 'formula-box' in k:
        lab = el.find(class_='formula-label')
        code = el.find('code')
        return [f'{ind}<{use("Formula")} label={attr(lab.get_text() if lab else "")}>{inline(code)}</{use("Formula")}>']
    if 'list-items' in k:
        return steps(el, ind)
    if 'task-grid' in k:
        return steps(el, ind, task=True)
    if 'quiz-timer' in k:
        note = el.find('p')
        nt = f' note={{<>{inline(note)}</>}}' if note else ''
        return [f'{ind}<{use("Timer")}{nt} />']
    if 'refleksi-grid' in k:
        out = [f'{ind}<{use("Cards")} cols={{3}}>']
        for c in tags(el):
            r = icon_only(c.find(class_='ref-icon'))
            ic = r[1] if r and r[0] == 'icon' else None
            out.append(f'{ind}  <{use("Card")}{f" icon={chr(34)}{ic}{chr(34)}" if ic else ""} title={{<>{inline(c.find("h3"))}</>}}>{gen(c.find("p"))}</{use("Card")}>')
        out.append(f'{ind}</{use("Cards")}>')
        return out
    if {'slide-center', 'visual-block', 'content-left', 'content-right'} & set(k) or not k:
        out = []
        for c in el.children:
            out.extend(block(c, ind))
        return out
    unknown_classes.add('.'.join(k))
    out = []
    for c in el.children:
        out.extend(block(c, ind))
    return out


def steps(el, ind, task=False) -> list[str]:
    out = [f'{ind}<{use("Steps")}>']
    for c in tags(el):
        k = cls(c)
        if 'task-col-head' in k:
            out.append(f'{ind}  <{use("StepHead")}>{inline(c)}</{use("StepHead")}>')
            continue
        raw_n = c.find(class_='list-number').get_text().strip()
        num = f'{{{int(raw_n)}}}' if raw_n.isdigit() else attr(raw_n)
        h = c.find('h4')
        ps = c.find_all('p')
        desc = ''.join(f'<>{inline(p)}</>' if i == 0 else f'<br />{inline(p)}' for i, p in enumerate(ps))
        out.append(f'{ind}  <{use("Step")} n={num} title={{<>{inline(h)}</>}}>{desc}</{use("Step")}>')
    out.append(f'{ind}</{use("Steps")}>')
    return out


# ---------------------------------------------------------------- slide level
def title_text(el) -> str:
    return JUNK.sub('', el.get_text()).strip()


def slide_jsx(sec, deck_no: int, ctx: dict) -> list[str]:
    k = cls(sec)
    h2 = sec.find('h2') if 'slide-content' not in k else sec.find(class_='content-left').find('h2')
    title = title_text(h2) if h2 else ''
    ind = '      '
    blocks_ = [c for c in tags(sec) if 'slide-footer' not in cls(c) and c is not h2]
    CUR['siblings'] = len(blocks_)

    if 'slide-title' in k:
        sub = sec.find(class_='subtitle')
        return [f'{ind}<{use("TitleSlide")} meeting={{{deck_no}}} title={attr(title_text(sec.find("h1")))} lede={attr(sub.get_text())} />']
    if 'slide-closing' in k:
        q = sec.find(class_='quote-block')
        qp, ct = q.find('p'), q.find('cite')
        h1t = title_text(sec.find("h1"))
        ttl = '' if h1t == 'Terima Kasih' else f' title={attr(h1t)}'
        return [f'{ind}<{use("ClosingSlide")}{ttl} lede={{<>{inline(sec.find(class_="closing-subtitle"))}</>}} quote={{<>{inline(qp)}</>}} cite={{<>{inline(ct)}</>}} next={attr(sec.find(class_="closing-meta").get_text())} />']
    if 'slide-rangkuman' in k:
        pts = ''.join(f'<>{inline(it.find("span"))}</>,'.join([''])+f'<>{inline(it.find("span"))}</>,' for it in [] )
        items = ',\n'.join(f'{ind}  <>{inline(it.find("span"))}</>' for it in sec.find_all(class_='rangkuman-item'))
        return [f'{ind}<{use("SummarySlide")} title={attr(title)} points={{[', items + ',', f'{ind}]}} />']
    if sec.find(class_='reference-list'):
        refs = []
        for p in sec.find(class_='reference-list').find_all('p'):
            html = inline(p)
            html = re.sub(r'^\d+\.\s*', '', html)
            refs.append(f'{ind}  <>{html}</>')
        return [f'{ind}<{use("ReferencesSlide")} refs={{[', ',\n'.join(refs) + ',', f'{ind}]}} />']
    if 'slide-quiz' in k:
        grid = sec.find(class_='quiz-grid')
        items = quiz_items(grid)
        is_answer = 'jawaban' in title.lower()
        if not is_answer:
            ctx['quiz_items'] = items
            return [f'{ind}<{use("QuizSlide")} title={attr(title)} items={{quiz}} />']
        return [f'{ind}<{use("QuizSlide")} title={attr(title)} items={{quiz}} reveal />']
    if title.startswith('Selanjutnya'):
        boxes = sec.find_all(class_='diagram-box')
        items = []
        for b in boxes:
            ic, t, th = box_title(b)
            ps = ''.join(inline(p) for p in b.find_all('p'))
            items.append(f'{ind}  {{ {"icon: " + chr(34) + ic + chr(34) + ", " if ic else ""}title: {json.dumps(re.sub("<[^>]+>", "", t), ensure_ascii=False)}, body: <>{ps}</> }}')
        q = sec.find(class_='quote-block')
        quote = f' quote={{<>{inline(q.find("p"))}</>}}' if q else ''
        return [f'{ind}<{use("NextMeetingSlide")} title={attr(title)} items={{[', ',\n'.join(items) + ',', f'{ind}]}}{quote} />']
    # agenda: only h2 + list-items
    if len(blocks_) == 1 and 'list-items' in cls(blocks_[0]) and not blocks_[0].find(class_='quote-block'):
        its = []
        for it in blocks_[0].find_all(class_='list-item'):
            its.append(f'{ind}  {{ title: {json.dumps(it.find("h4").get_text().strip(), ensure_ascii=False)}, desc: {json.dumps(re.sub(chr(10)+" *", " ", it.find("p").get_text().strip()), ensure_ascii=False)} }}')
        return [f'{ind}<{use("AgendaSlide")} title={attr(title)} items={{[', ',\n'.join(its) + ',', f'{ind}]}} />']
    # lecture hook: stats-row + bullet-list (+ optional lede) + source
    sr, bl = sec.find(class_='stats-row'), sec.find(class_='bullet-list')
    if sr and bl and sec.find(class_='text-source'):
        lede = [p for p in sec.find_all('p', recursive=False) if 'text-source' not in cls(p)]
        stats = ',\n'.join(f'{ind}  {{ num: {json.dumps(b.find(class_="stat-number").get_text().strip(), ensure_ascii=False)}, label: <>{inline(b.find(class_="stat-label"))}</> }}' for b in tags(sr))
        ex = ',\n'.join(f'{ind}  <>{inline(li)}</>' for li in bl.find_all('li', recursive=False))
        src = re.sub(r'^Sumber:\s*', '', sec.find(class_='text-source').get_text().strip())
        ld = f' lede={{<>{inline(lede[0])}</>}}' if lede else ''
        return [f'{ind}<{use("HookSlide")} title={attr(title)}{ld}', f'{ind}  stats={{[', stats + ',', f'{ind}  ]}}', f'{ind}  examples={{[', ex + ',', f'{ind}  ]}}', f'{ind}  source={attr(src)} />']
    # split slide
    if 'slide-content' in k:
        left_el, right_el = sec.find(class_='content-left'), sec.find(class_='content-right')
        left, right = [], []
        for c in tags(left_el):
            if c is h2:
                continue
            left.extend(block(c, ind + '    '))
        for c in right_el.children:
            right.extend(block(c, ind + '    '))
        return [f'{ind}<{use("SplitSlide")} title={attr(title)}', f'{ind}  left={{<>', *left, f'{ind}  </>}}', f'{ind}  right={{<>', *right, f'{ind}  </>}} />']
    tg = sec.find(class_='task-grid')
    if tg is not None:
        return task_slides(sec, title, blocks_, tg, ind)
    out = [f'{ind}<{use("ContentSlide")} title={attr(title)}>']
    for c in blocks_:
        out.extend(block(c, ind + '  '))
    out.append(f'{ind}</{use("ContentSlide")}>')
    return out


def task_slides(sec, title, blocks_, tg, ind) -> list[str]:
    """Task slides carry 8 dense steps: emit two slides (steps 1-4 / steps 5-8 + submission criteria)."""
    kids = tags(tg)
    heads = [c for c in kids if 'task-col-head' in cls(c)]
    items = [c for c in kids if 'list-item' in cls(c)]
    left, right = items[0::2], items[1::2]   # grid is interleaved: step1, step5, step2, step6, ...

    def one(group, head):
        out = []
        if head is not None:
            out.append(f'{ind}  <{use("StepHead")}>{inline(head)}</{use("StepHead")}>')
        out.append(f'{ind}  <{use("Steps")} cols={{2}}>')
        for c in group:
            raw_n = c.find(class_='list-number').get_text().strip()
            num = f'{{{int(raw_n)}}}' if raw_n.isdigit() else attr(raw_n)
            ps = c.find_all('p')
            desc = ''.join(f'<>{inline(p)}</>' if i == 0 else f'<br />{inline(p)}' for i, p in enumerate(ps))
            out.append(f'{ind}    <{use("Step")} n={num} title={{<>{inline(c.find("h4"))}</>}}>{desc}</{use("Step")}>')
        out.append(f'{ind}  </{use("Steps")}>')
        return out

    pre = [b for b in blocks_ if b is not tg and b is blocks_[0]]
    post = [b for b in blocks_ if b is not tg and b is not blocks_[0]]
    a = [f'{ind}<{use("ContentSlide")} title={attr(title)}>']
    for b in pre:
        a.extend(block(b, ind + '  '))
    a += one(left, heads[0] if heads else None)
    a.append(f'{ind}</{use("ContentSlide")}>')
    b2 = [f'{ind}<{use("ContentSlide")} title={attr(title + " (lanjutan)")}>']
    b2 += one(right, heads[1] if len(heads) > 1 else None)
    for b in post:
        b2.extend(block(b, ind + '  '))
    b2.append(f'{ind}</{use("ContentSlide")}>')
    return a + [''] + b2


def quiz_items(grid) -> list[dict]:
    items = []
    for q in grid.find_all(class_='quiz-q'):
        qt = inline(q.find(class_='q-text'))
        qt = re.sub(r'^\d+\.\s*', '', qt)
        opts, ans = [], -1
        for i, o in enumerate(q.find_all(class_='q-opt')):
            h = inline(o)
            h = re.sub(r'^[A-D]\.\s*', '', h)
            if 'correct' in cls(o):
                ans = i
            h = re.sub(r'\s*✓\s*$', '', h)
            opts.append(h)
        items.append({'q': qt, 'opts': opts, 'ans': ans})
    return items


def port(deck_no: int) -> tuple[str, dict]:
    used.clear()
    html = (ROOT / 'legacy' / f'pertemuan-{deck_no}.html').read_text()
    soup = BeautifulSoup(html, 'lxml')
    sections = soup.select('.slides > section')
    ctx: dict = {}
    # quiz answers from the "Jawaban" slide
    answers = None
    for s in sections:
        if 'slide-quiz' in cls(s) and 'jawaban' in title_text(s.find('h2')).lower():
            answers = quiz_items(s.find(class_='quiz-grid'))
    body: list[str] = []
    for s in sections:
        body.extend(slide_jsx(s, deck_no, ctx))
        body.append('')
    quiz_decl = ''
    if 'quiz_items' in ctx:
        items = ctx['quiz_items']
        rows = []
        for i, it in enumerate(items):
            ans = answers[i]['ans'] if answers else it['ans']
            opts = ', '.join(f'<>{o}</>' for o in it['opts'])
            rows.append(f'  {{ q: <>{it["q"]}</>, options: [{opts}], answer: {ans} }}')
        quiz_decl = 'const quiz: QuizItem[] = [\n' + ',\n'.join(rows) + ',\n];\n\n'
        used.add('QuizItem')
    used.clear()
    used.update(re.findall(r'<([A-Z][A-Za-z]*)', '\n'.join(body)))
    if quiz_decl:
        used.add('QuizItem')
    layout_names = {'TitleSlide', 'HookSlide', 'AgendaSlide', 'QuizSlide', 'SummarySlide', 'ReferencesSlide', 'NextMeetingSlide', 'ClosingSlide', 'QuizItem'}
    from_layouts = sorted(n for n in used if n in layout_names)
    from_blocks = sorted(n for n in used if n not in layout_names and n not in ('I',))
    lines = ["import {", f"  {', '.join(from_layouts)},", "} from '../layouts';"] if from_layouts else []
    if from_blocks:
        lines += ["import {", f"  {', '.join(from_blocks)},", "} from '../layouts/blocks';"]
    if 'I' in used:
        lines.append("import { I } from '../ui';")
    name = f'Pertemuan{deck_no:02d}'
    src = '\n'.join(lines) + f'\n\n{quiz_decl}export default function {name}() {{\n  return (\n    <>\n' + '\n'.join(body) + '\n    </>\n  );\n}\n'
    # type-only import for QuizItem
    src = src.replace('QuizItem,', 'type QuizItem,', 1) if 'QuizItem' in used else src
    return src, {'slides': len(sections)}


def main():
    nums = [int(a) for a in sys.argv[1:]] or [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15]
    for n in nums:
        src, info = port(n)
        out = ROOT / 'src' / 'decks' / f'pertemuan-{n:02d}.tsx'
        out.write_text(src)
        print(f'deck {n}: {info["slides"]} slides -> {out.relative_to(ROOT)}')
    if unknown_classes:
        print('UNKNOWN CLASSES:', sorted(unknown_classes))
    if missing_icons:
        print('UNMAPPED ICONS:', sorted(missing_icons))


if __name__ == '__main__':
    main()
