import { animate, query, style, transition, trigger } from '@angular/animations';

export const routerTransition =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('routerTransition', [
        transition('* => quiz-manager', [
            query(':enter', [style({ opacity: 0 }), animate('0.3s', style({ opacity: 0 })), animate('0.5s', style({ opacity: 1 }))], {
                optional: true
            })
        ]),
        transition('* <=> *', [
            query(':enter', [style({ opacity: 0 }), animate('0.3s', style({ opacity: 0 })), animate('0.5s', style({ opacity: 1 }))], {
                optional: true
            })
        ])
    ]);
