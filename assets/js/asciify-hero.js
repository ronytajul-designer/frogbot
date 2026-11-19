var Ml=Object.defineProperty;var wl=(e,n)=>()=>(e&&(n=e(e=0)),n);var El=(e,n)=>{for(var t in n)Ml(e,t,{get:n[t],enumerable:!0})};var oi={};El(oi,{default:()=>Tl});var Tl,ii=wl(()=>{Tl=`"use strict";(()=>{var Oe=self,Ee={width:0,height:0,left:0,top:0,hidden:!1,reducedMotion:!1,darkScheme:!1};for(let e of["HTMLElement","HTMLImageElement","HTMLVideoElement","HTMLCanvasElement","Element"])typeof Oe[e]!="function"&&(Oe[e]=class{});var Hn=e=>({addEventListener(t,n){e.has(t)||e.set(t,new Set),e.get(t).add(n)},removeEventListener(t,n){e.get(t)?.delete(n)}}),Wr=(e,t,n)=>{for(let a of[...e.get(t)??[]])a(n)},uo=new Map,Xn={...Hn(uo),load:()=>Promise.resolve([]),check:()=>!0,ready:Promise.resolve(),announce(e){Wr(uo,"loadingdone",Object.assign(new Event("loadingdone"),{fontfaces:[{family:e}]}))}},zn=new Map;Oe.document={...Hn(zn),get hidden(){return Ee.hidden},fonts:Xn,documentElement:null,body:null,createElement(e){if(e==="canvas")return new OffscreenCanvas(1,1);throw new Error(\`A glyph field in a worker cannot create a <\${e}>.\`)}};var qn=e=>{Ee.hidden=e,Wr(zn,"visibilitychange",new Event("visibilitychange"))};Oe.window=self;typeof Oe.devicePixelRatio!="number"&&(Oe.devicePixelRatio=1);var Nn=new Map,fo=e=>/reduced-motion/.test(e)?Ee.reducedMotion:/color-scheme:\\s*dark/.test(e)?Ee.darkScheme:!1;Oe.matchMedia=e=>{let t=Nn.get(e);t||Nn.set(e,t={matches:fo(e),events:new Map});let n=t;return{media:e,get matches(){return n.matches},...Hn(n.events)}};var Vn=(e,t)=>{Ee.reducedMotion=e,Ee.darkScheme=t;for(let[n,a]of Nn){let i=fo(n);i!==a.matches&&(a.matches=i,Wr(a.events,"change",Object.assign(new Event("change"),{matches:i,media:n})))}},Or=new Set;Oe.ResizeObserver=class{constructor(e){this.callback=e}observe(){Or.add(this.callback)}unobserve(){Or.delete(this.callback)}disconnect(){Or.delete(this.callback)}};var Br=new Set,jn=null,ho=!0;Oe.IntersectionObserver=class{constructor(e){this.callback=e}observe(e){jn=e,Br.add(this.callback),queueMicrotask(()=>this.callback([{target:e,isIntersecting:ho}]))}unobserve(){Br.delete(this.callback)}disconnect(){Br.delete(this.callback)}};var $n=(e,t,n,a)=>{let i=e!==Ee.width||t!==Ee.height;if(Object.assign(Ee,{width:e,height:t,left:n,top:a}),i)for(let l of[...Or])l([{target:jn}])},Kn=e=>{ho=e;for(let t of[...Br])t([{target:jn,isIntersecting:e}])},mo=(e,t)=>{if(e==="pointerleave"){Wr(zn,"pointerleave",new Event("pointerleave"));return}let n=Object.assign(new Event(e),t,{composedPath:()=>[]});Oe.dispatchEvent(n)};typeof Oe.requestAnimationFrame!="function"&&(Oe.requestAnimationFrame=e=>setTimeout(()=>e(performance.now()),16),Oe.cancelAnimationFrame=e=>clearTimeout(e));function po(e){let t=e;return Object.defineProperties(t,{clientWidth:{get:()=>Ee.width,configurable:!0},clientHeight:{get:()=>Ee.height,configurable:!0},ownerDocument:{value:void 0,configurable:!0}}),t.getBoundingClientRect=()=>({left:Ee.left,top:Ee.top,x:Ee.left,y:Ee.top,width:Ee.width,height:Ee.height,right:Ee.left+Ee.width,bottom:Ee.top+Ee.height}),t.setAttribute=()=>{},t.removeAttribute=()=>{},t.dataset={},t.style={},e}var Yn=e=>Object.keys(e.params);function go(e){if(!e.length)return null;let t=e.map((l,c)=>{let o=Yn(l);return\`struct Fx\${c}Params{\${o.length?o.map(f=>\`float \${f};\`).join(""):"float unused;"}};\`}).join(\`
\`),n=(l,c)=>{let o=Yn(l),f=o.length?o.map((d,m)=>\`uFx[\${c*2+(m>>2)}].\${"xyzw"[m&3]}\`).join(","):"0.";return\`Fx\${c}Params params=Fx\${c}Params(\${f});\`},a={displace:["vec2 at=sampleAt;","sampleAt=at;"],shade:["vec3 color=rgb;vec3 ink=fxInk;float inkAmount=fxInkAmount;float glyph=fxGlyph;","fxInk=ink;fxInkAmount=inkAmount;fxGlyph=glyph;"]},i=l=>e.map((c,o)=>c[l]?\`{// effect "\${c.name}"
\${n(c,o)}\${a[l][0]}
\${c[l]}
\${a[l][1]}}\`:"").filter(Boolean).join(\`
\`);return{declarations:\`uniform vec4 uFx[8];
uniform vec4 uFxPointer;
uniform float uFxTime;
\${t}\`,displace:i("displace"),shade:i("shade")}}function bo(e,t=new Float32Array(32)){return t.fill(0),e.slice(0,4).forEach((n,a)=>{Yn(n).forEach((i,l)=>{t[a*8+l]=n.params[i]})}),t}var zi={none:3,flow:1,orb:2,drift:4,swell:5,caustics:6,contour:7,aurora:8,ripple:9,halo:10,interference:11,mesh:12,cascade:13,constellation:14},vo=e=>zi[e]??3,yo=\`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}\`,Eo=e=>e?\`
const float VSCALE=6.;
vec4 decodeFluid(vec4 t){return vec4((t.xy*2.-1.)*VSCALE,t.z,t.w);}
vec4 encodeFluid(vec4 v){return vec4(clamp(v.xy/VSCALE*.5+.5,0.,1.),clamp(v.z,0.,1.),1.);}\`:\`
vec4 decodeFluid(vec4 t){return t;}
vec4 encodeFluid(vec4 v){return vec4(v.xyz,1.);}\`,Mo=e=>\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uPrevious;
uniform vec2 uSize;
uniform float uAspect, uDt, uDecay, uEnergyDecay, uRadius, uSplat;
uniform vec2 uFrom, uTo, uForce;
out vec4 outColor;
\${Eo(e)}
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=gl_FragCoord.xy/uSize;
  vec4 here=decodeFluid(texture(uPrevious,uv));
  vec4 state=decodeFluid(texture(uPrevious,uv-uDt*here.xy*vec2(1./uAspect,1.)));
  state.xy*=exp(-uDt*uDecay);
  state.z*=exp(-uDt*uEnergyDecay);
  if(uSplat>.5){
    vec2 scale=vec2(uAspect,1.);
    float d=segment(uv*scale,uFrom*scale,uTo*scale);
    float g=exp(-d*d/(uRadius*uRadius));
    state.xy+=uForce*g;
    state.z=min(1.,state.z+g*min(1.,length(uForce)*.5+.08));
  }
  float speed=length(state.xy);
  if(speed>5.)state.xy*=5./speed;
  outColor=encodeFluid(state);
}\`,qi=e=>\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uSource, uFluid;
uniform vec2 uResolution, uCell;
uniform float uCount, uBlend;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
uniform vec4 uSourceMap;
uniform int uScene;
uniform vec3 uInk, uHighlight;
uniform vec4 uBackground;
uniform float uBrightness, uContrast, uGamma, uInvert, uVignette, uSourceColor;
uniform float uRefraction, uGlow, uTime, uDrift, uFluidOn, uLod, uSaturation, uBackdrop, uShade, uHighlightAuto, uFluidMode;
uniform vec2 uFluidTexel;
uniform int uHoverMode;
uniform vec3 uLight;
uniform vec3 uTrail[12];
uniform float uLightRadius, uLightGain, uClock, uFlicker, uTrailAmount;
uniform sampler2D uTrailMap, uScope;
uniform float uScopeMode;
uniform vec2 uLevels;
// A moving source's levels, measured on the GPU (field-measure.ts), when uLevelsFromMap is set.
uniform sampler2D uLevelMap;
uniform float uLevelsFromMap;
// Shape sampling: each cell read in 3 by 5 parts and matched to the glyphs' own ink in those parts (see GlyphFieldOptions.sample).
uniform float uShapeOn, uShapeLod, uShapeTone, uShapeWindow, uShapeGate;
uniform sampler2D uShapes;
uniform int uMark;
uniform float uScale, uClearFeather, uClearShape, uOrder, uClearPointer;
// Text order by rows: each word's first glyph index and length, and how many words there are (0 reads the charset as one stream).
uniform vec2 uWords[8];
uniform float uWordCount;
uniform vec4 uClear;
uniform vec4 uPulse[4];
uniform sampler2D uTapMap;
uniform float uTapOn;
uniform sampler2D uClearMap;
uniform float uClearMapOn, uClearBend;
uniform vec2 uClearTexel;
layout(location=0) out vec4 outInk;
layout(location=1) out vec4 outUnder;
// The cell's light for bloom: its ink weighted by its tone, empty where the cell is blank. Only kept when bloom is on.
layout(location=2) out vec4 outGlow;
\${Eo(e)}
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
vec3 generated(vec2 uv,float aspect){
  vec2 p=(uv-.5)*vec2(aspect,1.)*uScale;
  if(uScene==1){
    float t=uTime*.08;
    vec2 q=vec2(fbm(p*1.6+t),fbm(p*1.6-t+3.1));
    return vec3(smoothstep(.28,.86,fbm(p*1.8+q*1.6+vec2(t*.6,-t*.4))));
  }
  if(uScene==2){
    float r=.36,d=length(p),a=uTime*.25;
    vec3 l=normalize(vec3(cos(a)*.8,.55,sin(a)*.6+.6));
    if(d<r){
      vec3 n=normalize(vec3(p.x,-p.y,sqrt(r*r-d*d)));
      float diffuse=max(dot(n,l),0.),rim=pow(1.-n.z,2.5);
      float lon=atan(n.x,n.z)+uTime*.35,lat=asin(clamp(n.y,-1.,1.));
      float bands=.5+.25*sin(lat*14.)+.25*sin(lon*6.);
      return vec3(clamp(diffuse*.85+rim*.5+bands*.12,0.,1.));
    }
    return vec3(exp(-pow((d-r)*9.,2.))*.35);
  }
  if(uScene==4){
    // Drift: a few broad lobes that wander slowly. Built for halftone, where large soft shapes read best.
    float t=uTime*.045;
    vec2 q=p*1.15;
    vec2 w=vec2(fbm(q*.7+vec2(t,-t*.7)),fbm(q*.7+vec2(4.3-t*.8,t+1.7)));
    float n=fbm(q+w*1.3+vec2(t*.4,t*.25));
    return vec3(smoothstep(.36,.74,n));
  }
  if(uScene==5){
    // Swell: three crossing swells, the second bent by the first, so crests roll diagonally instead of pooling.
    float t=uTime;
    float s=sin((dot(p,vec2(.94,.33))/.95-t/9.)*6.2831853);
    float c=sin((dot(p,vec2(.6,-.8))/.58-t/13.)*6.2831853+s*.9);
    float k=sin((dot(p,vec2(-.29,.96))/.36+t/17.)*6.2831853);
    return vec3(smoothstep(.3,.9,.5+.5*(s*.5+c*.35+k*.15)));
  }
  // The kit's background scenes. Each starts a little way in, so a reduced-motion still is already composed.
  float t=uTime+40.,px=uCell.y/uResolution.y*uScale;
  if(uScene==6){
    // Caustics: light focused by a moving water surface. Two layers of warped sine waves drift against each other; each draws
    // smooth filaments along its zero line, about a character wide. Where they cross the light lifts a little, never to a blot.
    float tt=t*.12,a=0.,b=0.;
    for(int l=0;l<2;l++){
      float f=float(l),sc=5.4+f*2.4;
      vec2 q=(l==0?p:mat2(.8,-.6,.6,.8)*p)*sc;
      q+=vec2(sin(q.y*.45+tt*(1.+f*.3)),cos(q.x*.4-tt*(.8+f*.4)))*1.3;
      float v=sin(q.x+1.4*sin(q.y*.7+tt))+sin(q.y*1.1+1.2*sin(q.x*.8-tt*1.3))*.9;
      float wv=max(fwidth(v),1e-4);
      float line=(1.-smoothstep(.2,1.5,abs(v)/wv))*(l==0?.78:.62)+exp(-abs(v)/(wv*5.))*.16;
      if(l==0)a=line;else b=line;
    }
    float pulse=.85+.15*sin(tt*3.+p.x*1.7-p.y*1.1);
    float light=max(a,b)+.3*min(a,b);
    return vec3(clamp(light*light*pulse,0.,.78));
  }
  if(uScene==7){
    // Contour: a slow terrain read as survey lines about a character wide at any size; every fifth is an index line.
    float tt=t*.02;
    vec2 q=p*1.15+vec2(tt,-tt*.6);
    float h=noise(q)*.62+noise(q*2.07+3.1)*.27+noise(q*4.3-tt+7.)*.11;
    h+=.08*sin(tt*2.+p.x*.8);
    float k=h*13.,w=max(fwidth(k),1e-4),d=abs(fract(k+.5)-.5)/w;
    float major=mod(floor(k+.5),5.)<.5?1.:0.;
    return vec3((1.-smoothstep(.35,1.25-major*.25,d))*mix(.55,1.,major));
  }
  if(uScene==8){
    // Aurora: three curtains at different distances hang from the top. Far ones sit higher and dimmer; the nearest is tallest
    // and brightest. Each folds slowly and is brightest along its lower hem, fading upward. The rays are set per character
    // column, so the curtains read as vertical strokes at any stage size, from a small card to a phone.
    float tt=t*.05,a=0.,cw=uCell.x/uResolution.x;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n),near=f/2.;
      float x=p.x*(1.3-near*.4)+f*3.7;
      float hem=-.28+near*.3+.16*sin(x*1.3+tt*(.9+f*.25)+f*2.)+.045*sin(x*3.4-tt*1.5+f);
      float d=hem-p.y;
      float body=d>0.?exp(-d/(.14+near*.26))*(.45+.55*exp(-d/.03)):exp(-d*d/.0002);
      float fold=.5+.5*sin(x*2.1+tt*.9+f*1.7+.7*sin(x*.8-tt*.6));
      float ray=mix(hash(vec2(col,f*7.1)),noise(vec2(col*.18+f*9.,tt*.7+f)),.55);
      float layer=clamp(body*(.1+.9*fold*fold)*(.2+.8*ray)*(.4+near*.6)*4.2,0.,1.);
      a=1.-(1.-a)*(1.-layer);
    }
    return vec3(smoothstep(.12,.9,a));
  }
  if(uScene==9){
    // Ripple: still water. Drops land here and there, each a few rings that widen and fade; the pointer drops its own.
    float tone=0.,g=.72;
    vec2 q=p/g,id=floor(q);
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j),h=vec2(hash(c),hash(c+7.3));
      float period=5.+h.x*5.,age=fract(t*.3/period*4.+h.y);
      vec2 at=(c+.2+.6*h)*g;
      float d=length(p-at),r=age*.62;
      float rings=max(0.,cos((d-r)*34.))*exp(-pow((d-r)/.11,2.));
      tone+=rings*pow(1.-age,1.8)*smoothstep(0.,.06,age)*(.7+.3*h.x);
    }
    return vec3(clamp(tone*1.25,0.,1.));
  }
  if(uScene==10){
    // Halo: a slow breathing corona that frames the content, its rays turning. The ring fits the stage: wide on a desktop
    // hero, tall on a phone, so the whole halo stays on screen; the middle stays empty for a headline.
    vec2 r=vec2(min(.46,aspect*.4),min(.34,.36/max(aspect,.01)*.5+.2));
    vec2 e=p/r;
    float d=length(e),a=atan(e.y,e.x),tt=t*.07,k=min(r.x,r.y);
    float breathe=1.+.04*sin(tt*3.1);
    float rays=.5+.5*noise(vec2(a*3.2+tt,tt*.5))*(.6+.4*noise(vec2(a*7.-tt*1.2,3.+tt*.4)));
    float s=(d-breathe)*k;
    float rim=exp(-pow(s/.03,2.));
    float corona=exp(-max(0.,s)/(.1+.08*rays))*smoothstep(-.04,.015,s)*rays*smoothstep(.36,.12,s);
    return vec3(clamp(rim*(.55+.45*rays)+corona*.85,0.,1.));
  }
  if(uScene==11){
    // Interference: two ring grids from slowly orbiting centres. Where they cross, broad moire bands open and close.
    float tt=t*.05;
    vec2 a=vec2(-.3+.12*sin(tt),.07*cos(tt*1.3)),b=vec2(.3+.1*cos(tt*.8),-.06*sin(tt*1.1));
    float f=6.2831853/max(px*4.6,.004);
    float m=cos(length(p-a)*f)+cos(length(p-b)*f);
    return vec3(smoothstep(.7,2.,m));
  }
  if(uScene==12){
    // Mesh: four soft lights on slow Lissajous paths, a gradient mesh written in characters.
    float tt=t*.07,m=0.;
    for(int n=0;n<4;n++){
      float f=float(n)*1.7;
      vec2 c=vec2(.66*sin(tt*(.7+f*.13)+f),.34*cos(tt*(.9-f*.07)+f*1.3));
      float s=.3+.07*sin(tt+f);
      m+=exp(-dot(p-c,p-c)/(s*s))*(.8-float(n)*.1);
    }
    return vec3(smoothstep(.06,1.1,m));
  }
  if(uScene==13){
    // Cascade: streaks fall in three depths. Far ones are frequent, faint, short and slow; near ones rare, long, bright and
    // quick. Each has a bright head and a tail that fades behind it, and a column can carry two streaks at once.
    float tone=0.,cw=uCell.x/uResolution.x,ch=uCell.y/uResolution.y;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n);
      for(int k=0;k<2;k++){
        float seed=f*13.1+float(k)*41.7,h=hash(vec2(col,seed));
        if(h<1.-(.5-f*.15))continue;
        float speed=(.045+f*.07)*(.75+.5*hash(vec2(col,seed+2.)));
        float tail=.12+f*.16,y=fract(t*speed+hash(vec2(col,seed+5.)))*(1.+tail*2.)-tail;
        float d=y-uv.y;
        if(d<0.||d>tail)continue;
        float head=d<ch*1.2?1.:0.;
        tone=max(tone,max(head*(.55+f*.22),pow(1.-d/tail,1.7)*(.28+f*.3)));
      }
    }
    return vec3(clamp(tone,0.,1.));
  }
  if(uScene==14){
    // Constellation: points wander in their own cells; neighbours close enough are linked by fine lines. Each point is a
    // bright core in a soft halo, so it reads at card size as well as full width.
    float g=.23,tt=t*.18;
    vec2 q=p/g,id=floor(q);
    vec2 pts[9];
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j);
      float h=hash(c),k=hash(c+3.7);
      pts[(j+1)*3+i+1]=c+.5+.36*vec2(sin(tt*(.6+h)+h*6.28),cos(tt*(.5+k)+k*6.28));
    }
    float line=0.,star=0.,lw=max(px/g,.02);
    for(int n=0;n<9;n++){
      vec2 e=q-pts[n];
      float d2=dot(e,e),tw=.8+.2*sin(tt*3.+float(n)*1.7);
      star=max(star,max(exp(-d2/(lw*lw*1.6)),.38*exp(-d2/(lw*lw*7.)))*tw);
      for(int m=n+1;m<9;m++){
        vec2 a=pts[n],ba=pts[m]-a;
        float len=length(ba);
        if(len>1.35)continue;
        float hh=clamp(dot(q-a,ba)/dot(ba,ba),0.,1.);
        float d=length(q-a-ba*hh);
        line=max(line,(1.-smoothstep(lw*.3,lw*.75,d))*smoothstep(1.35,.6,len)*.72);
      }
    }
    return vec3(clamp(max(line,star),0.,1.));
  }
  return vec3(0.);
}
// The source's brightness to the field's tone: levels, contrast and brightness, gamma, invert.
float transfer(float tone){
  vec2 levels=uLevelsFromMap>.5?texelFetch(uLevelMap,ivec2(0),0).rg:uLevels;
  tone=clamp((tone-levels.x)/max(levels.y-levels.x,.01),0.,1.);
  tone=clamp((tone-.5)*uContrast+.5+uBrightness,0.,1.);
  tone=pow(tone,1./uGamma);
  return uInvert>.5?1.-tone:tone;
}
// Hover scope: 1 where the pointer response may act. The map holds the source's soft subject coverage in alpha.
float hoverScope(vec2 uv){
  if(uScopeMode<.5||uScene!=0)return 1.;
  vec2 s=uv*uSourceMap.xy+uSourceMap.zw;
  vec4 scope=texture(uScope,clamp(s,0.,1.));
  // Red set: a source with no subject to key (measured on the GPU), where every scope acts everywhere.
  if(scope.r>.5)return 1.;
  float c=(s.x<0.||s.y<0.||s.x>1.||s.y>1.)?0.:scope.a;
  return uScopeMode<1.5?c:1.-c;
}
void main(){
  vec2 cell=floor(gl_FragCoord.xy);
  vec2 uv=(cell+.5)*uCell/uResolution;
  float aspect=uResolution.x/uResolution.y;
  float hs=hoverScope(uv);
  vec4 fluid=vec4(0.);
  // lift: signed tone change. The solver's flow brightens one side of each eddy and opens the other into gaps.
  float lift=0.,wake=0.,bend=1.,swirl=0.,speed=0.;
  if(uFluidOn>.5){
    vec4 raw=texture(uFluid,vec2(uv.x,1.-uv.y));
    if(uFluidMode>.5){
      vec2 v=raw.xy*uFluidTexel*vec2(aspect,1.)*hs;
      fluid=vec4(v,0.,1.);
      swirl=clamp(dot(v,vec2(.4,.65))*uGlow*.32,-.65,.65);
      speed=clamp(length(v)*uGlow*.055,0.,.38);
      bend=.4;
    } else {
      fluid=decodeFluid(raw);
      fluid.xyz*=hs;
      wake=clamp(fluid.z*uGlow,0.,1.);
      lift=wake*.55;
    }
  }
  vec2 drift=uDrift*.006*vec2(sin(uv.y*5.3+uTime*.6),cos(uv.x*4.1-uTime*.5));
  vec2 sampleAt=uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend+drift;
  float keep=0.;
  if(uClearMapOn>0.){
    // Text-shaped clear map: quiet right behind the content, and the field leans away from its edges so it flows round them.
    keep=texture(uClearMap,uv).r;
    vec2 t=uClearTexel*1.5;
    vec2 g=vec2(texture(uClearMap,uv+vec2(t.x,0.)).r-texture(uClearMap,uv-vec2(t.x,0.)).r,texture(uClearMap,uv+vec2(0.,t.y)).r-texture(uClearMap,uv-vec2(0.,t.y)).r);
    sampleAt+=g*vec2(1./aspect,1.)*uClearBend;
  }
  float spot=0.;
  if(uHoverMode==4||uHoverMode==5){
    vec2 d=(uv-uLight.xy)*vec2(aspect,1.);
    float q2=dot(d,d)/(uLightRadius*uLightRadius*2.2);
    // Loupe: flat-topped zoom with a soft rim. Reveal: a soft spot in the source's colours.
    if(uHoverMode==4) sampleAt-=(uv-uLight.xy)*exp(-q2*q2)*.45*uLight.z*min(1.,uLightGain*1.6)*hs;
    else spot=exp(-q2*1.6)*uLight.z*min(1.,uLightGain*1.6)*hs;
  }
  vec3 rgb,glow=vec3(0.);
  float sub[15];float subMean=-1.,subLo=0.,subHi=0.;
  if(uScene==0){
    vec2 s=sampleAt*uSourceMap.xy+uSourceMap.zw;
    bool inside=!(s.x<0.||s.y<0.||s.x>1.||s.y>1.);
    rgb=inside?textureLod(uSource,s,uLod).rgb:vec3(0.);
    if(uShapeOn>.5){
      vec2 cu=uCell/uResolution;
      subMean=0.;subLo=1.;subHi=0.;
      for(int j=0;j<5;j++)for(int i=0;i<3;i++){
        vec2 o=(vec2((float(i)+.5)/3.,(float(j)+.5)/5.)-.5)*cu,ss=(sampleAt+o)*uSourceMap.xy+uSourceMap.zw;
        float v=(ss.x<0.||ss.y<0.||ss.x>1.||ss.y>1.)?transfer(0.):transfer(dot(textureLod(uSource,ss,uShapeLod).rgb,vec3(.2126,.7152,.0722)));
        sub[j*3+i]=v;subMean+=v;subLo=min(subLo,v);subHi=max(subHi,v);
      }
      subMean/=15.;
    }
    if(uBackdrop>0.){
      vec2 b=(uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend*.5)*uSourceMap.xy+uSourceMap.zw;
      glow=(b.x<0.||b.y<0.||b.x>1.||b.y>1.)?vec3(0.):textureLod(uSource,b,uLod+3.).rgb*uBackdrop;
    }
  } else rgb=generated(sampleAt,aspect);
  float tone=transfer(dot(rgb,vec3(.2126,.7152,.0722)));
  // Shape sampling takes its tone from its parts, so the character's ink matches the cell's.
  if(subMean>=0.)tone=subMean;
  float flick=0.,trailFold=0.;
  // Reveal: under the spot the characters take the source's own colour and a little more ink.
  if(spot>0.)lift=spot*.22;
  if(uHoverMode==2){
    // Lantern: a soft light and its fading tail lift the characters they pass. Nothing moves the image.
    vec2 ap=vec2(aspect,1.),d=(uv-uLight.xy)*ap;
    float r2=uLightRadius*uLightRadius,glowL=uLight.z*exp(-dot(d,d)/r2);
    for(int i=0;i<12;i++){vec2 e=(uv-uTrail[i].xy)*ap;glowL+=uTrail[i].z*exp(-dot(e,e)/(r2*.55));}
    glowL=min(glowL,1.)*hs;
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=glowL*uLightGain*(.7+.6*grain);
    wake=glowL*.4;
    // A few letters at the light's rim step up the ramp and back, as if being retyped.
    flick=uFlicker*step(.9,fract(grain*13.7+floor(uClock*7.+grain*5.)*.37))*glowL*(1.-glowL)*4.;
  }
  if(uHoverMode==3){
    // Trail: the studio's ink field, as a 16-bit density. Sparse marks fill in, dense marks open up.
    vec4 ink=texture(uTrailMap,uv);
    float density=(ink.r*65280.+ink.g*255.)/65535.*uTrailAmount;
    float t=clamp(density/.38,0.,1.);
    trailFold=t*t*(3.-2.*t)*hs;
  }
  if(uFluidMode>.5&&uHoverMode==1){
    // Dark ground: any motion lights the characters. Lit ground: the flow lights one side of each eddy and opens the other.
    // A little cell-to-cell grain keeps the lit area a shimmer of letters rather than a solid block.
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=mix(abs(swirl)*.5+speed,swirl+speed*.35,smoothstep(.12,.55,tone))*(.65+.7*grain);
    wake=clamp(lift*1.6,0.,1.);
  }
  // The resting tone, before the pointer's response: a clear zone may quiet the one and keep part of the other.
  float calm=tone;
  tone=clamp(tone+lift,0.,1.);
  tone+=(1.-2.*tone)*trailFold;
  // Pulses: rings sent by the interface (field.pulse()), e.g. on a save or a notification.
  for(int i=0;i<4;i++){
    if(uPulse[i].w<=0.)continue;
    float dist=length((uv-uPulse[i].xy)*vec2(aspect,1.)),front=uPulse[i].z*.95;
    float ring=exp(-pow((dist-front)/.1,2.))*uPulse[i].w*exp(-uPulse[i].z*.85);
    tone=clamp(tone+ring*.85,0.,1.);
  }
  if(uTapOn>0.){
    // A surface tap: a signed lift (16 bits) and a glint, worked out on the CPU over the photo's own medium.
    vec4 tap=texture(uTapMap,uv);
    float lift=(tap.r*65280.+tap.g*255.)/65535.*2.-1.;
    tone=clamp(tone+(lift*1.25+tap.b)*uTapOn,0.,1.);
  }
  tone*=1.-uVignette*smoothstep(.35,1.05,length((uv-.5)*vec2(min(aspect,1.8),1.)*2.));
  if(uClearMapOn>0.)tone*=1.-uClearMapOn*smoothstep(0.,1.,keep);
  if(uClear.z>0.){
    // Clear zone: the field fades out around content so text above it stays readable.
    vec2 half_=uClear.zw*.5*vec2(aspect,1.),q=(uv-uClear.xy-uClear.zw*.5)*vec2(aspect,1.);
    float dz;
    if(uClearShape>.5){vec2 e=abs(q)-half_;dz=length(max(e,0.))+min(max(e.x,e.y),0.);}
    else dz=(length(q/max(half_,vec2(1e-4)))-1.)*min(half_.x,half_.y);
    float keepZone=smoothstep(0.,uClearFeather,dz);
    tone=calm*keepZone+(tone-calm)*mix(keepZone,1.,uClearPointer);
  }
  // Blend: a shade between two characters takes the upper one in the share of cells a 4x4 Bayer pattern gives it.
  float level=tone*(uCount-1.),upper=fract(level)>=.5?1.:0.;
  if(uBlend>.5&&tone>.02&&tone<.98){
    ivec2 q=ivec2(mod(gl_FragCoord.xy,4.));
    upper=fract(level)>(BAYER[q.y*4+q.x]+.5)/16.?1.:0.;
  }
  if(subMean>=0.&&uOrder<.5&&tone>.008){
    // Shape: among the characters near the cell's tone, the one whose ink in each part best matches the cell's parts after the
    // hovers' lift. Each glyph's ink is scaled to its place on the ramp, so shape decides among glyphs and the ramp keeps the tone.
    float n=uCount-1.,d=tone-subMean,best=1e9,c0=floor(tone*n+.5);
    upper=0.;
    level=c0;
    // A cell without an edge in it keeps the character its tone gives: shape only decides where there is shape to follow.
    if(subHi-subLo>=uShapeGate)for(int k=-6;k<=6;k++){
      float g=c0+float(k);
      if(abs(float(k))>uShapeWindow||g<1.||g>n)continue;
      float r=g/n,scale=r/max(texelFetch(uShapes,ivec2(15,int(g)),0).r,.004),e=0.;
      for(int i=0;i<15;i++){float q=clamp(sub[i]+d,0.,1.)-texelFetch(uShapes,ivec2(i,int(g)),0).r*scale;e+=q*q;}
      e=e/15.+uShapeTone*(tone-r)*(tone-r);
      if(e<best){best=e;level=g;}
    }
  }
  float index=min(uCount-1.,floor(level)+upper+(flick>.5&&tone>.02?1.:0.));
  if(uOrder>1.5){
    // Scatter order: each cell keeps one character picked from the charset by a hash of its place, and the tone sets how
    // strongly it shows rather than which character it is, so a field of letters brightens and fades like a lit screen.
    index=tone>.008?1.+min(uCount-2.,floor(hash(cell*.731+vec2(19.17,3.71))*(uCount-1.))):0.;
  } else if(uOrder>.5){
    // Text order: the charset after its blank is read in sequence along each row, each row a few letters on, so words stay
    // legible. Every letter is there; the tone sets how strongly it shows, so the words fade out toward the field's quiet edges.
    float n=max(1.,uCount-1.);
    index=tone>.015?1.+mod(cell.x+cell.y*(floor(n*.38)+1.),n):0.;
    if(uWordCount>.5&&tone>.015){
      // One word a row, repeated with a space between, rows taking the words in turn and each a few letters along.
      int k=int(mod(cell.y,uWordCount));
      vec2 word=uWords[0];
      for(int i=1;i<8;i++)if(i==k)word=uWords[i];
      float at=mod(cell.x+cell.y*3.,word.y+1.);
      index=at<word.y?word.x+at:0.;
    }
  }
  vec3 hue=rgb/max(max(rgb.r,rgb.g),max(rgb.b,.03));
  hue=mix(vec3(dot(hue,vec3(.2126,.7152,.0722))),hue,uSaturation);
  vec3 base=uRampCount>1.5?rampAt(tone):uInk;
  vec3 ink=mix(base*mix(1.,.3+.7*tone,uRampCount>1.5?0.:uShade),clamp(hue*(.38+.62*tone),0.,1.),uSourceColor);
  // Scatter, text and inlay carry the tone in the ink's strength, which the pixel pass reads back as opacity or tile shade.
  if(uOrder>1.5||(uOrder>.5&&uMark==0)||uMark==17)ink=mix(uInk,hue,uSourceColor)*tone;
  vec3 lifted=uHighlightAuto>.5?ink/max(max(ink.r,ink.g),max(ink.b,.06)):uHighlight;
  ink=mix(ink,lifted,wake*.7);
  if(spot>0.)ink=mix(ink,clamp(rgb/max(max(rgb.r,rgb.g),max(rgb.b,.08))*(.45+.55*tone),0.,1.),spot);
  float underAlpha=max(uBackground.a,min(1.,max(glow.r,max(glow.g,glow.b))));
  vec3 under=min(uBackground.rgb*uBackground.a+glow,vec3(underAlpha));
  // Glyphs keep their atlas index, exact in 8 bits; the other marks keep the tone, and empty where the charset is blank.
  outInk=vec4(ink,uMark==0||uMark==17?index/255.:uMark==1?(tone>.003?tone:0.):index>0.?max(tone,1./255.):0.);
  outUnder=vec4(under,underAlpha);
  // Highlights carry most of the light, as a lens blooms: the tone squared, so mid tones glow a little and shadows not at all.
  float lit=outInk.a>0.?tone*tone:0.;
  outGlow=vec4(ink*lit,lit);
}\`,Nr=(e,t=[])=>{let n=qi(e),a=go(t);if(!a)return n;let i=(c,o,f,d=!1)=>{let m=c.indexOf(o);if(m<0||c.indexOf(o,m+1)>=0)throw new Error(\`The cell pass lost its effect anchor: \${o}\`);return d?c.slice(0,m)+f+c.slice(m):c.slice(0,m+o.length)+f+c.slice(m+o.length)},l=i(n,"void main(){",\`\${a.declarations}
\`,!0);return l=i(l,"float aspect=uResolution.x/uResolution.y;",\`
  vec2 pointer=uFxPointer.xy;float pointerOn=uFxPointer.z,motion=uFxPointer.w,time=uFxTime;
  vec3 fxInk=vec3(0.);float fxInkAmount=0.,fxGlyph=0.;\`),l=i(l,\`+drift;
\`,\`\${a.displace}
\`),l=i(l,"  tone*=1.-uVignette*",\`\${a.shade}
  tone=clamp(tone,0.,1.);
\`,!0),l=i(l,"+(flick>.5&&tone>.02?1.:0.));",\`
  if(tone>.008)index=clamp(index+floor(fxGlyph+.5),tone>.008?1.:0.,uCount-1.);\`),l=i(l,"ink=mix(ink,lifted,wake*.7);",\`
  ink=mix(ink,clamp(fxInk,0.,1.),clamp(fxInkAmount,0.,1.));\`),l},Vi=\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uAtlas, uCells, uUnder;
uniform vec2 uResolution, uCell, uPitch;
uniform float uColumns, uDotScale, uSourceColor;
uniform vec2 uDir;
uniform int uMark;
// Inlay accents: share of tiles, letter shuffle span, a seed that steps a few times a second, charset length.
uniform vec4 uInlay;
// Line marks: pitch in cell heights, weight, the share of cells that sparkle.
uniform vec4 uLine;
uniform vec4 uFade;
// Finishing passes: bloom amount and radius in cells, scanlines, grain; chromatic split, curvature, time, rows per scanline pair.
uniform vec4 uPost, uPost2;
uniform sampler2D uGlow;
out vec4 outColor;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
// The Studio's print defaults: roughness .35, seed 7, registration .2 and its coral second ink. The screen angle is uDir (-35deg).
const float ROUGH=.35,SEED=7.;
const vec3 SECOND=vec3(.925,.404,.322);
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
// Coverage of a signed distance given in device pixels.
float cover(float d){return clamp(.5-d,0.,1.);}
float box(vec2 p,vec2 lo,vec2 hi){vec2 a=clamp(p-lo,0.,1.)*clamp(hi-p,0.,1.);return a.x*a.y;}
float disc(vec2 p,vec2 c,float r){return r>.05?cover(length(p-c)-r):0.;}
float ellipse(vec2 p,vec2 c,vec2 r,float a){vec2 d=p-c;d=vec2(cos(a)*d.x+sin(a)*d.y,-sin(a)*d.x+cos(a)*d.y);float k=length(d/r);return cover((k-1.)*min(r.x,r.y));}
// World-anchored parallel cuts across direction d: period and width in cell heights, so lines run on from cell to cell.
float cuts(vec2 w,vec2 d,float period,float width,float px){
  if(width<=0.)return 0.;
  float proj=dot(vec2(-d.y,d.x),w);
  return cover((abs(fract(proj/period+.5)-.5)*period-width*.5)*px);
}
// Lays an ink over what is already down, multiplying where they overlap, as transparent inks do on paper.
void lay(inout vec3 rgb,inout float a,vec3 c,float k){
  float next=a+k*(1.-a);
  rgb=next>0.?(rgb*a*(1.-k)+mix(c,rgb*c,a)*k)/next:c;
  a=next;
}
vec4 drawAt(vec2 frag){
  vec2 DIR=uDir;
  // The pitch is the atlas cell, or a fractional one under cellFit 'fill', where each glyph sits centred in its stretched cell.
  vec2 cell=floor(frag/uPitch);
  vec4 ink=texelFetch(uCells,ivec2(cell),0),under=texelFetch(uUnder,ivec2(cell),0);
  vec2 local=frag-cell*uPitch;
  float coverage;
  vec3 rgb=ink.rgb;
  // Scatter and inlay: the cell's strength, read back from its ink, and the ink itself at full strength.
  float strength=1.;
  if(uFade.w>.5){
    float top=max(rgb.r,max(rgb.g,rgb.b));
    strength=uSourceColor>.5?top:clamp(top/max(max(uFade.r,max(uFade.g,uFade.b)),.004),0.,1.);
    rgb=uSourceColor>.5?rgb/max(top,.004):uFade.rgb;
  }
  if(uMark==0||uMark==17){
    float index=floor(ink.a*255.+.5);
    // Inlay shuffle: every tiled cell takes a letter from the upper charset, traded for a neighbour a few times a second, so a
    // tiled body flickers through its letters rather than banding by tone; the tile's shade still carries the tone.
    float hs=hash(cell*.917+uInlay.z*1.37);
    if(uMark==17&&uInlay.y>0.&&index>0.&&(index>=uInlay.w*.62||strength>=.2))index=clamp(max(index,ceil(uInlay.w*.62)+1.)+floor((hs-.5)*(2.*uInlay.y+1.)),ceil(uInlay.w*.62),uInlay.w-1.);
    ivec2 tile=ivec2(int(mod(index,uColumns)),int(floor(index/uColumns)));
    vec2 texel=floor(local-floor((uPitch-uCell)*.5));
    coverage=all(greaterThanEqual(texel,vec2(0.)))&&all(lessThan(texel,uCell))?texelFetch(uAtlas,tile*ivec2(uCell)+ivec2(texel),0).a:0.;
    if(uMark==17){
      // Inlay: a gapped tile in the ink, lighter the denser the cell, with its character set into it in a darker shade. Faint
      // cells keep only the character, so a shape's edge frays into specks; empty cells show a hairline grid.
      vec2 p=local+.5;
      float gap=max(1.,floor(min(uPitch.x,uPitch.y)*.08+.5));
      float plate=index>0.?smoothstep(.2,.32,strength)*box(p,vec2(0.),uPitch-gap):0.;
      // Tile and letter are the ink at two strengths over whatever ground lies below, so the inlay reads on light and dark pages:
      // the tile strengthens with the tone and the letter is cut back toward the ground.
      float face=(.18+.8*smoothstep(.05,.8,strength))*plate;
      // With shuffle on, tiles also vary a little in shade, as worn inlay does.
      if(uInlay.y>0.)face*=.8+.34*hs;
      float speck=coverage*min(1.,strength*6.)*(1.-plate);
      float grid=index>0.?0.:(1.-box(p,vec2(0.),uPitch-1.))*.035;
      float a=mix(face,face*.22,coverage*plate)+speck;
      // Accents: a few lit tiles carry a coloured letter, a tinted tile or a white glint, picked afresh with the seed.
      float ha=hash(cell*1.31+uInlay.z*.71+vec2(7.3,1.9));
      if(plate>0.&&ha<uInlay.x){
        float pick=hash(cell+uInlay.z*2.11+vec2(3.1,8.7));
        vec3 hue=pick<.16?vec3(.86,.27,.27):pick<.3?vec3(.92,.55,.2):pick<.42?vec3(.9,.78,.25):pick<.58?vec3(.35,.72,.38):pick<.72?vec3(.3,.72,.8):pick<.84?vec3(.32,.42,.92):vec3(.66,.42,.86);
        float kind=ha/uInlay.x;
        if(kind<.55){float k=coverage*plate;rgb=mix(rgb,hue,k);a=mix(a,1.,k);}
        else if(kind<.88){rgb=mix(rgb,hue,.55);}
        else{float k=coverage*plate;rgb=mix(rgb,vec3(1.),1.-k);a=mix(max(a,.96),face*.3,k);}
      }
      coverage=a>0.?a:grid;
    } else coverage*=strength;
  } else if(uMark==1){
    // Halftone: dot area follows tone, so midtones read true; edges are antialiased to one device pixel.
    float r=sqrt(ink.a)*min(uPitch.x,uPitch.y)*.5*uDotScale;
    coverage=ink.a>.003?clamp(r-length(local-uPitch*.5)+.5,0.,1.):0.;
  } else if(ink.a<=0.){
    coverage=0.;
  } else {
    float tone=ink.a,side=min(uPitch.x,uPitch.y);
    vec2 q=local/uPitch,c=uPitch*.5,p=local+.5;
    // Tiles fade with the tone in one ink, as the Studio's do; in source colour the colour already carries it.
    float fade=uSourceColor>.5?1.:tone,gap=max(.5,uPitch.x*.06),grain=hash(cell+SEED);
    vec2 w=(cell+q)*uPitch/uPitch.y;
    if(uMark==2)coverage=fade;
    else if(uMark==3)coverage=box(p,vec2(0.),uPitch-gap)*fade;
    else if(uMark==4){
      // Lego: a gapped brick, lit from above, with a raised stud ringed by its shadow.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb*=1.06-.14*q.y;
      float r=side*.28,d=length(local-c)-r,lit=clamp(dot(c-local,vec2(.6,.8))/r,-1.,1.);
      rgb=mix(rgb,mix(rgb,vec3(1.),.2+.12*lit),cover(d));
      rgb=mix(rgb,rgb*.72,cover(abs(d)-max(.5,side*.04)));
    } else if(uMark==5){
      // Voxel: an isometric cube; top, left and right faces at full, .72 and .42 strength.
      float h=.5*abs(q.x-.5);
      coverage=cover(-min(q.y-h,1.-h-q.y)*uPitch.y)*cover(-min(q.x,1.-q.x)*uPitch.x);
      coverage*=mix(q.x<.5?.72:.42,1.,cover((q.y-(.5-h))*uPitch.y))*fade;
    } else if(uMark==6){
      // Disco: a gapped mirror tile, its upper facet catching light and its lower in shade.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb=q.y<.35?mix(rgb,vec3(1.),.1+grain*.25):q.y>.65?rgb*.75:rgb;
    } else if(uMark==18){
      // Tick: a printed glow. A smooth wash carries the light; over it every cell holds one short upright tick whose strength
      // steps through four levels by a 4x4 ordered threshold, so the mid tones read as a crisp dither of ticks that brightens
      // toward the light and melts into the wash at its core. With a ramp the wash runs through it and the ticks sit a step up.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.;
      float tw=max(1.,floor(uPitch.x*.28+.5)),tl=max(2.,floor(uPitch.y*.46+.5));
      vec2 lo=floor(c-vec2(tw,tl)*.5);
      float bar=box(p,lo,lo+vec2(tw,tl));
      float lvl=clamp(floor(tone*4.+th)/4.,0.,1.);
      float melt=1.-smoothstep(.7,.96,tone);
      float at=bar*melt*(.42+.58*lvl);
      bool ramped=uRampCount>1.5&&uSourceColor<.5;
      float aw=ramped?pow(smoothstep(.08,.88,tone),1.4):tone*tone*.92;
      vec3 W=ramped?rampAt(tone):rgb,T=ramped?rampAt(min(1.,lvl+.38)):rgb;
      float a=at+aw*(1.-at);
      rgb=a>0.?(T*at+W*aw*(1.-at))/a:W;
      coverage=a;
    } else if(uMark==19){
      // Bayer: one gapped square a cell, on or off by a 4x4 ordered threshold at two strengths, so a picture steps through
      // empty, half and full squares in the brand's tones, as pixel-dithered art does.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.,g=max(1.,floor(min(uPitch.x,uPitch.y)*(1.-uDotScale)+.5));
      float lvl=tone>.5+th*.5?1.:tone>th*.5?.5:0.;
      // An empty cell keeps a small faint square, so the ground reads as a dot grid that the picture fills.
      vec2 d=floor(c-max(1.,floor(min(uPitch.x,uPitch.y)*.3))*.5);
      coverage=lvl>0.?box(p,vec2(0.),uPitch-g)*lvl:box(p,d,d+max(1.,floor(min(uPitch.x,uPitch.y)*.3)))*.35;
    } else if(uMark==7){
      // Dither: an ordered 4x4 Bayer screen at about five dots a cell, lit where the cell's tone passes the threshold.
      ivec2 b=ivec2(mod(floor(frag/max(1.,floor(side/5.))),4.));
      coverage=tone>(BAYER[b.y*4+b.x]+.5)/16.?1.:0.;
    } else if(uMark==8){
      // Hex: a flat-topped hexagon filling the cell.
      vec2 h=abs((local-c)/(uPitch*.49));
      coverage=cover(max(h.y-.866,h.x*.866+h.y*.5-.866)*side*.49)*fade;
    } else if(uMark==9){
      // LED: a round lamp with a soft halo and a specular glint, separated by an unlit matrix.
      float r=side*.39,d=length(local-c);
      coverage=max(cover(d-r),.3*exp(-pow(max(0.,d-r)/(side*.12),2.)))*fade;
      rgb=mix(rgb,vec3(1.),.35*disc(local,uPitch*vec2(.43,.4),side*.11));
    } else if(uMark==10){
      // CMYK: the cell's hue separated into offset cyan, magenta and yellow dots, each sized by its share of the tone. The
      // key screen carries the neutral share in the ink's own lightness, since a light ink on a dark page has no black.
      float top=max(rgb.r,max(rgb.g,rgb.b)),low=min(rgb.r,min(rgb.g,rgb.b));
      vec3 cmy=(top-rgb)/max(top,.001);
      float a=0.;vec3 col=vec3(1.);
      lay(col,a,vec3(top),disc(local,c,side*.48*sqrt(tone*low/max(top,.001))));
      lay(col,a,vec3(0.,1.,1.),disc(local,uPitch*vec2(.36,.36),side*.48*sqrt(tone*cmy.x)));
      lay(col,a,vec3(1.,0.,1.),disc(local,uPitch*vec2(.64,.36),side*.48*sqrt(tone*cmy.y)));
      lay(col,a,vec3(1.,1.,0.),disc(local,uPitch*vec2(.5,.66),side*.48*sqrt(tone*cmy.z)));
      rgb=col;coverage=a;
    } else if(uMark==11||uMark==16){
      // Stipple and pointillism: four jittered marks a cell, their size following the tone.
      coverage=0.;vec3 col=rgb;
      for(int m=0;m<4;m++){
        vec2 o=vec2(float(m%2),float(m/2));
        float j=hash(cell*2.+o+SEED),jy=hash(cell+o*11.+SEED+1.);
        vec2 at=((o+.5)/2.+(vec2(j,jy)-.5)*ROUGH*.28)*uPitch;
        float r=min(min(min(at.x,uPitch.x-at.x),min(at.y,uPitch.y-at.y)),side*min(.245,.21*sqrt(tone)*(1.-ROUGH*j*.35)));
        float k=uMark==11?disc(local,at,r):ellipse(local,at,vec2(r,r*.64),j*3.14159);
        if(uMark==16&&k>coverage)col=uSourceColor>.5?clamp(rgb+(j-.5)*ROUGH*.25*vec3(1.,-.4,-1.),0.,1.):rgb*(1.+(j-.5)*ROUGH*.5);
        coverage=max(coverage,k);
      }
      rgb=col;
    } else if(uMark==12||uMark==13){
      // Engraving and crosshatch: parallel cuts whose weight follows the tone; crossings join only in the darker tones.
      float cv=tone*(1.-ROUGH*grain*.3),px=uPitch.y,P=uLine.x,W=uLine.y*.72*P;
      coverage=cuts(w,DIR,P,min(.94*P,W*cv),px);
      if(uMark==13){
        coverage=max(coverage,cuts(w,vec2(-DIR.y,DIR.x),P,min(.94*P,W*max(0.,cv*1.5-.3)),px)*step(.2,cv));
        coverage=max(coverage,cuts(w,normalize(DIR+vec2(-DIR.y,DIR.x)),P,min(.94*P,W*max(0.,cv*2.-1.2)),px)*step(.6,cv));
      }
      // Sparkle: now and then a lit cell catches a small bright square, picked afresh a few times a second.
      if(uLine.z>0.&&tone>.2&&hash(cell*1.7+uInlay.z*.53)<uLine.z){float sq=max(1.,floor(side*.3+.5));vec2 lo=floor(c-sq*.5);float k=box(p,lo,lo+sq);coverage=max(coverage,k);rgb=mix(rgb,vec3(1.),k*.6);}
    } else if(uMark==14){
      // Woodblock: broad carved bands in five stepped weights, their edges wavering along the grain.
      float cv=ceil(tone*(1.-ROUGH*grain*.3)*5.)/5.,width=min(.94,.72*cv);
      float proj=dot(vec2(-DIR.y,DIR.x),w),line=floor(proj+.5),along=dot(DIR,w);
      float cut=sin(along*5.3+line*1.9+SEED)*.5+sin(along*13.1+line)*.25;
      coverage=cover((abs(proj-line)-width*.5*(1.+ROUGH*cut*.5))*uPitch.y);
    } else if(uMark==15){
      // Risograph: two offset screens, the main ink and the coral second ink, misregistered along the screen angle.
      float split=uSourceColor>.5?clamp(.5+(rgb.r-rgb.b)*.5,0.,1.):.5,r=side*min(.48,.44*sqrt(tone));
      float a=0.;vec3 col=rgb;
      lay(col,a,rgb,disc(local,c,r*sqrt(.35+(1.-split)*.65)));
      lay(col,a,SECOND,disc(local,c+DIR*.2*.38*side,r*sqrt(.3+split*.7)*(1.-ROUGH*hash(cell+SEED+13.)*.3)));
      rgb=col;coverage=a;
    } else coverage=0.;
  }
  return vec4(rgb*coverage+under.rgb*(1.-coverage),coverage+under.a*(1.-coverage));
}
void main(){
  vec2 frag=vec2(gl_FragCoord.x,uResolution.y-gl_FragCoord.y);
  if(uPost2.y>0.){
    // Curvature: the picture bows outward as on a tube, normalised so its corners stay near the frame; outside it is empty.
    vec2 q=frag/uResolution-.5;
    float k=uPost2.y*.5;
    q=q*(1.+k*dot(q,q)*vec2(1.,1.))/(1.+k*.5);
    frag=(q+.5)*uResolution;
    if(frag.x<0.||frag.y<0.||frag.x>=uResolution.x||frag.y>=uResolution.y){outColor=vec4(0.);return;}
  }
  vec4 c=drawAt(frag);
  if(uPost2.x>0.){
    // Chromatic split: red and blue drawn a little apart, more toward the edges.
    vec2 q=frag/uResolution-.5,d=q*dot(q,q)*uPost2.x*uResolution.y*.08+normalize(q+1e-5)*uPost2.x*1.5;
    vec4 r=drawAt(clamp(frag+d,vec2(0.),uResolution-1.)),b=drawAt(clamp(frag-d,vec2(0.),uResolution-1.));
    c=vec4(r.r,c.g,b.b,max(c.a,max(r.a,b.a)));
  }
  if(uPost.x>0.){
    // Bloom: the cells' light, blurred through its mip chain at two radii, laid over in screen-like fashion.
    vec2 uv=frag/uPitch/vec2(textureSize(uGlow,0));
    float l=log2(max(uPost.y,.5));
    vec3 g=textureLod(uGlow,uv,l).rgb*.55+textureLod(uGlow,uv,l+1.5).rgb*.45;
    vec3 add=g*uPost.x;
    c.rgb=c.rgb+add*(1.-c.rgb*.5);
    c.a=max(c.a,min(1.,max(add.r,max(add.g,add.b))));
  }
  if(uPost.z>0.){
    // Scanlines: two thin dark bands a text row, as on a tube.
    float s=.5-.5*cos(frag.y*6.2831853*uPost2.w/uPitch.y);
    c.rgb*=1.-uPost.z*.45*s;
  }
  if(uPost.w>0.){
    // Film grain, new each frame, in the drawn light only so a transparent ground stays clear.
    float n=hash(floor(frag)+fract(uPost2.z*7.13)*vec2(91.7,37.3))-.5;
    c.rgb=clamp(c.rgb+n*uPost.w*.22*c.a,0.,1.);
  }
  outColor=c;
}\`,xo=new Map;function fr(e,t=!1){let n=\`\${e}\${t?"p":""}\`,a=xo.get(n);return a||(a=Vi.replace("uniform int uMark;",\`const int uMark=\${e};\`),t||(a=a.replace("uniform vec4 uPost, uPost2;","const vec4 uPost=vec4(0.), uPost2=vec4(0.,0.,0.,2.);")),xo.set(n,a)),a}var yt=\`#version 300 es
precision highp float;
precision highp sampler2D;
uniform vec2 uTexel;
out vec4 outColor;
vec2 here(){return gl_FragCoord.xy*uTexel;}
\`,ji=yt+\`
uniform sampler2D uVelocity;
uniform vec2 uFrom, uTo, uForce;
uniform float uAspect, uRadius;
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=here(),scale=vec2(uAspect,1.);
  float d=segment(uv*scale,uFrom*scale,uTo*scale);
  outColor=vec4(texture(uVelocity,uv).xy+uForce*exp(-d*d/(uRadius*uRadius)),0.,1.);
}\`,$i=yt+\`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).y,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).y;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).x,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(.5*(r-l-t+b),0.,0.,1.);
}\`,Ki=yt+\`
uniform sampler2D uVelocity, uCurl;
uniform float uStrength, uDt;
void main(){
  vec2 uv=here();
  float l=texture(uCurl,uv-vec2(uTexel.x,0.)).x,r=texture(uCurl,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uCurl,uv+vec2(0.,uTexel.y)).x,b=texture(uCurl,uv-vec2(0.,uTexel.y)).x,c=texture(uCurl,uv).x;
  vec2 force=.5*vec2(abs(t)-abs(b),abs(r)-abs(l));
  force=force/(length(force)+1e-4)*uStrength*c;
  force.y=-force.y;
  outColor=vec4(clamp(texture(uVelocity,uv).xy+force*uDt,-1000.,1000.),0.,1.);
}\`,Yi=yt+\`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here(),c=texture(uVelocity,uv).xy;
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).x,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).y,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).y;
  if(uv.x-uTexel.x<0.)l=-c.x;
  if(uv.x+uTexel.x>1.)r=-c.x;
  if(uv.y+uTexel.y>1.)t=-c.y;
  if(uv.y-uTexel.y<0.)b=-c.y;
  outColor=vec4(.5*(r-l+t-b),0.,0.,1.);
}\`,Qi=yt+\`
uniform sampler2D uSource;
uniform float uAmount;
void main(){outColor=vec4(texture(uSource,here()).x*uAmount,0.,0.,1.);}\`,Zi=yt+\`
uniform sampler2D uPressure, uDivergence;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4((l+r+b+t-texture(uDivergence,uv).x)*.25,0.,0.,1.);
}\`,Ji=yt+\`
uniform sampler2D uPressure, uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(texture(uVelocity,uv).xy-vec2(r-l,t-b),0.,1.);
}\`,el=yt+\`
uniform sampler2D uVelocity;
uniform float uDt, uDissipation;
void main(){
  vec2 uv=here();
  vec2 back=uv-uDt*texture(uVelocity,uv).xy*uTexel;
  outColor=vec4(texture(uVelocity,back).xy/(1.+uDissipation*uDt),0.,1.);
}\`,tl=20;function To(e,t,n){let a={splat:t(ji),curl:t($i),vorticity:t(Ki),divergence:t(Yi),fade:t(Qi),pressure:t(Zi),gradient:t(Ji),advect:t(el)},i=Object.values(a),l=0,c=0,o=[],f=[],d=null,m=null,g=A=>{let r=e.createTexture();e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,A),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,A),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA16F,l,c,0,e.RGBA,e.HALF_FLOAT,null);let E=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,E),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE?(e.deleteFramebuffer(E),e.deleteTexture(r),null):(e.viewport(0,0,l,c),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),{texture:r,buffer:E})},w=A=>{A&&(e.deleteTexture(A.texture),e.deleteFramebuffer(A.buffer))},T=()=>{[...o,...f,d,m].forEach(w),o=[],f=[],d=m=null},M=(A,r)=>{let E=A.locations;return e.useProgram(A.program),e.bindFramebuffer(e.FRAMEBUFFER,r.buffer),e.uniform2f(E.uTexel,1/l,1/c),E},x=(A,r,E,L)=>{e.activeTexture(e.TEXTURE0+E),e.bindTexture(e.TEXTURE_2D,L),e.uniform1i(A[r],E)},F=()=>e.drawArrays(e.TRIANGLES,0,3),v=A=>{let r=A[0];A[0]=A[1],A[1]=r};return{resize(A,r){T(),l=A,c=r;let E=[g(e.LINEAR),g(e.LINEAR),g(e.NEAREST),g(e.NEAREST),g(e.NEAREST),g(e.NEAREST)];return e.bindFramebuffer(e.FRAMEBUFFER,null),E.some(L=>!L)?(E.forEach(w),!1):(o=[E[0],E[1]],f=[E[2],E[3]],d=E[4],m=E[5],!0)},ready(){return i.every(n)},step(A,r){if(!o.length||!d||!m)return;e.viewport(0,0,l,c);let E;A&&(E=M(a.splat,o[1]),x(E,"uVelocity",0,o[0].texture),e.uniform2f(E.uFrom,A.from[0],A.from[1]),e.uniform2f(E.uTo,A.to[0],A.to[1]),e.uniform2f(E.uForce,A.force[0],A.force[1]),e.uniform1f(E.uAspect,r.aspect),e.uniform1f(E.uRadius,r.radius),F(),v(o)),r.curl>0&&(E=M(a.curl,m),x(E,"uVelocity",0,o[0].texture),F(),E=M(a.vorticity,o[1]),x(E,"uVelocity",0,o[0].texture),x(E,"uCurl",1,m.texture),e.uniform1f(E.uStrength,r.curl),e.uniform1f(E.uDt,r.dt),F(),v(o)),E=M(a.divergence,d),x(E,"uVelocity",0,o[0].texture),F(),E=M(a.fade,f[1]),x(E,"uSource",0,f[0].texture),e.uniform1f(E.uAmount,.8),F(),v(f);for(let L=0;L<tl;L++)E=M(a.pressure,f[1]),x(E,"uPressure",0,f[0].texture),x(E,"uDivergence",1,d.texture),F(),v(f);E=M(a.gradient,o[1]),x(E,"uPressure",0,f[0].texture),x(E,"uVelocity",1,o[0].texture),F(),v(o),E=M(a.advect,o[1]),x(E,"uVelocity",0,o[0].texture),e.uniform1f(E.uDt,r.dt),e.uniform1f(E.uDissipation,r.dissipation),F(),v(o),e.bindFramebuffer(e.FRAMEBUFFER,null)},get velocity(){return o[0]?.texture??null},get size(){return[l,c]},release:T,dispose(){T(),i.forEach(({program:A})=>e.deleteProgram(A))}}}function Hr(e,t,n){let a=0;for(;Math.max(e>>a,t>>a)>n&&e>>a+1>=1&&t>>a+1>=1;)a++;return{level:a,width:Math.max(1,e>>a),height:Math.max(1,t>>a)}}function Fo(e){let t=null,n=null,a=null,i=0,l=0,c=0,o=!1,f=null,d=-1;return{get pending(){return!!a},request(m,g,w,T){if(a||o||!g||!w)return!1;let M=Hr(g,w,T);try{t??(t=e.createFramebuffer()),n??(n=e.createBuffer());let x=e.getParameter(e.FRAMEBUFFER_BINDING);if(e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,m,M.level),f!==m||d!==M.level){if(e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)return e.bindFramebuffer(e.FRAMEBUFFER,x),o=!0,!1;f=m,d=M.level}let F=M.width*M.height*4;return e.bindBuffer(e.PIXEL_PACK_BUFFER,n),F!==i&&(e.bufferData(e.PIXEL_PACK_BUFFER,F,e.STREAM_READ),i=F),e.pixelStorei(e.PACK_ALIGNMENT,4),e.readPixels(0,0,M.width,M.height,e.RGBA,e.UNSIGNED_BYTE,0),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,null,0),e.bindFramebuffer(e.FRAMEBUFFER,x),a=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),e.flush(),l=M.width,c=M.height,!!a}catch{return o=!0,!1}},poll(){if(!a)return null;let m=e.clientWaitSync(a,0,0);if(m!==e.ALREADY_SIGNALED&&m!==e.CONDITION_SATISFIED)return m===e.WAIT_FAILED&&(e.deleteSync(a),a=null,o=!0),null;e.deleteSync(a),a=null;let g=new Uint8Array(l*c*4);return e.bindBuffer(e.PIXEL_PACK_BUFFER,n),e.getBufferSubData(e.PIXEL_PACK_BUFFER,0,g),e.bindBuffer(e.PIXEL_PACK_BUFFER,null),{data:g,width:l,height:c}},dispose(){a&&e.deleteSync(a),t&&e.deleteFramebuffer(t),n&&e.deleteBuffer(n),a=t=n=null}}}var rl=\`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}\`,wo=\`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel;
float lum(vec3 c){ return dot(c,vec3(.2126,.7152,.0722)); }
\`,nl=\`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel, uWidth;
void main(){
  vec4 c=texelFetch(uSource,ivec2(gl_VertexID%uWidth,gl_VertexID/uWidth),uLevel);
  float bin=floor(dot(c.rgb,vec3(.2126,.7152,.0722))*255.+.5);
  gl_Position=c.a*255.<8.?vec4(2.,2.,0.,1.):vec4((bin+.5)/128.-1.,0.,0.,1.);
  gl_PointSize=1.;
}\`,al=\`#version 300 es
precision highp float;
out vec4 o;
void main(){ o=vec4(1.); }\`,ol=\`#version 300 es
precision highp float;
uniform sampler2D uHistogram;
out vec4 o;
void main(){
  float count=0.;
  for(int v=0;v<256;v++)count+=texelFetch(uHistogram,ivec2(v,0),0).r;
  if(count<.5){o=vec4(0.,1.,0.,1.);return;}
  float low=1.,high=1.,seen=0.;bool lowFound=false;
  for(int v=0;v<256;v++){
    seen+=texelFetch(uHistogram,ivec2(v,0),0).r;
    if(!lowFound&&seen>=count*.02){low=float(v)/255.;lowFound=true;}
    if(seen>=count*.98){high=float(v)/255.;break;}
  }
  o=high-low<.08?vec4(0.,1.,0.,1.):vec4(low,high,0.,1.);
}\`,il=\`\${wo}
uniform ivec2 uSize;
out vec4 o;
void main(){
  int ring=max(1,int(floor(float(min(uSize.x,uSize.y))*.03+.5)));
  float clear=0.,sum=0.,square=0.,count=0.;
  for(int y=0;y<128;y++){
    if(y>=uSize.y)break;
    for(int x=0;x<128;x++){
      if(x>=uSize.x)break;
      vec4 c=texelFetch(uSource,ivec2(x,y),uLevel);
      if(c.a*255.<249.5)clear+=1.;
      if(x>=ring&&y>=ring&&x<uSize.x-ring&&y<uSize.y-ring)continue;
      float l=lum(c.rgb);sum+=l;square+=l*l;count+=1.;
    }
  }
  float ground=sum/max(1.,count);
  o=vec4(clear/float(uSize.x*uSize.y),ground,sqrt(max(0.,square/max(1.,count)-ground*ground)),1.);
}\`,ll=\`\${wo}
uniform sampler2D uStats;
out vec4 o;
void main(){
  vec4 stats=texelFetch(uStats,ivec2(0),0);
  vec4 c=texelFetch(uSource,ivec2(gl_FragCoord.xy),uLevel);
  if(stats.x>.01){o=vec4(0.,0.,0.,c.a);return;}
  if(stats.z>=.07){o=vec4(1.,0.,0.,1.);return;}
  float t=clamp((abs(lum(c.rgb)-stats.y)-.035)/.12,0.,1.);
  o=vec4(0.,0.,0.,t*t*(3.-2.*t));
}\`,sl=\`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform ivec2 uStep;
uniform int uRadius;
out vec4 o;
void main(){
  ivec2 at=ivec2(gl_FragCoord.xy),last=textureSize(uImage,0)-1;
  float sum=0.,total=0.;
  for(int k=-16;k<=16;k++){
    if(k<-2*uRadius||k>2*uRadius)continue;
    float w=float(2*uRadius+1-abs(k));
    sum+=texelFetch(uImage,clamp(at+uStep*k,ivec2(0),last),0).a*w;total+=w;
  }
  o=vec4(texelFetch(uImage,at,0).r,0.,0.,sum/total);
}\`,Qn=new WeakMap,ko=e=>{Qn.delete(e)};function Ao(e){if(!e.getExtension("EXT_color_buffer_float")||!e.getExtension("EXT_float_blend"))return null;let t=(v,A=rl)=>{let r=(re,J)=>{let ne=e.createShader(re);return e.shaderSource(ne,J),e.compileShader(ne),ne},E=e.createProgram(),L=r(e.VERTEX_SHADER,A),Y=r(e.FRAGMENT_SHADER,v);if(e.attachShader(E,L),e.attachShader(E,Y),e.linkProgram(E),e.deleteShader(L),e.deleteShader(Y),!e.getProgramParameter(E,e.LINK_STATUS))return e.deleteProgram(E),null;let Q=new Map;return{program:E,at:re=>(Q.has(re)||Q.set(re,e.getUniformLocation(E,re)),Q.get(re))}},n=Qn.get(e);n||Qn.set(e,n=new Map);let a=n,i=(v,A)=>{let r=a.get(v);if(r)return r;let E=A();if(!E)throw new Error("The glyph field could not build its GPU measure.");return a.set(v,E),E},l=[],c=(v,A,r,E)=>{let L=e.createTexture(),Y=e.createFramebuffer();e.bindTexture(e.TEXTURE_2D,L);for(let[re,J]of[[e.TEXTURE_MIN_FILTER,E],[e.TEXTURE_MAG_FILTER,E],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,re,J);let Q={texture:L,buffer:Y,width:0,height:0,format:v,type:A,base:r};return l.push(Q),Q},o=(v,A,r)=>{let E=v;v.width===A&&v.height===r||(v.width=A,v.height=r,e.bindTexture(e.TEXTURE_2D,v.texture),e.texImage2D(e.TEXTURE_2D,0,E.format,A,r,0,E.base,E.type,null),e.bindFramebuffer(e.FRAMEBUFFER,v.buffer),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,v.texture,0))},f=null,d=null,m=null,g=null,w=null,T=null,M=e.createVertexArray(),x=(v,A)=>{e.bindFramebuffer(e.FRAMEBUFFER,A.buffer),e.viewport(0,0,A.width,A.height),e.useProgram(v.program)},F=(v,A,r)=>{e.activeTexture(e.TEXTURE11),e.bindTexture(e.TEXTURE_2D,v),e.uniform1i(A.at(r),11)};return{get levels(){return d?.texture??null},get scope(){return T?.texture??null},measureLevels(v,A,r){let E=Hr(A,r,128),L=i("histogram",()=>t(al,nl)),Y=i("levels",()=>t(ol));f??(f=c(e.R32F,e.FLOAT,e.RED,e.NEAREST)),d??(d=c(e.RGBA32F,e.FLOAT,e.RGBA,e.NEAREST)),o(f,256,1),o(d,1,1),x(L,f),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),F(v,L,"uSource"),e.uniform1i(L.at("uLevel"),E.level),e.uniform1i(L.at("uWidth"),E.width),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.bindVertexArray(M),e.drawArrays(e.POINTS,0,E.width*E.height),e.disable(e.BLEND),x(Y,d),F(f.texture,Y,"uHistogram"),e.drawArrays(e.TRIANGLES,0,3)},measureScope(v,A,r){let E=Hr(A,r,128),L=Math.min(128,E.width),Y=Math.min(128,E.height),Q=i("stats",()=>t(il)),re=i("subject",()=>t(ll)),J=i("blur",()=>t(sl));m??(m=c(e.RGBA32F,e.FLOAT,e.RGBA,e.NEAREST)),g??(g=c(e.RGBA8,e.UNSIGNED_BYTE,e.RGBA,e.NEAREST)),w??(w=c(e.RGBA8,e.UNSIGNED_BYTE,e.RGBA,e.NEAREST)),T??(T=c(e.RGBA8,e.UNSIGNED_BYTE,e.RGBA,e.LINEAR)),o(m,1,1),o(g,L,Y),o(w,L,Y),o(T,L,Y),e.bindVertexArray(M),x(Q,m),F(v,Q,"uSource"),e.uniform1i(Q.at("uLevel"),E.level),e.uniform2i(Q.at("uSize"),L,Y),e.drawArrays(e.TRIANGLES,0,3),x(re,g),F(v,re,"uSource"),e.uniform1i(re.at("uLevel"),E.level),e.activeTexture(e.TEXTURE12),e.bindTexture(e.TEXTURE_2D,m.texture),e.uniform1i(re.at("uStats"),12),e.drawArrays(e.TRIANGLES,0,3);let ne=Math.min(8,Math.max(1,Math.round(Math.min(L,Y)*.02)));x(J,w),F(g.texture,J,"uImage"),e.uniform2i(J.at("uStep"),1,0),e.uniform1i(J.at("uRadius"),ne),e.drawArrays(e.TRIANGLES,0,3),x(J,T),F(w.texture,J,"uImage"),e.uniform2i(J.at("uStep"),0,1),e.drawArrays(e.TRIANGLES,0,3)},dispose(){for(let v of l)e.deleteTexture(v.texture),e.deleteFramebuffer(v.buffer);M&&e.deleteVertexArray(M),l.length=0,f=d=m=g=w=T=null}}}var cl=\`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}\`,Yt=new Set,Ro=new Set,Et=0,ra=0,So=null,Vr=120,No=new Float64Array(Vr),Qt=0,Ho=(e=Qt)=>{let t=Math.min(e,Qt),n=new Array(t);for(let a=0;a<t;a++)n[a]=No[(pr-t+a)%Vr];return n},Kt=0,pr=0,mr=1,Xr=0,Lo=0;function ul(e){Et=0,Kt&&e>Kt&&(No[pr%Vr]=e-Kt,pr++,Qt<Vr&&Qt++),Kt=e,ra=performance.now();let t=Yt;Yt=Ro,Ro=t;for(let a of t)try{a(e)}catch(i){typeof console<"u"&&console.error(i)}t.clear(),Mt?.endFrame(e);let n=performance.now()-ra;if(Xr=Xr*.9+n*.1,e-Lo>500){Lo=e;let a=zo(),i=!!Mt?.overloaded;(Xr>a*.5||i)&&mr<3?mr++:Xr<a*.2&&!i&&mr>1&&mr--}Yt.size||(Kt=0)}var Xo=()=>mr;function aa(e){Yt.add(e),Et&&So!==requestAnimationFrame&&(Et=0),Et||(So=requestAnimationFrame,Et=requestAnimationFrame(ul))}function oa(e){Yt.delete(e),!Yt.size&&Et&&(cancelAnimationFrame(Et),Et=0,Kt=0)}var Co=1e3/60,_o=-1/0;function zo(){if(Qt<20)return 1e3/60;if(pr-_o<15)return Co;_o=pr;let e=Ho().sort((t,n)=>t-n);return Co=Math.min(1e3/60,Math.max(1e3/360,e[Math.floor(e.length*.2)]))}var gr=new Set,ia=new Set,la=new Set,qo=new Set,sa=new Set,Zn=!1,Po=null,Jn=null,ea=null,zr=null,Do=e=>{let t=null;for(let n of gr){if(n.target===window){(!n.near||n.near()||n.inside)&&n.move(e);continue}t??(t=e.composedPath()),t.includes(n.target)?(n.inside=!0,n.move(e)):n.inside&&(n.inside=!1,n.leave())}},fl=()=>{for(let e of gr)e.inside=!1,e.leave()},hl=()=>{for(let e of[...ia])e()},dl=()=>{for(let e of[...la])e()},Go=()=>{for(let e of[...qo])e()},ml=e=>{for(let t of[...sa])t(e)},pl=()=>typeof document>"u"?void 0:document.fonts;function Io(){let e=gr.size+ia.size+la.size+qo.size+sa.size>0;if(typeof document>"u"||(Po!==document&&(Zn=!1,Po=document,Jn=ea=null,zr=null),e===Zn))return;Zn=e;let t=e?"addEventListener":"removeEventListener";if(typeof window<"u"&&(window[t]?.("pointermove",Do,{capture:!0,passive:!0}),window[t]?.("pointerdown",Do,{capture:!0,passive:!0})),document[t]?.("pointerleave",fl),document[t]?.("visibilitychange",hl),pl()?.[t]?.("loadingdone",ml),Jn??(Jn=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null),ea??(ea=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null),Jn?.[t]?.("change",dl),ea?.[t]?.("change",Go),e){zr??(zr=typeof MutationObserver=="function"?new MutationObserver(Go):null);for(let n of[document.documentElement,document.body])n&&zr?.observe(n,{attributes:!0,attributeFilter:["class","data-theme","data-mode","style"]})}else zr?.disconnect()}var br=(e,t)=>(e.add(t),Io(),()=>{e.delete(t)&&Io()});function Vo(e){let t=e.target;if(typeof window>"u"||t===window||typeof document>"u")return br(gr,e);let n=t,a=n.getRootNode?.();if(n.ownerDocument===document&&(!a||a===document))return br(gr,e);let i=e.move,l=()=>e.leave();return n.addEventListener("pointermove",i,{passive:!0}),n.addEventListener("pointerdown",i,{passive:!0}),n.addEventListener("pointerleave",l),()=>{n.removeEventListener("pointermove",i),n.removeEventListener("pointerdown",i),n.removeEventListener("pointerleave",l)}}var jo=e=>br(ia,e),$o=e=>br(la,e);var Ko=e=>br(sa,e),hr=new Map,dr=null,ta=new Map,Yo=e=>t=>{for(let n of t)for(let a of[...e.get(n.target)??[]])a(n)},Qo=(e,t,n)=>{let a=e.get(t);return a?(a.add(n),!1):(e.set(t,new Set([n])),!0)},Zo=(e,t,n)=>{let a=e.get(t);return!a?.delete(n)||a.size?!1:(e.delete(t),!0)};function jr(e,t){return typeof ResizeObserver!="function"?()=>{}:(dr??(dr=new ResizeObserver(Yo(hr))),Qo(hr,e,t)?dr.observe(e):queueMicrotask(()=>{hr.get(e)?.has(t)&&t({target:e})}),()=>{Zo(hr,e,t)&&dr?.unobserve(e),hr.size||(dr?.disconnect(),dr=null)})}function Jo(e,t,n){if(typeof IntersectionObserver!="function")return()=>{};let a=ta.get(t);if(!a){let c=new Map;a={observer:new IntersectionObserver(Yo(c),{rootMargin:t}),watch:c},ta.set(t,a)}let{observer:i,watch:l}=a;return Qo(l,e,n)||i.unobserve(e),i.observe(e),()=>{Zo(l,e,n)&&i.unobserve(e),l.size||(i.disconnect(),ta.delete(t))}}var Uo=new WeakMap;function ca(e){let t=Uo.get(e);if(t)return t;let n={activeTexture:e.activeTexture.bind(e),bindTexture:e.bindTexture.bind(e),deleteTexture:e.deleteTexture.bind(e),useProgram:e.useProgram.bind(e),deleteProgram:e.deleteProgram.bind(e),bindFramebuffer:e.bindFramebuffer.bind(e),deleteFramebuffer:e.deleteFramebuffer.bind(e),viewport:e.viewport.bind(e),pixelStorei:e.pixelStorei.bind(e)},a=e.TEXTURE0,i=e.TEXTURE_2D,l=e.FRAMEBUFFER,c=[],o=-1,f,d,m="",g=new Map,w=()=>{c.length=0,o=-1,f=void 0,d=void 0,m="",g.clear()},T=e;return T.activeTexture=M=>{let x=M-a;x!==o&&(o=x,n.activeTexture(M))},T.bindTexture=(M,x)=>{if(M===i&&o>=0){if(c[o]===x)return;c[o]=x}else M===i&&(c.length=0);n.bindTexture(M,x)},T.deleteTexture=M=>{for(let x=0;x<c.length;x++)c[x]===M&&(c[x]=void 0);n.deleteTexture(M)},T.useProgram=M=>{M!==f&&(f=M,n.useProgram(M))},T.deleteProgram=M=>{M===f&&(f=void 0),n.deleteProgram(M)},T.bindFramebuffer=(M,x)=>{if(M===l){if(x===d)return;d=x}else d=void 0;n.bindFramebuffer(M,x)},T.deleteFramebuffer=M=>{M===d&&(d=void 0),n.deleteFramebuffer(M)},T.pixelStorei=(M,x)=>{g.get(M)!==x&&(g.set(M,x),n.pixelStorei(M,x))},T.viewport=(M,x,F,v)=>{let A=\`\${M},\${x},\${F},\${v}\`;A!==m&&(m=A,n.viewport(M,x,F,v))},Uo.set(e,w),w}var gl=3e3,Oo=256*1024*1024,bl=32,qr=[1,.85,.7,.58,.5],xr=class{constructor(t,n){this.gl=t;this.onChange=n;this.level=0;this.overloaded=!1;this.queries=[];this.open=null;this.drew=!1;this.gpuMs=[];this.cpuMs=[];this.changedAt=0;this.checkedAt=-1/0;this.frameNo=0;this.timer=t.getExtension("EXT_disjoint_timer_query_webgl2")}begin(){if(!this.drew&&(this.drew=!0,this.timer&&!this.open&&this.queries.length<4&&(this.frameNo++&7)===0)){let t=this.gl.createQuery();t&&(this.gl.beginQuery(this.timer.TIME_ELAPSED_EXT,t),this.open=t)}}end(t,n){let a=this.gl,i=this.timer;if(this.drew&&(this.cpuMs.push(n),this.cpuMs.length>60&&this.cpuMs.shift(),i&&this.open&&(a.endQuery(i.TIME_ELAPSED_EXT),this.queries.push({query:this.open,frame:t}),this.open=null)),this.drew=!1,i&&this.queries.length&&a.getQueryParameter(this.queries[0].query,a.QUERY_RESULT_AVAILABLE)){let l=a.getParameter(i.GPU_DISJOINT_EXT);for(;this.queries.length&&a.getQueryParameter(this.queries[0].query,a.QUERY_RESULT_AVAILABLE);){let{query:c}=this.queries.shift();l||(this.gpuMs.push(a.getQueryParameter(c,a.QUERY_RESULT)/1e6),this.gpuMs.length>60&&this.gpuMs.shift()),a.deleteQuery(c)}}this.adapt(t)}skip(){this.drew=!1}reset(){this.queries=[],this.open=null,this.gpuMs=[],this.cpuMs=[]}adapt(t){if(t-this.checkedAt<250)return;this.checkedAt=t;let n=zo(),a=this.gpuMs.length>=5&&Math.min(...this.gpuMs.slice(-5))>n*1.5,i=this.gpuMs.length>=10||a?this.gpuMs:null,l;if(i)l=i.slice().sort((o,f)=>o-f)[Math.floor(i.length*.75)]/n;else{if(Qt<30||this.cpuMs.length<10)return;let o=Ho(30).sort((d,m)=>d-m),f=this.cpuMs.slice().sort((d,m)=>d-m)[this.cpuMs.length>>1];l=o[Math.floor(o.length*.75)]/n>1.6&&f<n*.5?1:.5}if(this.overloaded=l>.8&&this.atMinimum,t-this.changedAt<(l>.8?800:4e3))return;let c=this.level;l>2?c=qr.length-1:l>.8&&c<qr.length-1?c++:l<.3&&c>0&&c--,c!==this.level&&(this.level=c,this.changedAt=t,this.gpuMs=[],this.cpuMs=[],this.onChange())}get scale(){return qr[this.level]}get atMinimum(){return this.level===qr.length-1}},na=class{constructor(){this.lost=!1;this.programs=new Map;this.atlases=new Map;this.vertex=null;this.vao=null;this.clients=new Set;this.parallel=null;this.lostTimer=0;this.renderer="";this.forgetState=()=>{};this.onLost=t=>{t.preventDefault(),this.lost=!0,this.forgetState(),this.reset();for(let n of[...this.clients])n.lost();clearTimeout(this.lostTimer),this.lostTimer=setTimeout(()=>{if(this.lost){this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored);try{this.create()}catch{return}this.restored()}},1e3)};this.onRestored=()=>{clearTimeout(this.lostTimer),this.lost=!1,this.forgetState(),this.restored()};this.idleTimer=0;this.create()}create(){let t=null,n=null,a={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"};if(typeof document<"u"&&(t=document.createElement("canvas"),n=t.getContext("webgl2",a)),!n&&typeof OffscreenCanvas=="function")try{t=new OffscreenCanvas(1,1),n=t.getContext("webgl2",a)}catch{n=null}if(!n||!t)throw new Error("WebGL2 is not available for the glyph field.");this.canvas=t,this.gl=n,this.forgetState=ca(n),this.lost=!1,t.width=t.height=1,this.parallel=n.getExtension("KHR_parallel_shader_compile");let i=this.frames?.level??0;this.frames=new xr(n,()=>{for(let o of[...this.clients])o.rescale()}),this.frames.level=i;let l=n.getExtension("WEBGL_debug_renderer_info");this.renderer=String(n.getParameter(l?l.UNMASKED_RENDERER_WEBGL:n.RENDERER)??""),t.addEventListener?.("webglcontextlost",this.onLost),t.addEventListener?.("webglcontextrestored",this.onRestored);let c=!n.getExtension("EXT_color_buffer_float")&&!n.getExtension("EXT_color_buffer_half_float");this.program(Nr(c)),this.program(fr(0))}restored(){for(let t of[...this.clients])t.restored()}reset(){this.programs.clear(),this.atlases.clear(),this.vertex=null,this.vao=null,this.frames.reset()}join(t){this.clients.add(t),clearTimeout(this.idleTimer)}leave(t){if(this.clients.delete(t),this.clients.size){this.fit();return}this.lost||(this.canvas.width=this.canvas.height=1,this.frames.level=0),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.clients.size||this.dispose()},gl)}dispose(){if(clearTimeout(this.lostTimer),this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored),!this.lost)try{this.gl.getExtension("WEBGL_lose_context")?.loseContext()}catch{}this.reset(),Mt===this&&(Mt=null)}program(t){let n=this.programs.get(t);if(n)return n;let a=this.gl,i=(f,d)=>{let m=a.createShader(f);return a.shaderSource(m,d),a.compileShader(m),m};this.vertex??(this.vertex=i(a.VERTEX_SHADER,cl));let l=a.createProgram(),c=i(a.FRAGMENT_SHADER,t);a.attachShader(l,this.vertex),a.attachShader(l,c),a.linkProgram(l);let o={program:l,locations:null,fragment:c};return this.programs.set(t,o),o}linked(t,n=!1){if(t.locations)return!0;let a=this.gl;if(!n&&this.parallel&&!a.getProgramParameter(t.program,this.parallel.COMPLETION_STATUS_KHR))return!1;if(!a.getProgramParameter(t.program,a.LINK_STATUS)){if(a.isContextLost())return!1;throw new Error(t.fragment&&a.getShaderInfoLog(t.fragment)||a.getProgramInfoLog(t.program)||"Glyph field program failed to link.")}let i={};for(let l=a.getProgramParameter(t.program,a.ACTIVE_UNIFORMS)-1;l>=0;l--){let c=a.getActiveUniform(t.program,l).name.replace(/\\[0\\]$/,"");i[c]=a.getUniformLocation(t.program,c)}return t.locations=i,!0}get canCompileInParallel(){return!!this.parallel}vertexArray(){return this.vao??(this.vao=this.gl.createVertexArray())}atlas(t,n,a){let i=this.atlases.get(t);if(i)i.refs||(this.atlases.delete(t),this.atlases.set(t,i));else{let l=this.gl,c=l.createTexture();l.bindTexture(l.TEXTURE_2D,c);for(let[o,f]of[[l.TEXTURE_MIN_FILTER,l.NEAREST],[l.TEXTURE_MAG_FILTER,l.NEAREST],[l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE],[l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE]])l.texParameteri(l.TEXTURE_2D,o,f);i={key:t,texture:c,refs:0,final:!1,users:new Set,bytes:0},this.atlases.set(t,i),this.paintAtlas(i,n)}return i.refs++,i.users.add(a),i}hasAtlas(t){return this.atlases.has(t)}paintAtlas(t,n){let a=this.gl,{image:i,final:l}=n();a.bindTexture(a.TEXTURE_2D,t.texture),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,!1),a.texImage2D(a.TEXTURE_2D,0,a.RGBA8,a.RGBA,a.UNSIGNED_BYTE,i),t.bytes=i.width*i.height*4,t.final=l;for(let c of[...t.users])c()}releaseAtlas(t,n){!t||!t.users.delete(n)||--t.refs>0||this.evictAtlases()}evictAtlases(){let t=[...this.atlases.values()].filter(a=>!a.refs),n=t.length-bl;for(let a of t){if(n<=0&&!this.overBudget)break;n--,this.atlases.delete(a.key),this.lost||this.gl.deleteTexture(a.texture)}}fit(){if(this.lost)return;let t=1,n=1;for(let l of this.clients){let[c,o]=l.size();t=Math.max(t,c),n=Math.max(n,o)}let a=this.canvas,i=l=>Math.ceil(l/256)*256;a.width*a.height>i(t)*i(n)*2&&(a.width=i(t),a.height=i(n))}get bytes(){let t=this.canvas.width*this.canvas.height*4*2;for(let n of this.clients)t+=n.bytes();for(let n of this.atlases.values())t+=n.bytes;return t}get overBudget(){return this.bytes>Oo}get roomy(){return this.bytes<Oo*.85}begin(t,n){let a=this.canvas;if(a.width<t||a.height<n){let i=l=>Math.ceil(l/256)*256;a.width=Math.max(a.width,i(t)),a.height=Math.max(a.height,i(n))}this.frames.begin()}present(t,n,a){t.globalCompositeOperation="copy",t.imageSmoothingEnabled=!1,t.drawImage(this.canvas,0,this.canvas.height-a,n,a,0,0,n,a)}endFrame(t){if(this.lost){this.frames.skip();return}this.frames.end(t,performance.now()-ra)}get level(){return this.frames.level}get overloaded(){return this.frames.overloaded}get scale(){return this.frames.scale}get atMinimum(){return this.frames.atMinimum}},Mt=null,Bo=!1;function ei(){if(Mt||Bo)return Mt;try{Mt=new na}catch{Bo=!0}return Mt}var Wo=new WeakSet,ti=(e,t)=>{t?Wo.add(e):Wo.delete(e)};var xl=/^[\\u1100-\\u115f\\u2e80-\\ua4cf\\uac00-\\ud7a3\\uf900-\\ufaff\\ufe30-\\ufe4f\\uff00-\\uff60\\uffe0-\\uffe6]|^[\\u{20000}-\\u{3fffd}]/u,$r=e=>xl.test(e),ri='"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, "Noto Sans JP", "Noto Sans CJK JP", Meiryo, sans-serif';var Kr=class{constructor(t,n,a){this.previous=null;this.peak=0;this.width=t,this.height=n,this.span=a??Math.min(t,n);let i=t*n;this.pixels=new Uint8Array(i*4),this.signal=new Float32Array(i),this.offsetX=new Float32Array(i),this.offsetY=new Float32Array(i),this.driftX=new Float32Array(i),this.driftY=new Float32Array(i),this.u=new Float32Array(i),this.v=new Float32Array(i),this.ink=new Float32Array(i),this.a=new Float32Array(i),this.b=new Float32Array(i),this.c=new Float32Array(i),this.pressure=new Float32Array(i),this.pressureNext=new Float32Array(i),this.divergence=new Float32Array(i),this.curl=new Float32Array(i)}get active(){return this.peak>2e-4}clear(){for(let t of[this.u,this.v,this.ink,this.a,this.b,this.c,this.pressure,this.pressureNext,this.divergence,this.curl,this.signal,this.pixels,this.offsetX,this.offsetY,this.driftX,this.driftY])t.fill(0);this.previous=null,this.peak=0}leave(){this.previous=null}move(t,n,a,i=performance.now()){if(!Number.isFinite(t+n+a+i))return;t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n)),a=Math.max(.1,Math.min(1,a));let l=this.previous;if(this.previous={x:t,y:n,time:i},!l)return;let c=(t-l.x)*(this.width-1),o=(n-l.y)*(this.height-1),f=Math.hypot(c,o);if(f<.001)return;let d=this.span,m=i>l.time?Math.max(1/240,(i-l.time)/1e3):1/60,g=Math.min(12,f/d/m),w=1-Math.exp(-g/2.2),T=d*(.022+a*.075)*(.65+w*.95),M=Math.min(128,Math.max(1,Math.ceil(f/(T*.4)))),x=f/T*(.32+w*.22)/M,F=c/f,v=o/f,A=-v,r=F,E=f*(2+w*18)/M;for(let L=0;L<M;L++){let Y=(L+.5)/M,Q=(l.x+(t-l.x)*Y)*(this.width-1),re=(l.y+(n-l.y)*Y)*(this.height-1),J=Math.max(1,Math.floor(Q-T*3)),ne=Math.min(this.width-2,Math.ceil(Q+T*3)),_=Math.max(1,Math.floor(re-T*3)),ee=Math.min(this.height-2,Math.ceil(re+T*3));for(let K=_;K<=ee;K++)for(let S=J;S<=ne;S++){let D=((S-Q)*F+(K-re)*v)/T,Z=((S-Q)*A+(K-re)*r)/T,q=Math.exp(-D*D*.65-Z*Z*1.7),C=K*this.width+S;this.ink[C]=1-(1-this.ink[C])*Math.exp(-q*x);let U=1-Z*Z*.55,H=D*Z*.7;this.u[C]=Math.max(-80,Math.min(80,this.u[C]+(F*U+A*H)*q*E)),this.v[C]=Math.max(-80,Math.min(80,this.v[C]+(v*U+r*H)*q*E))}}this.peak=1}read(t,n,a){n=Math.max(.5,Math.min(this.width-1.5,n)),a=Math.max(.5,Math.min(this.height-1.5,a));let i=n|0,l=a|0,c=n-i,o=a-l,f=l*this.width+i;return(t[f]*(1-c)+t[f+1]*c)*(1-o)+(t[f+this.width]*(1-c)+t[f+this.width+1]*c)*o}sample(t,n){return this.read(this.signal,t*(this.width-1),n*(this.height-1))}displacement(t,n,a){a[0]=this.read(this.offsetX,t*(this.width-1),n*(this.height-1)),a[1]=this.read(this.offsetY,t*(this.width-1),n*(this.height-1))}step(t){if(!this.active||!Number.isFinite(t))return;let n=Math.max(0,Math.min(.05,t)),a=this.width,i=this.height;for(;n>1e-7;){let l=Math.min(.016666666666666666,n);n-=l;let c=Math.exp(-1.9*l),o=Math.exp(-3.2*l);for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m,w=Math.max(.5,Math.min(a-1.5,m-this.u[g]*l)),T=Math.max(.5,Math.min(i-1.5,d-this.v[g]*l)),M=w|0,x=T|0,F=w-M,v=T-x,A=x*a+M,r=(1-F)*(1-v),E=F*(1-v),L=(1-F)*v,Y=F*v;this.a[g]=(this.u[A]*r+this.u[A+1]*E+this.u[A+a]*L+this.u[A+a+1]*Y)*c,this.b[g]=(this.v[A]*r+this.v[A+1]*E+this.v[A+a]*L+this.v[A+a+1]*Y)*c,this.c[g]=(this.ink[A]*r+this.ink[A+1]*E+this.ink[A+a]*L+this.ink[A+a+1]*Y)*o}[this.u,this.a]=[this.a,this.u],[this.v,this.b]=[this.b,this.v],[this.ink,this.c]=[this.c,this.ink];for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m;this.curl[g]=(this.v[g+1]-this.v[g-1]-this.u[g+a]+this.u[g-a])*.5}for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m,w=Math.abs(this.curl[g+1])-Math.abs(this.curl[g-1]),T=Math.abs(this.curl[g+a])-Math.abs(this.curl[g-a]),M=Math.hypot(w,T)+1e-4,x=this.curl[g]*l*10,F=Math.hypot(this.u[g],this.v[g]);this.u[g]+=T/M*x,this.v[g]-=w/M*x;let v=Math.min(1,F/(Math.hypot(this.u[g],this.v[g])+1e-6));this.u[g]*=v,this.v[g]*=v,this.divergence[g]=-.5*(this.u[g+1]-this.u[g-1]+this.v[g+a]-this.v[g-a])}this.pressure.fill(0);for(let d=0;d<4;d++){for(let m=1;m<i-1;m++)for(let g=1;g<a-1;g++){let w=m*a+g;this.pressureNext[w]=(this.divergence[w]+this.pressure[w-1]+this.pressure[w+1]+this.pressure[w-a]+this.pressure[w+a])*.25}[this.pressure,this.pressureNext]=[this.pressureNext,this.pressure]}let f=0;for(let d=1;d<i-1;d++)for(let m=1;m<a-1;m++){let g=d*a+m;this.u[g]=Math.max(-80,Math.min(80,this.u[g]-(this.pressure[g+1]-this.pressure[g-1])*.5)),this.v[g]=Math.max(-80,Math.min(80,this.v[g]-(this.pressure[g+a]-this.pressure[g-a])*.5)),this.driftX[g]+=(this.u[g]*3.6-58*this.offsetX[g]-12*this.driftX[g])*l,this.driftY[g]+=(this.v[g]*3.6-58*this.offsetY[g]-12*this.driftY[g])*l,this.offsetX[g]=Math.max(-2,Math.min(2,this.offsetX[g]+this.driftX[g]*l)),this.offsetY[g]=Math.max(-2,Math.min(2,this.offsetY[g]+this.driftY[g]*l)),this.signal[g]=1-Math.exp(-Math.hypot(this.u[g],this.v[g])*.06-this.ink[g]*.16),f=Math.max(f,this.signal[g])}this.peak=f}if(!this.active){this.clear();return}for(let l=0;l<this.ink.length;l++){let c=Math.round(Math.min(1,this.signal[l])*65535);this.pixels[l*4]=c>>>8,this.pixels[l*4+1]=c&255,this.pixels[l*4+2]=Math.round(128+this.offsetX[l]*63.5),this.pixels[l*4+3]=Math.round(128+this.offsetY[l]*63.5)}}};var ni=e=>e==="subject"||e==="outside"?e:"all";function ye(e,t,n,a,i){if(!(i<1))for(let l=0;l<2;l++){for(let c=0;c<a;c++){let o=0,f=c*n;for(let d=-i;d<=i;d++)o+=e[f+Math.max(0,Math.min(n-1,d))];for(let d=0;d<n;d++)t[f+d]=o/(i*2+1),o+=e[f+Math.min(n-1,d+i+1)]-e[f+Math.max(0,d-i)]}for(let c=0;c<n;c++){let o=0;for(let f=-i;f<=i;f++)o+=t[Math.max(0,Math.min(a-1,f))*n+c];for(let f=0;f<a;f++)e[f*n+c]=o/(i*2+1),o+=t[Math.min(a-1,f+i+1)*n+c]-t[Math.max(0,f-i)*n+c]}}}var ua=new Float32Array(0);function Yr(e,t,n,a,i){let l=t*n,c=i&&i.width===t&&i.height===n?i:{width:t,height:n,subject:new Float32Array(l),depth:new Float32Array(l),key:"none"},{subject:o,depth:f}=c,d=0;for(let M=0;M<l;M++)e[M*4+3]<250&&d++;let m=M=>(e[M*4]*.2126+e[M*4+1]*.7152+e[M*4+2]*.0722)/255,g="none",w=0;if(d>l*.01)g="alpha";else if(a)g="mask";else{let M=0,x=0,F=0,v=Math.max(1,Math.round(Math.min(t,n)*.03));for(let r=0;r<n;r++)for(let E=0;E<t;E++){if(E>=v&&r>=v&&E<t-v&&r<n-v)continue;let L=m(r*t+E);M+=L,x+=L*L,F++}w=M/Math.max(1,F),Math.sqrt(Math.max(0,x/Math.max(1,F)-w*w))<.07&&(g="ground")}for(let M=0;M<l;M++){let x=e[M*4+3]/255,F=m(M),v=1;if(g==="alpha")v=x;else if(g==="ground"){let A=Math.max(0,Math.min(1,(Math.abs(F-w)-.035)/.12));v=A*A*(3-2*A)}o[M]=v*(a?Math.max(0,Math.min(1,a[M])):1),f[M]=F*x}c.key=g,ua.length<l&&(ua=new Float32Array(l));let T=ua;return ye(o,T,t,n,Math.max(1,Math.round(Math.min(t,n)*.02))),ye(f,T,t,n,Math.max(1,Math.round(Math.min(t,n)*.035))),c}var Gt=11,Be=e=>Math.max(0,Math.min(1,e)),G=(e,t,n)=>{let a=Be((n-e)/(t-e));return a*a*(3-2*a)};function je(e,t,n=256){let a=0;for(let o=0;o<e.length;o++)e[o]>a&&(a=e[o]);if(a<=0)return 0;let i=new Uint32Array(n);for(let o=0;o<e.length;o++)i[Math.min(n-1,Math.floor(Math.max(0,e[o])/a*n))]++;let l=0,c=e.length*t;for(let o=0;o<n;o++)if(l+=i[o],l>=c)return(o+1)/n*a;return a}var vl=12e3,da=class{constructor(t){this.n=t;this.arrays=[];this.next=0}take(t){this.next===this.arrays.length&&this.arrays.push(new Float32Array(this.n));let n=this.arrays[this.next++];return t?n.set(t):n.fill(0),n}reset(){this.next=0}},Qr=null;function yl(e,t,n,a,i,l,c,o,f){let d=i*l,m=f.take(),g=S=>(Dt(S,m,i,l,c),S),w=(S,D)=>{let Z=f.take();for(let q=0;q<d;q++)Z[q]=S[q]*D[q];return g(Z)},T=g(f.take(t)),M=g(f.take(n)),x=g(f.take(a)),F=g(f.take(e)),v=w(t,t),A=w(t,n),r=w(t,a),E=w(n,n),L=w(n,a),Y=w(a,a),Q=w(t,e),re=w(n,e),J=w(a,e),ne=f.take(),_=f.take(),ee=f.take(),K=f.take();for(let S=0;S<d;S++){let D=Q[S]-T[S]*F[S],Z=re[S]-M[S]*F[S],q=J[S]-x[S]*F[S],C=v[S]-T[S]*T[S]+o,U=A[S]-T[S]*M[S],H=r[S]-T[S]*x[S],te=E[S]-M[S]*M[S]+o,le=L[S]-M[S]*x[S],pe=Y[S]-x[S]*x[S]+o,De=te*pe-le*le,V=H*le-U*pe,ae=U*le-H*te,Re=C*pe-H*H,Me=U*H-C*le,xe=C*te-U*U,Le=C*De+U*V+H*ae,Te=Math.abs(Le)>1e-12?1/Le:0;ne[S]=(De*D+V*Z+ae*q)*Te,_[S]=(V*D+Re*Z+Me*q)*Te,ee[S]=(ae*D+Me*Z+xe*q)*Te,K[S]=F[S]-ne[S]*T[S]-_[S]*M[S]-ee[S]*x[S]}g(ne),g(_),g(ee),g(K);for(let S=0;S<d;S++)e[S]=ne[S]*t[S]+_[S]*n[S]+ee[S]*a[S]+K[S]}function Dt(e,t,n,a,i){let l=i*2+1;for(let c=0;c<a;c++){let o=c*n,f=0;for(let d=-i;d<=i;d++)f+=e[o+Math.max(0,Math.min(n-1,d))];for(let d=0;d<n;d++)t[o+d]=f/l,f+=e[o+Math.min(n-1,d+i+1)]-e[o+Math.max(0,d-i)]}for(let c=0;c<n;c++){let o=0;for(let f=-i;f<=i;f++)o+=t[Math.max(0,Math.min(a-1,f))*n+c];for(let f=0;f<a;f++)e[f*n+c]=o/l,o+=t[Math.min(a-1,f+i+1)*n+c]-t[Math.max(0,f-i)*n+c]}}function fa(e,t,n,a,i,l,c){let o=n*a,f=c.take(),d=c.take(t),m=c.take(e),g=c.take(),w=c.take();for(let T=0;T<o;T++)g[T]=t[T]*t[T],w[T]=t[T]*e[T];Dt(d,f,n,a,i),Dt(m,f,n,a,i),Dt(g,f,n,a,i),Dt(w,f,n,a,i);for(let T=0;T<o;T++){let M=(w[T]-d[T]*m[T])/(g[T]-d[T]*d[T]+l);g[T]=M,w[T]=m[T]-M*d[T]}Dt(g,f,n,a,i),Dt(w,f,n,a,i);for(let T=0;T<o;T++)e[T]=g[T]*t[T]+w[T]}function ha(e,t,n,a,i,l=2){for(let c=0;c<l;c++){for(let o=0;o<a;o++)for(let f=0;f<n;f++){let d=o*n+f,m=e[d];f>0&&(m=Math.max(m,Math.min(t[d],e[d-1]*i))),o>0&&(m=Math.max(m,Math.min(t[d],e[d-n]*i),f>0?Math.min(t[d],e[d-n-1]*i):0,f<n-1?Math.min(t[d],e[d-n+1]*i):0)),e[d]=m}for(let o=a-1;o>=0;o--)for(let f=n-1;f>=0;f--){let d=o*n+f,m=e[d];f<n-1&&(m=Math.max(m,Math.min(t[d],e[d+1]*i))),o<a-1&&(m=Math.max(m,Math.min(t[d],e[d+n]*i),f>0?Math.min(t[d],e[d+n-1]*i):0,f<n-1?Math.min(t[d],e[d+n+1]*i):0)),e[d]=m}}}function Zr(e,t,n,a,i){for(let l=0;l<a;l++)for(let c=0;c<n;c++){let o=1;for(let f=Math.max(0,c-i);f<=Math.min(n-1,c+i);f++)o=Math.min(o,e[l*n+f]);t[l*n+c]=o}for(let l=0;l<a;l++)for(let c=0;c<n;c++){let o=1;for(let f=Math.max(0,l-i);f<=Math.min(a-1,l+i);f++)o=Math.min(o,t[f*n+c]);e[l*n+c]=o}}function El(e,t,n,a,i){let l=n*a,c=Math.min(n,a),o=i.take(),f=i.take(),d=i.take(),m=i.take(),g=i.take();for(let h=0;h<l;h++){let P=e[h*4+3]/255;g[h]=P,o[h]=t[h*4]/255*P,f[h]=t[h*4+1]/255*P,d[h]=t[h*4+2]/255*P,m[h]=(e[h*4]*.299+e[h*4+1]*.587+e[h*4+2]*.114)/255*P}let w=i.take(),T=(h,P)=>{let R=i.take(h);return ye(R,w,n,a,P),R},M=Math.max(2,Math.round(c*.04)),x=Math.max(M+2,Math.round(c*.12)),F=Math.max(2,Math.round(c*.05)),v=T(m,1),A=T(m,M),r=T(m,x),E=i.take(),L=i.take(),Y=i.take(),Q=i.take(),re=i.take();for(let h=0;h<a;h++)for(let P=0;P<n;P++){let R=h*n+P;E[R]=Math.abs(m[R]-v[R]),L[R]=Math.abs(v[R]-A[R]),Y[R]=Math.abs(A[R]-r[R]),Q[R]=Math.abs(m[h*n+Math.min(n-1,P+1)]-m[h*n+Math.max(0,P-1)]),re[R]=Math.abs(m[Math.min(a-1,h+1)*n+P]-m[Math.max(0,h-1)*n+P])}ye(E,w,n,a,F),ye(L,w,n,a,F),ye(Y,w,n,a,F),ye(Q,w,n,a,2),ye(re,w,n,a,2);let J=Math.max(.01,je(E,.9)+je(L,.9)),ne=T(o,1),_=T(f,1),ee=T(d,1),K=i.take(),S=i.take(),D=i.take(),Z=0;for(let h=0;h<l;h++){let P=ne[h],R=_[h],ge=ee[h],ce=Math.max(P,R,ge),j=Math.min(P,R,ge),ue=ce-j;D[h]=ce,S[h]=ce>.001?ue/ce:0,Z+=ue;let me=0;ue>1e-4&&(me=ce===P?((R-ge)/ue+6)%6:ce===R?(ge-P)/ue+2:(P-R)/ue+4),K[h]=me*60}let q=G(.02,.07,Z/l),C=Math.max(2,Math.round(a*.06)),U=new Float32Array(a);for(let h=0;h<a;h++){let P=0;for(let R=0;R<n;R++)P+=E[h*n+R]+L[h*n+R];U[h]=P/n}let H=.5,te=0;for(let h=Math.max(C,Math.round(a*.12));h<=Math.min(a-C,Math.round(a*.88));h++){let P=0,R=0,ge=0,ce=0;for(let X=0;X<n;X++){let ie=0,fe=0,Ce=0,Se=0,Ge=0,Ie=0;for(let _e=1;_e<=C;_e++){let lt=(h-_e)*n+X,Ze=(h+_e-1)*n+X;ie+=ne[lt],fe+=_[lt],Ce+=ee[lt],Se+=ne[Ze],Ge+=_[Ze],Ie+=ee[Ze]}let ze=(Math.abs(ie-Se)+Math.abs(fe-Ge)+Math.abs(Ce-Ie))/C;P+=ze,R+=ze>.12?1:0}let j=Math.max(2,Math.round(a*.15)),ue=Math.max(0,h-j),me=Math.min(a,h+j);for(let X=ue;X<h;X++)ge+=U[X];for(let X=h;X<me;X++)ce+=U[X];ge/=h-ue,ce/=me-h;let I=G(-.05,.3,(ce-ge)/(ce+ge+1e-4)),B=G(.08,.35,P/n)*(R/n)*I;B>te&&(te=B,H=h/a)}let le=G(.15,.45,te),pe=i.take(),De=i.take(),V=i.take();for(let h=0;h<l;h++)pe[h]=Math.min(o[h],f[h],d[h]);Zr(pe,w,n,a,1),ye(pe,w,n,a,M);for(let h=0;h<l;h++)De[h]=L[h]+Y[h];let ae=0,Re=0,Me=0;for(let h=0;h<l;h++)ae+=ne[h],Re+=_[h],Me+=ee[h];ae/=l,Re/=l,Me/=l;let xe=T(ne,M),Le=T(_,M),Te=T(ee,M),$e=T(ne,x),tt=T(_,x),O=T(ee,x);for(let h=0;h<l;h++){let P=Math.hypot(xe[h]-ae,Le[h]-Re,Te[h]-Me),R=Math.hypot(xe[h]-$e[h],Le[h]-tt[h],Te[h]-O[h]);V[h]=(P+R*1.5)*(.4+.6*S[h]*q+.4*(1-q))}let ve=i.take(),He=i.take(),Ke=i.take(),de=i.take(),Ye=i.take(),Xe=i.take(),Fe=i.take(),rt=i.take(),ht=i.take(),nt=i.take();for(let h=0;h<a;h++)for(let P=0;P<n;P++)nt[h*n+P]=Math.abs(m[Math.min(a-1,h+1)*n+P]-m[Math.max(0,h-1)*n+P]);ye(nt,w,n,a,1);for(let h=0;h<a;h++)for(let P=0;P<n;P++){let R=h*n+P,ge=(h+.5)/a,ce=K[R],j=S[R]*q,ue=D[R],me=E[R]+L[R],I=G(175,200,ce)*(1-G(250,275,ce))*G(.08,.25,j),B=(1-G(45,65,ce)+G(290,330,ce))*G(.2,.45,j)*G(.3,.55,ue),X=(1-G(.15,.35,j))*G(.45,.7,ue)*le,ie=(1-G(.08,.2,ue))*le,fe=le>.3?1-G(H,H+.1,ge):1-G(.4,.8,ge),Ce=1-G(.02,.06,me),Se=1-G(.03,.09,me);He[R]=Math.max(I*Ce,ie*.7*(1-G(.008,.025,me)),B*Se*.9)*fe,Ke[R]=Math.max(He[R],X*Ce*fe),ve[R]=h===0?He[R]:0,de[R]=G(150,172,ce)*(1-G(232,250,ce))*G(.25,.45,j),Fe[R]=G(1.3,2.2,(Q[R]+.004)/(re[R]+.004))*G(.35,.55,v[R])*(1-G(.1,.18,S[R]*q))*G(.025,.07,me)*G(.025,.045,nt[R]);let Ge=1-G(.18,.4,j),Ie=G(.55,.8,ue)*G(.05,.12,me);Ye[R]=Math.max(de[R],Ge*.85,Ie*.8)}ha(ve,He,n,a,.995,1),ha(ve,Ke,n,a,.8,1);let dt=0;for(let h=0;h<l;h++)dt+=ve[h];let at=dt>l*.04&&le>.3;if(at)for(let h=0;h<a;h++)for(let P=0;P<n;P++)de[h*n+P]*=G(H,H+.05,(h+.5)/a);if(at){let h=i.take(),P=i.take(),R=i.take();for(let I=0;I<l;I++)h[I]=xe[I]*.299+Le[I]*.587+Te[I]*.114;for(let I=0;I<a;I++)for(let B=0;B<n;B++)P[I*n+B]=v[Math.min(a-1,I+1)*n+B]-v[Math.max(0,I-1)*n+B];let ge=new Uint8Array(l);for(let I=1;I<a-1;I++)for(let B=0;B<n;B++){let X=Math.abs(P[I*n+B]),ie=X>.03;for(let fe=-3;fe<=3&&ie;fe++)fe&&I+fe>=0&&I+fe<a&&Math.abs(P[(I+fe)*n+B])>X&&(ie=!1);ge[I*n+B]=ie?1:0}let ce=(I,B,X,ie=!0)=>{let fe=xe[B]+Le[B]+Te[B]+.05,Ce=xe[X]+Le[X]+Te[X]+.05,Se=Math.abs(xe[B]/fe-xe[X]/Ce)+Math.abs(Le[B]/fe-Le[X]/Ce)+Math.abs(Te[B]/fe-Te[X]/Ce),Ge=Math.min(Math.abs(K[B]-K[X]),360-Math.abs(K[B]-K[X])),Ie=Math.max(1-G(.1,.25,Se),(1-G(15,35,Ge))*G(.15,.3,Math.min(S[B],S[X]))),ze=Math.max(G(2,3,(re[B]+.004)/(Q[B]+.004))*G(.015,.04,E[B]+L[B])*G(.4,.55,E[B]/(E[B]+L[B]+1e-4)),1-G(.12,.25,h[B]));return Ie*(ie?ze:1)*(1-G(h[X]*.82+.02,h[X]*1.02+.05,h[B]))},j=0,ue=0;for(let I=Math.max(3,Math.round(a*Math.max(.25,H)));I<Math.round(a*.88);I++){let B=0;for(let ie=0;ie<n;ie++)(ge[(I-1)*n+ie]||ge[I*n+ie]||ge[(I+1)*n+ie])&&B++;if(B<n*.5)continue;let X=0;for(let ie=I+1;ie<Math.min(a,2*I);ie++)for(let fe=0;fe<n;fe++)X+=ce(I,ie*n+fe,(2*I-ie)*n+fe);X>ue&&(ue=X,j=I)}let me=G(.05,.1,ue/l);if(me>0)for(let I=j+1;I<Math.min(a,2*j);I++)for(let B=0;B<n;B++){let X=I*n+B;rt[X]=ce(j,X,(2*j-I)*n+B)*me,ht[X]=ce(j,X,(2*j-I)*n+B,!1)*me,R[X]=rt[X]}ye(R,w,n,a,1);for(let I=0;I<l;I++)rt[I]=Math.max(rt[I],R[I]),de[I]=Math.max(de[I],rt[I])}let ot=T(de,x);for(let h=0;h<l;h++)de[h]*=G(.15,.35,ot[h]);let Tr=T(de,M);for(let h=0;h<l;h++){de[h]*=1-He[h]*.8;let P=Math.min(Math.abs(K[h]-200),360-Math.abs(K[h]-200));Xe[h]=G(.28,.45,S[h]*q)*G(55,80,P)*(1-G(.3,.6,ht[h]))}let Fr=T(Xe,M);for(let h=0;h<l;h++)Xe[h]=Math.max(Xe[h]*(1-(1-G(.15,.3,Fr[h]))*G(.55,.7,D[h])*G(.5,.65,S[h])),1-g[h]),Ye[h]=Math.min(Math.max(Ye[h],ht[h]*.9),Math.max(de[h],G(.25,.6,Tr[h])))*(1-ve[h])*(1-Xe[h]);ha(de,Ye,n,a,.97);let Bt=i.take(Fe),it=Math.max(2,Math.round(a*.12));for(let h=0;h<n;h++){let P=0;for(let R=-it;R<=it;R++)P+=Fe[Math.max(0,Math.min(a-1,R))*n+h];for(let R=0;R<a;R++)Bt[R*n+h]=P/(it*2+1),P+=Fe[Math.min(a-1,R+it+1)*n+h]-Fe[Math.max(0,R-it)*n+h]}ye(Bt,w,n,a,1);for(let h=0;h<l;h++)Fe[h]=G(.2,.45,Bt[h])*G(.2,.5,Fe[h]+Bt[h]*.5)*(1-ve[h]);fa(ve,m,n,a,Math.max(2,Math.round(c*.04)),.002,i),fa(de,m,n,a,Math.max(2,Math.round(c*.04)),.002,i),fa(Fe,m,n,a,Math.max(2,Math.round(c*.03)),.002,i),ye(Xe,w,n,a,1);for(let h=0;h<l;h++)ve[h]=G(.3,.7,ve[h])*g[h],Fe[h]=G(.3,.7,Fe[h])*g[h]*(1-ve[h]),de[h]=G(.3,.7,de[h])*(1-ve[h])*(1-Fe[h])*(1-G(.15,.4,Xe[h]));Zr(ve,w,n,a,2),Zr(de,w,n,a,2),Zr(Fe,w,n,a,1),ye(ve,w,n,a,1),ye(de,w,n,a,1),ye(Fe,w,n,a,1);let Qe=1/Math.max(.02,je(V,.97)),tr=1/Math.max(.01,je(De,.9)),mt=je(pe,.97),se=je(pe,.1),Ve=G(.06,.25,mt-se),ke=i.take();for(let h=0;h<a;h++)for(let P=0;P<n;P++){let R=h*n+P,ge=(P+.5)/n,ce=(h+.5)/a,j=Math.max(ve[R],de[R]),ue=E[R]+L[R]+Y[R],me=Be(((E[R]+L[R]*.6)/(ue+.004)-.25)/.55)*.6+Be((E[R]+L[R])/J)*.4,I=G(.04,.35,ue/J)*(1-j),B=Be((pe[R]-se)/Math.max(.05,mt-se))*.55+(1-Be(De[R]*tr))*.25+Be((ee[R]-ne[R])*2+.3)*.2*q,X=Ve*G(.12,.35,A[R])*(.4+.6*le),ie=ce<H?.45:.45+.55*G(0,1,(ce-H)/Math.max(.15,1-H)),fe=le*ie+(1-le)*(.5+(ce-.5)*.4),Ce=E[R]/(E[R]+L[R]+1e-4),Se=G(.2,.7,(E[R]+L[R])/J)*(.35+.65*le)*(1-j),Ge=1-Be(Math.hypot((ge-.5)*1.2,ce-.52)*1.5),Ie=Be(V[R]*Qe)*(.55+.45*Ge),ze=.3*I,_e=.25*X,lt=.12+.45*le,Ze=.12*Se,st=.35*(1-.4*le)*(1-j);ke[R]=(ze*me+_e*(1-B)+lt*fe+Ze*Be(1.6-Ce*1.6)+st*Ie+.08*.5)/(ze+_e+lt+Ze+st+.08)*(1-.85*ve[R])*(1-.45*de[R]*(1-le))}let At=Yr(e,n,a);if(At.key!=="none")for(let h=0;h<l;h++)ke[h]=At.subject[h]*.7+ke[h]*.3;return ye(ke,w,n,a,Math.max(1,Math.round(c*.03))),yl(ke,ne,_,ee,n,a,Math.max(2,Math.round(c*.07)),.004,i),{depth:ke,water:de,sky:ve,falls:Fe}}function Jr(e,t,n,a,i,l,c){if(t===l&&n===c)return e[i*l+a];let o=Math.max(0,Math.min(t-1,(a+.5)*t/l-.5)),f=Math.max(0,Math.min(n-1,(i+.5)*n/c-.5)),d=Math.min(t-2,Math.floor(o)),m=Math.min(n-2,Math.floor(f)),g=o-d,w=f-m;if(d<0||m<0)return e[Math.round(f)*t+Math.round(o)];let T=m*t+d,M=T+t;return(e[T]*(1-g)+e[T+1]*g)*(1-w)+(e[M]*(1-g)+e[M+1]*g)*w}function ai(e,t,n,a,i=e){let l=t*n,c=a?.length===l*Gt?a:new Float32Array(l*Gt);if(!l)return c;let o=Math.min(t,n),f=new Float32Array(l),d=new Float32Array(l),m=new Float32Array(l),g=new Float32Array(l),w=new Float32Array(l),T=new Float32Array(l);for(let C=0;C<l;C++){let U=e[C*4+3]/255;f[C]=(e[C*4]*.299+e[C*4+1]*.587+e[C*4+2]*.114)/255*U}d.set(f),ye(d,T,t,n,Math.max(1,Math.round(o*.012))),m.set(f),ye(m,T,t,n,Math.max(1,Math.round(o*.03)));for(let C=0;C<l;C++){g[C]=Math.abs(f[C]-d[C]);let U=Math.max(0,f[C]-.55)/.45;w[C]=U*U}ye(g,T,t,n,Math.max(1,Math.round(o*.02)));let M=1/Math.max(.02,je(g,.95));ye(w,T,t,n,Math.max(1,Math.round(o*.05)));let x=1/Math.max(.03,je(w,.98)),F=Math.max(1,Math.ceil(Math.sqrt(l/vl))),v=Math.max(1,Math.floor(t/F)),A=Math.max(1,Math.floor(n/F)),r=v*A,E=e,L=i;if(F>1){let C=new Uint8ClampedArray(r*4),U=i===e?C:new Uint8ClampedArray(r*4);for(let H=0;H<A;H++)for(let te=0;te<v;te++){let le=[0,0,0,0,0,0,0];for(let V=H*F;V<(H+1)*F;V++)for(let ae=te*F;ae<(te+1)*F;ae++){let Re=(V*t+ae)*4;for(let Me=0;Me<4;Me++)le[Me]+=e[Re+Me];if(U!==C)for(let Me=0;Me<3;Me++)le[4+Me]+=i[Re+Me]}let pe=(H*v+te)*4,De=F*F;for(let V=0;V<4;V++)C[pe+V]=le[V]/De;if(U!==C){for(let V=0;V<3;V++)U[pe+V]=le[4+V]/De;U[pe+3]=C[pe+3]}}E=C,L=U}Qr?.n!==r&&(Qr=new da(r)),Qr.reset();let{depth:Y,water:Q,sky:re,falls:J}=El(E,L,v,A,Qr),ne=je(Y,.03),_=je(Y,.97),ee=Math.max(.05,_-ne),K=0,S=0,D=0,Z=new Float32Array(l);for(let C=0;C<n;C++)for(let U=0;U<t;U++){let H=C*t+U,te=H*Gt,le=Be((Jr(Y,v,A,U,C,t,n)-ne)/ee);c[te+1]=le,c[te+8]=Be(Jr(Q,v,A,U,C,t,n)),c[te+9]=Be(Jr(re,v,A,U,C,t,n)),c[te+10]=Be(Jr(J,v,A,U,C,t,n));let pe=le*le*le*(.25+f[H]);K+=(U+.5)/t*pe,S+=(C+.5)/n*pe,D+=pe,Z[H]=Math.hypot(m[C*t+Math.min(t-1,U+1)]-m[C*t+Math.max(0,U-1)],m[Math.min(n-1,C+1)*t+U]-m[Math.max(0,C-1)*t+U])}K=D>0?Math.max(.3,Math.min(.7,K/D)):.5,S=D>0?Math.max(.3,Math.min(.7,S/D)):.5;let q=1/Math.max(.004,je(Z,.97));for(let C=0;C<n;C++)for(let U=0;U<t;U++){let H=C*t+U,te=H*Gt,le=(m[C*t+Math.min(t-1,U+1)]-m[C*t+Math.max(0,U-1)])*q,pe=(m[Math.min(n-1,C+1)*t+U]-m[Math.max(0,C-1)*t+U])*q;c[te]=m[H],c[te+2]=Math.min(1,w[H]*x),c[te+3]=Math.min(1,g[H]*M),c[te+4]=Math.max(-1,Math.min(1,-le)),c[te+5]=Math.max(-1,Math.min(1,-pe)),c[te+6]=K,c[te+7]=S}return c}var Zt=(e,t,n)=>{let a=Math.max(0,Math.min(1,(n-e)/(t-e)));return a*a*(3-2*a)},en=class{constructor(t,n){this.base=40;this.mass=0;this.calm=0;this.drift=[0,0];this.fade=3;this.age=0;this.peak=0;this.front=0;this.live=!1;this.bins=new Uint32Array(64);this.spare=new Float32Array(0);this.cols=Math.max(3,t|0),this.rows=Math.max(3,n|0);let a=this.cols*this.rows;this.h=new Float32Array(a),this.p=new Float32Array(a),this.speed=new Float32Array(a).fill(1),this.damp=new Float32Array(a).fill(1),this.wall=new Float32Array(a),this.trace=new Float32Array(a)}clear(){this.h.fill(0),this.p.fill(0),this.trace.fill(0),this.live=!1,this.peak=0}drop(t,n,a=1,i=3){let{cols:l,rows:c,h:o,p:f}=this,d=Math.max(1,i),m=Math.ceil(d*3);for(let g=Math.max(1,Math.floor(n-m));g<Math.min(c-1,Math.ceil(n+m));g++)for(let w=Math.max(1,Math.floor(t-m));w<Math.min(l-1,Math.ceil(t+m));w++){let T=w-t,M=g-n,x=(T*T+M*M)/(d*d),F=a*(1-x)*Math.exp(-x),v=g*l+w;o[v]+=F,f[v]+=F}this.age=0,this.live=!0,this.peak=Math.max(this.peak,a),this.front=Math.max(this.front,a)}step(t,n=1){if(!this.live||!(t>0))return this.live;t=Math.min(.05,t),this.age+=t;let{cols:a,rows:i,speed:l,damp:c,wall:o,trace:f}=this,d=Math.max(0,this.base*n),m=0;for(let _=0;_<l.length;_++)l[_]>m&&(m=l[_]);let g=Math.max(1,Math.min(8,Math.ceil(d*t*Math.sqrt(m)/.6))),w=this.calm,T=t/g,M=d*T*(d*T),x=this.mass*T*T,F=this.h,v=this.p;for(let _=0;_<g;_++){for(let K=1;K<i-1;K++)for(let S=1,D=K*a+1;S<a-1;S++,D++){let Z=F[D],q=F[D-1]+F[D+1]+F[D-a]+F[D+a]-4*Z,C=f[D],U=C>.02?Math.max(0,1-Math.abs(Z)/C):0,H=w*U*U*T,te=1-Math.min(.5,c[D]*T+H);v[D]=(Z+(Z-v[D])*te+M*l[D]*q-x*Z)*(1-o[D])*(1-Math.min(.5,H*.5))}let ee=F;F=v,v=ee}this.h=F,this.p=v;let A=this.drift[0]*t,r=this.drift[1]*t;(A||r)&&(this.carry(F,A,r),this.carry(v,A,r));for(let _=0;_<a;_++)F[_]=F[a+_]*.5,F[(i-1)*a+_]=F[(i-2)*a+_]*.5;for(let _=0;_<i;_++)F[_*a]=F[_*a+1]*.5,F[_*a+a-1]=F[_*a+a-2]*.5;let E=Math.exp(-t*this.fade),L=0;for(let _=0;_<F.length;_++){let ee=Math.abs(F[_]);ee>L&&(L=ee);let K=f[_]*E;f[_]=ee>=K?ee:K<1e-4?0:K}this.peak=L;let Y=this.bins.fill(0),Q=L*.05,re=0;for(let _=0;_<F.length;_++)F[_]>Q&&(Y[Math.min(63,F[_]/L*64|0)]++,re++);let J=0,ne=63;for(;ne>0&&(J+=Y[ne],!(J>=re*.08));ne--);return this.front=Math.max(L*.15,(ne+1)/64*L),L<.004?(this.clear(),!1):!0}carry(t,n,a){let{cols:i,rows:l}=this;this.spare.length!==t.length&&(this.spare=new Float32Array(t.length));let c=this.spare;for(let o=0,f=0;o<l;o++){let d=Math.min(l-1.001,Math.max(0,o-a)),m=d|0,g=d-m;for(let w=0;w<i;w++,f++){let T=Math.min(i-1.001,Math.max(0,w-n)),M=T|0,x=T-M,F=m*i+M;c[f]=(t[F]*(1-x)+t[F+1]*x)*(1-g)+(t[F+i]*(1-x)+t[F+i+1]*x)*g}}t.set(c)}slope(t,n){let{h:a,cols:i}=this,l=a.length;return n[0]=(a[Math.min(l-1,t+1)]-a[Math.max(0,t-1)])*.5,n[1]=(a[Math.min(l-1,t+i)]-a[Math.max(0,t-i)])*.5,n}};function ii(e,t,n=[-.5,-.8],a=e.cols,i=e.rows){let{cols:l,rows:c,speed:o,damp:f,wall:d}=e,m=Gt;if(t.length!==a*i*m)return n;let g=0,w=0,T=0;for(let M=0,x=0;M<c;M++){let F=Math.min(i-1,M*i/c|0);for(let v=0;v<l;v++,x++){let A=Math.min(a-1,v*a/l|0),r=(F*a+A)*m,E=t[r+3],L=t[r+8],Y=t[r+9],Q=t[r+2],re=t[r+1],J=A<a-1?m:0,ne=A>0?-m:0,_=F<i-1?a*m:0,ee=F>0?-a*m:0,K=Math.hypot(t[r+1+J]-t[r+1+ne],t[r+1+_]-t[r+1+ee]),S=Math.hypot(t[r+4],t[r+5]),D=Math.max(L,Y*.9),Z=1-Zt(.2,.8,E),q=Math.max(.12,Math.max(D,.2+.65*Z)*(1-.45*Zt(.55,.95,re)*(1-L)));o[x]=q*q;let C=Math.max(0,1-D);f[x]=.9*L+1.6*Y*(1-L)+C*(1.4+6.5*Zt(.25,.9,E)),d[x]=Math.min(.4,.35*Zt(.12,.35,K)*(1-L*.6)+.1*Zt(.6,1,S)*(1-D)),g+=(v/(l-1)-.5)*Q,w+=(M/(c-1)-.5)*Q,T+=Q}}if(oi(o,l,c,2),oi(f,l,c,1),T>.5){let M=Math.hypot(g,w);M/T>.02&&(n[0]=g/M,n[1]=w/M)}return n}function oi(e,t,n,a){let i=new Float32Array(e.length);for(let l=0;l<2;l++){let c=l?i:e,o=l?e:i;for(let f=0;f<n;f++)for(let d=0;d<t;d++){let m=0,g=0;for(let w=-a;w<=a;w++){let T=l?d:d+w,M=l?f+w:f;T<0||M<0||T>=t||M>=n||(m+=c[M*t+T],g++)}o[f*t+d]=m/g}}}function li(e,t,n,a,i=1,l=e.cols,c=e.rows){let{cols:o,rows:f,h:d,trace:m}=e,g=Gt,w=i/Math.max(.01,e.front),T=n[0],M=n[1],x=t.length===l*c*g;for(let F=0,v=0;F<f;F++){let A=Math.min(c-1,F*c/f|0);for(let r=0;r<o;r++,v++){let E=d[v]*w,L=(A*l+Math.min(l-1,r*l/o|0))*g,Y=x?t[L+9]:0,Q=x?Math.max(t[L+8],.75*(1-Zt(.1,.45,t[L+3]))*(1-Y)):0,re=Math.max(0,1-Math.max(Q,Y)),J=(d[r<o-1?v+1:v]-d[r>0?v-1:v])*.5*w,ne=(d[F<f-1?v+o:v]-d[F>0?v-o:v])*.5*w,_=-J*6+(x?t[L+4]*.35:0),ee=-ne*6+(x?t[L+5]*.35:0),K=_*T+ee*M,S=Math.max(-1,Math.min(1,K)),D=E>0?E:E*.45,Z=Q*(D*.8+S*.4*Math.min(1,Math.abs(E)*4))+Y*(Math.min(1,m[v]*w)*.3+D*.15)+re*(D*.55+S*.25*Math.min(1,Math.abs(E)*4)),q=Q*Math.max(0,S)**3*Math.min(1,Math.max(0,E)*3)*.9+re*Math.max(0,S)**4*Math.min(1,Math.max(0,E)*3)*.25;Z=Math.max(-1,Math.min(1,Z));let C=Math.round(Z*32767+32768);a[v*4]=C>>>8,a[v*4+1]=C&255,a[v*4+2]=Math.round(Math.min(1,q)*255),a[v*4+3]=255}}return a}var Ml=["none","flow","orb","drift","swell","caustics","contour","aurora","ripple","halo","interference","mesh","cascade","constellation"],It=["glyph","dot","pixel","mosaic","lego","voxel","disco","dither","hex","led","cmyk","stipple","engraving","crosshatch","woodblock","risograph","pointillism","inlay","tick","bayer"],Tl=[{value:"fluid",label:"Fluid",description:"An ink-in-water wake that bends the image and swirls the characters."},{value:"lantern",label:"Lantern",description:"A soft light follows the pointer and lifts the characters it passes, without distortion."},{value:"trail",label:"Trail",description:"The Asciify Trail: in the wake, sparse characters fill in and dense ones open up, then settle. No distortion."},{value:"loupe",label:"Loupe",description:"A glass loupe glides after the pointer and magnifies the characters it covers."},{value:"reveal",label:"Reveal",description:"Under a soft spotlight the characters take the source image's own colours. Best over a photo or video in one ink."},{value:"none",label:"Off",description:"The field stays still under the pointer."}],Fl={radius:.13,strength:.5,trail:.45,follow:12},wl={bloom:0,bloomRadius:2,scanlines:0,grain:0,chroma:0,curvature:0},kl={strength:.55,radius:.45},ft={radius:.075,force:1,dissipation:1.6,refraction:.03,glow:.55,resolution:128,curl:24},Al={charset:" .,:-=+*#%@",cellSize:12,cellAspect:1,cellFit:"pixel",font:'ui-monospace, "SF Mono", Menlo, Consolas, monospace',fontWeight:500,glyphScale:.8,mark:"glyph",dotScale:.9,markAngle:-35,accents:0,shuffle:0,sample:"area",linePitch:.5,lineWeight:1,sparkle:0,textRepeat:"flow",glyphOrder:"tone",color:"ink",ink:"#f3ba32",highlight:"auto",background:"transparent",brightness:0,contrast:1,gamma:1,invert:!1,levels:"auto",blend:"auto",saturation:1.1,ramp:[],shade:.5,backdrop:0,fit:"cover",focus:{x:.5,y:.5},vignette:0,drift:0,scene:"flow",scale:1,clear:!1,speed:1,hover:"fluid",fluid:ft,lantern:Fl,trail:kl,post:wl,scope:"all",tap:"surface",maxPixelRatio:2,respectReducedMotion:!0},z=(e,t,n,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):a,rn=(e,t)=>typeof e=="string"&&/^#([\\da-f]{3}|[\\da-f]{6})$/i.test(e.trim())?e.trim().toLowerCase():t,si=/^[\\u0020-\\u007e\\u00a0-\\u02ff\\u0370-\\u0482\\u048a-\\u052f\\u2010-\\u20cf\\u2100-\\u2bff]*$/,tn;function Tt(e){return nn(e).slice()}var vr=new Map;function nn(e){let t=vr.get(e);if(t)return t;let n=Rl(e);return vr.size>=32&&vr.delete(vr.keys().next().value),vr.set(e,n),n}function Rl(e){if(!si.test(e)&&tn===void 0){let n=Intl.Segmenter;tn=n?new n(void 0,{granularity:"grapheme"}):null}return(tn&&!si.test(e)?Array.from(tn.segment(e),n=>n.segment):Array.from(e)).filter(n=>n!==\`
\`&&n!=="\\r"&&n!=="	").slice(0,256)}function Sl(e){let t=Tt(e).filter(n=>n.trim());return t.length>0&&t.filter($r).length*2>t.length}var Ll=(e,t,n)=>{let a=It.includes(e)?e:t;return(a==="glyph"||a==="inlay")&&Sl(n)},Cl=(e,t)=>{if(!Array.isArray(e))return t;let n=e.map(a=>rn(a,"")).filter(Boolean).slice(0,6);return n.length>=2?n:[]};function ma(e={},t=Al){let n=typeof e.charset=="string"&&Tt(e.charset).length>=2?e.charset:t.charset,a=t.fluid||ft,i=e.fluid===void 0?t.fluid:e.fluid,l=i===!1?!1:(()=>{let m=i===!0||!i?a:{...a,...i};return{radius:z(m.radius,.005,.5,ft.radius),force:z(m.force,0,8,ft.force),dissipation:z(m.dissipation,.05,20,ft.dissipation),refraction:z(m.refraction,0,.5,ft.refraction),glow:z(m.glow,0,2,ft.glow),resolution:Math.round(z(m.resolution,16,512,ft.resolution)),curl:z(m.curl,0,80,ft.curl)}})(),c=Ml.includes(e.scene)?e.scene:t.scene,o=!!e.clear&&typeof e.clear=="object"&&("element"in e.clear||"nodeType"in e.clear||"rects"in e.clear),f=e.clear===void 0||o?t.clear:e.clear,d=f?{x:z(f.x,-.5,1.5,.25),y:z(f.y,-.5,1.5,.3),width:z(f.width,0,2,.5),height:z(f.height,0,2,.4),feather:z(f.feather,.005,1,.12),shape:f.shape==="rect"?"rect":"ellipse",pointer:z(f.pointer,0,1,0)}:!1;return{charset:n,cellSize:z(e.cellSize,1,96,t.cellSize),cellAspect:Ll(e.mark,t.mark,n)?Math.max(1,z(e.cellAspect,.3,2,t.cellAspect)):z(e.cellAspect,.3,2,t.cellAspect),cellFit:e.cellFit==="fill"||e.cellFit==="pixel"?e.cellFit:t.cellFit,font:typeof e.font=="string"&&e.font.trim()?e.font:t.font,fontWeight:Math.round(z(e.fontWeight,100,900,t.fontWeight)),glyphScale:z(e.glyphScale,.3,1.6,t.glyphScale),mark:It.includes(e.mark)?e.mark:t.mark,dotScale:z(e.dotScale,.1,1.4,t.dotScale),markAngle:z(e.markAngle,-360,360,t.markAngle),accents:z(e.accents,0,.3,t.accents),shuffle:z(e.shuffle,0,4,t.shuffle),sample:e.sample==="point"||e.sample==="area"||e.sample==="shape"?e.sample:t.sample,linePitch:z(e.linePitch,.2,4,t.linePitch),lineWeight:z(e.lineWeight,.2,3,t.lineWeight),sparkle:z(e.sparkle,0,.05,t.sparkle),textRepeat:e.textRepeat==="row"||e.textRepeat==="flow"?e.textRepeat:t.textRepeat,glyphOrder:e.glyphOrder==="text"||e.glyphOrder==="tone"||e.glyphOrder==="scatter"?e.glyphOrder:t.glyphOrder,color:e.color==="source"||e.color==="ink"?e.color:t.color,ink:rn(e.ink,t.ink),highlight:e.highlight==="auto"?"auto":rn(e.highlight,t.highlight),ramp:Cl(e.ramp,t.ramp),background:e.background==="transparent"?"transparent":rn(e.background,t.background),brightness:z(e.brightness,-1,1,t.brightness),contrast:z(e.contrast,0,4,t.contrast),gamma:z(e.gamma,.2,5,t.gamma),invert:typeof e.invert=="boolean"?e.invert:t.invert,levels:e.levels==="none"||e.levels==="auto"?e.levels:t.levels,blend:e.blend==="auto"||e.blend==="coarse"||e.blend==="on"||e.blend==="off"?e.blend:t.blend,saturation:z(e.saturation,0,3,t.saturation),shade:z(e.shade,0,1,t.shade),backdrop:z(e.backdrop,0,1,t.backdrop),fit:e.fit==="contain"||e.fit==="cover"?e.fit:t.fit,focus:{x:z(e.focus?.x,0,1,t.focus.x),y:z(e.focus?.y,0,1,t.focus.y)},vignette:z(e.vignette,0,1,t.vignette),drift:z(e.drift,0,2,t.drift),scene:c,scale:z(e.scale,.2,6,t.scale),clear:d,speed:z(e.speed,0,5,t.speed),hover:Tl.some(m=>m.value===e.hover)?e.hover:t.hover,fluid:l,lantern:{radius:z(e.lantern?.radius,.02,.6,t.lantern.radius),strength:z(e.lantern?.strength,0,1.5,t.lantern.strength),trail:z(e.lantern?.trail,0,3,t.lantern.trail),follow:z(e.lantern?.follow,1,60,t.lantern.follow)},trail:{strength:z(e.trail?.strength,0,1,t.trail.strength),radius:z(e.trail?.radius,.1,1,t.trail.radius)},post:{bloom:z(e.post?.bloom,0,2,t.post.bloom),bloomRadius:z(e.post?.bloomRadius,.5,8,t.post.bloomRadius),scanlines:z(e.post?.scanlines,0,1,t.post.scanlines),grain:z(e.post?.grain,0,1,t.post.grain),chroma:z(e.post?.chroma,0,1,t.post.chroma),curvature:z(e.post?.curvature,0,1,t.post.curvature)},scope:e.scope===void 0?t.scope:ni(e.scope),tap:e.tap==="ring"||e.tap==="none"||e.tap==="surface"?e.tap:t.tap,maxPixelRatio:z(e.maxPixelRatio,.5,4,t.maxPixelRatio),respectReducedMotion:typeof e.respectReducedMotion=="boolean"?e.respectReducedMotion:t.respectReducedMotion}}function pa(e,t,n,a,i,l={x:.5,y:.5}){if(!(e>0&&t>0&&n>0&&a>0))return{scale:[1,1],offset:[0,0]};let c=e/t,o=n/a,f=o>c,d=i==="cover"?f?[c/o,1]:[1,o/c]:f?[1,o/c]:[c/o,1],m=i==="cover"?[(1-d[0])*l.x,(1-d[1])*l.y]:[(1-d[0])*.5,(1-d[1])*.5];return{scale:d,offset:m}}function ci(e,t,n,a,i,l,c=8){if(!(n>=16&&a>=16&&e>0&&t>0&&i>0))return 1;let o=l==="cover"?Math.min(e/n,t/a):Math.max(e/n,t/a),f=c/i/o;return f>.5?1:2**-Math.floor(Math.log2(1/f))}function ui(e,t,n,a,i,l,c){if(e!=="fill"||!(i>0&&l>0))return[c.width,c.height];let o=t*a,f=o*n;return[i/Math.max(1,Math.floor(i/f+1e-6)),l/Math.max(1,Math.floor(l/o+1e-6))]}function an(e,t,n,a){let i=Math.max(2,Math.round(e*n)),l=Math.max(2,Math.round(i*t)),c=Math.min(16,Math.max(1,a)),o=Math.ceil(a/c);return{width:l,height:i,columns:c,rows:o,atlasWidth:c*l,atlasHeight:o*i}}function yr(e){let t=e.replace("#",""),n=t.length===3?t.split("").map(i=>i+i).join(""):t,a=Number.parseInt(n,16);return Number.isFinite(a)&&n.length===6?[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]:[0,0,0]}function ga(e){let t=new Uint32Array(256),n=0;for(let c=0;c+3<e.length;c+=4)e[c+3]<8||(t[Math.round(.2126*e[c]+.7152*e[c+1]+.0722*e[c+2])]++,n++);if(!n)return[0,1];let a=c=>{let o=0;for(let f=0;f<256;f++)if(o+=t[f],o>=n*c)return f/255;return 1},i=a(.02),l=a(.98);return l-i<.08?[0,1]:[i,l]}var Jt=e=>e.hover==="fluid"&&!e.fluid?"none":e.hover;function fi(e,t,n=24,a=.12,i="ellipse"){return e.width>0&&e.height>0?{x:(t.left-n-e.left)/e.width,y:(t.top-n-e.top)/e.height,width:(t.width+n*2)/e.width,height:(t.height+n*2)/e.height,feather:a,shape:i}:!1}function hi(e){let t=Tt(e),n=[];for(let a=0;a<t.length&&n.length<16;){if(!t[a].trim()){a++;continue}let i=a;for(;a<t.length&&t[a].trim();)a++;n.push(i,a-i)}return n}function di(e,t,n=256){let a=Math.min(.16666666666666666,n/Math.max(1,e,t));return[Math.max(2,Math.round(e*a)),Math.max(2,Math.round(t*a))]}function mi(e,t,n,a,i=8,l=28,c=new Uint8Array(n*a)){let o=n*a;if(c.length!==o&&(c=new Uint8Array(o)),c.fill(0),!(t.width>0&&t.height>0)||!e.length)return c;let f=n/t.width,d=a/t.height,m=Math.max(0,Math.round(l/2.56*f)),g=i+l*.5;for(let x of e){if(!(x.width>0&&x.height>0))continue;let F=Math.max(0,Math.round((x.left-g-t.left)*f)),v=Math.min(n,Math.round((x.left+x.width+g-t.left)*f)),A=Math.max(0,Math.round((x.top-g-t.top)*d)),r=Math.min(a,Math.round((x.top+x.height+g-t.top)*d));for(let E=A;E<r;E++)c.fill(255,(a-1-E)*n+F,(a-1-E)*n+Math.max(F,v))}if(!m)return c;let w=new Float32Array(Math.max(n,a)),T=new Float32Array(Math.max(n,a)+1),M=(x,F,v)=>{for(let A=0;A<3;A++){for(let r=0;r<x;r++)w[r]=c[v+r*F];T[0]=0;for(let r=0;r<x;r++)T[r+1]=T[r]+w[r];for(let r=0;r<x;r++){let E=Math.max(0,r-m),L=Math.min(x,r+m+1);c[v+r*F]=Math.round((T[L]-T[E])/(L-E))}}};for(let x=0;x<a;x++)M(n,1,x*n);for(let x=0;x<n;x++)M(a,n,x);return c}var _l=20,Pl=3,Dl=.15,Gl=/\\.(mp4|webm|mov|m4v|ogv)(\\?|#|$)/i;var Il=()=>{let e=typeof navigator>"u"?void 0:navigator;return 1e3/(!!e&&(e.hardwareConcurrency>0&&e.hardwareConcurrency<=2||!!e.deviceMemory&&e.deviceMemory<=2||!!e.connection?.saveData)?30:60)-2},Ul=3840*2160;var pi=new WeakMap;function wt(e,t){let n=pi.get(e);(!n||n.length!==t.length)&&pi.set(e,n=new Float64Array(t.length).fill(NaN));let a=!1;for(let i=0;i<t.length;i++)n[i]!==t[i]&&(a=!0,n[i]=t[i]);return a}var Ol=[new Float64Array(1),new Float64Array(2),new Float64Array(3),new Float64Array(4)],Mr=(e,t,n,a)=>{let i=a!==void 0?4:n!==void 0?3:t!==void 0?2:1,l=Ol[i-1];return l[0]=e,i>1&&(l[1]=t),i>2&&(l[2]=n),i>3&&(l[3]=a),l},N=(e,t,n)=>{t&&wt(t,Mr(n))&&e.uniform1f(t,n)},Ae=(e,t,n)=>{t&&wt(t,Mr(n))&&e.uniform1i(t,n)},We=(e,t,n,a)=>{t&&wt(t,Mr(n,a))&&e.uniform2f(t,n,a)},Bl=(e,t,n,a,i)=>{t&&wt(t,Mr(n,a,i))&&e.uniform3f(t,n,a,i)},Ft=(e,t,n,a,i,l)=>{t&&wt(t,Mr(n,a,i,l))&&e.uniform4f(t,n,a,i,l)},Wl=(e,t,n)=>{t&&wt(t,n)&&e.uniform2fv(t,n)},Er=(e,t,n)=>{t&&wt(t,n)&&e.uniform3fv(t,n)},xa=(e,t,n)=>{t&&wt(t,n)&&e.uniform4fv(t,n)},va=0,Nl=2,Hl=1280*720,on={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance"},ya=(e,t)=>\`\${e.fontWeight} \${Math.max(1,t.height*e.glyphScale)}px \${e.font}\`,gi=(e,t)=>\`\${nn(e.charset).join("")}\\0\${ya(e,t)}\\0\${t.width}x\${t.height}x\${t.columns}\`;function Xl(e,t,n,a){let i=Math.min(globalThis.devicePixelRatio||1,e.maxPixelRatio,Math.sqrt(Ul/Math.max(1,t*n)));return a<1&&i>1?Math.max(1,i*a):i}var Ut={atlas:(e,t,n)=>xi(e,t,n),shapes:e=>zl(e)},bi=(e,t)=>gi(e,t);function xi(e,t,n){let a=Tt(e.charset),i=document.createElement("canvas");i.width=t.atlasWidth,i.height=t.atlasHeight;let l=i.getContext("2d");l.fillStyle="#fff",l.textAlign="center",l.textBaseline="alphabetic";let c=ya(e,t),o=Math.max(1,t.height*e.glyphScale),f=\`\${e.fontWeight} \${o}px \${ri}, \${e.font}\`;l.font=c;let d=l.measureText("M"),m=d.actualBoundingBoxAscent||t.height*e.glyphScale*.7,g=d.actualBoundingBoxDescent||0,w=(t.height+m-g)/2;a.forEach((x,F)=>{let v=F%t.columns*t.width+t.width/2,A=Math.floor(F/t.columns)*t.height+w,r=$r(x);if(l.save(),l.beginPath(),l.rect(v-t.width/2,A-w,t.width,t.height),l.clip(),r){l.font=f;let E=l.measureText(x),L=Math.max(E.width,(E.actualBoundingBoxLeft||0)+(E.actualBoundingBoxRight||0)),Y=(E.actualBoundingBoxAscent||o*.88)+(E.actualBoundingBoxDescent||o*.12),Q=Math.min(1,t.width*.94/Math.max(1,L),t.height*.94/Math.max(1,Y));l.translate(v,Math.floor(F/t.columns)*t.height+t.height/2),l.scale(Q,Q),l.translate(((E.actualBoundingBoxLeft||0)-(E.actualBoundingBoxRight||0))/2,((E.actualBoundingBoxAscent||o*.88)-(E.actualBoundingBoxDescent||o*.12))/2),l.fillText(x,0,0),l.font=c}else{let E=l.measureText(x).width;l.translate(v,A),E>t.width*.96&&l.scale(t.width*.96/E,1),l.fillText(x,0,0)}l.restore()});let T=!0,M=document.fonts;try{T=M?.check?M.check(c,a.join("")):!0}catch{}return n&&queueMicrotask(()=>{i.width=i.height=1}),{image:i,final:T}}function zl(e){let t=Tt(e.charset),n=new Uint8Array(t.length*16),a=an(60,e.cellAspect,1,t.length);try{let{image:i}=xi(e,a,!1),l=i,c=l.width,o=l.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,l.width,l.height).data;l.width=l.height=1,t.forEach((f,d)=>{let m=d%a.columns*a.width,g=Math.floor(d/a.columns)*a.height,w=new Float64Array(15),T=new Float64Array(15),M=0;for(let x=0;x<a.height;x++)for(let F=0;F<a.width;F++){let v=o[((g+x)*c+m+F)*4+3]/255,A=Math.min(4,Math.floor(x*5/a.height))*3+Math.min(2,Math.floor(F*3/a.width));w[A]+=v,T[A]++,M+=v}for(let x=0;x<15;x++)n[d*16+x]=Math.round(255*w[x]/Math.max(1,T[x]));n[d*16+15]=Math.round(255*M/(a.width*a.height))})}catch{}return n}var ql=(e,t)=>e.length===t.length&&e.every((n,a)=>n===t[a]);function vi(e,t={}){let n=s=>typeof HTMLElement<"u"&&s instanceof HTMLElement,a=s=>{let u=s.clear;return i(u)?{element:null,rest:{...s,clear:!1}}:n(u)?{element:{element:u},rest:{...s,clear:void 0}}:u&&typeof u=="object"&&n(u.element)?{element:u,rest:{...s,clear:void 0}}:{element:null,rest:s}},i=s=>!!s&&typeof s=="object"&&"rects"in s,l=a(t).element,c=i(t.clear)?t.clear:null,o=ma(a(t).rest),f=t.onError,d=e.ownerDocument,m=!d||typeof document>"u"||d===document,g=t.context??"auto",w=()=>{let s=e.clientWidth||0,u=e.clientHeight||0,b=Math.min(globalThis.devicePixelRatio||1,o.maxPixelRatio);return s*u*b*b},M=!m||g==="own"||g==="auto"&&va<Nl&&w()>=Hl?e.getContext("webgl2",on):null,x=!M&&m?ei():null,F=x?e.getContext("2d",{alpha:!0}):null,v=!!(x&&F),A=v?x.gl:M??e.getContext("webgl2",on);if(!A)throw new Error("WebGL2 is not available for the glyph field.");let r=A;v||va++;let E=ca(r),L=v?null:r.getContextAttributes(),Y=!!L&&Object.keys(on).every(s=>L[s]===on[s]),Q=v?null:new xr(r,()=>{Lt()&&he()}),re=()=>v?x.frames:Q;v&&ti(e,!0),e.setAttribute("role","img"),e.setAttribute("aria-label",t.label??"ASCII artwork"),e.dataset.renderer="glyph-field";let J=!1,ne=v?null:r.getExtension("KHR_parallel_shader_compile"),_=null,ee=null,K=null,S,D,Z=null,q=null,C=[],U=[],H=null,te=!1,le=null,pe=null,De=[],V=0,ae=0,Re=1,Me=0,xe=an(o.cellSize,o.cellAspect,1,2),Le=2,Te=0,$e=0,tt=0,O=null,ve=!1,He=null,Ke=0,de=0,Ye=0,Xe=null,Fe=0,rt=0,ht=0,nt=!0,dt=0,at=[0,1],ot=-1/0,Tr=-1/0,Fr=!1,Bt=Il(),it=new Float32Array(16),Qe=!1,tr=0,mt=0,se=!0,Ve=!1,ke=!1,At=!1,h=!1,P=!0,R=(t.effects??[]).slice(0,4),ge=!!t.live,ce=[],j={target:null,at:[-1,-1],presence:0,data:new Float32Array(32)},ue=null,me=null,I=1/60,B=0,X=0,ie=[],fe=new Float32Array(16),Ce=()=>{if(!l)return;let{element:s,padding:u=32,feather:b=.16,shape:y="rect",pointer:p=0}=l,k=fi(e.getBoundingClientRect(),s.getBoundingClientRect(),u,b,y),$=k&&p>0?{...k,pointer:Math.min(1,Math.max(0,p))}:k,W=o.clear;JSON.stringify(W)!==JSON.stringify($)&&(o={...o,clear:$},se=!0)},Se=null,Ge=new Uint8Array(0),Ie=0,ze=0,_e=!1,lt=null,Ze=new Float64Array(0),st=!0,Ti=()=>{if(!c){_e&&(_e=!1,se=!0);return}let s=c.rects,u=typeof s=="function"?s():s;if(u===lt&&!st)return;lt=u;let b=e.getBoundingClientRect(),[y,p]=di(b.width,b.height),k=new Float64Array(u.length*4+6);k[0]=b.left,k[1]=b.top,k[2]=b.width,k[3]=b.height,k[4]=c.padding??8,k[5]=c.softness??28,u.forEach((W,oe)=>{k[6+oe*4]=W.left,k[7+oe*4]=W.top,k[8+oe*4]=W.width,k[9+oe*4]=W.height});let $=!st&&k.length===Ze.length&&k.every((W,oe)=>W===Ze[oe]);st=!1,!($&&_e)&&(Ze=k,Ge=mi(u,b,y,p,k[4],k[5],Ge),!ke&&(Se??(Se=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Se),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),y!==Ie||p!==ze?r.texImage2D(r.TEXTURE_2D,0,r.R8,y,p,0,r.RED,r.UNSIGNED_BYTE,Ge):r.texSubImage2D(r.TEXTURE_2D,0,0,0,y,p,r.RED,r.UNSIGNED_BYTE,Ge),r.pixelStorei(r.UNPACK_ALIGNMENT,4),Ie=y,ze=p,_e=!0,se=!0))},Ta=()=>{se=!0,he()},Fa=!1,cn=()=>{let s=!!c&&typeof c.rects=="function"&&typeof window<"u"&&typeof window.addEventListener=="function";s!==Fa&&(Fa=s,s?window.addEventListener("scroll",Ta,{passive:!0,capture:!0}):window.removeEventListener("scroll",Ta,{capture:!0}))},un=s=>s==="lantern"||s==="loupe"||s==="reveal",we={target:null,at:null,strength:0,trail:[]},rr=new Float32Array(36),Ue=null,pt=null,wr=!1,wa=()=>{if(!V||!ae)return null;let s=V/ae,u=Math.round(s>=1?128:128*s),b=Math.round(s>=1?128/s:128);return(!Ue||Ue.width!==u||Ue.height!==b)&&(Ue=new Kr(u,b),pt||(pt=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,pt),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,u,b,0,r.RGBA,r.UNSIGNED_BYTE,Ue.pixels),wr=!0),Ue},Fi=s=>{let u=wa();return!u||!u.active?!1:(u.step(s),r.bindTexture(r.TEXTURE_2D,pt),r.texSubImage2D(r.TEXTURE_2D,0,0,0,u.width,u.height,r.RGBA,r.UNSIGNED_BYTE,u.pixels),wr=!0,!0)},be=null,Wt=null,fn=new Uint8Array(0),gt=!1,nr=null,Nt=null,hn=-1,ka=[-.5,-.8],kr=[0,0],Aa=()=>{if(!(!be||!O))try{if(Nt??(Nt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!Nt)return;let s=O instanceof HTMLVideoElement,u=s?be.cols>>1:be.cols,b=s?be.rows>>1:be.rows,y=Nt.canvas;y.width!==u||y.height!==b?(y.width=u,y.height=b):Nt.clearRect(0,0,u,b);let p=Ke||1,k=de||1;Nt.drawImage(O,et.offset[0]*p,et.offset[1]*k,et.scale[0]*p,et.scale[1]*k,0,0,u,b),nr=ai(Nt.getImageData(0,0,u,b).data,u,b,nr),kr[0]=u,kr[1]=b,ii(be,nr,ka,u,b)}catch{}},Ra=(s,u,b)=>{if(!V||!ae)return;let y=V/ae,p=Math.round(y>=1?128:128*y),k=Math.round(y>=1?128/y:128);(!be||be.cols!==p||be.rows!==k)&&(be=new en(p,k),nr=null,fn=new Uint8Array(p*k*4),Wt??(Wt=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Wt),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,p,k,0,r.RGBA,r.UNSIGNED_BYTE,null)),be.base=Math.min(p,k)*1.1,be.mass=0,be.calm=7,be.fade=1.6,Aa(),hn=ht,be.drop(s*(p-1),u*(k-1),b,2.2),he()},wi=s=>{if(!be?.live||!Wt)return gt?(gt=!1,!0):!1;O instanceof HTMLVideoElement&&hn!==ht&&(Aa(),hn=ht),be.step(s,.45+.55*Math.exp(-be.age/.7));let u=Math.min(1,Math.exp(-(be.age-.9)/.5));return u<.02?(be.clear(),gt=!1,!0):(li(be,nr??new Float32Array(0),ka,fn,u,kr[0],kr[1]),r.bindTexture(r.TEXTURE_2D,Wt),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texSubImage2D(r.TEXTURE_2D,0,0,0,be.cols,be.rows,r.RGBA,r.UNSIGNED_BYTE,fn),gt=!0,!0)},ki=(s,u)=>{let b=o.lantern,y=we.target;if(y){let k=we.at;if(!k)we.at=[y[0],y[1]];else if(bt())k[0]=y[0],k[1]=y[1];else{let oe=1-Math.exp(-b.follow*s);k[0]+=(y[0]-k[0])*oe,k[1]+=(y[1]-k[1])*oe}let $=we.at,W=we.trail[we.trail.length-1];b.trail>0&&(!W||u-W.born>28&&Math.hypot($[0]-W.x,$[1]-W.y)>.004)&&(we.trail.push({x:$[0],y:$[1],born:u}),we.trail.length>12&&we.trail.shift())}we.strength+=((y?1:0)-we.strength)*(1-Math.exp(-s*(y?9:5)));let p=we.trail;for(let k=p.length-1;k>=0;k--)b.trail>0&&u-p[k].born<b.trail*4e3||p.splice(k,1);rr.fill(0);for(let k=0;k<p.length;k++){let $=p[k];rr[k*3]=$.x,rr[k*3+1]=$.y,rr[k*3+2]=.55*Math.exp(-(u-$.born)/1e3/Math.max(.01,b.trail))}return we.strength>.003||p.length>0},dn=0,Sa=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,La=!!Sa?.matches,bt=()=>o.respectReducedMotion&&La,mn,Ai=new Promise(s=>{mn=s}),Rt=!0,Ht=s=>f?.(s instanceof Error?s:new Error(String(s))),Ca=(s,u)=>{let b=r.createShader(s);return De.push(b),r.shaderSource(b,u),r.compileShader(b),b},ar=s=>{if(v)return x.program(s);pe??(pe=Ca(r.VERTEX_SHADER,yo));let u=r.createProgram(),b=Ca(r.FRAGMENT_SHADER,s);return r.attachShader(u,pe),r.attachShader(u,b),r.linkProgram(u),{program:u,locations:null,fragment:b}},Ar=(s,u=!1)=>{if(s.locations)return!0;if(v)return x.linked(s,u);let{program:b,fragment:y}=s;if(!u&&ne&&!r.getProgramParameter(b,ne.COMPLETION_STATUS_KHR))return!1;if(!r.getProgramParameter(b,r.LINK_STATUS)){if(r.isContextLost())return!1;throw new Error(r.getShaderInfoLog(y)||r.getProgramInfoLog(b)||"Glyph field program failed to link.")}let p={};for(let k=r.getProgramParameter(b,r.ACTIVE_UNIFORMS)-1;k>=0;k--){let $=r.getActiveUniform(b,k).name.replace(/\\[0\\]$/,"");p[$]=r.getUniformLocation(b,$)}return s.locations=p,!0},pn=(s=!1)=>{if(!_||!ee)return!1;try{if(!Ar(_,s))return!1}catch(u){if(!R.length)throw u;let b=R.map(y=>y.name).join(", ");return Ln([]),Sr(),Ht(new Error(\`Field effects (\${b}) did not compile, so the field draws without them. \${u instanceof Error?u.message:String(u)}\`)),!1}return Ar(ee,s)},Je=s=>{let u=r.createTexture();return r.bindTexture(r.TEXTURE_2D,u),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,s===r.LINEAR_MIPMAP_LINEAR?r.LINEAR:s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),u},gn=()=>{q&&(r.deleteTexture(q.ink),r.deleteTexture(q.under),r.deleteFramebuffer(q.buffer),q.glow&&r.deleteTexture(q.glow),q=null)},_a=()=>ui(o.cellFit,o.cellSize,o.cellAspect,Re,V,ae,xe),Ri=()=>{let[s,u]=_a(),b=Math.ceil(V/s-1e-4),y=Math.ceil(ae/u-1e-4),p=o.post.bloom>0;if(q&&q.columns===b&&q.rows===y&&!!q.glow===p)return q;gn();let k=()=>{let ut=Je(r.NEAREST);return r.texStorage2D(r.TEXTURE_2D,1,J?r.RGBA8:r.RGBA16F,b,y),ut},$=k(),W=k(),oe=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,oe),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,$,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,r.TEXTURE_2D,W,0);let qe=null;return p&&(qe=Je(r.LINEAR_MIPMAP_LINEAR),r.texStorage2D(r.TEXTURE_2D,Math.floor(Math.log2(Math.max(b,y)))+1,r.RGBA8,b,y),r.bindFramebuffer(r.FRAMEBUFFER,oe),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT2,r.TEXTURE_2D,qe,0)),r.drawBuffers(qe?[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1,r.COLOR_ATTACHMENT2]:[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),q={ink:$,under:W,glow:qe,buffer:oe,columns:b,rows:y}},bn=()=>!!o.fluid&&Jt(o)==="fluid",xn=()=>{H?.release(),te=!1,C.forEach(s=>r.deleteTexture(s)),U.forEach(s=>r.deleteFramebuffer(s)),C=[],U=[]};function Pa(){K&&!v&&r.deleteProgram(K.program),K=ar(Mo(J)),v?H?.release():H?.dispose(),H=J?null:To(r,ar,s=>Ar(s))}let Da=()=>{xn();let s=o.fluid;if(!s||!bn()||!V||!ae)return;K||Pa();let u=s.resolution,b=V/ae;if(Te=b>=1?u:Math.max(8,Math.round(u*b)),$e=b>=1?Math.max(8,Math.round(u/b)):u,te=!!H&&H.resize(Te,$e),te){tt=0;return}let y=()=>{xn();for(let p=0;p<2;p++){let k=Je(r.LINEAR);r.texImage2D(r.TEXTURE_2D,0,J?r.RGBA8:r.RGBA16F,Te,$e,0,r.RGBA,J?r.UNSIGNED_BYTE:r.HALF_FLOAT,null);let $=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,$),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,k,0),C.push(k),U.push($)}return r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE};if(!y()){if(J)throw new Error("The glyph field could not allocate its fluid buffers.");J=!0,Sr(),Pa(),y()}for(let p of U)r.bindFramebuffer(r.FRAMEBUFFER,p),r.viewport(0,0,Te,$e),r.clearColor(J?.5:0,J?.5:0,0,1),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),tt=0},Rr=-1,or=!1,vn=s=>s.post.bloom>0||s.post.scanlines>0||s.post.grain>0||s.post.chroma>0||s.post.curvature>0;function Sr(){_&&!v&&r.deleteProgram(_.program),ee&&!v&&r.deleteProgram(ee.program),gn(),_=ar(Nr(J,R)),Rr=It.indexOf(o.mark),or=vn(o),ee=ar(fr(Rr,or)),(v?!x.canCompileInParallel:!ne)&&pn(!0)}let Ga=()=>ya(o,xe),yn=()=>{se=!0,he()},En=()=>gi(o,xe),Mn=()=>{if(Le=Tt(o.charset).length,xe=an(o.cellSize,o.cellAspect,Re,Le),Me=Re,v){let b=En();if(Z?.key!==b){let y=Z;Z=x.atlas(b,Tn,yn),x.releaseAtlas(y,yn),S=Z.texture}se=!0;return}let{image:u}=Tn();r.bindTexture(r.TEXTURE_2D,S),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,u),typeof u.getContext=="function"&&(u.width=u.height=1),se=!0};function Tn(){return Ut.atlas(o,xe,v)}let Ia=typeof document>"u"?void 0:document.fonts,Fn=()=>{if(!Ia?.load)return;let s=Ga();Ia.load(s,Tt(o.charset).join("")).then(()=>{if(!(Ve||ke||Ga()!==s)){if(_r++,!v){Mn(),he();return}Z&&!Z.final&&Z.key===En()&&x.paintAtlas(Z,Tn)}},()=>{})},Ua=s=>s.trim().replace(/^["']|["']$/g,"").toLowerCase(),Si=s=>{let u=s.fontfaces??[],b=o.font.split(",").map(Ua);u.some(y=>b.includes(Ua(y.family)))&&Fn()},wn=()=>{if(at=[0,1],Dr=!1,!(!O||o.levels==="none"))try{let s=document.createElement("canvas");s.width=s.height=64;let u=s.getContext("2d",{willReadFrequently:!0});O===Xe&&(u.imageSmoothingQuality="medium"),u.drawImage(O,0,0,64,64),at=ga(u.getImageData(0,0,64,64).data)}catch{at=[0,1]}},Xt=null,Lr=null,zt=!1,xt=-1/0,Cr=new Uint8Array(0),qt=null,kn=()=>{if(zt=!1,lr=!1,!O||o.scope==="all")return;let s=Ke||1,u=de||1,b=Math.max(8,Math.round(s>=u?96:96*s/u)),y=Math.max(8,Math.round(u>=s?96:96*u/s));try{if(qt??(qt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!qt)return;let p=qt.canvas;p.width!==b||p.height!==y?(p.width=b,p.height=y):qt.clearRect(0,0,b,y),qt.drawImage(O,0,0,b,y),Oa(qt.getImageData(0,0,b,y).data,b,y)}catch{return}},Oa=(s,u,b)=>{if(zt=!1,lr=!1,!(!O||o.scope==="all")&&(Lr=Yr(s,u,b,null,Lr),Lr.key!=="none")){Cr.length!==u*b*4&&(Cr=new Uint8Array(u*b*4));for(let y=0;y<u*b;y++)Cr[y*4+3]=Math.round(Lr.subject[y]*255);Xt??(Xt=Je(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Xt),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,u,b,0,r.RGBA,r.UNSIGNED_BYTE,Cr),zt=!0}},St=null,An="",_r=0,Ba="",Wa=null,Na=null,Ha=-1,vt=!1,Vt=null,ir={levels:!1,scope:!1},Pr=0,Rn=-1/0,ct,Dr=!1,lr=!1,Li=()=>{let s=Vt?.poll();s&&(ir.levels&&o.levels!=="none"&&(at=ga(s.data)),ir.scope&&Oa(s.data,s.width,s.height),(ir.levels||ir.scope)&&(se=!0))},Xa=null,za=0,qa=0,sr=()=>{if(!O)return;let s=performance.now(),u=O instanceof HTMLVideoElement||ge;u&&ct===void 0&&(ct=Ao(r));let b=u&&!!ct;u&&!b&&Li(),Pr++;let y=Pr-Rn>=8,p=!u||ot===-1/0?"now":s-ot>1500&&y&&o.levels!=="none"?"later":null,k=!u||xt===-1/0?"now":s-xt>160&&y&&o.scope!=="all"&&o.hover!=="none"?"later":null;!b&&p==="now"&&(wn(),ot=s),!b&&k==="now"&&(kn(),xt=s),r.bindTexture(r.TEXTURE_2D,D),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);try{let $=O,W=$.videoWidth||$.naturalWidth||$.width,oe=$.videoHeight||$.naturalHeight||$.height;if(Xa===D&&za===W&&qa===oe&&W&&oe?r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,O):(r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,O),Xa=D,za=W,qa=oe),u?vt=!0:(r.generateMipmap(r.TEXTURE_2D),vt=!1),rt=W*oe*4*4/3,b){let jt=!!p&&o.levels!=="none",ur=!!k&&o.scope!=="all"&&o.hover!=="none";(jt||ur)&&(vt&&(r.generateMipmap(r.TEXTURE_2D),vt=!1),jt&&(ct.measureLevels(D,W,oe),Dr=!0),ur&&(ct.measureScope(D,W,oe),lr=!0,zt=!0),Rn=Pr,se=!0),p&&(ot=s),k&&(xt=s);return}let qe=p==="later",ut=k==="later";(qe||ut)&&!Vt?.pending&&(Vt??(Vt=Fo(r)),vt&&(r.generateMipmap(r.TEXTURE_2D),vt=!1),Vt.request(D,W,oe,128)?(ir={levels:qe,scope:ut},Rn=Pr,qe&&(ot=s),ut&&(xt=s)):(qe&&(wn(),ot=s),ut&&(kn(),xt=s)))}catch($){Ht($)}},Va=()=>{Vt=null,St=null,An="",J=!r.getExtension("EXT_color_buffer_float")&&!r.getExtension("EXT_color_buffer_half_float"),Sr(),le=v?x.vertexArray():r.createVertexArray(),v||(S=Je(r.NEAREST)),D=Je(r.LINEAR_MIPMAP_LINEAR),r.bindTexture(r.TEXTURE_2D,D),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),r.generateMipmap(r.TEXTURE_2D),V=ae=0,Me=0,Lt(),Fn(),O&&sr()};function Lt(){let s=e.clientWidth||e.clientHeight?{width:e.clientWidth,height:e.clientHeight}:e.getBoundingClientRect();Fr=!s.width||!s.height;let u=Xl(o,s.width,s.height,re().scale),b=Math.max(1,Math.round(s.width*u)),y=Math.max(1,Math.round(s.height*u));if(b===V&&y===ae&&u===Re)return!1;let p=!V||Math.abs(b/y-V/ae)>.01;return Re=u,V=b,ae=y,e.width=V,e.height=ae,Me!==Re&&Mn(),(p||bn()&&!C.length&&!te)&&Da(),se=!0,!0}let Ci=()=>h||X>=2&&!(O instanceof HTMLVideoElement)?!1:O instanceof HTMLVideoElement&&!O.paused&&!O.ended?!0:bt()?!1:!O&&o.scene!=="none"||o.drift>0||o.post.grain>0||R.some(u=>u.animate),_i=(s,u)=>{let b=o.fluid;if(!b||!U.length&&!te||(te?!H?.ready():!K||!Ar(K)))return;let y=V/ae,p=me;if(me=null,te&&H){let oe=5200*b.force*(bt()?.35:1);p&&(dn=u+Math.min(9,6/Math.max(.3,b.dissipation))*1e3),H.step(p?{from:p.from,to:p.to,force:[(p.to[0]-p.from[0])*oe,(p.to[1]-p.from[1])*oe]}:null,{dt:Math.min(s,1/60),radius:b.radius*1.1,curl:b.curl,dissipation:b.dissipation,aspect:y});return}let k=0,$=0;if(p){let oe=(bt()?1:3)*b.force;k=(p.to[0]-p.from[0])*y*oe*4,$=(p.to[1]-p.from[1])*oe*4,dn=u+7/Math.min(b.dissipation,b.dissipation*1.1)*1e3}let W=K.locations;r.bindFramebuffer(r.FRAMEBUFFER,U[1-tt]),r.viewport(0,0,Te,$e),r.useProgram(K.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,C[tt]),Ae(r,W.uPrevious,0),We(r,W.uSize,Te,$e),N(r,W.uAspect,y),N(r,W.uDt,s),N(r,W.uDecay,b.dissipation),N(r,W.uEnergyDecay,b.dissipation*1.1),N(r,W.uRadius,b.radius),N(r,W.uSplat,p?1:0),We(r,W.uFrom,p?.from[0]??0,p?.from[1]??0),We(r,W.uTo,p?.to[0]??0,p?.to[1]??0),We(r,W.uForce,k,$),r.drawArrays(r.TRIANGLES,0,3),tt=1-tt},ja=null,Gr=new Float32Array(18),cr=[0,0,0],$a=[1,1,1],Ka=[0,0,0,0],et=pa(1,1,1,1,"cover"),Ya=null,Qa=0,Za=0,Ja=0,eo=0,Pi=()=>{ja!==o&&(ja=o,cr=yr(o.ink),$a=yr(o.highlight==="auto"?"#ffffff":o.highlight),Ka=o.background==="transparent"?[0,0,0,0]:[...yr(o.background),1],Gr.fill(0),o.ramp.forEach((s,u)=>Gr.set(yr(s),u*3))),(Ya!==o||Qa!==V||Za!==ae||Ja!==Ke||eo!==de)&&(Ya=o,Qa=V,Za=ae,Ja=Ke,eo=de,et=pa(V,ae,Ke||1,de||1,o.fit,o.focus))},to=()=>{Pi(),v?x.begin(V,ae):Q.begin();let s=o.fluid,u=O&&Fe?xe.height/ae*Fe*et.scale[1]:1,b=o.sample==="point"?0:Math.max(0,Math.log2(Math.max(1,u))-.5);vt&&O&&(b>0||o.backdrop>0)&&(r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,D),r.generateMipmap(r.TEXTURE_2D),vt=!1);let y=Ri(),p=_.locations,k=ee.locations,$=Jt(o),W=!bt();r.bindFramebuffer(r.FRAMEBUFFER,y.buffer),r.viewport(0,0,y.columns,y.rows),r.useProgram(_.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,D),Ae(r,p.uSource,0),r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,(te?H?.velocity:C[tt])??D),Ae(r,p.uFluid,2),r.activeTexture(r.TEXTURE3),r.bindTexture(r.TEXTURE_2D,pt??D),Ae(r,p.uTrailMap,3),r.activeTexture(r.TEXTURE6),r.bindTexture(r.TEXTURE_2D,(lr?ct?.scope:Xt)??D),Ae(r,p.uScope,6);let oe=Dr&&O&&o.levels==="auto"?ct?.levels??null:null;r.activeTexture(r.TEXTURE11),r.bindTexture(r.TEXTURE_2D,oe??D),Ae(r,p.uLevelMap,11),N(r,p.uLevelsFromMap,oe?1:0),r.activeTexture(r.TEXTURE7),r.bindTexture(r.TEXTURE_2D,Wt??D),Ae(r,p.uTapMap,7),N(r,p.uTapOn,gt&&O&&ve?1:0),N(r,p.uScopeMode,zt&&o.scope!=="all"?o.scope==="subject"?1:2:0),N(r,p.uFluidMode,te?1:0),Ae(r,p.uHoverMode,$==="fluid"?1:$==="lantern"?2:$==="trail"&&wr?3:$==="loupe"?4:$==="reveal"?5:0),N(r,p.uTrailAmount,o.trail.strength),Bl(r,p.uLight,we.at?.[0]??-1,we.at?.[1]??-1,un($)?we.strength:0),Er(r,p.uTrail,rr),N(r,p.uLightRadius,o.lantern.radius),N(r,p.uLightGain,o.lantern.strength),N(r,p.uClock,performance.now()/1e3),N(r,p.uFlicker,W?1:0),We(r,p.uFluidTexel,1/Math.max(1,Te),1/Math.max(1,$e)),We(r,p.uResolution,V,ae);let[qe,ut]=_a();We(r,p.uCell,qe,ut),N(r,p.uCount,Le),N(r,p.uBlend,o.blend==="on"||Le<=9&&(o.blend==="coarse"||o.blend==="auto"&&ve)?1:0),Ft(r,p.uSourceMap,et.scale[0],et.scale[1],et.offset[0],et.offset[1]),Ae(r,p.uScene,O?0:vo(o.scene)),Ae(r,p.uMark,It.indexOf(o.mark)),N(r,p.uOrder,o.glyphOrder==="text"?1:o.glyphOrder==="scatter"&&o.mark==="glyph"?2:0);let jt=o.sample==="shape"&&!!O&&o.mark==="glyph"&&o.glyphOrder!=="text"&&o.glyphOrder!=="scatter"&&xe.height>=8;if(jt){(Wa!==o||Na!==xe||Ha!==_r)&&(Wa=o,Na=xe,Ha=_r,Ba=\`\${En()}|\${_r}\`);let _t=Ba;if(An!==_t||!St){An=_t;let Pt=Ut.shapes(o);r.activeTexture(r.TEXTURE9),St??(St=Je(r.NEAREST)),r.bindTexture(r.TEXTURE_2D,St),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.texImage2D(r.TEXTURE_2D,0,r.R8,16,Math.max(1,Pt.length/16),0,r.RED,r.UNSIGNED_BYTE,Pt),r.pixelStorei(r.UNPACK_ALIGNMENT,4)}}r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,jt&&St||D),Ae(r,p.uShapes,9),N(r,p.uShapeOn,jt?1:0),N(r,p.uShapeLod,Math.max(0,Math.log2(Math.max(1,u/5))-.5)),N(r,p.uShapeTone,_l),N(r,p.uShapeWindow,Pl),N(r,p.uShapeGate,Dl);let ur=o.glyphOrder==="text"&&o.textRepeat==="row"?hi(o.charset):[];it.fill(0),it.set(ur),Wl(r,p.uWords,it),N(r,p.uWordCount,ur.length/2),N(r,p.uScale,o.scale);let Pe=o.clear;Ft(r,p.uClear,Pe?Pe.x:0,Pe?Pe.y:0,Pe?Pe.width:0,Pe?Pe.height:0),N(r,p.uClearFeather,Pe?Pe.feather:.1),N(r,p.uClearShape,Pe&&Pe.shape==="rect"?1:0),N(r,p.uClearPointer,Pe?Pe.pointer??0:0),r.activeTexture(r.TEXTURE8),r.bindTexture(r.TEXTURE_2D,Se??D),Ae(r,p.uClearMap,8);let co=_e&&!!c&&!!Se;N(r,p.uClearMapOn,co?Math.min(1,Math.max(0,c.strength??.85)):0),N(r,p.uClearBend,co?Math.min(1,Math.max(0,c.bend??.5))*.035:0),We(r,p.uClearTexel,1/Math.max(1,Ie),1/Math.max(1,ze));let Xi=performance.now();fe.fill(0);for(let _t=0;_t<ie.length;_t++){let Pt=ie[_t],Ur=_t*4;fe[Ur]=Pt.x,fe[Ur+1]=Pt.y,fe[Ur+2]=(Xi-Pt.born)/1e3,fe[Ur+3]=Pt.strength}xa(r,p.uPulse,fe),Er(r,p.uInk,cr),Er(r,p.uRamp,Gr),N(r,p.uRampCount,o.color==="source"?0:o.ramp.length),Er(r,p.uHighlight,$a),N(r,p.uHighlightAuto,o.highlight==="auto"?1:0),xa(r,p.uBackground,Ka),N(r,p.uBrightness,o.brightness),N(r,p.uContrast,o.contrast),N(r,p.uGamma,o.gamma),N(r,p.uInvert,o.invert?1:0),N(r,p.uVignette,o.vignette),N(r,p.uSourceColor,o.color==="source"?1:0),N(r,p.uRefraction,s?s.refraction*(W?1:.25):0),N(r,p.uGlow,s?s.glow:0),N(r,p.uTime,mt),N(r,p.uDrift,W?o.drift:0),N(r,p.uFluidOn,s&&$==="fluid"&&(C.length||te)?1:0),N(r,p.uLod,b),N(r,p.uSaturation,o.saturation),N(r,p.uShade,o.shade),N(r,p.uBackdrop,O?o.backdrop:0),We(r,p.uLevels,O&&o.levels==="auto"?at[0]:0,O&&o.levels==="auto"?at[1]:1),R.length&&Gi(_.locations),r.bindVertexArray(le),r.drawArrays(r.TRIANGLES,0,3),y.glow&&(r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,y.glow),r.generateMipmap(r.TEXTURE_2D)),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,V,ae),r.useProgram(ee.program),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,S),Ae(r,k.uAtlas,1),r.activeTexture(r.TEXTURE4),r.bindTexture(r.TEXTURE_2D,y.ink),Ae(r,k.uCells,4),r.activeTexture(r.TEXTURE5),r.bindTexture(r.TEXTURE_2D,y.under),Ae(r,k.uUnder,5),We(r,k.uResolution,V,ae),We(r,k.uCell,xe.width,xe.height),We(r,k.uPitch,qe,ut),N(r,k.uColumns,xe.columns),N(r,k.uDotScale,o.dotScale),We(r,k.uDir,Math.cos(o.markAngle*Math.PI/180),Math.sin(o.markAngle*Math.PI/180)),Ae(r,k.uMark,It.indexOf(o.mark)),Ft(r,k.uLine,o.linePitch,o.lineWeight,o.sparkle,0),Ft(r,k.uInlay,o.accents,o.shuffle,Math.floor(mt*7),nn(o.charset).length),N(r,k.uSourceColor,o.color==="source"?1:0),Er(r,k.uRamp,Gr),N(r,k.uRampCount,o.color==="source"?0:o.ramp.length),Ft(r,k.uFade,cr[0],cr[1],cr[2],o.mark==="inlay"||o.glyphOrder!=="tone"&&o.mark==="glyph"?1:0);let $t=o.post;r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,y.glow??D),Ae(r,k.uGlow,10),Ft(r,k.uPost,y.glow?$t.bloom:0,$t.bloomRadius,$t.scanlines,$t.grain),Ft(r,k.uPost2,$t.chroma,$t.curvature,mt,2),r.drawArrays(r.TRIANGLES,0,3),v&&x.present(F,V,ae)},Sn=typeof document<"u"&&document.hidden,ro=()=>!Ve&&!ke&&!At&&!Fr&&(P||Rt)&&!Sn;function Ln(s){ce.forEach(b=>b()),R=s.slice(0,4);let u=()=>{se=!0,he()};ce=R.map(b=>b.subscribe(u)),R.length||(j.target=null,j.presence=0)}function Di(s){let u=j.target&&!h?1:0,b=!1;if(j.target){j.presence===0&&(j.at=[...j.target]);let y=1-Math.exp(-s/.035),p=j.target[0]-j.at[0],k=j.target[1]-j.at[1];Math.abs(p)+Math.abs(k)>1e-4&&(j.at=[j.at[0]+p*y,j.at[1]+k*y],b=!0)}if(j.presence!==u){let y=s/.15;j.presence=u>j.presence?Math.min(u,j.presence+y):Math.max(u,j.presence-y),b=!0}return b}function Gi(s){xa(r,s.uFx,bo(R,j.data)),Ft(r,s.uFxPointer,j.at[0],j.at[1],j.presence,bt()?0:1),N(r,s.uFxTime,mt)}Ln(R);let Ir=s=>{if(Qe=!1,!ro())return;let u=performance.now(),b=(s-tr)/1e3,y=Math.min(1/30,Math.max(1/480,b));tr=s,I=I*.9+Math.min(b,.25)*.1,B=I>1/24?B+1:0;try{re().overloaded&&X<2&&B>10&&(X=2),B>45&&X<2&&re().atMinimum&&(B=0,X++,X===1&&Re>1?(o={...o,maxPixelRatio:1},Lt()):X=2);let p=pn(),k=Ci();k&&(mt+=y*o.speed),ge&&O&&!(O instanceof HTMLVideoElement)&&!h&&(sr(),se=!0),O instanceof HTMLVideoElement&&O.readyState>=2&&nt&&("requestVideoFrameCallback"in O?nt=!1:nt=!0,sr(),ht++,se=!0);let $=Jt(o),W=$==="fluid"&&(me!==null||s<dn);if(W?_i(y,s):me=null,un($)&&(W=ki(y,s)||W),$==="trail"){let oe=!!Ue?.active;W=Fi(y)||W,oe&&!Ue?.active&&(se=!0)}if((be?.live||gt)&&(W=wi(y)||W,gt||(se=!0)),R.length&&Di(y)&&(W=!0),ie.length){for(let oe=ie.length-1;oe>=0;oe--)s-ie[oe].born>=2400&&ie.splice(oe,1);W=!0,ie.length||(se=!0)}c&&Ti(),p&&(W||se||k&&s-Tr>=Bt*Xo())&&(to(),Tr=s,se=!1,Rt&&(!Ye||O)&&(Rt=!1,mn())),(k||W||me||!p||ge&&O&&!h)&&(Qe=!0,aa(Ir)),Q&&!ke&&Q.end(s,performance.now()-u)}catch(p){At=!0,Ht(p)}};function he(){Qe||!ro()||(tr=performance.now(),Qe=!0,aa(Ir))}let Cn=(s,u)=>{let b=e.getBoundingClientRect();if(!b.width||!b.height)return null;let y=(s-b.left)/b.width,p=(u-b.top)/b.height;return y<-.05||y>1.05||p<-.05||p>1.05?null:[y,1-p]},_n=s=>{R.length&&!h&&(j.target=s?[s[0],1-s[1]]:null,he());let u=Jt(o);if(u==="none"||h){ue=null,we.target=null;return}if(un(u)){we.target=s?[s[0],1-s[1]]:null,ue=null,he();return}if(u==="trail"){let b=wa();if(!b)return;s?b.move(s[0],1-s[1],o.trail.radius,performance.now()):b.leave(),ue=null,he();return}if(!s){ue=null;return}ue&&(me=me?{from:me.from,to:s}:{from:ue,to:s}),ue=s,he()},Ii=s=>{s.type==="pointerdown"&&Oi(s);let u=Cn(s.clientX,s.clientY);no===window&&(ao.inside=!!u),_n(u)},Ui=()=>{ue=null,Ue?.leave(),j.target&&(j.target=null,he()),we.target&&(we.target=null,he())},no=t.interactionTarget??window,ao={target:no,move:Ii,leave:Ui,near:()=>P},Ct=[Vo(ao)];function Oi(s){if(o.tap==="none"||!O||!ve||h||Ve||bt()||s.button!==0||typeof Element<"u"&&s.target instanceof Element&&s.target.closest("button, a, input, select, summary, textarea, label"))return;let u=Cn(s.clientX,s.clientY);!u||u[0]<0||u[0]>1||u[1]<0||u[1]>1||(o.tap==="surface"?Ra(u[0],1-u[1],1):(ie=[...ie,{x:u[0],y:1-u[1],born:performance.now(),strength:1}].slice(-4),he()))}let Pn=()=>{let s=Lt();Ce(),c&&(st=!0,se=!0),(s||se)&&he()},Dn=l?jr(l.element,Pn):()=>{};Ct.push(jr(e,Pn),()=>Dn()),Ct.push(Jo(e,"25% 0px",s=>{P=s.isIntersecting,P&&(se=!0,he())})),Ct.push(jo(()=>{Sn=document.hidden,Sn||(se=!0,he())})),Ct.push($o(()=>{La=!!Sa?.matches,se=!0,he()})),Ct.push(Ko(Si)),cn(),Ct.push(()=>{c=null,cn()});let Gn=s=>{s?.preventDefault(),ke=!0,v||E(),Qe&&oa(Ir),Qe=!1},In=()=>{ke=!1,v?r=x.gl:E(),Q?.reset(),De.length=0,pe=null,Z=null,_=ee=K=null,q=null,C=[],U=[],H=null,te=!1,pt=null,Ue=null,wr=!1,Xt=null,zt=!1,Wt=null,be=null,gt=!1,ko(r),ct=void 0,Dr=lr=!1,Se=null,_e=!1,Ie=ze=0,st=!0;try{Va(),se=!0,he()}catch(s){Ht(s)}},oo={lost:()=>Gn(),restored:In,rescale:()=>{Lt()&&he()},size:()=>[V,ae],bytes:()=>{let s=J?4:8;return V*ae*4+rt+(q?q.columns*q.rows*(s*2+(q.glow?16/3:0)):0)+Te*$e*s*(te?6:C.length)+(Ue?Ue.width*Ue.height*4:0)}};v?x.join(oo):(e.addEventListener("webglcontextlost",Gn),e.addEventListener("webglcontextrestored",In));let Un=()=>{He&&(He.pause(),He.removeAttribute("src"),He.load(),He=null),dt&&O instanceof HTMLVideoElement&&"cancelVideoFrameCallback"in O&&O.cancelVideoFrameCallback(dt),dt=0},On=()=>{Xe?.close(),Xe=null},Bi=s=>{let u=s;if(!u.requestVideoFrameCallback)return;let b=()=>{Ve||O!==s||(nt=!0,he(),dt=u.requestVideoFrameCallback(b))};dt=u.requestVideoFrameCallback(b)},Wi=async s=>{let u=await createImageBitmap(s,{premultiplyAlpha:"none"}),b=[u.width,u.height],y=ci(u.width,u.height,V,ae,xe.height,o.fit);if(y===1)return{element:u,owned:!0,natural:b};try{return{element:await createImageBitmap(u,{resizeWidth:Math.max(1,Math.round(u.width*y)),resizeHeight:Math.max(1,Math.round(u.height*y)),resizeQuality:"medium",premultiplyAlpha:"none"}),owned:!0,natural:b}}finally{u.close()}},Bn=s=>new Promise((u,b)=>{let y=new Image;y.crossOrigin="anonymous",y.decoding="async",y.onload=()=>u({element:y,owned:!1}),y.onerror=()=>b(new Error("The glyph field could not load this image.")),y.src=s}),Ni=async s=>{if(typeof s!="string")return s instanceof HTMLImageElement&&!s.complete?s.decode().then(()=>({element:s,owned:!1})):s instanceof HTMLVideoElement&&s.readyState<2?new Promise((y,p)=>{s.addEventListener("loadeddata",()=>y({element:s,owned:!1}),{once:!0}),s.addEventListener("error",()=>p(new Error("The glyph field could not load this video.")),{once:!0})}):{element:s,owned:!1};if(Gl.test(s))return new Promise((y,p)=>{let k=document.createElement("video");k.crossOrigin="anonymous",k.muted=!0,k.loop=!0,k.playsInline=!0,k.preload="auto",k.addEventListener("loadeddata",()=>{k.play().catch(()=>{}),y({element:k,owned:!0})},{once:!0}),k.addEventListener("error",()=>p(new Error("The glyph field could not load this video.")),{once:!0}),k.src=s});if(typeof createImageBitmap!="function"||typeof fetch!="function")return Bn(s);let u;try{u=await(await fetch(s).then(y=>{if(!y.ok)throw new Error("The glyph field could not load this image.");return y})).blob()}catch(y){if(y instanceof Error&&y.message.startsWith("The glyph field"))throw y;return Bn(s)}if(!/svg/i.test(u.type))try{return await Wi(u)}catch{}let b=URL.createObjectURL(u);try{return await Bn(b)}finally{URL.revokeObjectURL(b)}},io=(s,u,b)=>{let{element:y,owned:p}=s;if(Ve||b!==Ye){p&&y instanceof HTMLVideoElement?(y.pause(),y.removeAttribute("src"),y.load()):p&&y.close();return}y!==O&&(Un(),On()),He=p&&y instanceof HTMLVideoElement?y:null,p&&!(y instanceof HTMLVideoElement)&&(Xe=y);let k=y!==O;O=y,ve=typeof u=="string"||u instanceof HTMLImageElement||u instanceof HTMLVideoElement,Fe=y instanceof HTMLVideoElement?y.videoHeight:y instanceof HTMLImageElement?y.naturalHeight:y.height,Ke=s.natural?.[0]??(y instanceof HTMLVideoElement?y.videoWidth:y instanceof HTMLImageElement?y.naturalWidth:y.width),de=s.natural?.[1]??Fe,nt=!0,k&&(ot=xt=-1/0),y instanceof HTMLVideoElement&&k&&Bi(y),ke||sr(),se=!0,he()},lo=(s,u)=>{Rt&&s===Ye&&(Rt=!1,mn()),Ht(u)},Hi=s=>typeof s!="string"&&!(s instanceof HTMLImageElement&&!s.complete)&&!(s instanceof HTMLVideoElement&&s.readyState<2),Wn=s=>{let u=++Ye;if(!s)return Un(),On(),O=null,Ke=de=Fe=rt=0,ve=!1,se=!0,he(),Promise.resolve();if(Hi(s)){try{io({element:s,owned:!1},s,u)}catch(b){lo(u,b)}return Promise.resolve()}return Ni(s).then(b=>io(b,s,u),b=>lo(u,b))};Va(),Ce();let so=t.source??null;return so?(Ye=1,Wn(so)):he(),{canvas:e,ready:Ai,get settings(){return o},update(s){let u=o,{element:b,rest:y}=a(s);if("clear"in s&&l?.element!==b?.element?(Dn(),l=b,Dn=b?jr(b.element,Pn):()=>{}):"clear"in s&&(l=b),"clear"in s){let $=i(s.clear)?s.clear:null;$!==c&&(c=$,st=!0,se=!0,cn(),he())}o=ma(b?{...y,clear:o.clear}:y,o),Ce(),s.label&&e.setAttribute("aria-label",s.label),o.maxPixelRatio!==u.maxPixelRatio&&Lt(),(o.charset!==u.charset||o.cellSize!==u.cellSize||o.cellAspect!==u.cellAspect||o.font!==u.font||o.fontWeight!==u.fontWeight||o.glyphScale!==u.glyphScale)&&(Mn(),Fn()),o.levels!==u.levels&&wn(),o.scope!==u.scope&&!ke&&(kn(),xt=performance.now()),((!!u.fluid&&Jt(u)==="fluid")!==bn()||o.fluid&&u.fluid&&o.fluid.resolution!==u.fluid.resolution)&&Da(),"source"in s&&Wn(s.source??null),"live"in s&&(ge=!!s.live),"effects"in s&&!ql(s.effects??[],R)?(Ln(s.effects??[]),ke||Sr()):(o.mark!==u.mark||vn(o)!==or)&&!ke&&(ee&&!v&&r.deleteProgram(ee.program),Rr=It.indexOf(o.mark),or=vn(o),ee=ar(fr(Rr,or))),se=!0,he()},setSource:Wn,pointer(s,u=0){if(s===null){_n(null);return}let b=e.getBoundingClientRect();_n(Cn(b.left+s,b.top+u))},redraw(){if(!(Ve||ke||At||!V))try{pn(!(Rt&&(v?x.canCompileInParallel:ne)))&&(ge&&O&&!(O instanceof HTMLVideoElement)&&sr(),to(),Rt||(se=!1))}catch(s){At=!0,Ht(s)}},pulse(s={}){if(Ve||bt())return;let u=e.getBoundingClientRect();if(!u.width||!u.height)return;let b=s.x??u.width/2,y=s.y??u.height/2;if(s.element){let k=s.element.getBoundingClientRect();b=k.left+k.width/2-u.left,y=k.top+k.height/2-u.top}let p=Math.max(0,Math.min(2,s.strength??1));if(o.tap==="surface"&&O&&ve){Ra(b/u.width,y/u.height,p);return}ie=[...ie,{x:b/u.width,y:y/u.height,born:performance.now(),strength:p}].slice(-4),he()},play(){h=!1,O instanceof HTMLVideoElement&&O.play().catch(()=>{}),se=!0,he()},pause(){h=!0,O instanceof HTMLVideoElement&&O.pause()},resize(){Lt()&&he()},destroy(){if(!Ve){if(Ve=!0,v||va--,Qe&&oa(Ir),Qe=!1,Ct.forEach(s=>s()),ce.forEach(s=>s()),v?x.leave(oo):(e.removeEventListener("webglcontextlost",Gn),e.removeEventListener("webglcontextrestored",In)),Un(),On(),O=null,!ke)if(xn(),gn(),r.deleteTexture(D),pt&&r.deleteTexture(pt),Xt&&r.deleteTexture(Xt),Vt?.dispose(),ct?.dispose(),St&&r.deleteTexture(St),Se&&r.deleteTexture(Se),v)x.releaseAtlas(Z,yn),H?.release();else{r.deleteTexture(S);for(let s of[_,ee,K])s&&r.deleteProgram(s.program);H?.dispose(),De.forEach(s=>r.deleteShader(s)),le&&r.deleteVertexArray(le),Y&&r.getExtension("WEBGL_lose_context")?.loseContext()}Z=null}}}}var kt=(e,t=[])=>self.postMessage(e,t),Ne=null,Ot=null,yi=null,er=!1,ln=new Map,Mi=new Map,sn=new Set,Vl=e=>\`\${e.charset}\\0\${e.fontWeight} \${e.font}\\0\${e.glyphScale}\`,jl=Ut.atlas,$l=Ut.shapes;Ut.atlas=(e,t,n)=>{let a=bi(e,t),i=ln.get(a);return i?{image:i,final:!0}:(sn.has(a)||(sn.add(a),kt({type:"atlas",key:a,settings:e,layout:t})),{...jl(e,t,n),final:!1})};Ut.shapes=e=>{let t=Vl(e),n=Mi.get(t);return n||(sn.has(\`shapes:\${t}\`)||(sn.add(\`shapes:\${t}\`),kt({type:"shapes",key:t,settings:e})),$l(e))};var Ei=()=>{let e=Ne?.settings.font.split(",")[0]?.trim().replace(/^["']|["']$/g,"");e&&Xn.announce(e)},Kl=e=>{let t="displayWidth"in e?e.displayWidth:e.width,n="displayHeight"in e?e.displayHeight:e.height;Ot??(Ot=new OffscreenCanvas(t,n)),(Ot.width!==t||Ot.height!==n)&&(Ot.width=t,Ot.height=n),yi??(yi=Ot.getContext("2d")),yi?.drawImage(e,0,0),e.close()};self.onmessage=({data:e})=>{try{switch(e.type){case"init":{self.devicePixelRatio=e.ratio,$n(...e.box),qn(e.hidden),Vn(e.reducedMotion,e.darkScheme),Kn(e.visible),er=e.streaming;let t=po(e.canvas);Ne=vi(t,{...e.options,context:"own",live:er,source:e.url??null,onError:n=>kt({type:"error",message:n.message})}),Ne.ready.then(()=>kt({type:"ready"}),n=>kt({type:"error",message:String(n?.message??n)}));break}case"box":$n(...e.box);break;case"visible":Kn(e.value);break;case"hidden":qn(e.value);break;case"media":Vn(e.reducedMotion,e.darkScheme);break;case"ratio":self.devicePixelRatio=e.value,Ne?.resize();break;case"pointer":mo(e.event,{clientX:e.clientX,clientY:e.clientY,pointerType:e.pointerType,buttons:e.buttons});break;case"frame":{if(Kl(e.frame),Ma||(Ma=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>{Ma=!1,kt({type:"took"})}))),!Ne)break;e.streaming!==er&&(er=e.streaming,Ne.update({live:er})),(!er||!Ea)&&(Ne.setSource(Ot),Ea=!0);break}case"url":Ea=!1,Ne?.setSource(e.url);break;case"update":Ne?.update(e.options);break;case"call":{Ne?.[e.method]?.apply(Ne,e.args);break}case"atlas":ln.set(e.key,e.image),Ei();break;case"shapes":Mi.set(e.key,e.data),Ei();break;case"destroy":Ne?.destroy(),Ne=null;for(let t of ln.values())t.close();ln.clear(),self.close();break}}catch(t){kt({type:"error",message:String(t?.message??t)})}};var Ea=!1,Ma=!1;kt({type:"loaded"});})();
`});var Ya=e=>Object.keys(e.params);function kl(e){if(!e.length)return null;let n=e.map((o,i)=>{let c=Ya(o);return`struct Fx${i}Params{${c.length?c.map(l=>`float ${l};`).join(""):"float unused;"}};`}).join(`
`),t={displace:["vec2 at=sampleAt;","sampleAt=at;"],shade:["vec3 color=rgb;vec3 ink=fxInk;float inkAmount=fxInkAmount;float glyph=fxGlyph;","fxInk=ink;fxInkAmount=inkAmount;fxGlyph=glyph;"]},a=o=>e.map((i,c)=>i[o]?`{// effect "${i.name}"
${((l,u)=>{let m=Ya(l),p=m.length?m.map((E,T)=>`uFx[${2*u+(T>>2)}].${"xyzw"[3&T]}`).join(","):"0.";return`Fx${u}Params params=Fx${u}Params(${p});`})(i,c)}${t[o][0]}
${i[o]}
${t[o][1]}}`:"").filter(Boolean).join(`
`);return{declarations:`uniform vec4 uFx[8];
uniform vec4 uFxPointer;
uniform float uFxTime;
${n}`,displace:a("displace"),shade:a("shade")}}var Rl={none:3,flow:1,orb:2,drift:4,swell:5,caustics:6,contour:7,aurora:8,ripple:9,halo:10,interference:11,mesh:12,cascade:13,constellation:14},Fi=e=>e?`
const float VSCALE=6.;
vec4 decodeFluid(vec4 t){return vec4((t.xy*2.-1.)*VSCALE,t.z,t.w);}
vec4 encodeFluid(vec4 v){return vec4(clamp(v.xy/VSCALE*.5+.5,0.,1.),clamp(v.z,0.,1.),1.);}`:`
vec4 decodeFluid(vec4 t){return t;}
vec4 encodeFluid(vec4 v){return vec4(v.xyz,1.);}`,Si=(e,n=[])=>{let t=(c=>`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uSource, uFluid;
uniform vec2 uResolution, uCell;
uniform float uCount, uBlend;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
uniform vec4 uSourceMap;
uniform int uScene;
uniform vec3 uInk, uHighlight;
uniform vec4 uBackground;
uniform float uBrightness, uContrast, uGamma, uInvert, uVignette, uSourceColor;
uniform float uRefraction, uGlow, uTime, uDrift, uFluidOn, uLod, uSaturation, uBackdrop, uShade, uHighlightAuto, uFluidMode;
uniform vec2 uFluidTexel;
uniform int uHoverMode;
uniform vec3 uLight;
uniform vec3 uTrail[12];
uniform float uLightRadius, uLightGain, uClock, uFlicker, uTrailAmount;
uniform sampler2D uTrailMap, uScope;
uniform float uScopeMode;
uniform vec2 uLevels;
// A moving source's levels, measured on the GPU (field-measure.ts), when uLevelsFromMap is set.
uniform sampler2D uLevelMap;
uniform float uLevelsFromMap;
// Shape sampling: each cell read in 3 by 5 parts and matched to the glyphs' own ink in those parts (see GlyphFieldOptions.sample).
uniform float uShapeOn, uShapeLod, uShapeTone, uShapeWindow, uShapeGate;
uniform sampler2D uShapes;
uniform int uMark;
uniform float uScale, uClearFeather, uClearShape, uOrder, uClearPointer;
// Text order by rows: each word's first glyph index and length, and how many words there are (0 reads the charset as one stream).
uniform vec2 uWords[8];
uniform float uWordCount;
uniform vec4 uClear;
uniform vec4 uPulse[4];
uniform sampler2D uTapMap;
uniform float uTapOn;
uniform sampler2D uClearMap;
uniform float uClearMapOn, uClearBend;
uniform vec2 uClearTexel;
layout(location=0) out vec4 outInk;
layout(location=1) out vec4 outUnder;
// The cell's light for bloom: its ink weighted by its tone, empty where the cell is blank. Only kept when bloom is on.
layout(location=2) out vec4 outGlow;
${Fi(c)}
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
vec3 generated(vec2 uv,float aspect){
  vec2 p=(uv-.5)*vec2(aspect,1.)*uScale;
  if(uScene==1){
    float t=uTime*.08;
    vec2 q=vec2(fbm(p*1.6+t),fbm(p*1.6-t+3.1));
    return vec3(smoothstep(.28,.86,fbm(p*1.8+q*1.6+vec2(t*.6,-t*.4))));
  }
  if(uScene==2){
    float r=.36,d=length(p),a=uTime*.25;
    vec3 l=normalize(vec3(cos(a)*.8,.55,sin(a)*.6+.6));
    if(d<r){
      vec3 n=normalize(vec3(p.x,-p.y,sqrt(r*r-d*d)));
      float diffuse=max(dot(n,l),0.),rim=pow(1.-n.z,2.5);
      float lon=atan(n.x,n.z)+uTime*.35,lat=asin(clamp(n.y,-1.,1.));
      float bands=.5+.25*sin(lat*14.)+.25*sin(lon*6.);
      return vec3(clamp(diffuse*.85+rim*.5+bands*.12,0.,1.));
    }
    return vec3(exp(-pow((d-r)*9.,2.))*.35);
  }
  if(uScene==4){
    // Drift: a few broad lobes that wander slowly. Built for halftone, where large soft shapes read best.
    float t=uTime*.045;
    vec2 q=p*1.15;
    vec2 w=vec2(fbm(q*.7+vec2(t,-t*.7)),fbm(q*.7+vec2(4.3-t*.8,t+1.7)));
    float n=fbm(q+w*1.3+vec2(t*.4,t*.25));
    return vec3(smoothstep(.36,.74,n));
  }
  if(uScene==5){
    // Swell: three crossing swells, the second bent by the first, so crests roll diagonally instead of pooling.
    float t=uTime;
    float s=sin((dot(p,vec2(.94,.33))/.95-t/9.)*6.2831853);
    float c=sin((dot(p,vec2(.6,-.8))/.58-t/13.)*6.2831853+s*.9);
    float k=sin((dot(p,vec2(-.29,.96))/.36+t/17.)*6.2831853);
    return vec3(smoothstep(.3,.9,.5+.5*(s*.5+c*.35+k*.15)));
  }
  // The kit's background scenes. Each starts a little way in, so a reduced-motion still is already composed.
  float t=uTime+40.,px=uCell.y/uResolution.y*uScale;
  if(uScene==6){
    // Caustics: light focused by a moving water surface. Two layers of warped sine waves drift against each other; each draws
    // smooth filaments along its zero line, about a character wide. Where they cross the light lifts a little, never to a blot.
    float tt=t*.12,a=0.,b=0.;
    for(int l=0;l<2;l++){
      float f=float(l),sc=5.4+f*2.4;
      vec2 q=(l==0?p:mat2(.8,-.6,.6,.8)*p)*sc;
      q+=vec2(sin(q.y*.45+tt*(1.+f*.3)),cos(q.x*.4-tt*(.8+f*.4)))*1.3;
      float v=sin(q.x+1.4*sin(q.y*.7+tt))+sin(q.y*1.1+1.2*sin(q.x*.8-tt*1.3))*.9;
      float wv=max(fwidth(v),1e-4);
      float line=(1.-smoothstep(.2,1.5,abs(v)/wv))*(l==0?.78:.62)+exp(-abs(v)/(wv*5.))*.16;
      if(l==0)a=line;else b=line;
    }
    float pulse=.85+.15*sin(tt*3.+p.x*1.7-p.y*1.1);
    float light=max(a,b)+.3*min(a,b);
    return vec3(clamp(light*light*pulse,0.,.78));
  }
  if(uScene==7){
    // Contour: a slow terrain read as survey lines about a character wide at any size; every fifth is an index line.
    float tt=t*.02;
    vec2 q=p*1.15+vec2(tt,-tt*.6);
    float h=noise(q)*.62+noise(q*2.07+3.1)*.27+noise(q*4.3-tt+7.)*.11;
    h+=.08*sin(tt*2.+p.x*.8);
    float k=h*13.,w=max(fwidth(k),1e-4),d=abs(fract(k+.5)-.5)/w;
    float major=mod(floor(k+.5),5.)<.5?1.:0.;
    return vec3((1.-smoothstep(.35,1.25-major*.25,d))*mix(.55,1.,major));
  }
  if(uScene==8){
    // Aurora: three curtains at different distances hang from the top. Far ones sit higher and dimmer; the nearest is tallest
    // and brightest. Each folds slowly and is brightest along its lower hem, fading upward. The rays are set per character
    // column, so the curtains read as vertical strokes at any stage size, from a small card to a phone.
    float tt=t*.05,a=0.,cw=uCell.x/uResolution.x;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n),near=f/2.;
      float x=p.x*(1.3-near*.4)+f*3.7;
      float hem=-.28+near*.3+.16*sin(x*1.3+tt*(.9+f*.25)+f*2.)+.045*sin(x*3.4-tt*1.5+f);
      float d=hem-p.y;
      float body=d>0.?exp(-d/(.14+near*.26))*(.45+.55*exp(-d/.03)):exp(-d*d/.0002);
      float fold=.5+.5*sin(x*2.1+tt*.9+f*1.7+.7*sin(x*.8-tt*.6));
      float ray=mix(hash(vec2(col,f*7.1)),noise(vec2(col*.18+f*9.,tt*.7+f)),.55);
      float layer=clamp(body*(.1+.9*fold*fold)*(.2+.8*ray)*(.4+near*.6)*4.2,0.,1.);
      a=1.-(1.-a)*(1.-layer);
    }
    return vec3(smoothstep(.12,.9,a));
  }
  if(uScene==9){
    // Ripple: still water. Drops land here and there, each a few rings that widen and fade; the pointer drops its own.
    float tone=0.,g=.72;
    vec2 q=p/g,id=floor(q);
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j),h=vec2(hash(c),hash(c+7.3));
      float period=5.+h.x*5.,age=fract(t*.3/period*4.+h.y);
      vec2 at=(c+.2+.6*h)*g;
      float d=length(p-at),r=age*.62;
      float rings=max(0.,cos((d-r)*34.))*exp(-pow((d-r)/.11,2.));
      tone+=rings*pow(1.-age,1.8)*smoothstep(0.,.06,age)*(.7+.3*h.x);
    }
    return vec3(clamp(tone*1.25,0.,1.));
  }
  if(uScene==10){
    // Halo: a slow breathing corona that frames the content, its rays turning. The ring fits the stage: wide on a desktop
    // hero, tall on a phone, so the whole halo stays on screen; the middle stays empty for a headline.
    vec2 r=vec2(min(.46,aspect*.4),min(.34,.36/max(aspect,.01)*.5+.2));
    vec2 e=p/r;
    float d=length(e),a=atan(e.y,e.x),tt=t*.07,k=min(r.x,r.y);
    float breathe=1.+.04*sin(tt*3.1);
    float rays=.5+.5*noise(vec2(a*3.2+tt,tt*.5))*(.6+.4*noise(vec2(a*7.-tt*1.2,3.+tt*.4)));
    float s=(d-breathe)*k;
    float rim=exp(-pow(s/.03,2.));
    float corona=exp(-max(0.,s)/(.1+.08*rays))*smoothstep(-.04,.015,s)*rays*smoothstep(.36,.12,s);
    return vec3(clamp(rim*(.55+.45*rays)+corona*.85,0.,1.));
  }
  if(uScene==11){
    // Interference: two ring grids from slowly orbiting centres. Where they cross, broad moire bands open and close.
    float tt=t*.05;
    vec2 a=vec2(-.3+.12*sin(tt),.07*cos(tt*1.3)),b=vec2(.3+.1*cos(tt*.8),-.06*sin(tt*1.1));
    float f=6.2831853/max(px*4.6,.004);
    float m=cos(length(p-a)*f)+cos(length(p-b)*f);
    return vec3(smoothstep(.7,2.,m));
  }
  if(uScene==12){
    // Mesh: four soft lights on slow Lissajous paths, a gradient mesh written in characters.
    float tt=t*.07,m=0.;
    for(int n=0;n<4;n++){
      float f=float(n)*1.7;
      vec2 c=vec2(.66*sin(tt*(.7+f*.13)+f),.34*cos(tt*(.9-f*.07)+f*1.3));
      float s=.3+.07*sin(tt+f);
      m+=exp(-dot(p-c,p-c)/(s*s))*(.8-float(n)*.1);
    }
    return vec3(smoothstep(.06,1.1,m));
  }
  if(uScene==13){
    // Cascade: streaks fall in three depths. Far ones are frequent, faint, short and slow; near ones rare, long, bright and
    // quick. Each has a bright head and a tail that fades behind it, and a column can carry two streaks at once.
    float tone=0.,cw=uCell.x/uResolution.x,ch=uCell.y/uResolution.y;
    float col=floor(uv.x/cw+.5);
    for(int n=0;n<3;n++){
      float f=float(n);
      for(int k=0;k<2;k++){
        float seed=f*13.1+float(k)*41.7,h=hash(vec2(col,seed));
        if(h<1.-(.5-f*.15))continue;
        float speed=(.045+f*.07)*(.75+.5*hash(vec2(col,seed+2.)));
        float tail=.12+f*.16,y=fract(t*speed+hash(vec2(col,seed+5.)))*(1.+tail*2.)-tail;
        float d=y-uv.y;
        if(d<0.||d>tail)continue;
        float head=d<ch*1.2?1.:0.;
        tone=max(tone,max(head*(.55+f*.22),pow(1.-d/tail,1.7)*(.28+f*.3)));
      }
    }
    return vec3(clamp(tone,0.,1.));
  }
  if(uScene==14){
    // Constellation: points wander in their own cells; neighbours close enough are linked by fine lines. Each point is a
    // bright core in a soft halo, so it reads at card size as well as full width.
    float g=.23,tt=t*.18;
    vec2 q=p/g,id=floor(q);
    vec2 pts[9];
    for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
      vec2 c=id+vec2(i,j);
      float h=hash(c),k=hash(c+3.7);
      pts[(j+1)*3+i+1]=c+.5+.36*vec2(sin(tt*(.6+h)+h*6.28),cos(tt*(.5+k)+k*6.28));
    }
    float line=0.,star=0.,lw=max(px/g,.02);
    for(int n=0;n<9;n++){
      vec2 e=q-pts[n];
      float d2=dot(e,e),tw=.8+.2*sin(tt*3.+float(n)*1.7);
      star=max(star,max(exp(-d2/(lw*lw*1.6)),.38*exp(-d2/(lw*lw*7.)))*tw);
      for(int m=n+1;m<9;m++){
        vec2 a=pts[n],ba=pts[m]-a;
        float len=length(ba);
        if(len>1.35)continue;
        float hh=clamp(dot(q-a,ba)/dot(ba,ba),0.,1.);
        float d=length(q-a-ba*hh);
        line=max(line,(1.-smoothstep(lw*.3,lw*.75,d))*smoothstep(1.35,.6,len)*.72);
      }
    }
    return vec3(clamp(max(line,star),0.,1.));
  }
  return vec3(0.);
}
// The source's brightness to the field's tone: levels, contrast and brightness, gamma, invert.
float transfer(float tone){
  vec2 levels=uLevelsFromMap>.5?texelFetch(uLevelMap,ivec2(0),0).rg:uLevels;
  tone=clamp((tone-levels.x)/max(levels.y-levels.x,.01),0.,1.);
  tone=clamp((tone-.5)*uContrast+.5+uBrightness,0.,1.);
  tone=pow(tone,1./uGamma);
  return uInvert>.5?1.-tone:tone;
}
// Hover scope: 1 where the pointer response may act. The map holds the source's soft subject coverage in alpha.
float hoverScope(vec2 uv){
  if(uScopeMode<.5||uScene!=0)return 1.;
  vec2 s=uv*uSourceMap.xy+uSourceMap.zw;
  vec4 scope=texture(uScope,clamp(s,0.,1.));
  // Red set: a source with no subject to key (measured on the GPU), where every scope acts everywhere.
  if(scope.r>.5)return 1.;
  float c=(s.x<0.||s.y<0.||s.x>1.||s.y>1.)?0.:scope.a;
  return uScopeMode<1.5?c:1.-c;
}
void main(){
  vec2 cell=floor(gl_FragCoord.xy);
  vec2 uv=(cell+.5)*uCell/uResolution;
  float aspect=uResolution.x/uResolution.y;
  float hs=hoverScope(uv);
  vec4 fluid=vec4(0.);
  // lift: signed tone change. The solver's flow brightens one side of each eddy and opens the other into gaps.
  float lift=0.,wake=0.,bend=1.,swirl=0.,speed=0.;
  if(uFluidOn>.5){
    vec4 raw=texture(uFluid,vec2(uv.x,1.-uv.y));
    if(uFluidMode>.5){
      vec2 v=raw.xy*uFluidTexel*vec2(aspect,1.)*hs;
      fluid=vec4(v,0.,1.);
      swirl=clamp(dot(v,vec2(.4,.65))*uGlow*.32,-.65,.65);
      speed=clamp(length(v)*uGlow*.055,0.,.38);
      bend=.4;
    } else {
      fluid=decodeFluid(raw);
      fluid.xyz*=hs;
      wake=clamp(fluid.z*uGlow,0.,1.);
      lift=wake*.55;
    }
  }
  vec2 drift=uDrift*.006*vec2(sin(uv.y*5.3+uTime*.6),cos(uv.x*4.1-uTime*.5));
  vec2 sampleAt=uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend+drift;
  float keep=0.;
  if(uClearMapOn>0.){
    // Text-shaped clear map: quiet right behind the content, and the field leans away from its edges so it flows round them.
    keep=texture(uClearMap,uv).r;
    vec2 t=uClearTexel*1.5;
    vec2 g=vec2(texture(uClearMap,uv+vec2(t.x,0.)).r-texture(uClearMap,uv-vec2(t.x,0.)).r,texture(uClearMap,uv+vec2(0.,t.y)).r-texture(uClearMap,uv-vec2(0.,t.y)).r);
    sampleAt+=g*vec2(1./aspect,1.)*uClearBend;
  }
  float spot=0.;
  if(uHoverMode==4||uHoverMode==5){
    vec2 d=(uv-uLight.xy)*vec2(aspect,1.);
    float q2=dot(d,d)/(uLightRadius*uLightRadius*2.2);
    // Loupe: flat-topped zoom with a soft rim. Reveal: a soft spot in the source's colours.
    if(uHoverMode==4) sampleAt-=(uv-uLight.xy)*exp(-q2*q2)*.45*uLight.z*min(1.,uLightGain*1.6)*hs;
    else spot=exp(-q2*1.6)*uLight.z*min(1.,uLightGain*1.6)*hs;
  }
  vec3 rgb,glow=vec3(0.);
  float sub[15];float subMean=-1.,subLo=0.,subHi=0.;
  if(uScene==0){
    vec2 s=sampleAt*uSourceMap.xy+uSourceMap.zw;
    bool inside=!(s.x<0.||s.y<0.||s.x>1.||s.y>1.);
    rgb=inside?textureLod(uSource,s,uLod).rgb:vec3(0.);
    if(uShapeOn>.5){
      vec2 cu=uCell/uResolution;
      subMean=0.;subLo=1.;subHi=0.;
      for(int j=0;j<5;j++)for(int i=0;i<3;i++){
        vec2 o=(vec2((float(i)+.5)/3.,(float(j)+.5)/5.)-.5)*cu,ss=(sampleAt+o)*uSourceMap.xy+uSourceMap.zw;
        float v=(ss.x<0.||ss.y<0.||ss.x>1.||ss.y>1.)?transfer(0.):transfer(dot(textureLod(uSource,ss,uShapeLod).rgb,vec3(.2126,.7152,.0722)));
        sub[j*3+i]=v;subMean+=v;subLo=min(subLo,v);subHi=max(subHi,v);
      }
      subMean/=15.;
    }
    if(uBackdrop>0.){
      vec2 b=(uv-vec2(fluid.x/aspect,-fluid.y)*uRefraction*bend*.5)*uSourceMap.xy+uSourceMap.zw;
      glow=(b.x<0.||b.y<0.||b.x>1.||b.y>1.)?vec3(0.):textureLod(uSource,b,uLod+3.).rgb*uBackdrop;
    }
  } else rgb=generated(sampleAt,aspect);
  float tone=transfer(dot(rgb,vec3(.2126,.7152,.0722)));
  // Shape sampling takes its tone from its parts, so the character's ink matches the cell's.
  if(subMean>=0.)tone=subMean;
  float flick=0.,trailFold=0.;
  // Reveal: under the spot the characters take the source's own colour and a little more ink.
  if(spot>0.)lift=spot*.22;
  if(uHoverMode==2){
    // Lantern: a soft light and its fading tail lift the characters they pass. Nothing moves the image.
    vec2 ap=vec2(aspect,1.),d=(uv-uLight.xy)*ap;
    float r2=uLightRadius*uLightRadius,glowL=uLight.z*exp(-dot(d,d)/r2);
    for(int i=0;i<12;i++){vec2 e=(uv-uTrail[i].xy)*ap;glowL+=uTrail[i].z*exp(-dot(e,e)/(r2*.55));}
    glowL=min(glowL,1.)*hs;
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=glowL*uLightGain*(.7+.6*grain);
    wake=glowL*.4;
    // A few letters at the light's rim step up the ramp and back, as if being retyped.
    flick=uFlicker*step(.9,fract(grain*13.7+floor(uClock*7.+grain*5.)*.37))*glowL*(1.-glowL)*4.;
  }
  if(uHoverMode==3){
    // Trail: the studio's ink field, as a 16-bit density. Sparse marks fill in, dense marks open up.
    vec4 ink=texture(uTrailMap,uv);
    float density=(ink.r*65280.+ink.g*255.)/65535.*uTrailAmount;
    float t=clamp(density/.38,0.,1.);
    trailFold=t*t*(3.-2.*t)*hs;
  }
  if(uFluidMode>.5&&uHoverMode==1){
    // Dark ground: any motion lights the characters. Lit ground: the flow lights one side of each eddy and opens the other.
    // A little cell-to-cell grain keeps the lit area a shimmer of letters rather than a solid block.
    float grain=fract(sin(dot(cell,vec2(12.9898,78.233)))*43758.5453);
    lift=mix(abs(swirl)*.5+speed,swirl+speed*.35,smoothstep(.12,.55,tone))*(.65+.7*grain);
    wake=clamp(lift*1.6,0.,1.);
  }
  // The resting tone, before the pointer's response: a clear zone may quiet the one and keep part of the other.
  float calm=tone;
  tone=clamp(tone+lift,0.,1.);
  tone+=(1.-2.*tone)*trailFold;
  // Pulses: rings sent by the interface (field.pulse()), e.g. on a save or a notification.
  for(int i=0;i<4;i++){
    if(uPulse[i].w<=0.)continue;
    float dist=length((uv-uPulse[i].xy)*vec2(aspect,1.)),front=uPulse[i].z*.95;
    float ring=exp(-pow((dist-front)/.1,2.))*uPulse[i].w*exp(-uPulse[i].z*.85);
    tone=clamp(tone+ring*.85,0.,1.);
  }
  if(uTapOn>0.){
    // A surface tap: a signed lift (16 bits) and a glint, worked out on the CPU over the photo's own medium.
    vec4 tap=texture(uTapMap,uv);
    float lift=(tap.r*65280.+tap.g*255.)/65535.*2.-1.;
    tone=clamp(tone+(lift*1.25+tap.b)*uTapOn,0.,1.);
  }
  tone*=1.-uVignette*smoothstep(.35,1.05,length((uv-.5)*vec2(min(aspect,1.8),1.)*2.));
  if(uClearMapOn>0.)tone*=1.-uClearMapOn*smoothstep(0.,1.,keep);
  if(uClear.z>0.){
    // Clear zone: the field fades out around content so text above it stays readable.
    vec2 half_=uClear.zw*.5*vec2(aspect,1.),q=(uv-uClear.xy-uClear.zw*.5)*vec2(aspect,1.);
    float dz;
    if(uClearShape>.5){vec2 e=abs(q)-half_;dz=length(max(e,0.))+min(max(e.x,e.y),0.);}
    else dz=(length(q/max(half_,vec2(1e-4)))-1.)*min(half_.x,half_.y);
    float keepZone=smoothstep(0.,uClearFeather,dz);
    tone=calm*keepZone+(tone-calm)*mix(keepZone,1.,uClearPointer);
  }
  // Blend: a shade between two characters takes the upper one in the share of cells a 4x4 Bayer pattern gives it.
  float level=tone*(uCount-1.),upper=fract(level)>=.5?1.:0.;
  if(uBlend>.5&&tone>.02&&tone<.98){
    ivec2 q=ivec2(mod(gl_FragCoord.xy,4.));
    upper=fract(level)>(BAYER[q.y*4+q.x]+.5)/16.?1.:0.;
  }
  if(subMean>=0.&&uOrder<.5&&tone>.008){
    // Shape: among the characters near the cell's tone, the one whose ink in each part best matches the cell's parts after the
    // hovers' lift. Each glyph's ink is scaled to its place on the ramp, so shape decides among glyphs and the ramp keeps the tone.
    float n=uCount-1.,d=tone-subMean,best=1e9,c0=floor(tone*n+.5);
    upper=0.;
    level=c0;
    // A cell without an edge in it keeps the character its tone gives: shape only decides where there is shape to follow.
    if(subHi-subLo>=uShapeGate)for(int k=-6;k<=6;k++){
      float g=c0+float(k);
      if(abs(float(k))>uShapeWindow||g<1.||g>n)continue;
      float r=g/n,scale=r/max(texelFetch(uShapes,ivec2(15,int(g)),0).r,.004),e=0.;
      for(int i=0;i<15;i++){float q=clamp(sub[i]+d,0.,1.)-texelFetch(uShapes,ivec2(i,int(g)),0).r*scale;e+=q*q;}
      e=e/15.+uShapeTone*(tone-r)*(tone-r);
      if(e<best){best=e;level=g;}
    }
  }
  float index=min(uCount-1.,floor(level)+upper+(flick>.5&&tone>.02?1.:0.));
  if(uOrder>1.5){
    // Scatter order: each cell keeps one character picked from the charset by a hash of its place, and the tone sets how
    // strongly it shows rather than which character it is, so a field of letters brightens and fades like a lit screen.
    index=tone>.008?1.+min(uCount-2.,floor(hash(cell*.731+vec2(19.17,3.71))*(uCount-1.))):0.;
  } else if(uOrder>.5){
    // Text order: the charset after its blank is read in sequence along each row, each row a few letters on, so words stay
    // legible. Every letter is there; the tone sets how strongly it shows, so the words fade out toward the field's quiet edges.
    float n=max(1.,uCount-1.);
    index=tone>.015?1.+mod(cell.x+cell.y*(floor(n*.38)+1.),n):0.;
    if(uWordCount>.5&&tone>.015){
      // One word a row, repeated with a space between, rows taking the words in turn and each a few letters along.
      int k=int(mod(cell.y,uWordCount));
      vec2 word=uWords[0];
      for(int i=1;i<8;i++)if(i==k)word=uWords[i];
      float at=mod(cell.x+cell.y*3.,word.y+1.);
      index=at<word.y?word.x+at:0.;
    }
  }
  vec3 hue=rgb/max(max(rgb.r,rgb.g),max(rgb.b,.03));
  hue=mix(vec3(dot(hue,vec3(.2126,.7152,.0722))),hue,uSaturation);
  vec3 base=uRampCount>1.5?rampAt(tone):uInk;
  vec3 ink=mix(base*mix(1.,.3+.7*tone,uRampCount>1.5?0.:uShade),clamp(hue*(.38+.62*tone),0.,1.),uSourceColor);
  // Scatter, text and inlay carry the tone in the ink's strength, which the pixel pass reads back as opacity or tile shade.
  if(uOrder>1.5||(uOrder>.5&&uMark==0)||uMark==17)ink=mix(uInk,hue,uSourceColor)*tone;
  vec3 lifted=uHighlightAuto>.5?ink/max(max(ink.r,ink.g),max(ink.b,.06)):uHighlight;
  ink=mix(ink,lifted,wake*.7);
  if(spot>0.)ink=mix(ink,clamp(rgb/max(max(rgb.r,rgb.g),max(rgb.b,.08))*(.45+.55*tone),0.,1.),spot);
  float underAlpha=max(uBackground.a,min(1.,max(glow.r,max(glow.g,glow.b))));
  vec3 under=min(uBackground.rgb*uBackground.a+glow,vec3(underAlpha));
  // Glyphs keep their atlas index, exact in 8 bits; the other marks keep the tone, and empty where the charset is blank.
  outInk=vec4(ink,uMark==0||uMark==17?index/255.:uMark==1?(tone>.003?tone:0.):index>0.?max(tone,1./255.):0.);
  outUnder=vec4(under,underAlpha);
  // Highlights carry most of the light, as a lens blooms: the tone squared, so mid tones glow a little and shadows not at all.
  float lit=outInk.a>0.?tone*tone:0.;
  outGlow=vec4(ink*lit,lit);
}`)(e),a=kl(n);if(!a)return t;let o=(c,l,u,m=!1)=>{let p=c.indexOf(l);if(p<0||c.indexOf(l,p+1)>=0)throw new Error(`The cell pass lost its effect anchor: ${l}`);return m?c.slice(0,p)+u+c.slice(p):c.slice(0,p+l.length)+u+c.slice(p+l.length)},i=o(t,"void main(){",`${a.declarations}
`,!0);return i=o(i,"float aspect=uResolution.x/uResolution.y;",`
  vec2 pointer=uFxPointer.xy;float pointerOn=uFxPointer.z,motion=uFxPointer.w,time=uFxTime;
  vec3 fxInk=vec3(0.);float fxInkAmount=0.,fxGlyph=0.;`),i=o(i,`+drift;
`,`${a.displace}
`),i=o(i,"  tone*=1.-uVignette*",`${a.shade}
  tone=clamp(tone,0.,1.);
`,!0),i=o(i,"+(flick>.5&&tone>.02?1.:0.));",`
  if(tone>.008)index=clamp(index+floor(fxGlyph+.5),tone>.008?1.:0.,uCount-1.);`),i=o(i,"ink=mix(ink,lifted,wake*.7);",`
  ink=mix(ink,clamp(fxInk,0.,1.),clamp(fxInkAmount,0.,1.));`),i},Al=`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uAtlas, uCells, uUnder;
uniform vec2 uResolution, uCell, uPitch;
uniform float uColumns, uDotScale, uSourceColor;
uniform vec2 uDir;
uniform int uMark;
// Inlay accents: share of tiles, letter shuffle span, a seed that steps a few times a second, charset length.
uniform vec4 uInlay;
// Line marks: pitch in cell heights, weight, the share of cells that sparkle.
uniform vec4 uLine;
uniform vec4 uFade;
// Finishing passes: bloom amount and radius in cells, scanlines, grain; chromatic split, curvature, time, rows per scanline pair.
uniform vec4 uPost, uPost2;
uniform sampler2D uGlow;
out vec4 outColor;
const float BAYER[16]=float[16](0.,8.,2.,10.,12.,4.,14.,6.,3.,11.,1.,9.,15.,7.,13.,5.);
uniform vec3 uRamp[6];
uniform float uRampCount;
// The gradient map: the tone run through the ramp's stops, evenly spaced, faintest first.
vec3 rampAt(float t){
  float x=clamp(t,0.,1.)*(uRampCount-1.);
  int i=int(min(floor(x),uRampCount-2.));
  vec3 a=uRamp[0],b=uRamp[1];
  for(int k=1;k<5;k++)if(k==i){a=uRamp[k];b=uRamp[k+1];}
  return mix(a,b,clamp(x-float(i),0.,1.));
}
// The Studio's print defaults: roughness .35, seed 7, registration .2 and its coral second ink. The screen angle is uDir (-35deg).
const float ROUGH=.35,SEED=7.;
const vec3 SECOND=vec3(.925,.404,.322);
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
// Coverage of a signed distance given in device pixels.
float cover(float d){return clamp(.5-d,0.,1.);}
float box(vec2 p,vec2 lo,vec2 hi){vec2 a=clamp(p-lo,0.,1.)*clamp(hi-p,0.,1.);return a.x*a.y;}
float disc(vec2 p,vec2 c,float r){return r>.05?cover(length(p-c)-r):0.;}
float ellipse(vec2 p,vec2 c,vec2 r,float a){vec2 d=p-c;d=vec2(cos(a)*d.x+sin(a)*d.y,-sin(a)*d.x+cos(a)*d.y);float k=length(d/r);return cover((k-1.)*min(r.x,r.y));}
// World-anchored parallel cuts across direction d: period and width in cell heights, so lines run on from cell to cell.
float cuts(vec2 w,vec2 d,float period,float width,float px){
  if(width<=0.)return 0.;
  float proj=dot(vec2(-d.y,d.x),w);
  return cover((abs(fract(proj/period+.5)-.5)*period-width*.5)*px);
}
// Lays an ink over what is already down, multiplying where they overlap, as transparent inks do on paper.
void lay(inout vec3 rgb,inout float a,vec3 c,float k){
  float next=a+k*(1.-a);
  rgb=next>0.?(rgb*a*(1.-k)+mix(c,rgb*c,a)*k)/next:c;
  a=next;
}
vec4 drawAt(vec2 frag){
  vec2 DIR=uDir;
  // The pitch is the atlas cell, or a fractional one under cellFit 'fill', where each glyph sits centred in its stretched cell.
  vec2 cell=floor(frag/uPitch);
  vec4 ink=texelFetch(uCells,ivec2(cell),0),under=texelFetch(uUnder,ivec2(cell),0);
  vec2 local=frag-cell*uPitch;
  float coverage;
  vec3 rgb=ink.rgb;
  // Scatter and inlay: the cell's strength, read back from its ink, and the ink itself at full strength.
  float strength=1.;
  if(uFade.w>.5){
    float top=max(rgb.r,max(rgb.g,rgb.b));
    strength=uSourceColor>.5?top:clamp(top/max(max(uFade.r,max(uFade.g,uFade.b)),.004),0.,1.);
    rgb=uSourceColor>.5?rgb/max(top,.004):uFade.rgb;
  }
  if(uMark==0||uMark==17){
    float index=floor(ink.a*255.+.5);
    // Inlay shuffle: every tiled cell takes a letter from the upper charset, traded for a neighbour a few times a second, so a
    // tiled body flickers through its letters rather than banding by tone; the tile's shade still carries the tone.
    float hs=hash(cell*.917+uInlay.z*1.37);
    if(uMark==17&&uInlay.y>0.&&index>0.&&(index>=uInlay.w*.62||strength>=.2))index=clamp(max(index,ceil(uInlay.w*.62)+1.)+floor((hs-.5)*(2.*uInlay.y+1.)),ceil(uInlay.w*.62),uInlay.w-1.);
    ivec2 tile=ivec2(int(mod(index,uColumns)),int(floor(index/uColumns)));
    vec2 texel=floor(local-floor((uPitch-uCell)*.5));
    coverage=all(greaterThanEqual(texel,vec2(0.)))&&all(lessThan(texel,uCell))?texelFetch(uAtlas,tile*ivec2(uCell)+ivec2(texel),0).a:0.;
    if(uMark==17){
      // Inlay: a gapped tile in the ink, lighter the denser the cell, with its character set into it in a darker shade. Faint
      // cells keep only the character, so a shape's edge frays into specks; empty cells show a hairline grid.
      vec2 p=local+.5;
      float gap=max(1.,floor(min(uPitch.x,uPitch.y)*.08+.5));
      float plate=index>0.?smoothstep(.2,.32,strength)*box(p,vec2(0.),uPitch-gap):0.;
      // Tile and letter are the ink at two strengths over whatever ground lies below, so the inlay reads on light and dark pages:
      // the tile strengthens with the tone and the letter is cut back toward the ground.
      float face=(.18+.8*smoothstep(.05,.8,strength))*plate;
      // With shuffle on, tiles also vary a little in shade, as worn inlay does.
      if(uInlay.y>0.)face*=.8+.34*hs;
      float speck=coverage*min(1.,strength*6.)*(1.-plate);
      float grid=index>0.?0.:(1.-box(p,vec2(0.),uPitch-1.))*.035;
      float a=mix(face,face*.22,coverage*plate)+speck;
      // Accents: a few lit tiles carry a coloured letter, a tinted tile or a white glint, picked afresh with the seed.
      float ha=hash(cell*1.31+uInlay.z*.71+vec2(7.3,1.9));
      if(plate>0.&&ha<uInlay.x){
        float pick=hash(cell+uInlay.z*2.11+vec2(3.1,8.7));
        vec3 hue=pick<.16?vec3(.86,.27,.27):pick<.3?vec3(.92,.55,.2):pick<.42?vec3(.9,.78,.25):pick<.58?vec3(.35,.72,.38):pick<.72?vec3(.3,.72,.8):pick<.84?vec3(.32,.42,.92):vec3(.66,.42,.86);
        float kind=ha/uInlay.x;
        if(kind<.55){float k=coverage*plate;rgb=mix(rgb,hue,k);a=mix(a,1.,k);}
        else if(kind<.88){rgb=mix(rgb,hue,.55);}
        else{float k=coverage*plate;rgb=mix(rgb,vec3(1.),1.-k);a=mix(max(a,.96),face*.3,k);}
      }
      coverage=a>0.?a:grid;
    } else coverage*=strength;
  } else if(uMark==1){
    // Halftone: dot area follows tone, so midtones read true; edges are antialiased to one device pixel.
    float r=sqrt(ink.a)*min(uPitch.x,uPitch.y)*.5*uDotScale;
    coverage=ink.a>.003?clamp(r-length(local-uPitch*.5)+.5,0.,1.):0.;
  } else if(ink.a<=0.){
    coverage=0.;
  } else {
    float tone=ink.a,side=min(uPitch.x,uPitch.y);
    vec2 q=local/uPitch,c=uPitch*.5,p=local+.5;
    // Tiles fade with the tone in one ink, as the Studio's do; in source colour the colour already carries it.
    float fade=uSourceColor>.5?1.:tone,gap=max(.5,uPitch.x*.06),grain=hash(cell+SEED);
    vec2 w=(cell+q)*uPitch/uPitch.y;
    if(uMark==2)coverage=fade;
    else if(uMark==3)coverage=box(p,vec2(0.),uPitch-gap)*fade;
    else if(uMark==4){
      // Lego: a gapped brick, lit from above, with a raised stud ringed by its shadow.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb*=1.06-.14*q.y;
      float r=side*.28,d=length(local-c)-r,lit=clamp(dot(c-local,vec2(.6,.8))/r,-1.,1.);
      rgb=mix(rgb,mix(rgb,vec3(1.),.2+.12*lit),cover(d));
      rgb=mix(rgb,rgb*.72,cover(abs(d)-max(.5,side*.04)));
    } else if(uMark==5){
      // Voxel: an isometric cube; top, left and right faces at full, .72 and .42 strength.
      float h=.5*abs(q.x-.5);
      coverage=cover(-min(q.y-h,1.-h-q.y)*uPitch.y)*cover(-min(q.x,1.-q.x)*uPitch.x);
      coverage*=mix(q.x<.5?.72:.42,1.,cover((q.y-(.5-h))*uPitch.y))*fade;
    } else if(uMark==6){
      // Disco: a gapped mirror tile, its upper facet catching light and its lower in shade.
      coverage=box(p,vec2(0.),uPitch-gap)*fade;
      rgb=q.y<.35?mix(rgb,vec3(1.),.1+grain*.25):q.y>.65?rgb*.75:rgb;
    } else if(uMark==18){
      // Tick: a printed glow. A smooth wash carries the light; over it every cell holds one short upright tick whose strength
      // steps through four levels by a 4x4 ordered threshold, so the mid tones read as a crisp dither of ticks that brightens
      // toward the light and melts into the wash at its core. With a ramp the wash runs through it and the ticks sit a step up.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.;
      float tw=max(1.,floor(uPitch.x*.28+.5)),tl=max(2.,floor(uPitch.y*.46+.5));
      vec2 lo=floor(c-vec2(tw,tl)*.5);
      float bar=box(p,lo,lo+vec2(tw,tl));
      float lvl=clamp(floor(tone*4.+th)/4.,0.,1.);
      float melt=1.-smoothstep(.7,.96,tone);
      float at=bar*melt*(.42+.58*lvl);
      bool ramped=uRampCount>1.5&&uSourceColor<.5;
      float aw=ramped?pow(smoothstep(.08,.88,tone),1.4):tone*tone*.92;
      vec3 W=ramped?rampAt(tone):rgb,T=ramped?rampAt(min(1.,lvl+.38)):rgb;
      float a=at+aw*(1.-at);
      rgb=a>0.?(T*at+W*aw*(1.-at))/a:W;
      coverage=a;
    } else if(uMark==19){
      // Bayer: one gapped square a cell, on or off by a 4x4 ordered threshold at two strengths, so a picture steps through
      // empty, half and full squares in the brand's tones, as pixel-dithered art does.
      ivec2 b=ivec2(mod(cell,4.));
      float th=(BAYER[b.y*4+b.x]+.5)/16.,g=max(1.,floor(min(uPitch.x,uPitch.y)*(1.-uDotScale)+.5));
      float lvl=tone>.5+th*.5?1.:tone>th*.5?.5:0.;
      // An empty cell keeps a small faint square, so the ground reads as a dot grid that the picture fills.
      vec2 d=floor(c-max(1.,floor(min(uPitch.x,uPitch.y)*.3))*.5);
      coverage=lvl>0.?box(p,vec2(0.),uPitch-g)*lvl:box(p,d,d+max(1.,floor(min(uPitch.x,uPitch.y)*.3)))*.35;
    } else if(uMark==7){
      // Dither: an ordered 4x4 Bayer screen at about five dots a cell, lit where the cell's tone passes the threshold.
      ivec2 b=ivec2(mod(floor(frag/max(1.,floor(side/5.))),4.));
      coverage=tone>(BAYER[b.y*4+b.x]+.5)/16.?1.:0.;
    } else if(uMark==8){
      // Hex: a flat-topped hexagon filling the cell.
      vec2 h=abs((local-c)/(uPitch*.49));
      coverage=cover(max(h.y-.866,h.x*.866+h.y*.5-.866)*side*.49)*fade;
    } else if(uMark==9){
      // LED: a round lamp with a soft halo and a specular glint, separated by an unlit matrix.
      float r=side*.39,d=length(local-c);
      coverage=max(cover(d-r),.3*exp(-pow(max(0.,d-r)/(side*.12),2.)))*fade;
      rgb=mix(rgb,vec3(1.),.35*disc(local,uPitch*vec2(.43,.4),side*.11));
    } else if(uMark==10){
      // CMYK: the cell's hue separated into offset cyan, magenta and yellow dots, each sized by its share of the tone. The
      // key screen carries the neutral share in the ink's own lightness, since a light ink on a dark page has no black.
      float top=max(rgb.r,max(rgb.g,rgb.b)),low=min(rgb.r,min(rgb.g,rgb.b));
      vec3 cmy=(top-rgb)/max(top,.001);
      float a=0.;vec3 col=vec3(1.);
      lay(col,a,vec3(top),disc(local,c,side*.48*sqrt(tone*low/max(top,.001))));
      lay(col,a,vec3(0.,1.,1.),disc(local,uPitch*vec2(.36,.36),side*.48*sqrt(tone*cmy.x)));
      lay(col,a,vec3(1.,0.,1.),disc(local,uPitch*vec2(.64,.36),side*.48*sqrt(tone*cmy.y)));
      lay(col,a,vec3(1.,1.,0.),disc(local,uPitch*vec2(.5,.66),side*.48*sqrt(tone*cmy.z)));
      rgb=col;coverage=a;
    } else if(uMark==11||uMark==16){
      // Stipple and pointillism: four jittered marks a cell, their size following the tone.
      coverage=0.;vec3 col=rgb;
      for(int m=0;m<4;m++){
        vec2 o=vec2(float(m%2),float(m/2));
        float j=hash(cell*2.+o+SEED),jy=hash(cell+o*11.+SEED+1.);
        vec2 at=((o+.5)/2.+(vec2(j,jy)-.5)*ROUGH*.28)*uPitch;
        float r=min(min(min(at.x,uPitch.x-at.x),min(at.y,uPitch.y-at.y)),side*min(.245,.21*sqrt(tone)*(1.-ROUGH*j*.35)));
        float k=uMark==11?disc(local,at,r):ellipse(local,at,vec2(r,r*.64),j*3.14159);
        if(uMark==16&&k>coverage)col=uSourceColor>.5?clamp(rgb+(j-.5)*ROUGH*.25*vec3(1.,-.4,-1.),0.,1.):rgb*(1.+(j-.5)*ROUGH*.5);
        coverage=max(coverage,k);
      }
      rgb=col;
    } else if(uMark==12||uMark==13){
      // Engraving and crosshatch: parallel cuts whose weight follows the tone; crossings join only in the darker tones.
      float cv=tone*(1.-ROUGH*grain*.3),px=uPitch.y,P=uLine.x,W=uLine.y*.72*P;
      coverage=cuts(w,DIR,P,min(.94*P,W*cv),px);
      if(uMark==13){
        coverage=max(coverage,cuts(w,vec2(-DIR.y,DIR.x),P,min(.94*P,W*max(0.,cv*1.5-.3)),px)*step(.2,cv));
        coverage=max(coverage,cuts(w,normalize(DIR+vec2(-DIR.y,DIR.x)),P,min(.94*P,W*max(0.,cv*2.-1.2)),px)*step(.6,cv));
      }
      // Sparkle: now and then a lit cell catches a small bright square, picked afresh a few times a second.
      if(uLine.z>0.&&tone>.2&&hash(cell*1.7+uInlay.z*.53)<uLine.z){float sq=max(1.,floor(side*.3+.5));vec2 lo=floor(c-sq*.5);float k=box(p,lo,lo+sq);coverage=max(coverage,k);rgb=mix(rgb,vec3(1.),k*.6);}
    } else if(uMark==14){
      // Woodblock: broad carved bands in five stepped weights, their edges wavering along the grain.
      float cv=ceil(tone*(1.-ROUGH*grain*.3)*5.)/5.,width=min(.94,.72*cv);
      float proj=dot(vec2(-DIR.y,DIR.x),w),line=floor(proj+.5),along=dot(DIR,w);
      float cut=sin(along*5.3+line*1.9+SEED)*.5+sin(along*13.1+line)*.25;
      coverage=cover((abs(proj-line)-width*.5*(1.+ROUGH*cut*.5))*uPitch.y);
    } else if(uMark==15){
      // Risograph: two offset screens, the main ink and the coral second ink, misregistered along the screen angle.
      float split=uSourceColor>.5?clamp(.5+(rgb.r-rgb.b)*.5,0.,1.):.5,r=side*min(.48,.44*sqrt(tone));
      float a=0.;vec3 col=rgb;
      lay(col,a,rgb,disc(local,c,r*sqrt(.35+(1.-split)*.65)));
      lay(col,a,SECOND,disc(local,c+DIR*.2*.38*side,r*sqrt(.3+split*.7)*(1.-ROUGH*hash(cell+SEED+13.)*.3)));
      rgb=col;coverage=a;
    } else coverage=0.;
  }
  return vec4(rgb*coverage+under.rgb*(1.-coverage),coverage+under.a*(1.-coverage));
}
void main(){
  vec2 frag=vec2(gl_FragCoord.x,uResolution.y-gl_FragCoord.y);
  if(uPost2.y>0.){
    // Curvature: the picture bows outward as on a tube, normalised so its corners stay near the frame; outside it is empty.
    vec2 q=frag/uResolution-.5;
    float k=uPost2.y*.5;
    q=q*(1.+k*dot(q,q)*vec2(1.,1.))/(1.+k*.5);
    frag=(q+.5)*uResolution;
    if(frag.x<0.||frag.y<0.||frag.x>=uResolution.x||frag.y>=uResolution.y){outColor=vec4(0.);return;}
  }
  vec4 c=drawAt(frag);
  if(uPost2.x>0.){
    // Chromatic split: red and blue drawn a little apart, more toward the edges.
    vec2 q=frag/uResolution-.5,d=q*dot(q,q)*uPost2.x*uResolution.y*.08+normalize(q+1e-5)*uPost2.x*1.5;
    vec4 r=drawAt(clamp(frag+d,vec2(0.),uResolution-1.)),b=drawAt(clamp(frag-d,vec2(0.),uResolution-1.));
    c=vec4(r.r,c.g,b.b,max(c.a,max(r.a,b.a)));
  }
  if(uPost.x>0.){
    // Bloom: the cells' light, blurred through its mip chain at two radii, laid over in screen-like fashion.
    vec2 uv=frag/uPitch/vec2(textureSize(uGlow,0));
    float l=log2(max(uPost.y,.5));
    vec3 g=textureLod(uGlow,uv,l).rgb*.55+textureLod(uGlow,uv,l+1.5).rgb*.45;
    vec3 add=g*uPost.x;
    c.rgb=c.rgb+add*(1.-c.rgb*.5);
    c.a=max(c.a,min(1.,max(add.r,max(add.g,add.b))));
  }
  if(uPost.z>0.){
    // Scanlines: two thin dark bands a text row, as on a tube.
    float s=.5-.5*cos(frag.y*6.2831853*uPost2.w/uPitch.y);
    c.rgb*=1.-uPost.z*.45*s;
  }
  if(uPost.w>0.){
    // Film grain, new each frame, in the drawn light only so a transparent ground stays clear.
    float n=hash(floor(frag)+fract(uPost2.z*7.13)*vec2(91.7,37.3))-.5;
    c.rgb=clamp(c.rgb+n*uPost.w*.22*c.a,0.,1.);
  }
  outColor=c;
}`,li=new Map;function Ka(e,n=!1){let t=`${e}${n?"p":""}`,a=li.get(t);return a||(a=Al.replace("uniform int uMark;",`const int uMark=${e};`),n||(a=a.replace("uniform vec4 uPost, uPost2;","const vec4 uPost=vec4(0.), uPost2=vec4(0.,0.,0.,2.);")),li.set(t,a)),a}var un=`#version 300 es
precision highp float;
precision highp sampler2D;
uniform vec2 uTexel;
out vec4 outColor;
vec2 here(){return gl_FragCoord.xy*uTexel;}
`,Fl=un+`
uniform sampler2D uVelocity;
uniform vec2 uFrom, uTo, uForce;
uniform float uAspect, uRadius;
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=here(),scale=vec2(uAspect,1.);
  float d=segment(uv*scale,uFrom*scale,uTo*scale);
  outColor=vec4(texture(uVelocity,uv).xy+uForce*exp(-d*d/(uRadius*uRadius)),0.,1.);
}`,Sl=un+`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).y,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).y;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).x,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(.5*(r-l-t+b),0.,0.,1.);
}`,Ll=un+`
uniform sampler2D uVelocity, uCurl;
uniform float uStrength, uDt;
void main(){
  vec2 uv=here();
  float l=texture(uCurl,uv-vec2(uTexel.x,0.)).x,r=texture(uCurl,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uCurl,uv+vec2(0.,uTexel.y)).x,b=texture(uCurl,uv-vec2(0.,uTexel.y)).x,c=texture(uCurl,uv).x;
  vec2 force=.5*vec2(abs(t)-abs(b),abs(r)-abs(l));
  force=force/(length(force)+1e-4)*uStrength*c;
  force.y=-force.y;
  outColor=vec4(clamp(texture(uVelocity,uv).xy+force*uDt,-1000.,1000.),0.,1.);
}`,_l=un+`
uniform sampler2D uVelocity;
void main(){
  vec2 uv=here(),c=texture(uVelocity,uv).xy;
  float l=texture(uVelocity,uv-vec2(uTexel.x,0.)).x,r=texture(uVelocity,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uVelocity,uv+vec2(0.,uTexel.y)).y,b=texture(uVelocity,uv-vec2(0.,uTexel.y)).y;
  if(uv.x-uTexel.x<0.)l=-c.x;
  if(uv.x+uTexel.x>1.)r=-c.x;
  if(uv.y+uTexel.y>1.)t=-c.y;
  if(uv.y-uTexel.y<0.)b=-c.y;
  outColor=vec4(.5*(r-l+t-b),0.,0.,1.);
}`,Cl=un+`
uniform sampler2D uSource;
uniform float uAmount;
void main(){outColor=vec4(texture(uSource,here()).x*uAmount,0.,0.,1.);}`,Pl=un+`
uniform sampler2D uPressure, uDivergence;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4((l+r+b+t-texture(uDivergence,uv).x)*.25,0.,0.,1.);
}`,Dl=un+`
uniform sampler2D uPressure, uVelocity;
void main(){
  vec2 uv=here();
  float l=texture(uPressure,uv-vec2(uTexel.x,0.)).x,r=texture(uPressure,uv+vec2(uTexel.x,0.)).x;
  float t=texture(uPressure,uv+vec2(0.,uTexel.y)).x,b=texture(uPressure,uv-vec2(0.,uTexel.y)).x;
  outColor=vec4(texture(uVelocity,uv).xy-vec2(r-l,t-b),0.,1.);
}`,Ul=un+`
uniform sampler2D uVelocity;
uniform float uDt, uDissipation;
void main(){
  vec2 uv=here();
  vec2 back=uv-uDt*texture(uVelocity,uv).xy*uTexel;
  outColor=vec4(texture(uVelocity,back).xy/(1.+uDissipation*uDt),0.,1.);
}`;function Ga(e,n,t){let a=0;for(;Math.max(e>>a,n>>a)>t&&e>>a+1>=1&&n>>a+1>=1;)a++;return{level:a,width:Math.max(1,e>>a),height:Math.max(1,n>>a)}}var Li=`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel;
float lum(vec3 c){ return dot(c,vec3(.2126,.7152,.0722)); }
`,Il=`${Li}
uniform ivec2 uSize;
out vec4 o;
void main(){
  int ring=max(1,int(floor(float(min(uSize.x,uSize.y))*.03+.5)));
  float clear=0.,sum=0.,square=0.,count=0.;
  for(int y=0;y<128;y++){
    if(y>=uSize.y)break;
    for(int x=0;x<128;x++){
      if(x>=uSize.x)break;
      vec4 c=texelFetch(uSource,ivec2(x,y),uLevel);
      if(c.a*255.<249.5)clear+=1.;
      if(x>=ring&&y>=ring&&x<uSize.x-ring&&y<uSize.y-ring)continue;
      float l=lum(c.rgb);sum+=l;square+=l*l;count+=1.;
    }
  }
  float ground=sum/max(1.,count);
  o=vec4(clear/float(uSize.x*uSize.y),ground,sqrt(max(0.,square/max(1.,count)-ground*ground)),1.);
}`,Bl=`${Li}
uniform sampler2D uStats;
out vec4 o;
void main(){
  vec4 stats=texelFetch(uStats,ivec2(0),0);
  vec4 c=texelFetch(uSource,ivec2(gl_FragCoord.xy),uLevel);
  if(stats.x>.01){o=vec4(0.,0.,0.,c.a);return;}
  if(stats.z>=.07){o=vec4(1.,0.,0.,1.);return;}
  float t=clamp((abs(lum(c.rgb)-stats.y)-.035)/.12,0.,1.);
  o=vec4(0.,0.,0.,t*t*(3.-2.*t));
}`,Xa=new WeakMap,Un=new Set,si=new Set,ln=0,Qa=0,ci=null,jr=120,_i=new Float64Array(jr),In=0,Ci=(e=In)=>{let n=Math.min(e,In),t=new Array(n);for(let a=0;a<n;a++)t[a]=_i[(ur-n+a)%jr];return t},Pn=0,ur=0,cr=1,Dr=0,ui=0;function Ol(e){ln=0,Pn&&e>Pn&&(_i[ur%jr]=e-Pn,ur++,In<jr&&In++),Pn=e,Qa=performance.now();let n=Un;Un=si,si=n;for(let a of n)try{a(e)}catch(o){typeof console<"u"&&console.error(o)}n.clear(),Vt?.endFrame(e);let t=performance.now()-Qa;if(Dr=.9*Dr+.1*t,e-ui>500){ui=e;let a=Pi(),o=!!Vt?.overloaded;(Dr>.5*a||o)&&cr<3?cr++:Dr<.2*a&&!o&&cr>1&&cr--}Un.size||(Pn=0)}var Nl=()=>cr;function $r(e){Un.add(e),ln&&ci!==requestAnimationFrame&&(ln=0),ln||(ci=requestAnimationFrame,ln=requestAnimationFrame(Ol))}function Yr(e){Un.delete(e),!Un.size&&ln&&(cancelAnimationFrame(ln),ln=0,Pn=0)}var hi=1e3/60,fi=-1/0;function Pi(){if(In<20)return 1e3/60;if(ur-fi<15)return hi;fi=ur;let e=Ci().sort((n,t)=>n-t);return hi=Math.min(1e3/60,Math.max(1e3/360,e[Math.floor(.2*e.length)]))}var hr=new Set,Ja=new Set,Za=new Set,eo=new Set,to=new Set,qa=!1,di=null,Ur=null,Ir=null,nr=null,mi=e=>{let n=null;for(let t of hr){if(t.target===window){(!t.near||t.near()||t.inside)&&t.move(e);continue}n??(n=e.composedPath()),n.includes(t.target)?(t.inside=!0,t.move(e)):t.inside&&(t.inside=!1,t.leave())}},Gl=()=>{for(let e of hr)e.inside=!1,e.leave()},Xl=()=>{for(let e of[...Ja])e()},ql=()=>{for(let e of[...Za])e()},pi=()=>{for(let e of[...eo])e()},Hl=e=>{for(let n of[...to])n(e)};function gi(){let e=hr.size+Ja.size+Za.size+eo.size+to.size>0;if(typeof document>"u"||(di!==document&&(qa=!1,di=document,Ur=Ir=null,nr=null),e===qa))return;qa=e;let n=e?"addEventListener":"removeEventListener";if(typeof window<"u"&&(window[n]?.("pointermove",mi,{capture:!0,passive:!0}),window[n]?.("pointerdown",mi,{capture:!0,passive:!0})),document[n]?.("pointerleave",Gl),document[n]?.("visibilitychange",Xl),(typeof document>"u"?void 0:document.fonts)?.[n]?.("loadingdone",Hl),Ur??(Ur=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null),Ir??(Ir=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null),Ur?.[n]?.("change",ql),Ir?.[n]?.("change",pi),e){nr??(nr=typeof MutationObserver=="function"?new MutationObserver(pi):null);for(let t of[document.documentElement,document.body])t&&nr?.observe(t,{attributes:!0,attributeFilter:["class","data-theme","data-mode","style"]})}else nr?.disconnect()}var Bn=(e,n)=>(e.add(n),gi(),()=>{e.delete(n)&&gi()});function zl(e){let n=e.target;if(typeof window>"u"||n===window||typeof document>"u")return Bn(hr,e);let t=n,a=t.getRootNode?.();if(t.ownerDocument===document&&(!a||a===document))return Bn(hr,e);let o=e.move,i=()=>e.leave();return t.addEventListener("pointermove",o,{passive:!0}),t.addEventListener("pointerdown",o,{passive:!0}),t.addEventListener("pointerleave",i),()=>{t.removeEventListener("pointermove",o),t.removeEventListener("pointerdown",o),t.removeEventListener("pointerleave",i)}}var Di=e=>Bn(Ja,e),Ui=e=>Bn(Za,e),no=e=>Bn(eo,e),rr=new Map,_n=null,Ha=new Map,Ii=e=>n=>{for(let t of n)for(let a of[...e.get(t.target)??[]])a(t)},Bi=(e,n,t)=>{let a=e.get(n);return a?(a.add(t),!1):(e.set(n,new Set([t])),!0)},Oi=(e,n,t)=>{let a=e.get(n);return!(!a?.delete(t)||a.size)&&(e.delete(n),!0)};function Wr(e,n){return typeof ResizeObserver!="function"?()=>{}:(_n??(_n=new ResizeObserver(Ii(rr))),Bi(rr,e,n)?_n.observe(e):queueMicrotask(()=>{rr.get(e)?.has(n)&&n({target:e})}),()=>{Oi(rr,e,n)&&_n?.unobserve(e),rr.size||(_n?.disconnect(),_n=null)})}function Ni(e,n,t){if(typeof IntersectionObserver!="function")return()=>{};let a=Ha.get(n);if(!a){let c=new Map;a={observer:new IntersectionObserver(Ii(c),{rootMargin:n}),watch:c},Ha.set(n,a)}let{observer:o,watch:i}=a;return Bi(i,e,t)||o.unobserve(e),o.observe(e),()=>{Oi(i,e,t)&&o.unobserve(e),i.size||(o.disconnect(),Ha.delete(n))}}var vi=new WeakMap;function Gi(e){let n=vi.get(e);if(n)return n;let t={activeTexture:e.activeTexture.bind(e),bindTexture:e.bindTexture.bind(e),deleteTexture:e.deleteTexture.bind(e),useProgram:e.useProgram.bind(e),deleteProgram:e.deleteProgram.bind(e),bindFramebuffer:e.bindFramebuffer.bind(e),deleteFramebuffer:e.deleteFramebuffer.bind(e),viewport:e.viewport.bind(e),pixelStorei:e.pixelStorei.bind(e)},a=e.TEXTURE0,o=e.TEXTURE_2D,i=e.FRAMEBUFFER,c=[],l,u,m=-1,p="",E=new Map,T=()=>{c.length=0,m=-1,l=void 0,u=void 0,p="",E.clear()},y=e;return y.activeTexture=f=>{let v=f-a;v!==m&&(m=v,t.activeTexture(f))},y.bindTexture=(f,v)=>{if(f===o&&m>=0){if(c[m]===v)return;c[m]=v}else f===o&&(c.length=0);t.bindTexture(f,v)},y.deleteTexture=f=>{for(let v=0;v<c.length;v++)c[v]===f&&(c[v]=void 0);t.deleteTexture(f)},y.useProgram=f=>{f!==l&&(l=f,t.useProgram(f))},y.deleteProgram=f=>{f===l&&(l=void 0),t.deleteProgram(f)},y.bindFramebuffer=(f,v)=>{if(f===i){if(v===u)return;u=v}else u=void 0;t.bindFramebuffer(f,v)},y.deleteFramebuffer=f=>{f===u&&(u=void 0),t.deleteFramebuffer(f)},y.pixelStorei=(f,v)=>{E.get(f)!==v&&(E.set(f,v),t.pixelStorei(f,v))},y.viewport=(f,v,H,r)=>{let V=`${f},${v},${H},${r}`;V!==p&&(p=V,t.viewport(f,v,H,r))},vi.set(e,T),T}var Wl=268435456,Br=[1,.85,.7,.58,.5],Xi=class{constructor(e,n){this.gl=e,this.onChange=n,this.level=0,this.overloaded=!1,this.queries=[],this.open=null,this.drew=!1,this.gpuMs=[],this.cpuMs=[],this.changedAt=0,this.checkedAt=-1/0,this.frameNo=0,this.timer=e.getExtension("EXT_disjoint_timer_query_webgl2")}begin(){if(!this.drew&&(this.drew=!0,this.timer&&!this.open&&this.queries.length<4&&!(7&this.frameNo++))){let e=this.gl.createQuery();e&&(this.gl.beginQuery(this.timer.TIME_ELAPSED_EXT,e),this.open=e)}}end(e,n){let t=this.gl,a=this.timer;if(this.drew&&(this.cpuMs.push(n),this.cpuMs.length>60&&this.cpuMs.shift(),a&&this.open&&(t.endQuery(a.TIME_ELAPSED_EXT),this.queries.push({query:this.open,frame:e}),this.open=null)),this.drew=!1,a&&this.queries.length&&t.getQueryParameter(this.queries[0].query,t.QUERY_RESULT_AVAILABLE)){let o=t.getParameter(a.GPU_DISJOINT_EXT);for(;this.queries.length&&t.getQueryParameter(this.queries[0].query,t.QUERY_RESULT_AVAILABLE);){let{query:i}=this.queries.shift();o||(this.gpuMs.push(t.getQueryParameter(i,t.QUERY_RESULT)/1e6),this.gpuMs.length>60&&this.gpuMs.shift()),t.deleteQuery(i)}}this.adapt(e)}skip(){this.drew=!1}reset(){this.queries=[],this.open=null,this.gpuMs=[],this.cpuMs=[]}adapt(e){if(e-this.checkedAt<250)return;this.checkedAt=e;let n=Pi(),t=this.gpuMs.length>=5&&Math.min(...this.gpuMs.slice(-5))>1.5*n,a=this.gpuMs.length>=10||t?this.gpuMs:null,o;if(a)o=a.slice().sort((c,l)=>c-l)[Math.floor(.75*a.length)]/n;else{if(In<30||this.cpuMs.length<10)return;let c=Ci(30).sort((u,m)=>u-m),l=this.cpuMs.slice().sort((u,m)=>u-m)[this.cpuMs.length>>1];o=c[Math.floor(.75*c.length)]/n>1.6&&l<.5*n?1:.5}if(this.overloaded=o>.8&&this.atMinimum,e-this.changedAt<(o>.8?800:4e3))return;let i=this.level;o>2?i=Br.length-1:o>.8&&i<Br.length-1?i++:o<.3&&i>0&&i--,i!==this.level&&(this.level=i,this.changedAt=e,this.gpuMs=[],this.cpuMs=[],this.onChange())}get scale(){return Br[this.level]}get atMinimum(){return this.level===Br.length-1}},Vl=class{constructor(){this.lost=!1,this.programs=new Map,this.atlases=new Map,this.vertex=null,this.vao=null,this.clients=new Set,this.parallel=null,this.lostTimer=0,this.renderer="",this.forgetState=()=>{},this.onLost=e=>{e.preventDefault(),this.lost=!0,this.forgetState(),this.reset();for(let n of[...this.clients])n.lost();clearTimeout(this.lostTimer),this.lostTimer=setTimeout(()=>{if(this.lost){this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored);try{this.create()}catch{return}this.restored()}},1e3)},this.onRestored=()=>{clearTimeout(this.lostTimer),this.lost=!1,this.forgetState(),this.restored()},this.idleTimer=0,this.create()}create(){let e=null,n=null,t={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"};if(typeof document<"u"&&(e=document.createElement("canvas"),n=e.getContext("webgl2",t)),!n&&typeof OffscreenCanvas=="function")try{e=new OffscreenCanvas(1,1),n=e.getContext("webgl2",t)}catch{n=null}if(!n||!e)throw new Error("WebGL2 is not available for the glyph field.");this.canvas=e,this.gl=n,this.forgetState=Gi(n),this.lost=!1,e.width=e.height=1,this.parallel=n.getExtension("KHR_parallel_shader_compile");let a=this.frames?.level??0;this.frames=new Xi(n,()=>{for(let c of[...this.clients])c.rescale()}),this.frames.level=a;let o=n.getExtension("WEBGL_debug_renderer_info");this.renderer=String(n.getParameter(o?o.UNMASKED_RENDERER_WEBGL:n.RENDERER)??""),e.addEventListener?.("webglcontextlost",this.onLost),e.addEventListener?.("webglcontextrestored",this.onRestored);let i=!n.getExtension("EXT_color_buffer_float")&&!n.getExtension("EXT_color_buffer_half_float");this.program(Si(i)),this.program(Ka(0))}restored(){for(let e of[...this.clients])e.restored()}reset(){this.programs.clear(),this.atlases.clear(),this.vertex=null,this.vao=null,this.frames.reset()}join(e){this.clients.add(e),clearTimeout(this.idleTimer)}leave(e){this.clients.delete(e),this.clients.size?this.fit():(this.lost||(this.canvas.width=this.canvas.height=1,this.frames.level=0),clearTimeout(this.idleTimer),this.idleTimer=setTimeout(()=>{this.clients.size||this.dispose()},3e3))}dispose(){if(clearTimeout(this.lostTimer),this.canvas.removeEventListener?.("webglcontextlost",this.onLost),this.canvas.removeEventListener?.("webglcontextrestored",this.onRestored),!this.lost)try{this.gl.getExtension("WEBGL_lose_context")?.loseContext()}catch{}this.reset(),Vt===this&&(Vt=null)}program(e){let n=this.programs.get(e);if(n)return n;let t=this.gl,a=(l,u)=>{let m=t.createShader(l);return t.shaderSource(m,u),t.compileShader(m),m};this.vertex??(this.vertex=a(t.VERTEX_SHADER,`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`));let o=t.createProgram(),i=a(t.FRAGMENT_SHADER,e);t.attachShader(o,this.vertex),t.attachShader(o,i),t.linkProgram(o);let c={program:o,locations:null,fragment:i};return this.programs.set(e,c),c}linked(e,n=!1){if(e.locations)return!0;let t=this.gl;if(!n&&this.parallel&&!t.getProgramParameter(e.program,this.parallel.COMPLETION_STATUS_KHR))return!1;if(!t.getProgramParameter(e.program,t.LINK_STATUS)){if(t.isContextLost())return!1;throw new Error(e.fragment&&t.getShaderInfoLog(e.fragment)||t.getProgramInfoLog(e.program)||"Glyph field program failed to link.")}let a={};for(let o=t.getProgramParameter(e.program,t.ACTIVE_UNIFORMS)-1;o>=0;o--){let i=t.getActiveUniform(e.program,o).name.replace(/\[0\]$/,"");a[i]=t.getUniformLocation(e.program,i)}return e.locations=a,!0}get canCompileInParallel(){return!!this.parallel}vertexArray(){return this.vao??(this.vao=this.gl.createVertexArray())}atlas(e,n,t){let a=this.atlases.get(e);if(a)a.refs||(this.atlases.delete(e),this.atlases.set(e,a));else{let o=this.gl,i=o.createTexture();o.bindTexture(o.TEXTURE_2D,i);for(let[c,l]of[[o.TEXTURE_MIN_FILTER,o.NEAREST],[o.TEXTURE_MAG_FILTER,o.NEAREST],[o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE],[o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE]])o.texParameteri(o.TEXTURE_2D,c,l);a={key:e,texture:i,refs:0,final:!1,users:new Set,bytes:0},this.atlases.set(e,a),this.paintAtlas(a,n)}return a.refs++,a.users.add(t),a}hasAtlas(e){return this.atlases.has(e)}paintAtlas(e,n){let t=this.gl,{image:a,final:o}=n();t.bindTexture(t.TEXTURE_2D,e.texture),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.texImage2D(t.TEXTURE_2D,0,t.RGBA8,t.RGBA,t.UNSIGNED_BYTE,a),e.bytes=a.width*a.height*4,e.final=o;for(let i of[...e.users])i()}releaseAtlas(e,n){e&&e.users.delete(n)&&(--e.refs>0||this.evictAtlases())}evictAtlases(){let e=[...this.atlases.values()].filter(t=>!t.refs),n=e.length-32;for(let t of e){if(n<=0&&!this.overBudget)break;n--,this.atlases.delete(t.key),this.lost||this.gl.deleteTexture(t.texture)}}fit(){if(this.lost)return;let e=1,n=1;for(let o of this.clients){let[i,c]=o.size();e=Math.max(e,i),n=Math.max(n,c)}let t=this.canvas,a=o=>256*Math.ceil(o/256);t.width*t.height>a(e)*a(n)*2&&(t.width=a(e),t.height=a(n))}get bytes(){let e=this.canvas.width*this.canvas.height*4*2;for(let n of this.clients)e+=n.bytes();for(let n of this.atlases.values())e+=n.bytes;return e}get overBudget(){return this.bytes>Wl}get roomy(){return this.bytes<2281701376e-1}begin(e,n){let t=this.canvas;if(t.width<e||t.height<n){let a=o=>256*Math.ceil(o/256);t.width=Math.max(t.width,a(e)),t.height=Math.max(t.height,a(n))}this.frames.begin()}present(e,n,t){e.globalCompositeOperation="copy",e.imageSmoothingEnabled=!1,e.drawImage(this.canvas,0,this.canvas.height-t,n,t,0,0,n,t)}endFrame(e){this.lost?this.frames.skip():this.frames.end(e,performance.now()-Qa)}get level(){return this.frames.level}get overloaded(){return this.frames.overloaded}get scale(){return this.frames.scale}get atMinimum(){return this.frames.atMinimum}},Vt=null,xi=!1;function ro(){if(Vt||xi)return Vt;try{Vt=new Vl}catch{xi=!0}return Vt}var qi=()=>Vt,Hi=new WeakSet,zi=e=>Hi.has(e),jl=/^[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe30-\ufe4f\uff00-\uff60\uffe0-\uffe6]|^[\u{20000}-\u{3fffd}]/u,Wi=e=>jl.test(e),$l=class{constructor(e,n,t){this.previous=null,this.peak=0,this.width=e,this.height=n,this.span=t??Math.min(e,n);let a=e*n;this.pixels=new Uint8Array(4*a),this.signal=new Float32Array(a),this.offsetX=new Float32Array(a),this.offsetY=new Float32Array(a),this.driftX=new Float32Array(a),this.driftY=new Float32Array(a),this.u=new Float32Array(a),this.v=new Float32Array(a),this.ink=new Float32Array(a),this.a=new Float32Array(a),this.b=new Float32Array(a),this.c=new Float32Array(a),this.pressure=new Float32Array(a),this.pressureNext=new Float32Array(a),this.divergence=new Float32Array(a),this.curl=new Float32Array(a)}get active(){return this.peak>2e-4}clear(){for(let e of[this.u,this.v,this.ink,this.a,this.b,this.c,this.pressure,this.pressureNext,this.divergence,this.curl,this.signal,this.pixels,this.offsetX,this.offsetY,this.driftX,this.driftY])e.fill(0);this.previous=null,this.peak=0}leave(){this.previous=null}move(e,n,t,a=performance.now()){if(!Number.isFinite(e+n+t+a))return;e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n)),t=Math.max(.1,Math.min(1,t));let o=this.previous;if(this.previous={x:e,y:n,time:a},!o)return;let i=(e-o.x)*(this.width-1),c=(n-o.y)*(this.height-1),l=Math.hypot(i,c);if(l<.001)return;let u=this.span,m=a>o.time?Math.max(1/240,(a-o.time)/1e3):1/60,p=Math.min(12,l/u/m),E=1-Math.exp(-p/2.2),T=u*(.022+.075*t)*(.65+.95*E),y=Math.min(128,Math.max(1,Math.ceil(l/(.4*T)))),f=l/T*(.32+.22*E)/y,v=i/l,H=c/l,r=-H,V=v,xe=l*(2+18*E)/y;for(let A=0;A<y;A++){let O=(A+.5)/y,he=(o.x+(e-o.x)*O)*(this.width-1),we=(o.y+(n-o.y)*O)*(this.height-1),Be=Math.max(1,Math.floor(he-3*T)),me=Math.min(this.width-2,Math.ceil(he+3*T)),P=Math.max(1,Math.floor(we-3*T)),be=Math.min(this.height-2,Math.ceil(we+3*T));for(let ue=P;ue<=be;ue++)for(let C=Be;C<=me;C++){let D=((C-he)*v+(ue-we)*H)/T,J=((C-he)*r+(ue-we)*V)/T,Le=Math.exp(-D*D*.65-J*J*1.7),pe=ue*this.width+C;this.ink[pe]=1-(1-this.ink[pe])*Math.exp(-Le*f);let Ae=1-J*J*.55,Fe=D*J*.7;this.u[pe]=Math.max(-80,Math.min(80,this.u[pe]+(v*Ae+r*Fe)*Le*xe)),this.v[pe]=Math.max(-80,Math.min(80,this.v[pe]+(H*Ae+V*Fe)*Le*xe))}}this.peak=1}read(e,n,t){let a=0|(n=Math.max(.5,Math.min(this.width-1.5,n))),o=0|(t=Math.max(.5,Math.min(this.height-1.5,t))),i=n-a,c=t-o,l=o*this.width+a;return(e[l]*(1-i)+e[l+1]*i)*(1-c)+(e[l+this.width]*(1-i)+e[l+this.width+1]*i)*c}sample(e,n){return this.read(this.signal,e*(this.width-1),n*(this.height-1))}displacement(e,n,t){t[0]=this.read(this.offsetX,e*(this.width-1),n*(this.height-1)),t[1]=this.read(this.offsetY,e*(this.width-1),n*(this.height-1))}step(e){if(!this.active||!Number.isFinite(e))return;let n=Math.max(0,Math.min(.05,e)),t=this.width,a=this.height;for(;n>1e-7;){let o=Math.min(.016666666666666666,n);n-=o;let i=Math.exp(-1.9*o),c=Math.exp(-3.2*o);for(let u=1;u<a-1;u++)for(let m=1;m<t-1;m++){let p=u*t+m,E=Math.max(.5,Math.min(t-1.5,m-this.u[p]*o)),T=Math.max(.5,Math.min(a-1.5,u-this.v[p]*o)),y=0|E,f=0|T,v=E-y,H=T-f,r=f*t+y,V=(1-v)*(1-H),xe=v*(1-H),A=(1-v)*H,O=v*H;this.a[p]=(this.u[r]*V+this.u[r+1]*xe+this.u[r+t]*A+this.u[r+t+1]*O)*i,this.b[p]=(this.v[r]*V+this.v[r+1]*xe+this.v[r+t]*A+this.v[r+t+1]*O)*i,this.c[p]=(this.ink[r]*V+this.ink[r+1]*xe+this.ink[r+t]*A+this.ink[r+t+1]*O)*c}[this.u,this.a]=[this.a,this.u],[this.v,this.b]=[this.b,this.v],[this.ink,this.c]=[this.c,this.ink];for(let u=1;u<a-1;u++)for(let m=1;m<t-1;m++){let p=u*t+m;this.curl[p]=.5*(this.v[p+1]-this.v[p-1]-this.u[p+t]+this.u[p-t])}for(let u=1;u<a-1;u++)for(let m=1;m<t-1;m++){let p=u*t+m,E=Math.abs(this.curl[p+1])-Math.abs(this.curl[p-1]),T=Math.abs(this.curl[p+t])-Math.abs(this.curl[p-t]),y=Math.hypot(E,T)+1e-4,f=this.curl[p]*o*10,v=Math.hypot(this.u[p],this.v[p]);this.u[p]+=T/y*f,this.v[p]-=E/y*f;let H=Math.min(1,v/(Math.hypot(this.u[p],this.v[p])+1e-6));this.u[p]*=H,this.v[p]*=H,this.divergence[p]=-.5*(this.u[p+1]-this.u[p-1]+this.v[p+t]-this.v[p-t])}this.pressure.fill(0);for(let u=0;u<4;u++){for(let m=1;m<a-1;m++)for(let p=1;p<t-1;p++){let E=m*t+p;this.pressureNext[E]=.25*(this.divergence[E]+this.pressure[E-1]+this.pressure[E+1]+this.pressure[E-t]+this.pressure[E+t])}[this.pressure,this.pressureNext]=[this.pressureNext,this.pressure]}let l=0;for(let u=1;u<a-1;u++)for(let m=1;m<t-1;m++){let p=u*t+m;this.u[p]=Math.max(-80,Math.min(80,this.u[p]-.5*(this.pressure[p+1]-this.pressure[p-1]))),this.v[p]=Math.max(-80,Math.min(80,this.v[p]-.5*(this.pressure[p+t]-this.pressure[p-t]))),this.driftX[p]+=(3.6*this.u[p]-58*this.offsetX[p]-12*this.driftX[p])*o,this.driftY[p]+=(3.6*this.v[p]-58*this.offsetY[p]-12*this.driftY[p])*o,this.offsetX[p]=Math.max(-2,Math.min(2,this.offsetX[p]+this.driftX[p]*o)),this.offsetY[p]=Math.max(-2,Math.min(2,this.offsetY[p]+this.driftY[p]*o)),this.signal[p]=1-Math.exp(.06*-Math.hypot(this.u[p],this.v[p])-.16*this.ink[p]),l=Math.max(l,this.signal[p])}this.peak=l}if(this.active)for(let o=0;o<this.ink.length;o++){let i=Math.round(65535*Math.min(1,this.signal[o]));this.pixels[4*o]=i>>>8,this.pixels[4*o+1]=255&i,this.pixels[4*o+2]=Math.round(128+63.5*this.offsetX[o]),this.pixels[4*o+3]=Math.round(128+63.5*this.offsetY[o])}else this.clear()}};function Je(e,n,t,a,o){if(!(o<1))for(let i=0;i<2;i++){for(let c=0;c<a;c++){let l=0,u=c*t;for(let m=-o;m<=o;m++)l+=e[u+Math.max(0,Math.min(t-1,m))];for(let m=0;m<t;m++)n[u+m]=l/(2*o+1),l+=e[u+Math.min(t-1,m+o+1)]-e[u+Math.max(0,m-o)]}for(let c=0;c<t;c++){let l=0;for(let u=-o;u<=o;u++)l+=n[Math.max(0,Math.min(a-1,u))*t+c];for(let u=0;u<a;u++)e[u*t+c]=l/(2*o+1),l+=n[Math.min(a-1,u+o+1)*t+c]-n[Math.max(0,u-o)*t+c]}}}var za=new Float32Array(0);function Vi(e,n,t,a,o){let i=n*t,c=o&&o.width===n&&o.height===t?o:{width:n,height:t,subject:new Float32Array(i),depth:new Float32Array(i),key:"none"},{subject:l,depth:u}=c,m=0;for(let f=0;f<i;f++)e[4*f+3]<250&&m++;let p=f=>(.2126*e[4*f]+.7152*e[4*f+1]+.0722*e[4*f+2])/255,E="none",T=0;if(m>.01*i)E="alpha";else if(a)E="mask";else{let f=0,v=0,H=0,r=Math.max(1,Math.round(.03*Math.min(n,t)));for(let V=0;V<t;V++)for(let xe=0;xe<n;xe++){if(xe>=r&&V>=r&&xe<n-r&&V<t-r)continue;let A=p(V*n+xe);f+=A,v+=A*A,H++}T=f/Math.max(1,H),Math.sqrt(Math.max(0,v/Math.max(1,H)-T*T))<.07&&(E="ground")}for(let f=0;f<i;f++){let v=e[4*f+3]/255,H=p(f),r=1;if(E==="alpha")r=v;else if(E==="ground"){let V=Math.max(0,Math.min(1,(Math.abs(H-T)-.035)/.12));r=V*V*(3-2*V)}l[f]=r*(a?Math.max(0,Math.min(1,a[f])):1),u[f]=H*v}c.key=E,za.length<i&&(za=new Float32Array(i));let y=za;return Je(l,y,n,t,Math.max(1,Math.round(.02*Math.min(n,t)))),Je(u,y,n,t,Math.max(1,Math.round(.035*Math.min(n,t)))),c}var ar=11,wt=e=>Math.max(0,Math.min(1,e)),te=(e,n,t)=>{let a=wt((t-e)/(n-e));return a*a*(3-2*a)};function Lt(e,n,t=256){let a=0;for(let l=0;l<e.length;l++)e[l]>a&&(a=e[l]);if(a<=0)return 0;let o=new Uint32Array(t);for(let l=0;l<e.length;l++)o[Math.min(t-1,Math.floor(Math.max(0,e[l])/a*t))]++;let i=0,c=e.length*n;for(let l=0;l<t;l++)if(i+=o[l],i>=c)return(l+1)/t*a;return a}var Yl=class{constructor(e){this.n=e,this.arrays=[],this.next=0}take(e){this.next===this.arrays.length&&this.arrays.push(new Float32Array(this.n));let n=this.arrays[this.next++];return e?n.set(e):n.fill(0),n}reset(){this.next=0}},Or=null;function wn(e,n,t,a,o){let i=2*o+1;for(let c=0;c<a;c++){let l=c*t,u=0;for(let m=-o;m<=o;m++)u+=e[l+Math.max(0,Math.min(t-1,m))];for(let m=0;m<t;m++)n[l+m]=u/i,u+=e[l+Math.min(t-1,m+o+1)]-e[l+Math.max(0,m-o)]}for(let c=0;c<t;c++){let l=0;for(let u=-o;u<=o;u++)l+=n[Math.max(0,Math.min(a-1,u))*t+c];for(let u=0;u<a;u++)e[u*t+c]=l/i,l+=n[Math.min(a-1,u+o+1)*t+c]-n[Math.max(0,u-o)*t+c]}}function Wa(e,n,t,a,o,i,c){let l=t*a,u=c.take(),m=c.take(n),p=c.take(e),E=c.take(),T=c.take();for(let y=0;y<l;y++)E[y]=n[y]*n[y],T[y]=n[y]*e[y];wn(m,u,t,a,o),wn(p,u,t,a,o),wn(E,u,t,a,o),wn(T,u,t,a,o);for(let y=0;y<l;y++){let f=(T[y]-m[y]*p[y])/(E[y]-m[y]*m[y]+i);E[y]=f,T[y]=p[y]-f*m[y]}wn(E,u,t,a,o),wn(T,u,t,a,o);for(let y=0;y<l;y++)e[y]=E[y]*n[y]+T[y]}function Va(e,n,t,a,o,i=2){for(let c=0;c<i;c++){for(let l=0;l<a;l++)for(let u=0;u<t;u++){let m=l*t+u,p=e[m];u>0&&(p=Math.max(p,Math.min(n[m],e[m-1]*o))),l>0&&(p=Math.max(p,Math.min(n[m],e[m-t]*o),u>0?Math.min(n[m],e[m-t-1]*o):0,u<t-1?Math.min(n[m],e[m-t+1]*o):0)),e[m]=p}for(let l=a-1;l>=0;l--)for(let u=t-1;u>=0;u--){let m=l*t+u,p=e[m];u<t-1&&(p=Math.max(p,Math.min(n[m],e[m+1]*o))),l<a-1&&(p=Math.max(p,Math.min(n[m],e[m+t]*o),u>0?Math.min(n[m],e[m+t-1]*o):0,u<t-1?Math.min(n[m],e[m+t+1]*o):0)),e[m]=p}}}function Nr(e,n,t,a,o){for(let i=0;i<a;i++)for(let c=0;c<t;c++){let l=1;for(let u=Math.max(0,c-o);u<=Math.min(t-1,c+o);u++)l=Math.min(l,e[i*t+u]);n[i*t+c]=l}for(let i=0;i<a;i++)for(let c=0;c<t;c++){let l=1;for(let u=Math.max(0,i-o);u<=Math.min(a-1,i+o);u++)l=Math.min(l,n[u*t+c]);e[i*t+c]=l}}function Kl(e,n,t,a,o){let i=t*a,c=Math.min(t,a),l=o.take(),u=o.take(),m=o.take(),p=o.take(),E=o.take();for(let h=0;h<i;h++){let G=e[4*h+3]/255;E[h]=G,l[h]=n[4*h]/255*G,u[h]=n[4*h+1]/255*G,m[h]=n[4*h+2]/255*G,p[h]=(.299*e[4*h]+.587*e[4*h+1]+.114*e[4*h+2])/255*G}let T=o.take(),y=(h,G)=>{let L=o.take(h);return Je(L,T,t,a,G),L},f=Math.max(2,Math.round(.04*c)),v=Math.max(f+2,Math.round(.12*c)),H=Math.max(2,Math.round(.05*c)),r=y(p,1),V=y(p,f),xe=y(p,v),A=o.take(),O=o.take(),he=o.take(),we=o.take(),Be=o.take();for(let h=0;h<a;h++)for(let G=0;G<t;G++){let L=h*t+G;A[L]=Math.abs(p[L]-r[L]),O[L]=Math.abs(r[L]-V[L]),he[L]=Math.abs(V[L]-xe[L]),we[L]=Math.abs(p[h*t+Math.min(t-1,G+1)]-p[h*t+Math.max(0,G-1)]),Be[L]=Math.abs(p[Math.min(a-1,h+1)*t+G]-p[Math.max(0,h-1)*t+G])}Je(A,T,t,a,H),Je(O,T,t,a,H),Je(he,T,t,a,H),Je(we,T,t,a,2),Je(Be,T,t,a,2);let me=Math.max(.01,Lt(A,.9)+Lt(O,.9)),P=y(l,1),be=y(u,1),ue=y(m,1),C=o.take(),D=o.take(),J=o.take(),Le=0;for(let h=0;h<i;h++){let G=P[h],L=be[h],oe=ue[h],Te=Math.max(G,L,oe),ke=Te-Math.min(G,L,oe);J[h]=Te,D[h]=Te>.001?ke/Te:0,Le+=ke;let Ve=0;ke>1e-4&&(Ve=Te===G?((L-oe)/ke+6)%6:Te===L?(oe-G)/ke+2:(G-L)/ke+4),C[h]=60*Ve}let pe=te(.02,.07,Le/i),Ae=Math.max(2,Math.round(.06*a)),Fe=new Float32Array(a);for(let h=0;h<a;h++){let G=0;for(let L=0;L<t;L++)G+=A[h*t+L]+O[h*t+L];Fe[h]=G/t}let Oe=.5,Ze=0;for(let h=Math.max(Ae,Math.round(.12*a));h<=Math.min(a-Ae,Math.round(.88*a));h++){let G=0,L=0,oe=0,Te=0;for(let se=0;se<t;se++){let Se=0,Me=0,je=0,et=0,tt=0,Ke=0;for(let gt=1;gt<=Ae;gt++){let ut=(h-gt)*t+se,Ut=(h+gt-1)*t+se;Se+=P[ut],Me+=be[ut],je+=ue[ut],et+=P[Ut],tt+=be[Ut],Ke+=ue[Ut]}let Tt=(Math.abs(Se-et)+Math.abs(Me-tt)+Math.abs(je-Ke))/Ae;G+=Tt,L+=Tt>.12?1:0}let ke=Math.max(2,Math.round(.15*a)),Ve=Math.max(0,h-ke),ze=Math.min(a,h+ke);for(let se=Ve;se<h;se++)oe+=Fe[se];for(let se=h;se<ze;se++)Te+=Fe[se];oe/=h-Ve,Te/=ze-h;let X=te(-.05,.3,(Te-oe)/(Te+oe+1e-4)),K=te(.08,.35,G/t)*(L/t)*X;K>Ze&&(Ze=K,Oe=h/a)}let Ge=te(.15,.45,Ze),ve=o.take(),R=o.take(),ne=o.take();for(let h=0;h<i;h++)ve[h]=Math.min(l[h],u[h],m[h]);Nr(ve,T,t,a,1),Je(ve,T,t,a,f);for(let h=0;h<i;h++)R[h]=O[h]+he[h];let Re=0,de=0,Ce=0;for(let h=0;h<i;h++)Re+=P[h],de+=be[h],Ce+=ue[h];Re/=i,de/=i,Ce/=i;let Ne=y(P,f),Xe=y(be,f),$e=y(ue,f),Z=y(P,v),Kt=y(be,v),Qt=y(ue,v);for(let h=0;h<i;h++){let G=Math.hypot(Ne[h]-Re,Xe[h]-de,$e[h]-Ce),L=Math.hypot(Ne[h]-Z[h],Xe[h]-Kt[h],$e[h]-Qt[h]);ne[h]=(G+1.5*L)*(.4+.6*D[h]*pe+.4*(1-pe))}let qe=o.take(),mt=o.take(),Jt=o.take(),He=o.take(),_t=o.take(),At=o.take(),nt=o.take(),Ct=o.take(),Gt=o.take(),Pt=o.take();for(let h=0;h<a;h++)for(let G=0;G<t;G++)Pt[h*t+G]=Math.abs(p[Math.min(a-1,h+1)*t+G]-p[Math.max(0,h-1)*t+G]);Je(Pt,T,t,a,1);for(let h=0;h<a;h++)for(let G=0;G<t;G++){let L=h*t+G,oe=(h+.5)/a,Te=C[L],ke=D[L]*pe,Ve=J[L],ze=A[L]+O[L],X=te(175,200,Te)*(1-te(250,275,Te))*te(.08,.25,ke),K=(1-te(45,65,Te)+te(290,330,Te))*te(.2,.45,ke)*te(.3,.55,Ve),se=(1-te(.15,.35,ke))*te(.45,.7,Ve)*Ge,Se=(1-te(.08,.2,Ve))*Ge,Me=Ge>.3?1-te(Oe,Oe+.1,oe):1-te(.4,.8,oe),je=1-te(.02,.06,ze),et=1-te(.03,.09,ze);mt[L]=Math.max(X*je,.7*Se*(1-te(.008,.025,ze)),K*et*.9)*Me,Jt[L]=Math.max(mt[L],se*je*Me),qe[L]=h===0?mt[L]:0,He[L]=te(150,172,Te)*(1-te(232,250,Te))*te(.25,.45,ke),nt[L]=te(1.3,2.2,(we[L]+.004)/(Be[L]+.004))*te(.35,.55,r[L])*(1-te(.1,.18,D[L]*pe))*te(.025,.07,ze)*te(.025,.045,Pt[L]);let tt=1-te(.18,.4,ke),Ke=te(.55,.8,Ve)*te(.05,.12,ze);_t[L]=Math.max(He[L],.85*tt,.8*Ke)}Va(qe,mt,t,a,.995,1),Va(qe,Jt,t,a,.8,1);let Dt=0;for(let h=0;h<i;h++)Dt+=qe[h];let Xn=Dt>.04*i&&Ge>.3;if(Xn)for(let h=0;h<a;h++)for(let G=0;G<t;G++)He[h*t+G]*=te(Oe,Oe+.05,(h+.5)/a);if(Xn){let h=o.take(),G=o.take(),L=o.take();for(let X=0;X<i;X++)h[X]=.299*Ne[X]+.587*Xe[X]+.114*$e[X];for(let X=0;X<a;X++)for(let K=0;K<t;K++)G[X*t+K]=r[Math.min(a-1,X+1)*t+K]-r[Math.max(0,X-1)*t+K];let oe=new Uint8Array(i);for(let X=1;X<a-1;X++)for(let K=0;K<t;K++){let se=Math.abs(G[X*t+K]),Se=se>.03;for(let Me=-3;Me<=3&&Se;Me++)Me&&X+Me>=0&&X+Me<a&&Math.abs(G[(X+Me)*t+K])>se&&(Se=!1);oe[X*t+K]=Se?1:0}let Te=(X,K,se,Se=!0)=>{let Me=Ne[K]+Xe[K]+$e[K]+.05,je=Ne[se]+Xe[se]+$e[se]+.05,et=Math.abs(Ne[K]/Me-Ne[se]/je)+Math.abs(Xe[K]/Me-Xe[se]/je)+Math.abs($e[K]/Me-$e[se]/je),tt=Math.min(Math.abs(C[K]-C[se]),360-Math.abs(C[K]-C[se])),Ke=Math.max(1-te(.1,.25,et),(1-te(15,35,tt))*te(.15,.3,Math.min(D[K],D[se]))),Tt=Math.max(te(2,3,(Be[K]+.004)/(we[K]+.004))*te(.015,.04,A[K]+O[K])*te(.4,.55,A[K]/(A[K]+O[K]+1e-4)),1-te(.12,.25,h[K]));return Ke*(Se?Tt:1)*(1-te(.82*h[se]+.02,1.02*h[se]+.05,h[K]))},ke=0,Ve=0;for(let X=Math.max(3,Math.round(a*Math.max(.25,Oe)));X<Math.round(.88*a);X++){let K=0;for(let Se=0;Se<t;Se++)(oe[(X-1)*t+Se]||oe[X*t+Se]||oe[(X+1)*t+Se])&&K++;if(K<.5*t)continue;let se=0;for(let Se=X+1;Se<Math.min(a,2*X);Se++)for(let Me=0;Me<t;Me++)se+=Te(X,Se*t+Me,(2*X-Se)*t+Me);se>Ve&&(Ve=se,ke=X)}let ze=te(.05,.1,Ve/i);if(ze>0)for(let X=ke+1;X<Math.min(a,2*ke);X++)for(let K=0;K<t;K++){let se=X*t+K;Ct[se]=Te(ke,se,(2*ke-X)*t+K)*ze,Gt[se]=Te(ke,se,(2*ke-X)*t+K,!1)*ze,L[se]=Ct[se]}Je(L,T,t,a,1);for(let X=0;X<i;X++)Ct[X]=Math.max(Ct[X],L[X]),He[X]=Math.max(He[X],Ct[X])}let yr=y(He,v);for(let h=0;h<i;h++)He[h]*=te(.15,.35,yr[h]);let ua=y(He,f);for(let h=0;h<i;h++){He[h]*=1-.8*mt[h];let G=Math.min(Math.abs(C[h]-200),360-Math.abs(C[h]-200));At[h]=te(.28,.45,D[h]*pe)*te(55,80,G)*(1-te(.3,.6,Gt[h]))}let qn=y(At,f);for(let h=0;h<i;h++)At[h]=Math.max(At[h]*(1-(1-te(.15,.3,qn[h]))*te(.55,.7,J[h])*te(.5,.65,D[h])),1-E[h]),_t[h]=Math.min(Math.max(_t[h],.9*Gt[h]),Math.max(He[h],te(.25,.6,ua[h])))*(1-qe[h])*(1-At[h]);Va(He,_t,t,a,.97);let pt=o.take(nt),Xt=Math.max(2,Math.round(.12*a));for(let h=0;h<t;h++){let G=0;for(let L=-Xt;L<=Xt;L++)G+=nt[Math.max(0,Math.min(a-1,L))*t+h];for(let L=0;L<a;L++)pt[L*t+h]=G/(2*Xt+1),G+=nt[Math.min(a-1,L+Xt+1)*t+h]-nt[Math.max(0,L-Xt)*t+h]}Je(pt,T,t,a,1);for(let h=0;h<i;h++)nt[h]=te(.2,.45,pt[h])*te(.2,.5,nt[h]+.5*pt[h])*(1-qe[h]);Wa(qe,p,t,a,Math.max(2,Math.round(.04*c)),.002,o),Wa(He,p,t,a,Math.max(2,Math.round(.04*c)),.002,o),Wa(nt,p,t,a,Math.max(2,Math.round(.03*c)),.002,o),Je(At,T,t,a,1);for(let h=0;h<i;h++)qe[h]=te(.3,.7,qe[h])*E[h],nt[h]=te(.3,.7,nt[h])*E[h]*(1-qe[h]),He[h]=te(.3,.7,He[h])*(1-qe[h])*(1-nt[h])*(1-te(.15,.4,At[h]));Nr(qe,T,t,a,2),Nr(He,T,t,a,2),Nr(nt,T,t,a,1),Je(qe,T,t,a,1),Je(He,T,t,a,1),Je(nt,T,t,a,1);let hn=1/Math.max(.02,Lt(ne,.97)),_e=1/Math.max(.01,Lt(R,.9)),Et=Lt(ve,.97),lt=Lt(ve,.1),Tn=te(.06,.25,Et-lt),st=o.take();for(let h=0;h<a;h++)for(let G=0;G<t;G++){let L=h*t+G,oe=(G+.5)/t,Te=(h+.5)/a,ke=Math.max(qe[L],He[L]),Ve=A[L]+O[L]+he[L],ze=.6*wt(((A[L]+.6*O[L])/(Ve+.004)-.25)/.55)+.4*wt((A[L]+O[L])/me),X=te(.04,.35,Ve/me)*(1-ke),K=.55*wt((ve[L]-lt)/Math.max(.05,Et-lt))+.25*(1-wt(R[L]*_e))+.2*wt(2*(ue[L]-P[L])+.3)*pe,se=Tn*te(.12,.35,V[L])*(.4+.6*Ge),Se=Ge*(Te<Oe?.45:.45+.55*te(0,1,(Te-Oe)/Math.max(.15,1-Oe)))+(1-Ge)*(.5+.4*(Te-.5)),Me=A[L]/(A[L]+O[L]+1e-4),je=te(.2,.7,(A[L]+O[L])/me)*(.35+.65*Ge)*(1-ke),et=1-wt(1.5*Math.hypot(1.2*(oe-.5),Te-.52)),tt=wt(ne[L]*hn)*(.55+.45*et),Ke=.3*X,Tt=.25*se,gt=.12+.45*Ge,ut=.12*je,Ut=.35*(1-.4*Ge)*(1-ke);st[L]=(Ke*ze+Tt*(1-K)+gt*Se+ut*wt(1.6-1.6*Me)+Ut*tt+.04)/(Ke+Tt+gt+ut+Ut+.08)*(1-.85*qe[L])*(1-.45*He[L]*(1-Ge))}let fn=Vi(e,t,a);if(fn.key!=="none")for(let h=0;h<i;h++)st[h]=.7*fn.subject[h]+.3*st[h];return Je(st,T,t,a,Math.max(1,Math.round(.03*c))),function(h,G,L,oe,Te,ke,Ve,ze,X){let K=Te*ke,se=X.take(),Se=ee=>(wn(ee,se,Te,ke,Ve),ee),Me=(ee,Pe)=>{let ht=X.take();for(let xt=0;xt<K;xt++)ht[xt]=ee[xt]*Pe[xt];return Se(ht)},je=Se(X.take(G)),et=Se(X.take(L)),tt=Se(X.take(oe)),Ke=Se(X.take(h)),Tt=Me(G,G),gt=Me(G,L),ut=Me(G,oe),Ut=Me(L,L),br=Me(L,oe),Mr=Me(oe,oe),Hn=Me(G,h),zn=Me(L,h),Ye=Me(oe,h),It=X.take(),at=X.take(),vt=X.take(),Zt=X.take();for(let ee=0;ee<K;ee++){let Pe=Hn[ee]-je[ee]*Ke[ee],ht=zn[ee]-et[ee]*Ke[ee],xt=Ye[ee]-tt[ee]*Ke[ee],yt=Tt[ee]-je[ee]*je[ee]+ze,kt=gt[ee]-je[ee]*et[ee],ft=ut[ee]-je[ee]*tt[ee],dn=Ut[ee]-et[ee]*et[ee]+ze,en=br[ee]-et[ee]*tt[ee],tn=Mr[ee]-tt[ee]*tt[ee]+ze,Wn=dn*tn-en*en,kn=ft*en-kt*tn,Vn=kt*en-ft*dn,jn=yt*tn-ft*ft,$n=kt*ft-yt*en,wr=yt*dn-kt*kt,Ft=yt*Wn+kt*kn+ft*Vn,mn=Math.abs(Ft)>1e-12?1/Ft:0;It[ee]=(Wn*Pe+kn*ht+Vn*xt)*mn,at[ee]=(kn*Pe+jn*ht+$n*xt)*mn,vt[ee]=(Vn*Pe+$n*ht+wr*xt)*mn,Zt[ee]=Ke[ee]-It[ee]*je[ee]-at[ee]*et[ee]-vt[ee]*tt[ee]}Se(It),Se(at),Se(vt),Se(Zt);for(let ee=0;ee<K;ee++)h[ee]=It[ee]*G[ee]+at[ee]*L[ee]+vt[ee]*oe[ee]+Zt[ee]}(st,P,be,ue,t,a,Math.max(2,Math.round(.07*c)),.004,o),{depth:st,water:He,sky:qe,falls:nt}}function Gr(e,n,t,a,o,i,c){if(n===i&&t===c)return e[o*i+a];let l=Math.max(0,Math.min(n-1,(a+.5)*n/i-.5)),u=Math.max(0,Math.min(t-1,(o+.5)*t/c-.5)),m=Math.min(n-2,Math.floor(l)),p=Math.min(t-2,Math.floor(u)),E=l-m,T=u-p;if(m<0||p<0)return e[Math.round(u)*n+Math.round(l)];let y=p*n+m,f=y+n;return(e[y]*(1-E)+e[y+1]*E)*(1-T)+(e[f]*(1-E)+e[f+1]*E)*T}var Cn=(e,n,t)=>{let a=Math.max(0,Math.min(1,(t-e)/(n-e)));return a*a*(3-2*a)},Ql=class{constructor(e,n){this.base=40,this.mass=0,this.calm=0,this.drift=[0,0],this.fade=3,this.age=0,this.peak=0,this.front=0,this.live=!1,this.bins=new Uint32Array(64),this.spare=new Float32Array(0),this.cols=Math.max(3,0|e),this.rows=Math.max(3,0|n);let t=this.cols*this.rows;this.h=new Float32Array(t),this.p=new Float32Array(t),this.speed=new Float32Array(t).fill(1),this.damp=new Float32Array(t).fill(1),this.wall=new Float32Array(t),this.trace=new Float32Array(t)}clear(){this.h.fill(0),this.p.fill(0),this.trace.fill(0),this.live=!1,this.peak=0}drop(e,n,t=1,a=3){let{cols:o,rows:i,h:c,p:l}=this,u=Math.max(1,a),m=Math.ceil(3*u);for(let p=Math.max(1,Math.floor(n-m));p<Math.min(i-1,Math.ceil(n+m));p++)for(let E=Math.max(1,Math.floor(e-m));E<Math.min(o-1,Math.ceil(e+m));E++){let T=E-e,y=p-n,f=(T*T+y*y)/(u*u),v=t*(1-f)*Math.exp(-f),H=p*o+E;c[H]+=v,l[H]+=v}this.age=0,this.live=!0,this.peak=Math.max(this.peak,t),this.front=Math.max(this.front,t)}step(e,n=1){if(!(this.live&&e>0))return this.live;e=Math.min(.05,e),this.age+=e;let{cols:t,rows:a,speed:o,damp:i,wall:c,trace:l}=this,u=Math.max(0,this.base*n),m=0;for(let P=0;P<o.length;P++)o[P]>m&&(m=o[P]);let p=Math.max(1,Math.min(8,Math.ceil(u*e*Math.sqrt(m)/.6))),E=this.calm,T=e/p,y=u*T*(u*T),f=this.mass*T*T,v=this.h,H=this.p;for(let P=0;P<p;P++){for(let ue=1;ue<a-1;ue++)for(let C=1,D=ue*t+1;C<t-1;C++,D++){let J=v[D],Le=v[D-1]+v[D+1]+v[D-t]+v[D+t]-4*J,pe=l[D],Ae=pe>.02?Math.max(0,1-Math.abs(J)/pe):0,Fe=E*Ae*Ae*T,Oe=1-Math.min(.5,i[D]*T+Fe);H[D]=(J+(J-H[D])*Oe+y*o[D]*Le-f*J)*(1-c[D])*(1-Math.min(.5,.5*Fe))}let be=v;v=H,H=be}this.h=v,this.p=H;let r=this.drift[0]*e,V=this.drift[1]*e;(r||V)&&(this.carry(v,r,V),this.carry(H,r,V));for(let P=0;P<t;P++)v[P]=.5*v[t+P],v[(a-1)*t+P]=.5*v[(a-2)*t+P];for(let P=0;P<a;P++)v[P*t]=.5*v[P*t+1],v[P*t+t-1]=.5*v[P*t+t-2];let xe=Math.exp(-e*this.fade),A=0;for(let P=0;P<v.length;P++){let be=Math.abs(v[P]);be>A&&(A=be);let ue=l[P]*xe;l[P]=be>=ue?be:ue<1e-4?0:ue}this.peak=A;let O=this.bins.fill(0),he=.05*A,we=0;for(let P=0;P<v.length;P++)v[P]>he&&(O[Math.min(63,v[P]/A*64|0)]++,we++);let Be=0,me=63;for(;me>0&&(Be+=O[me],!(Be>=.08*we));me--);return this.front=Math.max(.15*A,(me+1)/64*A),!(A<.004)||(this.clear(),!1)}carry(e,n,t){let{cols:a,rows:o}=this;this.spare.length!==e.length&&(this.spare=new Float32Array(e.length));let i=this.spare;for(let c=0,l=0;c<o;c++){let u=Math.min(o-1.001,Math.max(0,c-t)),m=0|u,p=u-m;for(let E=0;E<a;E++,l++){let T=Math.min(a-1.001,Math.max(0,E-n)),y=0|T,f=T-y,v=m*a+y;i[l]=(e[v]*(1-f)+e[v+1]*f)*(1-p)+(e[v+a]*(1-f)+e[v+a+1]*f)*p}}e.set(i)}slope(e,n){let{h:t,cols:a}=this,o=t.length;return n[0]=.5*(t[Math.min(o-1,e+1)]-t[Math.max(0,e-1)]),n[1]=.5*(t[Math.min(o-1,e+a)]-t[Math.max(0,e-a)]),n}};function yi(e,n,t,a){let o=new Float32Array(e.length);for(let i=0;i<2;i++){let c=i?o:e,l=i?e:o;for(let u=0;u<t;u++)for(let m=0;m<n;m++){let p=0,E=0;for(let T=-a;T<=a;T++){let y=i?m:m+T,f=i?u+T:u;y<0||f<0||y>=n||f>=t||(p+=c[f*n+y],E++)}l[u*n+m]=p/E}}}var Xr,Jl=["none","flow","orb","drift","swell","caustics","contour","aurora","ripple","halo","interference","mesh","cascade","constellation"],Dn=["glyph","dot","pixel","mosaic","lego","voxel","disco","dither","hex","led","cmyk","stipple","engraving","crosshatch","woodblock","risograph","pointillism","inlay","tick","bayer"],Zl=[{value:"fluid",label:"Fluid",description:"An ink-in-water wake that bends the image and swirls the characters."},{value:"lantern",label:"Lantern",description:"A soft light follows the pointer and lifts the characters it passes, without distortion."},{value:"trail",label:"Trail",description:"The Asciify Trail: in the wake, sparse characters fill in and dense ones open up, then settle. No distortion."},{value:"loupe",label:"Loupe",description:"A glass loupe glides after the pointer and magnifies the characters it covers."},{value:"reveal",label:"Reveal",description:"Under a soft spotlight the characters take the source image's own colours. Best over a photo or video in one ink."},{value:"none",label:"Off",description:"The field stays still under the pointer."}],es={radius:.13,strength:.5,trail:.45,follow:12},ts={bloom:0,bloomRadius:2,scanlines:0,grain:0,chroma:0,curvature:0},ns={strength:.55,radius:.45},Wt={radius:.075,force:1,dissipation:1.6,refraction:.03,glow:.55,resolution:128,curl:24},rs={charset:" .,:-=+*#%@",cellSize:12,cellAspect:1,cellFit:"pixel",font:'ui-monospace, "SF Mono", Menlo, Consolas, monospace',fontWeight:500,glyphScale:.8,mark:"glyph",dotScale:.9,markAngle:-35,accents:0,shuffle:0,sample:"area",linePitch:.5,lineWeight:1,sparkle:0,textRepeat:"flow",glyphOrder:"tone",color:"ink",ink:"#f3ba32",highlight:"auto",background:"transparent",brightness:0,contrast:1,gamma:1,invert:!1,levels:"auto",blend:"auto",saturation:1.1,ramp:[],shade:.5,backdrop:0,fit:"cover",focus:{x:.5,y:.5},vignette:0,drift:0,scene:"flow",scale:1,clear:!1,speed:1,hover:"fluid",fluid:Wt,lantern:es,trail:ns,post:ts,scope:"all",tap:"surface",maxPixelRatio:2,respectReducedMotion:!0},ce=(e,n,t,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(t,Math.max(n,e)):a,Vr=(e,n)=>typeof e=="string"&&/^#([\da-f]{3}|[\da-f]{6})$/i.test(e.trim())?e.trim().toLowerCase():n,bi=/^[\u0020-\u007e\u00a0-\u02ff\u0370-\u0482\u048a-\u052f\u2010-\u20cf\u2100-\u2bff]*$/;function sn(e){return ao(e).slice()}var or=new Map;function ao(e){let n=or.get(e);if(n)return n;let t=function(a){if(!bi.test(a)&&Xr===void 0){let i=Intl.Segmenter;Xr=i?new i(void 0,{granularity:"grapheme"}):null}return(Xr&&!bi.test(a)?Array.from(Xr.segment(a),i=>i.segment):Array.from(a)).filter(i=>i!==`
`&&i!=="\r"&&i!=="	").slice(0,256)}(e);return or.size>=32&&or.delete(or.keys().next().value),or.set(e,t),t}function as(e){let n=sn(e).filter(t=>t.trim());return n.length>0&&2*n.filter(Wi).length>n.length}var os=(e,n,t)=>{let a=Dn.includes(e)?e:n;return(a==="glyph"||a==="inlay")&&as(t)},is=(e,n)=>{if(!Array.isArray(e))return n;let t=e.map(a=>Vr(a,"")).filter(Boolean).slice(0,6);return t.length>=2?t:[]};function fr(e={},n=rs){let t=typeof e.charset=="string"&&sn(e.charset).length>=2?e.charset:n.charset,a=n.fluid||Wt,o=e.fluid===void 0?n.fluid:e.fluid,i=o!==!1&&(()=>{let E=o!==!0&&o?{...a,...o}:a;return{radius:ce(E.radius,.005,.5,Wt.radius),force:ce(E.force,0,8,Wt.force),dissipation:ce(E.dissipation,.05,20,Wt.dissipation),refraction:ce(E.refraction,0,.5,Wt.refraction),glow:ce(E.glow,0,2,Wt.glow),resolution:Math.round(ce(E.resolution,16,512,Wt.resolution)),curl:ce(E.curl,0,80,Wt.curl)}})(),c=Jl.includes(e.scene)?e.scene:n.scene,l=!!e.clear&&typeof e.clear=="object"&&("element"in e.clear||"nodeType"in e.clear||"rects"in e.clear),u=e.clear===void 0||l?n.clear:e.clear,m=!!u&&{x:ce(u.x,-.5,1.5,.25),y:ce(u.y,-.5,1.5,.3),width:ce(u.width,0,2,.5),height:ce(u.height,0,2,.4),feather:ce(u.feather,.005,1,.12),shape:u.shape==="rect"?"rect":"ellipse",pointer:ce(u.pointer,0,1,0)};return{charset:t,cellSize:ce(e.cellSize,1,96,n.cellSize),cellAspect:os(e.mark,n.mark,t)?Math.max(1,ce(e.cellAspect,.3,2,n.cellAspect)):ce(e.cellAspect,.3,2,n.cellAspect),cellFit:e.cellFit==="fill"||e.cellFit==="pixel"?e.cellFit:n.cellFit,font:typeof e.font=="string"&&e.font.trim()?e.font:n.font,fontWeight:Math.round(ce(e.fontWeight,100,900,n.fontWeight)),glyphScale:ce(e.glyphScale,.3,1.6,n.glyphScale),mark:Dn.includes(e.mark)?e.mark:n.mark,dotScale:ce(e.dotScale,.1,1.4,n.dotScale),markAngle:ce(e.markAngle,-360,360,n.markAngle),accents:ce(e.accents,0,.3,n.accents),shuffle:ce(e.shuffle,0,4,n.shuffle),sample:e.sample==="point"||e.sample==="area"||e.sample==="shape"?e.sample:n.sample,linePitch:ce(e.linePitch,.2,4,n.linePitch),lineWeight:ce(e.lineWeight,.2,3,n.lineWeight),sparkle:ce(e.sparkle,0,.05,n.sparkle),textRepeat:e.textRepeat==="row"||e.textRepeat==="flow"?e.textRepeat:n.textRepeat,glyphOrder:e.glyphOrder==="text"||e.glyphOrder==="tone"||e.glyphOrder==="scatter"?e.glyphOrder:n.glyphOrder,color:e.color==="source"||e.color==="ink"?e.color:n.color,ink:Vr(e.ink,n.ink),highlight:e.highlight==="auto"?"auto":Vr(e.highlight,n.highlight),ramp:is(e.ramp,n.ramp),background:e.background==="transparent"?"transparent":Vr(e.background,n.background),brightness:ce(e.brightness,-1,1,n.brightness),contrast:ce(e.contrast,0,4,n.contrast),gamma:ce(e.gamma,.2,5,n.gamma),invert:typeof e.invert=="boolean"?e.invert:n.invert,levels:e.levels==="none"||e.levels==="auto"?e.levels:n.levels,blend:e.blend==="auto"||e.blend==="coarse"||e.blend==="on"||e.blend==="off"?e.blend:n.blend,saturation:ce(e.saturation,0,3,n.saturation),shade:ce(e.shade,0,1,n.shade),backdrop:ce(e.backdrop,0,1,n.backdrop),fit:e.fit==="contain"||e.fit==="cover"?e.fit:n.fit,focus:{x:ce(e.focus?.x,0,1,n.focus.x),y:ce(e.focus?.y,0,1,n.focus.y)},vignette:ce(e.vignette,0,1,n.vignette),drift:ce(e.drift,0,2,n.drift),scene:c,scale:ce(e.scale,.2,6,n.scale),clear:m,speed:ce(e.speed,0,5,n.speed),hover:Zl.some(E=>E.value===e.hover)?e.hover:n.hover,fluid:i,lantern:{radius:ce(e.lantern?.radius,.02,.6,n.lantern.radius),strength:ce(e.lantern?.strength,0,1.5,n.lantern.strength),trail:ce(e.lantern?.trail,0,3,n.lantern.trail),follow:ce(e.lantern?.follow,1,60,n.lantern.follow)},trail:{strength:ce(e.trail?.strength,0,1,n.trail.strength),radius:ce(e.trail?.radius,.1,1,n.trail.radius)},post:{bloom:ce(e.post?.bloom,0,2,n.post.bloom),bloomRadius:ce(e.post?.bloomRadius,.5,8,n.post.bloomRadius),scanlines:ce(e.post?.scanlines,0,1,n.post.scanlines),grain:ce(e.post?.grain,0,1,n.post.grain),chroma:ce(e.post?.chroma,0,1,n.post.chroma),curvature:ce(e.post?.curvature,0,1,n.post.curvature)},scope:e.scope===void 0?n.scope:(p=e.scope,p==="subject"||p==="outside"?p:"all"),tap:e.tap==="ring"||e.tap==="none"||e.tap==="surface"?e.tap:n.tap,maxPixelRatio:ce(e.maxPixelRatio,.5,4,n.maxPixelRatio),respectReducedMotion:typeof e.respectReducedMotion=="boolean"?e.respectReducedMotion:n.respectReducedMotion};var p}function Mi(e,n,t,a,o,i={x:.5,y:.5}){if(!(e>0&&n>0&&t>0&&a>0))return{scale:[1,1],offset:[0,0]};let c=e/n,l=t/a,u=l>c,m=o==="cover"?u?[c/l,1]:[1,l/c]:u?[1,l/c]:[c/l,1];return{scale:m,offset:o==="cover"?[(1-m[0])*i.x,(1-m[1])*i.y]:[.5*(1-m[0]),.5*(1-m[1])]}}function Kr(e,n,t,a){let o=Math.max(2,Math.round(e*t)),i=Math.max(2,Math.round(o*n)),c=Math.min(16,Math.max(1,a)),l=Math.ceil(a/c);return{width:i,height:o,columns:c,rows:l,atlasWidth:c*i,atlasHeight:l*o}}function qr(e){let n=e.replace("#",""),t=n.length===3?n.split("").map(o=>o+o).join(""):n,a=Number.parseInt(t,16);return Number.isFinite(a)&&t.length===6?[(a>>16&255)/255,(a>>8&255)/255,(255&a)/255]:[0,0,0]}function wi(e){let n=new Uint32Array(256),t=0;for(let c=0;c+3<e.length;c+=4)e[c+3]<8||(n[Math.round(.2126*e[c]+.7152*e[c+1]+.0722*e[c+2])]++,t++);if(!t)return[0,1];let a=c=>{let l=0;for(let u=0;u<256;u++)if(l+=n[u],l>=t*c)return u/255;return 1},o=a(.02),i=a(.98);return i-o<.08?[0,1]:[o,i]}var ir=e=>e.hover!=="fluid"||e.fluid?e.hover:"none";function ls(e,n,t=24,a=.12,o="ellipse"){return e.width>0&&e.height>0&&{x:(n.left-t-e.left)/e.width,y:(n.top-t-e.top)/e.height,width:(n.width+2*t)/e.width,height:(n.height+2*t)/e.height,feather:a,shape:o}}var Mn,ss=/\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i,Ei=/swiftshader|llvmpipe|softpipe|software|basic render/i;function cs(){if(Mn)return Mn;if(typeof document>"u"||globalThis.WebGL2RenderingContext===void 0)return Mn="none";try{let e=ro();if(e)return Mn=Ei.test(e.renderer)?"software":"gpu";let n=document.createElement("canvas").getContext("webgl2");if(!n)return Mn="none";let t=n.getExtension("WEBGL_debug_renderer_info"),a=String(n.getParameter(t?t.UNMASKED_RENDERER_WEBGL:n.RENDERER)??"");return n.getExtension("WEBGL_lose_context")?.loseContext(),Mn=Ei.test(a)?"software":"gpu"}catch{return Mn="none"}}var Ti=new WeakMap;function cn(e,n){let t=Ti.get(e);t&&t.length===n.length||Ti.set(e,t=new Float64Array(n.length).fill(NaN));let a=!1;for(let o=0;o<n.length;o++)t[o]!==n[o]&&(a=!0,t[o]=n[o]);return a}var us=[new Float64Array(1),new Float64Array(2),new Float64Array(3),new Float64Array(4)],dr=(e,n,t,a)=>{let o=a!==void 0?4:t!==void 0?3:n!==void 0?2:1,i=us[o-1];return i[0]=e,o>1&&(i[1]=n),o>2&&(i[2]=t),o>3&&(i[3]=a),i},le=(e,n,t)=>{n&&cn(n,dr(t))&&e.uniform1f(n,t)},it=(e,n,t)=>{n&&cn(n,dr(t))&&e.uniform1i(n,t)},Mt=(e,n,t,a)=>{n&&cn(n,dr(t,a))&&e.uniform2f(n,t,a)},on=(e,n,t,a,o,i)=>{n&&cn(n,dr(t,a,o,i))&&e.uniform4f(n,t,a,o,i)},lr=(e,n,t)=>{n&&cn(n,t)&&e.uniform3fv(n,t)},ja=(e,n,t)=>{n&&cn(n,t)&&e.uniform4fv(n,t)},$a=0,Hr={alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance"},oo=(e,n)=>`${e.fontWeight} ${Math.max(1,n.height*e.glyphScale)}px ${e.font}`,ji=(e,n)=>`${ao(e.charset).join("")}\0${oo(e,n)}\0${n.width}x${n.height}x${n.columns}`;function $i(e,n,t,a){let o=Math.min(globalThis.devicePixelRatio||1,e.maxPixelRatio,Math.sqrt(8294400/Math.max(1,n*t)));return a<1&&o>1?Math.max(1,o*a):o}var hs=(e,n,t)=>Qr(e,n,t),fs=e=>Yi(e);function Qr(e,n,t){let a=sn(e.charset),o=document.createElement("canvas");o.width=n.atlasWidth,o.height=n.atlasHeight;let i=o.getContext("2d");i.fillStyle="#fff",i.textAlign="center",i.textBaseline="alphabetic";let c=oo(e,n),l=Math.max(1,n.height*e.glyphScale),u=`${e.fontWeight} ${l}px "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", YuGothic, "Noto Sans JP", "Noto Sans CJK JP", Meiryo, sans-serif, ${e.font}`;i.font=c;let m=i.measureText("M"),p=m.actualBoundingBoxAscent||n.height*e.glyphScale*.7,E=m.actualBoundingBoxDescent||0,T=(n.height+p-E)/2;a.forEach((v,H)=>{let r=H%n.columns*n.width+n.width/2,V=Math.floor(H/n.columns)*n.height+T,xe=Wi(v);if(i.save(),i.beginPath(),i.rect(r-n.width/2,V-T,n.width,n.height),i.clip(),xe){i.font=u;let A=i.measureText(v),O=Math.max(A.width,(A.actualBoundingBoxLeft||0)+(A.actualBoundingBoxRight||0)),he=(A.actualBoundingBoxAscent||.88*l)+(A.actualBoundingBoxDescent||.12*l),we=Math.min(1,.94*n.width/Math.max(1,O),.94*n.height/Math.max(1,he));i.translate(r,Math.floor(H/n.columns)*n.height+n.height/2),i.scale(we,we),i.translate(((A.actualBoundingBoxLeft||0)-(A.actualBoundingBoxRight||0))/2,((A.actualBoundingBoxAscent||.88*l)-(A.actualBoundingBoxDescent||.12*l))/2),i.fillText(v,0,0),i.font=c}else{let A=i.measureText(v).width;i.translate(r,V),A>.96*n.width&&i.scale(.96*n.width/A,1),i.fillText(v,0,0)}i.restore()});let y=!0,f=document.fonts;try{y=!f?.check||f.check(c,a.join(""))}catch{}return t&&queueMicrotask(()=>{o.width=o.height=1}),{image:o,final:y}}function Yi(e){let n=sn(e.charset),t=new Uint8Array(16*n.length),a=Kr(60,e.cellAspect,1,n.length);try{let{image:o}=Qr(e,a,!1),i=o,c=i.width,l=i.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,i.width,i.height).data;i.width=i.height=1,n.forEach((u,m)=>{let p=m%a.columns*a.width,E=Math.floor(m/a.columns)*a.height,T=new Float64Array(15),y=new Float64Array(15),f=0;for(let v=0;v<a.height;v++)for(let H=0;H<a.width;H++){let r=l[4*((E+v)*c+p+H)+3]/255,V=3*Math.min(4,Math.floor(5*v/a.height))+Math.min(2,Math.floor(3*H/a.width));T[V]+=r,y[V]++,f+=r}for(let v=0;v<15;v++)t[16*m+v]=Math.round(255*T[v]/Math.max(1,y[v]));t[16*m+15]=Math.round(255*f/(a.width*a.height))})}catch{}return t}var ki=()=>{};function Ki(e,n={}){if(typeof document>"u"||e.ownerDocument!==document)return!1;let t=e.clientWidth,a=e.clientHeight;if(!t||!a)return!1;let o=ro();if(!o||o.lost)return!1;let{clear:i,source:c,interactionTarget:l,onError:u,label:m,...p}=n,E=fr(p),T=Kr(E.cellSize,E.cellAspect,$i(E,t,a,o.scale),sn(E.charset).length),y=ji(E,T);if(o.hasAtlas(y))return!1;try{o.releaseAtlas(o.atlas(y,()=>Qr(E,T,!0),ki),ki)}catch{return!1}return!0}function Jr(e={}){let n=cs();return n==="gpu"||n==="software"&&!!e.allowSoftware}function Qi(e,n={}){let t=s=>typeof HTMLElement<"u"&&s instanceof HTMLElement,a=s=>{let g=s.clear;return o(g)?{element:null,rest:{...s,clear:!1}}:t(g)?{element:{element:g},rest:{...s,clear:void 0}}:g&&typeof g=="object"&&t(g.element)?{element:g,rest:{...s,clear:void 0}}:{element:null,rest:s}},o=s=>!!s&&typeof s=="object"&&"rects"in s,i=a(n).element,c=o(n.clear)?n.clear:null,l=fr(a(n).rest),u=n.onError,m=e.ownerDocument,p=!m||typeof document>"u"||m===document,E=n.context??"auto",T=!p||E==="own"||E==="auto"&&$a<2&&(()=>{let s=e.clientWidth||0,g=e.clientHeight||0,x=Math.min(globalThis.devicePixelRatio||1,l.maxPixelRatio);return s*g*x*x})()>=921600?e.getContext("webgl2",Hr):null,y=!T&&p?ro():null,f=y?e.getContext("2d",{alpha:!0}):null,v=!(!y||!f),H=v?y.gl:T??e.getContext("webgl2",Hr);if(!H)throw new Error("WebGL2 is not available for the glyph field.");let r=H;v||$a++;let V=Gi(r),xe=v?null:r.getContextAttributes(),A=!!xe&&Object.keys(Hr).every(s=>xe[s]===Hr[s]),O=v?null:new Xi(r,()=>{yn()&&Ie()}),he=()=>v?y.frames:O;v&&(s=>{Hi.add(s)})(e),e.setAttribute("role","img"),e.setAttribute("aria-label",n.label??"ASCII artwork"),e.dataset.renderer="glyph-field";let we=!1,Be=v?null:r.getExtension("KHR_parallel_shader_compile"),me,P,be=null,ue=null,C=null,D=null,J=null,Le=[],pe=[],Ae=null,Fe=!1,Oe=null,Ze=null,Ge=[],ve=0,R=0,ne=1,Re=0,de=Kr(l.cellSize,l.cellAspect,1,2),Ce=2,Ne=0,Xe=0,$e=0,Z=null,Kt=!1,Qt=null,qe=0,mt=0,Jt=0,He=null,_t=0,At=0,nt=0,Ct=!0,Gt=0,Pt=[0,1],Dt=-1/0,Xn=-1/0,yr=!1,ua=(()=>{let s=typeof navigator>"u"?void 0:navigator;return 1e3/(s&&(s.hardwareConcurrency>0&&s.hardwareConcurrency<=2||s.deviceMemory&&s.deviceMemory<=2||s.connection?.saveData)?30:60)-2})(),qn=new Float32Array(16),pt=!1,Xt=0,hn=0,_e=!0,Et=!1,lt=!1,Tn=!1,st=!1,fn=!0,h=(n.effects??[]).slice(0,4),G=!!n.live,L=[],oe={target:null,at:[-1,-1],presence:0,data:new Float32Array(32)},Te=null,ke=null,Ve=1/60,ze=0,X=0,K=[],se=new Float32Array(16),Se=()=>{if(!i)return;let{element:s,padding:g=32,feather:x=.16,shape:b="rect",pointer:M=0}=i,F=ls(e.getBoundingClientRect(),s.getBoundingClientRect(),g,x,b),d=F&&M>0?{...F,pointer:Math.min(1,Math.max(0,M))}:F,w=l.clear;JSON.stringify(w)!==JSON.stringify(d)&&(l={...l,clear:d},_e=!0)},Me=null,je=new Uint8Array(0),et=0,tt=0,Ke=!1,Tt=null,gt=new Float64Array(0),ut=!0,Ut=()=>{if(!c)return void(Ke&&(Ke=!1,_e=!0));let s=c.rects,g=typeof s=="function"?s():s;if(g===Tt&&!ut)return;Tt=g;let x=e.getBoundingClientRect(),[b,M]=function(w,_,W=256){let U=Math.min(.16666666666666666,W/Math.max(1,w,_));return[Math.max(2,Math.round(w*U)),Math.max(2,Math.round(_*U))]}(x.width,x.height),F=new Float64Array(4*g.length+6);F[0]=x.left,F[1]=x.top,F[2]=x.width,F[3]=x.height,F[4]=c.padding??8,F[5]=c.softness??28,g.forEach((w,_)=>{F[6+4*_]=w.left,F[7+4*_]=w.top,F[8+4*_]=w.width,F[9+4*_]=w.height});let d=!ut&&F.length===gt.length&&F.every((w,_)=>w===gt[_]);ut=!1,d&&Ke||(gt=F,je=function(w,_,W,U,k=8,I=28,z=new Uint8Array(W*U)){let q=W*U;if(z.length!==q&&(z=new Uint8Array(q)),z.fill(0),!(_.width>0&&_.height>0&&w.length))return z;let ie=W/_.width,re=U/_.height,Ee=Math.max(0,Math.round(I/2.56*ie)),B=k+.5*I;for(let N of w){if(!(N.width>0&&N.height>0))continue;let j=Math.max(0,Math.round((N.left-B-_.left)*ie)),fe=Math.min(W,Math.round((N.left+N.width+B-_.left)*ie)),ae=Math.max(0,Math.round((N.top-B-_.top)*re)),Q=Math.min(U,Math.round((N.top+N.height+B-_.top)*re));for(let ye=ae;ye<Q;ye++)z.fill(255,(U-1-ye)*W+j,(U-1-ye)*W+Math.max(j,fe))}if(!Ee)return z;let $=new Float32Array(Math.max(W,U)),S=new Float32Array(Math.max(W,U)+1),Y=(N,j,fe)=>{for(let ae=0;ae<3;ae++){for(let Q=0;Q<N;Q++)$[Q]=z[fe+Q*j];S[0]=0;for(let Q=0;Q<N;Q++)S[Q+1]=S[Q]+$[Q];for(let Q=0;Q<N;Q++){let ye=Math.max(0,Q-Ee),Ue=Math.min(N,Q+Ee+1);z[fe+Q*j]=Math.round((S[Ue]-S[ye])/(Ue-ye))}}};for(let N=0;N<U;N++)Y(W,1,N*W);for(let N=0;N<W;N++)Y(U,W,N);return z}(g,x,b,M,F[4],F[5],je),lt||(Me??(Me=Bt(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,Me),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),b!==et||M!==tt?r.texImage2D(r.TEXTURE_2D,0,r.R8,b,M,0,r.RED,r.UNSIGNED_BYTE,je):r.texSubImage2D(r.TEXTURE_2D,0,0,0,b,M,r.RED,r.UNSIGNED_BYTE,je),r.pixelStorei(r.UNPACK_ALIGNMENT,4),et=b,tt=M,Ke=!0,_e=!0))},br=()=>{_e=!0,Ie()},Mr=!1,Hn=()=>{let s=!!c&&typeof c.rects=="function"&&typeof window<"u"&&typeof window.addEventListener=="function";s!==Mr&&(Mr=s,s?window.addEventListener("scroll",br,{passive:!0,capture:!0}):window.removeEventListener("scroll",br,{capture:!0}))},zn=s=>s==="lantern"||s==="loupe"||s==="reveal",Ye={target:null,at:null,strength:0,trail:[]},It=new Float32Array(36),at=null,vt=null,Zt=!1,ee=()=>{if(!ve||!R)return null;let s=ve/R,g=Math.round(s>=1?128:128*s),x=Math.round(s>=1?128/s:128);return at&&at.width===g&&at.height===x||(at=new $l(g,x),vt||(vt=Bt(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,vt),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,g,x,0,r.RGBA,r.UNSIGNED_BYTE,at.pixels),Zt=!0),at},Pe=null,ht=null,xt=new Uint8Array(0),yt=!1,kt=null,ft=null,dn=-1,en=[-.5,-.8],tn=[0,0],Wn=()=>{if(Pe&&Z)try{if(ft??(ft=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!ft)return;let s=Z instanceof HTMLVideoElement,g=s?Pe.cols>>1:Pe.cols,x=s?Pe.rows>>1:Pe.rows,b=ft.canvas;b.width!==g||b.height!==x?(b.width=g,b.height=x):ft.clearRect(0,0,g,x);let M=qe||1,F=mt||1;ft.drawImage(Z,Ot.offset[0]*M,Ot.offset[1]*F,Ot.scale[0]*M,Ot.scale[1]*F,0,0,g,x),kt=function(d,w,_,W,U=d){let k=w*_,I=W?.length===k*ar?W:new Float32Array(k*ar);if(!k)return I;let z=Math.min(w,_),q=new Float32Array(k),ie=new Float32Array(k),re=new Float32Array(k),Ee=new Float32Array(k),B=new Float32Array(k),$=new Float32Array(k);for(let ge=0;ge<k;ge++){let De=d[4*ge+3]/255;q[ge]=(.299*d[4*ge]+.587*d[4*ge+1]+.114*d[4*ge+2])/255*De}ie.set(q),Je(ie,$,w,_,Math.max(1,Math.round(.012*z))),re.set(q),Je(re,$,w,_,Math.max(1,Math.round(.03*z)));for(let ge=0;ge<k;ge++){Ee[ge]=Math.abs(q[ge]-ie[ge]);let De=Math.max(0,q[ge]-.55)/.45;B[ge]=De*De}Je(Ee,$,w,_,Math.max(1,Math.round(.02*z)));let S=1/Math.max(.02,Lt(Ee,.95));Je(B,$,w,_,Math.max(1,Math.round(.05*z)));let Y=1/Math.max(.03,Lt(B,.98)),N=Math.max(1,Math.ceil(Math.sqrt(k/12e3))),j=Math.max(1,Math.floor(w/N)),fe=Math.max(1,Math.floor(_/N)),ae=j*fe,Q=d,ye=U;if(N>1){let ge=new Uint8ClampedArray(4*ae),De=U===d?ge:new Uint8ClampedArray(4*ae);for(let dt=0;dt<fe;dt++)for(let ot=0;ot<j;ot++){let St=[0,0,0,0,0,0,0];for(let bt=dt*N;bt<(dt+1)*N;bt++)for(let Na=ot*N;Na<(ot+1)*N;Na++){let ai=4*(bt*w+Na);for(let zt=0;zt<4;zt++)St[zt]+=d[ai+zt];if(De!==ge)for(let zt=0;zt<3;zt++)St[4+zt]+=U[ai+zt]}let Nt=4*(dt*j+ot),ri=N*N;for(let bt=0;bt<4;bt++)ge[Nt+bt]=St[bt]/ri;if(De!==ge){for(let bt=0;bt<3;bt++)De[Nt+bt]=St[4+bt]/ri;De[Nt+3]=ge[Nt+3]}}Q=ge,ye=De}Or?.n!==ae&&(Or=new Yl(ae)),Or.reset();let{depth:Ue,water:We,sky:Qe,falls:rt}=Kl(Q,ye,j,fe,Or),Rt=Lt(Ue,.03),Fn=Lt(Ue,.97),Oa=Math.max(.05,Fn-Rt),Sn=0,Ln=0,Ht=0,Pr=new Float32Array(k);for(let ge=0;ge<_;ge++)for(let De=0;De<w;De++){let dt=ge*w+De,ot=dt*ar,St=wt((Gr(Ue,j,fe,De,ge,w,_)-Rt)/Oa);I[ot+1]=St,I[ot+8]=wt(Gr(We,j,fe,De,ge,w,_)),I[ot+9]=wt(Gr(Qe,j,fe,De,ge,w,_)),I[ot+10]=wt(Gr(rt,j,fe,De,ge,w,_));let Nt=St*St*St*(.25+q[dt]);Sn+=(De+.5)/w*Nt,Ln+=(ge+.5)/_*Nt,Ht+=Nt,Pr[dt]=Math.hypot(re[ge*w+Math.min(w-1,De+1)]-re[ge*w+Math.max(0,De-1)],re[Math.min(_-1,ge+1)*w+De]-re[Math.max(0,ge-1)*w+De])}Sn=Ht>0?Math.max(.3,Math.min(.7,Sn/Ht)):.5,Ln=Ht>0?Math.max(.3,Math.min(.7,Ln/Ht)):.5;let tr=1/Math.max(.004,Lt(Pr,.97));for(let ge=0;ge<_;ge++)for(let De=0;De<w;De++){let dt=ge*w+De,ot=dt*ar,St=(re[ge*w+Math.min(w-1,De+1)]-re[ge*w+Math.max(0,De-1)])*tr,Nt=(re[Math.min(_-1,ge+1)*w+De]-re[Math.max(0,ge-1)*w+De])*tr;I[ot]=re[dt],I[ot+2]=Math.min(1,B[dt]*Y),I[ot+3]=Math.min(1,Ee[dt]*S),I[ot+4]=Math.max(-1,Math.min(1,-St)),I[ot+5]=Math.max(-1,Math.min(1,-Nt)),I[ot+6]=Sn,I[ot+7]=Ln}return I}(ft.getImageData(0,0,g,x).data,g,x,kt),tn[0]=g,tn[1]=x,function(d,w,_=[-.5,-.8],W=d.cols,U=d.rows){let{cols:k,rows:I,speed:z,damp:q,wall:ie}=d,re=ar;if(w.length!==W*U*re)return _;let Ee=0,B=0,$=0;for(let S=0,Y=0;S<I;S++){let N=Math.min(U-1,S*U/I|0);for(let j=0;j<k;j++,Y++){let fe=Math.min(W-1,j*W/k|0),ae=(N*W+fe)*re,Q=w[ae+3],ye=w[ae+8],Ue=w[ae+9],We=w[ae+2],Qe=w[ae+1],rt=fe<W-1?re:0,Rt=fe>0?-re:0,Fn=N<U-1?W*re:0,Oa=N>0?-W*re:0,Sn=Math.hypot(w[ae+1+rt]-w[ae+1+Rt],w[ae+1+Fn]-w[ae+1+Oa]),Ln=Math.hypot(w[ae+4],w[ae+5]),Ht=Math.max(ye,.9*Ue),Pr=1-Cn(.2,.8,Q),tr=Math.max(.12,Math.max(Ht,.2+.65*Pr)*(1-.45*Cn(.55,.95,Qe)*(1-ye)));z[Y]=tr*tr;let ge=Math.max(0,1-Ht);q[Y]=.9*ye+1.6*Ue*(1-ye)+ge*(1.4+6.5*Cn(.25,.9,Q)),ie[Y]=Math.min(.4,.35*Cn(.12,.35,Sn)*(1-.6*ye)+.1*Cn(.6,1,Ln)*(1-Ht)),Ee+=(j/(k-1)-.5)*We,B+=(S/(I-1)-.5)*We,$+=We}}if(yi(z,k,I,2),yi(q,k,I,1),$>.5){let S=Math.hypot(Ee,B);S/$>.02&&(_[0]=Ee/S,_[1]=B/S)}}(Pe,kt,en,g,x)}catch{}},kn=(s,g,x)=>{if(!ve||!R)return;let b=ve/R,M=Math.round(b>=1?128:128*b),F=Math.round(b>=1?128/b:128);Pe&&Pe.cols===M&&Pe.rows===F||(Pe=new Ql(M,F),kt=null,xt=new Uint8Array(M*F*4),ht??(ht=Bt(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,ht),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,M,F,0,r.RGBA,r.UNSIGNED_BYTE,null)),Pe.base=1.1*Math.min(M,F),Pe.mass=0,Pe.calm=7,Pe.fade=1.6,Wn(),dn=nt,Pe.drop(s*(M-1),g*(F-1),x,2.2),Ie()},Vn=s=>{if(!Pe?.live||!ht)return!!yt&&(yt=!1,!0);Z instanceof HTMLVideoElement&&dn!==nt&&(Wn(),dn=nt),Pe.step(s,.45+.55*Math.exp(-Pe.age/.7));let g=Math.min(1,Math.exp(-(Pe.age-.9)/.5));return g<.02?(Pe.clear(),yt=!1,!0):(function(x,b,M,F,d=1,w=x.cols,_=x.rows){let{cols:W,rows:U,h:k,trace:I}=x,z=d/Math.max(.01,x.front),q=M[0],ie=M[1],re=b.length===w*_*11;for(let Ee=0,B=0;Ee<U;Ee++){let $=Math.min(_-1,Ee*_/U|0);for(let S=0;S<W;S++,B++){let Y=k[B]*z,N=11*($*w+Math.min(w-1,S*w/W|0)),j=re?b[N+9]:0,fe=re?Math.max(b[N+8],.75*(1-Cn(.1,.45,b[N+3]))*(1-j)):0,ae=Math.max(0,1-Math.max(fe,j)),Q=.5*(k[S<W-1?B+1:B]-k[S>0?B-1:B])*z,ye=.5*(k[Ee<U-1?B+W:B]-k[Ee>0?B-W:B])*z,Ue=(6*-Q+(re?.35*b[N+4]:0))*q+(6*-ye+(re?.35*b[N+5]:0))*ie,We=Math.max(-1,Math.min(1,Ue)),Qe=Y>0?Y:.45*Y,rt=fe*(.8*Qe+.4*We*Math.min(1,4*Math.abs(Y)))+j*(.3*Math.min(1,I[B]*z)+.15*Qe)+ae*(.55*Qe+.25*We*Math.min(1,4*Math.abs(Y))),Rt=fe*Math.max(0,We)**3*Math.min(1,3*Math.max(0,Y))*.9+ae*Math.max(0,We)**4*Math.min(1,3*Math.max(0,Y))*.25;rt=Math.max(-1,Math.min(1,rt));let Fn=Math.round(32767*rt+32768);F[4*B]=Fn>>>8,F[4*B+1]=255&Fn,F[4*B+2]=Math.round(255*Math.min(1,Rt)),F[4*B+3]=255}}}(Pe,kt??new Float32Array(0),en,xt,g,tn[0],tn[1]),r.bindTexture(r.TEXTURE_2D,ht),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texSubImage2D(r.TEXTURE_2D,0,0,0,Pe.cols,Pe.rows,r.RGBA,r.UNSIGNED_BYTE,xt),yt=!0,!0)},jn=0,$n=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,wr=!!$n?.matches,Ft=()=>l.respectReducedMotion&&wr,mn,yl=new Promise(s=>{mn=s}),pn=!0,Rn=s=>u?.(s instanceof Error?s:new Error(String(s))),Ro=(s,g)=>{let x=r.createShader(s);return Ge.push(x),r.shaderSource(x,g),r.compileShader(x),x},Yn=s=>{if(v)return y.program(s);Ze??(Ze=Ro(r.VERTEX_SHADER,`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`));let g=r.createProgram(),x=Ro(r.FRAGMENT_SHADER,s);return r.attachShader(g,Ze),r.attachShader(g,x),r.linkProgram(g),{program:g,locations:null,fragment:x}},Er=(s,g=!1)=>{if(s.locations)return!0;if(v)return y.linked(s,g);let{program:x,fragment:b}=s;if(!g&&Be&&!r.getProgramParameter(x,Be.COMPLETION_STATUS_KHR))return!1;if(!r.getProgramParameter(x,r.LINK_STATUS)){if(r.isContextLost())return!1;throw new Error(r.getShaderInfoLog(b)||r.getProgramInfoLog(x)||"Glyph field program failed to link.")}let M={};for(let F=r.getProgramParameter(x,r.ACTIVE_UNIFORMS)-1;F>=0;F--){let d=r.getActiveUniform(x,F).name.replace(/\[0\]$/,"");M[d]=r.getUniformLocation(x,d)}return s.locations=M,!0},ha=(s=!1)=>{if(!be||!ue)return!1;try{if(!Er(be,s))return!1}catch(g){if(!h.length)throw g;let x=h.map(b=>b.name).join(", ");return Aa([]),kr(),Rn(new Error(`Field effects (${x}) did not compile, so the field draws without them. ${g instanceof Error?g.message:String(g)}`)),!1}return Er(ue,s)},Bt=s=>{let g=r.createTexture();return r.bindTexture(r.TEXTURE_2D,g),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MAG_FILTER,s===r.LINEAR_MIPMAP_LINEAR?r.LINEAR:s),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),g},fa=()=>{J&&(r.deleteTexture(J.ink),r.deleteTexture(J.under),r.deleteFramebuffer(J.buffer),J.glow&&r.deleteTexture(J.glow),J=null)},Ao=()=>function(s,g,x,b,M,F,d){if(s!=="fill"||!(M>0&&F>0))return[d.width,d.height];let w=g*b,_=w*x;return[M/Math.max(1,Math.floor(M/_+1e-6)),F/Math.max(1,Math.floor(F/w+1e-6))]}(l.cellFit,l.cellSize,l.cellAspect,ne,ve,R,de),da=()=>!!l.fluid&&ir(l)==="fluid",ma=()=>{Ae?.release(),Fe=!1,Le.forEach(s=>r.deleteTexture(s)),pe.forEach(s=>r.deleteFramebuffer(s)),Le=[],pe=[]};function Fo(){C&&!v&&r.deleteProgram(C.program),C=Yn((s=>`#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uPrevious;
uniform vec2 uSize;
uniform float uAspect, uDt, uDecay, uEnergyDecay, uRadius, uSplat;
uniform vec2 uFrom, uTo, uForce;
out vec4 outColor;
${Fi(s)}
float segment(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-8),0.,1.);return length(pa-ba*h);}
void main(){
  vec2 uv=gl_FragCoord.xy/uSize;
  vec4 here=decodeFluid(texture(uPrevious,uv));
  vec4 state=decodeFluid(texture(uPrevious,uv-uDt*here.xy*vec2(1./uAspect,1.)));
  state.xy*=exp(-uDt*uDecay);
  state.z*=exp(-uDt*uEnergyDecay);
  if(uSplat>.5){
    vec2 scale=vec2(uAspect,1.);
    float d=segment(uv*scale,uFrom*scale,uTo*scale);
    float g=exp(-d*d/(uRadius*uRadius));
    state.xy+=uForce*g;
    state.z=min(1.,state.z+g*min(1.,length(uForce)*.5+.08));
  }
  float speed=length(state.xy);
  if(speed>5.)state.xy*=5./speed;
  outColor=encodeFluid(state);
}`)(we)),v?Ae?.release():Ae?.dispose(),Ae=we?null:function(s,g,x){let b={splat:g(Fl),curl:g(Sl),vorticity:g(Ll),divergence:g(_l),fade:g(Cl),pressure:g(Pl),gradient:g(Dl),advect:g(Ul)},M=Object.values(b),F=0,d=0,w=[],_=[],W=null,U=null,k=B=>{let $=s.createTexture();s.bindTexture(s.TEXTURE_2D,$),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,B),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,B),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),s.texImage2D(s.TEXTURE_2D,0,s.RGBA16F,F,d,0,s.RGBA,s.HALF_FLOAT,null);let S=s.createFramebuffer();return s.bindFramebuffer(s.FRAMEBUFFER,S),s.framebufferTexture2D(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,$,0),s.checkFramebufferStatus(s.FRAMEBUFFER)!==s.FRAMEBUFFER_COMPLETE?(s.deleteFramebuffer(S),s.deleteTexture($),null):(s.viewport(0,0,F,d),s.clearColor(0,0,0,1),s.clear(s.COLOR_BUFFER_BIT),{texture:$,buffer:S})},I=B=>{B&&(s.deleteTexture(B.texture),s.deleteFramebuffer(B.buffer))},z=()=>{[...w,..._,W,U].forEach(I),w=[],_=[],W=U=null},q=(B,$)=>{let S=B.locations;return s.useProgram(B.program),s.bindFramebuffer(s.FRAMEBUFFER,$.buffer),s.uniform2f(S.uTexel,1/F,1/d),S},ie=(B,$,S,Y)=>{s.activeTexture(s.TEXTURE0+S),s.bindTexture(s.TEXTURE_2D,Y),s.uniform1i(B[$],S)},re=()=>s.drawArrays(s.TRIANGLES,0,3),Ee=B=>{let $=B[0];B[0]=B[1],B[1]=$};return{resize(B,$){z(),F=B,d=$;let S=[k(s.LINEAR),k(s.LINEAR),k(s.NEAREST),k(s.NEAREST),k(s.NEAREST),k(s.NEAREST)];return s.bindFramebuffer(s.FRAMEBUFFER,null),S.some(Y=>!Y)?(S.forEach(I),!1):(w=[S[0],S[1]],_=[S[2],S[3]],W=S[4],U=S[5],!0)},ready:()=>M.every(x),step(B,$){if(!w.length||!W||!U)return;let S;s.viewport(0,0,F,d),B&&(S=q(b.splat,w[1]),ie(S,"uVelocity",0,w[0].texture),s.uniform2f(S.uFrom,B.from[0],B.from[1]),s.uniform2f(S.uTo,B.to[0],B.to[1]),s.uniform2f(S.uForce,B.force[0],B.force[1]),s.uniform1f(S.uAspect,$.aspect),s.uniform1f(S.uRadius,$.radius),re(),Ee(w)),$.curl>0&&(S=q(b.curl,U),ie(S,"uVelocity",0,w[0].texture),re(),S=q(b.vorticity,w[1]),ie(S,"uVelocity",0,w[0].texture),ie(S,"uCurl",1,U.texture),s.uniform1f(S.uStrength,$.curl),s.uniform1f(S.uDt,$.dt),re(),Ee(w)),S=q(b.divergence,W),ie(S,"uVelocity",0,w[0].texture),re(),S=q(b.fade,_[1]),ie(S,"uSource",0,_[0].texture),s.uniform1f(S.uAmount,.8),re(),Ee(_);for(let Y=0;Y<20;Y++)S=q(b.pressure,_[1]),ie(S,"uPressure",0,_[0].texture),ie(S,"uDivergence",1,W.texture),re(),Ee(_);S=q(b.gradient,w[1]),ie(S,"uPressure",0,_[0].texture),ie(S,"uVelocity",1,w[0].texture),re(),Ee(w),S=q(b.advect,w[1]),ie(S,"uVelocity",0,w[0].texture),s.uniform1f(S.uDt,$.dt),s.uniform1f(S.uDissipation,$.dissipation),re(),Ee(w),s.bindFramebuffer(s.FRAMEBUFFER,null)},get velocity(){return w[0]?.texture??null},get size(){return[F,d]},release:z,dispose(){z(),M.forEach(({program:B})=>s.deleteProgram(B))}}}(r,Yn,s=>Er(s))}let So=()=>{ma();let s=l.fluid;if(!(s&&da()&&ve&&R))return;C||Fo();let g=s.resolution,x=ve/R;if(Ne=x>=1?g:Math.max(8,Math.round(g*x)),Xe=x>=1?Math.max(8,Math.round(g/x)):g,Fe=!!Ae&&Ae.resize(Ne,Xe),Fe)return void($e=0);let b=()=>{ma();for(let M=0;M<2;M++){let F=Bt(r.LINEAR);r.texImage2D(r.TEXTURE_2D,0,we?r.RGBA8:r.RGBA16F,Ne,Xe,0,r.RGBA,we?r.UNSIGNED_BYTE:r.HALF_FLOAT,null);let d=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,d),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,F,0),Le.push(F),pe.push(d)}return r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE};if(!b()){if(we)throw new Error("The glyph field could not allocate its fluid buffers.");we=!0,kr(),Fo(),b()}for(let M of pe)r.bindFramebuffer(r.FRAMEBUFFER,M),r.viewport(0,0,Ne,Xe),r.clearColor(we?.5:0,we?.5:0,0,1),r.clear(r.COLOR_BUFFER_BIT);r.bindFramebuffer(r.FRAMEBUFFER,null),$e=0},Tr=-1,Kn=!1,pa=s=>s.post.bloom>0||s.post.scanlines>0||s.post.grain>0||s.post.chroma>0||s.post.curvature>0;function kr(){be&&!v&&r.deleteProgram(be.program),ue&&!v&&r.deleteProgram(ue.program),fa(),be=Yn(Si(we,h)),Tr=Dn.indexOf(l.mark),Kn=pa(l),ue=Yn(Ka(Tr,Kn)),(v?y.canCompileInParallel:Be)||ha(!0)}let Lo=()=>oo(l,de),ga=()=>{_e=!0,Ie()},va=()=>ji(l,de),xa=()=>{if(Ce=sn(l.charset).length,de=Kr(l.cellSize,l.cellAspect,ne,Ce),Re=ne,v){let x=va();if(D?.key!==x){let b=D;D=y.atlas(x,ya,ga),y.releaseAtlas(b,ga),me=D.texture}return void(_e=!0)}let{image:g}=ya();r.bindTexture(r.TEXTURE_2D,me),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,g),typeof g.getContext=="function"&&(g.width=g.height=1),_e=!0};function ya(){return hs(l,de,v)}let _o=typeof document>"u"?void 0:document.fonts,ba=()=>{if(!_o?.load)return;let s=Lo();_o.load(s,sn(l.charset).join("")).then(()=>{if(!Et&&!lt&&Lo()===s){if(Fr++,!v)return xa(),void Ie();D&&!D.final&&D.key===va()&&y.paintAtlas(D,ya)}},()=>{})},Co=s=>s.trim().replace(/^["']|["']$/g,"").toLowerCase(),Ma=()=>{if(Pt=[0,1],Lr=!1,Z&&l.levels!=="none")try{let s=document.createElement("canvas");s.width=s.height=64;let g=s.getContext("2d",{willReadFrequently:!0});Z===He&&(g.imageSmoothingQuality="medium"),g.drawImage(Z,0,0,64,64),Pt=wi(g.getImageData(0,0,64,64).data)}catch{Pt=[0,1]}},gn=null,Rr=null,An=!1,nn=-1/0,Ar=new Uint8Array(0),vn=null,wa=()=>{if(An=!1,Jn=!1,!Z||l.scope==="all")return;let s=qe||1,g=mt||1,x=Math.max(8,Math.round(s>=g?96:96*s/g)),b=Math.max(8,Math.round(g>=s?96:96*g/s));try{if(vn??(vn=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!vn)return;let M=vn.canvas;M.width!==x||M.height!==b?(M.width=x,M.height=b):vn.clearRect(0,0,x,b),vn.drawImage(Z,0,0,x,b),Po(vn.getImageData(0,0,x,b).data,x,b)}catch{return}},Po=(s,g,x)=>{if(An=!1,Jn=!1,Z&&l.scope!=="all"&&(Rr=Vi(s,g,x,null,Rr),Rr.key!=="none")){Ar.length!==g*x*4&&(Ar=new Uint8Array(g*x*4));for(let b=0;b<g*x;b++)Ar[4*b+3]=Math.round(255*Rr.subject[b]);gn??(gn=Bt(r.LINEAR)),r.bindTexture(r.TEXTURE_2D,gn),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,g,x,0,r.RGBA,r.UNSIGNED_BYTE,Ar),An=!0}},qt,rn=null,Ea="",Fr=0,Ta="",Do=null,Uo=null,Io=-1,an=!1,xn=null,Qn={levels:!1,scope:!1},Sr=0,ka=-1/0,Lr=!1,Jn=!1,Bo=null,Oo=0,No=0,Zn=()=>{if(!Z)return;let s=performance.now(),g=Z instanceof HTMLVideoElement||G;g&&qt===void 0&&(qt=function(d){if(!d.getExtension("EXT_color_buffer_float")||!d.getExtension("EXT_float_blend"))return null;let w=(j,fe=`#version 300 es
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`)=>{let ae=(Qe,rt)=>{let Rt=d.createShader(Qe);return d.shaderSource(Rt,rt),d.compileShader(Rt),Rt},Q=d.createProgram(),ye=ae(d.VERTEX_SHADER,fe),Ue=ae(d.FRAGMENT_SHADER,j);if(d.attachShader(Q,ye),d.attachShader(Q,Ue),d.linkProgram(Q),d.deleteShader(ye),d.deleteShader(Ue),!d.getProgramParameter(Q,d.LINK_STATUS))return d.deleteProgram(Q),null;let We=new Map;return{program:Q,at:Qe=>(We.has(Qe)||We.set(Qe,d.getUniformLocation(Q,Qe)),We.get(Qe))}},_=Xa.get(d);_||Xa.set(d,_=new Map);let W=_,U=(j,fe)=>{let ae=W.get(j);if(ae)return ae;let Q=fe();if(!Q)throw new Error("The glyph field could not build its GPU measure.");return W.set(j,Q),Q},k=[],I=(j,fe,ae,Q)=>{let ye=d.createTexture(),Ue=d.createFramebuffer();d.bindTexture(d.TEXTURE_2D,ye);for(let[Qe,rt]of[[d.TEXTURE_MIN_FILTER,Q],[d.TEXTURE_MAG_FILTER,Q],[d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE],[d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE]])d.texParameteri(d.TEXTURE_2D,Qe,rt);let We={texture:ye,buffer:Ue,width:0,height:0,format:j,type:fe,base:ae};return k.push(We),We},z=(j,fe,ae)=>{let Q=j;j.width===fe&&j.height===ae||(j.width=fe,j.height=ae,d.bindTexture(d.TEXTURE_2D,j.texture),d.texImage2D(d.TEXTURE_2D,0,Q.format,fe,ae,0,Q.base,Q.type,null),d.bindFramebuffer(d.FRAMEBUFFER,j.buffer),d.framebufferTexture2D(d.FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,j.texture,0))},q=null,ie=null,re=null,Ee=null,B=null,$=null,S=d.createVertexArray(),Y=(j,fe)=>{d.bindFramebuffer(d.FRAMEBUFFER,fe.buffer),d.viewport(0,0,fe.width,fe.height),d.useProgram(j.program)},N=(j,fe,ae)=>{d.activeTexture(d.TEXTURE11),d.bindTexture(d.TEXTURE_2D,j),d.uniform1i(fe.at(ae),11)};return{get levels(){return ie?.texture??null},get scope(){return $?.texture??null},measureLevels(j,fe,ae){let Q=Ga(fe,ae,128),ye=U("histogram",()=>w(`#version 300 es
precision highp float;
out vec4 o;
void main(){ o=vec4(1.); }`,`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uSource;
uniform int uLevel, uWidth;
void main(){
  vec4 c=texelFetch(uSource,ivec2(gl_VertexID%uWidth,gl_VertexID/uWidth),uLevel);
  float bin=floor(dot(c.rgb,vec3(.2126,.7152,.0722))*255.+.5);
  gl_Position=c.a*255.<8.?vec4(2.,2.,0.,1.):vec4((bin+.5)/128.-1.,0.,0.,1.);
  gl_PointSize=1.;
}`)),Ue=U("levels",()=>w(`#version 300 es
precision highp float;
uniform sampler2D uHistogram;
out vec4 o;
void main(){
  float count=0.;
  for(int v=0;v<256;v++)count+=texelFetch(uHistogram,ivec2(v,0),0).r;
  if(count<.5){o=vec4(0.,1.,0.,1.);return;}
  float low=1.,high=1.,seen=0.;bool lowFound=false;
  for(int v=0;v<256;v++){
    seen+=texelFetch(uHistogram,ivec2(v,0),0).r;
    if(!lowFound&&seen>=count*.02){low=float(v)/255.;lowFound=true;}
    if(seen>=count*.98){high=float(v)/255.;break;}
  }
  o=high-low<.08?vec4(0.,1.,0.,1.):vec4(low,high,0.,1.);
}`));q??(q=I(d.R32F,d.FLOAT,d.RED,d.NEAREST)),ie??(ie=I(d.RGBA32F,d.FLOAT,d.RGBA,d.NEAREST)),z(q,256,1),z(ie,1,1),Y(ye,q),d.clearColor(0,0,0,0),d.clear(d.COLOR_BUFFER_BIT),N(j,ye,"uSource"),d.uniform1i(ye.at("uLevel"),Q.level),d.uniform1i(ye.at("uWidth"),Q.width),d.enable(d.BLEND),d.blendFunc(d.ONE,d.ONE),d.bindVertexArray(S),d.drawArrays(d.POINTS,0,Q.width*Q.height),d.disable(d.BLEND),Y(Ue,ie),N(q.texture,Ue,"uHistogram"),d.drawArrays(d.TRIANGLES,0,3)},measureScope(j,fe,ae){let Q=Ga(fe,ae,128),ye=Math.min(128,Q.width),Ue=Math.min(128,Q.height),We=U("stats",()=>w(Il)),Qe=U("subject",()=>w(Bl)),rt=U("blur",()=>w(`#version 300 es
precision highp float;
precision highp int;
uniform sampler2D uImage;
uniform ivec2 uStep;
uniform int uRadius;
out vec4 o;
void main(){
  ivec2 at=ivec2(gl_FragCoord.xy),last=textureSize(uImage,0)-1;
  float sum=0.,total=0.;
  for(int k=-16;k<=16;k++){
    if(k<-2*uRadius||k>2*uRadius)continue;
    float w=float(2*uRadius+1-abs(k));
    sum+=texelFetch(uImage,clamp(at+uStep*k,ivec2(0),last),0).a*w;total+=w;
  }
  o=vec4(texelFetch(uImage,at,0).r,0.,0.,sum/total);
}`));re??(re=I(d.RGBA32F,d.FLOAT,d.RGBA,d.NEAREST)),Ee??(Ee=I(d.RGBA8,d.UNSIGNED_BYTE,d.RGBA,d.NEAREST)),B??(B=I(d.RGBA8,d.UNSIGNED_BYTE,d.RGBA,d.NEAREST)),$??($=I(d.RGBA8,d.UNSIGNED_BYTE,d.RGBA,d.LINEAR)),z(re,1,1),z(Ee,ye,Ue),z(B,ye,Ue),z($,ye,Ue),d.bindVertexArray(S),Y(We,re),N(j,We,"uSource"),d.uniform1i(We.at("uLevel"),Q.level),d.uniform2i(We.at("uSize"),ye,Ue),d.drawArrays(d.TRIANGLES,0,3),Y(Qe,Ee),N(j,Qe,"uSource"),d.uniform1i(Qe.at("uLevel"),Q.level),d.activeTexture(d.TEXTURE12),d.bindTexture(d.TEXTURE_2D,re.texture),d.uniform1i(Qe.at("uStats"),12),d.drawArrays(d.TRIANGLES,0,3);let Rt=Math.min(8,Math.max(1,Math.round(.02*Math.min(ye,Ue))));Y(rt,B),N(Ee.texture,rt,"uImage"),d.uniform2i(rt.at("uStep"),1,0),d.uniform1i(rt.at("uRadius"),Rt),d.drawArrays(d.TRIANGLES,0,3),Y(rt,$),N(B.texture,rt,"uImage"),d.uniform2i(rt.at("uStep"),0,1),d.drawArrays(d.TRIANGLES,0,3)},dispose(){for(let j of k)d.deleteTexture(j.texture),d.deleteFramebuffer(j.buffer);S&&d.deleteVertexArray(S),k.length=0,q=ie=re=Ee=B=$=null}}}(r));let x=g&&!!qt;g&&!x&&(()=>{let d=xn?.poll();d&&(Qn.levels&&l.levels!=="none"&&(Pt=wi(d.data)),Qn.scope&&Po(d.data,d.width,d.height),(Qn.levels||Qn.scope)&&(_e=!0))})(),Sr++;let b=Sr-ka>=8,M=g&&Dt!==-1/0?s-Dt>1500&&b&&l.levels!=="none"?"later":null:"now",F=g&&nn!==-1/0?s-nn>160&&b&&l.scope!=="all"&&l.hover!=="none"?"later":null:"now";x||M!=="now"||(Ma(),Dt=s),x||F!=="now"||(wa(),nn=s),r.bindTexture(r.TEXTURE_2D,P),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);try{let d=Z,w=d.videoWidth||d.naturalWidth||d.width,_=d.videoHeight||d.naturalHeight||d.height;if(Bo===P&&Oo===w&&No===_&&w&&_?r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,Z):(r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,Z),Bo=P,Oo=w,No=_),g?an=!0:(r.generateMipmap(r.TEXTURE_2D),an=!1),At=w*_*4*4/3,x){let k=!!M&&l.levels!=="none",I=!!F&&l.scope!=="all"&&l.hover!=="none";return(k||I)&&(an&&(r.generateMipmap(r.TEXTURE_2D),an=!1),k&&(qt.measureLevels(P,w,_),Lr=!0),I&&(qt.measureScope(P,w,_),Jn=!0,An=!0),ka=Sr,_e=!0),M&&(Dt=s),void(F&&(nn=s))}let W=M==="later",U=F==="later";!W&&!U||xn?.pending||(xn??(xn=function(k){let I=null,z=null,q=null,ie=0,re=0,Ee=0,B=!1,$=null,S=-1;return{get pending(){return!!q},request(Y,N,j,fe){if(q||B||!N||!j)return!1;let ae=Ga(N,j,fe);try{I??(I=k.createFramebuffer()),z??(z=k.createBuffer());let Q=k.getParameter(k.FRAMEBUFFER_BINDING);if(k.bindFramebuffer(k.FRAMEBUFFER,I),k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Y,ae.level),$!==Y||S!==ae.level){if(k.checkFramebufferStatus(k.FRAMEBUFFER)!==k.FRAMEBUFFER_COMPLETE)return k.bindFramebuffer(k.FRAMEBUFFER,Q),B=!0,!1;$=Y,S=ae.level}let ye=ae.width*ae.height*4;return k.bindBuffer(k.PIXEL_PACK_BUFFER,z),ye!==ie&&(k.bufferData(k.PIXEL_PACK_BUFFER,ye,k.STREAM_READ),ie=ye),k.pixelStorei(k.PACK_ALIGNMENT,4),k.readPixels(0,0,ae.width,ae.height,k.RGBA,k.UNSIGNED_BYTE,0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,null,0),k.bindFramebuffer(k.FRAMEBUFFER,Q),q=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0),k.flush(),re=ae.width,Ee=ae.height,!!q}catch{return B=!0,!1}},poll(){if(!q)return null;let Y=k.clientWaitSync(q,0,0);if(Y!==k.ALREADY_SIGNALED&&Y!==k.CONDITION_SATISFIED)return Y===k.WAIT_FAILED&&(k.deleteSync(q),q=null,B=!0),null;k.deleteSync(q),q=null;let N=new Uint8Array(re*Ee*4);return k.bindBuffer(k.PIXEL_PACK_BUFFER,z),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,N),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),{data:N,width:re,height:Ee}},dispose(){q&&k.deleteSync(q),I&&k.deleteFramebuffer(I),z&&k.deleteBuffer(z),q=I=z=null}}}(r)),an&&(r.generateMipmap(r.TEXTURE_2D),an=!1),xn.request(P,w,_,128)?(Qn={levels:W,scope:U},ka=Sr,W&&(Dt=s),U&&(nn=s)):(W&&(Ma(),Dt=s),U&&(wa(),nn=s)))}catch(d){Rn(d)}},Go=()=>{xn=null,rn=null,Ea="",we=!r.getExtension("EXT_color_buffer_float")&&!r.getExtension("EXT_color_buffer_half_float"),kr(),Oe=v?y.vertexArray():r.createVertexArray(),v||(me=Bt(r.NEAREST)),P=Bt(r.LINEAR_MIPMAP_LINEAR),r.bindTexture(r.TEXTURE_2D,P),r.texImage2D(r.TEXTURE_2D,0,r.RGBA8,1,1,0,r.RGBA,r.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),r.generateMipmap(r.TEXTURE_2D),ve=R=0,Re=0,yn(),ba(),Z&&Zn()};function yn(){let s=e.clientWidth||e.clientHeight?{width:e.clientWidth,height:e.clientHeight}:e.getBoundingClientRect();yr=!s.width||!s.height;let g=$i(l,s.width,s.height,he().scale),x=Math.max(1,Math.round(s.width*g)),b=Math.max(1,Math.round(s.height*g));if(x===ve&&b===R&&g===ne)return!1;let M=!ve||Math.abs(x/b-ve/R)>.01;return ne=g,ve=x,R=b,e.width=ve,e.height=R,Re!==ne&&xa(),(M||da()&&!Le.length&&!Fe)&&So(),_e=!0,!0}let Xo=null,_r=new Float32Array(18),er=[0,0,0],qo=[1,1,1],Ho=[0,0,0,0],Ot=Mi(1,1,1,1,"cover"),zo=null,Wo=0,Vo=0,jo=0,$o=0,Yo=()=>{Xo!==l&&(Xo=l,er=qr(l.ink),qo=qr(l.highlight==="auto"?"#ffffff":l.highlight),Ho=l.background==="transparent"?[0,0,0,0]:[...qr(l.background),1],_r.fill(0),l.ramp.forEach(($,S)=>_r.set(qr($),3*S))),zo===l&&Wo===ve&&Vo===R&&jo===qe&&$o===mt||(zo=l,Wo=ve,Vo=R,jo=qe,$o=mt,Ot=Mi(ve,R,qe||1,mt||1,l.fit,l.focus)),v?y.begin(ve,R):O.begin();let s=l.fluid,g=Z&&_t?de.height/R*_t*Ot.scale[1]:1,x=l.sample==="point"?0:Math.max(0,Math.log2(Math.max(1,g))-.5);an&&Z&&(x>0||l.backdrop>0)&&(r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,P),r.generateMipmap(r.TEXTURE_2D),an=!1);let b=(()=>{let[$,S]=Ao(),Y=Math.ceil(ve/$-1e-4),N=Math.ceil(R/S-1e-4),j=l.post.bloom>0;if(J&&J.columns===Y&&J.rows===N&&!!J.glow===j)return J;fa();let fe=()=>{let We=Bt(r.NEAREST);return r.texStorage2D(r.TEXTURE_2D,1,we?r.RGBA8:r.RGBA16F,Y,N),We},ae=fe(),Q=fe(),ye=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,ye),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,ae,0),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT1,r.TEXTURE_2D,Q,0);let Ue=null;return j&&(Ue=Bt(r.LINEAR_MIPMAP_LINEAR),r.texStorage2D(r.TEXTURE_2D,Math.floor(Math.log2(Math.max(Y,N)))+1,r.RGBA8,Y,N),r.bindFramebuffer(r.FRAMEBUFFER,ye),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT2,r.TEXTURE_2D,Ue,0)),r.drawBuffers(Ue?[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1,r.COLOR_ATTACHMENT2]:[r.COLOR_ATTACHMENT0,r.COLOR_ATTACHMENT1]),J={ink:ae,under:Q,glow:Ue,buffer:ye,columns:Y,rows:N}})(),M=be.locations,F=ue.locations,d=ir(l),w=!Ft();r.bindFramebuffer(r.FRAMEBUFFER,b.buffer),r.viewport(0,0,b.columns,b.rows),r.useProgram(be.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,P),it(r,M.uSource,0),r.activeTexture(r.TEXTURE2),r.bindTexture(r.TEXTURE_2D,(Fe?Ae?.velocity:Le[$e])??P),it(r,M.uFluid,2),r.activeTexture(r.TEXTURE3),r.bindTexture(r.TEXTURE_2D,vt??P),it(r,M.uTrailMap,3),r.activeTexture(r.TEXTURE6),r.bindTexture(r.TEXTURE_2D,(Jn?qt?.scope:gn)??P),it(r,M.uScope,6);let _=Lr&&Z&&l.levels==="auto"?qt?.levels??null:null;r.activeTexture(r.TEXTURE11),r.bindTexture(r.TEXTURE_2D,_??P),it(r,M.uLevelMap,11),le(r,M.uLevelsFromMap,_?1:0),r.activeTexture(r.TEXTURE7),r.bindTexture(r.TEXTURE_2D,ht??P),it(r,M.uTapMap,7),le(r,M.uTapOn,yt&&Z&&Kt?1:0),le(r,M.uScopeMode,An&&l.scope!=="all"?l.scope==="subject"?1:2:0),le(r,M.uFluidMode,Fe?1:0),it(r,M.uHoverMode,d==="fluid"?1:d==="lantern"?2:d==="trail"&&Zt?3:d==="loupe"?4:d==="reveal"?5:0),le(r,M.uTrailAmount,l.trail.strength),(($,S,Y,N,j)=>{S&&cn(S,dr(Y,N,j))&&$.uniform3f(S,Y,N,j)})(r,M.uLight,Ye.at?.[0]??-1,Ye.at?.[1]??-1,zn(d)?Ye.strength:0),lr(r,M.uTrail,It),le(r,M.uLightRadius,l.lantern.radius),le(r,M.uLightGain,l.lantern.strength),le(r,M.uClock,performance.now()/1e3),le(r,M.uFlicker,w?1:0),Mt(r,M.uFluidTexel,1/Math.max(1,Ne),1/Math.max(1,Xe)),Mt(r,M.uResolution,ve,R);let[W,U]=Ao();var k;Mt(r,M.uCell,W,U),le(r,M.uCount,Ce),le(r,M.uBlend,l.blend==="on"||Ce<=9&&(l.blend==="coarse"||l.blend==="auto"&&Kt)?1:0),on(r,M.uSourceMap,Ot.scale[0],Ot.scale[1],Ot.offset[0],Ot.offset[1]),it(r,M.uScene,Z?0:(k=l.scene,Rl[k]??3)),it(r,M.uMark,Dn.indexOf(l.mark)),le(r,M.uOrder,l.glyphOrder==="text"?1:l.glyphOrder==="scatter"&&l.mark==="glyph"?2:0);let I=l.sample==="shape"&&!!Z&&l.mark==="glyph"&&l.glyphOrder!=="text"&&l.glyphOrder!=="scatter"&&de.height>=8;if(I&&(Do===l&&Uo===de&&Io===Fr||(Do=l,Uo=de,Io=Fr,Ta=`${va()}|${Fr}`),Ea!==Ta||!rn)){Ea=Ta;let $=fs(l);r.activeTexture(r.TEXTURE9),rn??(rn=Bt(r.NEAREST)),r.bindTexture(r.TEXTURE_2D,rn),r.pixelStorei(r.UNPACK_ALIGNMENT,1),r.texImage2D(r.TEXTURE_2D,0,r.R8,16,Math.max(1,$.length/16),0,r.RED,r.UNSIGNED_BYTE,$),r.pixelStorei(r.UNPACK_ALIGNMENT,4)}r.activeTexture(r.TEXTURE9),r.bindTexture(r.TEXTURE_2D,I&&rn||P),it(r,M.uShapes,9),le(r,M.uShapeOn,I?1:0),le(r,M.uShapeLod,Math.max(0,Math.log2(Math.max(1,g/5))-.5)),le(r,M.uShapeTone,20),le(r,M.uShapeWindow,3),le(r,M.uShapeGate,.15);let z=l.glyphOrder==="text"&&l.textRepeat==="row"?function($){let S=sn($),Y=[];for(let N=0;N<S.length&&Y.length<16;){if(!S[N].trim()){N++;continue}let j=N;for(;N<S.length&&S[N].trim();)N++;Y.push(j,N-j)}return Y}(l.charset):[];qn.fill(0),qn.set(z),(($,S,Y)=>{S&&cn(S,Y)&&$.uniform2fv(S,Y)})(r,M.uWords,qn),le(r,M.uWordCount,z.length/2),le(r,M.uScale,l.scale);let q=l.clear;on(r,M.uClear,q?q.x:0,q?q.y:0,q?q.width:0,q?q.height:0),le(r,M.uClearFeather,q?q.feather:.1),le(r,M.uClearShape,q&&q.shape==="rect"?1:0),le(r,M.uClearPointer,q?q.pointer??0:0),r.activeTexture(r.TEXTURE8),r.bindTexture(r.TEXTURE_2D,Me??P),it(r,M.uClearMap,8);let ie=Ke&&!!c&&!!Me;le(r,M.uClearMapOn,ie?Math.min(1,Math.max(0,c.strength??.85)):0),le(r,M.uClearBend,ie?.035*Math.min(1,Math.max(0,c.bend??.5)):0),Mt(r,M.uClearTexel,1/Math.max(1,et),1/Math.max(1,tt));let re=performance.now();se.fill(0);for(let $=0;$<K.length;$++){let S=K[$],Y=4*$;se[Y]=S.x,se[Y+1]=S.y,se[Y+2]=(re-S.born)/1e3,se[Y+3]=S.strength}var Ee;ja(r,M.uPulse,se),lr(r,M.uInk,er),lr(r,M.uRamp,_r),le(r,M.uRampCount,l.color==="source"?0:l.ramp.length),lr(r,M.uHighlight,qo),le(r,M.uHighlightAuto,l.highlight==="auto"?1:0),ja(r,M.uBackground,Ho),le(r,M.uBrightness,l.brightness),le(r,M.uContrast,l.contrast),le(r,M.uGamma,l.gamma),le(r,M.uInvert,l.invert?1:0),le(r,M.uVignette,l.vignette),le(r,M.uSourceColor,l.color==="source"?1:0),le(r,M.uRefraction,s?s.refraction*(w?1:.25):0),le(r,M.uGlow,s?s.glow:0),le(r,M.uTime,hn),le(r,M.uDrift,w?l.drift:0),le(r,M.uFluidOn,s&&d==="fluid"&&(Le.length||Fe)?1:0),le(r,M.uLod,x),le(r,M.uSaturation,l.saturation),le(r,M.uShade,l.shade),le(r,M.uBackdrop,Z?l.backdrop:0),Mt(r,M.uLevels,Z&&l.levels==="auto"?Pt[0]:0,Z&&l.levels==="auto"?Pt[1]:1),h.length&&(Ee=be.locations,ja(r,Ee.uFx,function($,S=new Float32Array(32)){return S.fill(0),$.slice(0,4).forEach((Y,N)=>{Ya(Y).forEach((j,fe)=>{S[8*N+fe]=Y.params[j]})}),S}(h,oe.data)),on(r,Ee.uFxPointer,oe.at[0],oe.at[1],oe.presence,Ft()?0:1),le(r,Ee.uFxTime,hn)),r.bindVertexArray(Oe),r.drawArrays(r.TRIANGLES,0,3),b.glow&&(r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,b.glow),r.generateMipmap(r.TEXTURE_2D)),r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,ve,R),r.useProgram(ue.program),r.activeTexture(r.TEXTURE1),r.bindTexture(r.TEXTURE_2D,me),it(r,F.uAtlas,1),r.activeTexture(r.TEXTURE4),r.bindTexture(r.TEXTURE_2D,b.ink),it(r,F.uCells,4),r.activeTexture(r.TEXTURE5),r.bindTexture(r.TEXTURE_2D,b.under),it(r,F.uUnder,5),Mt(r,F.uResolution,ve,R),Mt(r,F.uCell,de.width,de.height),Mt(r,F.uPitch,W,U),le(r,F.uColumns,de.columns),le(r,F.uDotScale,l.dotScale),Mt(r,F.uDir,Math.cos(l.markAngle*Math.PI/180),Math.sin(l.markAngle*Math.PI/180)),it(r,F.uMark,Dn.indexOf(l.mark)),on(r,F.uLine,l.linePitch,l.lineWeight,l.sparkle,0),on(r,F.uInlay,l.accents,l.shuffle,Math.floor(7*hn),ao(l.charset).length),le(r,F.uSourceColor,l.color==="source"?1:0),lr(r,F.uRamp,_r),le(r,F.uRampCount,l.color==="source"?0:l.ramp.length),on(r,F.uFade,er[0],er[1],er[2],l.mark==="inlay"||l.glyphOrder!=="tone"&&l.mark==="glyph"?1:0);let B=l.post;r.activeTexture(r.TEXTURE10),r.bindTexture(r.TEXTURE_2D,b.glow??P),it(r,F.uGlow,10),on(r,F.uPost,b.glow?B.bloom:0,B.bloomRadius,B.scanlines,B.grain),on(r,F.uPost2,B.chroma,B.curvature,hn,2),r.drawArrays(r.TRIANGLES,0,3),v&&y.present(f,ve,R)},Ra=typeof document<"u"&&document.hidden,Ko=()=>!Et&&!lt&&!Tn&&!yr&&(fn||pn)&&!Ra;function Aa(s){L.forEach(x=>x()),h=s.slice(0,4);let g=()=>{_e=!0,Ie()};L=h.map(x=>x.subscribe(g)),h.length||(oe.target=null,oe.presence=0)}Aa(h);let Cr=s=>{if(pt=!1,!Ko())return;let g=performance.now(),x=(s-Xt)/1e3,b=Math.min(1/30,Math.max(1/480,x));Xt=s,Ve=.9*Ve+.1*Math.min(x,.25),ze=Ve>1/24?ze+1:0;try{he().overloaded&&X<2&&ze>10&&(X=2),ze>45&&X<2&&he().atMinimum&&(ze=0,X++,X===1&&ne>1?(l={...l,maxPixelRatio:1},yn()):X=2);let M=ha(),F=!st&&(!(X>=2)||Z instanceof HTMLVideoElement)&&(!(!(Z instanceof HTMLVideoElement)||Z.paused||Z.ended)||!Ft()&&(!Z&&l.scene!=="none"||l.drift>0||l.post.grain>0||h.some(_=>_.animate)));F&&(hn+=b*l.speed),!G||!Z||Z instanceof HTMLVideoElement||st||(Zn(),_e=!0),Z instanceof HTMLVideoElement&&Z.readyState>=2&&Ct&&(Ct=!("requestVideoFrameCallback"in Z),Zn(),nt++,_e=!0);let d=ir(l),w=d==="fluid"&&(ke!==null||s<jn);if(w?((_,W)=>{let U=l.fluid;if(!U||!pe.length&&!Fe||(Fe?!Ae?.ready():!C||!Er(C)))return;let k=ve/R,I=ke;if(ke=null,Fe&&Ae){let re=5200*U.force*(Ft()?.35:1);return I&&(jn=W+1e3*Math.min(9,6/Math.max(.3,U.dissipation))),void Ae.step(I?{from:I.from,to:I.to,force:[(I.to[0]-I.from[0])*re,(I.to[1]-I.from[1])*re]}:null,{dt:Math.min(_,1/60),radius:1.1*U.radius,curl:U.curl,dissipation:U.dissipation,aspect:k})}let z=0,q=0;if(I){let re=(Ft()?1:3)*U.force;z=(I.to[0]-I.from[0])*k*re*4,q=(I.to[1]-I.from[1])*re*4,jn=W+7/Math.min(U.dissipation,1.1*U.dissipation)*1e3}let ie=C.locations;r.bindFramebuffer(r.FRAMEBUFFER,pe[1-$e]),r.viewport(0,0,Ne,Xe),r.useProgram(C.program),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,Le[$e]),it(r,ie.uPrevious,0),Mt(r,ie.uSize,Ne,Xe),le(r,ie.uAspect,k),le(r,ie.uDt,_),le(r,ie.uDecay,U.dissipation),le(r,ie.uEnergyDecay,1.1*U.dissipation),le(r,ie.uRadius,U.radius),le(r,ie.uSplat,I?1:0),Mt(r,ie.uFrom,I?.from[0]??0,I?.from[1]??0),Mt(r,ie.uTo,I?.to[0]??0,I?.to[1]??0),Mt(r,ie.uForce,z,q),r.drawArrays(r.TRIANGLES,0,3),$e=1-$e})(b,s):ke=null,zn(d)&&(w=((_,W)=>{let U=l.lantern,k=Ye.target;if(k){let z=Ye.at;if(z)if(Ft())z[0]=k[0],z[1]=k[1];else{let re=1-Math.exp(-U.follow*_);z[0]+=(k[0]-z[0])*re,z[1]+=(k[1]-z[1])*re}else Ye.at=[k[0],k[1]];let q=Ye.at,ie=Ye.trail[Ye.trail.length-1];U.trail>0&&(!ie||W-ie.born>28&&Math.hypot(q[0]-ie.x,q[1]-ie.y)>.004)&&(Ye.trail.push({x:q[0],y:q[1],born:W}),Ye.trail.length>12&&Ye.trail.shift())}Ye.strength+=((k?1:0)-Ye.strength)*(1-Math.exp(-_*(k?9:5)));let I=Ye.trail;for(let z=I.length-1;z>=0;z--)U.trail>0&&W-I[z].born<4e3*U.trail||I.splice(z,1);It.fill(0);for(let z=0;z<I.length;z++){let q=I[z];It[3*z]=q.x,It[3*z+1]=q.y,It[3*z+2]=.55*Math.exp(-(W-q.born)/1e3/Math.max(.01,U.trail))}return Ye.strength>.003||I.length>0})(b,s)||w),d==="trail"){let _=!!at?.active;w=(W=>{let U=ee();return!(!U||!U.active||(U.step(W),r.bindTexture(r.TEXTURE_2D,vt),r.texSubImage2D(r.TEXTURE_2D,0,0,0,U.width,U.height,r.RGBA,r.UNSIGNED_BYTE,U.pixels),Zt=!0,0))})(b)||w,_&&!at?.active&&(_e=!0)}if((Pe?.live||yt)&&(w=Vn(b)||w,yt||(_e=!0)),h.length&&function(_){let W=oe.target&&!st?1:0,U=!1;if(oe.target){oe.presence===0&&(oe.at=[...oe.target]);let k=1-Math.exp(-_/.035),I=oe.target[0]-oe.at[0],z=oe.target[1]-oe.at[1];Math.abs(I)+Math.abs(z)>1e-4&&(oe.at=[oe.at[0]+I*k,oe.at[1]+z*k],U=!0)}if(oe.presence!==W){let k=_/.15;oe.presence=W>oe.presence?Math.min(W,oe.presence+k):Math.max(W,oe.presence-k),U=!0}return U}(b)&&(w=!0),K.length){for(let _=K.length-1;_>=0;_--)s-K[_].born>=2400&&K.splice(_,1);w=!0,K.length||(_e=!0)}c&&Ut(),M&&(w||_e||F&&s-Xn>=ua*Nl())&&(Yo(),Xn=s,_e=!1,!pn||Jt&&!Z||(pn=!1,mn())),(F||w||ke||!M||G&&Z&&!st)&&(pt=!0,$r(Cr)),O&&!lt&&O.end(s,performance.now()-g)}catch(M){Tn=!0,Rn(M)}};function Ie(){!pt&&Ko()&&(Xt=performance.now(),pt=!0,$r(Cr))}let Fa=(s,g)=>{let x=e.getBoundingClientRect();if(!x.width||!x.height)return null;let b=(s-x.left)/x.width,M=(g-x.top)/x.height;return b<-.05||b>1.05||M<-.05||M>1.05?null:[b,1-M]},Sa=s=>{h.length&&!st&&(oe.target=s?[s[0],1-s[1]]:null,Ie());let g=ir(l);if(g==="none"||st)return Te=null,void(Ye.target=null);if(zn(g))return Ye.target=s?[s[0],1-s[1]]:null,Te=null,void Ie();if(g==="trail"){let x=ee();return x?(s?x.move(s[0],1-s[1],l.trail.radius,performance.now()):x.leave(),Te=null,void Ie()):void 0}s?(Te&&(ke=ke?{from:ke.from,to:s}:{from:Te,to:s}),Te=s,Ie()):Te=null},Qo=n.interactionTarget??window,Jo={target:Qo,move:s=>{s.type==="pointerdown"&&function(x){if(l.tap==="none"||!Z||!Kt||st||Et||Ft()||x.button!==0||typeof Element<"u"&&x.target instanceof Element&&x.target.closest("button, a, input, select, summary, textarea, label"))return;let b=Fa(x.clientX,x.clientY);!b||b[0]<0||b[0]>1||b[1]<0||b[1]>1||(l.tap==="surface"?kn(b[0],1-b[1],1):(K=[...K,{x:b[0],y:1-b[1],born:performance.now(),strength:1}].slice(-4),Ie()))}(s);let g=Fa(s.clientX,s.clientY);Qo===window&&(Jo.inside=!!g),Sa(g)},leave:()=>{Te=null,at?.leave(),oe.target&&(oe.target=null,Ie()),Ye.target&&(Ye.target=null,Ie())},near:()=>fn},bn=[zl(Jo)],La=()=>{let s=yn();Se(),c&&(ut=!0,_e=!0),(s||_e)&&Ie()},_a=i?Wr(i.element,La):()=>{};bn.push(Wr(e,La),()=>_a()),bn.push(Ni(e,"25% 0px",s=>{fn=s.isIntersecting,fn&&(_e=!0,Ie())})),bn.push(Di(()=>{Ra=document.hidden,Ra||(_e=!0,Ie())})),bn.push(Ui(()=>{wr=!!$n?.matches,_e=!0,Ie()})),bn.push(Bn(to,s=>{let g=s.fontfaces??[],x=l.font.split(",").map(Co);g.some(b=>x.includes(Co(b.family)))&&ba()})),Hn(),bn.push(()=>{c=null,Hn()});let Ca=s=>{s?.preventDefault(),lt=!0,v||V(),pt&&Yr(Cr),pt=!1},Pa=()=>{lt=!1,v?r=y.gl:V(),O?.reset(),Ge.length=0,Ze=null,D=null,be=ue=C=null,J=null,Le=[],pe=[],Ae=null,Fe=!1,vt=null,at=null,Zt=!1,gn=null,An=!1,ht=null,Pe=null,yt=!1,(s=>{Xa.delete(s)})(r),qt=void 0,Lr=Jn=!1,Me=null,Ke=!1,et=tt=0,ut=!0;try{Go(),_e=!0,Ie()}catch(s){Rn(s)}},Zo={lost:()=>Ca(),restored:Pa,rescale:()=>{yn()&&Ie()},size:()=>[ve,R],bytes:()=>{let s=we?4:8;return ve*R*4+At+(J?J.columns*J.rows*(2*s+(J.glow?16/3:0)):0)+Ne*Xe*s*(Fe?6:Le.length)+(at?at.width*at.height*4:0)}};v?y.join(Zo):(e.addEventListener("webglcontextlost",Ca),e.addEventListener("webglcontextrestored",Pa));let Da=()=>{Qt&&(Qt.pause(),Qt.removeAttribute("src"),Qt.load(),Qt=null),Gt&&Z instanceof HTMLVideoElement&&"cancelVideoFrameCallback"in Z&&Z.cancelVideoFrameCallback(Gt),Gt=0},Ua=()=>{He?.close(),He=null},bl=async s=>{let g=await createImageBitmap(s,{premultiplyAlpha:"none"}),x=[g.width,g.height],b=function(M,F,d,w,_,W,U=8){if(!(d>=16&&w>=16&&M>0&&F>0&&_>0))return 1;let k=U/_/(W==="cover"?Math.min(M/d,F/w):Math.max(M/d,F/w));return k>.5?1:2**-Math.floor(Math.log2(1/k))}(g.width,g.height,ve,R,de.height,l.fit);if(b===1)return{element:g,owned:!0,natural:x};try{return{element:await createImageBitmap(g,{resizeWidth:Math.max(1,Math.round(g.width*b)),resizeHeight:Math.max(1,Math.round(g.height*b)),resizeQuality:"medium",premultiplyAlpha:"none"}),owned:!0,natural:x}}finally{g.close()}},Ia=s=>new Promise((g,x)=>{let b=new Image;b.crossOrigin="anonymous",b.decoding="async",b.onload=()=>g({element:b,owned:!1}),b.onerror=()=>x(new Error("The glyph field could not load this image.")),b.src=s}),ei=(s,g,x)=>{let{element:b,owned:M}=s;if(Et||x!==Jt)return void(M&&b instanceof HTMLVideoElement?(b.pause(),b.removeAttribute("src"),b.load()):M&&b.close());b!==Z&&(Da(),Ua()),Qt=M&&b instanceof HTMLVideoElement?b:null,!M||b instanceof HTMLVideoElement||(He=b);let F=b!==Z;Z=b,Kt=typeof g=="string"||g instanceof HTMLImageElement||g instanceof HTMLVideoElement,_t=b instanceof HTMLVideoElement?b.videoHeight:b instanceof HTMLImageElement?b.naturalHeight:b.height,qe=s.natural?.[0]??(b instanceof HTMLVideoElement?b.videoWidth:b instanceof HTMLImageElement?b.naturalWidth:b.width),mt=s.natural?.[1]??_t,Ct=!0,F&&(Dt=nn=-1/0),b instanceof HTMLVideoElement&&F&&(d=>{let w=d;if(!w.requestVideoFrameCallback)return;let _=()=>{Et||Z!==d||(Ct=!0,Ie(),Gt=w.requestVideoFrameCallback(_))};Gt=w.requestVideoFrameCallback(_)})(b),lt||Zn(),_e=!0,Ie()},ti=(s,g)=>{pn&&s===Jt&&(pn=!1,mn()),Rn(g)},Ba=s=>{let g=++Jt;if(!s)return Da(),Ua(),Z=null,qe=mt=_t=At=0,Kt=!1,_e=!0,Ie(),Promise.resolve();if((x=>!(typeof x=="string"||x instanceof HTMLImageElement&&!x.complete||x instanceof HTMLVideoElement&&x.readyState<2))(s)){try{ei({element:s,owned:!1},s,g)}catch(x){ti(g,x)}return Promise.resolve()}return(async x=>{if(typeof x!="string")return x instanceof HTMLImageElement&&!x.complete?x.decode().then(()=>({element:x,owned:!1})):x instanceof HTMLVideoElement&&x.readyState<2?new Promise((F,d)=>{x.addEventListener("loadeddata",()=>F({element:x,owned:!1}),{once:!0}),x.addEventListener("error",()=>d(new Error("The glyph field could not load this video.")),{once:!0})}):{element:x,owned:!1};if(ss.test(x))return new Promise((F,d)=>{let w=document.createElement("video");w.crossOrigin="anonymous",w.muted=!0,w.loop=!0,w.playsInline=!0,w.preload="auto",w.addEventListener("loadeddata",()=>{w.play().catch(()=>{}),F({element:w,owned:!0})},{once:!0}),w.addEventListener("error",()=>d(new Error("The glyph field could not load this video.")),{once:!0}),w.src=x});if(typeof createImageBitmap!="function"||typeof fetch!="function")return Ia(x);let b;try{b=await(await fetch(x).then(F=>{if(!F.ok)throw new Error("The glyph field could not load this image.");return F})).blob()}catch(F){if(F instanceof Error&&F.message.startsWith("The glyph field"))throw F;return Ia(x)}if(!/svg/i.test(b.type))try{return await bl(b)}catch{}let M=URL.createObjectURL(b);try{return await Ia(M)}finally{URL.revokeObjectURL(M)}})(s).then(x=>ei(x,s,g),x=>ti(g,x))};Go(),Se();let ni=n.source??null;return ni?(Jt=1,Ba(ni)):Ie(),{canvas:e,ready:yl,get settings(){return l},update(s){let g=l,{element:x,rest:b}=a(s);if("clear"in s&&i?.element!==x?.element?(_a(),i=x,_a=x?Wr(x.element,La):()=>{}):"clear"in s&&(i=x),"clear"in s){let d=o(s.clear)?s.clear:null;d!==c&&(c=d,ut=!0,_e=!0,Hn(),Ie())}l=fr(x?{...b,clear:l.clear}:b,l),Se(),s.label&&e.setAttribute("aria-label",s.label),l.maxPixelRatio!==g.maxPixelRatio&&yn(),l.charset===g.charset&&l.cellSize===g.cellSize&&l.cellAspect===g.cellAspect&&l.font===g.font&&l.fontWeight===g.fontWeight&&l.glyphScale===g.glyphScale||(xa(),ba()),l.levels!==g.levels&&Ma(),l.scope===g.scope||lt||(wa(),nn=performance.now());var M,F;((!!g.fluid&&ir(g)==="fluid")!==da()||l.fluid&&g.fluid&&l.fluid.resolution!==g.fluid.resolution)&&So(),"source"in s&&Ba(s.source??null),"live"in s&&(G=!!s.live),"effects"in s&&(M=s.effects??[],F=h,M.length!==F.length||!M.every((d,w)=>d===F[w]))?(Aa(s.effects??[]),lt||kr()):l.mark===g.mark&&pa(l)===Kn||lt||(ue&&!v&&r.deleteProgram(ue.program),Tr=Dn.indexOf(l.mark),Kn=pa(l),ue=Yn(Ka(Tr,Kn))),_e=!0,Ie()},setSource:Ba,pointer(s,g=0){if(s===null)return void Sa(null);let x=e.getBoundingClientRect();Sa(Fa(x.left+s,x.top+g))},redraw(){if(!(Et||lt||Tn)&&ve)try{ha(!(pn&&(v?y.canCompileInParallel:Be)))&&(!G||!Z||Z instanceof HTMLVideoElement||Zn(),Yo(),pn||(_e=!1))}catch(s){Tn=!0,Rn(s)}},pulse(s={}){if(Et||Ft())return;let g=e.getBoundingClientRect();if(!g.width||!g.height)return;let x=s.x??g.width/2,b=s.y??g.height/2;if(s.element){let F=s.element.getBoundingClientRect();x=F.left+F.width/2-g.left,b=F.top+F.height/2-g.top}let M=Math.max(0,Math.min(2,s.strength??1));l.tap==="surface"&&Z&&Kt?kn(x/g.width,b/g.height,M):(K=[...K,{x:x/g.width,y:b/g.height,born:performance.now(),strength:M}].slice(-4),Ie())},play(){st=!1,Z instanceof HTMLVideoElement&&Z.play().catch(()=>{}),_e=!0,Ie()},pause(){st=!0,Z instanceof HTMLVideoElement&&Z.pause()},resize(){yn()&&Ie()},destroy(){if(!Et){if(Et=!0,v||$a--,pt&&Yr(Cr),pt=!1,bn.forEach(s=>s()),L.forEach(s=>s()),v?y.leave(Zo):(e.removeEventListener("webglcontextlost",Ca),e.removeEventListener("webglcontextrestored",Pa)),Da(),Ua(),Z=null,!lt)if(ma(),fa(),r.deleteTexture(P),vt&&r.deleteTexture(vt),gn&&r.deleteTexture(gn),xn?.dispose(),qt?.dispose(),rn&&r.deleteTexture(rn),Me&&r.deleteTexture(Me),v)y.releaseAtlas(D,ga),Ae?.release();else{r.deleteTexture(me);for(let s of[be,ue,C])s&&r.deleteProgram(s.program);Ae?.dispose(),Ge.forEach(s=>r.deleteShader(s)),Oe&&r.deleteVertexArray(Oe),A&&r.getExtension("WEBGL_lose_context")?.loseContext()}D=null}}}}var sr,ds=/\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i,Ri=null;function ms(){if(sr!==void 0)return sr;try{let e=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1).getContext("webgl2"):null;sr=typeof Worker=="function"&&typeof HTMLCanvasElement=="function"&&"transferControlToOffscreen"in HTMLCanvasElement.prototype&&typeof createImageBitmap=="function"&&typeof URL.createObjectURL=="function"&&!!e,e?.getExtension("WEBGL_lose_context")?.loseContext()}catch{sr=!1}return sr}function Ai(e){let n=e.clear,t=typeof HTMLElement=="function"&&(n instanceof HTMLElement||!!n&&typeof n=="object"&&n.element instanceof HTMLElement),a=!!n&&typeof n=="object"&&typeof n.rects=="function",o=e.interactionTarget;return!(e.effects?.length||t||a||o!=null&&o!==window)}var zr=e=>{let{source:n,onError:t,effects:a,interactionTarget:o,worker:i,label:c,...l}=e;return l};function ps(e,n){if(!ms()||!Ai(n))return null;let t={...n},a=fr(zr(t)),o=null,i="",c=!1,l=!1,u=null,m=[],p=(R,ne=[])=>{if(u||c)for(let Re of ne)Re.close?.();else o&&l?o.postMessage(R,ne):m.push({message:R,transfer:ne})},E,T,y=new Promise((R,ne)=>{E=R,T=ne});y.catch(()=>{});let f=R=>{t.onError?t.onError(R):typeof console<"u"&&console.error(R)};e.setAttribute("role","img"),e.setAttribute("aria-label",t.label??"ASCII artwork"),e.dataset.renderer="glyph-field";let v=()=>{let R=e.getBoundingClientRect();return[e.clientWidth||R.width,e.clientHeight||R.height,R.left,R.top]},H=!0,r=()=>({reducedMotion:typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,darkScheme:typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches}),V=!1,xe=()=>{V||(V=!0,requestAnimationFrame(()=>{V=!1,p({type:"box",box:v()})}))},A=[Wr(e,xe),Ni(e,"25% 0px",R=>{H=R.isIntersecting,p({type:"visible",value:H})}),Di(()=>p({type:"hidden",value:document.hidden})),Ui(()=>p({type:"media",...r()})),no(()=>p({type:"media",...r()}))],O=()=>xe(),he=R=>p({type:"pointer",event:R.type,clientX:R.clientX,clientY:R.clientY,pointerType:R.pointerType,buttons:R.buttons}),we=()=>p({type:"pointer",event:"pointerleave",clientX:0,clientY:0});addEventListener("scroll",O,{passive:!0,capture:!0}),addEventListener("resize",O,{passive:!0}),addEventListener("pointermove",he,{passive:!0,capture:!0}),addEventListener("pointerdown",he,{passive:!0,capture:!0}),document.addEventListener("pointerleave",we),A.push(()=>{removeEventListener("scroll",O,{capture:!0}),removeEventListener("resize",O),removeEventListener("pointermove",he,{capture:!0}),removeEventListener("pointerdown",he,{capture:!0}),document.removeEventListener("pointerleave",we)});let Be,me=null,P=0,be=!1,ue=!1,C=0,D=async(R,ne,Re)=>{let de=await R;Re!==P||c?de.close():(ne&&l&&!u&&(ue=!0,C=performance.now()),p({type:"frame",frame:de,streaming:ne},[de]))},J=(R,ne)=>{if(be||ne!==P||ue&&performance.now()-C<500||R instanceof HTMLVideoElement&&R.readyState<2)return;let Re;be=!0;try{Re=R instanceof HTMLVideoElement&&typeof VideoFrame=="function"?new VideoFrame(R):createImageBitmap(R)}catch{return void(be=!1)}D(Re,!0,ne).finally(()=>{be=!1})},Le=()=>{me?.(),me=null},pe=(R,ne)=>{let Re=0,de=!1,Ce=()=>{de||(J(R,ne),Ne())},Ne=()=>{Re="requestVideoFrameCallback"in R?R.requestVideoFrameCallback(Ce):requestAnimationFrame(Ce)};Ne(),me=()=>{de=!0,"cancelVideoFrameCallback"in R?R.cancelVideoFrameCallback(Re):cancelAnimationFrame(Re)}},Ae=null,Fe=()=>{Ae&&(Ae.pause(),Ae.removeAttribute("src"),Ae.load(),Ae=null)},Oe=null,Ze=async R=>{if(u)return u.setSource(R);let ne=++P;if(Le(),Fe(),Oe=null,!R)return Be=void 0,void p({type:"url",url:null});if(typeof R=="string"&&!ds.test(R))return Be=new URL(R,document.baseURI).href,void p({type:"url",url:Be});if(Be=void 0,typeof R=="string"){let Re=document.createElement("video");return Object.assign(Re,{crossOrigin:"anonymous",muted:!0,loop:!0,playsInline:!0,preload:"auto"}),await new Promise((de,Ce)=>{Re.addEventListener("loadeddata",()=>de(),{once:!0}),Re.addEventListener("error",()=>Ce(new Error("The glyph field could not load this video.")),{once:!0}),Re.src=R}).catch(de=>{f(de)}),ne!==P?(Re.removeAttribute("src"),void Re.load()):(Ae=Re,Re.play().catch(()=>{}),void pe(Re,ne))}if(R instanceof HTMLVideoElement)pe(R,ne);else if(R instanceof HTMLCanvasElement)t.live?(Oe=R,((Re,de)=>{let Ce=0,Ne=()=>{Ce=requestAnimationFrame(Ne),H&&!document.hidden&&J(Re,de)};Ce=requestAnimationFrame(Ne),me=()=>cancelAnimationFrame(Ce)})(R,ne)):await D(createImageBitmap(R),!1,ne);else if(R instanceof HTMLImageElement){try{await R.decode()}catch{}await D(createImageBitmap(R),!1,ne)}else await D(createImageBitmap(R),!1,ne)},Ge=()=>{if(!c&&!u){for(let{transfer:R}of m)for(let ne of R)ne.close?.();m.length=0;try{u=Qi(e,{...t,worker:!1}),u.ready.then(E,T)}catch(R){T(R),f(R)}}};(Ri??(Ri=Promise.resolve().then(()=>(ii(),oi)).then(({default:R})=>R||null,()=>null))).then(R=>{if(c)return;if(!R)return void Ge();try{i=URL.createObjectURL(new Blob([R],{type:"text/javascript"})),o=new Worker(i)}catch{return void Ge()}let ne=o,Re=setTimeout(()=>{l||(ne.terminate(),o=null,Ge())},1e4);ne.onerror=de=>{de.preventDefault(),l?f(new Error("The glyph field worker stopped.")):(clearTimeout(Re),ne.terminate(),o=null,Ge())},ne.onmessage=({data:de})=>{if(de.type==="loaded"){if(clearTimeout(Re),c)return;let Ce;try{Ce=e.transferControlToOffscreen()}catch{return ne.terminate(),o=null,void Ge()}l=!0,ne.postMessage({type:"init",canvas:Ce,options:zr(t),ratio:globalThis.devicePixelRatio||1,box:v(),hidden:document.hidden,visible:H,...r(),streaming:!!Oe||!!me,url:Be},[Ce]);for(let{message:Ne,transfer:Xe}of m.splice(0))ne.postMessage(Ne,Xe)}else de.type==="took"?ue=!1:de.type==="ready"?E():de.type==="error"?f(new Error(String(de.message))):de.type!=="atlas"&&de.type!=="shapes"||(async Ce=>{let Ne=document.fonts,Xe=Ce.settings;try{await Ne?.load(`${Xe.fontWeight} 16px ${Xe.font}`,Xe.charset)}catch{}if(!c&&!u)if(Ce.type==="atlas"&&Ce.layout){let{image:$e}=Qr(Xe,Ce.layout,!1),Z=await createImageBitmap($e);$e.width=$e.height=1,p({type:"atlas",key:Ce.key,image:Z},[Z])}else{let $e=Yi(Xe);p({type:"shapes",key:Ce.key,data:$e},[$e.buffer])}})(de)}}),t.source!=null&&Ze(t.source);let ve=(R,...ne)=>{u?u[R](...ne):p({type:"call",method:R,args:ne})};return{canvas:e,ready:y,get settings(){return u?u.settings:a},update(R){if(u)return void u.update(R);Ai({...t,...R})||f(new Error("This change needs the page (effects, an element clear zone or another interaction target); the field in a worker leaves it out.")),t={...t,...R},a=fr(zr(t));let ne=zr(R);p({type:"update",options:ne}),"source"in R?Ze(R.source??null):"live"in R&&Oe===null&&t.live&&Ze(t.source??null)},setSource:R=>(t={...t,source:R},Ze(R)),pointer(R,ne){ve("pointer",R,ne)},redraw(){Oe&&(be=!1,ue=!1,J(Oe,P)),ve("redraw")},pulse(R={}){let{element:ne,...Re}=R;if(ne){let de=ne.getBoundingClientRect(),Ce=e.getBoundingClientRect();ve("pulse",{...Re,x:de.left+de.width/2-Ce.left,y:de.top+de.height/2-Ce.top})}else ve("pulse",Re)},play(){ve("play")},pause(){ve("pause")},resize(){u?u.resize():p({type:"box",box:v()})},destroy(){if(c)return;u&&u.destroy(),p({type:"destroy"}),c=!0,P++,Le(),Fe(),A.forEach(ne=>ne());let R=o;R&&setTimeout(()=>R.terminate(),1e3),i&&URL.revokeObjectURL(i)}}}function Zr(e,n={}){if(n.worker){let t=ps(e,n);if(t)return t}return Qi(e,n)}var co={standard:{label:"Classic ASCII",chars:" .:-=+*#%@"},asciify:{label:"Asciify",chars:" .:-=+YCIFSA#@"},minimal:{label:"Minimal",chars:" .:+"},detailed:{label:"Detailed",chars:" .,:;-~=+*xX#%@"},letters:{label:"Letters",chars:" .liLTYCFSAWM"},technical:{label:"Technical",chars:" ._:;+/>=][{}*$#@"},blocks:{label:"Tonal blocks",chars:" \u2591\u2592\u2593\u2588"},braille:{label:"Braille",chars:" \u2801\u2803\u2807\u2847\u28C7\u28E7\u28F7\u28FF"},fish:{label:"Fish",chars:" .'-,:;txoSX%#8@"},kanji:{label:"Kanji (Japanese)",chars:" \u4E00\u4E8C\u4EBA\u5C0F\u5927\u4E2D\u65E5\u672C\u76EE\u7530\u9577\u9593\u8A9E\u66F8\u66DC\u9A5A\u9727"}};function fo(e){if(e)return Object.prototype.hasOwnProperty.call(co,e)?co[e].chars:e.startsWith(" ")?e:" "+e}var gs={ascii:{mark:"glyph",charset:" .:-=+*#%@"},blocks:{mark:"glyph",charset:" \u2591\u2592\u2593\u2588"},braille:{mark:"glyph",charset:" \u2801\u2803\u2807\u2847\u28C7\u28E7\u28F7\u28FF"},dots:{mark:"dot"},lines:{mark:"glyph",charset:" -\u2550\u256A\u256C"},cross:{mark:"glyph",charset:" \xB7+xX#"},diagonal:{mark:"glyph",charset:" /\u2571\u2573"},diamond:{mark:"glyph",charset:" \xB7\u25C7\u25C8\u25C6"},mixed:{mark:"glyph",charset:" .:+/\u25C7#@"},pixel:{mark:"pixel"},mosaic:{mark:"mosaic"},lego:{mark:"lego"},voxel:{mark:"voxel"},disco:{mark:"disco"},dither:{mark:"dither"},hex:{mark:"hex"},led:{mark:"led"},cmyk:{mark:"cmyk"},stipple:{mark:"stipple"},engraving:{mark:"engraving"},crosshatch:{mark:"crosshatch"},woodblock:{mark:"woodblock"},risograph:{mark:"risograph"},pointillism:{mark:"pointillism"}};var vs=/\p{L}/u,xs=new Set(Object.values(co).map(e=>e.chars));var ys=new Set(["glyph","inlay"]),mr=e=>ys.has(e??"glyph"),bs=e=>({cellSize:Math.max(7,e.cellSize??8),cellAspect:.62,glyphScale:.9}),al=new WeakSet,ol=e=>{al.add(e)},mo=e=>e&&!al.has(e)?e.current.charset:void 0;function po(e,n){let t=fo(n);if(!t)return e;if(mr(e.mark))return{...e,charset:t,...ho(t,e)};let a={...e,...bs(e)};return{...a,mark:"glyph",charset:t,...ho(t,a)}}var ea=null;var Ji=new Set;var Zi=12,ct=new Set,jt=null,gr=null,na=0,pr=-1e9,ra=0,aa=0,io=!1,lo=!1,Ms=()=>{let e=gr?.timeline?.currentTime;return typeof e=="number"?e:null};var so=()=>typeof performance<"u"?performance.now():Date.now(),go=()=>typeof innerHeight=="number"?innerHeight:0;function ia(e,n=e.getBoundingClientRect()){if(e.isConnected===!1||typeof e.getClientRects=="function"&&e.getClientRects().length===0)return 1/0;let t=n.bottom<0?-n.bottom:n.top-go();return t>0?t:0}function ws(){try{let e=gr?.querySelectorAll?.("dialog:modal");return e?.length?e[e.length-1]:null}catch{return null}}var Es=1e8;function il(e,n){if(e.eager)return void(e.wanted=!0);let t=go(),a=ia(e.host,n);!t||a<=2*t?e.wanted=!0:a>3*t&&(e.wanted=!1)}function Ts(e){let n=!1;for(let t of e)if(t?.target)for(let a of ct)a.host===t.target&&(il(a,t.boundingClientRect??void 0),n=!0);n&&Gn()}var el=()=>Gn(),la=0,oa=0,tl=()=>{let e=typeof scrollY=="number"?scrollY:0;e!==oa&&(la=e>oa?1:-1),oa=e};function ks(e,n){return!n||!la||e.getBoundingClientRect().top>0==la>0?n:2*n}var ta=null,ll=e=>{ta!==e&&(ta?.removeEventListener?.("close",el,!0),ta?.removeEventListener?.("scroll",tl,!0),e?.addEventListener?.("close",el,!0),e?.addEventListener?.("scroll",tl,{capture:!0,passive:!0}),ta=e)},uo=new WeakSet,On=0;function vo(){On||typeof requestIdleCallback!="function"||(On=requestIdleCallback(Rs,{timeout:2e3}))}function Rs(e){On=0;let n=[...ct].filter(t=>!t.live&&t.prewarm&&!uo.has(t)).sort((t,a)=>ia(t.host)-ia(a.host));for(let t of n){if(e.timeRemaining()<2&&!e.didTimeout)return void vo();uo.add(t);try{t.prewarm()}catch{}}}function As(e){gr!==e.doc&&(gr=e.doc,ct.clear(),na=ra=aa=la=0,pr=-1e9,oa=typeof scrollY=="number"?scrollY:0),ll(gr),ct.add(e);let n=function(){let t=typeof IntersectionObserver=="function"?IntersectionObserver:null;if(!t)return null;if(jt?.ctor!==t){jt?.list.forEach(a=>a.disconnect()),jt={ctor:t,list:["200% 0px","300% 0px","0px"].map(a=>new t(Ts,{rootMargin:a}))};for(let a of ct)jt.list.forEach(o=>o.observe(a.host))}return jt.list}();n?.forEach(t=>t.observe(e.host)),n?il(e):e.wanted=!0,Gn(),e.live||vo()}function Gn(e=!1){if(io)lo=!0;else{io=!0;try{do{lo=!1;let n=so(),t=Ms();(e||(t===null?n-pr>16||n<pr:t!==pr))&&(pr=t??n,ra=aa=0);for(let f of ct)f.host.isConnected===!1&&(f.wanted=!1);for(let f of ct)f.live&&!f.wanted&&f.release();let a=[...ct].filter(f=>f.live&&!f.shared),o=ws(),i=f=>!!o&&!o.contains(f.host),c=f=>ia(f.host)+(i(f)?Es:0),l=f=>f.eager&&!i(f),u=()=>a.filter(f=>f.live&&!f.shared).map(f=>[f,c(f)+(l(f)?0:1e9)]).sort((f,v)=>v[1]-f[1]);for(let f=a.length-Zi,v=f>0?u():[];f>0;f--)v.shift()?.[0].release();let m=qi(),p=1*go(),E=()=>[...ct].filter(f=>f.live&&f.shared&&c(f)>p).sort((f,v)=>c(v)-c(f));if(m?.overBudget)for(let f of E()){if(!m.overBudget)break;f.release()}let T=[...ct].filter(f=>f.wanted&&!f.live).map(f=>[f,f.eager?-1:c(f)]).map(([f,v])=>[f,v,v>0?ks(f.host,v):v]).sort((f,v)=>f[2]-v[2]),y=0;for(let[f,v]of T){if(!ct.has(f)||f.live)continue;if(m&&!m.roomy){let r=E()[0];if(!r||c(r)<=c(f)||(r.release(),!m.roomy))break}if(!f.eager&&(ra>=4||aa>=2)&&(!e||y)){na||(na=requestAnimationFrame(()=>{na=0,Gn(!0)}));break}if(a.filter(r=>r.live&&!r.shared).length>=Zi){let r=u()[0]?.[0];if(!r||(l(r)?!f.eager||c(r)<=c(f):!f.eager&&c(r)<=v))break;r.release()}let H=so();f.mount(),ra+=so()-H,y++,f.eager||aa++,f.live&&!f.shared&&a.push(f)}}while(lo)}finally{io=!1}}}var sl='ui-monospace, "SF Mono", Menlo, Consolas, monospace',nl=new Map,Fs=".:-=+*#%@";function Ss(e,n=sl){let t=`${n}\0${e}`,a=nl.get(t);if(a)return a;let o={max:1,mean:1};try{let i=typeof document>"u"?null:Object.assign(document.createElement("canvas"),{width:48,height:48}).getContext("2d",{willReadFrequently:!0});if(i&&typeof i.getImageData=="function"){i.font=`500 36px ${n}`,i.textAlign="center",i.textBaseline="middle";let c=T=>{i.clearRect(0,0,48,48),i.fillStyle="#000",i.fillText(T,24,25);let y=i.getImageData(0,0,48,48).data,f=0;for(let v=3;v<y.length;v+=4)f+=y[v];return f/255},l=T=>[...T].filter(y=>y.trim()).map(c),u=T=>T.reduce((y,f)=>y+f,0)/Math.max(1,T.length),m=l(e),p=l(Fs),E=c("@");m.length&&E>0&&u(p)>0&&(o={max:Math.max(...m)/E,mean:u(m)/u(p)})}}catch{}return nl.set(t,o),o}function ho(e,n){let{max:t,mean:a}=Ss(e,n.font??sl),o=n.glyphScale??.8,i=n.gamma??1,c=n.fontWeight??500;return t>1.15?{glyphScale:Math.max(.3,o*Math.max(.62,t**-.36)),gamma:i,fontWeight:c}:a>1.5?{glyphScale:Math.max(.3,o*a**-.25),gamma:i,fontWeight:c}:t<.85?{glyphScale:Math.min(1.6,o*Math.min(1.3,t**-.3)),gamma:i,fontWeight:t<.6?Math.max(c,700):c}:{glyphScale:o,gamma:i,fontWeight:c}}var Nn=new WeakMap;function xo(e,n){for(let t of Nn.get(e)?.keys()??[])t.getAttribute("src")!==n&&(t.src=n)}function yo(e){let n=Nn.get(e);Nn.delete(e),n?.forEach(t=>t())}function bo(e,n,t,a,o){let i=document.createElement("img");i.alt="",i.decoding="async",i.setAttribute("aria-hidden","true"),i.setAttribute("style",`${t};object-fit:cover`),i.style.opacity="1",i.dataset.asciiPoster="",i.src=n;let c=e.style.getPropertyValue("position"),l=typeof getComputedStyle=="function"&&getComputedStyle(e).position==="static";l&&e.style.setProperty("position","relative");let u=e.style.getPropertyValue("isolation"),m=/z-index:\s*-1/.test(t)&&typeof getComputedStyle=="function"&&getComputedStyle(e).isolation==="auto";m&&e.style.setProperty("isolation","isolate"),o?.parentElement===e?e.insertBefore(i,o):e.appendChild(i);let p=!1,E=()=>{p||(p=!0,i.remove(),Nn.get(a)?.delete(i),l&&(c?e.style.setProperty("position",c):e.style.removeProperty("position")),m&&(u?e.style.setProperty("isolation",u):e.style.removeProperty("isolation")))},T=Nn.get(a)??new Map;return T.set(i,E),Nn.set(a,T),{show(y){i.style.opacity=y?"1":"0"},remove:E}}function rl(e){let n=document.createElement("canvas");for(let t of e.getAttributeNames?.()??[])t!=="width"&&t!=="height"&&n.setAttribute(t,e.getAttribute(t));return n.style.cssText=e.style.cssText,Object.assign(n.dataset,e.dataset),e.replaceWith?e.replaceWith(n):e.parentElement&&(e.parentElement.insertBefore(n,e),e.remove()),n}function cl(e){let{host:n,kit:t}=e,a,o=e.canvas,i=null,c=!1,l=!1,u=!1,m=!1,p={},E={},T=e.source,y=!1,f={},v=null,H=null,r=!1,V=null,xe=()=>{},A=!e.ownPoster&&t?.current.poster?bo(n,t.current.poster,e.place,t,o):null,O=()=>{if(!ea||t?.current.globalLook===!1||t?.current.charset||!mr(E.mark)&&!e.glyphs||E.glyphOrder!=="scatter"&&!xs.has(E.charset??"")&&vs.test(E.charset??""))return;let C=ea.style?gs[ea.style]:void 0,D=C?.mark??(mr(E.mark)?E.mark??"glyph":"glyph"),J=mr(D)?ea.charset||(C&&"charset"in C?C.charset:void 0):void 0;return C||J?{mark:D,charset:J}:void 0},he=()=>({...e.glyphs?Object.fromEntries(Object.keys(e.glyphs()).map(C=>[C,E[C]]).filter(([,C])=>C!==void 0)):{},mark:E.mark??"glyph",charset:E.charset??" .,:-=+*#%@",glyphScale:E.glyphScale??.8,gamma:E.gamma??1,fontWeight:E.fontWeight??500}),we=C=>{if(!C.charset)return{...he(),mark:C.mark};let D=e.glyphs&&!mr(E.mark)?e.glyphs():{};return{...D,mark:C.mark,charset:C.charset,...ho(C.charset,{...E,...D})}},Be=()=>{let C=O(),D=C&&`${C.mark}\0${C.charset??""}`;return D===a?null:(a=D,C?we(C):he())},me={host:n,doc:document,eager:t?.current.lazy===!1,wanted:!1,live:!1,poster:!!A||!!e.ownPoster,mount(){if(l||i)return;c&&(o=e.canvas=rl(o)),c=!0,E={...e.options(),...p},a=void 0;let C=Be(),D;try{D=Zr(o,{...E,...C,...T===void 0?{}:{source:T},onError:()=>{i===D&&P()}})}catch{return void P()}i=D,me.live=!0,me.shared=zi(o);let J=o;if(me.shared)xe=()=>{};else{let Le=0,pe=()=>{i===D&&(A?.show(!0),clearTimeout(Le),Le=setTimeout(()=>{i===D&&o===J&&(me.release(),Gn())},1e3))},Ae=()=>{clearTimeout(Le),requestAnimationFrame(()=>requestAnimationFrame(()=>{i===D&&A?.show(!1)}))};J.addEventListener?.("webglcontextlost",pe),J.addEventListener?.("webglcontextrestored",Ae),xe=()=>{clearTimeout(Le),J.removeEventListener?.("webglcontextlost",pe),J.removeEventListener?.("webglcontextrestored",Ae)}}y&&D.pause(),D.ready.then(()=>{i===D&&(r=!0,A?.show(!1),v?.(),v=H=null)},()=>{}),e.onMount?.(D,o)},release(){if(!i)return;let C=i;i=null,me.live=!1,r=!1,xe(),V?.clear(),V=null,f=C.settings,C.destroy(),me.shared?l||(o.width=o.width,c=!1):((D=>{try{let J=D.getContext("webgl2");J&&!J.isContextLost?.()&&J.getExtension("WEBGL_lose_context")?.loseContext()}catch{}})(o),l||(o=e.canvas=rl(o),c=!1)),A?.show(!0),e.onRelease?.()},prewarm(){if(l||i)return;E={...e.options(),...p};let C=O();Ki(o,{...E,...C?we(C):{}})}};function P(){u||(u=!0,be(),m||e.onFail())}function be(){l||(l=!0,me.release(),function(C){ct.delete(C)&&([...ct].some(D=>D.host===C.host)||jt?.list.forEach(D=>D.unobserve(C.host)),!ct.size&&jt&&(jt.list.forEach(D=>D.disconnect()),jt=null),ct.size||(ll(null),On&&typeof cancelIdleCallback=="function"&&cancelIdleCallback(On),On=0),Gn())}(me),Ji.delete(ue),o.remove(),u?A?.show(!0):A?.remove())}let ue={relook(){i||(pe=>{uo.delete(pe),ct.has(pe)&&vo()})(me);let C=Be();if(!C||!i)return;let D=i,J=r&&!(t?.current.reducedMotion??(typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches));V?.clear(),V=null,J&&(D.redraw(),V=function(pe,Ae){if(!pe.width||!pe.height||typeof document>"u")return null;let Fe=document.createElement("canvas");Fe.width=pe.width,Fe.height=pe.height;let Oe=Fe.getContext("2d");if(!Oe||typeof Fe.animate!="function")return null;try{Oe.drawImage(pe,0,0)}catch{return null}Fe.setAttribute("aria-hidden","true"),Fe.dataset.asciiSweep="",Fe.setAttribute("style",Ae);let Ze=document.createElement("span"),Ge,ve;Ze.setAttribute("aria-hidden","true"),Ze.dataset.asciiSweep="",Ze.setAttribute("style",`${Ae};right:auto;width:2px;margin-left:-1px;opacity:0;background:var(--ascii-sweep, #f3ba32);box-shadow:0 0 10px 1px color-mix(in srgb, var(--ascii-sweep, #f3ba32) 40%, transparent)`),pe.after(Fe,Ze);let R=()=>{Ge?.cancel(),ve?.cancel(),Fe.remove(),Ze.remove()};return{clear:R,reveal(){if(!Fe.isConnected)return;let ne={duration:200,delay:40,easing:"cubic-bezier(.23,1,.32,1)",fill:"both"};Ge=Fe.animate([{clipPath:"inset(0% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 100%)"}],ne);let Re=pe.clientWidth||pe.getBoundingClientRect().width;ve=Ze.animate([{transform:"translateX(0px)",opacity:.35},{opacity:.35,offset:.7},{transform:`translateX(${Re}px)`,opacity:0}],ne),Ge.onfinish=R}}}(o,e.place)),D.update(C);let Le=V;Le&&requestAnimationFrame(()=>requestAnimationFrame(()=>{V===Le&&i===D?Le.reveal():Le.clear()}))}};return{field:{get canvas(){return o},get ready(){return i?i.ready:H??(H=new Promise(C=>{v=C}))},get settings(){return i?.settings??f},update(C){if(p={...p,...C},E={...E,...C},!i)return;let D=Be(),J=O();i.update(J?{...C,...we(J)}:D?{...C,...D}:C)},setSource:C=>(T=C,i?i.setSource(C):Promise.resolve()),pointer(C,D){i?.pointer(C,D)},redraw(){i?.redraw()},pulse(C){i?.pulse(C)},play(){y=!1,i?.play()},pause(){y=!0,i?.pause()},resize(){i?.resize()},destroy(){be()}},get canvas(){return o},get live(){return!!i},get failed(){return u},start(){Ji.add(ue),m=!0;try{As(me)}finally{m=!1}},destroy:be}}var Ls=(e,n=0,t=1)=>Math.min(t,Math.max(n,e));var $t,sa=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;var Mo={scene:"none",background:"transparent",color:"ink",levels:"none",fit:"cover",focus:{x:.5,y:.5},vignette:0,drift:0,hover:"none",shade:0,contrast:1,brightness:0,gamma:1,maxPixelRatio:2,clear:!1};function vr(e,n,t){let a=(e??"").trim(),o=/^var\(\s*(--[\w-]+)\s*(?:,\s*(.+))?\)$/.exec(a);if(o?a=ul(n,o[1])||(o[2]??"").trim():a.startsWith("--")&&(a=ul(n,a)),!a)return t?vr(t,n):null;if(/^#[\da-f]{6}$/i.test(a))return a.toLowerCase();if(/^#[\da-f]{3}$/i.test(a))return`#${[...a.slice(1)].map(m=>m+m).join("")}`.toLowerCase();let i=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(a);if(i)return hl([+i[1],+i[2],+i[3]]);if($t===void 0)try{$t=typeof document>"u"?null:Object.assign(document.createElement("canvas"),{width:1,height:1}).getContext("2d",{willReadFrequently:!0})}catch{$t=null}if(!$t)return t?vr(t,n):null;$t.clearRect(0,0,1,1),$t.fillStyle="#000",$t.fillStyle=a,$t.fillRect(0,0,1,1);let[c,l,u]=$t.getImageData(0,0,1,1).data;return hl([c,l,u])}var ul=(e,n)=>typeof getComputedStyle=="function"?getComputedStyle(e).getPropertyValue(n).trim():"",hl=e=>`#${e.map(n=>Math.round(Ls(n,0,255)).toString(16).padStart(2,"0")).join("")}`,_s=e=>{let n=parseInt(e.slice(1,7),16);return[n>>16&255,n>>8&255,255&n]};function wo(e){let n=typeof getComputedStyle=="function"?getComputedStyle(e):null,t=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?/i.exec(n?.backgroundColor??"");if(t&&(t[4]===void 0?1:t[4].endsWith("%")?parseFloat(t[4])/100:parseFloat(t[4]))>=.5)return .2126*+t[1]+.7152*+t[2]+.0722*+t[3]<128;let a=vr(n?.color??"",e);if(!a)return typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches;let[o,i,c]=_s(a);return .2126*o+.7152*i+.0722*c>140}function fl(){let e=[];return{set(n,t,a){e.some(([o,i])=>o===n&&i===t)||e.push([n,t,n.style.getPropertyValue(t)]),n.style.setProperty(t,a)},restore(){for(let[n,t,a]of e.reverse())a?n.style.setProperty(t,a):n.style.removeProperty(t);e.length=0}}}function Eo(e,n){let t={...e,...n},a=e.look,o=n.look;return o&&(t.look=Object.fromEntries(Object.entries({...a,...o}).filter(([,i])=>i!==void 0))),t}var En=(e,n,t,a)=>typeof e=="number"&&Number.isFinite(e)?Math.min(a,Math.max(t,e)):n;function dl(e){return e==="dots"?" \xB7\u2219\u2022\u25CF":fo(e)}function To(e,n){if(!n||!n.preset||typeof n.preset.mount!="function")throw new TypeError("background() needs a preset, such as `aurora` imported from asciify-engine/kit.");let t=n.preset,a=n.poster,o=A=>({...A,poster:A.preset===t?a:void 0}),i={current:o({...n})};ol(i);let c=null,l=!1,u=!1,m=new Set,p=()=>{let A=i.current,O=A.preset;return{speed:En(A.speed,O.speed,0,5),cellSize:En(A.cellSize,O.cellSize,3,96),charset:dl(A.charset),cursor:A.look?.hover!=="none"&&(A.cursor??O.cursor),tap:A.tap==="ring"||A.tap==="surface"?A.tap:void 0,mark:A.mark==="glyph"||A.mark==="dot"?A.mark:void 0,clear:A.clear??!1,clearMap:{padding:En(A.clearPadding,8,0,400),softness:En(A.clearSoftness,28,0,600),strength:En(A.clearStrength,.85,0,1)},dither:En(A.dither,0,0,1),accent:A.accent,text:A.text?.trim()||"ASCIIFY",look:A.look}},E=A=>{let O=i.current,he=O.palette;return(typeof he=="string"?he:he?.[A?"dark":"light"])??O.color??O.ink},T=()=>String(En(i.current.opacity,i.current.preset.opacity??1,0,1)),y=()=>!!(i.current.reducedMotion??sa()),f=A=>{let O=null;if(O=i.current.preset.mount({host:e,kit:i,settings:p,ink:E,reducedMotion:()=>i.current.reducedMotion,onFail:()=>{c===O&&(c=null)}}),!O)return null;let he=O.canvas.style;return A&&(he.opacity="0",he.transition="opacity 320ms cubic-bezier(.16, 1, .3, 1)",O.canvas.offsetWidth),he.opacity=T(),l&&O.pause(),O},v={position:e.style.getPropertyValue("position"),isolation:e.style.getPropertyValue("isolation")},H=(A,O)=>{O?e.style.setProperty(A,O):e.style.removeProperty(A)},r=!1,V=A=>{r=!0,A.destroy(),c&&!u&&(typeof getComputedStyle=="function"&&getComputedStyle(e).position==="static"&&e.style.setProperty("position","relative"),e.style.setProperty("isolation","isolate"))},xe=A=>{if(u||!A||typeof A.mount!="function"||A===i.current.preset)return;i.current=o({...i.current,preset:A});let O=c;c=f(!!O&&!y()),O&&(he=>{if(y())return void V(he);he.canvas.style.transition="opacity 320ms cubic-bezier(.16, 1, .3, 1)",he.canvas.style.opacity="0";let we={run:he,timer:setTimeout(()=>{m.delete(we),V(he)},340)};m.add(we)})(O)};return c=f(!1),{get supported(){return!!c&&!u},get field(){return u?null:c?.field??null},get preset(){return i.current.preset},update(A){if(u||!A)return;let{preset:O,...he}=A;"poster"in he&&(a=he.poster),i.current=o(Eo(i.current,he)),he.poster&&i.current.poster&&xo(i,he.poster),O&&O!==i.current.preset?xe(O):c&&(c.canvas.style.opacity=T(),c.refresh())},play(){!u&&l&&(l=!1,c?.play())},pause(){u||(l=!0,c?.pause())},setPreset:xe,destroy(){if(!u){u=!0;for(let A of m)clearTimeout(A.timer),A.run.destroy(),r=!0;m.clear(),c?.destroy(),c=null,r&&(H("position",v.position),H("isolation",v.isolation)),yo(i)}}}}function ca(e,n,t=!1){let a=e.clear;return typeof a=="function"||Array.isArray(a)?{rects:a,...e.clearMap}:a?{element:a,...n}:t}function ml(e){let{host:n,layer:t="under",kit:a}=e;if(typeof document>"u")return null;let o=`position:absolute;inset:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;z-index:${t==="under"?-1:"auto"}`;if(!Jr())return a?.current.poster&&!e.ownPoster&&bo(n,a.current.poster,o,a),null;let i=fl(),c=document.createElement("canvas");getComputedStyle(n).position==="static"&&i.set(n,"position","relative"),t==="under"&&i.set(n,"isolation","isolate"),c.dataset.asciiKit="",c.setAttribute("style",o),n.appendChild(c);let l=wo(n),u=!1,m=()=>{let V=e.reducedMotion();return V===!0?{speed:0,drift:0,respectReducedMotion:!0}:{respectReducedMotion:V!==!1}},p=()=>vr(e.ink(l),n,l?"#d8d6cf":"#1d1d1b")??"#888888",E=cl({host:n,canvas:c,kit:a,place:o,ownPoster:e.ownPoster,glyphs:e.glyphs,source:e.source??null,options:()=>({...po({...Mo,...e.look(l)},mo(a)),...m(),ink:p(),interactionTarget:n,label:e.label??""}),onMount:(V,xe)=>{e.label||(xe.removeAttribute("role"),xe.removeAttribute("aria-label"),xe.setAttribute("aria-hidden","true")),e.onMount?.()},onRelease:e.onRelease,onFail:()=>{r(),e.onFail?.()}}),T=E.field,y=!1,f=()=>{u||(l=wo(n),T.update({...po({...Mo,...e.look(l)},mo(a)),...m(),ink:p()}))},v=()=>{y=!1,f()},H=no(()=>{y||u||(y=!0,$r(v))});function r(){u||(u=!0,y&&Yr(v),H(),E.destroy(),i.restore())}return E.start(),E.failed?(r(),null):{field:T,get canvas(){return E.canvas},get live(){return E.live},dark:()=>l,still:()=>!!(e.reducedMotion()??sa()),refresh:f,destroy:r}}var Cs=(e,n)=>e.cursor===!1?"none":typeof e.cursor=="string"?e.cursor:n;function Ps(e,n,t,a){let o=null;if(o=ml({host:e.host,kit:e.kit,layer:"under",glyphs:a&&(()=>a(e.settings())),look:c=>{let l=e.settings();return{...n(l,c),...l.look}},ink:c=>e.ink(c)??(c?t.dark:t.light),reducedMotion:e.reducedMotion,onFail:()=>{o=null,e.onFail()}}),!o)return null;let i=o.canvas;return{get field(){return o?.field??null},get canvas(){return o?.canvas??i},refresh(){o?.refresh()},play(){o?.field.play()},pause(){o?.field.pause()},destroy(){o?.destroy(),o=null}}}var gl=()=>typeof innerWidth=="number"&&innerWidth<760,Ds={light:"#86847e",dark:"#7c7a74"},vl={light:"#8f8d86",dark:"#64625d"},Us=(e,n)=>e.mark??(e.charset||e.look?.charset?"glyph":n),pl=e=>({font:'"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace',fontWeight:400,cellSize:e.cellSize,cellAspect:.62,glyphScale:.86}),Is=e=>({cellSize:e.cellSize,cellAspect:1,dotScale:.68}),Bs={x:.18,y:.2,width:.64,height:.6,feather:.3,shape:"ellipse",pointer:.8};function xl(e){let{scene:n,charset:t,hover:a,middle:o=Bs,feather:i=.3,graphite:c=Ds}=e,l=e.mark??"glyph";return{id:e.id,name:e.name,description:e.description,cellSize:e.cellSize,speed:e.speed??1,cursor:e.cursor??!0,opacity:e.opacity,mount(u){let m=Ps(u,(T,y)=>{let f=Us(T,l);return{scene:n,color:"ink",shade:0,background:"transparent",vignette:0,speed:T.speed,maxPixelRatio:2,levels:"none",blend:"on",...f==="dot"?{mark:"dot",...Is(T)}:{mark:"glyph",charset:T.charset??t,...pl(T)},hover:Cs(T,a),lantern:{radius:.16,strength:.75,trail:.9,follow:9},trail:{strength:1,radius:.42},fluid:{radius:.09,refraction:.03,glow:.6},clear:ca(T,{padding:0,feather:i,shape:"ellipse",pointer:.8},o),...e.tune?.(T,y)}},c,l==="dot"?T=>({...pl(T),charset:t}):void 0);if(!m||!e.extra)return m;let p=e.extra(u,m),E=m.destroy.bind(m);return Object.assign(m,{destroy(){p(),E()}})}}}var ko=xl({id:"drift",name:"Drift",description:"Characters that drift slowly in broad lobes and stay clear around your content.",cellSize:11,scene:"drift",charset:" .:-=+*#",hover:"trail",graphite:vl,middle:!1,feather:.2,tune:e=>({scale:gl()?e.mark==="dot"?1.8:1.6:1,brightness:e.mark==="dot"?0:.05,blend:"auto",lantern:{radius:.16,strength:.35,trail:.6,follow:9},trail:{strength:.9,radius:e.mark==="dot"?.4:.32},...e.clear?{clear:ca(e,{padding:32,feather:.2,shape:"rect"})}:{}})});var xr=document.querySelector(".hero");if(xr){let e=[".hero__title",".hero__offer",".hero__cta"].map(i=>xr.querySelector(i)).filter(Boolean),n=null,t=()=>{n=null},a=()=>n??(n=e.map(i=>i.getBoundingClientRect()));addEventListener("scroll",t,{passive:!0}),addEventListener("resize",t);let o=null;try{o=To(xr,{preset:ko,clear:a,color:"#3acf6a",speed:1,cellSize:11,opacity:1,dither:0,mark:"glyph",cursor:"trail"})}catch(i){o=null,console.warn("Asciify background could not start; keeping the pixel field.",i)}o&&o.supported!==!1&&(xr.querySelector(".px--hero")?.remove(),xr.classList.add("has-asciify")),addEventListener("pagehide",i=>{i.persisted||(o?.destroy(),removeEventListener("scroll",t),removeEventListener("resize",t))}),window.__asciifyHero=o}var Yt=document.querySelector(".close");if(Yt&&Jr()){let e=matchMedia("(prefers-reduced-motion: reduce)").matches,n=["M 93.9,67.1 C 92.9,79.9 73.6,90 50,90 26.4,90 7.1,79.9 6.1,67.1 Z","m 92.2,59.4 c 0.5,0.9 0.8,1.8 1.1,2.7 H 6.7 C 7,61.2 7.3,60.3 7.8,59.5 8.3,58.5 8.3,57.3 7.6,56.3 5.8,53.6 4.8,50.4 4.8,46.9 c 0,-9.4 7.6,-17 17,-17 7.2,0 13.4,4.5 15.9,10.9 0.5,1.3 1.8,2.1 3.1,1.9 3,-0.3 6.1,-0.5 9.2,-0.5 3.2,0 6.3,0.2 9.2,0.5 1.3,0.2 2.6,-0.6 3.1,-1.8 C 65,33.8 72.1,29 80.2,30 c 7.8,0.9 14.1,7.3 14.9,15.1 0.4,4.1 -0.7,8 -2.8,11.1 -0.6,1 -0.6,2.2 -0.1,3.2 z","m 65.5,14.8 -7.8,3.9 c -0.3,0.1 -0.6,0.1 -0.8,-0.2 l -6.5,-8.3 c -0.3,-0.3 -0.7,-0.3 -1,0 l -6.2,8.5 C 43,18.9 42.7,19 42.4,18.9 l -8,-4.1 c -0.5,-0.2 -1,0.2 -0.9,0.7 L 36.7,29 c 0.1,0.5 0.6,0.9 1.1,0.9 h 24.5 c 0.5,0 1,-0.4 1.1,-0.9 l 3.1,-13.5 c 0,-0.5 -0.5,-0.9 -1,-0.7 z"].map(f=>new Path2D(f)),t=.25,a=document.createElement("canvas"),o=a.getContext("2d"),i={x:0,y:0,tx:0,ty:0,blink:1},c=null,l=()=>{let f=Yt.getBoundingClientRect(),v=Yt.querySelector(".close__cta")?.getBoundingClientRect();a.width=Math.max(1,Math.round(f.width*t)),a.height=Math.max(1,Math.round(f.height*t));let H=Math.min(660,f.width*.62)*t,r=H/92,V=v?(v.bottom-f.top+48)*t:a.height*.55;c={s:r,ox:a.width/2-50*r,oy:V-9.6*r,r:f}},u=()=>{if(!c)return;let{s:f,ox:v,oy:H}=c,r=a.width,V=a.height;o.setTransform(1,0,0,1,0,0),o.fillStyle="#000",o.fillRect(0,0,r,V);for(let A of[0,r]){let O=o.createRadialGradient(A,V*.62,0,A,V*.62,r*.24);O.addColorStop(0,"rgba(255,255,255,0.32)"),O.addColorStop(1,"rgba(255,255,255,0)"),o.fillStyle=O,o.fillRect(0,0,r,V)}o.setTransform(f,0,0,f,v,H);let xe=o.createLinearGradient(0,10,0,90);xe.addColorStop(0,"#fff"),xe.addColorStop(1,"#fff"),o.fillStyle=xe,n.forEach(A=>o.fill(A));for(let A of[21.8,78.2])o.save(),o.translate(A,46.9),o.scale(1,i.blink),o.fillStyle="#000",o.beginPath(),o.arc(0,0,12,0,Math.PI*2),o.fill(),o.fillStyle="#fff",o.beginPath(),o.arc(i.x,i.y/Math.max(i.blink,.3),5.1,0,Math.PI*2),o.fill(),o.restore()},m=document.createElement("canvas");m.className="close__ascii",m.setAttribute("aria-hidden","true"),Yt.prepend(m),l(),u();let p=[".display",".lede",".close__cta"].map(f=>Yt.querySelector(f)).filter(Boolean),E=null,T=()=>{E=null};addEventListener("scroll",T,{passive:!0});let y=null;try{y=Zr(m,{source:a,live:!0,fit:"cover",cellSize:matchMedia("(max-width: 560px)").matches?6:9,color:"ink",ink:"#3acf6a",shade:.25,levels:"none",vignette:0,backdrop:0,hover:e?"none":"trail",drift:e?0:.25,speed:1,label:"The FrogBot frog, drawn in characters"})}catch(f){console.warn("Asciify closing field could not start; keeping the pixel field.",f),m.remove()}if(y){Yt.querySelector(".px--close")?.remove(),Yt.classList.add("has-asciify");let f=0,v=!1,H=()=>{f=0;let me=i.tx-i.x,P=i.ty-i.y;Math.abs(me)+Math.abs(P)>.02&&(i.x+=me*.18,i.y+=P*.18,f=requestAnimationFrame(H)),u(),y.redraw()},r=()=>{!f&&v&&(f=requestAnimationFrame(H))},V=me=>{if(!v||!c)return;let P=Yt.getBoundingClientRect(),be=1/t,ue=P.left+(c.ox+50*c.s)*be,C=P.top+(c.oy+46.9*c.s)*be,D=me.clientX-ue,J=me.clientY-C,Le=Math.hypot(D,J)||1,pe=Math.min(1,Le/300)*3.4;i.tx=D/Le*pe,i.ty=J/Le*pe,r()};!e&&matchMedia("(hover: hover)").matches&&addEventListener("pointermove",V,{passive:!0});let xe=0,A=()=>{if(v&&!document.hidden){let me=performance.now(),P=be=>{let ue=(be-me)/180;i.blink=ue>=1?1:Math.max(.1,Math.abs(1-2*ue)),u(),y.redraw(),ue<1&&requestAnimationFrame(P)};requestAnimationFrame(P)}xe=setTimeout(A,2800+Math.random()*3600)};e||(xe=setTimeout(A,2e3));let O=new IntersectionObserver(([me])=>{v=me.isIntersecting,v&&!document.hidden?y.play():y.pause()});O.observe(Yt);let he=()=>{document.hidden?y.pause():v&&y.play()};document.addEventListener("visibilitychange",he);let we=0,Be=()=>{clearTimeout(we),we=setTimeout(()=>{T(),l(),u(),y.redraw()},150)};addEventListener("resize",Be),document.fonts&&document.fonts.ready.then(()=>{T(),l(),u(),y.redraw()}),addEventListener("pagehide",me=>{me.persisted||(clearTimeout(xe),cancelAnimationFrame(f),O.disconnect(),removeEventListener("pointermove",V),removeEventListener("resize",Be),removeEventListener("scroll",T),document.removeEventListener("visibilitychange",he),y.destroy(),m.remove())}),window.__asciifyClose=y}}
