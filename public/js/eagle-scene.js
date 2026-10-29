import * as THREE from 'three';
import { GLTFLoader } from '/assets/vendor/three/loaders/GLTFLoader.js';
import { RoomEnvironment } from '/assets/vendor/three/RoomEnvironment.js';
import { Reflector } from '/assets/vendor/three/objects/Reflector.js';

const host=document.getElementById('eagleViewport');
const story=document.getElementById('eagleStory');
if(host && story) initialize();

async function initialize(){
  let renderer;
  try{
    renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
    renderer.setClearColor(0x080809,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.05;
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type=THREE.PCFShadowMap;
    renderer.domElement.setAttribute('aria-hidden','true');
    host.appendChild(renderer.domElement);
    host.dataset.renderer='loading';

    const scene=new THREE.Scene();
    scene.fog=new THREE.FogExp2(0x080809,.045);
    const camera=new THREE.PerspectiveCamera(37,1,.1,50);
    camera.position.set(0,2.55,9.1);
    camera.lookAt(0,2.05,0);

    const pmrem=new THREE.PMREMGenerator(renderer);
    const roomEnvironment=new RoomEnvironment();
    const environment=pmrem.fromScene(roomEnvironment,.035);
    scene.environment=environment.texture;
    scene.environmentIntensity=.7;
    roomEnvironment.dispose();pmrem.dispose();

    const asset=await new GLTFLoader().loadAsync('/assets/products/floor-eagle/floor-eagle-gold.glb');
    const sculpture=asset.scene;
    // Source wings span Z. Rotate the supplied object without altering its mesh.
    sculpture.rotation.y=Math.PI/2;
    sculpture.updateMatrixWorld(true);
    const initialBounds=new THREE.Box3().setFromObject(sculpture);
    const size=initialBounds.getSize(new THREE.Vector3());
    sculpture.scale.setScalar(4.25/size.y);
    sculpture.updateMatrixWorld(true);
    const bounds=new THREE.Box3().setFromObject(sculpture);
    const center=bounds.getCenter(new THREE.Vector3());
    sculpture.position.set(-center.x,-bounds.min.y+.012,-center.z);
    sculpture.traverse(mesh=>{
      if(!mesh.isMesh)return;
      mesh.castShadow=true;mesh.receiveShadow=true;
      for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material]){
        material.envMapIntensity=1.45;
        material.needsUpdate=true;
      }
    });
    const model=new THREE.Group();model.add(sculpture);scene.add(model);

    const wallMaterial=new THREE.MeshBasicMaterial({color:0x030304});
    const backWall=new THREE.Mesh(new THREE.PlaneGeometry(12,8),wallMaterial);
    backWall.position.set(0,3.8,-2.6);backWall.receiveShadow=true;scene.add(backWall);
    const sideWall=new THREE.Mesh(new THREE.PlaneGeometry(8,8),wallMaterial);
    sideWall.rotation.y=Math.PI/2;sideWall.position.set(-3.7,3.8,1.4);sideWall.receiveShadow=true;scene.add(sideWall);
    const reflectionResolution=innerWidth<700?512:1024;
    const floorReflection=new Reflector(new THREE.PlaneGeometry(18,18),{
      color:0x24201a,textureWidth:reflectionResolution,textureHeight:reflectionResolution,clipBias:.004
    });
    floorReflection.rotation.x=-Math.PI/2;floorReflection.position.y=-.006;scene.add(floorReflection);
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(18,18),new THREE.MeshBasicMaterial({color:0x020202,transparent:true,opacity:.72,depthWrite:false}));
    floor.rotation.x=-Math.PI/2;floor.position.y=-.002;scene.add(floor);
    const contactShadow=new THREE.Mesh(new THREE.PlaneGeometry(18,18),new THREE.ShadowMaterial({color:0x000000,opacity:.45,depthWrite:false}));
    contactShadow.rotation.x=-Math.PI/2;contactShadow.position.y=.001;contactShadow.receiveShadow=true;scene.add(contactShadow);

    const key=new THREE.SpotLight(0xfff5e8,100,22,Math.PI/6,.8,2);
    key.position.set(-3.3,6.5,4.3);key.target.position.set(0,1.8,0);
    key.castShadow=true;key.shadow.mapSize.set(2048,2048);
    key.shadow.camera.near=.3;key.shadow.camera.far=20;
    key.shadow.bias=-.00015;key.shadow.normalBias=.018;key.shadow.radius=4;
    scene.add(key,key.target);
    const fill=new THREE.DirectionalLight(0xe2e9ff,.35);fill.position.set(4,4,3);scene.add(fill);
    const rim=new THREE.DirectionalLight(0xffffff,2.2);rim.position.set(3,5,-2);scene.add(rim);

    let visible=true,scheduled=false,contextLost=false;
    const stage=story.querySelector('.eagle-stage');
    function render(){
      scheduled=false;
      if(!visible||contextLost||document.hidden)return;
      const top=parseFloat(getComputedStyle(stage).top)||0;
      const distance=Math.max(1,story.offsetHeight-stage.offsetHeight);
      const progress=THREE.MathUtils.clamp((top-story.getBoundingClientRect().top)/distance,0,1);
      model.rotation.y=THREE.MathUtils.lerp(.48,-.48,progress);
      renderer.render(scene,camera);
      story.style.setProperty('--eagle-progress',String(progress));
      host.dataset.renderer='webgl';host.dataset.angle=model.rotation.y.toFixed(4);
      host.dataset.model='provided-gold-glb';
    }
    function schedule(){if(scheduled||!visible||contextLost)return;scheduled=true;requestAnimationFrame(render);}
    function resize(){
      const {width,height}=host.getBoundingClientRect();
      renderer.setSize(width,height,false);camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();schedule();
    }
    new ResizeObserver(resize).observe(host);
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();}).observe(story);
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',resize,{passive:true});
    document.addEventListener('visibilitychange',schedule);
    renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();contextLost=true;host.dataset.renderer='unavailable';});
    renderer.domElement.addEventListener('webglcontextrestored',()=>{contextLost=false;resize();});
    resize();
  }catch(error){
    renderer?.dispose();host.dataset.renderer='fallback';
    console.warn('The gold eagle scene could not initialize.',error);
  }
}