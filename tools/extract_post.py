import re, sys, json, html as H
from html.parser import HTMLParser
KEEP={'h2','h3','h4','p','ul','ol','li','strong','em','code','pre','a','blockquote','table','thead','tbody','tr','th','td','br'}
class P(HTMLParser):
    def __init__(s): super().__init__(convert_charrefs=True); s.out=[]; s.depth=0; s.on=False; s.skip=0
    def handle_starttag(s,t,a):
        a=dict(a)
        if not s.on:
            if t=='div' and 'prose' in (a.get('class') or ''): s.on=True; s.depth=1
            return
        if t=='div': s.depth+=1
        if s.skip: 
            if t in ('div','aside','section','figure','button'): s.skip+=1
            return
        if t in ('aside','button','figure') or (t=='div' and any(k in (a.get('class') or '') for k in ('cta','Cta','prompt','Prompt'))): s.skip=1; return
        if t in KEEP:
            attrs=''
            if t=='a' and a.get('href'): attrs=' href="%s"'%H.escape(a['href'])
            if t in('h2','h3') and a.get('id'): attrs=' id="%s"'%a['id']
            s.out.append('<%s%s>'%(t,attrs))
    def handle_endtag(s,t):
        if not s.on: return
        if s.skip:
            if t in ('div','aside','section','figure','button'): s.skip-=1
            if t=='div': s.depth-=1
            if s.depth==0: s.on=False
            return
        if t=='div':
            s.depth-=1
            if s.depth==0: s.on=False; return
        if t in KEEP and t!='br': s.out.append('</%s>'%t)
    def handle_data(s,d):
        if s.on and not s.skip: s.out.append(H.escape(d,quote=False))
def extract(path):
    raw=open(path).read()
    p=P(); p.feed(raw)
    body=''.join(p.out)
    audio=re.search(r'<audio[^>]*src="([^"]+)"',raw)
    return body, (audio.group(1) if audio else None)
if __name__=='__main__':
    for f in sys.argv[1:]:
        b,a=extract(f); print('==',f,len(b),'audio:',a); print(b[:300]); print('...',b[-500:])
