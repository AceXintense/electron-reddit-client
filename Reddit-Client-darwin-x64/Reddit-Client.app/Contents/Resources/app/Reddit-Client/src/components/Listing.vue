<template>

    <div>
        <loader v-if="!listing"></loader>
        <div class="card">
            <div :class="{'card-header': true, 'transparent': transparency}">
                <button class="btn btn-primary back" @click="closeListing">Back</button>
                <h1>{{ subreddit }}</h1>
                <button class="btn btn-primary settings-btn" @click="toggleSettings()">
                    <i class="fa fa-sliders" aria-hidden="true"></i>
                </button>
            </div>
            <div class="view" v-if="listing">
                <div class="listing">
                    <div class="description">
                        <div class="image-check" v-if="checkForImageInURL(listing.url)">
                            <a :href="listing.url" target="_blank">
                                <img :src="checkURL(listing.url)" alt="">
                            </a>
                        </div>
                        <h4 v-html="listing.title"></h4>
                        <div class="image-check" v-if="!checkForImageInURL(listing.url)">
                            <a :href="listing.url" target="_blank">
                                {{ listing.url }}
                            </a>
                        </div>
                        <p class="text-body" v-html="listing.selftext"></p>
                        <h5 class="author">{{ listing.author }}</h5>
                        <div class="meta">
                            <div class="up">
                                <i class="fa fa-chevron-up" aria-hidden="true"></i>
                                <span>{{listing.ups}}</span>
                            </div>
                            <div class="down">
                                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                                <span>{{listing.downs}}</span>
                            </div>
                            <div class="comments">
                                <i class="fa fa-comment" aria-hidden="true"></i>
                                <span>{{listing.num_comments}} Comments</span>
                            </div>
                        </div>
                    </div>
                    <div class="comments">
                        <div class="comment start-thread" v-for="listingComment in listingComments">
                            <comment :comment="listingComment"></comment>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Listing',
        props: ['transparency', 'subredditLink', 'subreddit'],
        created() {
            axios.get(baseURL + '/' + this.subredditLink.id + ".json").then(
                (response) => {
                    this.listing = response.data[0].data.children[0].data;
                    this.listing.selftext = this.checkListingForFormatting(this.listing.selftext);
                    this.listing.title = this.checkListingForFormatting(this.listing.title);
                    this.listingComments = response.data[1].data.children;
                }
            );
        },
        data() {
            return {
                listing: null,
                listingComments: null,
            }
        },
        methods: {
            checkListingForFormatting(body) {
                const linkRegex = /\[(.*)\]\(((?:http|https):\/\/\S*)\)/gim; //Matches [ [Hello World](https://helloworld.com) ]
                const regexReddit = /\[(.*)\]\(((\S*))\)/gim; //Matches [ [Hello World](helloworld) ]
                const extraBoldRegexReddit = /\*\*(.+?)\*\*/gim; //Matches [** Hello World **]
                const boldRegexReddit = /\*[\s|](.+?)\*/gim; //Matches [ * Hello World * ]
                const listRegex = /\*\s(.+)/gim; //Matches [ * Hello World ]
                const subredditRegex = /r\/(.+?)\s/gim; //Matches [ * r/Subreddit ]
                const lineFeed = /\n/gim;

                if (extraBoldRegexReddit.test(body)) {
                    body = body.replace(extraBoldRegexReddit, '<b><b>$1</b></b>');
                }
                if (boldRegexReddit.test(body)) {
                    body = body.replace(boldRegexReddit, '<b>$1</b>');
                }
                if (listRegex.test(body)) {
                    body = body.replace(listRegex, '<b>- $1</b>');
                }
                if (subredditRegex.test(body)) {
                    body = body.replace(subredditRegex, '<b>$1</b> ');
                }

                if (linkRegex.test(body)) {
                    body = body.replace(linkRegex, '<a href="$2" target="_blank">$1</a>');
                }
                if (regexReddit.test(body)) {
                    body = body.replace(regexReddit, '<a href="' + baseURL + '$2" target="_blank">$1</a>');
                }

                if (lineFeed.test(body)) {
                    body = body.replace(lineFeed, '<br>');
                }

                return body;
            },
            closeListing() {
                this.$emit('closeListing');
            },
            toggleSettings() {
                this.$emit('toggleSettings');
            },
            thumbnailURLIsValid(url) {
                const regex = /((http|https):\/\/(\S*))/g;
                return regex.test(url);
            },
            selectSubreddit(subreddit) {
                console.log(subreddit);
                // this.$emit('selectSubreddit', subreddit)
            },
            checkForImageInURL(url) {
                const regex = /.jpg|.png|.jpeg|.gif|.gifv/g;
                return regex.test(url);
            },
            checkURL(url) {
                const regex = /gifv/g;
                url = url.replace(regex, 'gif');
                return url;
            }
        }
    }
</script>