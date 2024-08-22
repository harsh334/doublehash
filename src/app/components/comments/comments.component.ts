import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
    @Input() comment: any = [];
    @Input() postID: any = [];
    @Input() userName: string = '';
    @Output() closeModal = new EventEmitter<void>();
    @ViewChild('commentBox') commentBox!: ElementRef;
    commentForm!: FormGroup;

    constructor(private sharedService: SharedService) {}

    ngOnInit() {
        this.commentForm = new FormGroup({
            commentText: new FormControl(),
        });
    }
    ngAfterViewInit() {
        this.commentBox.nativeElement.focus();
    }

    close() {
        this.closeModal.emit();
    }

    addComment(postID: string, comment: any) {
        let stComment = [];
        this.sharedService.getComments(postID).subscribe((result: any) => {
            if (result['comments'] && result['comments'].length > 0) {
                stComment = [
                    ...result['comments'],
                    {
                        description: comment['commentText'],
                        userName: this.userName,
                    },
                ];
            } else {
                stComment = [
                    {
                        description: comment['commentText'],
                        userName: this.userName,
                    },
                ];
            }

            this.sharedService
                .addComment(postID, stComment)
                .subscribe((result: any) => {
                    this.comment = result['comments'];
                });
        });
    }
}
