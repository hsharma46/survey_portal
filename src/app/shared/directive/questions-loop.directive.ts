import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';



export interface QuestionsLoopContext {
    $implicit: Object;
    controller?: {
        next: () => void;
        prev: () => void;
        isLast: () => void;
        isFirst: () => void;
        isAnswer: () => void;
        index: number;
    };
    index: number;
}

@Directive({
    selector: '[appQuestionsLoop]'
})
export class QuestionsLoopDirective implements OnChanges {
    @Input() appQuestionsLoopOf: any[] = [];
    @Input() appQuestionsLoopForm: FormGroup;

    @Input() appQuestionsLoopSubmit: Function;
    context: any;
    index = 0;
    pages = [0];

    constructor(
        private tmpl: TemplateRef<QuestionsLoopContext>,
        private vcr: ViewContainerRef
    ) { }

    render(item = 0) {
        this.context = {
            $implicit: this.appQuestionsLoopOf[item],
            controller: {
                next: this.next.bind(this),
                prev: this.prev.bind(this),
                isLast: this.isLast.bind(this),
                isFirst: this.isFirst.bind(this),
                isAnswer: this.isAnswer.bind(this),
                index: item,
            },
            index: item,
        };
        this.vcr.createEmbeddedView(this.tmpl, this.context);
    }

    ngOnChanges(changes: any) {
        if (
            changes.appQuestionsLoopOf &&
            changes.appQuestionsLoopOf.currentValue &&
            changes.appQuestionsLoopOf.currentValue !==
            changes.appQuestionsLoopOf.previousValue &&
            changes.appQuestionsLoopOf.currentValue.length > 0
        ) {
            this.render();
        }

        console.log(this.appQuestionsLoopForm);
    }

    next() {
        if (this.isLast()) {
            this.appQuestionsLoopSubmit();
            return;
        }

        this.index++;
        if (this.index >= this.appQuestionsLoopOf.length) {
            this.index = 0;
        }
        this.pages.push(this.index);
        this.context.$implicit = this.appQuestionsLoopOf[this.index];
        this.context.controller.index = this.index;
        this.context.index = this.index;
    }

    prev() {
        this.pages.pop();
        this.index = this.pages[this.pages.length - 1];

        this.context.$implicit = this.appQuestionsLoopOf[this.index];
        this.context.controller.index = this.index;
        this.context.index = this.index;
    }

    isLast() {
        return (this.index + 1) === this.appQuestionsLoopOf.length;
    }

    isFirst() {
        return this.index === 0;
    }

    isAnswer() {
        return this.appQuestionsLoopOf[this.index]['answer'] == "";
    }
}
