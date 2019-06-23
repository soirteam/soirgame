export var DistortPipeline = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize:
    function DistortPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;
            uniform float     time;
            uniform vec2      resolution;
            uniform sampler2D uMainSampler;
            varying vec2 outTexCoord;
            void main( void ) {
                vec2 uv = outTexCoord;
                // uv.y *= -1.0;
                uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);
                vec4 texColor = texture2D(uMainSampler, uv);
                gl_FragColor = texColor;
            }`
        });
    }
});

export var ChampignonPipeline = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize:
    function ChampignonPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision mediump float;

            uniform sampler2D uMainSampler;
            uniform vec2 uResolution;
            uniform float uTime;

            varying vec2 outTexCoord;
            varying vec4 outTint;

            vec4 plasma()
            {
                // vec2 pixelPos = gl_FragCoord.xy / uResolution * 15.0;
                vec2 pixelPos = gl_FragCoord.xy / uResolution * 20.0;
                float freq = 0.8;
                float value =
                    sin(uTime + pixelPos.x * freq) +
                    sin(uTime + pixelPos.y * freq) +
                    sin(uTime + (pixelPos.x + pixelPos.y) * freq) +
                    cos(uTime + sqrt(length(pixelPos - 0.5)) * freq * 2.0);

                return vec4(
                    cos(value),
                    sin(value),
                    sin(value * 3.14 * 2.0),
                    cos(value)
                );
            }
            void main() 
            {
                vec4 texel = texture2D(uMainSampler, outTexCoord);
                texel *= vec4(outTint.rgb * outTint.a, outTint.a);
                gl_FragColor = texel * plasma();
            }
            `
        });
    }
});

