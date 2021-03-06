"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var toast_options_1 = require('./toast-options');
var platform_browser_1 = require('@angular/platform-browser');
var ToastContainer = (function () {
    function ToastContainer(sanitizer, options) {
        this.sanitizer = sanitizer;
        this.position = 'fixed';
        this.messageClass = 'toast-message';
        this.titleClass = 'toast-title';
        this.positionClass = 'toast-top-right';
        this.toasts = [];
        this.maxShown = 5;
        this.animate = 'fade';
        if (options) {
            Object.assign(this, options);
        }
    }
    ToastContainer.prototype.addToast = function (toast) {
        if (this.positionClass.indexOf('top') > 0) {
            this.toasts.push(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(0, (this.toasts.length - this.maxShown));
            }
        }
        else {
            this.toasts.unshift(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(this.maxShown, (this.toasts.length - this.maxShown));
            }
        }
    };
    ToastContainer.prototype.removeToast = function (toastId) {
        this.toasts = this.toasts.filter(function (toast) {
            return toast.id !== toastId;
        });
    };
    ToastContainer.prototype.removeAllToasts = function () {
        this.toasts = [];
    };
    ToastContainer.prototype.dismiss = function (toast) {
        if (!toast.autoDismiss) {
            this.removeToast(toast.id);
        }
    };
    ToastContainer.prototype.anyToast = function () {
        return this.toasts.length > 0;
    };
    ToastContainer.prototype.findToast = function (toastId) {
        for (var _i = 0, _a = this.toasts; _i < _a.length; _i++) {
            var toast = _a[_i];
            if (toast.id === toastId) {
                return toast;
            }
        }
        return null;
    };
    ToastContainer = __decorate([
        core_1.Component({
            selector: 'toast-container',
            template: "\n    <div id=\"toast-container\" [style.position]=\"position\" class=\"{{positionClass}}\">\n      <div *ngFor=\"let toast of toasts\" [@inOut]=\"animate\" class=\"toast toast-{{toast.type}}\" (click)=\"dismiss(toast)\">\n        <div *ngIf=\"toast.title\" class=\"{{toast.titleClass || titleClass}}\">{{toast.title}}</div>\n        <div [ngSwitch]=\"toast.enableHTML\">\n          <span *ngSwitchCase=\"true\" [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(toast.message)\"></span>\n          <span *ngSwitchDefault class=\"{{toast.messageClass || messageClass}}\">{{toast.message}}</span>\n        </div>              \n      </div>\n    </div>\n    ",
            animations: [
                core_1.trigger('inOut', [
                    core_1.state('flyRight, flyLeft', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.state('fade', core_1.style({ opacity: 1 })),
                    core_1.transition('void => flyRight', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }),
                        core_1.animate('0.2s ease-in')
                    ]),
                    core_1.transition('flyRight => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(100%)'
                        }))
                    ]),
                    core_1.transition('void => flyLeft', [
                        core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }),
                        core_1.animate('0.2s ease-in')
                    ]),
                    core_1.transition('flyLeft => void', [
                        core_1.animate('0.2s 10 ease-out', core_1.style({
                            opacity: 0,
                            transform: 'translateX(-100%)'
                        }))
                    ]),
                    core_1.transition('void => fade', [
                        core_1.style({
                            opacity: 0,
                        }),
                        core_1.animate('0.3s ease-in')
                    ]),
                    core_1.transition('fade => void', [
                        core_1.animate('0.3s 10 ease-out', core_1.style({
                            opacity: 0,
                        }))
                    ]),
                ]),
            ],
        }),
        __param(1, core_1.Optional()), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer, toast_options_1.ToastOptions])
    ], ToastContainer);
    return ToastContainer;
}());
exports.ToastContainer = ToastContainer;
//# sourceMappingURL=toast-container.component.js.map