import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { DataService } from 'src/app/services/data/data.service';
import { Subscription, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as TWEEN from '@tweenjs/tween.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-3d-bar-chart',
  template: '<div id="container" #container></div>',
  styleUrls: ['./threejs-charts.component.scss'],
})
export class ThreejsChartsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') containerRef!: ElementRef;
  private container!: HTMLElement;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private frameId!: number;
  private destroy$ = new Subject<void>();

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private tooltip!: HTMLElement;
  private tweens: TWEEN.Tween<{ height: number; positionY: number }>[] = [];
  private controls!: OrbitControls;

  private visitDetails!: any[];
  private maxVisits!: number;

  constructor(private dataService: DataService) {}

  ngAfterViewInit(): void {
    this.visitDetails = this.dataService.getVisitDetails();
    this.maxVisits = Math.max(
      ...this.visitDetails.map((detail) => detail.visits)
    );

    this.init3DChart();
    this.loadKunaiModel();

    this.tooltip = document.createElement('div');
    this.tooltip.style.position = 'absolute';
    this.tooltip.style.visibility = 'hidden';
    this.tooltip.style.backgroundImage = 'url("assets/img/sasuke.gif")';
    this.tooltip.style.backgroundSize = 'cover';
    this.tooltip.style.minHeight = '100px';
    this.tooltip.style.minWidth = '200px';

    this.tooltip.style.overflow = 'hidden';

    this.tooltip.style.padding = '8px';
    this.tooltip.style.borderRadius = '4px';
    this.tooltip.style.color = '#fff';
    this.tooltip.style.fontSize = '14px';
    this.tooltip.style.fontWeight = 'bold';
    this.tooltip.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
    this.tooltip.style.pointerEvents = 'none';
    document.body.appendChild(this.tooltip);

    document.body.appendChild(this.tooltip);

    this.renderer.domElement.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this),
      false
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.5;
    this.animate();
    this.onWindowResize();
  }

  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }

    this.destroy$.next();
    this.destroy$.complete();

    if (this.renderer) {
      this.renderer.dispose();
    }

    document.body.removeChild(this.tooltip);
    this.renderer.domElement.removeEventListener(
      'mousemove',
      this.onMouseMove.bind(this),
      false
    );
  }

  private loadKunaiModel() {
    const loader = new GLTFLoader();

    loader.load(
      'assets/glb/kunai_naruto.glb',
      (gltf) => {
        const kunaiModel = gltf.scene.children[0];
        const scale = 0.5;
        const barSpacing = 3;

        this.visitDetails.forEach((detail, index) => {
          const kunaiClone = kunaiModel.clone();

          const heightScale = detail.visits / this.maxVisits;

          kunaiClone.scale.set(scale * heightScale, 1, scale * heightScale);

          const xPosition = (index - this.visitDetails.length / 2) * barSpacing;
          const yPosition = 0;
          kunaiClone.position.set(xPosition, yPosition, 0);

          const kunaiMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.5,
          });
          kunaiClone.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = kunaiMaterial;
              if (child.userData['type'] === 'kunai') {
                alert('kunai');
              }
            }
          });

          kunaiClone.userData = {
            type: 'kunai',
            country: detail.country,
            visits: detail.visits,
          };

          this.scene.add(kunaiClone);
        });
      },
      undefined,
      (error) => {
        console.error('An error happened with the GLTFLoader', error);
      }
    );
  }

  private onMouseMove(event: MouseEvent): void {
    this.mouse.x =
      (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    this.mouse.y =
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.scene.children);

    this.tooltip.style.visibility = 'hidden';

    for (let i = 0; i < intersects.length; i++) {
      const intersect = intersects[i];
      const details = intersect.object.userData;

      if (details && details['country']) {
        this.tooltip.innerHTML = `Country: ${details['country']}<br>Visits: ${details['visits']}`;
        this.tooltip.style.top = `${event.clientY}px`;
        this.tooltip.style.left = `${event.clientX}px`;
        this.tooltip.style.visibility = 'visible';
        break;
      }
    }
  }

  private init3DChart(): void {
    this.container = this.containerRef.nativeElement;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x333333);
    const aspectRatio =
      this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.camera.position.set(0, 2, 10);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.container.appendChild(this.renderer.domElement);
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onWindowResize());
    this.createChart();
  }
  private createChart(): void {
    const barWidth = 0.8;
    const barDepth = 0.8;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);

    const barSpacing = 3;
    const totalWidth = this.visitDetails.length * (barWidth + barSpacing);

    const texture = new THREE.TextureLoader().load('assets/img/naruto.jpg');

    this.visitDetails.forEach((detail, index) => {
      const height = (detail.visits / this.maxVisits) * 5;
      const barGeometry = new THREE.BoxGeometry(barWidth, height, barDepth);
      const barMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        color: this.getColorForValue(detail.visits),
        specular: 0x050505,
        shininess: 100,
      });
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.userData = {
        type: 'bar',
        country: detail.country,
        visits: detail.visits,
      };

      bar.position.x = index * (barWidth + barSpacing) - totalWidth / 2;
      bar.scale.y = 0.01;
      bar.position.y = (bar.scale.y * height) / 2 + height / 2;
      this.scene.add(bar);

      const tween = new TWEEN.Tween({ scaleY: bar.scale.y })
        .to({ scaleY: 1 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function (object) {
          bar.scale.y = object.scaleY;
          bar.position.y = (object.scaleY * height) / 2;
        })
        .start();
    });

    const size = this.visitDetails.length * 2;
    const divisions = this.visitDetails.length;
    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.y = -0.1;
    this.scene.add(gridHelper);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    this.animate();
  }

  private animate(): void {
    this.frameId = requestAnimationFrame(() => this.animate());

    if (this.controls) {
      this.controls.update();
    }

    this.scene.traverse((object) => {
      if (object.userData && object.userData['type'] === 'kunai') {
        object.rotation.z += 0.01;
      }
      if (object.userData && object.userData['type'] === 'bar') {
        object.rotation.y -= 0.01;
      }
    });

    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  }
  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    const canvasRect = this.renderer.domElement.getBoundingClientRect();
    const offsetX = (window.innerWidth - canvasRect.width) / 2;
    const offsetY = (window.innerHeight - canvasRect.height) / 2;
    this.renderer.domElement.style.left = offsetX + 'px';
    this.renderer.domElement.style.top = offsetY + 'px';
  }

  private getColorForValue(value: number): number {
    if (value > 3000) return 0xff0000;
    if (value > 2000) return 0xffff00;
    return 0x00ff00;
  }
}
