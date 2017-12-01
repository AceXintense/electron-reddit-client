<template>
    <div class="comment">
        <p class="created">
            <i class="fa fa-calendar-o" aria-hidden="true"></i>
            {{ timeConverter(comment.data.created) }}
        </p>
        <div v-html="checkCommentForLink(comment.data.body)"></div>
        <div class="meta">
            <p class="author">{{ comment.data.author }}</p>
            <div class="up">
                <i class="fa fa-chevron-up" aria-hidden="true"></i>
                <span>{{comment.data.ups}}</span>
            </div>
            <div class="down">
                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                <span>{{comment.data.downs}}</span>
            </div>
        </div>

        <div class="btn btn-primary show-replies" v-if="!showReplies" @click="showReplies = true">Show Replies</div>
        <div class="replies" v-if="showReplies && comment.data.replies !== '' && comment.data.replies.data.children[0].kind !== 'more'">
            <div class="btn btn-primary hide-replies" @click="showReplies = false">Hide Replies</div>
            <h4>Replies</h4>
            <comment :comment="replyComment" v-for="replyComment in comment.data.replies.data.children" v-if="replyComment.data.body !== undefined"></comment>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['comment'],
        data() {
            return {
                'showReplies': true
            }
        },
        methods: {
            checkCommentForLink(body) {
                const regex = /\[(.*)\]\(((http|https):\/\/(\S*))\)/gim;
                const regexReddit = /\[(.*)\]\(((\S*))\)/gim;
                if (regex.test(body)) {
                    body = body.replace(regex, '<a href="$2" target="_blank">$1</a>');
                }
                if (regexReddit.test(body)) {
                    body = body.replace(regexReddit, '<a href="' + baseURL + '$2" target="_blank">$1</a>');
                }
                return body;
            },
            timeConverter(UNIX_timestamp) {
                var a = new Date(UNIX_timestamp * 1000);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                return time;
            }
        }
    }

</script>

<style>

    .show-replies, .show-replies:hover, .show-replies:focus, .show-replies:active, .hide-replies, .hide-replies:hover, .hide-replies:focus, .hide-replies:active {
        background-color: transparent !important;
        border: 0;
        cursor: pointer;
    }

    .comment .meta .up, .comment .meta .down {
        margin: 0 20px;
    }
    .comment .meta .up {
        width: auto;
    }
    
    .comment .created {
        float: right;
        margin: 0;
        padding: 20px;
    }

    .comment .meta .author {
        margin: 0;
        margin-top: 0px;
        margin-top: 20px;
    }

    .comment .meta {
        margin-bottom: 20px;
    }

    .hide-replies {
        float: right;
    }

</style>