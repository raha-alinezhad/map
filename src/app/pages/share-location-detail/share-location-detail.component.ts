import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeafletMap } from 'src/app/classes/LeafletMap';
import { LocationVM } from 'src/app/models/location.model';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-share-location-detail',
  templateUrl: './share-location-detail.component.html',
  styleUrls: ['./share-location-detail.component.css']
})
export class ShareLocationDetailComponent implements OnInit {
  form: FormGroup;
  map: LeafletMap;
  @ViewChild('file') fileInput: ElementRef;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private reactivService: MapService,
    private activatedRoute: ActivatedRoute
  ) {
    this.map = new LeafletMap();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  initMap() {
    this.map.setCenter([35.775102, 51.423911]);
    this.map.initMap('ex_map')
  }
  ngOnInit(): void {
    this.createFoem();
  }
  uploadEvent(event) {
    this.onFileChange(event);
  }
  createFoem() {
    let name = this.activatedRoute.snapshot.paramMap.get("name");
    let item;
    if (name) {
      item = this.reactivService.markers.find(x => x.name === name)
    }
    this.form = this.fb.group({
      name: [item ? item.name : ''],
      type: [item ? item.type : ''],
      logo: []
    })
  }
  onSubmit() {
    let locDetail = new LocationVM()
    locDetail.latLng = this.map.OSMap.getCenter();
    let formValue = this.form.value;
    locDetail.name = formValue.name;
    locDetail.type = formValue.type;
    locDetail.logo = formValue.logo;

    this.reactivService.addToMarkers(locDetail);
    this.router.navigateByUrl('/map');
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() !== 'png' && ext.toLowerCase() !== 'jpeg' && ext.toLowerCase() !== 'jpg') {
        this.fileInput.nativeElement.value = '';
        alert('Wrong format')
      }

      if (file.size > 500000000) {
        alert('File is too big')
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.patchValue({
            logo: reader.result
          });
        }

      }
    }
  }
}
