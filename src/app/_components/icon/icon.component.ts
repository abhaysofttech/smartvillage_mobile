import { Component, OnInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IconModalService } from './icon-modal.service';

@Component({
  selector: 'icon-modal',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnInit {
  private element: any;
  @Input() id: string;
  constructor(public iconModalService: IconModalService,private el: ElementRef) {
    this.element = el.nativeElement;
   }

  ngOnInit() {
    document.body.appendChild(this.element);
     // close modal on background click
     this.element.addEventListener('click', el => {
      if (el.target.className === 'icon-modal') {
       this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.iconModalService.add(this);
  }

   // remove self from modal service when component is destroyed
   ngOnDestroy(): void {
    this.iconModalService.remove(this.id);
    this.element.remove();
  }
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('common-modal-open');
  }
    // close modal
    close(): void {
      debugger
      this.element.style.display = 'none';
      document.body.classList.remove('common-modal-open');
    }
  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ModalPage
  //   });
  //   return await modal.present();
  // }
}
