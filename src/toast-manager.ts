import {Injectable, ComponentRef, ApplicationRef,
  Optional, ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import {ToastContainer} from './toast-container.component';
import {ToastOptions} from './toast-options';
import {Toast} from './toast';

@Injectable()
export class ToastsManager {
  container: ComponentRef<any>;
  private options = {
    autoDismiss: true,
    toastLife: 3000,
  };
  private index = 0;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              @Optional() options: ToastOptions) {
    if (options) {
      Object.assign(this.options, options);
    }
  }

  show(toast: Toast, options?: any) {
    if (!this.container) {
      // get app root view component ref
      let appContainer: ViewContainerRef = this.appRef['_rootComponents'][0]['_hostElement'].vcRef;

      // get options providers
      let providers = ReflectiveInjector.resolve([
        {provide: ToastOptions, useValue: <ToastOptions>this.options }
      ]);

      // create and load ToastContainer
      let toastFactory = this.componentFactoryResolver.resolveComponentFactory(ToastContainer);
      let childInjector = ReflectiveInjector.fromResolvedProviders(providers, appContainer.parentInjector);
      this.container = appContainer.createComponent(toastFactory, appContainer.length, childInjector);
      this.setupToast(toast, options);

    } else {
      this.setupToast(toast, options);
    }
  }

  createTimeout(toastId: number, timeout?: number) {
    const life = timeout || this.options.toastLife;

    setTimeout(() => {
      this.clearToast(toastId);
    }, life);
  }

  setupToast(toast: Toast, options?: any) {
    toast.id = ++this.index;

    if (options && typeof(options.messageClass) === 'string') {
      toast.messageClass = options.messageClass;
    }

    if (options && typeof(options.titleClass) === 'string') {
      toast.titleClass = options.titleClass;
    }

    if (options && typeof(options.enableHTML) === 'boolean') {
      toast.enableHTML = options.enableHTML;
    }

    if (options && typeof(options.autoDismiss) === 'boolean') {
      toast.autoDismiss = options.autoDismiss;
    } else {
      toast.autoDismiss = this.options.autoDismiss;
    }

    if (options && typeof(options.toastLife) === 'number') {
      toast.autoDismiss = true;
      this.createTimeout(toast.id, options.toastLife);
    } else if (toast.autoDismiss) {
      this.createTimeout(toast.id);
    }

    this.container.instance.addToast(toast);
  }

  clearToast(toastId: number) {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeToast(toastId);
      if (!instance.anyToast()) {
        this.dispose();
      }
    }
  }

  clearAllToasts() {
    if (this.container) {
      let instance = this.container.instance;
      instance.removeAllToasts();
      if (!instance.anyToast()) {
        this.dispose();
      }
    }
  }

  dispose() {
    this.container.destroy();
    this.container = null;
  }

  error(message: string, title?: string, options?: any) {
    let toast = new Toast('error', message, title);
    this.show(toast, options);
  }

  info(message: string, title?: string, options?: any) {
    let toast = new Toast('info', message, title);
    this.show(toast, options);
  }

  success(message: string, title?: string, options?: any) {
    let toast = new Toast('success', message, title);
    this.show(toast, options);
  }

  warning(message: string, title?: string, options?: any) {
    let toast = new Toast('warning', message, title);
    this.show(toast, options);
  }

  // allow user define custom background color and image
  custom(message: string, title?: string, options?: any) {
    let toast = new Toast('custom', message, title);
    this.show(toast, options);
  }
}
