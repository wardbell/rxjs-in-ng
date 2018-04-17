import { Directive, HostListener, ElementRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'button[on-ff]' })
export class OnOffDirective {
  elm: HTMLButtonElement = this.elmref.nativeElement || {};
  @HostListener('click')
  onclick() {
    const sel = !!!this.elm.getAttribute('selected');
    if (sel) {
      this.elm.setAttribute('selected', 'true');
    } else {
      this.elm.removeAttribute('selected');
    }
    console.log('onof', sel, this.elm);
  }
  constructor(private elmref: ElementRef) {}
}

/**
 * msgid "Shutdown lock enabled. Disconnect pendrive to enable shutdown"
msgstr ""

#: aux_scripts/usbdevinserted.sh:57
msgid "Shutdown lock enabled. "
"Het uitzetten van de computer wordt geblokeerd"
msgstr ""

#: aux_scripts/usbdevinserted.sh:58
msgid "The shutdown will be unlocked when pendrive is disconnected"
"De compputer kan pas uitgezet worden nadat de pendrive is verwijderd"
msgstr ""

#: aux_scripts/usbdevgone.sh:68
msgid "Shutdown lock disabled. "
"blokade op uitzetten is opgeheven"
msgstr ""

#: aux_scripts/usbdevgone.sh:69
msgid "Now you can shutdown your computer"
"de computer kan nu weer uitgezet worden"
msgstr ""
 */
