<template>
    <div class="container-fluid">

        <settings @transparency="setTransparency" :outsideTransparency="transparency" @close="toggleSettings(false)" v-if="settingsOpen"></settings>

        <div class="row">
            <div class="col-md-5 col-lg-3 left">
                <div class="card subreddits">
                    <div :class="{'card-header': true, 'transparent': transparency}">
                        <h1>Subreddits</h1>
                    </div>

                    <div class="view">
                        <loader v-if="subreddits.length <= 0"></loader>
                        <div class="list">
                            <div class="list-item no-highlight">
                                <input type="text" placeholder="Search Subreddits" v-model="subredditSearch" @keyup="searchForSubreddits">
                                <button class="btn btn-default clear-search" v-if="subredditSearch.length > 0" @click="clearSearch">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div :class="{'list-item': true, 'selected-item': subredditItem.data.display_name === subreddit}" v-for="subredditItem in subreddits" @click="setSubreddit(subredditItem.data.display_name)">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div v-if="thumbnailURLIsValid(subredditItem.data.icon_img)">
                                            <img :src="subredditItem.data.icon_img" alt="">
                                        </div>
                                        <div v-if="!thumbnailURLIsValid(subredditItem.data.icon_img)">
                                            <p class="subreddit-no-thumbnail">{{subredditItem.data.display_name}}</p>
                                        </div>
                                        <div class="nsfw" v-if="subredditItem.data.over18">NSFW</div>
                                    </div>
                                    <div class="col-sm-6">
                                        <p>{{subredditItem.data.display_name}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-7 col-lg-9 right">

                <listing v-if="showListing" @toggleSettings="toggleSettings" @closeListing="closeListing" :transparency="transparency" :subredditLink="subredditLink" :subreddit="subreddit"></listing>
                <listing-list v-show="!showListing" :subreddit="subreddit" @toggleSettings="toggleSettings" :transparency="transparency" @selectedListing="selectListing"></listing-list>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
	name: 'Index',
	data() {
	    return {
            subreddits: [],
            subreddit: 'Loading..',
            subredditLink: {},
            subredditSearch: '',
            showListing: false,
            transparency: true,
            settingsOpen: false
	    }
	},
	mounted() {
	    this.getPopularSubreddits();
	},
	methods: {
	    setSubreddit(subreddit) {
		    this.subreddit = subreddit;
		    this.showListing = false;
	    },
        clearSearch() {
            this.subredditSearch = '';
            this.searchForSubreddits();
        },
        toggleSettings(value) {
	        if (value === null || value === undefined) {
	            this.settingsOpen = !this.settingsOpen;
            } else {
	            this.settingsOpen = value;
            }
        },
        setTransparency(value) {
	        this.transparency = value;
        },
        thumbnailURLIsValid(url) {
	        const regex = /((http|https):\/\/(\S*))/g;
	        return regex.test(url);
        },
        getPopularSubreddits() {
            axios.get(baseURL + '/subreddits/popular.json').then(
                (response) => {
                    this.subreddits = response.data.data.children;
                    this.subreddit = this.subreddits[0].data.display_name;
                }
            );
        },
	    checkForImageInURL(url) {
            const regex = /.jpg|.png|.jpeg|.gif|.gifv/g;
            return regex.test(url);
        },
        closeListing() {
            this.showListing = false;
        },
        selectListing(listing) {
            this.showListing = true;
            this.subredditLink = listing;
        },
	    searchForSubreddits() {
	        if (this.subredditSearch.length > 0) {
                axios.get(baseURL + '/subreddits/search.json?q=' + this.subredditSearch).then(
                    (response) => {
                    console.log(response);
                    this.subreddits = response.data.data.children;
                    }
                );
	        }
	        if (this.subredditSearch.length <= 0) {
	            this.getPopularSubreddits();
            }
        }
	}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

    .left, .right {
        padding: 0 !important;
    }

    .left {
        background-color: #293338;
        height: 100vh;
        width: 100%;
    }

    .left .card .view {
        width: 100.2%;
        border-right: 1px solid #242d31;
    }

    .comment.start-thread {
        border-bottom: 2px solid #242d31;
        background-color: rgba(75, 95, 104, 0.2);
        padding-bottom: 35px;
    }

    *, *:focus, *:hover, *:active, *:visited {
        outline: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
    }

    .btn:focus, .btn:hover, .btn:active, .btn:visited {
        box-shadow: none !important;
    }

    .replies {
        background-color: rgba(75, 95, 104, 0.2);
        padding: 20px;
    }

    .list .list-item .nsfw {
        background-color: rgba(236, 41, 48, 0.9);
        padding: 0px;
        border-radius: 10000000px;
        width: 81px;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: -5px;
    }

    .btn.clear-search:hover {
        color: #9aa6ab;
    }

    .btn.clear-search {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 11px 21px;
        background-color: transparent;
        color: #627f8c;
        cursor: pointer;
    }

    .card {
        background-color: #36444a;
        padding: 0px;
        border: 0;
        color: white;
        border-radius: 0;
    }

    .selected-item {
        background-color: rgb(30, 37, 41);
    }
    
    .btn.back {
        float: left;
        padding: 11px 55px;
    }

    .listing {
        /*padding: 20px;*/
    }

    .subreddit-no-thumbnail {
        border-radius: 100000px;
        background-color: #2f393e;
        text-align: center !important;
        height: 64px;
        font-size: 13px;
        padding: 24px 0;
        margin: auto !important;
    }

    .listing .description img {
        margin-bottom: 20px;
        max-width: 100%;
    }

    .listing .text-body {
        padding: 20px 60px;
        text-align: left;
    }

    .listing .description {
        padding: 20px 0;
        background-color: #303b40;
    }

    .listing h4 {
        padding: 20px 100px;
    }

    .listing .comments {

    }

    .listing .comments .comment {
        text-align: left;
        padding: 20px;
    }

    .card.subreddits {
        border-right: 1px solid #45565c;
        width: 100%;
    }

    .card .card-header {
        padding: 20px;
        background-color: #293338;
        z-index: 1000;
        position: absolute;
        width: 100.5%;
        padding-top: 50px;
        -webkit-app-region: drag;
    }

    .card .card-header.transparent {
        -webkit-backdrop-filter: blur(12px) saturate(5);
        backdrop-filter: blur(12px) saturate(5);
        background-color: rgba(41,51,56,.86);
    }

    .card.transparent {
        -webkit-backdrop-filter: blur(12px) saturate(5);
        backdrop-filter: blur(12px) saturate(5);
        box-shadow: none !important;
        background-color: rgba(41,51,56,.86) !important;
    }

    .transparent {
        -webkit-backdrop-filter: blur(12px) saturate(5);
        backdrop-filter: blur(20px);
    }

    .settings-btn {
        position: absolute;
        bottom: 20px;
        right: 25px;
        background-color: transparent;
        border: 0;
        cursor: pointer;
        font-size: 20px;
    }

    .card .card-header h1 {
        margin: 0;
    }

    .subreddit {
        padding: 20px;
    }

    .no-thumbnail {
        margin: 0;
        padding: 20px;
        background-color: #405056;
        border-radius: 4px;
        margin: 0 20px;
        text-align: center !important;
    }

    /*.list-item:nth-child(n + 2) {*/
        /*border-top: 1px solid #45565c66;*/
    /*}*/

    /*.subreddit:nth-child(n + 2) {*/
        /*border-top: 1px solid #45565c66;*/
    /*}*/

    .subreddit img {
        border-radius: 4px;
    }

    .subreddit p {
        text-align: left;
    }

    .subreddit .meta {
        float: left;
    }

    .subreddit .author {
        position: absolute;
        bottom: 0;
        left: 15px;
        margin: 0;
    }

    .author {
        font-weight: 700;
    }

    .author:before {
        content: '@';
    }

    .meta .up {
        color: greenyellow;
    }

    .meta .down {
        color: red;
    }

    .meta .up, .subreddit .meta .down {
        width: 50%;
        font-weight: 700;
        float: left;
    }

    .meta .comments {
        margin-top: 35px;
    }

    .card .view {
        width: 100%;
        height: 100vh;
        position: absolute;
        padding-top: 115px;
        overflow: scroll;
    }

    .list {
        overflow: hidden;
    }

    .list input {
        line-height: inherit;
        width: 100%;
        padding: 10px;
        background-color: #43555d;
        border: none;
        border-radius: 4px;
        color: #84afc2;
        text-align: center;
    }

    .list .list-item {
        width: 100%;
        padding: 20px;
        position: relative;
    }

    .list .list-item img {
        border-radius: 100000px;
        width: 64px;
        height: 64px;
    }

    .list .list-item p {
        margin: 0;
        padding: 25px;
        text-align: left;
    }

    .list :not(.no-highlight):not(.selected-item).list-item:hover {
        background-color: rgba(245, 245, 245, 0.46);
        cursor: pointer;
    }

    :not(.no-highlight).subreddit:hover {
        background-color: rgba(245, 245, 245, 0.46);
        cursor: pointer;
    }

    :not(.no-highlight).subreddit:hover img {
        box-shadow: 0px 0px 55px 0px #515151;
    }
</style>