export var LSDPipeline = new Phaser.Class({
    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,
    initialize:
    function LSDPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: `
            //like a lamb to the slaughter, the suffering servant, a bit through his nose just as he grows full

//Isaiah 53: https://www.biblegateway.com/passage/?search=isaiah%2053&version=NKJV
//the transgressions he took: https://biblehub.com/2_kings/19-28.htm
// co3moz - mandelbrot
// X-  Christ Jesus made all. 
//Check out www.zonex.rf.gd
//https://biblehub.com/revelation/5-6.htm seven eyed seven horned lamb with four living creatures covered in eyes
//four creatures present now
//make sure to up the resolution in the top left; it's the number.  Try 1 to start.
precision highp float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

#define ITERATION 25
    float rate = .1;
float degrees2radians = 180./3.14159;
float golden_mean = -cos(216.*degrees2radians)/-cos(612.*degrees2radians)-1.; 
//cos(216)/cos(612)=2.61....I was born 24 hours before 6:12 Jan(1), 6, I use the golden ratio to stagger because of its supreme irrationality
//above identity was discovered by intuition and above factoid.  There's more to the story but this is neither time nor place
//though that's what the story is about.
float inverter =    
    
    
    
    
    1.;
//this is a work around for my phone
float b = pow(2.,2.);
vec3 scroll(vec2 p) {
  vec2 s = p.yx;
    p=p.yx;
  float d = 0.0, l;
float flip;
        if(rate!=0.)         flip=-sin(3.14/2.+rate*time);
        else     flip=-sin(1.0*time+1.0)-1.15;
    
    if (flip<0.) p = -p;
    if (abs(p.x*p.x+p.y*p.y)<7.0)
  for (int t = 0; t < ITERATION; t++) {
    s = vec2(((s.x * s.x - s.y * s.y) +flip* p.x*p.x), (2.0* s.x * s.y + flip*p.y*p.y));
      if(b==2. ||rate == 0.)
      s.x = -1./s.x;

else
      s.x = pow(s.x,flip)*sign(s.x*flip);



     
      
      l = length(s);
    d += l/40.;
    if (l >19.0 )  
        if (t  >-1 )
                    return vec3(-sin(time)+.717);
      //  else 
    //      return vec3(1.-sin(d *1.618+time*.618),1.- sin(d * 0.618+time*1.618),1.-sin(d *1.+time*1.));
  }

  return vec3(0.);
}

vec3 man(vec2 p) {
  vec2 s = p.yx;
    p=p.yx;
  float d = 0.0, l;
            float flip=-sin(3.14*3./2.+rate*time);
    if (flip<0.) p = -p;
    if (abs(p.x*p.x+p.y*p.y)<2.0){
  for (int t = 0; t < ITERATION*2; t++) {
    s = vec2(((s.x * s.x - s.y * s.y) +flip* p.x), (1.* s.x * s.y + flip*p.y)); //2 changed to 1 in this draft
      
      //this is a reorientation and riff
      // off of (read inspired by) the feedback loop x <= 1/(1/x-x).  This pattern starts false and generates increasingly many solutions.
      //. essentially the image is the Mandelbrot set only with 1/real-imag in place of the standard complex number as x's argument.  
      // 1/real-imag turns out to equate to essentially an identical image to real-1/imag which seems more elegant
      // remove the below line to see that it is the only core difference in the equations of the Mandelbrot and This image.

      if(b==2. ||rate == 0.)
      s.x = 1./s.x;

     else
      s.x = 1./pow(s.x,flip)*sign(s.x*flip); //"1./" is new for this draft

     
      
      l = length(s);
                d += l/25.;
      if(t!=0)
        if (l >20.0 ) 
    return vec3((-sin(time))+(-sin(time+3.14/2.)))*sin(golden_mean*time)/2.;
             
             

           
      }
        return vec3(-(-sin(time))*2.+(-sin(time+3.14/2.)))*-sin(time)/2.;
}
        return vec3(-0.);
}
vec3 eagle(vec2 p) {
  vec2 s = p.yx;
    p=p.yx;
  float d = 0.0, l;
                    float flip=-sin(3.14*3./2.+rate*time)/abs(sin(time)*2.+1.);
        if (flip<0.) p = -p;
    if(abs(6.67*p.x*p.x+p.y*p.y*2.)<700.0)
  for (int i = 0; i < ITERATION; i++) {


    s = vec2(-((sin(time*2.)+1.5)/2.*(s.x * s.x - s.y * s.y) +flip* p.x), (1.* s.x * s.y + flip*p.y)); //2 changed to 1 in this draft
     
      if(b<=.5 ||rate == 0.)
      s.x = 1./s.x;

     else
      s.x = 1./pow(s.x,flip)*sign(s.x*flip); //"1./" is new for this draft

    
          s.y = s.x*s.y;
      l = length(s);
    d +=2.;
      float nn = 0.0;
      //if (p.x*p.x+p.y*p.y>1.) 
         // nn=(p.x*p.x+p.y*p.y);
    if (l >(20.0+nn) ) if( float(i)>3.&&float(i)>3.) 
        return vec3(1.-sin(d * 0.003)-.5,1.- sin(d * 0.9)-.5,1.- sin(d * 0.1)-.5);
  }

  return vec3(.0);
}

vec3 lion(vec2 p) {
  vec2 s = p.yx;
    p=p.yx;

  float d = 0.0, l;

            float flip=-sin(3.14/2.+rate*time);
    if (flip<0.) p = -p;
    if(p.x*p.x*1.+p.y*p.y*2.<21.)
  for (int t = 0; t < ITERATION; t++) {
    s = vec2(((s.x * s.x - s.y * s.y) +flip* p.x), (2.0* s.x * s.y + flip*p.y));

    s/=2.0;
      if(b==2. ||rate == 0.)
      s.x = -1./s.x;
     else
      s.x = pow(s.x,flip)*sign(s.x*flip);




     
      l = length(s);
    d += l/40.;
      
    if (l >14.0 )  
        if (float(t)  >2.)
            return vec3(-sin(d +time/10.*1./golden_mean*2.)+.2,-sin(d +time/10.*golden_mean*2.)+.2,-sin(d /10.*time*2.)+.2);
                         ;  // return vec3(0.);
  }

  return vec3(.0);
}


vec3 ox(vec2 p) {

  vec2 s = p.yx;
    p=p.yx;
  float d = 0.0, l;

            float flip=-sin(3.14/2.+rate*time);
    if (flip<0.) p = -p;
    if( (p.x+.25)*(p.x+.25)+p.y*p.y<1.||(p.x>0.&& p.x*p.x+p.y*p.y<7. ))
  for (int t = 0; t < ITERATION; t++) {
    s = vec2(((s.x * s.x - s.y * s.y) +flip* p.x), (3.0* s.x * s.y + flip*p.y));

      if(b==2. ||rate == 0.)
      s.x = -1./s.x;
     else
      s.x = pow(s.x,flip)*sign(s.x*flip);


     
      
      l = length(s);
    d += l/10.;
    if (l >14.0 )  
        if (float(t)  >2.)
            return vec3(-sin(d +time*1./golden_mean*2.),-sin(d +time*golden_mean*2.),-sin(d *time*2.));
                         ;  // return vec3(0.);
  }

  return vec3(.0);
}

vec3 lamb(vec2 p) {
  vec2 s = p.yx;
    p=p.yx;
  float d = 0.0, l;
            float flip=-sin(3.14/2.+rate*time);
    if (flip<0.) p = -p;
  for (int t = 0; t < ITERATION; t++) {
    s = vec2(((s.x * s.x - s.y * s.y) +flip* p.x), (2.0* s.x * s.y + flip*p.y)); 
      
      //this is a reorientation and riff
      // off of (read inspired by) the feedback loop x <= 1/(1/x-x).  This pattern starts false and generates increasingly many solutions.
      //. essentially the image is the Mandelbrot set only with 1/real-imag in place of the standard complex number as x's argument.  
      // 1/real-imag turns out to equate to essentially an identical image to real-1/imag which seems more elegant
      // remove the below line to see that it is the only core difference in the equations of the Mandelbrot and This image.
      if(b==2. ||rate == 0.)
      s.x = -1./s.x;
     else
      s.x = pow(s.x,flip)*sign(s.x*flip);



     
      
      l = length(s*golden_mean/3.5);
                d += golden_mean*.0777;
    
    float active = 8.+-sin(-time)*6.;
      float colorshift = .5+-abs(sin(-time/2.+3.14*.25))/2.;
      float colorshift1 = .5+-abs(sin(-time/2.-3.14*.25))/2.;
      float colorshift2 = .5+-sin(-time-3.14/3.);
      if (l >30.0-active) 
                if (t != 1 || (p.x>-.1 || abs(p.y)<.3))
        if (t > 3)
             
            return 2.*colorshift2*colorshift2*vec3(.5+sin(float(t) * 0.05)-.5,.5-sin(float(t) * 0.2)-.5,sin(d * 0.01)-.5)
            
            +2.*colorshift1*colorshift1*vec3(10.)+
                        -2.*colorshift*colorshift*vec3(10.)+
            2.*vec3(-sin(d+golden_mean +time*1./golden_mean*.7),-sin(d*1. +time*golden_mean*.7),-sin(d+1./golden_mean +time*.7));
        else if( abs(p.y)>2.||( inverter>0.&&( p.x>(.8+active/10.)||p.x<1.)) ||(inverter<0.&&(( p.x<inverter*(active/10.)||p.x>.01))) || rate != 0.0 )
        {

         return 
            // (vec3(1.-sin(100.*d *1.618+time*.618),1.- sin(10.*d *1.0+time*1.618),1.-sin(50.*d * 0.618+time*1.)) )
        vec3(1.-sin(100.*l *1.618+100.*time*.618),1.- sin(50.*l *100.0+time*1.618),1.-sin(100.*l * 0.618+time*100.))/4.;
        }
      else return       
          //red is flopped badly here, no reason
          //red green blue
          vec3(-sin(3.1*d*p.x*golden_mean),.3,-2.*sin(.05*d*p.x*golden_mean));
            }
    

  return vec3(flip*-sin(time));
}
    
void main() {
  vec2 a = resolution.xy / min(resolution.x, resolution.y);
  vec2 p = ((gl_FragCoord.xy / resolution.xy) * 4.0  - 2.0)*a ;
                float flip=-sin(rate*time+3.14);
    //p.y+=.5;
    float scale = 5.;
p*=scale*(-sin(time*1.618)+1.)/2.;
    p.x +=+-cos(.618*1.618*time)/scale*2.;
    p.y +=+-cos(.618*1.618*.618*1.618*time)/scale*2.;
vec4 composite = vec4(lamb(inverter*p)+ox(.9*inverter*vec2(p.x-7.,p.y-3.6))+12.*lion(2.0*inverter*vec2(p.x+7.7,p.y+4.2))
             +man(2./2.0*vec2(p.x+7.5,p.y-3.9))
              , 1.);
 composite.x = -sin(composite.x+3.14);
 composite.y = -sin(composite.y+3.14);
     composite.z = -sin(composite.z+3.14);
    composite += vec4(12.*scroll(4./2.0*vec2(p.x,p.y+3.)) +12.*eagle(13./2.0*vec2(p.x-6.5,p.y+5.)),1.);
    
  gl_FragColor = composite;
}
//a core concept in this piece is that nothing is twice itself (0 = 0*0 but if x/=0 then x/=2*x) since nothing IS twice nothing,
//and no nothing is anything then 0*0 = oo or really anything for that matter.  Except what it is said to equal which is 0.
//another aspect to attain the same result is that 0 = (0*0)= ( (0*0)* (0*0))= (( (0*0)* (0*0))*( (0*0)* (0*0)))...=0*oo = undefined = definable
//to reiterate think about the notion of calculus and integration and sums of infinitesimals.
//yet another aspect of this is that of the liars paradox ("this statement is false") and Godel's II theorem of Incompleteness
//to continue the Matiyasevich result to Hilbert's 10th(?) is said to prove Godel's aforementioned theorem.
//Matiyasevich used the golden ratio (or rather the fibonacci (son of good and bad as I've translated it) numbers)
///(and his predecessors on the theorem he established called the MRDP (matiyasevich Robinson Davis Putnam) used the silver ration)
//the result is interesting because the equation that inspired this mentioned earlier is x <= 1/(1/x-x) has it's first result at root(2)
//the silver ratio is 1+root(2).  The golden ratio is very similar to the Mandelbrot equation x = x^2 - 1 vs. x <= x^2 - c.
//long story short there are too many concepts to count or list, but believe this: 
//There is The God of Israel, The God of the Christian, The God of Creation.
//I believe this to be His Face, The Face of His Son, who was in the beginning and who forever will be.

//originals at II:http://glslsandbox.com/e#52855.0 (up to around .24 I think)
//I: http://glslsandbox.com/e#52851.2 (.2 is max draft)
//III: at this time caps at .47 http://glslsandbox.com/e#55353.47
//IIII: and this one http://glslsandbox.com/e#55496.0
            `
        });
    }
});
