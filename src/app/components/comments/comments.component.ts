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
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
})
export class CommentsComponent {
    @Input() comment: any = [];
    @Input() postID: any = [];
    @Input() userDetail: any = '';
    @Output() closeModal = new EventEmitter<void>();
    @Output() updateInComment = new EventEmitter<void>();
    @ViewChild('commentBox') commentBox!: ElementRef;
    commentForm!: FormGroup;
    defaultImage: string = Constants.userImage;
    isSpinnerVisible: boolean = false;

    constructor(private sharedService: SharedService) {}

    ngOnInit() {
        this.commentForm = new FormGroup({
            commentText: new FormControl(),
        });
        console.log(this.userDetail);
    }

    ngAfterViewInit() {
        this.commentBox.nativeElement.focus();
    }

    close() {
        this.closeModal.emit();
    }

    addComment(postID: string, comment: any) {
        let stComment = [];
        this.isSpinnerVisible = true;
        this.resetForm();
        this.sharedService.getComments(postID).subscribe({
            next: (result: any) => {
                if (result['comments'] && result['comments'].length > 0) {
                    stComment = [
                        ...result['comments'],
                        {
                            description: comment['commentText'],
                            profileImage: this.userDetail.profileImage,
                            userName: this.userDetail.userName,
                        },
                    ];
                } else {
                    stComment = [
                        {
                            description: comment['commentText'],
                            profileImage: this.userDetail.profileImage,
                            userName: this.userDetail.userName,
                        },
                    ];
                }

                this.sharedService
                    .addComment(postID, stComment)
                    .subscribe((result: any) => {
                        this.comment = result['comments'];
                        this.updateInComment.emit(comment);
                    });
            },
            error: () => {},
            complete: () => {
                this.isSpinnerVisible = false;
            },
        });
    }

    resetForm() {
        this.commentBox.nativeElement.value = '';
    }
}
